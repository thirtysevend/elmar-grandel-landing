import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const indexHTML = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
const layoutCSS = readFileSync(resolve(__dirname, '../src/styles/layout.css'), 'utf-8');

describe('viewport', () => {
  it('includes viewport meta tag', () => {
    expect(indexHTML).toContain('name="viewport"');
    expect(indexHTML).toContain('width=device-width');
  });
});

describe('section structure', () => {
  it('has hero section with id', () => {
    expect(indexHTML).toContain('id="hero"');
  });

  it('has expertise section with id', () => {
    expect(indexHTML).toContain('id="expertise"');
  });

  it('has contact section with id', () => {
    expect(indexHTML).toContain('id="contact"');
  });

  it('has main element wrapping sections', () => {
    expect(indexHTML).toContain('<main>');
  });
});

describe('responsive breakpoints', () => {
  it('includes tablet breakpoint (768px)', () => {
    expect(layoutCSS).toContain('min-width: 768px');
  });

  it('includes desktop breakpoint (1024px)', () => {
    expect(layoutCSS).toContain('min-width: 1024px');
  });
});
