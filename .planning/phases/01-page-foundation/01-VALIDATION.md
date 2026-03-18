---
phase: 1
slug: page-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-18
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest (latest, paired with Vite) |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 0 | VIZ-02 | unit | `npx vitest run tests/theme.test.js -t "dark theme"` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 0 | VIZ-03 | unit | `npx vitest run tests/navigation.test.js -t "smooth scroll"` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 0 | VIZ-03 | unit | `npx vitest run tests/navigation.test.js -t "scroll spy"` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 0 | VIZ-04 | unit | `npx vitest run tests/layout.test.js -t "viewport"` | ❌ W0 | ⬜ pending |
| 1-01-05 | 01 | 0 | VIZ-04 | manual-only | Manual browser resize test | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest` dev dependency — `npm install -D vitest`
- [ ] `tests/theme.test.js` — stubs for VIZ-02 (CSS custom properties defined)
- [ ] `tests/navigation.test.js` — stubs for VIZ-03 (scroll behavior, scroll spy logic)
- [ ] `tests/layout.test.js` — stubs for VIZ-04 (viewport meta, section structure)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Responsive layout adapts at 375/768/1024/1440px | VIZ-04 | Visual layout verification requires browser | Resize browser to each breakpoint, verify layout adapts correctly |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
