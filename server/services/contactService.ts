import { saveContactMessage } from '../lib/contactStore.js';
import { sendContactNotification } from '../lib/sendContactEmail.js';
import type { ContactPayload } from '../lib/validators.js';

export type ContactSubmitResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/**
 * Persists a contact message and attempts email notification.
 * Save success is returned even when email fails (logged server-side).
 */
export async function submitContactMessage(
  payload: ContactPayload,
  clientIp: string,
): Promise<ContactSubmitResult> {
  try {
    const record = await saveContactMessage(payload, clientIp);

    try {
      const emailResult = await sendContactNotification(payload, record.id);
      if (emailResult.sent) {
        console.log(
          `[contact] ${record.id} saved and emailed from ${payload.email}`,
        );
      } else if (emailResult.skippedReason) {
        console.warn(
          `[contact] ${record.id} saved; email not sent: ${emailResult.skippedReason}`,
        );
      }
    } catch (emailErr) {
      console.error(`[contact] ${record.id} saved; email failed:`, emailErr);
    }

    return { ok: true, id: record.id };
  } catch (err) {
    console.error('[contact] Failed to save message', err);
    return {
      ok: false,
      error: 'Could not send your message. Please try again in a few minutes.',
    };
  }
}
