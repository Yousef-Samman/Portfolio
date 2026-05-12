/**
 * Removes Vite's transform cache (fixes stale asset paths after file deletes).
 */
import { rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const viteCache = join(root, 'node_modules', '.vite');

if (existsSync(viteCache)) {
  rmSync(viteCache, { recursive: true, force: true });
  console.log('Removed node_modules/.vite');
} else {
  console.log('No node_modules/.vite to remove');
}
