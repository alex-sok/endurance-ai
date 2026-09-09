import { gsap } from 'gsap';
import { ACESFilmicToneMapping, DirectionalLight, HemisphereLight, Mesh, MeshPhysicalMaterial, OrthographicCamera, PMREMGenerator, Scene, SphereGeometry, SRGBColorSpace, WebGLRenderer } from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { bubbleTiming, SEQUENCE_DURATION, ticketTiming } from './brain-flow-timeline';

export type BrainScene = { seek(time: number): void; dispose(): void };

export function createBrainScene(root: HTMLElement): BrainScene {
  const stage = root.querySelector<HTMLElement>('[data-flow-stage]')!;
  const canvasHost = root.querySelector<HTMLElement>('[data-blob-canvas]')!;
  const fallback = root.querySelector<HTMLElement>('[data-blob-fallback]')!;
  const label = root.querySelector<HTMLElement>('[data-blob-label]')!;
  const tickets = Array.from(root.querySelectorAll<HTMLElement>('[data-ticket]'));
  const bubbles = Array.from(root.querySelectorAll<HTMLElement>('[data-bubble]'));
  const motion = { growth: 1, wobble: .018, squash: 0 };
  let time = SEQUENCE_DURATION;
  let renderer: WebGLRenderer | null = null;
  let context: gsap.Context | undefined;
  let timeline: gsap.core.Timeline;
  let contextLost = false;

  // The complete HTML/CSS story remains available without WebGL.
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setClearColor(0x000000, 0);
    canvasHost.appendChild(renderer.domElement);
  } catch {
    root.dataset.webgl = 'unavailable';
  }

  const world = new Scene();
  const camera = new OrthographicCamera(-1.4, 1.4, 1.4, -1.4, .1, 20);
  camera.position.set(0, 0, 6);
  const geometry = new SphereGeometry(1, 56, 40);
  const original = Float32Array.from(geometry.attributes.position.array);
  const material = new MeshPhysicalMaterial({
    color: 0x91c2ee, roughness: .29, metalness: .025,
    clearcoat: 1, clearcoatRoughness: .2,
    iridescence: .12, iridescenceIOR: 1.22, envMapIntensity: .7,
  });
  const blob = new Mesh(geometry, material);
  world.add(blob);
  world.add(new HemisphereLight(0xf4faff, 0xa9c3de, 2.1));
  const key = new DirectionalLight(0xffffff, 3.2);
  key.position.set(-3, 4, 5);
  const warm = new DirectionalLight(0xffe5c8, 1.4);
  warm.position.set(4, -1, 3);
  world.add(key, warm);
  const room = new RoomEnvironment();
  const pmrem = renderer ? new PMREMGenerator(renderer) : null;
  const environment = pmrem?.fromScene(room, .04);
  if (environment) world.environment = environment.texture;
  room.dispose();
  pmrem?.dispose();

  function draw() {
    const squash = motion.squash;
    fallback.style.transform = 'scale(' + motion.growth * (1 + squash) + ',' + motion.growth * (1 - squash) + ')';
    if (!renderer || contextLost) return;
    const position = geometry.attributes.position;
    const seconds = time / 1000;
    for (let i = 0; i < position.count; i++) {
      const x = original[i * 3], y = original[i * 3 + 1], z = original[i * 3 + 2];
      const ripple = Math.sin(x * 3.2 + seconds * 1.8) * Math.sin(y * 3.1 - seconds * 1.3)
        + .45 * Math.sin(z * 3.5 + seconds * 1.2);
      const radius = 1 + motion.wobble * ripple;
      position.setXYZ(i, x * radius, y * radius, z * radius);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
    blob.scale.set(motion.growth * (1 + squash), motion.growth * (1 - squash), motion.growth);
    blob.rotation.z = Math.sin(seconds * 1.1) * .045;
    renderer.render(world, camera);
  }

  function buildTimeline() {
    const compact = getComputedStyle(stage).getPropertyValue('--compact').trim() === '1';
    const centerY = compact ? 42 : 50;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const ticketWidth = compact ? Math.min(rem * 10.5, stage.clientWidth * .42)
      : rem * (window.matchMedia('(max-width: 1100px)').matches ? 9.5 : 10.5);
    context?.revert();
    context = gsap.context(() => {
      timeline = gsap.timeline({ paused: true });
      timeline.to({}, { duration: SEQUENCE_DURATION / 1000 }, 0);
      timeline.set(motion, { growth: .16, wobble: .06, squash: 0 }, 0);
      timeline.to(motion, { growth: 1, duration: 6.4, ease: 'power1.inOut' }, 1.1);
      timeline.to(motion, { wobble: .018, duration: 3.5, ease: 'sine.out' }, 7.5);
      timeline.fromTo(label, { opacity: 0, y: 7 }, { opacity: 1, y: 0, duration: .9, ease: 'power2.out' }, 6.1);

      tickets.forEach((node, index) => {
        const x = compact ? (index % 2 ? 75 : 25) : Number(node.dataset.x);
        const y = compact ? [14, 14, 32, 32, 68, 68, 86, 86][index] : Number(node.dataset.y);
        const ink = node.querySelector<HTMLElement>('[data-ticket-ink]')!;
        const begin = ticketTiming(index).delay / 1000;
        timeline.set(node, { left: x + '%', top: y + '%', width: ticketWidth, height: rem * 4.4, xPercent: -50, yPercent: -50, x: 0, y: 0, rotation: Number(node.dataset.turn), scale: 1, opacity: 1, borderRadius: 10 }, 0);
        timeline.set(ink, { opacity: 1, scale: 1 }, 0);
        timeline.to(node, { left: x * .9 + 5 + '%', top: y * .9 + centerY * .1 - 3 + '%', rotation: 0, scale: 1.03, duration: .45, ease: 'sine.inOut' }, begin);
        timeline.to(node, { left: '50%', top: centerY + '%', width: 44, height: 44, borderRadius: '50%', scale: 1, duration: 1.55, ease: 'power3.inOut' }, begin + .45);
        timeline.to(node, { opacity: 0, scale: .35, duration: .25, ease: 'power2.in' }, begin + 2);
        timeline.to(ink, { opacity: 0, scale: .7, duration: .55, ease: 'power1.out' }, begin + .35);
      });

      bubbles.forEach((node, index) => {
        const x = compact ? 50 : Number(node.dataset.x);
        const y = compact ? Number(node.dataset.mobileY) : Number(node.dataset.y);
        const timing = bubbleTiming(index);
        const begin = timing.delay / 1000;
        timeline.fromTo(node,
          { left: '50%', top: centerY + '%', xPercent: -50, yPercent: -50, scale: .15, opacity: 0 },
          { left: x + '%', top: y + '%', scale: 1, opacity: 1, duration: timing.duration / 1000, ease: 'back.out(1.25)' }, begin);
        timeline.to(motion, { squash: .11, duration: .18, ease: 'power2.out' }, begin);
        timeline.to(motion, { squash: 0, duration: .7, ease: 'elastic.out(1, .4)' }, begin + .18);
      });
      timeline.time(time / 1000, true);
    }, root);
    if (renderer) {
      renderer.setSize(Math.max(1, canvasHost.clientWidth), Math.max(1, canvasHost.clientHeight), false);
    }
    draw();
  }

  function onLost(event: Event) {
    event.preventDefault();
    contextLost = true;
    root.dataset.webgl = 'unavailable';
  }
  function onRestored() {
    contextLost = false;
    draw();
    root.dataset.webgl = 'ready';
  }
  renderer?.domElement.addEventListener('webglcontextlost', onLost);
  renderer?.domElement.addEventListener('webglcontextrestored', onRestored);
  buildTimeline();
  if (renderer) root.dataset.webgl = 'ready';
  const resize = new ResizeObserver(buildTimeline);
  resize.observe(stage);

  return {
    seek(milliseconds) {
      time = Math.max(0, Math.min(milliseconds, SEQUENCE_DURATION));
      timeline.time(time / 1000, true);
      draw();
    },
    dispose() {
      resize.disconnect();
      context?.revert();
      renderer?.domElement.removeEventListener('webglcontextlost', onLost);
      renderer?.domElement.removeEventListener('webglcontextrestored', onRestored);
      geometry.dispose();
      material.dispose();
      environment?.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
      delete root.dataset.webgl;
      fallback.style.removeProperty('transform');
    },
  };
}
