/**
 * Skill Marquee — infinite scrolling ticker with gradient edge fades
 * Replaces static flex-wrap tags with a smooth, continuous flow
 */
export function initTypewriterTags() {
  const container = document.querySelector('.expertise-tools');
  if (!container) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tags = Array.from(container.querySelectorAll('.tool-tag'));
  if (!tags.length) return;

  // Build marquee structure
  container.innerHTML = '';
  container.classList.add('marquee-wrapper');

  // Create the track with duplicated items for seamless loop
  const track = document.createElement('div');
  track.className = 'marquee-track';

  // Build items twice for seamless loop
  for (let copy = 0; copy < 2; copy++) {
    tags.forEach(tag => {
      const item = document.createElement('span');
      item.className = 'marquee-item';
      item.textContent = tag.textContent;
      track.appendChild(item);

      // Add separator dot between items
      const dot = document.createElement('span');
      dot.className = 'marquee-dot';
      dot.textContent = '·';
      dot.setAttribute('aria-hidden', 'true');
      track.appendChild(dot);
    });
  }

  container.appendChild(track);

  if (prefersReduced) {
    track.style.animation = 'none';
    track.style.justifyContent = 'center';
  }
}
