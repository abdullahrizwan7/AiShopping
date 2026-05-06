<div align="center">

# AiShopping (Powered Shopping)

AI-assisted shopping experience built with Firebase + MongoDB, with optional voice transcription and checkout integrations.

[![Take a look • Live demo](https://img.shields.io/badge/Take%20a%20look-Live%20Demo-2ea44f?style=for-the-badge)](https://aishopping-475ab.web.app/)

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

</div>

> Status: work in progress. If the GitHub repo currently shows only env/examples, make sure you’ve pushed the real `client/` + `server/` source (without `node_modules/`).

## Table of contents
- [Take a look](#take-a-look)
- [What is this?](#what-is-this)
- [Key features](#key-features)
- [Architecture](#architecture)
- [Repository layout](#repository-layout)
- [Prerequisites](#prerequisites)
- [Quickstart (local)](#quickstart-local)
- [Environment variables](#environment-variables)
- [Security notes](#security-notes)
- [Deployment notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

## Take a look
- Live website: https://aishopping-475ab.web.app/

## What is this?
AiShopping (“Powered Shopping”) is an AI-assisted shopping app concept:
- A **Vite** frontend integrates with **Firebase** for client-side services.
- A **Node.js** backend connects to **MongoDB** for data (products/carts/orders) and can use **Firebase Admin** for server-side verification and privileged operations.
- Optional **AI-powered voice transcription** and assistant flows are supported via environment configuration (Gemini-first in the current template, with optional OpenAI compatibility).
- Optional integrations for **Razorpay** payments and **SMTP** order emails.

## Key features
- **Firebase + Firebase Admin** support (client/server split)
- **MongoDB** data storage (`MONGO_URI`)
- **AI integrations**
  - Gemini-based transcription (template default)
  - Optional OpenAI fallback (config-driven)
- **Payments (optional)**: Razorpay keys supported via env
- **Order emails (optional)**: SMTP-based delivery via env
- **Config-driven behavior**: product source + fetch timeout can be tuned by env

## Architecture
High-level flow (conceptual):
- `client/` (Vite + Firebase) → calls API on `server/`
- `server/` (Node) → reads/writes MongoDB, optionally uses Firebase Admin + AI providers

## Repository layout
- `client/` – frontend (Firebase/Vite config via `VITE_*`)
  - `client/.env.example` is committed; `client/.env` should not be committed
- `server/` – backend (API + DB + admin keys)
  - `server/.env.example` is committed; `server/.env` should not be committed

## Prerequisites
- Node.js + npm
- A Firebase project (for the client config, and optionally server admin)
- MongoDB connection string (local or Atlas) for `MONGO_URI`
- Optional:
  - Gemini API key and model access
  - OpenAI API key (if you want OpenAI fallback)
  - Razorpay account keys
  - SMTP credentials (Gmail App Password recommended)

## Quickstart (local)
1) Install dependencies:
```bash
cd server && npm install
cd ../client && npm install
```

2) Create environment files:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3) Start dev servers:
```bash
cd server && npm run dev
cd ../client && npm run dev
```

## Environment variables
These are based on the committed examples.

### Client (`client/.env`)
| Variable | Purpose |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase web config |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase web config |
| `VITE_FIREBASE_PROJECT_ID` | Firebase web config |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase web config |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase web config |
| `VITE_FIREBASE_APP_ID` | Firebase web config |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase Analytics config |
| `VITE_ENABLE_ANALYTICS` | `true/false` toggle |
| `VITE_DEMO_UPI_ID` | demo label for checkout |
| `VITE_DEMO_UPI_NAME` | demo label for checkout |

### Server (`server/.env`)
| Variable | Purpose |
|---|---|
| `PORT` | server port (example: `5050`) |
| `MONGO_URI` | MongoDB connection string |
| `DEFAULT_CART_ID` | default cart identifier |
| `PRODUCT_DATA_SOURCE` | product source selector (example: `auto`) |
| `PRODUCT_FETCH_TIMEOUT_MS` | upstream fetch timeout (ms) |
| `FIREBASE_PROJECT_ID` | Firebase Admin service account fields |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin service account fields |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin private key (keep in `.env` only) |
| `GEMINI_API_KEY` | Gemini API key |
| `GEMINI_TRANSCRIBE_MODEL` | Gemini transcribe model id |
| `OPENAI_API_KEY` | optional OpenAI compatibility/fallback |
| `OPENAI_MODEL` | OpenAI model id |
| `OPENAI_TRANSCRIBE_MODEL` | OpenAI speech-to-text model id |
| `RAZORPAY_KEY_ID` | optional payments |
| `RAZORPAY_KEY_SECRET` | optional payments |
| `SEND_ORDER_EMAILS` | `true/false` toggle |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | SMTP transport |
| `SMTP_USER` / `SMTP_PASS` | SMTP credentials |
| `SMTP_FROM` | sender display |

## Security notes
- Don’t commit secrets. `.env` files are ignored by default.
- If any secret ever hits Git history, **rotate it immediately** (Firebase, DB, AI keys, Razorpay, SMTP).
- Prefer scoped keys and least privilege.

## Deployment notes
- The live site is hosted here: https://aishopping-475ab.web.app/
- Typical hosting split:
  - Frontend → Firebase Hosting
  - Backend → any Node-friendly host (Render/Railway/Fly/etc.) or Firebase Functions (if adapted)

## Troubleshooting
- “Works locally but not in prod”: double-check `.env` values and Firebase project ids.
- Mongo errors: verify `MONGO_URI` network access + IP allowlist (Atlas).
- Emails not sending: set `SEND_ORDER_EMAILS=true` and confirm `SMTP_*` values.

## Roadmap
- Push full client/server source code (excluding `node_modules/`)
- Add API docs + environment setup screenshots
- Add demo video / screenshots on the README
- Add CI checks (lint/test/build)

## Contributing
PRs welcome.
- Keep commits focused
- Do not commit `node_modules/`, build outputs, or `.env`
