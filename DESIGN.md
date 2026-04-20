# Design Brief: CulturHub Phase 1.5

**Purpose** | Premium cultural institution website for 2026; luxury museum meets modern tech with enhanced admin area management
**Tone** | Refined, confident, prestigious; minimalist with selective visual richness + admin efficiency
**Differentiation** | Dark-first glassmorphic system with cultural prestige, micro-interaction choreography, and comprehensive area content management

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary | 0.45 0.15 250 (light) / 0.68 0.18 250 (dark) | Deep sapphire; cultured, authoritative |
| Secondary | 0.52 0.08 45 (light) / 0.62 0.12 35 (dark) | Warm bronze; heritage warmth, accent warmth |
| Accent | 0.55 0.14 35 (light) / 0.65 0.16 35 (dark) | Bronze highlight for interactive elements |
| Background | 0.975 0 0 (light) / 0.12 0 0 (dark) | Neutral; light for public pages, dark for admin |
| Card | 0.99 0 0 (light) / 0.15 0 0 (dark) | Elevated surfaces with glassmorphic treatment |
| Muted | 0.91 0.01 0 (light) / 0.22 0 0 (dark) | Disabled, placeholder, secondary content |
| Destructive | 0.55 0.22 25 | Alert red; sparse usage only |

## Typography

| Tier | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Bricolage Grotesque | 400–700 | Headlines, hero text, CTAs |
| Body | General Sans | 400–600 | Paragraph, label, description |
| Mono | Geist Mono | 400 | Code, data, admin forms |

## Shape & Depth

| Element | Radius | Treatment |
|---------|--------|-----------|
| Card / Modal | 0.75rem | Glassmorphic with backdrop blur, 1px border white/10–20 |
| Button | 0.75rem | Soft, no sharp corners; hover lifts with shadow-elevated |
| Input | 0.75rem | Glass appearance with faint border; focus ring primary |
| Icon | — | 32–48px large; always accompanied by text on mobile |

## Structural Zones

| Zone | Treatment | Notes |
|------|-----------|-------|
| Header | Glass-dark backdrop blur, semi-transparent | Always visible; language toggle + nav |
| Hero | Full-bleed dark gradient bg; large typography | Mobile-first 100vh viewport |
| Card Grid | Spaced glassmorphic cards; hover lift | Content sections; 1–2 columns mobile, 3+ desktop |
| CTA Areas | Accent color with animation entry | Slide-up + fade-in; Framer Motion orchestrated |
| Footer | Dark glass with border-top; reduced footer links | Light text on dark surface |
| Admin Panels | Dark glass cards on dark background | Slight elevation; live preview pane |

## Motion & Interaction

- **Entrance**: Staggered fade-in + slide-up (0.3–0.4s) on hero, cards, CTAs
- **Hover**: Scale 1.02, shadow elevation-2, inner glow accent on cards; 0.2s smooth easing
- **Focus**: Primary ring color (sapphire), 2px outline on inputs and buttons
- **Loading**: Subtle pulse animation on content placeholders
- **Language Toggle**: Quick fade transition (0.2s) with direction awareness (RTL/LTR)
- **Flag Wave**: Continuous 0.6s wave rotation (±5deg) on animated SVG language flags; origin at 70% 70%
- **Media Compression Preview**: Pulse-subtle fade (2s) on before/after file size comparison

## Constraints

- **No gradients** except subtle background tints; glassmorphism via blur + translucency
- **No neon or glow effects**; use refined shadows and borders only
- **Accessible dark-first**: Ensure AA contrast on all text (min 0.7 L diff)
- **Mobile hero icons**: Minimum 32px; scale to 48px on tablet+
- **RTL/LTR**: All spacing and flex direction responsive; Persian (fa-IR) and Swedish (sv-SE) supported
- **Lighthouse target**: 95+ on mobile, 98+ on desktop (no LCP issues, preload fonts)

## Admin Panel Theme

Dark glassmorphic override: card `0.18 0 0`, border white/10, primary accent preserved. Forms use same input glass style. Live preview panel right side (desktop only); mobile stacks vertically.

## Phase 1.5 Admin Enhancements

| Feature | Treatment | Notes |
|---------|-----------|-------|
| Area Management Page | Unified glass card grid with icon, bilingual title/subtitle, background image preview, hero slider list, page background video/image selector | Fully editable from one page; all area-specific content in one place |
| SVG Flag Icons | Animated waving effect (0.6s infinite rotation ±5deg) for language selection on landing page and admin | Waving flags on language toggle cards; more reliable than emoji |
| Media Compression Modal | Before/after file size preview (e.g. 1.2MB → 340KB) with user confirmation button; pulse-subtle animation | Shows compression ratio; user confirms before upload |
| RTL Language Toggle | Admin Persian/Swedish toggle with independent setting from public site; all RTL-aware spacing and flex direction | Admin language isolated; no impact on public site language |
| Editable Admin Password | Settings panel with password edit input (glass style); persisted in canister settings | User-configurable security; moved from hardcoded default |

## Signature Detail

Glassmorphic layering: Every interactive surface (card, button, modal) sits behind a transparent glass plate with subtle 1px inner border and backdrop blur. No flat colors; all depth from layering, blur, and shadow. Hover state adds glow accent and shadow elevation-2 without color inversion.
