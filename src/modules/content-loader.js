/**
 * Content Loader — fetches JSON content files at runtime
 * and updates the page. Works with i18n module for language switching.
 */

let contentCache = {};

async function fetchJSON(path) {
  try {
    const res = await fetch(path + '?t=' + Date.now()); // cache-bust
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

export async function loadContent() {
  const [hero, expertise, contact] = await Promise.all([
    fetchJSON('/content/hero.json'),
    fetchJSON('/content/expertise.json'),
    fetchJSON('/content/contact.json'),
  ]);

  if (hero) contentCache.hero = hero;
  if (expertise) contentCache.expertise = expertise;
  if (contact) contentCache.contact = contact;

  applyContent();
}

export function applyContent() {
  const lang = localStorage.getItem('elmar-lang') || 'en';
  const s = lang === 'de' ? '_de' : '_en';

  const h = contentCache.hero;
  if (h) {
    setI18n('hero.kicker', h['kicker' + s]);
    setI18n('hero.tagline', h['tagline' + s]);
    setI18n('hero.cta1', h['cta1' + s]);
    setI18n('hero.cta2', h['cta2' + s]);
  }

  const e = contentCache.expertise;
  if (e) {
    setI18n('expertise.label', e['label' + s]);
    setI18n('expertise.heading', e['heading' + s]);
    setI18n('expertise.desc', e['desc' + s]);

    if (e.cards) {
      const keys = ['card.strategy', 'card.ai', 'card.governance', 'card.analytics'];
      const descKeys = ['card.strategyDesc', 'card.aiDesc', 'card.governanceDesc', 'card.analyticsDesc'];
      e.cards.forEach((card, i) => {
        if (keys[i]) setI18n(keys[i], card['title' + s]);
        if (descKeys[i]) setI18n(descKeys[i], card['desc' + s]);
      });
    }
  }

  const c = contentCache.contact;
  if (c) {
    setI18n('contact.label', c['label' + s]);
    setI18n('contact.heading', c['heading' + s]);
    setI18n('contact.desc', c['desc' + s]);
  }
}

function setI18n(key, value) {
  if (!value) return;
  document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
    el.textContent = value;
  });
}

// Re-apply content when language changes
export function onLanguageChange() {
  if (Object.keys(contentCache).length > 0) {
    applyContent();
  }
}
