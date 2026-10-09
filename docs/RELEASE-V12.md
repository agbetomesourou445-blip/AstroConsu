# V12 — Release checklist

## Application
- Authentication and authorization reviewed.
- User, consultant and admin workflows reviewed.
- Notifications and audit logs reviewed.
- AI remains symbolic/reflection-oriented and non-predictive.

## Payments
- FedaPay secrets remain server-side.
- Production webhook configured.
- Paid services verify payment server-side.

## Database
- PostgreSQL reachable.
- Prisma schema validated.
- Production migrations deployed.
- Backups configured.

## Deployment
- Environment variables configured.
- `/api/health` is healthy.
- CI runs tests and build.
- Error monitoring enabled.
