# Curiosity Cloud — Design System & Theme Specification

> **Version:** 1.0.0  
> **Source Project:** `curiosity-cloud` (Next.js 16 + React 19 + Tailwind CSS v4)  
> **Aesthetic Philosophy:** *Industrial Precision meets Celestial Elegance* — high-density compute infrastructure anchored by clean round-the-clock physical energy.

---

## 1. Executive Summary & Design Vision

Curiosity Cloud's design system translates the dual nature of modern artificial intelligence infrastructure: **limitless digital compute** built upon **tangible, heavy electrical energy**.

### Core Tenets
1. **Cosmic & Computational Scale:** Visual motifs draw from celestial mechanics (orbital orreries, twinkling starfields, planetary tracks, atmospheric flare fields) to represent planetary-scale GPU compute clusters.
2. **Precision Engineering & Disclosure:** Uncompromising clarity in technical specifications. Every number, power density metric, and interconnect speed is crisply presented using tabular figures, monospace annotations, and rigorous status tags.
3. **Layered Glassmorphism on Atmospheric Paper:** Instead of generic dark mode or stark white, the backdrop is a tinted cool paper (`#F4F6FC`) beneath floating glassmorphic panels (`backdrop-filter: blur(24px)`) with drifting chromatic light flares.
4. **Deliberate Color Hierarchy:** A cool spectral ramp (Violet → Indigo → Blue → Sky → Cyan) represents computing tiers, with one singular warm golden-amber accent (`#F59E0B`) strictly reserved for **Energy** (the star / power source).

---

## 2. Color Palette & Token Architecture

### 2.1 CSS Custom Properties (`:root`)

```css
:root {
  /* Neutral Canvas & Typography */
  --paper: #F4F6FC;                  /* Atmospheric light background */
  --ink: #0C1226;                    /* Primary high-contrast text & headings */
  --ink-soft: #1E2740;               /* Secondary dark / headings */
  --slate: #556077;                  /* Body text & descriptive copy */
  --slate-light: #8A93A8;            /* Sub-labels, captions & muted metadata */
  --hair: rgba(12, 18, 38, 0.10);    /* Primary hair-line borders */
  --hair-soft: rgba(12, 18, 38, 0.06); /* Secondary delicate dividers */

  /* Compute Spectral Ramp */
  --purple: #6D28D9;                 /* Deep Violet / Foundation */
  --magenta: #4F46E5;                /* Vibrant Indigo / Primary Accent */
  --terra: #2563EB;                  /* Electric Blue */
  --orange: #0EA5E9;                 /* Sky Blue */
  --amber: #0891B2;                  /* Deep Cyan / Teal */
  --cyan: #22D3EE;                   /* Bright Cyan / GPU Cloud */
  --accent: #4F46E5;                 /* Brand Primary Interaction Accent */

  /* Dedicated Energy Token */
  --energy: #F59E0B;                 /* Solar Gold (Restricted to Power Core) */

  /* Glassmorphism System */
  --glass-bg: rgba(255, 255, 255, 0.56);
  --glass-bg-strong: rgba(255, 255, 255, 0.78);
  --glass-line: rgba(255, 255, 255, 0.90);
  --glass-shadow: 0 1px 2px rgba(12, 18, 38, 0.04), 0 14px 36px -14px rgba(12, 18, 38, 0.16);

  /* Typography Variables */
  --font-poppins: var(--font-poppins-var), 'Poppins', system-ui, sans-serif;
  --font-manrope: var(--font-manrope-var), 'Manrope', system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono-var), 'JetBrains Mono', ui-monospace, monospace;
}
```

### 2.2 Palette Swatches & Semantic Roles

