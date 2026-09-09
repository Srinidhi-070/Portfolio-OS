# Portfolio OS

An interactive **desktop operating system** portfolio for **Srinidhi N S** — an AI & Data Science graduate and aspiring AI Engineer. Instead of a static page, visitors "boot" into a fictional OS and open app windows (About, Projects, Skills, Terminal, GitHub, Resume, Contact, etc.) to explore his work.

> Built with React 19 + TypeScript, Tailwind CSS v4, Motion, Express and the Google Gemini API.

## Features

- **Boot & Lock screens** with live clock and an animated mesh-gradient background.
- **Window manager** — open, close, minimize, maximize, drag, resize, and z-stack app windows.
- **Warp Terminal** — `help`, `whoami`, `projects`, `cat about.txt`, `sudo hire-me`, plus a live **Gemini AI assistant** (`ai <question>`).
- **Command Palette** — `Ctrl/⌘ + K` to search across apps, projects, and skills.
- **Live GitHub metrics** — fetched server-side with a 15-minute cache and an offline fallback.
- **Customizable** — themes, accent colors, wallpapers, sound feedback, and reduced-motion.
- **Real resume download** — the Resume app downloads the official `Resume.pdf`.

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion, lucide-react
- **Backend:** Express (`server.ts`) running Vite in middleware mode for dev and serving `dist/` in production
- **AI:** Google Gemini (`@google/genai`) powering the in-app terminal assistant

## Run Locally

**Prerequisites:** Node.js (v18+) and a Gemini API key.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file in the project root and add your key:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   (Without a key the terminal still works in simulated offline mode with `help`, `projects`, `skills`, etc.)
3. Start the dev server:
   ```bash
   npm run dev
   ```
   The app runs at **http://localhost:3000**.

## Scripts

| Script              | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Start Express + Vite dev server (`tsx server.ts`)            |
| `npm run build`     | Production build (Vite + esbuild server bundle to `dist/`)   |
| `npm start`         | Run the production build (`node dist/server.cjs`)             |
| `npm run preview`   | Vite preview of the client build                            |
| `npm run lint`      | Type-check with `tsc --noEmit`                              |

## Project Structure

```
server.ts                 Express API (health, github proxy, ai-terminal, contact)
src/
  main.tsx, App.tsx        React entry + OS shell
  context/OSContext.tsx    Global window/theme/notification state
  data/portfolioData.ts    All portfolio content (projects, skills, experience…)
  lib/theme.ts             Theme + accent CSS-variable logic
  components/
    desktop/               Boot, Lock, TopBar, Dock, Window, Command Palette, etc.
    apps/                  One component per "app" (Projects, Skills, Terminal…)
public/
  Resume.pdf               Official resume served at /Resume.pdf
  favicon.svg
```

## Notes

- The contact form logs submissions server-side (see `/api/contact` in `server.ts`); wire up an email provider (e.g. Resend) to deliver them.
- Generated from a Google AI Studio scaffold; adapted into the full Portfolio OS experience.
