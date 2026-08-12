const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  subject?: string;
  website?: string;
};

export function parseContactBody(body: unknown):
  | { ok: true; data: ContactPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body.' };
  }

  const b = body as Record<string, unknown>;
  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const email = typeof b.email === 'string' ? b.email.trim() : '';
  const message = typeof b.message === 'string' ? b.message.trim() : '';
  const subject = typeof b.subject === 'string' ? b.subject.trim() : undefined;
  const website = typeof b.website === 'string' ? b.website.trim() : '';

  if (website) {
    return { ok: false, error: 'Request rejected.' };
  }

  if (name.length < 2 || name.length > 80) {
    return { ok: false, error: 'Name must be between 2 and 80 characters.' };
  }
  if (!EMAIL_RE.test(email) || email.length > 120) {
    return { ok: false, error: 'Please provide a valid email address.' };
  }
  if (message.length < 10 || message.length > 2000) {
    return { ok: false, error: 'Message must be between 10 and 2000 characters.' };
  }
  if (subject && subject.length > 120) {
    return { ok: false, error: 'Subject is too long.' };
  }

  return {
    ok: true,
    data: { name, email, message, subject: subject || undefined },
  };
}

export const ASSISTANT_QUESTION_MAX_LENGTH = 300;
/** Max prior messages (user+assistant) accepted with a new question. */
export const ASSISTANT_HISTORY_MAX_MESSAGES = 12;
export const ASSISTANT_HISTORY_ITEM_MAX_LENGTH = 1200;

export type AssistantHistoryItem = {
  role: 'user' | 'assistant';
  text: string;
};

export type AssistantPayload = {
  question: string;
  history: AssistantHistoryItem[];
};

export function parseAssistantBody(body: unknown):
  | { ok: true; data: AssistantPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body.' };
  }

  const b = body as Record<string, unknown>;
  const question = typeof b.question === 'string' ? b.question.trim() : '';

  if (!question) {
    return { ok: false, error: 'Please enter a question.' };
  }
  if (question.length > ASSISTANT_QUESTION_MAX_LENGTH) {
    return {
      ok: false,
      error: `Question must be ${ASSISTANT_QUESTION_MAX_LENGTH} characters or fewer.`,
    };
  }

  let history: AssistantHistoryItem[] = [];
  if (b.history !== undefined) {
    if (!Array.isArray(b.history)) {
      return { ok: false, error: 'Invalid conversation history.' };
    }
    if (b.history.length > ASSISTANT_HISTORY_MAX_MESSAGES) {
      return {
        ok: false,
        error: `Conversation history is too long (max ${ASSISTANT_HISTORY_MAX_MESSAGES} messages).`,
      };
    }

    for (const item of b.history) {
      if (!item || typeof item !== 'object') {
        return { ok: false, error: 'Invalid conversation history.' };
      }
      const row = item as Record<string, unknown>;
      const role = row.role;
      const text = typeof row.text === 'string' ? row.text.trim() : '';
      if (role !== 'user' && role !== 'assistant') {
        return { ok: false, error: 'Invalid conversation history.' };
      }
      if (!text || text.length > ASSISTANT_HISTORY_ITEM_MAX_LENGTH) {
        return { ok: false, error: 'Invalid conversation history.' };
      }
      history.push({ role, text });
    }
  }

  return { ok: true, data: { question, history } };
}
