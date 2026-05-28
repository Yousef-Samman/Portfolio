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
