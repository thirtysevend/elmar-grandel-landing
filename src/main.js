// Styles
import './styles/reset.css';
import './styles/tokens.css';
import './styles/themes.css';
import './styles/layout.css';
import './styles/nav.css';
import './styles/sections.css';
import './styles/utilities.css';

// Modules
import { initScrollSpy } from './modules/scroll-spy.js';
import { initNavToggle } from './modules/nav-toggle.js';
import { initScrollReveal } from './modules/scroll-reveal.js';

function initThemeSwitcher() {
  const buttons = document.querySelectorAll('.theme-btn');
  const root = document.documentElement;

  // Load saved theme
  const saved = localStorage.getItem('elmar-theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
    buttons.forEach(b => b.classList.toggle('active', b.dataset.theme === saved));
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      root.setAttribute('data-theme', theme);
      localStorage.setItem('elmar-theme', theme);
      buttons.forEach(b => b.classList.toggle('active', b === btn));
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initNavToggle();
  initThemeSwitcher();

  // Mark reveal elements
  requestAnimationFrame(() => {
    document.querySelectorAll(
      '.section--expertise .section-label, ' +
      '.section--expertise .section-heading, ' +
      '.section--expertise .section-description, ' +
      '.expertise-card, ' +
      '.tool-tag, ' +
      '.timeline-item, ' +
      '.section--contact .section-label, ' +
      '.section--contact .section-heading, ' +
      '.section--contact .section-description, ' +
      '.contact-card'
    ).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.05}s`;
    });
    initScrollReveal();
  });
});
