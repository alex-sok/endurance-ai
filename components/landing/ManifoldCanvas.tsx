"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * ManifoldCanvas — the single WebGL backdrop for the landing page.
 *
 * A GPU point field that reads as a latent space resolving: every point holds
 * two positions, one scattered as raw noise and one belonging to a learned
 * cluster. Whole-page scroll progress drives the blend, so the hero opens on
 * diffuse noise and the field has condensed into distinct clusters by the time
 * the closing CTA comes back into view — raw data becoming learned structure,
 * which is the thing the page is actually selling.
 *
 * Colour follows the Margins Terminal palette: cool muted points warming to
 * the signal blue as structure forms, with amber igniting only on the densest
 * nodes at full resolution.
 *
 * Restraint rules: DPR capped at 2, rendering pauses whenever neither the hero
 * nor the CTA is on screen, and prefers-reduced-motion gets a single static
 * frame of the resolved state — no drift, no parallax.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uProgress;

  attribute vec3 aNoise;
  attribute vec3 aStruct;
  attribute float aRand;

  varying float vRand;
  varying float vDepth;

  void main() {
    float e = uProgress;

    vec3 pos = mix(aNoise, aStruct, e);

    // Unresolved points drift; the drift dies away as structure locks in.
    float b = (1.0 - e) * 0.42;
    float phase = aRand * 6.2831853;
    pos.x += sin(uTime * 0.5 + phase) * b;
    pos.y += cos(uTime * 0.42 + phase) * b;
    pos.z += sin(uTime * 0.33 + phase) * b * 0.6;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mv.z;

    vDepth = clamp((20.0 - dist) / 15.0, 0.0, 1.0);
    vRand = aRand;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPixelRatio * (0.85 + vDepth * 2.3) * (1.0 + e * 0.55)
                 * clamp(150.0 / dist, 0.45, 3.0);
  }
`;

const FRAG = /* glsl */ `
  uniform float uDim;
  uniform float uProgress;
  uniform vec3 uMuted;
  uniform vec3 uAccent;
  uniform vec3 uAmber;

  varying float vRand;
  varying float vDepth;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;

    float e = uProgress;

    // Muted → signal blue as the field organises, amber only at the very
    // densest nodes once it has fully resolved.
    vec3 col = mix(uMuted, uAccent, clamp(e * 2.0 * vRand, 0.0, 1.0));
    col = mix(col, uAmber, smoothstep(0.55, 1.0, e) * pow(vRand, 4.0));

    float alpha = (0.10 + vDepth * 0.74) * (0.40 + e * 0.60) * mix(1.0, 0.08, uDim);
    gl_FragColor = vec4(col, alpha);
  }
