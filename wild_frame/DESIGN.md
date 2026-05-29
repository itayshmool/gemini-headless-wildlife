---
name: Wild Frame
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5b3'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907f'
  outline-variant: '#4d4638'
  surface-tint: '#e5c273'
  primary: '#e6c374'
  on-primary: '#3f2e00'
  primary-container: '#c9a85c'
  on-primary-container: '#523d00'
  inverse-primary: '#755b16'
  secondary: '#cac6be'
  on-secondary: '#32302b'
  secondary-container: '#494741'
  on-secondary-container: '#b9b5ad'
  tertiary: '#b7c5fd'
  on-tertiary: '#1f2e5c'
  tertiary-container: '#9caae0'
  on-tertiary-container: '#303e6d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdf9a'
  primary-fixed-dim: '#e5c273'
  on-primary-fixed: '#251a00'
  on-primary-fixed-variant: '#5a4300'
  secondary-fixed: '#e7e2da'
  secondary-fixed-dim: '#cac6be'
  on-secondary-fixed: '#1d1c17'
  on-secondary-fixed-variant: '#494741'
  tertiary-fixed: '#dce1ff'
  tertiary-fixed-dim: '#b6c4fc'
  on-tertiary-fixed: '#061846'
  on-tertiary-fixed-variant: '#364474'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  caption:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 20px
---

## Brand & Style

This design system establishes a cinematic, high-end digital gallery experience tailored for wildlife photography. The brand personality is silent, observant, and premium, allowing the photographic work to remain the singular focus. By utilizing a **Minimalist** and **High-Contrast** style, the interface recedes into the background, functioning like a darkened physical gallery.

The target audience consists of collectors, editors, and enthusiasts who value artistry and technical excellence. The emotional response is one of reverence and awe. The UI uses heavy whitespace (macro-spacing) and a restrained palette to evoke a sense of luxury and exclusivity, ensuring that every interaction feels deliberate and sophisticated.

## Colors

The palette is strictly limited to maintain a cinematic atmosphere. 

- **Primary (Accent Gold):** Reserved for high-priority interactions, subtle highlights, and brand signatures. It represents the "golden hour" light often sought in wildlife photography.
- **Secondary (Warm Ivory):** Used for all primary reading text. The warmth reduces eye strain against the dark background compared to pure white, adding a timeless, paper-like quality.
- **Neutral (Dark Charcoal):** The foundation of the system. This deep, near-black shade provides the necessary "obsidian" backdrop to make vibrant photography pop.
- **Surface:** A slightly lighter charcoal used for subtle UI layering and container backgrounds to differentiate from the base canvas.

## Typography

The typographic hierarchy relies on the contrast between the editorial elegance of **Playfair Display** and the functional precision of **Inter**. 

Display and Headline styles should be used sparingly to frame photography sections. **Inter** is utilized for body copy and metadata to ensure maximum legibility at smaller scales. All labels and overlines should utilize wide letter-spacing and uppercase styling to denote "Gallery Labels," mimicking the descriptions found in physical exhibitions.

## Layout & Spacing

This design system utilizes a **Fluid Grid** with significant outer margins to create a "letterbox" cinematic feel. 

- **Desktop:** 12-column grid with 64px side margins to isolate content from the screen edges.
- **Masonry Grid:** Photography galleries must use a variable-height masonry layout to preserve the original aspect ratios of the images, avoiding forced cropping.
- **Vertical Rhythm:** Large vertical gaps (120px+) should be used between major sections to allow the viewer a "visual palate cleanse" before moving to the next series.
- **Alignment:** Text content should be predominantly left-aligned or centered within specific modules to maintain a structured, editorial feel.

## Elevation & Depth

To maintain the minimalist luxury aesthetic, this design system avoids traditional drop shadows. Depth is communicated through **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Layering:** Elevated elements (like modals or dropdowns) use the `surface` color (#242424) with a very fine 1px border in a slightly lighter grey (#333333).
- **Glassmorphism:** Navigation bars use a high-saturation backdrop blur (20px) with a 10% opacity overlay of the primary color to create a "smoked glass" effect that allows the photography to scroll underneath.
- **Interaction:** Hover states on interactive cards should use a subtle scale-up (1.02x) rather than a shadow increase, maintaining the flat, editorial integrity of the page.

## Shapes

The design system employs a **Sharp (0)** roundedness philosophy. Every frame, button, and input field features 90-degree corners. This evokes the feeling of professional photo frames and architectural blueprints. Sharp corners reinforce the "Precision" and "Professionalism" of the brand, moving away from the consumer-grade softness of rounded UI.

## Components

- **Buttons:** Primary buttons are ghost-style with a 1px Gold border and Gold text. On hover, they fill with Gold and transition text to Dark Charcoal. Secondary buttons have no border and use underlined Warm Ivory text.
- **Photography Cards:** Images are displayed edge-to-edge within their grid container. Metadata (Species, Location) appears only on hover via a subtle bottom-up gradient overlay (30% black).
- **Navigation:** A transparent header that transitions to a smoked-glass blur upon scroll. Links are in Inter (Label-md) with a Gold underline indicator for the active state.
- **Input Fields:** Minimalist design consisting only of a bottom 1px border in Warm Ivory. Labels float above the line in Label-md style.
- **Chips/Tags:** Used for "Exhibition" or "Collection" categories. Small, rectangular boxes with 1px Ivory borders and 12px uppercase text.
- **Image Lightbox:** A full-screen immersion mode with a pure black background (#000000), removing all UI elements except for a small Gold "Close" 'X' and Ivory "Information" icon in the corners.