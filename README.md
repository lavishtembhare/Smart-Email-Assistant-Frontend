# Smart Email Assistant — Frontend

React + Vite frontend for the Smart Email Assistant, plus the companion Gmail Chrome extension.
Paste in an email and get a polished reply, or compose a new one from just a subject line.

## Features

- Landing page explaining the product, with a live "redline" demo of a rough email turning into
  a polished reply
- Generator tool with two modes — **Reply** (paste a thread, get a response) and **Compose**
  (subject + recipient, get a new email) — both with adjustable tone
- Light/dark theme toggle
- Copy-to-clipboard, with confirmation
- Chrome extension section with install steps and a direct download

## Tech stack

- React + Vite
- Material UI (`@mui/material`, `@emotion/react`, `@emotion/styled`)
- Custom design system: IBM Plex Mono/Sans, CSS custom properties for theming
  (`src/index.css`), MUI theme wired to the same tokens (`src/theme.js`)

## Prerequisites

- Node.js 18+ and npm
- The backend API running locally or deployed (see the backend README)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:
   ```dotenv
   VITE_API_GENERATE_URL=http://localhost:8080/api/email/generate
   VITE_API_COMPOSE_URL=http://localhost:8080/api/email/compose
   ```
   Point these at wherever the backend is actually running (local or deployed).

3. Start the dev server:
   ```bash
   npm run dev
   ```

## Building for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

Deploy the resulting `dist/` folder to any static host (Vercel, Netlify, Render static site,
GitHub Pages, etc.) — make sure the same `.env` variables are configured for that environment
too (most hosts have a place to set build-time env vars).

## Project structure

```
src/
├── main.jsx                 # entry point
├── App.jsx                  # owns theme mode + view (landing vs. generator)
├── App.css / index.css      # design tokens, light/dark variants, global styles
├── theme.js                 # MUI theme, mirrors the CSS tokens
├── assets/
│   └── logo.svg
└── components/
    ├── LandingPage.jsx
    ├── EmailGenerator.jsx    # the actual tool (Reply / Compose tabs)
    └── ThemeToggle.jsx

public/
├── logo.svg                              # favicon
└── smart-email-assistant-extension.zip   # linked from the landing page's download button
```

## Chrome extension

The `extension/` folder (sibling to `src/`) is a separate Manifest V3 Chrome extension that
injects an AI button into Gmail's compose toolbar. It isn't built by Vite — it's loaded
independently:

1. Unzip `public/smart-email-assistant-extension.zip` (or use the `extension/` folder directly)
2. Open `chrome://extensions`, enable **Developer mode**
3. Click **Load unpacked** and select the folder

The extension reads its backend URLs from constants inside `content.js`, not from this
project's `.env` — Vite env vars aren't available to a plain content script. Update those
separately if the backend URL changes.

## Design notes

- Colors and type are defined once as CSS variables (`--color-*`, `--font-*`) in `index.css`,
  with a `[data-theme='dark']` override block — `theme.js` reads the same values so MUI
  components stay in sync.
- The logo (envelope + checkmark) and the "redline" hero animation are the two custom visual
  elements tying the reply-drafting concept to the visual design.