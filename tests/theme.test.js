import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tokensCSS = readFileSync(resolve(__dirname, '../src/styles/tokens.css'), 'utf-8');

describe('dark theme', () => {
  it('defines primary background color variable', () => {
    expect(tokensCSS).toContain('--bg-primary');
  });

  it('defines text color variables', () => {
    expect(tokensCSS).toContain('--text-primary');
    expect(tokensCSS).toContain('--text-secondary');
  });

  it('defines accent color variables', () => {
    expect(tokensCSS).toMatch(/--accent-\w+/);
  });

  it('defines glow effect variables', () => {
    expect(tokensCSS).toMatch(/--glow-\w+/);
  });

  it('uses dark background values (low lightness hex)', () => {
    // Background primary should be a very dark color
    expect(tokensCSS).toMatch(/--bg-primary:\s*#[0-1][0-9a-f]/i);
  });
});
