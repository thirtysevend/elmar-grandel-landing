import * as THREE from 'three';

export function initHeroParticles() {
  const container = document.querySelector('.hero-bg');
  if (!container) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 100);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Read theme colors
  const style = getComputedStyle(document.documentElement);
  const getColor = (v) => {
    const c = style.getPropertyValue(v).trim();
    return c || '#4f7cff';
  };

  // Particle network — nodes + connections
  const nodeCount = 80;
  const positions = [];
  const velocities = [];
  const spread = 35;

  for (let i = 0; i < nodeCount; i++) {
    positions.push(
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread * 0.7,
      (Math.random() - 0.5) * 15
    );
    velocities.push(
      (Math.random() - 0.5) * 0.008,
      (Math.random() - 0.5) * 0.006,
      (Math.random() - 0.5) * 0.004
    );
  }

  // Node dots
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const nodeMat = new THREE.PointsMaterial({
    size: 0.22,
    color: new THREE.Color(getColor('--accent-primary')),
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });
  const nodes = new THREE.Points(nodeGeo, nodeMat);
  scene.add(nodes);

  // Connection lines
  const lineGeo = new THREE.BufferGeometry();
  const maxLines = nodeCount * 6;
  const linePositions = new Float32Array(maxLines * 6);
  const lineColors = new Float32Array(maxLines * 6);
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

  const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  // Larger accent dots (data nodes)
  const accentCount = 12;
  const accentGeo = new THREE.BufferGeometry();
  const accentPos = [];
  const accentVel = [];
  for (let i = 0; i < accentCount; i++) {
    accentPos.push(
      (Math.random() - 0.5) * spread * 0.8,
      (Math.random() - 0.5) * spread * 0.5,
      (Math.random() - 0.5) * 10
    );
    accentVel.push(
      (Math.random() - 0.5) * 0.005,
      (Math.random() - 0.5) * 0.004,
      (Math.random() - 0.5) * 0.003
    );
  }
  accentGeo.setAttribute('position', new THREE.Float32BufferAttribute(accentPos, 3));

  const accentMat = new THREE.PointsMaterial({
    size: 0.5,
    color: new THREE.Color(getColor('--accent-secondary')),
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
  });
  const accents = new THREE.Points(accentGeo, accentMat);
  scene.add(accents);

  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Connection distance
  const connectionDistance = 8;
  const primary = new THREE.Color(getColor('--accent-primary'));
  const secondary = new THREE.Color(getColor('--accent-secondary'));

  // Animation
  let frame;
  const animate = () => {
    frame = requestAnimationFrame(animate);

    const posArr = nodeGeo.attributes.position.array;
    const accentArr = accentGeo.attributes.position.array;

    // Move nodes
    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      posArr[i3] += velocities[i3];
      posArr[i3 + 1] += velocities[i3 + 1];
      posArr[i3 + 2] += velocities[i3 + 2];

      // Bounce
      if (Math.abs(posArr[i3]) > spread / 2) velocities[i3] *= -1;
      if (Math.abs(posArr[i3 + 1]) > spread * 0.35) velocities[i3 + 1] *= -1;
      if (Math.abs(posArr[i3 + 2]) > 7.5) velocities[i3 + 2] *= -1;
    }
    nodeGeo.attributes.position.needsUpdate = true;

    // Move accent dots
    for (let i = 0; i < accentCount; i++) {
      const i3 = i * 3;
      accentArr[i3] += accentVel[i3];
      accentArr[i3 + 1] += accentVel[i3 + 1];
      accentArr[i3 + 2] += accentVel[i3 + 2];
      if (Math.abs(accentArr[i3]) > spread * 0.4) accentVel[i3] *= -1;
      if (Math.abs(accentArr[i3 + 1]) > spread * 0.25) accentVel[i3 + 1] *= -1;
      if (Math.abs(accentArr[i3 + 2]) > 5) accentVel[i3 + 2] *= -1;
    }
    accentGeo.attributes.position.needsUpdate = true;

    // Update connections
    let lineIdx = 0;
    const lp = lineGeo.attributes.position.array;
    const lc = lineGeo.attributes.color.array;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (lineIdx >= maxLines) break;
        const i3 = i * 3, j3 = j * 3;
        const dx = posArr[i3] - posArr[j3];
        const dy = posArr[i3 + 1] - posArr[j3 + 1];
        const dz = posArr[i3 + 2] - posArr[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          const alpha = 1 - dist / connectionDistance;
          const li = lineIdx * 6;
          lp[li] = posArr[i3]; lp[li + 1] = posArr[i3 + 1]; lp[li + 2] = posArr[i3 + 2];
          lp[li + 3] = posArr[j3]; lp[li + 4] = posArr[j3 + 1]; lp[li + 5] = posArr[j3 + 2];

          const mix = alpha * 0.6;
          lc[li] = primary.r * mix; lc[li + 1] = primary.g * mix; lc[li + 2] = primary.b * mix;
          lc[li + 3] = secondary.r * mix; lc[li + 4] = secondary.g * mix; lc[li + 5] = secondary.b * mix;
          lineIdx++;
        }
      }
    }
    // Clear unused lines
    for (let i = lineIdx * 6; i < lp.length; i++) { lp[i] = 0; lc[i] = 0; }
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx * 2);

    // Camera follows mouse gently
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };
  animate();

  // Resize
  const onResize = () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  };
  window.addEventListener('resize', onResize, { passive: true });

  // Theme change — update colors
  const observer = new MutationObserver(() => {
    const s = getComputedStyle(document.documentElement);
    const p = new THREE.Color(s.getPropertyValue('--accent-primary').trim() || '#4f7cff');
    const sc = new THREE.Color(s.getPropertyValue('--accent-secondary').trim() || '#ff9f43');
    nodeMat.color = p;
    accentMat.color = sc;
    primary.copy(p);
    secondary.copy(sc);
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    observer.disconnect();
    renderer.dispose();
  };
}
