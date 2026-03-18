/**
 * Interactive expertise visualization — animated skill radar/constellation
 * Replaces static cards on hover/click interaction
 */
export function initExpertiseViz() {
  const cards = document.querySelectorAll('.expertise-card');
  if (!cards.length) return;

  // Add animated progress bars to each card
  const skills = [
    { name: 'Data Strategy', level: 95 },
    { name: 'AI & Machine Learning', level: 88 },
    { name: 'Data Governance', level: 92 },
    { name: 'Analytics Translation', level: 90 },
  ];

  cards.forEach((card, i) => {
    if (!skills[i]) return;

    const bar = document.createElement('div');
    bar.className = 'skill-bar';
    bar.innerHTML = `
      <div class="skill-bar-track">
        <div class="skill-bar-fill" style="--target-width: ${skills[i].level}%"></div>
      </div>
      <span class="skill-bar-value">${skills[i].level}%</span>
    `;
    card.appendChild(bar);

    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = card.querySelector('.skill-bar-fill');
          if (fill) {
            setTimeout(() => {
              fill.style.width = fill.style.getPropertyValue('--target-width');
            }, 200 + i * 100);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(card);
  });
}
