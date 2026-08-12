import type { Request, Response, NextFunction } from 'express';

/** Lightweight security headers for the API (no Helmet dependency). */
export function securityHeaders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );
  // API responses are JSON — discourage caching of sensitive errors
  if (!req.path.startsWith('/api/health')) {
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
}
