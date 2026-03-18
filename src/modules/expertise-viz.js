/**
 * Interactive expertise cards — animated counters + hover glow
 */
export function initExpertiseViz() {
  const cards = document.querySelectorAll('.expertise-card');
  if (!cards.length) return;

  // Add animated hover glow effect
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
    });
  });
}
