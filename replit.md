# BARS Road Safety Platform

An evidence-led platform connecting India’s road-safety research, data, practitioners, and institutions around the 2030 mission.

## Run & Operate

- `pnpm install --frozen-lockfile` — install the imported workspace dependencies
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- The current API slice runs without external credentials; `DATABASE_URL` is required when database-backed routes are enabled.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/bars-platform/src/App.tsx` — BARS web shell, routes, mock repository, dashboard, directory, design system, and Ask BARS shell
- `artifacts/bars-platform/src/index.css` — shared BARS theme tokens, typography, dark mode, and motion
- `artifacts/api-server/src/` — Express API entrypoint and routes
- `artifacts/mockup-sandbox/` — canvas component preview server
- `attached_assets/` — imported source notes and assets

## Architecture decisions

- The web experience uses mock-backed, typed-in-source records for the first product slice so the information architecture can be validated before API retrieval is connected.
- The artifact keeps the existing pnpm workspace structure and path-based artifact routing.
- Vite configs preserve workflow-provided `PORT` and `BASE_PATH` values while providing artifact-local defaults for standalone builds.

## Product

- Public BARS homepage framing the Sarkaar, Bazaar, and Samaaj network
- Searchable evidence repository with format and region filters, saved records, record notes, and catalogue download
- National intelligence dashboard with state comparison and coverage indicators
- Verified stakeholder directory with organisation/expert filters and contribution prompt
- Living design-system showcase and global Ask BARS assistant shell
- 22 official Indic languages plus optional English, with persisted preference, native labels, and RTL handling
- Original high-resolution road-safety visuals, responsive media blocks, and autoplay-safe open-source field-film playback

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
