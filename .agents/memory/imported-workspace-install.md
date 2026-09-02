---
name: Imported workspace installation
description: Recovery guidance when a freshly imported pnpm monorepo has package metadata but missing workspace executable links.
---

When an imported pnpm workspace reports that commands such as `tsc`, `vite`, or `esbuild` are missing despite a lockfile being present, a forced frozen-lockfile install can rebuild the workspace links without changing dependency versions.

**Why:** An interrupted first install can populate the pnpm store and leave a partial `.pnpm` directory while executable links remain absent, causing every workflow to fail with `spawn ENOENT`.

**How to apply:** Confirm the lockfile is current, then repair the install with `pnpm install --frozen-lockfile --force` before debugging application code.