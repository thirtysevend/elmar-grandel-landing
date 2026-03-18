/**
 * Scroll Reveal — triggers staggered reveal animations on elements
 * as they enter the viewport using IntersectionObserver.
 */
export function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    revealElements.forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '50px 0px -20px 0px',
      threshold: 0,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}