| Token | Hex / Value | Semantic Role & Application |
| :--- | :--- | :--- |
| `--paper` | `#F4F6FC` | Global viewport canvas; clean, frosted, non-fatiguing cool light background |
| `--ink` | `#0C1226` | Deep obsidian blue; primary titles, wordmark, bold elements |
| `--ink-soft` | `#1E2740` | Secondary headers, list item highlights, spec data points |
| `--slate` | `#556077` | Standard body prose, paragraphs, card descriptions |
| `--slate-light`| `#8A93A8` | Eyebrow text, table column headers, timestamps, inactive tags |
| `--cyan` | `#22D3EE` | Product `C-I GPU Cloud`; bare-metal accelerator tier |
| `--orange` | `#0EA5E9` | Product `C-II Private AI Cloud`; isolated single-tenant compute |
| `--magenta` | `#4F46E5` | Product `C-III Managed AI Infrastructure` & Primary Action state |
| `--purple` | `#6D28D9` | Product `C-IV Inference & Training`; pooled batch compute |
| `--energy` | `#F59E0B` | Power Core, solar radiation gradient, energy contracts only |
| `--glass-bg` | `rgba(255,255,255,0.56)` | Glass card surfaces with `backdrop-filter: blur(24px)` |
| `--glass-line`| `rgba(255,255,255,0.90)` | Top/side highlight border on glass cards |

---

## 3. Brand Gradients

The design utilizes mathematically tuned multidirectional gradients to convey energetic movement.

```css
/* 1. Emphasized Text / Keyphrase Gradient */
em {
  font-style: normal;
  background: linear-gradient(100deg, #6D28D9, #4F46E5 32%, #2563EB 62%, #0891B2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* 2. Primary Action Button Gradient */
.btn-primary {
  background: linear-gradient(100deg, #6D28D9, #4F46E5 40%, #2563EB 72%, #0EA5E9 100%);
  border: 1px solid rgba(109, 40, 217, 0.32);
  box-shadow: 0 1px 2px rgba(79, 70, 229, 0.22), 0 12px 26px -12px rgba(37, 99, 235, 0.85);
}

/* 3. Hero CTA Band Gradient (High Impact) */
.cta-inner {
  background: linear-gradient(118deg, #5B21B6, #6D28D9 22%, #4F46E5 46%, #2563EB 74%, #0EA5E9 100%);
  box-shadow: 0 24px 60px -26px rgba(79, 70, 229, 0.62);
}

/* 4. Global Announcement Bar */
.announce {
  background: linear-gradient(90deg, #6D28D9, #4F46E5 30%, #2563EB 62%, #0EA5E9 100%);
}

/* 5. Star Core Solar Radial Gradient */
.star {
  background: radial-gradient(circle at 36% 30%, #FFF6E4, #FFD27A 26%, #F59E0B 60%, #D97706 88%, #B45309 100%);
  box-shadow: 0 0 34px rgba(245, 158, 11, 0.48), 0 8px 28px -8px rgba(180, 83, 9, 0.50);
}

/* 6. Conic Brand Mark */
.mark {
  background: conic-gradient(from 200deg, #6D28D9, #4F46E5, #2563EB, #0EA5E9, #22D3EE, #6D28D9);
  box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.14);
}
```

---

## 4. Typography Scale & System

Curiosity Cloud uses three deliberate font families paired by semantic duty:

```
┌──────────────────────────────────────────────────────────┐
│  Headings & Display  ──►  Poppins (Geometric & Modern)   │
│  Body & Interaction  ──►  Manrope (Clean & Ultra-Legible)│
│  Telemetry & Specs   ──►  JetBrains Mono (Technical)     │
└──────────────────────────────────────────────────────────┘
```

### 4.1 Type Hierarchy

| Hierarchy | Font | Size (Clamp / Fixed) | Weight | Letter Spacing | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display H1** | Poppins | `clamp(38px, 5vw, 68px)` | 600 (SemiBold) | `-0.035em` | `1.08` |
| **Page Header H1** | Poppins | `clamp(36px, 4.8vw, 62px)` | 600 (SemiBold) | `-0.035em` | `1.08` |
| **Section Title H2**| Poppins | `clamp(27px, 3.4vw, 42px)` | 600 (SemiBold) | `-0.025em` | `1.14` |
| **Card Title H3** | Poppins | `18px – 24px` | 600 (SemiBold) | `-0.020em` | `1.20` |
| **Stat Numbers** | Poppins | `clamp(28px, 4.4vw, 55px)` | 600 (SemiBold) | `-0.040em` | `1.05` |
| **Lead / Lede Copy**| Manrope | `clamp(15px, 1.15vw, 18px)`| 400 (Regular) | `normal` | `1.65` |
| **Body Paragraph** | Manrope | `16px` | 400 (Regular) | `normal` | `1.62` |
| **Button Text** | Poppins | `14.5px` | 600 (SemiBold) | `-0.005em` | `1.00` |
| **Eyebrow / Overline**| Manrope/Mono| `11px` | 500 / 600 | `0.20em` (Uppercase) | `1.00` |
| **Monospace / Specs**| JetBrains Mono|`10px – 13px` | 400 / 500 | `0.10em – 0.18em`| `1.40` |

