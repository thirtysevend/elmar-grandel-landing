# Phase 1: Page Foundation - Research

**Researched:** 2026-03-18
**Domain:** Frontend single-page layout -- dark theme, responsive design, smooth scroll navigation
**Confidence:** HIGH

## Summary

Phase 1 is a greenfield frontend build: no code exists yet. The goal is a polished, dark-themed, futuristic single-page layout with three section placeholders (hero, expertise, contact), smooth scroll navigation, and full responsiveness from 375px to 1440px. The project constraints specify "pure frontend -- HTML/CSS/JS with optional lightweight framework" and "local only for MVP."

Vite (v8) with vanilla JavaScript is the right foundation. It provides instant HMR, zero-config scaffolding, and -- critically -- sets up the module system and build pipeline that Phase 2 will need for Three.js / particle libraries. Using vanilla JS (no React/Vue) keeps the stack minimal while Vite handles dev experience. The dark futuristic theme is best implemented through CSS custom properties defining a color token system with neon accent colors and subtle glow effects. Smooth scroll uses native CSS `scroll-behavior: smooth` with `scroll-margin-top` for fixed-header offset, plus IntersectionObserver for scroll-spy active nav highlighting.

**Primary recommendation:** Scaffold with `npm create vite@latest -- --template vanilla`, implement the full layout with semantic HTML sections, CSS custom properties for the dark theme token system, CSS Grid/Flexbox for responsive layout, and native smooth scrolling with IntersectionObserver-based scroll spy.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| VIZ-02 | Dark mode futuristic visual design throughout the entire page | CSS custom properties color system, neon glow effects via box-shadow/text-shadow, glassmorphism via backdrop-filter, dark background palette (#0a0a0f base) |
| VIZ-03 | Smooth scroll navigation between sections | Native `scroll-behavior: smooth`, `scroll-margin-top` for fixed header offset, IntersectionObserver scroll spy for active nav highlighting |
| VIZ-04 | Fully responsive layout across mobile, tablet, and desktop | Mobile-first CSS with breakpoints at 768px and 1024px, CSS Grid for main layout, Flexbox for components, `clamp()` for fluid typography |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vite | 8.x | Dev server, bundler, HMR | Industry standard for frontend dev; vanilla JS template provides zero-config setup; prepares module system for Phase 2 (Three.js imports) |
| Vanilla JS | ES2022+ | Application logic | Project constraint says no framework; keeps bundle tiny; sufficient for scroll spy and nav toggle |
| CSS Custom Properties | Native | Theme token system | No build step needed; runtime-changeable; enables future Phase 3 language toggle styling |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none for Phase 1) | - | - | Phase 1 needs zero npm dependencies beyond Vite itself |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vite | Plain HTML files | No HMR, no module imports, harder to add Three.js in Phase 2 |
| Vanilla CSS | Tailwind CSS | Adds build complexity; project is small enough that hand-written CSS is cleaner and more educational |
| Vanilla JS | Alpine.js | Adds dependency for minimal interactivity (just nav toggle + scroll spy) |

**Installation:**
```bash
npm create vite@latest elmar-landing -- --template vanilla
cd elmar-landing
npm install
npm run dev
```

## Architecture Patterns

### Recommended Project Structure
```
elmar-landing/
├── index.html              # Entry point - all sections in one file
├── package.json
├── vite.config.js           # Minimal Vite config (if needed)
├── public/
│   └── fonts/               # Self-hosted fonts (if any)
├── src/
│   ├── main.js              # Entry JS - imports styles, initializes modules
│   ├── styles/
│   │   ├── reset.css         # CSS reset / normalize
│   │   ├── tokens.css        # CSS custom properties (colors, spacing, typography)
│   │   ├── layout.css        # Grid, sections, responsive breakpoints
│   │   ├── nav.css           # Navigation bar + mobile hamburger
│   │   ├── sections.css      # Hero, expertise, contact section styles
│   │   └── utilities.css     # Glow effects, glassmorphism, animations
│   └── modules/
│       ├── scroll-spy.js     # IntersectionObserver-based active nav
│       └── nav-toggle.js     # Mobile hamburger menu toggle
└── tests/                    # Test files (if validation enabled)
```

