import * as THREE from "three";
import type { SceneAPI, SceneInitOpts } from "./SceneCanvas";
import { usGridPoints, SVG_W, SVG_H } from "../../data/us-shape";
import { interstateCorridors } from "../../data/interstates";
import { marketMapCities } from "../../data/market-map";

/**
 * The ONE shared 3D world of /logistics (DESIGN-V2.md): the continental
 * US at night, built from real OSM interstate geometry. Headlight pulses
 * run along individual highway ways in both directions — ambient traffic,
 * the network working while the world sleeps.
 *
 * Two camera modes make the page's bookend literal:
 * - "aerial" (§1 hero): low-oblique above the continent, slow drift,
 *   pointer parallax, scroll-out lift via setProgress.
 * - "road"  (§12 close): camera near ground level inside the network,
 *   pulses streaming past toward a warm dawn horizon; setProgress
 *   brightens the dawn as the section scrolls.
 *
 * Everything is point clouds + sprites — a handful of draw calls, no
 * post-processing. Colors come from the logistics theme tokens.
 */

const COL_BG = 0x0a0b0d;
const COL_AMBER = 0xf5a524;
const COL_HEAD = 0xf5d524;
const COL_BONE = 0xf5f2ec;

const WORLD_SCALE = 0.042;
const FOV = 36;
const PULSE_GAP = 26; // svg units between headlights on a way
const PULSE_SPEED = 9; // svg units / second

function toWorld(x: number, y: number): [number, number] {
  return [(x - SVG_W / 2) * WORLD_SCALE, (y - SVG_H / 2) * WORLD_SCALE];
}

/* ── Interstate ways → resampled point cloud ───────────────────────── */

type Pt = { x: number; y: number };

function parseWays(): Pt[][] {
  const ways: Pt[][] = [];
  for (const corridor of interstateCorridors) {
    for (const d of corridor.ds) {
      const pts = d
        .replace(/^M/, "")
        .split("L")
        .map((pair) => {
          const [x, y] = pair.split(",").map(Number);
          return { x, y };
        })
        .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
      if (pts.length >= 2) ways.push(pts);
    }
  }
  return ways;
}

function wayLength(way: Pt[]): number {
  let len = 0;
  for (let i = 1; i < way.length; i++) {
    len += Math.hypot(way[i].x - way[i - 1].x, way[i].y - way[i - 1].y);
  }
  return len;
}

function pointAt(way: Pt[], s: number): Pt {
  let acc = 0;
  for (let i = 1; i < way.length; i++) {
    const seg = Math.hypot(way[i].x - way[i - 1].x, way[i].y - way[i - 1].y);
    if (acc + seg >= s && seg > 0) {
      const t = (s - acc) / seg;
      return {
        x: way[i - 1].x + (way[i].x - way[i - 1].x) * t,
        y: way[i - 1].y + (way[i].y - way[i - 1].y) * t,
      };
    }
    acc += seg;
  }
  return way[way.length - 1];
}

function buildRoadAttributes(coarse: boolean) {
  const ways = parseWays().filter((w) => wayLength(w) > 6);
  const totalLen = ways.reduce((sum, w) => sum + wayLength(w), 0);
  const budget = coarse ? 2600 : 5200;
  const spacing = Math.max(coarse ? 3.4 : 2.2, totalLen / budget);

  const positions: number[] = [];
  const aS: number[] = [];
  const aDir: number[] = [];

  for (const way of ways) {
    const len = wayLength(way);
    const offset = Math.random() * PULSE_GAP;
    const dir = Math.random() < 0.5 ? -1 : 1;
    for (let s = 0; s <= len; s += spacing) {
      const p = pointAt(way, s);
      const [wx, wz] = toWorld(p.x, p.y);
      positions.push(wx, 0.02, wz);
      aS.push(s + offset);
      aDir.push(dir);
    }
  }
  return { positions, aS, aDir };
}

/* ── Shaders ────────────────────────────────────────────────────────── */

