# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js 15.5.2 automotive garage website for "Martins Automotive" in Huizingen, built with TypeScript, React 19, and Tailwind CSS 4. The site is in French and includes booking functionality, service listings, and contact forms.

## Development Commands
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with Next.js TypeScript configuration

## Architecture
The project uses Next.js App Router with the following structure:
- `src/app/` - App Router pages (layout.tsx, page.tsx, globals.css)
- `src/components/` - Reusable React components (Header, Footer, ContactForm, BookingDialog, etc.)
- Components are client-side ("use client") and use functional React patterns
- Path alias `@/*` maps to `./src/*` for imports

## Tech Stack
- **Framework**: Next.js 15.5.2 with App Router
- **React**: Version 19.1.0 
- **Styling**: Tailwind CSS 4 with PostCSS
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with Next.js and TypeScript presets

## Key Components
- `Header` - Full-screen hero with navigation and CTA button
- `InfoStrip`, `About`, `ServicesGrid` - Content sections
- `ContactForm` - Customer contact functionality  
- `BookingDialog` - Modal for appointment booking
- `Footer` - Site footer

## Styling Approach
- Uses Tailwind CSS with utility classes
- Custom button styles with `.btn-primary` class
- Responsive design with mobile-first approach
- French language content throughout