# Gemini × Stitch × Wix — Deck Spec

## Goal

Build a pitch deck for **Google** that mirrors the structure of the existing **Claude × Wix** deck (`~/dev/wix/headless/ember/claude-wix-deck/index.html`), but reframed for the **Google AI** tool suite:

- **Google Stitch** — visual / design tool (analogue to Claude Design)
- **Gemini CLI** — terminal / dev tool (analogue to Claude Code)
- **Wix Headless** — production platform (same as in the Claude deck)

**Audience:** Google. **Length:** leaner than the original (target ~12–15 slides vs. 23). **Format:** single self-contained `index.html` file with inline CSS + JS, just like `claude-wix-deck/index.html`.

## Narrative (One tool, one site)

Use **Wild Frame Photography** as the single live proof point — one business, not three. The deck argues:

> *"Google can plan, design, and code. Wix is where what Google makes actually becomes a business — commerce, payments, hosting, compliance."*

Wild Frame is the demo: Google Stitch designed it, Gemini CLI built it, Wix Headless runs it. The site is live at **https://elias-wildlife.art** with the source on GitHub at https://github.com/itayshmool/gemini-headless-wildlife.

> ⚠️ **Positioning honesty.** This session built Wild Frame with Claude Code + a hand-coded Astro frontend, NOT with Gemini CLI or Stitch. Before recording the deck the team needs to either (a) actually rebuild / re-skin the site through Gemini CLI + Stitch and capture genuine screenshots, or (b) frame the slides as "this is what's possible on Wix Headless — here's a site that runs on the same stack a Gemini-built site would land on." Pick one before writing the screenshots slides. Do not claim Gemini built it if it didn't.

## Source material to reuse

Copy the structure, CSS, and slide-engine JS from:

- `~/dev/wix/headless/ember/claude-wix-deck/index.html` — full deck, 23 slides
- Keep the visual language (Space Grotesk + JetBrains Mono, dark background `#0a0a0a`, accent `#ff4d00`)
- Replace `--accent: #ff4d00` with Google-flavoured palette: suggest **`#4285F4` (Google blue)** as the primary accent, or rotate Google primaries (blue / red `#EA4335` / yellow `#FBBC04` / green `#34A853`) across slide categories. Pick one and stay consistent.
- Reuse the slide engine (`<button class="menu-btn">`, the slide counter, arrow-key navigation, hash-routing). Don't re-implement.

## Proposed slide list (lean, ~13 slides)

| # | Slide | Mirrors original | Notes |
|---|---|---|---|
| 0 | **Title** — *Gemini × Wix — One Site. Three Tools. One Platform.* | slide 0 | Subtitle: "Google × Wix Headless". Date + Itay Shmool. |
| 1 | **The Gap** (quote slide) | slide 1 | Reword for Google: "Frontier models can plan, design, and code. What they're missing is a real business layer." |
| 2 | **Thesis** | slide 2 | 3 bullets: (1) Google's tools can create real, operating businesses. (2) The creation path changes — visual, terminal — the platform doesn't. (3) We prove it with one site, built live. |
| 3 | **Wix Business OS** (platform grid) | slide 3 | Copy this slide verbatim — verticals + compliance tags. No changes. |
| 4 | **The Stack** | slide 5 (Matrix) | One-row matrix: Google Stitch → design → Gemini CLI → wires Wix Headless → Wild Frame Photography. |
| 5 | **Meet Wild Frame Photography** | slide 7 (GRND intro) | One-liner pitch (wildlife portfolio + print storefront), live URL, hero screenshot. |
| 6 | **By the Numbers** | slide 8 (GRND metrics) | 4 stats: **7 pages** (Home/Gallery/Shop/Cart/Blog/Product/BlogPost) · **10 products** ($550–$1,200) · **3 blog posts** · **5 Wix verticals** (Stores · Blog · eCom · Media · Redirects) |
| 7 | **Google Stitch — Behind the Scenes** | slide 12 (Claude.ai screenshot) | Screenshot of the actual Stitch design that became Wild Frame. Caption: "Stitch designs the surface. Wix powers what's underneath." |
| 8 | **Gemini CLI — Behind the Scenes** | slide 9 (Claude Code screenshot) | Screenshot of Gemini CLI driving the Wix Headless wiring (`npx @wix/cli token …`, `curl` against `wixapis.com`, product creation, blog seeding). |
| 9 | **Architecture** | slide 19 | Three rows collapsed into one flow: Stitch → Gemini CLI → Wix Headless → Wild Frame. Same `arch-box` styling, single arrow chain. |
| 10 | **The Partnership / Ask** | slide 20 | Rephrase for Google: Wix as the production engine for Gemini's tool suite. Four asks: (1) Featured surface — Wix inside Gemini for SMB / commerce intent. (2) Joint MCP roadmap — Wix MCP exposed in Gemini CLI. (3) Co-launch moment — joint demo + blog. (4) Named partnership — Wix as reference "production engine". |
| 11 | **Evidence** | slide 21 | Table of claims with ✓ / □ status. Be honest about what's currently proven vs. what's planned (see Positioning Honesty note above). |
| 12 | **Closing** | slide 22 | *"Gemini thinks. Wix builds. Together we ship."* Tagline: "One site. Three tools. One platform." |