### Pattern 1: CSS Custom Properties Token System
**What:** Define all colors, spacing, and typography as CSS variables on `:root`
**When to use:** Always -- this is the foundation for the entire visual theme
**Example:**
```css
/* Source: MDN CSS custom properties + dark theme best practices */
:root {
  /* Background layers */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-surface: #1a1a2e;
  --bg-elevated: #252540;

  /* Text */
  --text-primary: #e0e0e8;
  --text-secondary: #8888a0;
  --text-accent: #ffffff;

  /* Accent / Neon */
  --accent-cyan: #00f0ff;
  --accent-purple: #8b5cf6;
  --accent-pink: #ff00ff;

  /* Glow effects */
  --glow-cyan: 0 0 10px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1);
  --glow-purple: 0 0 10px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1);

  /* Spacing scale */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;

  /* Typography */
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Space Grotesk', var(--font-body);
  --text-sm: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.35vw, 1.125rem);
  --text-lg: clamp(1.25rem, 1rem + 0.75vw, 1.75rem);
  --text-xl: clamp(1.75rem, 1.2rem + 1.5vw, 2.5rem);
  --text-2xl: clamp(2.25rem, 1.5rem + 2.5vw, 4rem);

  /* Layout */
  --nav-height: 64px;
  --content-max-width: 1200px;
}
```

### Pattern 2: Smooth Scroll with Fixed Header Offset
**What:** Native CSS smooth scrolling combined with scroll-margin-top to prevent sections from hiding behind the fixed nav
**When to use:** All anchor link navigation
**Example:**
```css
/* Source: MDN scroll-behavior, CSS-Tricks scroll-margin-top */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

section[id] {
  scroll-margin-top: calc(var(--nav-height) + var(--space-sm));
}
```

### Pattern 3: IntersectionObserver Scroll Spy
**What:** Highlights the active nav link based on which section is currently visible
**When to use:** Single-page navigation with multiple sections
**Example:**
```javascript
// Source: MDN IntersectionObserver API
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
```

### Pattern 4: Mobile-First Responsive Layout
**What:** Start with mobile styles, add complexity at breakpoints
**When to use:** All layout CSS
**Example:**
```css
/* Source: Modern CSS best practices */
/* Mobile-first base (375px+) */
.section-content {
  padding: var(--space-md) var(--space-sm);
  max-width: var(--content-max-width);
  margin: 0 auto;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .section-content {
    padding: var(--space-lg) var(--space-md);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .section-content {
    padding: var(--space-xl) var(--space-lg);
  }
}
```

### Pattern 5: Mobile Hamburger Navigation
**What:** Collapsible navigation menu for mobile viewports
**When to use:** Below 768px viewport width
**Example:**
```html
<!-- Accessible hamburger toggle -->
<nav class="main-nav" aria-label="Main navigation">
  <a href="#" class="nav-logo">Elmar</a>
  <button
    class="nav-toggle"
    aria-expanded="false"
    aria-controls="nav-menu"
    aria-label="Toggle navigation"
  >
    <span class="hamburger"></span>
  </button>
  <ul id="nav-menu" class="nav-menu" role="list">
    <li><a href="#hero">Home</a></li>
    <li><a href="#expertise">Expertise</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```
```javascript
// Source: Accessible hamburger pattern
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
    menu.classList.toggle('is-open');
  });

  // Close menu when a link is clicked (smooth scroll to section)
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  });
}
```

