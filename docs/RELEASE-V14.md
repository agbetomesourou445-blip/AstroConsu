# AstroConsu V14 — Release & rollback checklist

## Avant déploiement

- [ ] `npm install`
- [ ] `npx prisma validate`
- [ ] `npx prisma generate`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] Variables d'environnement configurées
- [ ] PostgreSQL accessible
- [ ] Sauvegarde PostgreSQL disponible
- [ ] Webhook FedaPay configuré vers l'URL de production
- [ ] URL publique de l'application correcte
- [ ] Compte ADMIN contrôlé
- [ ] Compte CONSULTANT contrôlé
- [ ] Parcours utilisateur testé

## Après déploiement

1. Ouvrir `/api/health`.
2. Tester inscription/connexion.
3. Tester création d'un rêve.
4. Tester le parcours de consultation.
5. Tester l'accès consultant/admin.
6. Vérifier notifications et audit.
7. Vérifier les logs du déploiement.
8. Vérifier le paiement en environnement approprié.

## Rollback

En cas de régression :
1. conserver les logs et l'identifiant du déploiement ;
2. revenir au dernier commit/artefact connu comme stable ;
3. ne pas supprimer ou réinitialiser la base PostgreSQL ;
4. vérifier l'état des migrations avant toute nouvelle tentative ;
5. contrôler `/api/health` après rollback.

## Sécurité

Les clés secrètes restent uniquement côté serveur. Les interprétations
spirituelles, astrologiques, de tarot et de rêves restent présentées comme
symboliques/réflexives et ne doivent pas être formulées comme diagnostics
médicaux ou prédictions certaines.
