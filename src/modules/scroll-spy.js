/**
 * Scroll Spy — highlights the active nav link based on which section
 * is currently in the viewport using IntersectionObserver.
 */
export function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

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
      // Narrow detection band near top of viewport:
      // ignore top 20% and bottom 80%, so only the section
      // occupying the 20-80% zone triggers
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
