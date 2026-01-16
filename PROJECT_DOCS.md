# Martins Automotive - Documentation Projet

## Vue d'ensemble du projet

Site web Next.js 15.5.2 pour le garage automobile "Martins Automotive" à Huizingen, avec système de prise de rendez-vous en ligne intégré à Google Calendar.

### Informations Garage
- **Nom**: Martins Automotive
- **Localisation**: Huizingen (Belgique - région bilingue FR/NL)
- **Téléphone**: 0473 64 79 47
- **Services**: 9 services automobiles (entretien, diagnostic, pneus, etc.)

---

## Stack Technique

### Framework & Versions
- **Next.js**: 15.5.2 (App Router)
- **React**: 19.1.0
- **TypeScript**: Mode strict activé
- **Tailwind CSS**: Version 4 avec PostCSS
- **next-intl**: Support multilingue FR/NL

### Structure du projet
```
src/
├── app/
│   ├── [locale]/          # Routes multilingues (fr/nl)
│   ├── layout.tsx
│   └── globals.css
├── components/            # Composants React client-side
├── i18n/                  # Configuration next-intl
├── middleware.ts          # Gestion des locales
└── utils/                 # API client, backend Node.js
messages/
├── fr.json               # Traductions françaises
└── nl.json               # Traductions néerlandaises
```

### Commandes de développement
```bash
npm run dev      # Serveur de dev (http://localhost:3000)
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # ESLint
```

---

## Système de Réservation

### Architecture
Le système utilise Google Calendar API pour gérer les rendez-vous avec:
- Vérification de disponibilité en temps réel
- Gestion de capacité par service
- Envoi automatique de 2 emails distincts
- Rappels automatiques

### Flow de réservation (4 étapes)
1. **Sélection du service** - 9 services disponibles avec durées spécifiques
2. **Choix de la date** - Calendrier interactif avec disponibilités en temps réel
3. **Choix de l'heure** - Créneaux filtrés selon durée du service et capacité
4. **Formulaire client** - Informations complètes + confirmation

### Durées des services

| Service | Durée | Capacité Max/jour | Capacité Max/semaine | Période refroidissement |
|---------|-------|------------------|---------------------|------------------------|
| Entretien | 2h | - | - | 3 jours |
| Diagnostic | 1h | 4 | 20 | - |
| Contrôle technique | 8h | - | 1 | - |
| Pneus | 1h30 | 2 | 10 | - |
| Moteur | 4h | 1 | 5 | - |
| Carrosserie | 6h | 1 | 4 | - |
| Freins | 2h | 2 | 10 | - |
| Suspension | 3h | 2 | 8 | - |
| Climatisation | 1h30 | 3 | 12 | - |

**Fichier de configuration**: `src/utils/serviceDurations.ts`

### Système de capacité

#### Période de refroidissement (cooldown)
Pour certains services comme l'Entretien, une période de refroidissement est appliquée **tous clients confondus**.

**Exemple concret pour Entretien (cooldown 3 jours)**:
- Mardi 10h: Client A réserve → ✅ Confirmé
- Mardi 14h: Client B essaie → ❌ Indisponible (cooldown actif)
- Mercredi-Vendredi: Tous créneaux → ❌ Cooldown actif (jours 1-3)
- Samedi: Créneaux disponibles → ✅ 3 jours complets écoulés
- Samedi 11h: Client C réserve → ✅ Confirmé
- Samedi 15h: Client D essaie → ❌ Nouveau cooldown

#### Limites journalières/hebdomadaires
Les limites s'appliquent **tous clients confondus**:
- **maxPerDay**: Nombre max de RDV pour ce service par jour
- **maxPerWeek**: Nombre max de RDV pour ce service par semaine (lundi-dimanche)

### Horaires d'ouverture
- **Lundi-Vendredi**: 09:00 - 18:00
- **Samedi**: 09:00 - 17:00
- **Dimanche**: Fermé

Les créneaux sont automatiquement filtrés pour que les services se terminent avant la fermeture.

---

## Système d'Emails

### Deux emails distincts envoyés automatiquement

#### 1. Email pour le Garage
**Destinataire**: Variable d'environnement `GARAGE_EMAIL`

```
Sujet: 🔧 [RDV] [Service] - [Nom du Client]

NOUVEAU RENDEZ-VOUS CLIENT

📋 Service demandé: [Service]
⏱️ Durée estimée: [X heures]

👤 Informations client:
Nom: [Prénom Nom]
Email: [email@example.com]
Téléphone: [+32...]
N° de châssis: [VIN]

📝 Description du besoin:
[Description fournie par le client]
```

**Caractéristiques**:
- Toutes les informations du client
- Détails techniques complets
- Rappels: 24h avant + 1h avant (popup)
- Visible dans Google Calendar

#### 2. Email pour le Client
**Destinataire**: Email fourni dans le formulaire

```
Sujet: Rendez-vous - [Service]

Bonjour [Prénom],

Votre rendez-vous chez Martins Automotive a été enregistré.

📅 Date et heure: [Date complète]
🔧 Service: [Service]
⏱️ Durée estimée: [X heures]

📍 Adresse:
Martins Automotive
Huizingen

📞 Contact:
Téléphone: 0473 64 79 47

Nous vous contacterons prochainement pour confirmer les détails.

À bientôt,
L'équipe Martins Automotive
```

**Caractéristiques**:
- Message personnalisé avec prénom
- Informations de contact du garage
- Pas d'informations confidentielles
- Rappel: 24h avant seulement
- Peut être ajouté au calendrier personnel

### Fonctionnement technique
Le système crée **deux événements distincts** dans Google Calendar pour permettre des emails différents:
1. Événement Garage (avec toutes les infos)
2. Événement Client (confirmation professionnelle)

