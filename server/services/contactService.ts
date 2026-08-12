import { saveContactMessage } from '../lib/contactStore.js';
import {
  isEmailConfigured,
  sendContactNotification,
} from '../lib/sendContactEmail.js';
import type { ContactPayload } from '../lib/validators.js';

export type ContactSubmitResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/**
 * Persists a contact message and attempts email notification.
 * When email is configured, a failed/skipped send is treated as an error
 * so the visitor is not told the message was delivered when it was not.
 */
export async function submitContactMessage(
  payload: ContactPayload,
  clientIp: string,
): Promise<ContactSubmitResult> {
  try {
    const record = await saveContactMessage(payload, clientIp);
    const emailExpected = isEmailConfigured();

    try {
      const emailResult = await sendContactNotification(payload, record.id);
      if (emailResult.sent) {
        console.log(
          `[contact] ${record.id} saved and emailed from ${payload.email}`,
        );
        return { ok: true, id: record.id };
      }

      if (emailExpected) {
        console.warn(
          `[contact] ${record.id} saved; email not sent: ${emailResult.skippedReason ?? 'unknown'}`,
        );
        return {
          ok: false,
          error:
            'Your message was received but the email notification failed. Please try again in a few minutes, or reach out on LinkedIn.',
        };
      }

      console.warn(
        `[contact] ${record.id} saved; email not configured: ${emailResult.skippedReason}`,
      );
      return { ok: true, id: record.id };
    } catch (emailErr) {
      console.error(`[contact] ${record.id} saved; email failed:`, emailErr);
      if (emailExpected) {
        return {
          ok: false,
          error:
            'Your message was received but the email notification failed. Please try again in a few minutes, or reach out on LinkedIn.',
        };
      }
      return { ok: true, id: record.id };
    }
  } catch (err) {
    console.error('[contact] Failed to save message', err);
    return {
      ok: false,
      error: 'Could not send your message. Please try again in a few minutes.',
    };
  }
}
