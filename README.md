# AiShopping (Powered Shopping)

AI-assisted shopping app with Firebase + MongoDB, optional voice transcription, and checkout integrations.

## Take a look
- Live site: https://aishopping-475ab.web.app/

> Status: work in progress. If the GitHub repo currently shows only config/examples, the app source code hasn’t been pushed yet (make sure you push `client/` + `server/` **without** `node_modules/`).

## Highlights
- Firebase (client) + Firebase Admin (server) support
- MongoDB-backed product/cart storage (`MONGO_URI`)
- AI helpers (Gemini / OpenAI) for voice transcription and assistant flows
- Razorpay payment keys supported via env
- Optional order emails via SMTP

## Repository layout
- `client/` – Vite frontend (Firebase config via `VITE_*`)
- `server/` – Node backend (API on `PORT`, DB + AI keys)

## Tech stack (planned/expected)
- Frontend: Vite + Firebase (Auth/Firestore/Storage/Analytics as configured)
- Backend: Node.js API + Firebase Admin + MongoDB
- AI: Gemini (primary in template) with optional OpenAI fallback
- Payments: Razorpay (optional)
- Email: SMTP (optional)

## Setup
### 1) Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 2) Configure environment
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### Environment variables
Client (`client/.env`):
- Firebase / Vite: `VITE_FIREBASE_*`
- Optional: `VITE_ENABLE_ANALYTICS`
- Demo checkout labels: `VITE_DEMO_UPI_ID`, `VITE_DEMO_UPI_NAME`

Server (`server/.env`):
- Server: `PORT` (default in example: `5050`)
- Data: `MONGO_URI`, `DEFAULT_CART_ID`, `PRODUCT_DATA_SOURCE`, `PRODUCT_FETCH_TIMEOUT_MS`
- Firebase Admin: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- AI: `GEMINI_API_KEY` (and `GEMINI_TRANSCRIBE_MODEL`) or `OPENAI_API_KEY` (and `OPENAI_MODEL` / `OPENAI_TRANSCRIBE_MODEL`)
- Payments: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- Email: `SEND_ORDER_EMAILS` + `SMTP_*`

Fill in `server/.env`:
- `MONGO_URI`
- Firebase Admin service account (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`)
- One of:
  - `GEMINI_API_KEY` (recommended for the current template), or
  - `OPENAI_API_KEY` (optional fallback)
- (Optional) Razorpay keys: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- (Optional) SMTP settings if `SEND_ORDER_EMAILS=true`

### 3) Run (dev)
```bash
cd server && npm run dev
cd ../client && npm run dev
```

## Security
- Never commit real secrets. `.env` is ignored by default.
- Rotate keys if you’ve ever committed them by mistake.

## Contributing
Issues and PRs welcome. Please keep commits focused and avoid committing build artifacts or `node_modules/`.

## Roadmap
- Push client/server source code (excluding `node_modules/`)
- Document API routes + local dev workflow
- Add screenshots / demo video
