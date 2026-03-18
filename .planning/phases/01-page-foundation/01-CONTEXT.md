# Phase 1: Page Foundation - Context

**Gathered:** 2026-03-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Dark futuristic single-page layout with responsive design and smooth scroll navigation. Three sections: Hero, Expertise Visualization, Contact. This phase creates the structural shell — 3D animations and interactive visuals come in Phase 2.

</domain>

<decisions>
## Implementation Decisions

### Color & Palette
- Claude's discretion on exact palette — should match a senior data/AI consultant with 20+ years experience
- Avoid startup/gaming aesthetics — this is premium B2B consulting
- Dark base with data-themed accent colors (suggested: deep navy + electric blue + warm gold/amber)
- Glow effects should feel sophisticated, not flashy

### Section Structure
- Three sections in order: Hero → Expertise Viz → Contact
- No separate "About" section — hero handles intro, expertise viz tells the story
- Each section is full-viewport height

### Hero Section
- Display: "Elmar E. Grandel" as primary text
- Subtitle with credentials: "20+ years in data & AI | Consultant | Trainer"
- Background will receive 3D/particle animation in Phase 2 (placeholder for now)

### Navigation
- English labels as default: "Expertise" | "Contact"
- Minimal sticky top bar with subtle glassmorphism effect
- Hamburger menu on mobile

### Typography
- Clean sans-serif matching senior consultant brand
- Professional and readable, not flashy monospace
- Bold headings, clean body text

### Claude's Discretion
- Exact color hex values within the premium data/AI palette direction
- Font family selection (Inter, DM Sans, or similar professional sans-serif)
- Spacing, padding, and section proportions
- Glassmorphism intensity and nav height
- Mobile breakpoint behavior details
- Loading skeleton / placeholder designs

</decisions>

<specifics>
## Specific Ideas

- Elmar E. Grandel is a real person: 20+ year career spanning software development, SAP BI, business analytics, AI/ML engineering, and data strategy consulting
- Previously Senior Business Consultant at foryouandyourcustomers (Munich), Senior Engineer at OSRAM Opto Semiconductors
- AI research background at University of Connecticut (2002-2003)
- Runs analytics-translator.com for training
- Specializations: Data Strategy, Data Governance, Master Data Management, Analytics Translation, Advanced Analytics (AI/ML)
- B2B audience: professionals and companies seeking data/AI upskilling
- The page should convey authority and deep expertise, not a young startup trying to impress
- LinkedIn: https://de.linkedin.com/in/elmar-e-grandel

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project

### Established Patterns
- None — Phase 1 establishes all patterns

### Integration Points
- Vite scaffold (from research: Vite v8 + vanilla JS)
- CSS custom properties token system will be the foundation for all future phases

</code_context>

<deferred>
## Deferred Ideas

- Nav labels switching with language toggle — belongs in Phase 3 (Language)
- Brief "About" bio section between hero and skills — noted for potential v2

</deferred>

---

*Phase: 01-page-foundation*
*Context gathered: 2026-03-18*
