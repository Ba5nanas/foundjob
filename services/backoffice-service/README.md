# FoundJob Backoffice Service

Owns admin workflows, role levels, permissions, settings, file moderation routing, and audit logs.

Backoffice Admin Users are separate from public job seeker users, company users, company staff, and company employees.
This service owns the Backoffice Admin User domain, role level policy, permissions, audit logs, and default SUPERADMIN seed flow.

Seed command scaffold:

```bash
bun run seed:superadmin
```

The seed must be wired to Prisma before use against a real database. It is designed to create default permissions, default
roles, role-permission mappings, and a default SUPERADMIN only when no SUPERADMIN exists.

Required environment variables:

- `FOUNDJOB_DEFAULT_SUPERADMIN_EMAIL`
- `FOUNDJOB_DEFAULT_SUPERADMIN_PASSWORD`
- `FOUNDJOB_DEFAULT_SUPERADMIN_FULL_NAME`
