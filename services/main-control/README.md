# FoundJob Main Control

Internal synchronous gateway between Next.js providers and domain microservices.

Rules:

- Internal only.
- Listens through Unix Domain Socket in Docker/Linux.
- Does not expose public HTTP ports in production.
- Calls domain microservices through Unix Domain Socket clients.
- Does not own domain data.
