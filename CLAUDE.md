# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for **עתיד פדרלי** ("Federal Future - Common Denominator"), a Hebrew-language political movement/civic engagement platform. It is deployed via GitHub Pages at `atidfed.github.io`.

## Architecture

The entire site is a **single self-contained file**: `index.html`. There is no build system, no framework, and no dependencies.

- All CSS is embedded in a `<style>` block (lines ~11–578)
- All JavaScript is embedded in a `<script>` block at the bottom (~34 lines)
- Content is in **Hebrew** (`lang="he" dir="rtl"` — right-to-left layout)
- Assets: `images/` for photos/logo, `docs/` for PDFs and step images

## Running Locally

```bash
npm start
```

This uses `npx serve` (no prior install needed). The site will be available at `http://localhost:3000`.

You can also open `index.html` directly in a browser.

## Deployment

Pushing to `main` deploys automatically via GitHub Pages — no CI step required.

## Design System

CSS variables defined at the top of the `<style>` block:
- `--m-yellow`: #FFC900
- `--m-blue`: #1D4ED8
- `--m-orange`: #FF5A00
- `--m-dark`: #0F172A
- `--m-white` / `--m-bg`: white/beige

Fonts: **Heebo** (body) and **Rubik** (headings) from Google Fonts. Mobile breakpoint at 968px.

## Page Sections

1. Header/nav (sticky, scroll-effect)
2. Hero (yellow)
3. Manifesto (blue)
4. Blueprint — three-stage roadmap
5. Events — grid of cards + resources banner
6. CTA — join form (name, phone, email)
7. Footer (dark)

## JavaScript Behavior

The script handles:
- Scroll-reveal animations via `IntersectionObserver`
- Sticky header class toggling on scroll
- Join form submission (currently logs to console / basic validation)
