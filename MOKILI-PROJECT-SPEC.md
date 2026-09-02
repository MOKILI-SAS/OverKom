# MOKILI-PROJECT-SPEC.md — SPÉCIFICATION TECHNIQUE DU PROJET OVERKOM 360

## 1. IDENTITÉ DU PROJET
- **Nom du Projet :** OverKom 360
- **Client :** OverKom 360 Agence de Communication
- **Localisation :** Kipé, Conakry, Guinée
- **Domaine Cible :** `overkomafrik.com`
- **Contact WhatsApp Direct :** +224 628 83 51 88

---

## 2. PROFIL & ARCHITECTURE
- **Profil MOKILI :** Vitrine (Primary) + Media & Content Hub + Lead Generation CRM
- **Architecture MOKILI :** Niveau C (Frontend React SPA + Backend API)
- **Framework MOKILI Central :** `C:\Users\MONYANYO\Desktop\MONYANYO\ENTREPRISE\MOKILI\FRAMEWORK`

---

## 3. DECISIONS D'ARCHITECTURE & D'INGÉNIERIE

### 3.1 FRONTEND (KEEP)
- **Décision :** Conserver React 18, Vite 5, TypeScript 5.6, Tailwind CSS 3.4, DaisyUI 4 et Framer Motion 11.
- **Justification :** La solution existante est performante, responsive, parfaitement construite et offre une excellente expérience utilisateur.

### 3.2 WHATSAPP DIRECT (KEEP)
- **Décision :** Générer dynamiquement les liens WhatsApp pré-remplis selon l'action utilisateur.
- **Justification :** Maximise le taux de conversion immédiat avec le numéro officiel +224 628 83 51 88.

### 3.3 BACKEND & API (ADAPT)
- **Décision :** Unifier la gestion de l'API pour éviter les duplications entre Express (`backend/src/index.ts`) et les Netlify Functions (`netlify/functions/*.mjs`).
- **Justification :** Garantit la cohérence entre les environnements de développement et de production.

### 3.4 BASE DE DONNÉES & CRM (MIGRATE - Defer)
- **Décision :** Reporter la migration du stockage `.jsonl` vers une BDD managée/relationnelle à l'étape où la gestion du CRM en ligne sera activée en production.
- **Justification :** Évite la sur-ingénierie inutile tant que les prospects sont directement reçus via WhatsApp.

---

## 4. DÉPLOIEMENT & INFRASTRUCTURE
- **Hébergement Frontend :** Vercel / Netlify / VPS MOKILI H03.
- **Domaine :** `overkomafrik.com`
- **Sécurité :** HTTPS / SSL Certbot, Helmet HTTP headers, CORS restreint, Express Rate Limiting.
