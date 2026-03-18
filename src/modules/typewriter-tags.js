/**
 * Typewriter Tags — tech tags type out one by one with blinking cursor
 */
export function initTypewriterTags() {
  const container = document.querySelector('.expertise-tools');
  if (!container) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const tags = Array.from(container.querySelectorAll('.tool-tag'));
  if (!tags.length) return;

  // Store original text and hide tags
  const tagTexts = tags.map(t => t.textContent.trim());
  tags.forEach(t => { t.textContent = ''; t.style.opacity = '0'; t.style.width = '0'; t.style.padding = '0'; t.style.border = 'none'; t.style.overflow = 'hidden'; });

  // Add cursor element
  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  cursor.textContent = '|';
  container.appendChild(cursor);

  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        observer.unobserve(entry.target);
        typeSequence(tags, tagTexts, cursor);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(container);
}

async function typeSequence(tags, texts, cursor) {
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const text = texts[i];

    // Show the tag container
    tag.style.opacity = '1';
    tag.style.width = 'auto';
    tag.style.padding = '';
    tag.style.border = '';
    tag.style.overflow = '';
    tag.style.transition = 'none';

    // Move cursor after this tag
    tag.parentNode.insertBefore(cursor, tag.nextSibling);

    // Type each character — slow, deliberate, letter by letter
    for (let c = 0; c < text.length; c++) {
      tag.textContent = text.substring(0, c + 1);
      await sleep(80 + Math.random() * 60); // 80-140ms per char — deliberate pace
    }

    // Pause between tags — longer breath
    await sleep(400 + Math.random() * 200);
  }

  // Remove cursor after all done, with a fade
  cursor.style.animation = 'none';
  cursor.style.transition = 'opacity 0.5s ease';
  cursor.style.opacity = '0';
  setTimeout(() => cursor.remove(), 500);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
