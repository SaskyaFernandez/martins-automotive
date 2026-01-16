# Martins Automotive - Website

Site web professionnel pour le garage automobile Martins Automotive à Huizingen (Belgique).

## 🚗 À propos

Site bilingue (Français/Néerlandais) avec système de prise de rendez-vous en ligne intégré à Google Calendar.

**Caractéristiques principales:**
- 9 services automobiles avec réservation en ligne
- Intégration Google Calendar API
- Système d'emails automatiques
- Gestion de capacité par service
- Interface bilingue FR/NL
- Design responsive mobile-first

## 🚀 Démarrage Rapide

### Frontend
```bash
npm install
npm run dev
```
Ouvrir [http://localhost:3000](http://localhost:3000)

### Backend
```bash
cd src/utils
node index.js
```
Serveur démarre sur [http://localhost:8080](http://localhost:8080)

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Guide rapide pour développeurs et Claude Code
- **[PROJECT_DOCS.md](./PROJECT_DOCS.md)** - Documentation technique complète

## 🛠️ Stack Technique

- **Next.js** 15.5.2 (App Router)
- **React** 19.1.0
- **TypeScript** (mode strict)
- **Tailwind CSS** 4
- **next-intl** (i18n FR/NL)
- **Google Calendar API** (backend Node.js)

## ⚙️ Configuration

Créer un fichier `.env` à la racine:
```bash
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
GOOGLE_CALENDAR_TIMEZONE=Europe/Brussels
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
GARAGE_EMAIL=your-email@martins-automotive.be
PORT=8080
```

## 📦 Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linter ESLint
```

## 📁 Structure du Projet

```
martins-automotive/
├── src/
│   ├── app/[locale]/          # Pages multilingues
│   ├── components/            # Composants React
│   ├── i18n/                  # Configuration next-intl
│   ├── middleware.ts          # Gestion des locales
│   └── utils/
│       ├── index.js           # Backend Node.js
│       ├── appointmentApi.ts  # API client
│       └── serviceDurations.ts # Configuration services
├── messages/
│   ├── fr.json                # Traductions FR
│   └── nl.json                # Traductions NL
├── CLAUDE.md                  # Guide développeur
├── PROJECT_DOCS.md            # Documentation complète
└── README.md                  # Ce fichier
```

## 🌐 URLs

- **Site web**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Page de réservation**: http://localhost:3000/fr/rendez-vous
- **Page contact**: http://localhost:3000/fr/contact
- **FAQ**: http://localhost:3000/fr/faq

## 📞 Contact

**Martins Automotive**
- Localisation: Huizingen, Belgique
- Téléphone: 0473 64 79 47

## 📄 Licence

Projet privé - Tous droits réservés