---

## Configuration Backend

### Variables d'environnement requises

Créer un fichier `.env` à la racine du projet:

```bash
# Google Calendar
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
GOOGLE_CALENDAR_TIMEZONE=Europe/Brussels
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# Email du garage pour recevoir les notifications
GARAGE_EMAIL=votre-email@martins-automotive.be

# Port du serveur backend
PORT=8080
```

### Backend Node.js

**Fichier**: `src/utils/index.js`

**Démarrage du backend**:
```bash
cd src/utils
node index.js
# Serveur démarre sur http://localhost:8080
```

**Endpoints API**:
- `GET /calendar/status` - Récupère la disponibilité du calendrier
- `POST /calendar/appointment` - Crée un nouveau rendez-vous

### Intégration frontend-backend

**API Client**: `src/utils/appointmentApi.ts`
- `checkServiceCapacity()` - Vérifie la capacité pour un service
- `getAvailabilityWithCapacity()` - Récupère les créneaux avec infos de capacité
- `createAppointment()` - Crée un rendez-vous

**CORS Configuration**:
Le backend accepte les requêtes depuis:
- `http://localhost:3000` (développement)
- À configurer pour la production dans `corsWhitelist`

---

## Support Multilingue

### Configuration
- **Locales**: Français (fr) et Néerlandais (nl)
- **Routes**: `/fr/*` et `/nl/*`
- **Composant**: `LanguageSwitcher.tsx` pour basculer entre les langues

### Fichiers de traduction
- `messages/fr.json` - Traductions françaises
- `messages/nl.json` - Traductions néerlandaises

### Middleware
**Fichier**: `src/middleware.ts`
Gère automatiquement la redirection selon la locale préférée.

**Note**: Les emails automatiques côté backend ne sont pas encore traduits.

---

## Composants Principaux

### Pages
- **`/[locale]/`** - Page d'accueil
- **`/[locale]/rendez-vous`** - Flow de réservation multi-étapes
- **`/[locale]/rendez-vous/confirmation`** - Page de confirmation
- **`/[locale]/contact`** - Page contact avec Google Maps
- **`/[locale]/faq`** - 16 questions en 6 catégories

### Composants de réservation
- `AppointmentStepper.tsx` - Stepper visuel du flow
- `ServiceSelection.tsx` - Sélection de service avec durées
- `CalendarPicker.tsx` - Calendrier interactif
- `TimeSlotPicker.tsx` - Sélection d'horaires avec gestion de capacité
- `CustomerForm.tsx` - Formulaire client complet

### Autres composants
- `Header.tsx` - Hero full-screen avec navigation
- `Footer.tsx` - Footer du site
- `ContactForm.tsx` - Formulaire de contact fonctionnel
- `ServicesGrid.tsx` - Grille de services
- `About.tsx` - Section à propos
- `InfoStrip.tsx` - Bande d'informations
- `LanguageSwitcher.tsx` - Sélecteur de langue

---

## Prochaines Priorités

### Priorités Hautes
1. Intégrer Google Reviews et témoignages clients
2. Ajouter animations UX (parallax, fade-in, confetti)
3. Configurer PWA (Progressive Web App)
4. Optimisation SEO complète
5. Traduire les emails backend en néerlandais

### Fonctionnalités Avancées (Phase 2)
- Espace client avec gestion de rendez-vous
- Panneau admin pour le garage
- Notifications SMS/WhatsApp
- Système de devis en ligne

### Améliorations Techniques
- Rate limiting sur formulaires
- CAPTCHA sur formulaires
- Optimisation des images (WebP/AVIF)
- Meta tags et Schema.org markup complets
- Google Analytics/Tag Manager

### Fonctionnalités Futures (Phase 3)
- Section Blog/Actualités
- Boutique en ligne (pièces/accessoires)
- Programme de fidélité
- Notifications push

---

## Notes de Déploiement

### Prérequis Production
1. Compte Google Cloud avec Calendar API activée
2. Service Account créé et clé JSON téléchargée
3. Calendrier Google configuré et partagé avec le Service Account
4. Variables d'environnement configurées
5. Domaine configuré dans corsWhitelist

### Checklist avant déploiement
- [ ] Tester le flow de réservation complet
- [ ] Vérifier réception des emails (garage + client)
- [ ] Tester sur mobile/tablette
- [ ] Vérifier les deux langues (FR/NL)
- [ ] Configurer CORS pour le domaine de production
- [ ] Optimiser les images
- [ ] Ajouter meta tags SEO
- [ ] Configurer Google Analytics

---

## Support & Maintenance

### Modifier les durées des services
**Fichier**: `src/utils/serviceDurations.ts`

```typescript
export const SERVICE_DURATIONS: Record<string, number> = {
  "Nom du Service": 2.5, // durée en heures
  // ...
};
```

### Modifier les capacités des services
**Fichier**: `src/utils/serviceDurations.ts`

```typescript
export const SERVICE_CAPACITY_LIMITS: Record<string, ServiceCapacity> = {
  "Service avec cooldown": {
    cooldownDays: 3  // période de refroidissement
  },
  "Service avec limites": {
    maxPerDay: 2,    // limite journalière
    maxPerWeek: 10   // limite hebdomadaire
  },
  // ...
};
```

### Modifier les horaires d'ouverture
**Fichier**: `src/utils/index.js` (backend)
Mettre à jour les plages horaires dans les fonctions de disponibilité.

### Débogage
Les logs de capacité sont disponibles dans la console du navigateur:
```
Selected date: 2025-11-22
Capacity info: { "2025-11-22": { dailyCount: 2, weeklyCount: 5 } }
```

---

**Dernière mise à jour**: 2025-01-12
