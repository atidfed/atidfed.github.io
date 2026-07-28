# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for **עתיד פדרלי** ("Federal Future"), a Hebrew-language political movement/civic engagement platform. It is deployed via GitHub Pages at `atidfed.github.io`.

## Architecture

The site is plain static files, no build system or framework:

- `index.html` — Hebrew page (`lang="he" dir="rtl"`), served at `/`. This is the canonical/default-language version.
- `en/index.html` — English page (`lang="en" dir="ltr"`), served at `/en/`. A fully separate, hand-maintained HTML file — see "Bilingual System" below.
- `style.css` — all styles, shared by both pages (linked via `<link rel="stylesheet">`)
- `script.js` — all JavaScript, shared by both pages (linked via `<script src>` at end of body)
- `resources.json` — data for the resources banner cards, fetched client-side by `script.js`
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

Hebrew and English are two **separate static pages** (`/index.html` and `/en/index.html`), not a client-side translation toggle. This was a deliberate SEO decision: each language has its own crawlable URL, its own `<title>`/meta description/OG tags, and both are listed with `hreflang` alternates in each page's `<head>` and in `sitemap.xml`, so search engines can index both versions independently instead of relying on JS execution to reveal the English content.

There is **no shared translation data and no build step** — the two files are hand-maintained duplicates. This trades off DRY-ness for simplicity (no build tooling) per an explicit choice made when the split was introduced.

### How it works
- `index.html` (root) has Hebrew text baked directly into the markup, `<html lang="he" dir="rtl">`.
- `en/index.html` has the English equivalent baked directly into its markup, `<html lang="en" dir="ltr">`.
- The language switcher in the header (`.lang-switcher`) is a pair of plain `<a>` links: `href="/en/"` and `href="/"` — clicking causes a real page navigation, not an in-place swap.
- Because `en/index.html` lives one directory deep, its asset references (`style.css`, `script.js`, `images/...`, `docs/...`, favicon) use **root-relative paths** (`/style.css`, `/images/...`, etc.) so they resolve correctly regardless of nesting. `resources.json`'s `link`/`logo` fields are also root-relative for the same reason, since that data is rendered by the shared `script.js` on both pages.
- `script.js` determines which language it's running under via `document.documentElement.lang` (`CURRENT_LANG`), used only for picking the right fields out of `resources.json` and formatting resource dates (see `formatResourceDate`).

### LTR layout overrides (in `style.css`)
On `en/index.html` (`html[dir="ltr"]`), the following physical-direction overrides apply:
- `.stage-arrow svg` — removes `scaleX(-1)` flip so arrows point right (→)
- `.card .num` — moves stage number `01/02/03` from `left` to `right: 20px`
- `.aspect-card-body p` — `text-align: left`
- `.message-card` — `text-align: left`
- `.resource-card` — `text-align: left`
- `.lang-switcher` — `order: -1` to keep it on the physical left in LTR flex layout

### Adding or editing content
Since there's no shared translation source, every content change must be made **twice** — once in `index.html`, once in `en/index.html` — keeping structure/classes/IDs identical between them so `style.css` and `script.js` behave the same on both.

## JavaScript Behavior (`script.js`)

- Fetches `/resources.json` and renders the resource-banner cards via `renderResources(CURRENT_LANG)`
- Scroll-reveal animations via `IntersectionObserver` on `.reveal` elements
- Expandable aspect cards toggled via click/keyboard on `.aspect-card--expandable`
- Sticky header shrink/shadow on scroll past 50px

## SEO

- Each page has its own `<title>`, meta description, canonical URL, `hreflang` alternates (he/en/x-default), Open Graph and Twitter Card tags, and a JSON-LD `Organization` block.
- `sitemap.xml` lists both `https://atidfed.github.io/` and `https://atidfed.github.io/en/`, each with `xhtml:link` hreflang annotations.
- `robots.txt` allows all crawlers and points to `sitemap.xml`.