`;

// Deterministic LCG so the field looks identical on every load.
function makeRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function ManifoldCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // Guard against a zero-sized viewport at mount (hidden tab, restored
    // window): a 0/0 aspect poisons the projection matrix with NaN.
    const vw = () => Math.max(1, window.innerWidth);
    const vh = () => Math.max(1, window.innerHeight);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(vw(), vh());
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, vw() / vh(), 0.1, 90);
    camera.position.set(0, 0.8, 13);

    const rand = makeRandom(97);
    const COUNT = isMobile ? 1800 : 4200;
    const CLUSTERS = 7;

    // Cluster centres ring the origin at varying radius and height, so the
    // resolved state reads as distinct groups rather than one even blob.
    const centres: [number, number, number][] = [];
    for (let k = 0; k < CLUSTERS; k++) {
      const a = (k / CLUSTERS) * Math.PI * 2 + rand() * 0.35;
      const r = 3.1 + rand() * 2.4;
      centres.push([Math.cos(a) * r, (rand() - 0.5) * 4.4, Math.sin(a) * r - 2.0]);
    }

    const noise = new Float32Array(COUNT * 3);
    const struct = new Float32Array(COUNT * 3);
    const rnd = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const c = centres[i % CLUSTERS];
      const spread = 0.55 + rand() * 0.5;

      noise[i * 3] = (rand() - 0.5) * 24;
      noise[i * 3 + 1] = (rand() - 0.5) * 13;
      noise[i * 3 + 2] = (rand() - 0.5) * 22 - 4;

      // Gaussian-ish falloff keeps cluster cores dense and edges wispy.
      const g = () => (rand() + rand() + rand() - 1.5) * spread * 1.6;
      struct[i * 3] = c[0] + g();
      struct[i * 3 + 1] = c[1] + g();
      struct[i * 3 + 2] = c[2] + g();

      rnd[i] = rand();
    }

    const geometry = new THREE.BufferGeometry();
    // `position` is required by three's frustum/attribute plumbing; the shader
    // works from aNoise/aStruct, so seed it with the noise layout.
    geometry.setAttribute("position", new THREE.BufferAttribute(noise.slice(), 3));
    geometry.setAttribute("aNoise", new THREE.BufferAttribute(noise, 3));
    geometry.setAttribute("aStruct", new THREE.BufferAttribute(struct, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -2), 22);

    const uniforms = {
      uTime: { value: reduced ? 20 : 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uDim: { value: 0 },
      uProgress: { value: reduced ? 0.85 : 0 },
      uMuted: { value: new THREE.Color("#93a3c0") },
      uAccent: { value: new THREE.Color("#4a86f7") },
      uAmber: { value: new THREE.Color("#c7a76c") },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    // The shader moves every vertex away from `position`, so three's culling
    // maths can't be trusted here — a bad bounding sphere would silently cull
    // the whole field.
    points.frustumCulled = false;
    scene.add(points);

    // Render only while the hero or the CTA is on screen — the middle of the
    // page sits on solid ground and covers the canvas entirely.
    const visible = new Set<Element>();
    const watched = document.querySelectorAll('[data-section="hero"], [data-section="cta"]');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
    });
    watched.forEach((el) => observer.observe(el));

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduced && !isMobile) window.addEventListener("mousemove", onMouseMove);

    const scroll = { progress: 0 };
    const ctx = gsap.context(() => {
      // Whole-page progress drives the noise → structure blend.
      ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: (self) => {
          scroll.progress = self.progress;
        },
      });

      // Dim as the hero leaves…
      gsap.fromTo(
        uniforms.uDim,
        { value: 0 },
        {
          value: 1,
          ease: "none",
          scrollTrigger: {
            trigger: '[data-section="hero"]',
            start: "bottom 95%",
            end: "bottom 25%",
            scrub: true,
          },
        }
      );
      // …and resurface behind the final CTA, fully resolved but held back far
      // enough that the closing headline stays the loudest thing on screen.
      gsap.to(uniforms.uDim, {
        value: 0.42,
        ease: "none",
        scrollTrigger: {
          trigger: '[data-section="cta"]',
          start: "top 85%",
          end: "top 25%",
          scrub: true,
        },
      });
    });

    const clock = new THREE.Clock();
    const lookAt = new THREE.Vector3(0, 0, -3);

    // easeInOutCubic — holds the noise state through the hero, then resolves.
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const render = () => {
      if (visible.size === 0) return;
      if (!reduced) uniforms.uTime.value = clock.getElapsedTime() * 0.9;

      const e = ease(scroll.progress);
      uniforms.uProgress.value = e;

      // The field turns as it organises, so the resolved clusters present a
      // different face than the noise did.
      points.rotation.y = clock.getElapsedTime() * 0.02 + e * 0.85;

      camera.position.x += (mouse.x * 1.1 - camera.position.x) * 0.04;
      camera.position.y = 0.8 + e * 1.1 + mouse.y * -0.25;
      camera.lookAt(lookAt);

      renderer.render(scene, camera);
    };

    const renderOnce = () => {
      points.rotation.y = 0.7;
      camera.lookAt(lookAt);
      renderer.render(scene, camera);
    };

    let ticking = false;
    if (reduced) {
      // Static resolved state: a single frame is enough.
      renderOnce();
    } else {
      gsap.ticker.add(render);
      ticking = true;
    }

    const onResize = () => {
      camera.aspect = vw() / vh();
      camera.updateProjectionMatrix();
      renderer.setSize(vw(), vh());
      uniforms.uPixelRatio.value = renderer.getPixelRatio();
      if (reduced) renderOnce();
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (ticking) gsap.ticker.remove(render);
      ctx.revert();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
