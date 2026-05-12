/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'portfolio-api',
    time: new Date().toISOString(),
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio API: http://localhost:${PORT}/api/health`);
});