const ROAD_VERT = /* glsl */ `
  attribute float aS;
  attribute float aDir;
  uniform float uTime;
  uniform float uPxScale;
  varying float vHead;
  varying float vFog;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float depth = max(-mv.z, 0.001);
    float d = fract((aS + aDir * uTime * ${PULSE_SPEED.toFixed(1)}) / ${PULSE_GAP.toFixed(1)});
    float dd = min(d, 1.0 - d);
    vHead = exp(-dd * dd / 0.0026);
    vFog = smoothstep(46.0, 14.0, depth);
    gl_PointSize = clamp((0.05 + vHead * 0.08) * uPxScale / depth, 1.0, 22.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const ROAD_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColBase;
  uniform vec3 uColHead;
  uniform float uFade;
  varying float vHead;
  varying float vFog;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float disc = smoothstep(0.25, 0.04, dot(c, c));
    float b = 0.17 + vHead;
    vec3 col = mix(uColBase, uColHead, clamp(vHead, 0.0, 1.0));
    gl_FragColor = vec4(col, disc * b * vFog * uFade);
  }
`;

const DOTS_VERT = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPxScale;
  varying float vB;
  varying float vFog;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float depth = max(-mv.z, 0.001);
    vB = 0.10 + 0.05 * (0.5 + 0.5 * sin(uTime * 0.7 + aSeed * 6.2831));
    vFog = smoothstep(46.0, 14.0, depth);
    gl_PointSize = clamp(0.034 * uPxScale / depth, 1.0, 6.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const DOTS_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uCol;
  uniform float uFade;
  varying float vB;
  varying float vFog;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float disc = smoothstep(0.25, 0.05, dot(c, c));
    gl_FragColor = vec4(uCol, disc * vB * vFog * uFade);
  }
