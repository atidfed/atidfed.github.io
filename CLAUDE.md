# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for **עתיד פדרלי** ("Federal Future - Common Denominator"), a Hebrew-language political movement/civic engagement platform. It is deployed via GitHub Pages at `atidfed.github.io`.

## Architecture

The site has three source files and no build system or framework:

- `index.html` — all markup
- `style.css` — all styles (linked via `<link rel="stylesheet">`)
- `script.js` — all JavaScript (linked via `<script src>` at end of body)
- Content is in **Hebrew** (`lang="he" dir="rtl"`) by default, with full **English** translation available
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

1. Header/nav — sticky with scroll-shrink effect; nav links: עלינו, החזון, אירועים, מידע נוסף, הצטרפות; language switcher (`EN | עב`) always on physical left
2. Hero — yellow background
3. About (`#about`) — "who we are" diagram (two youth movements + joint HQ) + three message-cards with background images
4. Blueprint (`#plan`) — three-stage roadmap (cards + SVG arrows) + 10 aspect-cards; stage 2 links to `docs/charter/Federal Charter Eng_Heb.pdf`
5. Events (`#events`) — 4 image-cards grid + resources banner (`#resources`) with 3 resource-cards (PDF, external article, journal article)
6. CTA (`#join`) — embedded Google Form iframe (no custom form fields)
7. Footer — logo, Instagram social link, tagline

## Bilingual System (Hebrew / English)

The site supports full Hebrew ↔ English switching without a page reload.

### How it works
- Every translatable element has a `data-i18n="key"` attribute (sets `textContent`) or `data-i18n-html="key"` (sets `innerHTML`, for content with embedded tags like `<br>`, `<span>`)
- Image `alt` attributes use `data-i18n-alt="key"`
- All translations live in the `translations` object in `script.js` under `he` and `en` keys
- `applyLanguage(lang)` switches `<html lang>`, `<html dir>` (rtl/ltr), `document.title`, all translated elements, and the active state on the lang buttons
- The selected language is persisted in the URL as `?lang=en` (Hebrew is the default and omits the param); `history.replaceState` is used so it doesn't create a history entry. On page load, the param is read to restore the language.

### LTR layout overrides (in `style.css`)
When `html[dir="ltr"]` is active (English), the following physical-direction overrides apply:
- `.stage-arrow svg` — removes `scaleX(-1)` flip so arrows point right (→)
- `.card .num` — moves stage number `01/02/03` from `left` to `right: 20px`
- `.aspect-card-body p` — `text-align: left`
- `.message-card` — `text-align: left`
- `.resource-card` — `text-align: left`
- `.lang-switcher` — `order: -1` to keep it on the physical left in LTR flex layout

### Adding or editing translations
1. Add/update the key in both `translations.he` and `translations.en` in `script.js`
2. Add the corresponding `data-i18n` (or `data-i18n-html` / `data-i18n-alt`) attribute on the HTML element

## JavaScript Behavior (`script.js`)

- Bilingual i18n system (see above)
- Language persisted via `?lang=en` URL query param; initialized on page load
- Scroll-reveal animations via `IntersectionObserver` on `.reveal` elements
- Expandable aspect cards toggled via click/keyboard on `.aspect-card--expandable`
- Sticky header shrink/shadow on scroll past 50px
