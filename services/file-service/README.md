# FoundJob File Service

Internal file metadata and storage service.

Rules:

- Internal only.
- Next.js must never call this service directly.
- Domain services call this service through Unix Domain Socket.
- Public files return `/public/*` URLs and are served by Nginx.
- Private and encrypted files require domain permission checks before streaming.
