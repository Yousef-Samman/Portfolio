export type ContactFormData = {
  name: string;
  email: string;
  message: string;
  subject?: string;
  website?: string;
  turnstileToken?: string;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status?: number };

export type CvResolveResult = {
  available: boolean;
  url: string;
  filename: string;
};

const CV_FILENAME = 'YousefCv.pdf';
/** Served by Vite from `public/cv/` — works without the API. */
export const CV_STATIC_URL = `/cv/${CV_FILENAME}`;

function apiBase(): string {
  const base = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '') ?? '';
  return base;
}

export function apiPath(path: string): string {
  return `${apiBase()}${path}`;
}

export const CV_DOWNLOAD_URL = apiPath('/api/cv');

export async function fetchCvStatus(): Promise<{ available: boolean; filename: string }> {
  const res = await fetch(apiPath('/api/cv/status'));
  if (!res.ok) return { available: false, filename: CV_FILENAME };
  const json = (await res.json()) as { available?: boolean; filename?: string };
  return {
    available: Boolean(json.available),
    filename: json.filename ?? CV_FILENAME,
  };
}

/** Prefer API download; fall back to the static PDF in `public/cv/`. */
export async function resolveCvDownload(): Promise<CvResolveResult> {
  try {
    const status = await fetchCvStatus();
    if (status.available) {
      return {
        available: true,
        url: CV_DOWNLOAD_URL,
        filename: status.filename,
      };
    }
  } catch {
    // API unreachable — try static asset next.
  }

  try {
    const res = await fetch(CV_STATIC_URL, { method: 'HEAD' });
    if (res.ok) {
      return { available: true, url: CV_STATIC_URL, filename: CV_FILENAME };
    }
  } catch {
    // Static file missing.
  }

  return { available: false, url: CV_DOWNLOAD_URL, filename: CV_FILENAME };
}

export async function submitContact(
  payload: ContactFormData,
): Promise<ApiResult<{ message: string }>> {
  const controller = new AbortController();
  const timeoutMs = 90_000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(apiPath('/api/contact'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const json = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      message?: string;
      retryAfterSec?: number;
    };

    if (!res.ok || !json.ok) {
      const fallback =
        res.status === 429
          ? 'Please wait before sending another message.'
          : 'Something went wrong. Please try again.';
      return {
        ok: false,
        error: json.error ?? fallback,
        status: res.status,
      };
    }

    return {
      ok: true,
      data: {
        message: json.message ?? 'Thank you for the message. I will reply asap.',
      },
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return {
        ok: false,
        error:
          'The server took too long to respond (it may have been waking up). Please try Send again.',
        status: 504,
      };
    }
    return {
      ok: false,
      error: 'Could not reach the server. Check your connection and try again.',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export const ASSISTANT_QUESTION_MAX_LENGTH = 300;
/** Keep in sync with server ASSISTANT_HISTORY_MAX_MESSAGES (12 = 6 turns). */
export const ASSISTANT_HISTORY_MAX_MESSAGES = 12;

export type AssistantHistoryItem = {
  role: 'user' | 'assistant';
  text: string;
};

export async function askAssistant(
  question: string,
  history: AssistantHistoryItem[] = [],
): Promise<ApiResult<{ answer: string }>> {
  const res = await fetch(apiPath('/api/assistant'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, history }),
  });

  const json = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    answer?: string;
  };

  if (!res.ok || !json.ok) {
    const fallback =
      res.status === 429
        ? 'Too many questions right now. Please try again later.'
        : res.status === 503
          ? 'The assistant is temporarily unavailable.'
          : 'Something went wrong. Please try again.';
    return {
      ok: false,
      error: json.error ?? fallback,
      status: res.status,
    };
  }

  return {
    ok: true,
    data: { answer: json.answer ?? '' },
  };
}
