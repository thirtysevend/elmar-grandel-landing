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

document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initNavToggle();
});