## Wild Frame Photography — quick facts (for slides 5, 6, 9)

- **Live:** https://elias-wildlife.art (also served from `https://wild-frame-31ffcd8d-itayshmool.wix-site-host.com`)
- **Repo:** https://github.com/itayshmool/gemini-headless-wildlife (public)
- **Stack:** Astro 5 (SSR on Wix Cloud) + `@astrojs/react` islands + Tailwind CDN + Stitch design tokens
- **Wix SDKs used:** `@wix/astro`, `@wix/stores` (V3), `@wix/ecom`, `@wix/blog`, `@wix/media`, `@wix/redirects`
- **Pages:**
  - `/` — home
  - `/gallery` — masonry grid, every photo links to its product
  - `/shop` — 10 limited-edition prints
  - `/product/[slug]` — detail + Add-to-Cart (React island calls `currentCart.addToCurrentCart`)
  - `/cart` — line items, qty, remove, checkout (creates Wix checkout via `@wix/redirects`)
  - `/blog` — 3 published journal entries with cover images
  - `/blog/[...slug]` — Ricos rich-text → HTML
- **Content seeded:** 10 wildlife photos uploaded to Wix Media Manager; 10 products created via `POST /stores/v3/bulk/products-with-inventory/create`; 3 blog posts published with cover images via `PATCH /blog/v3/draft-posts/{id}` + republish.
- **Site ID:** `fbd6d221-3e84-4145-8e0f-fdc170b429ce`

## Files needed in the new deck folder

- `index.html` — single self-contained deck file (copy + adapt from `claude-wix-deck/index.html`)
- `ss-stitch.png` — Google Stitch screenshot (slide 7) ← **needs capture**
- `ss-gemini-cli.png` — Gemini CLI screenshot (slide 8) ← **needs capture**
- `ss-wild-frame-home.png` — Wild Frame home page (slide 5) ← **needs capture from https://elias-wildlife.art**
- *(optional)* `og-image.png` — social preview, 1200×630

## Out of scope for v1

- "Manage" phase slides (slides 15–18 in the original) — skip for the lean deck. If the audience asks, fall back to the original deck's manage screenshots.
- Multi-business architecture diagram.
- Per-tool screenshots beyond Stitch + Gemini CLI.

## Open questions to resolve in the new session

1. **Positioning of who built Wild Frame** (see warning above). Do we rebuild with Gemini CLI + Stitch, or reframe the slide copy?
2. **Accent colour** — single Google blue, or rotate the four Google primaries?
3. **Date + venue** — original deck has "London, May 20 2026". What's the equivalent for the Gemini pitch?
4. **Which Gemini CLI behaviour to screenshot** — token mint + REST calls is the closest analogue to the Claude Code screenshot in the original deck.

## Suggested kickoff prompt for the new session

> Build the Gemini × Stitch × Wix deck per `./deck/SPEC.md`. Start by reading the spec, then copy `~/dev/wix/headless/ember/claude-wix-deck/index.html` to `./deck/index.html` and adapt slide-by-slide. Resolve the four open questions at the bottom of the spec before generating any screenshots. Do NOT re-upload any images to Wix or re-touch the Wild Frame site — that work is complete.
>
> Run from the project root: `~/dev/wix/headless/wild-frame-photography/gemini-headless-wildlife/`.
