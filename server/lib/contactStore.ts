import fs from 'node:fs/promises';
import path from 'node:path';
import type { ContactPayload } from './validators.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'contact-messages.jsonl');

export type StoredMessage = ContactPayload & {
  id: string;
  receivedAt: string;
  ip: string;
};

export async function saveContactMessage(
  payload: ContactPayload,
  ip: string,
): Promise<StoredMessage> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  const record: StoredMessage = {
    ...payload,
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ip,
  };

  await fs.appendFile(MESSAGES_FILE, `${JSON.stringify(record)}\n`, 'utf8');
  return record;
}
