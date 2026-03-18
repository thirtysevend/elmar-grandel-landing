const translations = {
  en: {
    'nav.expertise': 'Expertise',
    'nav.journey': 'Journey',
    'nav.contact': 'Contact',
    'hero.kicker': 'Data Strategist · AI Trainer · Consultant',
    'hero.tagline': 'Transforming organizations through data literacy and AI — with over two decades of hands-on expertise spanning analytics, governance, and machine learning.',
    'hero.cta1': 'Explore Expertise',
    'hero.cta2': 'Get in Touch',
    'expertise.label': 'What I Do',
    'expertise.heading': 'Expertise',
    'expertise.desc': 'From building data strategies for Fortune 500s to training teams on AI/ML — I help organizations become truly data-driven.',
    'card.strategy': 'Data Strategy',
    'card.strategyDesc': 'Advising CDOs and leadership on the path to becoming a data-driven organization. Comprehensive strategies aligned with business objectives.',
    'card.ai': 'AI & Machine Learning',
    'card.aiDesc': 'Hands-on training grounded in real engineering at OSRAM and academic AI research at UConn. From concepts to production.',
    'card.governance': 'Data Governance',
    'card.governanceDesc': 'Frameworks for data quality, compliance, master data management. Created the Data Ambassador training program.',
    'card.analytics': 'Analytics Translation',
    'card.analyticsDesc': 'Bridging data science and business through the Analytics Translator methodology — making insights actionable.',
    'journey.label': 'Career Path',
    'journey.heading': 'The Journey',
    'journey.desc': 'Two decades across the full data & AI spectrum.',
    'timeline.ai': 'AI Research',
    'timeline.bi': 'BI & Customer Intelligence',
    'timeline.advanced': 'Advanced Analytics & AI/ML',
    'timeline.strategy': 'Data Strategy Consulting',
    'timeline.now': 'Independent Trainer & Consultant',
    'timeline.nowPlace': 'Data Strategy · AI Training · Analytics Translation',
    'contact.label': 'Let\'s Connect',
    'contact.heading': 'Contact',
    'contact.desc': 'Ready to elevate your team\'s data and AI capabilities? Send a message or connect directly.',
    'contact.linkedin': 'Connect with Elmar',
    'form.name': 'Name',
    'form.namePh': 'Your name',
    'form.email': 'Email',
    'form.emailPh': 'your@email.com',
    'form.message': 'Message',
    'form.messagePh': 'How can Elmar help?',
    'form.send': 'Send Message',
    'form.success': 'Message sent! Elmar will get back to you soon.',
    'form.error': 'Please fill in all fields correctly.',
    'badge.years': 'Years in',
    'badge.data': 'Data & AI',
    'metric.enterprise': 'Enterprise',
    'metric.b2b': 'B2B Training',
    'metric.since': 'Since 2002',
    'metric.research': 'AI Research',
    'metric.workshops': 'Workshops',
    'metric.courses': '& Courses',
  },
  de: {
    'nav.expertise': 'Kompetenz',
    'nav.journey': 'Werdegang',
    'nav.contact': 'Kontakt',
    'hero.kicker': 'Datenstratege · KI-Trainer · Berater',
    'hero.tagline': 'Organisationen durch Datenkompetenz und KI transformieren — mit über zwei Jahrzehnten praktischer Erfahrung in Analytics, Governance und Machine Learning.',
    'hero.cta1': 'Kompetenz',
    'hero.cta2': 'Kontakt',
    'expertise.label': 'Was ich tue',
    'expertise.heading': 'Kompetenz',
    'expertise.desc': 'Von Datenstrategien für Großunternehmen bis zur KI/ML-Schulung — ich helfe Organisationen, wirklich datengetrieben zu werden.',
    'card.strategy': 'Datenstrategie',
    'card.strategyDesc': 'Beratung von CDOs und Führungskräften auf dem Weg zur datengetriebenen Organisation. Umfassende Strategien, ausgerichtet an Geschäftszielen.',
    'card.ai': 'KI & Machine Learning',
    'card.aiDesc': 'Praxisnahes Training basierend auf echter Ingenieurserfahrung bei OSRAM und akademischer KI-Forschung an der UConn.',
    'card.governance': 'Data Governance',
    'card.governanceDesc': 'Frameworks für Datenqualität, Compliance und Stammdatenmanagement. Schöpfer des Data-Ambassador-Programms.',
    'card.analytics': 'Analytics Translation',
    'card.analyticsDesc': 'Brücke zwischen Data Science und Business durch die Analytics-Translator-Methodik — komplexe Erkenntnisse umsetzbar machen.',
    'journey.label': 'Werdegang',
    'journey.heading': 'Der Weg',
    'journey.desc': 'Zwei Jahrzehnte im gesamten Data- & KI-Spektrum.',
    'timeline.ai': 'KI-Forschung',
    'timeline.bi': 'BI & Customer Intelligence',
    'timeline.advanced': 'Advanced Analytics & KI/ML',
    'timeline.strategy': 'Datenstrategie-Beratung',
    'timeline.now': 'Freiberuflicher Trainer & Berater',
    'timeline.nowPlace': 'Datenstrategie · KI-Training · Analytics Translation',
    'contact.label': 'Kontakt aufnehmen',
    'contact.heading': 'Kontakt',
    'contact.desc': 'Bereit, die Daten- und KI-Kompetenzen Ihres Teams zu stärken? Schreiben Sie mir oder verbinden Sie sich direkt.',
    'contact.linkedin': 'Mit Elmar vernetzen',
    'form.name': 'Name',
    'form.namePh': 'Ihr Name',
    'form.email': 'E-Mail',
    'form.emailPh': 'ihre@email.de',
    'form.message': 'Nachricht',
    'form.messagePh': 'Wie kann Elmar helfen?',
    'form.send': 'Nachricht senden',
    'form.success': 'Nachricht gesendet! Elmar meldet sich bald bei Ihnen.',
    'form.error': 'Bitte füllen Sie alle Felder korrekt aus.',
    'badge.years': 'Jahre in',
    'badge.data': 'Data & KI',
    'metric.enterprise': 'Enterprise',
    'metric.b2b': 'B2B Training',
    'metric.since': 'Seit 2002',
    'metric.research': 'KI-Forschung',
    'metric.workshops': 'Workshops',
    'metric.courses': '& Kurse',
  }
};

import { onLanguageChange } from './content-loader.js';

let currentLang = localStorage.getItem('elmar-lang') || 'en';

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  document.documentElement.lang = lang;
}

export function initI18n() {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;

  // Set initial state
  toggle.textContent = currentLang.toUpperCase();
  applyTranslations(currentLang);

  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'de' : 'en';
    localStorage.setItem('elmar-lang', currentLang);
    toggle.textContent = currentLang.toUpperCase();
    applyTranslations(currentLang);
    onLanguageChange(); // update CMS content too
  });
}
