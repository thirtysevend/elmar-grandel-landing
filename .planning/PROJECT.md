# Elmar's Data & AI Training Landing Page

## What This Is

A premium, visually stunning single-page landing site for Elmar E. Grandel, a senior data & AI consultant and trainer with 20+ years of experience. Features 5 switchable design themes, a 3D particle network background, interactive expertise cards, a full career timeline, contact form, and bilingual DE/EN support. Deployed at https://elmar-grandel.netlify.app.

## Core Value

Visitors immediately perceive Elmar as a cutting-edge AI expert through the page's visual wow factor and clear presentation of his training offerings.

## Requirements

### Validated

- ✓ Hero section with 3D particle network animation — v1.0
- ✓ Elmar's real photo, bio, credentials, career timeline — v1.0
- ✓ 4 expertise cards with interactive hover glow — v1.0
- ✓ Contact form with validation and feedback — v1.0
- ✓ 5 switchable themes (Editorial, Midnight, Nordic, Brutalist, Aurora) — v1.0
- ✓ Mouse-reactive 3D particles spanning full page — v1.0
- ✓ Bilingual DE/EN with language toggle — v1.0
- ✓ Fully responsive across mobile, tablet, desktop — v1.0
- ✓ Smooth scroll navigation with scroll spy — v1.0
- ✓ 2026 blur-fade-in animations — v1.0

### Active

(None — next milestone TBD)

### Out of Scope

- Course booking/payment system — contact-driven flow
- Blog or resource library — focused landing page
- CMS or admin panel — static content
- Backend/database — pure frontend
- Testimonials section — future iteration

## Context

- Shipped v1.0 with 2,604 LOC (JS + CSS + HTML)
- Tech stack: Vite 8, vanilla JS, Three.js, CSS custom properties
- Deployed to Netlify (auto-build from dist/)
- Elmar's real professional data sourced from LinkedIn research
- 36 git commits, built in one day

## Constraints

- **Hosting**: Netlify (free tier)
- **Single page**: One landing page
- **No backend**: Pure frontend, form simulates submission
- **Performance**: Three.js particles must run smoothly

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Light editorial theme as default | Dark theme rejected — lighter feels more premium for B2B consultant | ✓ Good |
| 5 switchable themes | Client can preview and choose preferred style | ✓ Good |
| Vite + vanilla JS (no framework) | Simple landing page doesn't need React/Vue overhead | ✓ Good |
| Three.js for 3D particles | Best 3D library, widely supported, theme-adaptive | ✓ Good |
| 2026 blur-fade-in animations | Research-backed: blur 8px + translateY 20px is current gold standard | ✓ Good |
| Bilingual via data-i18n attributes | Simple, no library needed, works with any content | ✓ Good |
| Adaptive particle opacity | 15% on light themes, 50% on dark — prevents visual competition | ✓ Good |

---
*Last updated: 2026-03-18 after v1.0 milestone*
