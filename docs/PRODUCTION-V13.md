# AstroConsu V13 — Production readiness

V13 renforce la préparation au déploiement avec une checklist opérationnelle,
la validation des variables d'environnement et des recommandations de logs.

## Vérifications recommandées

```bash
npm install
npx prisma validate
npx prisma generate
npm test
npm run build
```

## Variables sensibles

Ne jamais committer les secrets suivants :
- DATABASE_URL
- AI_API_KEY
- FEDAPAY_SECRET_KEY
- FEDAPAY_WEBHOOK_SECRET

Utiliser `.env.example` comme modèle et configurer les vraies valeurs dans
l'environnement de déploiement.

## Base de données

Pour la production, préférer les migrations Prisma versionnées à `db push` :

```bash
npx prisma migrate deploy
```

Effectuer des sauvegardes PostgreSQL avant toute migration importante.

## Santé du service

Vérifier régulièrement :

```text
GET /api/health
```

La réponse doit confirmer que l'application et la connexion PostgreSQL sont
disponibles.

## Important

Cette archive n'est pas présentée comme « build validé » tant que `npm install`,
`npm test` et `npm run build` n'ont pas été exécutés dans un environnement avec
les dépendances et variables nécessaires.
