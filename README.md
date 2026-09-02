# BARS Road Safety Platform

An evidence-led platform connecting India’s road-safety research, data, practitioners, and institutions around the 2030 mission (Sarkaar, Bazaar, and Samaaj network).

---

## Architecture Overview

- **Frontend (`artifacts/bars-platform`)**:
  - React 19 + TypeScript 5.9
  - Vite 7 build tooling with Tailwind CSS v4 and `@tailwindcss/vite`
  - Wouter lightweight client-side routing
  - Radix UI primitives, Lucide icons, Framer Motion animations, Recharts data visualization
  - 23 supported languages (22 official Indic languages + English) with persisted user preferences and RTL handling
- **API Server (`artifacts/api-server`)**:
  - Express 5 REST API with Pino logging
  - Health checks and language preference endpoints
  - Bundled with esbuild
- **Database & Shared Libraries (`lib/`)**:
  - `@workspace/db`: PostgreSQL schema with Drizzle ORM
  - `@workspace/api-zod`: Shared Zod validation schemas
  - `@workspace/api-client-react`: React Query hooks generated via Orval
  - `@workspace/api-spec`: OpenAPI 3.0 specification

---

## Prerequisites

- **Node.js**: v20.x or higher (v22+ recommended; v25 verified)
- **pnpm**: v9.x or higher (`npm install -g pnpm`)

---

## Quickstart (Local Development)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start the Frontend Web Platform
```bash
pnpm run dev
```
The website will start at **`http://localhost:5173`** (or port configured via `PORT` environment variable).

### 3. Start the Backend API Server (Optional)
```bash
pnpm run dev:api
```
The API server starts at **`http://localhost:5000`**. The frontend automatically proxies any `/api/*` calls to port 5000.

---

## Available Commands

| Command | Description |
|---|---|
| `pnpm run dev` / `pnpm run dev:web` | Starts the BARS web platform dev server with Vite hot reload |
| `pnpm run dev:api` | Builds and starts the Express API server in development mode |
| `pnpm run build` | Full workspace typecheck and production build for all packages |
| `pnpm run build:web` | Compiles the web frontend into `artifacts/bars-platform/dist/public` |
| `pnpm run build:api` | Bundles the API server into `artifacts/api-server/dist/index.mjs` |
| `pnpm run preview` / `pnpm run start:web` | Locally previews the compiled production frontend build |
| `pnpm run start:api` | Starts the compiled production API server |
| `pnpm run typecheck` | Runs TypeScript type checking across all workspace libraries and artifacts |

---

## Production Deployment

### Frontend (Static Web Hosting)
Run the production build:
```bash
pnpm run build:web
```
The compiled output is located in:
```
artifacts/bars-platform/dist/public/
```
This folder contains static assets (HTML, JS, CSS, images) and can be deployed directly to any static host:
- **Vercel / Netlify / Cloudflare Pages / AWS S3 + CloudFront**
- Set root / publish directory to: `artifacts/bars-platform/dist/public`
- Single-page application (SPA) rewrite rule: redirect all routes (`/*`) to `/index.html`

### Backend (Node.js Service)
Build the API bundle:
```bash
pnpm run build:api
```
Run in production:
```bash
node artifacts/api-server/dist/index.mjs
```
Configure environment variables:
- `PORT`: HTTP port to bind (default: `5000`)
- `DATABASE_URL`: PostgreSQL connection string (when database-backed routes are active)

---

## License

MIT
