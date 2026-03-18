// Styles
import './styles/reset.css';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/nav.css';
import './styles/sections.css';
import './styles/utilities.css';

// Modules
import { initScrollSpy } from './modules/scroll-spy.js';
import { initNavToggle } from './modules/nav-toggle.js';
import { initScrollReveal } from './modules/scroll-reveal.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initNavToggle();
  initScrollReveal();

  // Mark reveal elements — add with slight delay so content is visible initially
  requestAnimationFrame(() => {
    document.querySelectorAll(
      '.section--expertise .section-label, ' +
      '.section--expertise .section-heading, ' +
      '.section--expertise .section-description, ' +
      '.expertise-card, ' +
      '.timeline-item, ' +
      '.section--contact .section-label, ' +
      '.section--contact .section-heading, ' +
      '.section--contact .section-description, ' +
      '.contact-card'
    ).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
    // Immediately reveal anything already in viewport
    initScrollReveal();
  });
});
