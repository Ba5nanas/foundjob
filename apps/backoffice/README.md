# FoundJob Backoffice

Admin system for user, company, job, application, role, permission, setting, file, package, and audit workflows.

Rules:

- Backoffice uses explicit admin API routes only.
- Providers call Main Control through Unix Domain Socket.
- Admin file management goes through Backoffice Service, not File Service directly.