### Anti-Patterns to Avoid
- **Using JavaScript for smooth scroll instead of CSS:** `scroll-behavior: smooth` is native, performant, and respects `prefers-reduced-motion` -- do not use jQuery or custom JS scroll animations
- **Hardcoding colors instead of using CSS variables:** Makes theme changes and future dark/light toggle impossible; always use tokens
- **Using px for font sizes:** Use `rem` with `clamp()` for fluid, accessible typography
- **Desktop-first responsive design:** Mobile-first is more maintainable; override UP, not DOWN
- **Inline styles in HTML:** All styling goes in CSS files; keep HTML semantic and clean

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scrolling | Custom JS scroll animation | CSS `scroll-behavior: smooth` | Native, performant, accessibility-aware, 2 lines of CSS |
| CSS reset | Custom reset stylesheet | Modern CSS reset (e.g., Andy Bell's modern reset) | Covers edge cases across browsers you won't think of |
| Fluid typography | Manual media queries per font size | CSS `clamp()` function | Single declaration handles all viewport sizes |
| Fixed header offset | JS scroll offset calculations | CSS `scroll-margin-top` | Zero JS, works with native smooth scroll |

**Key insight:** Modern CSS (2025+) has native solutions for smooth scrolling, scroll offsets, fluid typography, and responsive layouts. JavaScript should only handle interactivity (scroll spy, nav toggle), not visual effects that CSS handles natively.

## Common Pitfalls

### Pitfall 1: Neon Glow Performance
**What goes wrong:** Heavy box-shadow and text-shadow glow effects cause jank on scroll, especially on mobile
**Why it happens:** box-shadow triggers paint operations; many glowing elements = many repaints
**How to avoid:** Limit glow effects to key elements (headings, accent borders, nav active state). Use `will-change: transform` sparingly on animated elements. Test on throttled CPU in DevTools.
**Warning signs:** Scroll stuttering on mobile, high paint times in Performance panel

### Pitfall 2: Fixed Nav Covering Content on Anchor Scroll
**What goes wrong:** Clicking a nav link scrolls to the section but the first 64px is hidden behind the fixed navbar
**Why it happens:** Anchor scroll targets the top of the element, not accounting for fixed header height
**How to avoid:** Use `scroll-margin-top: calc(var(--nav-height) + 1rem)` on all `section[id]` elements
**Warning signs:** Section headings not visible after clicking nav links

### Pitfall 3: IntersectionObserver rootMargin Misconfiguration
**What goes wrong:** Multiple nav items highlight simultaneously, or the wrong item highlights
**Why it happens:** rootMargin values create an observation zone that's too large or positioned incorrectly
**How to avoid:** Use `rootMargin: '-20% 0px -80% 0px'` which creates a narrow detection band near the top of the viewport. Test with sections of varying heights.
**Warning signs:** Active nav state jumps erratically while scrolling

### Pitfall 4: Dark Theme Contrast Failures
**What goes wrong:** Text is unreadable on dark backgrounds; interactive elements invisible
**Why it happens:** Insufficient contrast ratio between text and background colors
**How to avoid:** Ensure minimum 4.5:1 contrast ratio for body text (WCAG AA). Use #e0e0e8 on #0a0a0f (ratio ~14:1). Test with browser DevTools contrast checker.
**Warning signs:** Text feels "dim" or hard to read, especially secondary text

### Pitfall 5: Mobile Viewport Not Set
**What goes wrong:** Page appears zoomed out on mobile, not responsive
**Why it happens:** Missing viewport meta tag in HTML
**How to avoid:** Always include `<meta name="viewport" content="width=device-width, initial-scale=1.0">` in `<head>`
**Warning signs:** Page looks like a miniature desktop version on phone

### Pitfall 6: Forgetting prefers-reduced-motion
**What goes wrong:** Users who have system-level reduced motion enabled still see smooth scrolling and animations, which can cause nausea/discomfort
**Why it happens:** Developer doesn't wrap motion effects in the appropriate media query
**How to avoid:** Wrap `scroll-behavior: smooth` and all CSS animations in `@media (prefers-reduced-motion: no-preference)`
**Warning signs:** Accessibility audit failure

## Code Examples

Verified patterns from official sources:

### HTML Document Structure
```html
<!-- Source: Semantic HTML5 best practices -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Elmar | Data & AI Training</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
<body>
  <header class="site-header">
    <nav class="main-nav" aria-label="Main navigation">
      <!-- Nav content -->
    </nav>
  </header>

  <main>
    <section id="hero" class="section section--hero">
      <div class="section-content">
        <h1>Elmar</h1>
        <p class="hero-tagline">Data & AI Training</p>
      </div>
    </section>

    <section id="expertise" class="section section--expertise">
      <div class="section-content">
        <h2>Expertise</h2>
        <!-- Placeholder for Phase 2 interactive visualization -->
      </div>
    </section>

    <section id="contact" class="section section--contact">
      <div class="section-content">
        <h2>Contact</h2>
        <!-- Placeholder for Phase 3 contact form -->
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Elmar. All rights reserved.</p>
  </footer>

  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### Glassmorphism Effect for Nav/Cards
```css
/* Source: MDN backdrop-filter, glassmorphism best practices */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 100;
  background: rgba(10, 10, 15, 0.8);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
```

### Full-Viewport Hero Section
```css
/* Source: Modern landing page patterns */
.section--hero {
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.section--hero h1 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--text-accent);
  text-shadow: var(--glow-cyan);
  letter-spacing: 0.05em;
}
```

### Neon Accent Border
```css
/* Source: CSS neon effect patterns */
.section--expertise::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--accent-cyan),
    transparent
  );
  box-shadow: var(--glow-cyan);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| jQuery smooth scroll | CSS `scroll-behavior: smooth` | ~2020, now 95%+ support | Zero JS needed for basic smooth scrolling |
