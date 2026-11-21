# Abhijith SD’s personal field journal

A botanical portfolio for a CSE engineering student at UKFCET. The site uses Next.js App Router, strict TypeScript, Tailwind CSS, and a local SQLite content database. The static export runs on GitHub Pages or Vercel.

## Run locally

Use Node.js 24 and npm. From the checkout root, run:

```sh
npm ci
npm run dev
```

Open the address printed by Next.js. Starting the server and building the site both synchronize the database automatically.

## Edit the portfolio

Edit **data/portfolio.ts**. It contains the public profile, introductions, reflections, contact destinations, journal entries, and gallery captions. Owner comments mark missing details. Add a public email address to enable the mail link, an Instagram URL to show that profile, and public Google Drive URLs to individual certificate entries. Publish only information and files you have permission to share.

Restart the dev server after content edits. For production, rebuild and redeploy. The sync script writes the config to **.portfolio/portfolio.sqlite** in a single transaction. Server Components read that database when rendering. GitHub Pages serves the exported pages without a live database service. To refresh the local database separately, run `npm run db:sync`.

## Artwork and sound

- Replace the four optimized WebP scenes in **public/images/**. The hero is wide, with its focal point at the right. Update **data/portfolio.ts** for gallery titles and alt text, **app/page.tsx** for the hero and story captions, and **public/images/CREDITS.md** for provenance.
- Replace **public/audio/forest-air.mp3** with a short, licensed ambient loop. The included original synthesized composition is offered under CC0. Sound starts only when the visitor activates the music control, including after a reload.
- The pen illustrations and game visuals are in **components/Specimen.tsx** and **components/games/**. The self-hosted fonts and their licenses are in **public/fonts/**.

## Verify

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
PLAYWRIGHT_USE_BUILD=1 npm run test:e2e
```

Type checking includes `npx tsc --noEmit`. For a standalone browser run, `npm run test/e2e` builds and serves its own export. In the cloud environment, the runner can use the preinstalled system Chromium. Browser tests exercise navigation, theme persistence, audio success and failure, keyboard play, the gallery, narrow screens, and axe WCAG checks in both themes.

## Deploy

**GitHub Pages.** In the repository’s Settings → Pages, choose **GitHub Actions** as the build source. Push this project to **main**, or run **Deploy portfolio to GitHub Pages** from the Actions tab after the workflow reaches the default branch. The workflow installs dependencies, validates the code, builds with the repository’s Pages base path, runs browser tests against that export, and deploys **out/**. GitHub displays the public address after deployment.

**Vercel.** Import the repository as a Next.js project. Select Node.js 24, use `npm ci` for installation and `npm run build` for the build. Keep the repository root as the project directory. Set **SITE_URL** to the final public URL if using a custom domain. Leave **NEXT_PUBLIC_BASE_PATH** unset for a root-level deployment. Deploy the project and check the canonical URL and sitemap on the published domain.

For other static hosts, set **SITE_URL** to the full public site URL before building. When serving under a subdirectory, also set **NEXT_PUBLIC_BASE_PATH** to that prefix, such as `/Portfolio-website-`. Upload the contents of **out/**. Local builds use a localhost canonical URL unless deployment settings supply a public origin.
