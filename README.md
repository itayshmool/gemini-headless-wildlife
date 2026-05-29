# Wild Frame Photography

A wildlife photography portfolio + storefront built on **Wix Managed Headless** with **Astro**.

**Live site:** https://wild-frame-31ffcd8d-itayshmool.wix-site-host.com

## Features

- **Home** — cinematic landing page with hero section
- **Gallery** (`/gallery`) — masonry grid of wildlife prints, each clickable to its product page
- **Shop** (`/shop`) — limited-edition print catalogue powered by Wix Stores V3
- **Product detail** (`/product/[slug]`) — image, description, Add-to-Cart
- **Cart** (`/cart`) — line items, quantity, remove, checkout (redirects to hosted Wix checkout)
- **Blog** (`/blog`) — published journal entries with cover images
- **Blog post** (`/blog/[...slug]`) — full post with Ricos rich-text rendering

## Stack

- [Astro 5](https://astro.build/) with React islands (`@astrojs/react`)
- [`@wix/astro`](https://www.npmjs.com/package/@wix/astro) — auto-wires Wix SDK auth + SSR adapter
- [`@wix/stores`](https://www.npmjs.com/package/@wix/stores) — Catalog V3 (`productsV3`)
- [`@wix/ecom`](https://www.npmjs.com/package/@wix/ecom) — `currentCart` for add-to-cart + checkout
- [`@wix/blog`](https://www.npmjs.com/package/@wix/blog) — blog posts
- [`@wix/redirects`](https://www.npmjs.com/package/@wix/redirects) — checkout redirect session
- Tailwind utility classes inlined via a CDN config in `src/layouts/Layout.astro` (Stitch design system tokens)

## Local development

```bash
npm install
npm run dev      # local preview
npm run build    # production build
npm run release  # publish to Wix
```

You must be authenticated with `npx @wix/cli login` for `release` to work.

## Project structure

```
src/
├── components/
│   ├── AddToCartButton.tsx   # React, calls currentCart.addToCurrentCart
│   └── CartView.tsx          # React, /cart UI + checkout flow
├── layouts/
│   └── Layout.astro          # Header/footer/Tailwind config (shared chrome)
├── lib/
│   ├── ricos.ts              # Ricos → HTML for blog/product descriptions
│   └── wix-image.ts          # parse wix:image:// URIs to CDN URLs
└── pages/
    ├── index.astro           # homepage
    ├── gallery.astro         # masonry product grid
    ├── shop.astro            # product catalogue
    ├── blog.astro            # post list
    ├── cart.astro            # cart wrapper
    ├── blog/[...slug].astro  # blog post detail
    └── product/[slug].astro  # product detail
```

## Notes

- The Wix Catalog V3 SDK returns `media.main.image` as a `wix:image://v1/<id>/...` URI string (not an `{ url }` object). `src/lib/wix-image.ts` handles both shapes.
- Product / variant IDs from the SDK live under `_id`, not `id`. The product detail page uses `_id ?? id` to be safe.
- Blog cover images are attached via `PATCH /blog/v3/draft-posts/{id}` with `media.wixMedia.image.id = "<fileId>"`, then republished.
