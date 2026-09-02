# CLAUDE.md — DIRECTIVES DE DÉVELOPPEMENT MOKILI OVERKOM 360

## 1. VUE D'ENSEMBLE
- **Projet :** OverKom 360 (Site Web & Vitrine 360°)
- **Organisation :** MOKILI SAS
- **Profil MOKILI :** Vitrine (Primary) + Content & Media + CRM Leads (Secondary)
- **Architecture :** Niveau C (Frontend React SPA + Backend API)

---

## 2. COMMANDES UTILES

### Développement Local
```bash
# Lancer Frontend + Backend en parallèle
npm run dev

# Lancer uniquement le Frontend
npm run dev:front

# Lancer uniquement le Backend
npm run dev:back
```

### Build & Typecheck
```bash
# Verification TypeScript complète
npm run typecheck

# Build de production
npm run build
```

---

## 3. RÈGLES DE DÉVELOPPEMENT MOKILI
1. **Ne rien casser :** Conserver la stack Frontend React/Vite, les assets visuels, la médiathèque et la logique WhatsApp dynamique.
2. **Aucune action destructive :** Ne jamais supprimer de données, réinitialiser Git ou modifier des enregistrements DNS sans autorisation explicite.
3. **Vérité du dépôt :** Se référer aux fichiers réels et à `MOKILI-PROJECT-SPEC.md` pour toute décision d'architecture.
4. **Validation :** Exécuter `npm run typecheck` et `npm run build` après chaque modification significative.
