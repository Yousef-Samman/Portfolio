# Yousef Samman — IT Portfolio

A modern personal portfolio website built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, with an optional **Express API** for contact form handling, CV download, and health checks.

---

## Overview

This project is a professional IT portfolio for presenting Yousef Samman’s background, experience, education, technical skills, projects, and contact options in one clean web interface.

The goal of the portfolio is to give recruiters, evaluators, clients, and visitors a quick way to understand the owner’s technical profile and review his work without needing separate documents or links.

The frontend provides the public portfolio experience, while the backend API supports server-side features such as contact message handling, CV availability checking, CV download, and API status monitoring.

---

## Features

- Single-page portfolio website
- Responsive React frontend
- Professional hero, experience, projects, education, skills, and contact sections
- Contact form connected to an Express API
- CV download and CV status endpoints
- API health-check endpoint
- Contact form validation
- Basic anti-spam protection using honeypot, cooldown, rate limiting, and optional Cloudflare Turnstile
- Optional email notifications using SMTP or Resend
- Local contact message storage using JSONL
- Environment-based configuration through `.env.example`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS |
| Backend | Node.js, Express |
| Runtime | tsx |
| Storage | Local JSONL file |
| Email | Nodemailer SMTP or Resend |
| Bot Protection | Cloudflare Turnstile |
| Package Manager | npm |
| Deployment | Not clearly specified in the repository |

---

## Project Structure

```text
Portfolio/
├── docs/
├── public/
│   └── cv/
├── scripts/
├── server/
│   ├── index.ts
│   ├── lib/
│   ├── middleware/
│   ├── routes/
│   └── services/
├── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── theme/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts