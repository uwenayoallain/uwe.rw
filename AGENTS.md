# Repository Guidelines

## Project Structure & Module Organization
- Astro routes live in `src/pages/`; file names map to URLs (`src/pages/index.astro` → `/`), so keep kebab-case for new routes.
- Shared chrome belongs in `src/layouts/`; mount `<ViewTransitions />` in layout heads to preserve transitions.
- Reusable pieces go under `src/components/` with PascalCase names, while authored media sits in `src/assets/`.
- Utilities for math, animation, DOM, and Three helpers stay in `src/lib/utils/` to keep pages lean; avoid mixing feature logic here.
- Static passthrough files (`favicon.ico`, `robots.txt`) belong in `public/`.

## Build, Test, and Development Commands
- `pnpm install`: restore dependencies; rerun whenever `pnpm-lock.yaml` changes.
- `pnpm dev`: start the HMR dev server at `http://localhost:4321`.
- `pnpm build`: produce optimized output in `dist/`.
- `pnpm preview`: serve the latest build locally for production parity.
- `pnpm astro check`: run type and accessibility analysis before raising PRs.

## Coding Style & Naming Conventions
- Use 2-space indentation in `.astro`, `.ts`, and `.css` files; favor Tailwind utilities over custom CSS, extending `src/styles/global.css` when needed.
- Name components in PascalCase (`HeroBanner.astro`) and routes in kebab-case (`blog-post.astro`); keep imports relative within a feature.
- Default to ASCII characters; document-only comments should be succinct and explanatory.

## Testing Guidelines
- Project has no automated test suite yet; rely on `pnpm astro check` plus manual smoke tests in `pnpm dev` and `pnpm preview`.
- When adding tests, match filenames to their subject (`Component.test.ts`), ensure they run headless in CI, and script them in `package.json`.

## Commit & Pull Request Guidelines
- Write action-oriented conventional commits (`Add hero layout animation`) and group related edits together.
- Branch names should convey scope (`feature/add-testimonials`, `fix/nav-spacing`).
- Pull requests must include a change summary, commands executed (with results), linked issue IDs, and UI captures when layout, color, or motion changes.
- Explain any `astro.config.mjs` adjustments and environment variable updates in the PR description.

## Security & Configuration Notes
- Store runtime secrets only in `.env` files; never commit them.
- Prefer referencing assets through Astro pipelines; only bypass via `public/` when necessary.
