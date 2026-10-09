# V14 — Build hardening

Ordre recommandé avant déploiement :

```bash
npm install
npx prisma validate
npx prisma generate
npm test
npm run build
```

Le workflow GitHub configure des variables de test non sensibles afin que la
validation Prisma et la compilation Next.js ne dépendent pas des secrets de
production.

Les vraies clés AI/FedaPay/DB doivent rester dans les variables d'environnement
du fournisseur de déploiement et ne doivent jamais être commitées.