| Media queries for every font size | CSS `clamp()` fluid typography | ~2021, universal support | One declaration, no breakpoints needed |
| vh units for mobile height | `dvh` (dynamic viewport height) | 2023, all modern browsers | Fixes iOS Safari address bar issue |
| Custom scroll offset JS | CSS `scroll-margin-top` | ~2020, universal support | Declarative, no JS calculations |
| Webpack for frontend builds | Vite | 2020+, dominant by 2023 | 10-100x faster dev server, zero config |
| SASS variables | CSS Custom Properties | Native support since ~2017 | Runtime-changeable, no build step |

**Deprecated/outdated:**
- jQuery for DOM manipulation and scroll effects -- use native JS APIs
- Webpack for new projects -- Vite is the standard
- SASS for variables/nesting -- CSS has native custom properties and nesting (2024+)
- `100vh` for full-height mobile sections -- use `100dvh` to avoid iOS address bar issues

## Open Questions

1. **Font selection**
   - What we know: 'Inter' and 'Space Grotesk' are recommended for futuristic/tech themes; both are free Google Fonts
   - What's unclear: Whether Elmar has brand fonts or preferences
   - Recommendation: Use Inter (body) and Space Grotesk (display) as defaults; easy to swap via CSS variables

2. **Exact section content for placeholders**
   - What we know: Three sections needed (hero, expertise, contact) with placeholder content
   - What's unclear: Whether placeholder text should be lorem ipsum or approximate real content
   - Recommendation: Use meaningful placeholder text (e.g., "Data & AI Training" for hero tagline) rather than lorem ipsum, since this builds toward real content

3. **Logo/brand assets**
   - What we know: No logo files exist in the project
   - What's unclear: Whether Elmar has a logo
   - Recommendation: Use text-based logo ("Elmar") with the display font and glow effect; easy to replace with image later

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest (latest, paired with Vite) |
| Config file | none -- see Wave 0 |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VIZ-02 | Dark theme CSS variables are defined and applied | unit | `npx vitest run tests/theme.test.js -t "dark theme"` | -- Wave 0 |
| VIZ-03 | Smooth scroll behavior is set; scroll-margin-top applied to sections | unit | `npx vitest run tests/navigation.test.js -t "smooth scroll"` | -- Wave 0 |
| VIZ-03 | Scroll spy highlights correct nav link | unit | `npx vitest run tests/navigation.test.js -t "scroll spy"` | -- Wave 0 |
| VIZ-04 | Responsive breakpoints exist in CSS; layout adapts at 375/768/1024/1440 | manual-only | Manual browser resize test | N/A (visual verification) |
| VIZ-04 | Viewport meta tag present | unit | `npx vitest run tests/layout.test.js -t "viewport"` | -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `vitest` dev dependency -- `npm install -D vitest`
- [ ] `tests/theme.test.js` -- covers VIZ-02 (CSS custom properties defined)
- [ ] `tests/navigation.test.js` -- covers VIZ-03 (scroll behavior, scroll spy logic)
- [ ] `tests/layout.test.js` -- covers VIZ-04 (viewport meta, section structure)

## Sources

### Primary (HIGH confidence)
- [MDN scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior) - CSS smooth scroll property spec and browser support
- [MDN IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Scroll spy implementation reference
- [MDN CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - Token system implementation
- [MDN CSS clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp) - Fluid typography function
- [Vite Official Getting Started](https://vite.dev/guide/) - Vite v8 scaffolding and vanilla JS template
- [CSS-Tricks: scroll-margin-top](https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/) - Fixed header anchor offset solution

### Secondary (MEDIUM confidence)
- [Smashing Magazine: Modern Fluid Typography Using CSS Clamp](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) - Fluid type scale methodology
- [Josh Comeau: backdrop-filter](https://www.joshwcomeau.com/css/backdrop-filter/) - Glassmorphism implementation deep-dive
- [Christian Tietze: Accessible CSS Hamburger Menu (2025)](https://christiantietze.de/posts/2025/01/responsive-scalable-hamburger-menu-accessible-css/) - Accessible responsive nav pattern

### Tertiary (LOW confidence)
- [Medium: Dark Glassmorphism in 2026](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f) - Trend validation only (design opinions)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Vite vanilla JS is well-documented, project constraints clearly point to it, official docs verified
- Architecture: HIGH - All patterns use native CSS/JS APIs with 95%+ browser support, verified via MDN
- Pitfalls: HIGH - Common issues well-documented across multiple authoritative sources
- Validation: MEDIUM - Vitest is standard for Vite projects but testing pure CSS/HTML structure is inherently limited; manual visual testing required for responsive layout

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable domain, no fast-moving dependencies)
