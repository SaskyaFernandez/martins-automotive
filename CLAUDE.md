# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Next.js 15.5.2 automotive garage website for "Martins Automotive" in Huizingen, Belgium. Bilingual site (FR/NL) with online booking system integrated with Google Calendar API.

**For complete documentation, see [PROJECT_DOCS.md](./PROJECT_DOCS.md)**

## Quick Reference

### Development Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend Server
```bash
cd src/utils
node index.js    # Start on http://localhost:8080
```

### Tech Stack
- **Framework**: Next.js 15.5.2 (App Router)
- **React**: 19.1.0
- **TypeScript**: Strict mode
- **Styling**: Tailwind CSS 4
- **i18n**: next-intl (FR/NL)
- **Backend**: Node.js + Google Calendar API

### Project Structure
```
src/
├── app/[locale]/          # Multilingual routes (fr/nl)
├── components/            # React components (client-side)
├── i18n/                  # next-intl configuration
├── middleware.ts          # Locale handling
└── utils/
    ├── index.js           # Node.js backend server
    ├── appointmentApi.ts  # Frontend API client
    └── serviceDurations.ts # Service config
messages/
├── fr.json                # French translations
└── nl.json                # Dutch translations
```

### Key Features
- **Booking System**: 4-step flow with Google Calendar integration
- **9 Services**: Each with specific duration and capacity limits
- **Dual Emails**: Separate emails for garage and client
- **Capacity Management**: Per-service limits and cooldown periods
- **Bilingual**: Full FR/NL support

### Important Files
- `src/utils/serviceDurations.ts` - Service durations and capacity limits
- `src/utils/index.js` - Backend server with Google Calendar
- `src/utils/appointmentApi.ts` - Frontend API functions
- `PROJECT_DOCS.md` - Complete technical documentation

### Environment Variables Required
```bash
# Google Calendar
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
GOOGLE_CALENDAR_TIMEZONE=Europe/Brussels
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
GARAGE_EMAIL=your-email@martins-automotive.be

# Email sending (Nodemailer)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_SERVICE=gmail

# Server
PORT=8080
```

**Note**: For Gmail, you need to create an "App Password" (not your regular password). See: https://support.google.com/accounts/answer/185833

## Path Alias
`@/*` maps to `./src/*`

## Styling
- Tailwind CSS with utility-first approach
- Custom `.btn-primary` class
- Mobile-first responsive design

**See [PROJECT_DOCS.md](./PROJECT_DOCS.md) for complete documentation including:**
- Full system architecture
- Booking flow details
- Email system configuration
- Service capacity management
- Deployment checklist
- Maintenance guides