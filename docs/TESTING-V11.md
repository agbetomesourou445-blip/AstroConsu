# V11 — Verification

Recommended checks:

```bash
npm install
npx prisma validate
npx prisma generate
npm test
npm run build
```

Before production, verify authentication, role permissions,
payment webhooks, consultation ownership, AI error handling,
database backups and notification workflows.
