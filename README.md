<div align="center">

# AiShopping (Powered Shopping)

AI-assisted shopping app with Firebase + MongoDB, optional voice transcription, and checkout integrations.

[![Live Demo](https://img.shields.io/badge/Take%20a%20look-Live%20Demo-2ea44f?style=for-the-badge)](https://aishopping-475ab.web.app/)

<p>
  <a href="#highlights">Highlights</a> •
  <a href="#repository-layout">Repo layout</a> •
  <a href="#setup">Setup</a> •
  <a href="#environment-variables">Env</a> •
  <a href="#roadmap">Roadmap</a>
</p>

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

</div>

> Status: work in progress. If your GitHub view shows only config/examples, ensure you’ve pushed the actual `client/` + `server/` source (excluding `node_modules/`).

## Take a look
- Live site: https://aishopping-475ab.web.app/

## Highlights
- Firebase client + Firebase Admin (server)
- MongoDB-backed data (`MONGO_URI`)
- AI integrations (Gemini / OpenAI) for assistant & transcription flows
- Razorpay-ready env keys (optional)
- SMTP email support for orders (optional)

## Repository layout
- `client/` – Vite frontend (Firebase config via `VITE_*`)
- `server/` – Node backend (API on `PORT`, DB + AI keys)

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
- Server: `PORT` (example default: `5050`)
- Data: `MONGO_URI`, `DEFAULT_CART_ID`, `PRODUCT_DATA_SOURCE`, `PRODUCT_FETCH_TIMEOUT_MS`
- Firebase Admin: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- AI: `GEMINI_API_KEY` (and `GEMINI_TRANSCRIBE_MODEL`) or `OPENAI_API_KEY` (and `OPENAI_MODEL` / `OPENAI_TRANSCRIBE_MODEL`)
- Payments: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` (optional)
- Email: `SEND_ORDER_EMAILS` + `SMTP_*` (optional)

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
