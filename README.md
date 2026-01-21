# 🕉️ DARVE Frontend – Temple Pooja Verification System

This repository contains the **frontend application** for **DARVE (Daily Authentic Ritual Verification Engine)**.  
The frontend allows temple authorities to **register, login, upload pooja images, and view AI-based verification results** in a clean and modern UI.

The frontend connects to:
- 🔐 **FastAPI Authentication Backend (Railway)**
- 🤖 **AI Verification API (Hugging Face Spaces)**

---

## 🚀 Live Deployment

- **Frontend (Vercel)**
- **Auth Backend (Railway)** 
- **AI Verification MODELS(Hugging Face)**

---

## ✨ Features

- 🔐 Secure Login & Registration
- 🏛️ Temple-based user onboarding
- 📤 Upload Today & Yesterday Pooja Images
- 🤖 AI-powered ritual verification
- 📊 Clean UI with status & reason breakdown
- ⚡ Ultra-fast Vite build
- 📱 Fully responsive (mobile + desktop)

---

## 🧱 Tech Stack

| Layer | Technology |
|-----|------------|
| Framework | React 19 |
| Build Tool | Vite |
| Language | TypeScript |
| Routing | React Router |
| HTTP Client | Fetch / Axios |
| Styling | Tailwind CSS + Custom CSS |
| Charts | Recharts |

---

## 🔗 API Configuration

### `src/config.ts`

ts
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_URL,
  AI_API_URL: import.meta.env.VITE_AI_API_URL
};

---

## ⚠️ Notes:

Must start with VITE_

Restart dev server after changes

## ▶️ Run Locally
npm install
npm run dev

---

App will run at:

http://localhost:5173

---

## 🔐 Authentication Flow

User registers temple account

Login returns JWT token

Token stored in localStorage

Token sent in Authorization headers

Session persists until logout

---

## 📤 Pooja Verification Flow

Upload today's pooja image

Upload yesterday's pooja image

Images sent to AI verification API

AI evaluates:

Object presence (YOLO)

Ritual activity (ViT)

Scene consistency (Siamese CNN)

Frontend displays:

Status (VERIFIED / REJECTED)

Confidence score

Reason list

---

## 🚀 Deployment (Vercel)
Steps

Push frontend to GitHub

Go to https://vercel.com

Import repository

Set Environment Variables:

VITE_API_URL

VITE_AI_API_URL

Build Command:

npm run build

---

Output Directory:

dist

---

## 🧪 Common Errors & Fixes
❌ Backend not reachable

✔️ Check API URL
✔️ Check CORS settings
✔️ Backend must be running

❌ import.meta.env undefined

✔️ Project must run via Vite
✔️ Restart dev server

❌ CORS blocked

✔️ Backend must allow frontend domain
✔️ Dev mode: allow_origins=["*"]

---

## 📈 Future Enhancements

Admin dashboard

Historical verification logs

Multi-temple analytics

Notification system

Progressive Web App (PWA)

---

## 👤 Author

Hemanth B

Full Stack & AI Developer

Project: DARVE – Daily Authentic Ritual Verification Engine

🙏 Built with faith, discipline, and artificial intelligence.


---


