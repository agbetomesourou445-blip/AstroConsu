# V10 — Production readiness

- Keep secrets in platform environment variables.
- Use `prisma migrate deploy` in production.
- Verify `/api/health` after deployment.
- Configure backups, monitoring and payment webhooks.
- Never expose AI, database or payment secret keys in browser code.
