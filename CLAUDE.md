# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for UWENAYO Alain Pacifique at uwe.rw. Built with Astro 6, Tailwind CSS 4, GSAP animations, and Lenis smooth scrolling. Dark/light theme support with a cinematic dark-first aesthetic.

## Development Commands

- `pnpm dev` — dev server at localhost:4321
- `pnpm build` — production build to `dist/`
- `pnpm preview` — serve production build locally
- `pnpm astro check` — TypeScript and accessibility checks (run before committing)

## Architecture

### Content System

Two content sources with different patterns:

- **Blog posts**: Astro Content Collections using MDX files in `src/content/posts/`. Schema defined in `src/content.config.ts` (title, description, pubDate, heroImage with optional dark variant, tags). Routes via `src/pages/blog/[...slug].astro`.
- **Projects**: Static TypeScript data in `src/data/projects.ts` (not content collections). Each project has light/dark image pairs. Routes via `src/pages/projects/[slug].astro` using `getStaticPaths()`.

### Animation System

The animation architecture has two layers that must coordinate with Astro's View Transitions (`ClientRouter`):

1. **Global animations** (`src/lib/animations.js`): Central init/cleanup lifecycle. `initAnimations()` runs on `astro:page-load`, `cleanupAnimations()` runs on `astro:before-swap`. Manages Lenis smooth scrolling, ScrollTrigger instances, fade-up animations (`.fade-up` CSS class), magnetic links, and project card staggering. Important: component scripts register their own ScrollTriggers *before* `initAnimations()` runs — do not add cleanup at the start of init.

2. **Page-level animations**: Individual `<script>` blocks in detail pages (`blog/[...slug].astro`, `projects/[slug].astro`) register their own GSAP/ScrollTrigger animations on `astro:page-load`. These include progress bars, parallax hero images, and content reveal animations.

**FOUC prevention**: CSS in `global.css` hides `.fade-up` elements when `.js` class is present but `.js-loaded` is not (first load only). The `.js` class is added synchronously via inline script in Layout.astro; `.js-loaded` is added after first animation init. Page-level scripts use scoped `:global(.js)` styles for the same purpose.

### Theming

Three-state theme system (light/dark/system) with CSS custom properties:

- Variables defined in `src/styles/variables.css` — dark theme is `:root` default, light via `:root.light` or `prefers-color-scheme: light` on `:root:not(.dark)`
- Brand colors in `src/styles/global.css` — gold (#F4D619), navy (#1B487B), blush (#EACAAF)
- Theme-aware images use `.light-mode-image`/`.dark-mode-image` CSS classes toggled by `:root.light`
- Theme preference stored in `localStorage("theme")`, applied via inline script in Layout.astro head to prevent flash

### Utility Libraries (`src/lib/utils/`)

Barrel-exported from `src/lib/utils/index.ts`:
- `math.ts` — clamp, lerp, map range
- `animation.ts` — RAF loop manager, Lenis factory, GSAP timeline helpers, `animateIn`, `scrubValue`, lazy-loaded `scrollTo`
- `dom.ts` — event listener cleanup helpers (`on`, `onResize`, `onIntersect`), scroll lock, CSS var setter, media query checks
- `three.ts` — Three.js helpers

### Layout

Single layout (`src/layouts/Layout.astro`) wraps all pages. Includes: SEO meta, `ClientRouter` for view transitions, theme init script, global chrome (Navbar, Footer, Preloader, custom Cursor, GridBackground), and the animation lifecycle script.

## Styling

- Tailwind CSS 4 integrated via Vite plugin (not Astro integration) — configured in `astro.config.mjs`
- Custom font families registered in `global.css` `@theme` block: `--font-family-sans` (Space Grotesk), `--font-family-display` (Jersey 25)
- Fluid type scale using `clamp()` in CSS custom properties (`--text-xs` through `--text-giant`)
- Component styles use Astro's scoped `<style>` blocks; use `:global()` when targeting child content or animation states

## Key Conventions

- 2-space indentation everywhere
- PascalCase components, kebab-case routes/pages
- Astro strict TypeScript config
- `sharp` is included for Astro image optimization
- MDX support via `@astrojs/mdx` integration
- Sitemap generation via `@astrojs/sitemap` (site: https://uwe.rw)
