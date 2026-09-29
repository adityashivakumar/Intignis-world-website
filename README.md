# INTIGNIS WORLD — Website Framework (Phase 1)

This is the initial production-ready **framework** for the Intignis World website — architecture, routing, components, data models and seed content. It is intentionally not final-polished: copy, images, fonts, exact colours and specifications are all meant to be refined by you next.

## 1. Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to /dist
npm run preview   # preview the production build
```

Requires Node.js 22+.

## 2. Project structure

```
src/
  components/
    common/       Container, SectionHeader, CTASection, Breadcrumb
    layout/       Header, Footer, MobileMenu (React island)
    home/         Hero, DivisionSelector, previews, Quality, GlobalReach
    products/     ProductCard, ProductHero, ProductBrowser (React island),
                   ConsumableProductDetail, IndustrialProductDetail, etc.
    divisions/    DivisionCard, BrandCard, BrandPage (reusable template)
    forms/        EnquiryForm (React island)
  layouts/
    BaseLayout.astro   SEO meta, header/footer, global <head>
  pages/
    index.astro
    about/
    human-consumables/          index + earth-blend/lactonest/sucrowin/bionoids
      products/[slug].astro     dynamic product detail route
    industrial-solutions/       index + fire-sol
      products/[slug].astro     dynamic product detail route
    quality/, global-reach/, contact/
  data/            company.ts, divisions.ts, brands.ts,
                   humanConsumables.ts, industrialSolutions.ts
  lib/
    products.ts    cross-division helpers (search, related products)
  types/           product.ts, brand.ts, division.ts
  styles/
    global.css     ALL design tokens (colours, fonts) live here
public/
  images/          placeholder images, organised by section — swap in place
