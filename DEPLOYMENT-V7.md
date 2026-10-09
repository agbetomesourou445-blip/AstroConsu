# AstroConsu V7 — Deployment checklist

1. Copy `.env.example` to `.env` / platform environment variables.
2. Configure PostgreSQL and `DATABASE_URL`.
3. Configure AI and FedaPay secrets on the server only.
4. Run:
   - `npm install`
   - `npx prisma validate`
   - `npx prisma generate`
   - `npx prisma migrate deploy`
   - `npm run build`
5. Verify `GET /api/health`.
6. Configure FedaPay webhook URL with the production domain.
7. Create/verify ADMIN and CONSULTANT accounts.
8. Configure database backups and application monitoring.
