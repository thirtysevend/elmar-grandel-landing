import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { initScrollSpy } from '../src/modules/scroll-spy.js';
import { initNavToggle } from '../src/modules/nav-toggle.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const indexHTML = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
const layoutCSS = readFileSync(resolve(__dirname, '../src/styles/layout.css'), 'utf-8');

describe('smooth scroll', () => {
  it('has nav links pointing to section anchors', () => {
    expect(indexHTML).toContain('href="#expertise"');
    expect(indexHTML).toContain('href="#contact"');
  });

  it('has navigation with aria-label', () => {
    expect(indexHTML).toContain('aria-label="Main navigation"');
  });
});

describe('mobile nav', () => {
  it('has hamburger toggle button', () => {
    expect(indexHTML).toContain('class="nav-toggle"');
  });

  it('toggle has aria-expanded attribute', () => {
    expect(indexHTML).toContain('aria-expanded=');
  });

  it('toggle has aria-controls linking to menu', () => {
    expect(indexHTML).toContain('aria-controls="nav-menu"');
    expect(indexHTML).toContain('id="nav-menu"');
  });
});

describe('scroll spy module', () => {
  it('exports initScrollSpy as a function', () => {
    expect(typeof initScrollSpy).toBe('function');
  });
});

describe('scroll spy HTML contract', () => {
  it('has sections with id attributes for observer to target', () => {
    const sectionIds = indexHTML.match(/section\s+id="\w+"/g);
    expect(sectionIds).not.toBeNull();
    expect(sectionIds.length).toBeGreaterThanOrEqual(2);
  });
});

describe('nav toggle module', () => {
  it('exports initNavToggle as a function', () => {
    expect(typeof initNavToggle).toBe('function');
  });
});

describe('smooth scroll CSS', () => {
  it('sets scroll-behavior smooth', () => {
    expect(layoutCSS).toContain('scroll-behavior: smooth');
  });

  it('respects prefers-reduced-motion', () => {
    expect(layoutCSS).toContain('prefers-reduced-motion');
  });

  it('sets scroll-margin-top on sections', () => {
    expect(layoutCSS).toContain('scroll-margin-top');
  });
});
