import fs from 'node:fs';
import path from 'node:path';
import type { Request, Response, Router } from 'express';
import express from 'express';

const CV_FILENAME = process.env.CV_FILENAME ?? 'YousefCv.pdf';

function resolveCvPath(): string | null {
  const candidates = [
    path.join(process.cwd(), 'public', 'cv', CV_FILENAME),
    path.join(process.cwd(), 'public', CV_FILENAME),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

export function cvRouter(): Router {
  const router = express.Router();

  router.get('/cv', (_req: Request, res: Response) => {
    const cvPath = resolveCvPath();
    if (!cvPath) {
      res.status(404).json({
        ok: false,
        error: 'CV file not found. Add your PDF to public/cv/' + CV_FILENAME,
      });
      return;
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${CV_FILENAME}"`,
    );
    res.sendFile(path.resolve(cvPath));
  });

  router.get('/cv/status', (_req: Request, res: Response) => {
    res.json({ ok: true, available: resolveCvPath() !== null, filename: CV_FILENAME });
  });

  return router;
}