`;

/* ── Textures ───────────────────────────────────────────────────────── */

function radialTexture(hex: string, size = 128): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2,
  );
  g.addColorStop(0, `${hex}e6`);
  g.addColorStop(0.35, `${hex}55`);
  g.addColorStop(1, `${hex}00`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ── Scene ──────────────────────────────────────────────────────────── */

export type NightMode = "aerial" | "road";

export function createNightScene(
  opts: SceneInitOpts,
  mode: NightMode,
): SceneAPI {
  const { canvas, width, height, dpr, reduced } = opts;
  const coarse =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(COL_BG, 0);
  renderer.setPixelRatio(dpr);
  renderer.setSize(width, height, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 120);

  const pxScale = () =>
    (height * dpr) / (2 * Math.tan((FOV * Math.PI) / 360));

  /* Roads — one Points draw call */
  const road = buildRoadAttributes(coarse);
  const roadGeo = new THREE.BufferGeometry();
  roadGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(road.positions, 3),
  );
  roadGeo.setAttribute("aS", new THREE.Float32BufferAttribute(road.aS, 1));
  roadGeo.setAttribute("aDir", new THREE.Float32BufferAttribute(road.aDir, 1));
  const roadMat = new THREE.ShaderMaterial({
    vertexShader: ROAD_VERT,
    fragmentShader: ROAD_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uPxScale: { value: pxScale() },
      uFade: { value: 1 },
      uColBase: { value: new THREE.Color(COL_AMBER).multiplyScalar(0.55) },
      uColHead: { value: new THREE.Color(COL_HEAD) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  scene.add(new THREE.Points(roadGeo, roadMat));

  /* US land dot-matrix — one Points draw call */
  const grid = usGridPoints(coarse ? 9.5 : 6.5);
  const dotPos: number[] = [];
  const dotSeed: number[] = [];
  for (const p of grid) {
    const [wx, wz] = toWorld(p.x, p.y);
    dotPos.push(wx, 0, wz);
    dotSeed.push(Math.random());
  }
  const dotsGeo = new THREE.BufferGeometry();
  dotsGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(dotPos, 3),
  );
  dotsGeo.setAttribute("aSeed", new THREE.Float32BufferAttribute(dotSeed, 1));
  const dotsMat = new THREE.ShaderMaterial({
    vertexShader: DOTS_VERT,
    fragmentShader: DOTS_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uPxScale: { value: pxScale() },
      uFade: { value: 1 },
      uCol: { value: new THREE.Color(COL_BONE).multiplyScalar(0.5) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  scene.add(new THREE.Points(dotsGeo, dotsMat));

  /* Hub cities — glow sprites + pulse */
  const cityTex = radialTexture("#f5a524");
  const citySprites: THREE.Sprite[] = [];
  for (const c of marketMapCities) {
    const mat = new THREE.SpriteMaterial({
      map: cityTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
    });
    const s = new THREE.Sprite(mat);
    const [wx, wz] = toWorld(c.x, c.y);
    s.position.set(wx, 0.06, wz);
    s.scale.setScalar(1.7);
    scene.add(s);
    citySprites.push(s);
  }

  /* Dawn horizon — road mode only */
  let dawn: THREE.Sprite | null = null;

  /* Camera rigs */
  const basePos = new THREE.Vector3();
  const lookAt = new THREE.Vector3();
  if (mode === "aerial") {
    basePos.set(0, 13.0, 22.0);
    lookAt.set(0, -0.5, -2);
  } else {
    basePos.set(2.2, 1.0, 6.5);
    lookAt.set(-9, 0.7, -12);
    const dawnTex = radialTexture("#f5a524", 256);
    const dawnMat = new THREE.SpriteMaterial({
      map: dawnTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.38,
    });
    dawn = new THREE.Sprite(dawnMat);
    const dir = lookAt.clone().sub(basePos).normalize();
    dawn.position.copy(basePos).addScaledVector(dir, 34);
    dawn.position.y = 3.4;
    dawn.scale.set(46, 15, 1);
    scene.add(dawn);
  }
  camera.position.copy(basePos);
  camera.lookAt(lookAt);

  /* Pointer parallax — aerial + fine pointers only */
  const mouse = { x: 0, y: 0 };
  const par = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  const parallaxOn = mode === "aerial" && !coarse && !reduced;
  if (parallaxOn) window.addEventListener("pointermove", onPointer);

  let progress = 0;
  let w = width;
  let h = height;

  const applyFade = (f: number) => {
    roadMat.uniforms.uFade.value = f;
    dotsMat.uniforms.uFade.value = f;
    for (const s of citySprites) {
      (s.material as THREE.SpriteMaterial).opacity = 0.85 * f;
    }
  };

  const frame = (timeSec: number) => {
    roadMat.uniforms.uTime.value = timeSec;
    dotsMat.uniforms.uTime.value = timeSec;

    if (mode === "aerial") {
      par.x += (mouse.x * 1.4 - par.x) * 0.04;
      par.y += (mouse.y * -0.55 - par.y) * 0.04;
      const drift = Math.sin(timeSec * 0.08) * 0.5;
      camera.position.set(
        basePos.x + par.x + drift,
        basePos.y + par.y + progress * 8.5,
        basePos.z + progress * 7.0,
      );
      applyFade(1 - progress * 0.85);
    } else {
      camera.position.x = basePos.x + Math.sin(timeSec * 0.07) * 0.4;
      if (dawn) {
        (dawn.material as THREE.SpriteMaterial).opacity =
          0.38 + progress * 0.4;
      }
    }
    camera.lookAt(lookAt);

    citySprites.forEach((s, i) => {
      s.scale.setScalar(1.7 * (1 + 0.07 * Math.sin(timeSec * 1.2 + i * 1.7)));
    });

    renderer.render(scene, camera);
  };

  // First frame before data-ready stamp — crossfade has real pixels.
  frame(reduced ? 37 : 0.001);

  const onContextLost = (e: Event) => e.preventDefault();
  canvas.addEventListener("webglcontextlost", onContextLost);

  const api: SceneAPI = {
    resize(nw, nh) {
      w = nw;
      h = nh;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      const px = (h * dpr) / (2 * Math.tan((FOV * Math.PI) / 360));
      roadMat.uniforms.uPxScale.value = px;
      dotsMat.uniforms.uPxScale.value = px;
      if (reduced) frame(37);
    },
    setProgress(p) {
      progress = Math.min(Math.max(p, 0), 1);
      if (reduced) return;
    },
    dispose() {
      if (parallaxOn) window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      roadGeo.dispose();
      dotsGeo.dispose();
      roadMat.dispose();
      dotsMat.dispose();
      cityTex.dispose();
      for (const s of citySprites) (s.material as THREE.SpriteMaterial).dispose();
      if (dawn) {
        (dawn.material as THREE.SpriteMaterial).map?.dispose();
        (dawn.material as THREE.SpriteMaterial).dispose();
      }
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };

  if (!reduced) api.update = (timeSec) => frame(timeSec);

  return api;
}
