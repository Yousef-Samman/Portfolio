# Yousef Samman — IT Portfolio

Personal portfolio site built with React, Vite, and Tailwind CSS. Optional Express API for contact, CV download, and other server-side features.

## Prerequisites

- Node.js 20+

## Local development

```bash
npm install
```

**Frontend only** (portfolio UI):

```bash
npm run dev
```

Open http://localhost:3000

**Frontend + API** (contact form, CV download):

```bash
npm run dev:all
```

Or two terminals: `npm run server` and `npm run dev`.

See **[FEATURES.md](FEATURES.md)** for the full feature list and go-live checklist.

API health check: http://localhost:3001/api/health (proxied at http://localhost:3000/api/health)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server (port 3000) |
| `npm run server` | Express API (port 3001) |
| `npm run build` | Production frontend build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | TypeScript check |

## Environment

Copy `.env.example` to `.env.local` and adjust values as needed.

## Production build

```bash
npm run build
```

Serve the  dist/` with any static host, or run the API alongside it on a VPS (see deployment notes in project docs / team chat).
