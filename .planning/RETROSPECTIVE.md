# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — MVP

**Shipped:** 2026-03-18
**Phases:** 3 | **Plans:** 2 (formal) + direct implementation | **Commits:** 36

### What Was Built
- Premium landing page with 5 switchable themes
- 3D Three.js particle network with mouse interaction
- Full career timeline and expertise cards
- Contact form with validation
- Bilingual DE/EN support
- Deployed to Netlify

### What Worked
- Frontend-design skill produced much better visual output than GSD executor plans
- Direct implementation was faster than formal plan→execute→verify for a single-page site
- Research agent found real Elmar data (LinkedIn, career, conferences) quickly
- Theme system via CSS variables made 5 themes achievable with one codebase
- 2026 animation research produced specific, actionable values (not generic advice)

### What Was Inefficient
- Initial dark theme was rejected — should have asked about color preference earlier
- GSD formal workflow (plan→execute→verify) was heavyweight for a creative landing page
- Photo loading issue (opacity:0 CSS bug) took multiple debug rounds
- 3D particles were invisible for two deploys (missing hero-bg div, then wrong opacity)
- Multiple deploy cycles to get animations right

### Patterns Established
- Always ask about light vs dark preference upfront for visual projects
- Use frontend-design skill for creative work, GSD for structured engineering
- Adaptive particle opacity per theme brightness
- Version history chooser with Netlify deploy URLs for client comparison
- blur-fade-in (blur 8px + translateY 20px) as default entrance animation

### Key Lessons
1. Creative/visual projects benefit more from iterative direct building than formal planning
2. CSS `img[loading]` selector matches `loading="eager"` too — use `img[loading="lazy"]` specifically
3. Three.js particle visibility needs to be tested per theme — light backgrounds wash out particles
4. Client feedback loops (theme switching, version history) are more valuable than formal verification

### Cost Observations
- Model mix: ~70% opus (planning + execution), ~30% sonnet (verification + research agents)
- Single session, ~4 hours total
- Notable: Most value came from direct implementation, not GSD orchestration

---

## Cross-Milestone Trends

*Updated after each milestone.*

| Metric | v1.0 |
|--------|------|
| Phases | 3 |
| Commits | 36 |
| LOC | 2,604 |
| Days | 1 |
| Deploys | ~8 |
