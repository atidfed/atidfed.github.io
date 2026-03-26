# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for **עתיד פדרלי** ("Federal Future - Common Denominator"), a Hebrew-language political movement/civic engagement platform. It is deployed via GitHub Pages at `atidfed.github.io`.

## Architecture

The site has three source files and no build system or framework:

- `index.html` — all markup
- `style.css` — all styles (linked via `<link rel="stylesheet">`)
- `script.js` — all JavaScript (linked via `<script src>` at end of body)
- Content is in **Hebrew** (`lang="he" dir="rtl"` — right-to-left layout)
- Assets: `images/used/` for photos/logo (`.webp`), `docs/` for PDFs

## Running Locally

```bash
npm start
```

This uses `npx serve` (no prior install needed). The site will be available at `http://localhost:3000`.

You can also open `index.html` directly in a browser.

## Deployment

Pushing to `main` deploys automatically via GitHub Pages — no CI step required.

## Design System

CSS variables defined at the top of `style.css`:
- `--m-yellow`: #fbc654
- `--m-blue`: #1274ce
- `--m-orange`: #f78803
- `--m-red`: #da2c2d
- `--m-dark`: #033653
- `--m-white`: #eee6c1
- `--m-bg`: #FDFBF7

Fonts: **Heebo** (body) and **Rubik** (headings) from Google Fonts. Mobile breakpoint at 968px.

## Page Sections

1. Header/nav — sticky with scroll-shrink effect; nav links: עלינו, החזון, אירועים, מידע נוסף, הצטרפות
2. Hero — yellow background
3. About (`#about`) — "who we are" diagram (two youth movements + joint HQ) + three message-cards with background images
4. Blueprint (`#plan`) — three-stage roadmap (cards + SVG arrows) + 8 aspect-cards; stage 2 links to `docs/Federal_Charter_Final_Draft.pdf`
5. Events (`#events`) — 4 image-cards grid + resources banner (`#resources`) with 3 resource-cards (PDF, external article, journal article)
6. CTA (`#join`) — embedded Google Form iframe (no custom form fields)
7. Footer — logo, Instagram social link, tagline

## JavaScript Behavior (`script.js`)

- Scroll-reveal animations via `IntersectionObserver` on `.reveal` elements
- Sticky header shrink/shadow on scroll past 50px
