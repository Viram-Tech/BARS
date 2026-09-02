---
name: Artifact build compatibility
description: Guidance for keeping Replit artifact builds compatible with workflow and standalone invocation contexts.
---

Vite-based artifacts should preserve `PORT` and `BASE_PATH` supplied by their Replit workflow while also having safe artifact-local defaults for standalone workspace builds.

**Why:** Root workspace verification and production build commands may not inherit the environment variables injected by an artifact workflow, causing otherwise healthy imported artifacts to fail before Vite starts.

**How to apply:** When an artifact config validates workflow-only environment variables, retain validation for malformed supplied values but default missing values to that artifact’s registered local port and preview path.