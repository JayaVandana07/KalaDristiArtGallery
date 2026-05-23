# KalaDrishti Art Gallery — Project Context

## Overview

**KalaDrishti** is an online Indian art gallery platform that connects artists with art enthusiasts worldwide. It showcases curated Indian artwork with features for browsing, purchasing, and auctioning art.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 (class-based components) |
| Build Tool | Vite 6 |
| Styling | Plain CSS (inline in `index.html`) + `App.css` |
| Icons | Font Awesome 6 (CDN) |
| Backend API | Java/Spring Boot on `localhost:8080` |
| Session Management | Browser Cookies |
| API Communication | Custom `fetch` wrapper (`Api.js`) |

---

## Project Structure

```
KalaDristiArtGallery/
├── index.html        # Main landing page (HTML/CSS/JS — fully static)
├── App.jsx           # React component — Auth modal (Sign In / Sign Up)
├── App.css           # Styles for the React auth popup
├── Api.js            # Shared API helpers: callApi(), setSession(), getSession()
├── main.jsx          # React app entry point (mounts into #root)
├── vite.config.js    # Vite config
└── package.json      # Dependencies: react, react-dom, vite
```

---

## Key Features (Currently Implemented)

### 🔐 User Authentication (React — `App.jsx`)
- **Sign In** — email + password → POST `/user/signin` → session cookie (`csrid`) → redirects to `/dashboard`
- **Sign Up** — full name, email, role, password + confirm → POST `/user/signup`
- **Forgot Password** — email → GET `/user/forgotpwd/:email`
- **Roles:** Admin (1), Viewer (2), Artist (3)
- Modal popup with toggle between Sign In / Sign Up forms
- Client-side validation with red-border highlighting on empty fields

### 🖼️ Gallery Landing Page (`index.html` — static HTML)
| Section | Description |
|---|---|
| **Hero** | Full-screen banner — "Discover Indian Artistry" |
| **Featured Artists** | 4 artists: Priya Sharma, Arjun Patel, Meera Desai, Vikram Singh |
| **Mood-Based Gallery** | Filter art by mood: Serene, Vibrant, Contemplative, Celebratory, Mystical |
| **Art Categories** | Tabbed browsing: Modern, Traditional, Minimalist, Abstract, Digital |
| **Live Auctions** | 3 active auctions with countdown timers and live bid forms |
| **360° Viewer** | Artwork zoom viewer (zoom in/out controls) |
| **Community Reviews** | Star ratings + review submission form |
| **Newsletter** | Email subscription form |
| **Cart** | Add-to-cart with total calculation and "Pay Now" checkout |
| **Footer** | About, quick links, support links, newsletter, social icons |

---

## Design Language

- **Color Scheme:** Dark theme — near-black background (`#121212`), gold accent (`#d4af37`), light text (`#e0e0e0`)
- **Typography:** Segoe UI, light font-weight, wide letter-spacing
- **Style:** Minimal, gallery-gallery aesthetic — no rounded cards except auth modals
- **Responsive:** Mobile menu toggle, fluid grids with `auto-fill` columns

---

## Backend API (Expected Endpoints)

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/user/signup` | Register new user |
| POST | `/user/signin` | Login, returns session ID |
| GET | `/user/forgotpwd/:email` | Trigger password reset |

- Base URL: `http://localhost:8080/`
- Response format: `"statusCode:message"` (e.g., `"200:Login successful"`)

---

## Current State & What's Missing

### ✅ Done
- Full landing page UI (static HTML)
- Auth modal (React)
- API utility layer
- Role-based user registration

### 🔧 Not Yet Built
- `/dashboard` route and page (redirected to after login)
- React routing (no React Router installed yet)
- Real cart/checkout backend integration
- Actual auction bidding logic (backend)
- Artist upload / admin dashboard
- Protected routes based on role (Admin / Artist / Viewer)
- Any tests

---

## Notes for Developers

- The `index.html` is a **standalone static page** — it does not use React. The React app (`App.jsx`) mounts into `<div id="root">` inside `index.html`, which only renders the auth modal for now.
- The cart in `index.html` is fully client-side JavaScript (no persistence).
- Session is stored as a cookie named `csrid` with 1-day expiry.
- The project uses **class-based React components** — if adding new components, keep them consistent or migrate gradually to hooks.
- Backend must be running separately on port `8080` for auth to work.
