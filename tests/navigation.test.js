import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const indexHTML = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');

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

describe('scroll spy', () => {
  it('placeholder: scroll spy module will be tested after Plan 02', () => {
    // Scroll spy JS logic is created in Plan 02
    // This test confirms the HTML contract exists for scroll spy to work
    const sectionIds = indexHTML.match(/section\s+id="\w+"/g);
    expect(sectionIds).not.toBeNull();
    expect(sectionIds.length).toBeGreaterThanOrEqual(2);
  });
});
