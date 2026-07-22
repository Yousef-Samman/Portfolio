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
  if (!res.ok) return { available: false, filename: 'YousefCv.pdf' };
  const json = (await res.json()) as { available?: boolean; filename?: string };
  return {
    available: Boolean(json.available),
    filename: json.filename ?? 'YousefCv.pdf',
  };
}

export async function submitContact(
  payload: ContactFormData,
): Promise<ApiResult<{ message: string }>> {
  const res = await fetch(apiPath('/api/contact'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
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
}