---

## 5. Visual Surfaces, Glassmorphism & Elevation

All interactive cards and structural panels use a standardized **frosted glass elevation model**:

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid var(--glass-line);
  box-shadow: var(--glass-shadow);
}
```

### Elevation Layers

1. **Layer 0 (Canvas):** `--paper` background (`#F4F6FC`) + FlareField orbs + Canvas StarChart.
2. **Layer 1 (Subsurface Cards):** Semi-transparent white (`rgba(255,255,255,0.56)`), 1px white border (`rgba(255,255,255,0.90)`), 16px/18px/20px border radius.
3. **Layer 2 (Floating Nav / Active Readouts):** `rgba(255, 255, 255, 0.78)` with sticky positioning, blur, and outer perimeter shadow `0 14px 36px -14px rgba(12, 18, 38, 0.16)`.
4. **Layer 3 (Popovers / Dropdown Panels):** Pure solid white (`#FFFFFF`) to eliminate double-blur transparency artifacts, with deep drop shadow `0 18px 44px -16px rgba(12, 18, 38, 0.26)`.

---

## 6. Motion, Animation & Celestial Components

### 6.1 FlareField (Atmospheric Lighting)
A fixed full-screen background container containing 9 ambient colored radial flares that slowly drift on independent Lissajous/sinusoidal orbits:
- **Orbital loops:** 38s to 70s linear infinite cycles.
- **Filter:** `filter: blur(58px)`.
- **Blend:** Low opacity (`0.24` to `0.44`).

```css
@keyframes drift0 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  33%  { transform: translate3d(6vw, -4vh, 0) scale(1.12); }
  66%  { transform: translate3d(-3vw, 5vh, 0) scale(0.94); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
```

### 6.2 StarChart (Interactive Canvas Constellation)
A resolution-aware HTML5 Canvas (`devicePixelRatio` scaling) rendering up to 300 twinkling stars:
- **Palette mix:** 62% deep celestial dark (`#1B2440`) and 38% compute spectral colors (`#7C3AED`, `#4F46E5`, `#2563EB`, `#0EA5E9`, `#22D3EE`).
- **Twinkle Physics:** `0.68 + 0.32 * Math.sin((time / 1000) * speed + phase)`.

### 6.3 Planetary Orrery
An astronomical representation of Curiosity's compute tiers orbiting the Central Energy Sun:
- **Central Sun:** Glowing yellow-orange star with radial corona breathing animation (`breathe 7s ease-in-out infinite`).
- **Concentric Orbits:** Tracks with CSS `--d` (diameter) from 34% to 94%.
- **Counter-Rotating Nodes:** Parent container rotates `0deg → 360deg`, while the child button rotates `360deg → 0deg` so tags remain level.
- **Interactive State:** Hovering/focusing an orbit scales the body dot `scale(1.42)` with expanded colored glow.

---

## 7. Component Library & Patterns

### 7.1 Buttons (`.btn`)
```css
/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 600;
  font-family: var(--font-poppins);
  letter-spacing: -0.005em;
  transition: transform .18s, box-shadow .2s, color .2s, border-color .2s;
}

/* Primary Button */
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(79, 70, 229, 0.26), 0 18px 34px -12px rgba(14, 165, 233, 0.9);
}

/* Ghost / Secondary Button */
.btn-ghost {
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid var(--hair);
  color: var(--ink);
}
.btn-ghost:hover {
  border-color: var(--purple);
  color: var(--purple);
  transform: translateY(-1px);
}
```

### 7.2 Chips & Status Badges
```css
/* Categorical Chip */
.chip {
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(109, 40, 217, 0.09);
  color: var(--purple);
  display: inline-block;
}

/* Confirmed Technical Status */
.status-set {
  color: #047857;
  background: rgba(4, 120, 87, 0.09);
  border: 1px solid rgba(4, 120, 87, 0.22);
}

/* Open / Unconfirmed Status */
.status-open {
  color: var(--slate-light);
  background: rgba(12, 18, 38, 0.04);
  border: 1px solid var(--hair);
}
```

