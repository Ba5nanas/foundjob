# FoundJob

FoundJob is a production-ready job board platform for job seekers, companies, and backoffice administrators.

## Architecture

- Nginx is the only public gateway.
- Next.js apps expose explicit domain API routes only.
- Next.js providers call Main Control through Unix Domain Socket.
- Main Control calls domain microservices through Unix Domain Socket.
- Domain services publish async events to Kafka workers.
- Public files are served by Nginx from `/public/*`.
- Private files go through explicit domain routes, permission checks, and File Service.

## Monorepo

```text
apps/
  landingpage/
  backoffice/
services/
  main-control/
  file-service/
workers/
packages/
infrastructure/
```

## Commands

```bash
bun install
bun run dev
bun run lint
bun run test
bun run build
docker compose -f compose.dev.yml up --build
docker compose -f compose.prod.yml up --build
```

## Development URLs

- Landingpage: `http://localhost:8080`
- Backoffice: `http://localhost:8080/backoffice`
- Public files: `http://localhost:8080/public/*`
- Landingpage API routes: `http://localhost:8080/api/*`
- Backoffice API routes: `http://localhost:8080/backoffice/api/*`

## Rules

- Do not use legacy placeholder names as package, service, database, image, or container names.
- Do not use Vite for Next.js apps.
- Do not create generic proxy API routes.
- Do not let Next.js call File Service directly.
- Do not let SSR resolve `fileId`.
- Do not expose internal services in production.
- Do not create a global Prisma schema.
