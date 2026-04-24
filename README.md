# GICHT' Gichtenaere - Cabinet de Psychologie

Site web et système de gestion pour le cabinet de psychologie GICHT' Gichtenaere.

## 📁 Structure du Projet (Monorepo)

```
gicht-gichtenaere/
├── frontend/          # Application React + Vite
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # API Node.js + Express + PostgreSQL
│   ├── src/
│   └── package.json
├── package.json       # Configuration monorepo
└── README.md
```

## 🛠️ Technologies

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **CSS Modules** - Styling

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **PostgreSQL** - Base de données
- **Nodemailer** - Envoi d'emails

## 🚀 Installation Rapide

### Prérequis
- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm ou yarn

### 1. Cloner le projet
```bash
git clone <repository-url>
cd gicht-gichtenaere
```

### 2. Installer toutes les dépendances
```bash
npm run install:all
```

### 3. Configuration Backend

Créer le fichier `.env` dans le dossier `backend/`:
```bash
cd backend
cp .env.example .env
```

Éditer `.env` avec vos configurations:
- PostgreSQL credentials
- SMTP configuration
- JWT secret
- etc.

### 4. Créer la base de données
```bash
createdb gicht_cabinet
```

### 5. Exécuter les migrations
```bash
npm run db:migrate
```

### 6. (Optionnel) Peupler avec des données de test
```bash
npm run db:seed
```

## 🏃 Démarrage

### Démarrer Frontend + Backend simultanément:
```bash
npm run dev
```

Cela démarre:
- Frontend sur `http://localhost:5173`
- Backend sur `http://localhost:5000`

### Ou démarrer séparément:

**Frontend uniquement:**
```bash
npm run dev:frontend
```

**Backend uniquement:**
```bash
npm run dev:backend
```

## 📚 Documentation

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Guide de Conformité Légale](./LEGAL_COMPLIANCE_GUIDE.md)
- [Résumé des Optimisations](./OPTIMIZATION_SUMMARY.md)

## 🔒 Sécurité & RGPD

Ce projet est conçu pour être conforme au RGPD et aux réglementations françaises sur les données de santé:

- ✅ Consentement explicite pour données de santé
- ✅ Bandeau de cookies conforme
- ✅ Politique de confidentialité complète
- ✅ Mentions légales avec numéros ADELI
- ✅ Conservation 20 ans (dossier médical)
- ✅ Hébergement HDS requis en production
- ✅ Chiffrement SSL/TLS
- ✅ Logs d'audit pour traçabilité

## 📋 Fonctionnalités

### Actuelles
- ✅ Site vitrine responsive
- ✅ Présentation de l'équipe (Théo & Cloé)
- ✅ Formulaire de contact
- ✅ Bandeau de cookies RGPD
- ✅ Pages légales complètes
- ✅ API Backend fonctionnelle
- ✅ Base de données PostgreSQL

### À Venir
- [ ] Système de prise de rendez-vous en ligne
- [ ] Espace patient sécurisé
- [ ] Espace praticien (gestion dossiers)
- [ ] Paiement en ligne
- [ ] Visioconférence intégrée
- [ ] Rappels automatiques par email/SMS

## 🚨 Important - Production

Avant de déployer en production:

### Backend
1. ✅ Changer tous les secrets (JWT_SECRET, DB_PASSWORD)
2. ✅ Utiliser un hébergeur certifié HDS
3. ✅ Configurer SSL/TLS (HTTPS)
4. ✅ Activer les logs
5. ✅ Configurer les sauvegardes automatiques
6. ✅ Mettre en place un monitoring

### Frontend
1. ✅ Build de production: `npm run build:frontend`
2. ✅ Optimiser les images
3. ✅ Configurer le CDN si nécessaire
4. ✅ Tester sur tous les navigateurs

### Données
1. ✅ Compléter les numéros ADELI réels
2. ✅ Ajouter les informations d'assurance professionnelle
3. ✅ Définir l'adresse du cabinet
4. ✅ Configurer les tarifs

## 📦 Scripts Disponibles

### Monorepo (racine)
- `npm run dev` - Démarrer frontend + backend
- `npm run install:all` - Installer toutes les dépendances
- `npm run build:frontend` - Build du frontend
- `npm run db:migrate` - Migrations base de données
- `npm run db:seed` - Peupler la base de données

### Frontend (dans frontend/)
- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualiser le build

### Backend (dans backend/)
- `npm run dev` - Serveur avec hot reload
- `npm start` - Serveur de production
- `npm run db:migrate` - Exécuter les migrations
- `npm run db:seed` - Peupler la base

## 🤝 Contribution

Ce projet est privé et destiné au Cabinet GICHT' Gichtenaere.

## 📞 Contact

**Cabinet GICHT' Gichtenaere**
- Email: contact@gichtenaere.fr
- Téléphone: +33 1 23 45 67 89
- Site web: https://gichtenaere.fr

## 📄 Licence

UNLICENSED - Propriété du Cabinet GICHT' Gichtenaere