### 7.3 Technical Spec Table (`.instrument`)
Built for clear reading of dense engineering parameters:
- **Header:** Uppercase Monospace (`JetBrains Mono`, `10px`, `letter-spacing: 0.18em`).
- **Row Hover:** Lightens to `rgba(255, 255, 255, 0.55)`.
- **Parameter Name:** Bold `Manrope` (26% width on desktop).
- **Parameter Value:** High-readability `JetBrains Mono` (`12.5px`, color `--slate`).
- **Status Indicator:** Embedded status pill (`SET` or `OPEN`).

### 7.4 Feature Grid & Product Cards
- **Product Card (`.svc`):** Glass backdrop with top-right corner radial accent glow `radial-gradient(circle at 100% 0%, var(--tint), transparent 62%)`.
- **Top Border Accent (`.pillar`):** 3px colored accent bar (`var(--tint)`) resting on the top edge of each pillar.
- **Card Hover:** Subtle physical lift `translateY(-3px)` and soft colored shadow expansion `0 22px 46px -18px rgba(79, 70, 229, 0.34)`.

---

## 8. Layout, Spacing & Breakpoint System

### 8.1 Spacing Scale
- Max container width: `1280px` (`.inner`).
- Fluid page hero padding: `clamp(36px, 5vw, 72px) clamp(20px, 5vw, 64px) clamp(30px, 4vw, 56px)`.
- Fluid section padding: `clamp(48px, 6vw, 92px) clamp(20px, 5vw, 64px)`.
- Standard grid gap: `14px` for cards; `22px 34px` for metric grids.

### 8.2 Responsive Breakpoints

| Breakpoint | Target Device | Adaptive Layout Behavior |
| :--- | :--- | :--- |
| **`max-width: 1180px`** | Small Desktop / Tablet Landscape | Hide text-heavy top nav links; compact menu buttons |
| **`max-width: 1080px`** | Tablet Landscape | Hero grid stacks to 1 column; Orrery moves above copy; footer switches to 2 columns |
| **`max-width: 920px`** | Tablet Portrait | Main nav collapses into slide-down mobile menu drawer; Hamburger button activates |
| **`max-width: 640px`** | Mobile | Compact nav margins (`10px 12px`); 1-column spec tables; body tags hidden in Orrery |

### 8.3 Accessibility & Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  .spinner, .body, .corona, .flare { animation: none !important; }
  * { transition-duration: .01ms !important; }
}
```

---

## 9. Sister Theme Reference: Curiosity Energy

Within the Curiosity ecosystem, **Curiosity Energy** uses a complementary Dusk-to-Dawn palette:

```
Curiosity Cloud (Compute)             Curiosity Energy (Power)
─────────────────────────             ─────────────────────────
Canvas: #F4F6FC (Cool Paper)          Canvas: #FAEADD (Rosarian Warm Paper)
Ink:    #0C1226 (Obsidian Ink)        Ink:    #222023 (Wet Charcoal)
Accent: Compute Spectral Ramp         Accent: Dusk-to-Dawn Sky Gradient:
        • #22D3EE (Cyan)                      • #FBCF4F (Solar Gold)
        • #0EA5E9 (Sky)                       • #DDAAFF (Wind Lavender)
        • #4F46E5 (Indigo)                    • #F29CB7 (Storage Rose)
        • #6D28D9 (Violet)                    • #522A6F (Grid Deep Purple)
```

---

## 10. Quick Tailwind CSS v4 Configuration Snippet

```css
@import "tailwindcss";

@theme inline {
  --color-paper: var(--paper);
  --color-ink: var(--ink);
  --color-ink-soft: var(--ink-soft);
  --color-slate: var(--slate);
  --color-slate-light: var(--slate-light);
  --color-purple: var(--purple);
  --color-magenta: var(--magenta);
  --color-terra: var(--terra);
  --color-orange: var(--orange);
  --color-amber: var(--amber);
  --color-cyan: var(--cyan);
  --color-energy: var(--energy);
  --color-accent: var(--accent);
  --font-sans: var(--font-manrope);
  --font-heading: var(--font-poppins);
  --font-mono: var(--font-mono);
}
```
