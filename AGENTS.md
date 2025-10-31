# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/` holds Astro route entries; file names map directly to URLs (`src/pages/index.astro` serves `/`).
- `src/layouts/` defines shared shells for pages; prefer abstracting site-wide chrome here before reusing it in pages.
- `src/components/` stores reusable UI units; keep component filenames in PascalCase (e.g., `HeroBanner.astro`).
- `src/assets/` contains authored media; reference large, unprocessed files from here instead of `public/`.
- `public/` exposes static files verbatim (favicons, robots.txt). Assets placed here bypass Astro’s build pipeline.
- `src/lib/utils/` centralizes math, animation, DOM, and Three helpers (`math.ts`, `animation.ts`, `dom.ts`, `three.ts`) to keep feature code lean.
- Astro view transitions are enabled in `astro.config.mjs:3`; keep `<ViewTransitions />` mounted in the page head (_template or individual pages) for seamless navigation swaps.

## Build, Test, and Development Commands
- `pnpm install` resolves dependencies; always rerun after syncing `pnpm-lock.yaml`.
- `pnpm dev` launches the local dev server with hot module reloading at `http://localhost:4321`.
- `pnpm build` produces the optimized static output under `./dist`.
- `pnpm preview` serves the latest build to mimic production deployment.
- `pnpm astro check` runs Astro’s type and accessibility checks; use it before submitting changes.

## Coding Style & Naming Conventions
- Use 2-space indentation for `.astro`, `.ts`, and `.css` files to match existing formatting.
- Co-locate styles in `src/styles/global.css` and compose UI with Tailwind utility classes rather than ad-hoc CSS.
- Favor descriptive component names (`UserBadge.astro`) and kebab-case route files (`blog-post.astro`).
- Keep imports relative within a feature folder; prefer absolute paths (`@/components/...`) only if configured.

## Testing Guidelines
- This project currently has no automated test suite; validate changes with `pnpm astro check` and manual UI smoke tests in dev and preview modes.
- When adding tests, align filenames with the unit under test (`Component.test.ts`) and ensure they run in CI-compatible environments.
- Document any new testing commands in `package.json` scripts to keep onboarding smooth.

## Commit & Pull Request Guidelines
- Follow conventional, action-oriented commit messages (`Add hero layout animation`); group related edits into a single commit when practical.
- Branch names should reflect scope (`feature/add-testimonials`, `fix/nav-spacing`).
- Pull requests must include: summary of changes, testing notes (commands run and results), and any linked issue IDs.
- Add screenshots or screen recordings for UI changes, especially when they alter layout, color, or motion.

## Configuration & Secrets
- Store runtime configuration in `.env` files and reference them via Astro’s environment APIs; never commit secrets to the repo.
- Update `astro.config.mjs` cautiously, explaining rationale in PR descriptions when altering integrations or build targets.
