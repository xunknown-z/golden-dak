# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Golden-Dak is a mobile-first e-commerce template site cloning the structure of [랭킹닭컴](https://www.rankingdak.com/) (a Korean chicken breast e-commerce platform). It uses mock data (JSON files) instead of a real backend, designed as a reusable template for similar commerce sites. The UI targets a web-app/adaptive-web feel with a fixed bottom tab bar navigation.

## Tech Stack

- **Framework:** Next.js 14/15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (cart, option selections)
- **Animations:** Swiper.js or Framer Motion (banner sliders)
- **Icons:** Heroicons (Outline = inactive, Solid = active)
- **Images:** next/image for optimization (WebP, layout shift prevention)

## Project Structure

```
client/          # Next.js frontend application
server/          # Backend directory (placeholder only, not implemented)
public/data/     # Mock JSON data (products, categories, etc.)
docs/            # Project documentation
  requirement.md # Full requirements specification (Korean)
```

## Build & Development Commands

Once the Next.js app is scaffolded in `client/`:

```bash
cd client
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture Notes

- **App Router:** Uses Next.js App Router (not Pages Router). Routes live under `client/app/`.
- **Pages:** Product list/ranking (category filtering + sorting), product detail (image slider, options, reviews/Q&A tabs), cart (quantity, deletion, total calculation), my page (order history, coupons, points — all mock).
- **Navigation:** Bottom fixed tab bar (Home, Category, My Page, AI Diet) + top search bar with cart icon.
- **Mock Data:** All product/user data served from `public/data/*.json` files — no real API calls.
- **Responsive:** Mobile-first adaptive design scaling to tablet and desktop.
- **Loading States:** Skeleton UI components for all data-loading views.
- **SEO:** Meta tags configured per page.
- **Accessibility:** ARIA attributes and keyboard navigation required.

## Development Approach

- Build incrementally in phases — do not implement everything at once.
- Implementation plans go in `plan.md` before coding begins.
- Frontend only in `client/`; `server/` directory exists but has no implementation.

## Language

All responses and UI text should be in Korean (한국어).
