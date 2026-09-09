import { LinearFilter, Mesh, NoToneMapping, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, SRGBColorSpace, Texture, Vector2, Vector4, WebGLRenderer } from 'three';
import { BOAT_LIMIT, coverTransform, motionMaps, objectPosition, REGION_LIMIT, type ArtworkKind, type Region } from './living-artwork-config';

export type LivingScene = { setPlaying(playing: boolean): void; dispose(): void };

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uImage;
uniform float uTime;
uniform float uAspect;
uniform vec2 uScale;
uniform vec2 uOffset;
uniform vec4 uClouds[${REGION_LIMIT}];
uniform vec4 uWater[${REGION_LIMIT}];
uniform vec4 uLeaves[${REGION_LIMIT}];
uniform vec4 uLights[${REGION_LIMIT}];
uniform vec4 uFalls[${REGION_LIMIT}];
uniform vec4 uBoats[${BOAT_LIMIT}];
uniform vec2 uPivots[${BOAT_LIMIT}];
uniform vec4 uCanal;
varying vec2 vUv;

float region(vec2 p, vec4 r) {
  if (r.z <= 0.0 || r.w <= 0.0) return 0.0;
  return 1.0 - smoothstep(0.60, 1.0, length((p - r.xy) / r.zw));
}
vec3 photograph(vec2 p) {
  return texture2D(uImage, vec2(p.x, 1.0 - p.y)).rgb;
}
void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uScale + uOffset;
  vec3 original = photograph(p);
  float clouds = 0.0, water = 0.0, leaves = 0.0, lights = 0.0, falls = 0.0;
  for (int i = 0; i < ${REGION_LIMIT}; i++) {
    clouds = max(clouds, region(p, uClouds[i]));
    water = max(water, region(p, uWater[i]));
    leaves = max(leaves, region(p, uLeaves[i]));
    lights = max(lights, region(p, uLights[i]));
    falls = max(falls, region(p, uFalls[i]));
  }
  if (uCanal.z > 0.0) {
    vec2 line = uCanal.zw - uCanal.xy;
    float along = clamp(dot(p - uCanal.xy, line) / dot(line, line), 0.0, 1.0);
    float channel = 1.0 - smoothstep(0.005, 0.013, length(p - uCanal.xy - along * line));
    water = max(water, channel);
  }
  // Spatial masks plus color masks spare stonework, faces, and white sails.
  float blue = smoothstep(0.015, 0.13, original.b - original.r);
  float green = smoothstep(0.005, 0.055, original.g - original.r * 0.90)
    * smoothstep(0.008, 0.09, original.g - original.b);
  float amber = smoothstep(0.10, 0.32, original.r - original.b)
    * smoothstep(0.35, 0.75, original.r);
  water *= blue;
  falls *= smoothstep(-0.015, 0.05, original.b - original.r);
  leaves *= green;
  lights *= amber;
  float strength = smoothstep(0.0, 3.0, uTime);
  float t = uTime;
  vec2 q = p;
  // Long, soft drift: no whole-scene panning or moving foreground geometry.
  q += clouds * vec2(0.0035 * sin(t * 0.12 + p.y * 2.0), 0.00035 * sin(t * 0.17 + p.x * 7.0)) * strength;
  q += water * vec2(0.0009 * sin(p.y * 190.0 - t * 0.85), 0.00035 * sin(p.x * 110.0 + t * 0.65)) * strength;
  q += leaves * vec2(0.0008 * sin(t * 1.15 + p.y * 31.0), 0.0003 * sin(t * 0.85 + p.x * 43.0)) * strength;
  q += falls * vec2(0.00045 * sin(p.y * 180.0 - t * 1.6), 0.00065 * sin(p.y * 260.0 - t * 2.1)) * strength;
  for (int i = 0; i < ${BOAT_LIMIT}; i++) {
    float boat = region(p, uBoats[i]);
    float angle = 0.013 * sin(t * 0.8 + float(i) * 1.9) * strength;
    vec2 local = (p - uPivots[i]) * vec2(uAspect, 1.0);
    vec2 rocked = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * local;
    vec2 delta = (rocked - local) / vec2(uAspect, 1.0);
    delta.y += 0.00045 * sin(t * 0.8 + float(i) * 1.9) * strength;
    q = mix(q, p + delta, boat);
  }
  vec3 color = photograph(q);
  float ripple = sin(p.y * 280.0 - t * 1.1) * sin(p.x * 120.0 + t * 0.4);
  color *= 1.0 + strength * (water * 0.014 * ripple
    + falls * 0.025 * sin(p.y * 320.0 - t * 2.5)
    + lights * 0.035 * (0.65 * sin(t * 0.73 + p.x * 47.0) + 0.35 * sin(t * 1.17 + p.y * 31.0)));
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}`;

export function createLivingScene(canvas: HTMLCanvasElement, image: HTMLImageElement, kind: ArtworkKind): LivingScene {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'low-power' });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NoToneMapping;
  const texture = new Texture(image);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  const map = motionMaps[kind];
  const regions = (items: readonly Region[]) => Array.from({ length: REGION_LIMIT }, (_, i) => new Vector4(...(items[i] ?? [0, 0, 0, 0])));
  const uniforms = {
    uImage: { value: texture }, uTime: { value: 0 },
    uAspect: { value: image.naturalWidth / image.naturalHeight },
    uScale: { value: new Vector2(1, 1) }, uOffset: { value: new Vector2() },
    uClouds: { value: regions(map.clouds) }, uWater: { value: regions(map.water) },
    uLeaves: { value: regions(map.leaves) }, uLights: { value: regions(map.lights) }, uFalls: { value: regions(map.falls) },
    uBoats: { value: Array.from({ length: BOAT_LIMIT }, (_, i) => new Vector4(...(map.boats[i]?.region ?? [0, 0, 0, 0]))) },
    uPivots: { value: Array.from({ length: BOAT_LIMIT }, (_, i) => new Vector2(...(map.boats[i]?.pivot ?? [0, 0]))) },
    uCanal: { value: new Vector4(...(map.canal ?? [0, 0, 0, 0])) },
  };
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, depthTest: false, depthWrite: false, toneMapped: false });
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene.add(new Mesh(geometry, material));
  let frame = 0;
  let previous = 0;
  let playing = false;
  let disposed = false;
  let failed = false;

  function draw() {
    if (disposed || failed) return;
    renderer.render(scene, camera);
    if (!failed) canvas.dataset.ready = 'true';
  }
  function resize() {
    const { width, height } = image.getBoundingClientRect();
    if (!width || !height || disposed || failed) return;
    const crop = coverTransform(width, height, image.naturalWidth, image.naturalHeight, objectPosition(getComputedStyle(image).objectPosition));
    uniforms.uScale.value.set(...crop.scale);
    uniforms.uOffset.value.set(...crop.offset);
    // One shallow shader, at most ~1.6M pixels and 30fps, only while visible.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25, Math.sqrt(1_600_000 / (width * height))));
    renderer.setSize(width, height, false);
    draw();
  }
  function tick(now: number) {
    if (!playing || disposed || failed) return;
    frame = requestAnimationFrame(tick);
    if (!previous) { previous = now; return; }
    const elapsed = now - previous;
    if (elapsed < 1000 / 30) return;
    // No huge time jump after a throttled tab or a paused frame.
    uniforms.uTime.value += Math.min(elapsed, 80) / 1000;
    previous = now;
    draw();
  }
  function setPlaying(next: boolean) {
    if (next === playing || disposed || failed) return;
    playing = next;
    cancelAnimationFrame(frame);
    previous = 0;
    if (playing) frame = requestAnimationFrame(tick);
  }
  function fallback() {
    failed = true;
    playing = false;
    cancelAnimationFrame(frame);
    delete canvas.dataset.ready;
  }
  // Original <img> is always underneath, including context-loss/compile failure.
  renderer.debug.onShaderError = fallback;
  canvas.addEventListener('webglcontextlost', fallback);
  const observer = new ResizeObserver(resize);
  observer.observe(image);
  resize();

  return {
    setPlaying,
    dispose() {
      disposed = true;
      playing = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', fallback);
      delete canvas.dataset.ready;
      geometry.dispose(); material.dispose(); texture.dispose(); renderer.dispose();
      // Keep this canvas's context reusable when its section enters view again.
    },
  };
}
