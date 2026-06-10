# Documentation SEO - Cabinet Gichtenaere

## Fichiers SEO créés

### 1. **robots.txt** (`/public/robots.txt`)
- Autorise tous les robots d'indexation
- Bloque les pages admin et API
- Référence le sitemap
- Crawl-delay pour éviter la surcharge

### 2. **sitemap.xml** (`/public/sitemap.xml`)
- Liste toutes les pages principales du site
- Priorités définies pour chaque page
- Fréquences de mise à jour
- Format XML standard

**Pages incluses:**
- Accueil (priorité 1.0)
- Tarifs (priorité 0.9)
- Formats d'accompagnement (priorité 0.9)
- Prise de rendez-vous (priorité 0.8)
- Blog (priorité 0.7)
- Mentions légales (priorité 0.3)
- Politique de confidentialité (priorité 0.3)

### 3. **Meta Tags SEO** (`/index.html`)

#### Meta tags de base:
- Title optimisé avec localisation
- Description attractive (155 caractères)
- Keywords pertinents
- Canonical URL
- Robots directives avancées

#### Geo Tags:
- Région (Var - 83)
- Ville (Saint-Maximin-la-Sainte-Baume)
- Coordonnées GPS précises

#### Open Graph (Facebook):
- Type, URL, titre, description
- Image de partage
- Dimensions d'image
- Locale et site name

#### Twitter Cards:
- Card type: summary_large_image
- Tous les champs nécessaires

#### Schema.org (JSON-LD):
- Type: MedicalBusiness
- Informations complètes du cabinet
- Adresse complète avec géolocalisation
- Horaires d'ouverture (7j/7, 7h30-21h)
- Services disponibles (bilans, thérapies)
- Employés (Théo & Cloé)
- Moyens de paiement
- Prix range

### 4. **manifest.json** (`/public/manifest.json`)
- Configuration PWA
- Icônes et couleurs
- Mode standalone
- Métadonnées de l'application

### 5. **.htaccess** (`/public/.htaccess`)
- Force HTTPS
- Redirection www → non-www
- Gestion des routes SPA
- Compression Gzip
- Cache control
- Security headers
- Protection fichiers sensibles

### 6. **_redirects** (`/public/_redirects`)
- Configuration Netlify/Vercel
- Gestion routes SPA
- Redirections HTTPS

### 7. **humans.txt** (`/public/humans.txt`)
- Crédits de l'équipe
- Technologies utilisées
- Informations de contact

## Optimisations SEO supplémentaires

### Performance
- Preconnect pour Google Fonts
- Images optimisées
- Code splitting automatique (Vite)
- Lazy loading des composants

### Accessibilité
- Lang="fr" sur html
- Attributs ARIA appropriés
- Contraste de couleurs conforme
- Navigation au clavier

### Mobile-First
- Meta viewport correctement configuré
- Design responsive
- Touch-friendly
- Apple mobile web app tags

## Prochaines étapes recommandées

### 1. Google Search Console
- Soumettre le sitemap.xml
- Vérifier l'indexation
- Surveiller les performances
- Corriger les erreurs d'exploration

### 2. Google My Business
- Créer une fiche d'établissement
- Ajouter photos et horaires
- Gérer les avis clients
- Optimiser pour la recherche locale

### 3. Backlinks
- Annuaires médicaux
- Pages Jaunes
- Doctolib
- Annuaires locaux (Var, Saint-Maximin)

### 4. Contenu
- Blog régulier (1-2 articles/mois)
- FAQ détaillée
- Pages services détaillées
- Témoignages patients (avec consentement)

### 5. Analytics
- Google Analytics 4
- Google Tag Manager
- Suivi conversions (RDV)
- Heat maps (Hotjar)

### 6. Schema.org avancé
- LocalBusiness
- FAQPage
- BreadcrumbList
- Review/AggregateRating

### 7. Performance
- Optimiser les images (WebP)
- CDN pour assets statiques
- Service Worker pour cache offline
- Critical CSS inline

## Mots-clés ciblés

### Principaux:
- psychologue Saint-Maximin
- neuropsychologue Var
- bilan TDAH
- bilan autisme
- consultation mémoire
- thérapie de couple Saint-Maximin

### Secondaires:
- psychologue enfant Var
- burn-out Saint-Maximin
- anxiété Var
- dépression 83
- PCO Var
- remédiation cognitive

### Longue traîne:
- "psychologue ouvert dimanche Saint-Maximin"
- "bilan TDAH adulte Var"
- "neuropsychologue consultation mémoire"
- "thérapie familiale 83"

## URLs à soumettre

1. https://gichtenaere.fr/
2. https://gichtenaere.fr/tarifs
3. https://gichtenaere.fr/formats-accompagnement
4. https://gichtenaere.fr/prendre-rdv
5. https://gichtenaere.fr/blog
6. https://gichtenaere.fr/sitemap.xml

## Vérifications post-déploiement

- [ ] Vérifier robots.txt accessible: https://gichtenaere.fr/robots.txt
- [ ] Vérifier sitemap.xml accessible: https://gichtenaere.fr/sitemap.xml
- [ ] Tester les meta tags avec https://metatags.io/
- [ ] Tester le Schema.org avec https://search.google.com/test/rich-results
- [ ] Tester la vitesse avec PageSpeed Insights
- [ ] Vérifier le responsive avec Mobile-Friendly Test
- [ ] Tester les redirections HTTPS
- [ ] Vérifier le manifest.json avec Lighthouse
- [ ] Soumettre à Google Search Console
- [ ] Soumettre à Bing Webmaster Tools

## Maintenance SEO

### Hebdomadaire:
- Vérifier Google Search Console
- Répondre aux avis Google
- Publier sur réseaux sociaux

### Mensuel:
- Analyser le trafic (GA4)
- Mettre à jour le sitemap si nouvelles pages
- Vérifier les backlinks
- Publier 1-2 articles de blog

### Trimestriel:
- Audit SEO complet
- Mise à jour des meta descriptions
- Optimisation des images
- Revue des mots-clés

### Annuel:
- Refonte du contenu ancien
- Mise à jour Schema.org
- Revue de la stratégie SEO globale
- Audit de sécurité

## Ressources utiles

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org Validator](https://validator.schema.org/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Meta Tags Checker](https://metatags.io/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## Contact

Pour toute question SEO, contactez: contact@gichtenaere.fr