```

## 3. Pages implemented

- `/` — Home (hero, division selector, about preview, brand previews, Fire-Sol preview, quality, global reach, CTA)
- `/about` — company intro, timeline, vision/mission, core values
- `/human-consumables` — searchable/filterable product grid across all 4 brands
- `/human-consumables/earth-blend`, `/lactonest`, `/sucrowin`, `/bionoids` — brand pages
- `/human-consumables/products/[slug]` — 20 product detail pages (all seeded products)
- `/industrial-solutions` — searchable/filterable Fire-Sol grid (by boiler type)
- `/industrial-solutions/fire-sol` — Fire-Sol brand page
- `/industrial-solutions/products/[slug]` — 6 FireSol product detail pages
- `/quality`, `/global-reach`, `/contact` (enquiry form with dynamic division → product dropdown)

## 4. Reusable components

Header, Footer, MobileMenu, Hero, DivisionSelector, DivisionCard, BrandCard, BrandPage,
ProductCard, ProductBrowser (search + filter), ProductHero, ProductSpecifications,
ApplicationList, PackagingOptions, RelatedProducts, EnquiryForm, CTASection, SectionHeader,
Breadcrumb, Container.

## 5. Product data architecture

`src/types/product.ts` defines a discriminated union:
- `ConsumableProduct` (Human Consumables — has a `brand` slug)
- `IndustrialProduct` (Industrial Solutions — adds `boilerType`, `boilerTypeCode`, `fuelTypes`, `application`, `technicalBenefits`)

Both share: `id, slug, name, division, category, shortDescription, description, image, gallery, keyFeatures, specifications, applications, packaging, certifications, relatedProducts, status`.

### How to add a new product
1. Open `src/data/humanConsumables.ts` (or `industrialSolutions.ts`).
2. Copy an existing object, change every field, give it a unique `id` and `slug`.
3. Add the slug to any other product's `relatedProducts` array if relevant.
4. The `/products/[slug]` page and product grids pick it up automatically — no other file needs editing.

### How to change company details (address, phone, email, nav labels)
Edit `src/data/company.ts` only — it's the single source of truth used by the header, footer and contact page.

### How to replace images
Drop your final image into the matching path under `public/images/...` with the **same filename** referenced in `src/data/*.ts`, or update the path in that data file. No component code needs to change.

### How to change colours
Edit the `@theme` block at the top of `src/styles/global.css`. Every component uses these token names (`brand-navy`, `brand-orange`, `hc-green`, `ind-steel`, etc.) via Tailwind classes, so one edit updates the whole site.

### How to change fonts
Change the two font names in `src/styles/global.css` (`--font-sans`, `--font-display`) and update the Google Fonts `<link>` in `src/layouts/BaseLayout.astro` to match.

### How to connect Supabase later
The data layer in `src/data/*.ts` is already shaped like normalized tables (`brands`, `products`, `product_specifications` as nested objects, etc.). To move to Supabase:
1. Create tables mirroring the TypeScript types in `src/types/`.
2. Replace the static array exports (e.g. `humanConsumablesProducts`) with a Supabase client fetch inside each page's frontmatter (Astro pages run at build/request time and can `await` directly).
3. Keep `getStaticPaths` working by fetching all slugs at build time, or switch affected routes to on-demand rendering if you need live data.

## 6. Search & filtering

`ProductBrowser` (`src/components/products/ProductBrowser.tsx`) is a single reusable React island used on both `/human-consumables` and `/industrial-solutions`. It filters by brand or boiler type and searches name, brand, category and applications client-side — no backend required.

## 7. Enquiry form backend (Resend)

The contact form now actually sends email — it's no longer frontend-only.

**How it works:** `EnquiryForm.tsx` POSTs to `src/pages/api/enquiry.ts`, a server-rendered API route that validates the payload (required fields, email format, a hidden honeypot field to drop spam) and sends the message through [Resend](https://resend.com)'s REST API. Every other page on the site stays fully static — only this one route runs on-demand, via the `@astrojs/node` adapter configured in `astro.config.mjs`.

**Setup:**
1. Create a free Resend account and verify a sending domain (or use their test domain while developing).
2. Copy `.env.example` to `.env` and fill in `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, and `ENQUIRY_FROM_EMAIL`.
3. `npm run build && node ./dist/server/entry.mjs` to run the production server locally, or `npm run dev` for local development (both read `.env` automatically).

**If `RESEND_API_KEY` is missing**, the endpoint fails loudly with a clear "service isn't configured yet" message instead of pretending to succeed — check server logs.

**Deploying somewhere other than a self-hosted Node server?** Swap the adapter in `astro.config.mjs`:
- Vercel: `npm install @astrojs/vercel`, then `adapter: vercel()`
- Netlify: `npm install @astrojs/netlify`, then `adapter: netlify()`
No other code changes needed — `output: 'server'` and the per-page `export const prerender = true` lines stay the same.

**Alternative: Supabase instead of email.** If you'd rather store enquiries in a database and view them yourself (instead of, or alongside, emailing them), replace the Resend call in `src/pages/api/enquiry.ts` with a Supabase insert into an `enquiries` table shaped like the `EnquiryPayload` interface at the top of that file.

## 8. Engineering hardening included in this pass

- **Accessibility**: every product/brand image now renders as a real `<img>` with descriptive `alt` text (purely decorative images use `alt=""`), lazy-loaded below the fold; skip-to-content link; visible focus states; semantic heading hierarchy.
- **SEO**: `Organization` JSON-LD sitewide, `BreadcrumbList` JSON-LD on every page with breadcrumbs, `Product` JSON-LD on all 26 product pages, per-page canonical URLs and Open Graph tags, `robots.txt`, and an auto-generated `sitemap-index.xml` via `@astrojs/sitemap`.
- **Motion**: a small scroll-reveal effect (`data-reveal` + `IntersectionObserver`, see `BaseLayout.astro`) on key homepage sections. It's gated behind a `js-reveal-ready` class set synchronously in `<head>`, so content stays fully visible if JavaScript fails to load, and it's disabled automatically for anyone with `prefers-reduced-motion` set.
- **Forms**: real client + server-side validation, honeypot spam field, loading/success/error states.
- **Error handling**: a branded `/404` page (`src/pages/404.astro`).

## 9. Placeholder imagery — what to do next

I can't embed real stock photography into your codebase — anything pulled from the web is copyrighted, and using it on a live commercial site without a license is a real legal risk. What's in `public/images/` right now are generated placeholders (gradient + accent framing + label) so nothing looks broken, but they're still placeholders, not photos.

When you're ready to swap them in, a few license-free starting points organized by what each image needs to show:
- **Spices / ingredient powders** (Earth Blend, LactoNest, Sucrowin, Bionoids): Unsplash and Pexels both have large "spices" and "food ingredients" collections under free licenses — search there, or better, commission real product photography of your actual packaging.
- **Industrial / boiler / combustion** (Fire-Sol, industrial hero): Unsplash's "industrial" and "factory" collections, or your own site visits — the Fire-Sol page especially benefits from real photos of your engineers on-site, which stock photography can't provide anyway.
- **World map / global reach**: simple to recreate as an original SVG (no copyright risk at all) — worth commissioning a quick vector map from a designer rather than sourcing a photo.

Whatever you choose, just drop the final file into the matching path under `public/images/...` with the same filename referenced in `src/data/*.ts` (see section 5 above) — no component code needs to change.

## 10. Remaining TODOs

- [ ] Replace all placeholder images in `public/images/` with final photography (see section 9)
- [ ] Set up Resend (or swap in Supabase) and add real env vars — the form won't send email until this is done (see section 7)
- [ ] Add real certification *images* to `/quality` — the certification names (ISO, Startup India) are now real, but there's no image asset yet
- [ ] Confirm which countries to list on `/global-reach`
- [ ] Add exact years to the About timeline where currently marked "Since" / "Ongoing"
- [ ] Final copy pass — most page copy is now grounded in the PDF catalogue and intignisindustries.com, but it hasn't been proofread by your team
- [ ] Swap Google Fonts placeholders for final brand typefaces if different from Manrope / Plus Jakarta Sans
- [ ] Add analytics / cookie consent if required for your markets
- [ ] Update the `site` URL in `astro.config.mjs` if the final domain differs

## 11. Content sources

Human Consumables product copy is taken directly from the supplied catalogue PDF. Fire-Sol descriptions, the eight technical benefit bullet points, the About Us story, team description, and certifications (ISO, Startup India) are taken from the current intignisindustries.com. Where the catalogue did not include a detail (e.g. Cashew Nuts had no dedicated spec page), the product is marked `status: "on-request"` and displays "Details available on request."
