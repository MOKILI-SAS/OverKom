# OverKom 360 — Site vitrine

Agence créative full-service, Conakry.

## Prérequis

- Node.js 20+ (testé aussi sur 24)
- npm 11+

## Démarrer

```bash
npm install
npm run dev
```

- Front : http://localhost:5177
- API leads : http://127.0.0.1:8787/api/health

## Contenu

Tout le copy vit dans `frontend/src/content/`. Pour ajouter :

- un **service** → `content/services.ts`
- un **partenaire** → fichier dans `frontend/src/assets/partners/` + entrée dans `content/partners.ts`
- un **membre** → photo compressée dans `frontend/src/assets/team/` + `content/team.ts`

## Vidéo hero

Déposer `team-loop.webm` et `team-loop.mp4` dans `frontend/src/assets/hero/`, puis brancher les `<source>` dans `sections/Hero.tsx`. Le poster actuel reste le fallback.

## Formulaire

`POST /api/leads` — les demandes sont appendées dans `backend/data/leads.jsonl` (créé au premier envoi). Brancher un SMTP plus tard sans changer le front.
