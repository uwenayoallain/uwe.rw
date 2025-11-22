# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based personal website for uwe.rw/SAINT featuring a minimal design with creative typography and brand colors. The project uses TypeScript, Tailwind CSS, and includes utility libraries for math, animation, DOM manipulation, and Three.js helpers.

## Development Commands

- `pnpm install`: Install dependencies (rerun when `pnpm-lock.yaml` changes)
- `pnpm dev`: Start development server at `http://localhost:4321` with HMR
- `pnpm build`: Create production build in `dist/` directory
- `pnpm preview`: Serve the production build locally for testing
- `pnpm astro check`: Run TypeScript and accessibility checks before committing
- `pnpm astro ...`: Run other Astro CLI commands

## Architecture & File Organization

- **Pages**: Routes live in `src/pages/` with kebab-case filenames mapping to URLs
- **Layouts**: Shared chrome goes in `src/layouts/` (mount `<ViewTransitions />` in layout heads)
- **Components**: Reusable pieces in `src/components/` with PascalCase naming
- **Utilities**: Math, animation, DOM, and Three.js helpers in `src/lib/utils/` with barrel exports
- **Styles**: Global styles in `src/styles/global.css` with Tailwind CSS integration
- **Static Assets**: Public files (favicons, robots.txt) in `public/` directory

## Brand & Styling System

The site uses a custom brand color palette defined in CSS custom properties:
- `--color-brand-navy`: #1B487B
- `--color-brand-gold`: #F4D619  
- `--color-brand-blush`: #EACAAF
- `--color-brand-stone`: #7A7A7A

Typography uses three font families:
- Display: 'Jersey 25' for headlines
- Sans: 'Space Grotesk' for body text
- Accent: 'Space Grotesk' for accented content

## Key Dependencies

- **Astro 5**: Static site generator with TypeScript support
- **Tailwind CSS 4**: Utility-first styling with custom theme
- **Three.js**: 3D graphics capabilities with utilities
- **GSAP**: Advanced animations
- **Lenis**: Smooth scrolling
- **Motion**: Additional animation library

## Code Style Guidelines

- Use 2-space indentation for all files (.astro, .ts, .css)
- Prefer Tailwind utilities over custom CSS
- Use PascalCase for components, kebab-case for routes
- Keep imports relative within features
- Follow Astro's strict TypeScript configuration

## Testing & Quality

- No automated test suite currently exists
- Rely on `pnpm astro check` for type checking
- Manually test in both `pnpm dev` and `pnpm preview`
- Site includes comprehensive SEO metadata and structured data