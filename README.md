# Taiki Yamashita

React portfolio for Taiki Yamashita: full-stack engineering, applied AI, and mission-focused software. Content updated from the owner’s LinkedIn profile in October 2026.

## Develop

```
npm ci
npm start
npm run build
CI=true npm test -- --watchAll=false --runInBand
```

The existing Create React App architecture is retained. `src/App.jsx` owns the portfolio, data, accessible navigation, and canvas terrain. `src/styles/PortfolioSite.css` owns visual tokens and responsive/motion behavior. Original legacy components remain available but are not mounted.

## Design and content

See `PRODUCT.md` for authoritative content and `DESIGN.md` for visual intent. Project illustrations are conceptual, clearly labeled, and do not expose internal software or research results. Contact links use email and LinkedIn. No simulated form submission or invented demo links.

Self-hosted Archivo and Manrope fonts use the SIL Open Font License; licenses live in `public/fonts/`. `public/images/profile-small.webp` and `about.webp` are optimized from the owner-supplied seaside suit and kimono portraits.

## Deployment

Vercel project: `personal-website`, connected to `Taikiy49/PersonalWebsite`, production branch `main`.
Existing public address: https://personal-website-flax-five.vercel.app
Canonical custom domain: https://www.taikiyamashita.com
The apex domain is configured to redirect to www. On October 8, 2026, public DNS returned NXDOMAIN and the registrar availability check reported the domain available. Registration/DNS must be restored before the custom domain can serve the site; do not assume the Vercel attachment proves registration ownership.

## Verification

Production build, interaction tests for navigation/Escape and synchronized motion controls/contact destination, plus browser inspection at desktop and mobile sizes. Reduced motion removes decorative animation; pause buttons stop looping effects. Native document scrolling and semantic links/disclosures remain available.
