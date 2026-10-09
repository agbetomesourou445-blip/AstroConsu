# AstroConsu V6

V6 renforce AstroConsu pour une utilisation réelle et une future mise en production.

## Nouveautés

### Administration
- Gestion des utilisateurs et des rôles depuis `/admin/users`.
- Journal d'audit depuis `/admin/audit`.
- Traçabilité des changements importants.

### Notifications
- Notifications persistantes en PostgreSQL.
- Notifications pour changements de statut.
- Notifications d'assignation.
- Notifications de nouveaux messages.
- Centre de notifications dans l'espace utilisateur.

### Consultations humaines
- Demande d'accompagnement humain.
- Assignation consultant.
- Messagerie client/consultant.
- Notifications lors des nouveaux messages.
- Audit des actions importantes.

### Sécurité
- Contrôle des rôles côté serveur.
- Les données d'un utilisateur restent limitées à ses propres consultations.
- Les clés IA et paiement restent côté serveur.
- Les opérations administratives sont journalisées.

## Migration PostgreSQL

Après récupération :

```bash
npm install
npx prisma validate
npx prisma generate
npx prisma db push
npm run build
```

Pour une base déjà utilisée en production, préférez une vraie migration Prisma (`prisma migrate dev` puis `prisma migrate deploy`) plutôt qu'un `db push`.

## Rôles

Les comptes publics restent `USER`.

Un administrateur peut désormais changer le rôle depuis :

`/admin/users`

## Workflow V6

**Client → Consultation → Paiement → IA → Demande humaine → Attribution → Messagerie → Notifications → Audit → Consultation terminée**

## Étape suivante

V7 pourra être consacré à la qualité production :
- tests unitaires et tests API ;
- rate limiting ;
- protection CSRF/CORS selon architecture ;
- validation stricte avec schémas ;
- pages d'erreur et observabilité ;
- sauvegardes et stratégie de migration ;
- intégration réelle email/WhatsApp/Telegram selon les fournisseurs choisis ;
- tableau de bord financier.


## V7 — Production hardening

- Zod-based reusable validation schemas.
- Database health endpoint: `/api/health`.
- Production deployment checklist and safer migration guidance.
- Keep secrets server-side; never commit `.env`.
- For production databases, use Prisma migrations rather than `db push`.
- Configure monitoring/logging and backups before launch.

## V8 — Security & reliability

- Basic application rate limiting.
- Security response headers.
- Global error and 404 pages.
- Production checklist retained from V7.

## V9 — Test foundation

- Vitest test runner.
- Validation unit tests.
- Recommended CI sequence: `npm install`, `npx prisma validate`, `npx prisma generate`, `npm test`, `npm run build`.

## V12
Final release checklist and production preparation.
## V13
Production readiness checklist and deployment guidance are included in `docs/PRODUCTION-V13.md`.
## V14
Release and rollback checklist: `docs/RELEASE-V14.md`.

## V14 Build Hardening
See `docs/BUILD-FIX-V14.md`.

## V16 — Internationalisation

AstroConsu inclut désormais une page `/language` permettant de choisir entre :
- Français (`fr`)
- English (`en`)
- Español (`es`)
- Português (`pt`)

La préférence est enregistrée dans le cookie `astroconsu_locale` pour un an et peut être modifiée à tout moment. Le dictionnaire est centralisé dans `lib/i18n.ts` afin de permettre la traduction progressive de toutes les pages et des contenus dynamiques.

## V17 — Cosmic professional UI
- Added CSS-only cosmic background, stars, nebulae and orbit animations.
- Added animated guardian-angel flight layer on the home page.
- Added subtle animated icons and heading motifs across spiritual pages.
- Added reduced-motion accessibility support.
