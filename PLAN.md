# PLAN.md — PLAN DE REMISE EN ORDRE & MIGRATION MOKILI

## VUE D'ENSEMBLE
Plan de migration progressive par lots pour aligner le projet OverKom 360 avec les standards de sécurité et d'architecture MOKILI sans aucune rupture fonctionnelle.

---

## LOT 0 — Audit, Cadrage & Constitution MOKILI
- **Objectif :** Créer la documentation de pilotage et l'audit initial MOKILI.
- **Fichiers concernés :** `CLAUDE.md`, `PLAN.md`, `SUIVI.md`, `MOKILI-PROJECT-SPEC.md`.
- **Risques :** Aucun (documentation uniquement).
- **Statut :** `COMPLETED`

---

## LOT 1 — Rationalisation & Sécurisation Backend
- **Objectif :** Unifier la gestion des leads, sécuriser l'API et supprimer les duplications entre Express et Serverless.
- **Fichiers concernés :** `backend/src/index.ts`, `netlify/functions/*.mjs`, `frontend/src/content/site.ts`.
- **Risques :** Moyen (tests d'API requis).
- **Statut :** `IN_PROGRESS`

---

## LOT 2 — Optimisation Frontend, Médias & Performance
- **Objectif :** Vérifier la fluidité des carrousels (Équipe, Partenaires, Médiathèque), l'optimisation des images/vidéos et l'accessibilité.
- **Fichiers concernés :** `frontend/src/sections/*`, `frontend/src/content/site.ts`.
- **Risques :** Faible (maintien de l'UX existante).
- **Statut :** `PLANNED`

---

## LOT 3 — Déploiement de Production & Configuration DNS
- **Objectif :** Déployer la version finale validée sur l'infrastructure retenue (Vercel, Netlify ou VPS H03) et lier le domaine `overkomafrik.com`.
- **Fichiers concernés :** Configuration DNS, SSL, Variables d'environnement de production.
- **Risques :** Élevé (requiert l'autorisation explicite du client).
- **Statut :** `PLANNED`
