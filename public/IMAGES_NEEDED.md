# Images manquantes / Missing Images

## ⚠️ IMPORTANT - Images requises pour le site

Ce fichier liste toutes les images qui doivent être placées dans le dossier `public/` pour que le site fonctionne correctement.

### Structure des dossiers requis:

```
frontend/public/
├── providers/          ← Créer ce dossier
│   ├── theo-avatar.jpg
│   ├── theo-full.png
│   ├── cloe-avatar.jpg
│   └── cloe-full.jpg
├── icons/              ← Créer ce dossier
│   ├── icon_1_3d-1.png
│   ├── icon_2_3d-2.png
│   └── icon_3_3d-1-276x300.png
├── logo.png            ✓ Existe
├── background-green.jpg ✓ Existe
└── 34ec78ae0ab34927ea8e9cf17c713ba5.jpg ✓ Existe
```

## Images des psychologues (providers/)

### Théo Gichtenaere
- **theo-avatar.jpg** - Photo avatar pour la sélection de praticien
- **theo-full.png** - Photo complète pour la page équipe

### Cloé Gichtenaere
- **cloe-avatar.jpg** - Photo avatar pour la sélection de praticien
- **cloe-full.jpg** - Photo complète pour la page équipe

## Icônes (icons/)

### Étapes du processus
- **icon_3_3d-1-276x300.png** - Icône "Prise de rendez-vous"
- **icon_2_3d-2.png** - Icône "Première séance"
- **icon_1_3d-1.png** - Icône "Suivi personnalisé"

---

## 🔧 Comment corriger le problème

1. **Récupérer les images originales** depuis votre source (design, photographe, etc.)

2. **Créer les dossiers manquants:**
   ```bash
   mkdir -p frontend/public/providers
   mkdir -p frontend/public/icons
   ```

3. **Placer les images dans les bons dossiers:**
   - Photos des psychologues → `frontend/public/providers/`
   - Icônes des étapes → `frontend/public/icons/`

4. **Vérifier que les images sont bien copiées lors du build:**
   ```bash
   cd frontend
   npm run build
   ls -la dist/providers/
   ls -la dist/icons/
   ```

5. **Pousser les changements sur GitHub:**
   ```bash
   git add frontend/public/providers/ frontend/public/icons/
   git commit -m "Add missing provider and icon images"
   git push
   ```

---

## 📝 Notes techniques

- Les images dans `public/` sont automatiquement copiées dans `dist/` lors du build Vite
- Les chemins dans le code utilisent `/providers/` et `/icons/` (sans `/dist/`)
- Vite sert les fichiers de `public/` depuis la racine `/` en production
- **NE PAS** mettre les images dans `dist/` directement - elles seront écrasées au prochain build

---

## ✅ Vérification

Une fois les images ajoutées, vérifiez que:
- [ ] Les dossiers `public/providers/` et `public/icons/` existent
- [ ] Toutes les images listées ci-dessus sont présentes
- [ ] Le build local (`npm run build`) copie bien les images dans `dist/`
- [ ] Les images s'affichent correctement sur le site déployé
