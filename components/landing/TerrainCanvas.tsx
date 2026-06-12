"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * TerrainCanvas — the single WebGL backdrop for the landing page.
 *
 * A GPU-displaced point field reads as terrain being surveyed: ridgelines
 * flow slowly toward the camera with a flat "route" carved through the
 * center. Bone-white points on near-black, peaks tinged with the signal
 * accent. It backs the hero, dims to black as you scroll, and re-emerges
 * behind the final CTA.
 *
 * Restraint rules: DPR capped at 2, rendering pauses whenever neither the
 * hero nor the CTA is on screen, and prefers-reduced-motion gets a static
 * vista (single render, no drift, no parallax).
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;

  varying float vElev;
  varying float vFade;

  // Ashima 2D simplex noise
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec3 pos = position;

    float z = pos.z + uTime;
    float n1 = snoise(vec2(pos.x * 0.055, z * 0.06));
    float n2 = snoise(vec2(pos.x * 0.16,  z * 0.17));

    // Flatten a corridor down the center — the route through the range.
    float corridor = smoothstep(1.2, 9.0, abs(pos.x));
    float elev = (n1 * 2.3 + n2 * 0.55) * corridor;
    elev = max(elev, -0.35);
    pos.y += elev;

    vElev = clamp((elev + 0.35) / 2.9, 0.0, 1.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mv.z;
    vFade = smoothstep(46.0, 12.0, dist) * smoothstep(2.0, 6.0, dist);

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPixelRatio * (1.0 + vElev * 2.1) * clamp(110.0 / dist, 0.5, 3.0);
  }
`;

const FRAG = /* glsl */ `
  uniform float uDim;
  uniform vec3 uBone;
  uniform vec3 uAccent;

  varying float vElev;
  varying float vFade;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;

    float bright = mix(0.14, 1.0, vElev * vElev);
    vec3 col = uBone * mix(0.5, 1.05, vElev);
    col = mix(col, uAccent, smoothstep(0.8, 1.0, vElev) * 0.45);

    float alpha = vFade * bright * mix(1.0, 0.08, uDim);
    gl_FragColor = vec4(col, alpha);
  }
`;

export function TerrainCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 80);
    camera.position.set(0, 2.6, 9);

    // Point grid laid out in XZ; height is computed in the vertex shader.
    const COLS = isMobile ? 90 : 150;
    const ROWS = isMobile ? 70 : 110;
    const WIDTH = 46;
    const DEPTH = 46;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[i++] = (c / (COLS - 1) - 0.5) * WIDTH;
        positions[i++] = 0;
        positions[i++] = 4 - (r / (ROWS - 1)) * DEPTH;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const uniforms = {
      uTime: { value: reduced ? 20 : 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uDim: { value: 0 },
      uBone: { value: new THREE.Color("#f4f3ee") },
      uAccent: { value: new THREE.Color("#f54e00") },
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
    scene.add(points);

    // Render only while the hero or the CTA is on screen.
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
      // Whole-page progress eases the camera upward over the journey.
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
      // …and resurface behind the final CTA.
      gsap.to(uniforms.uDim, {
        value: 0.1,
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
    const lookAt = new THREE.Vector3(0, 1.4, -16);

    const render = () => {
      if (visible.size === 0) return;
      if (!reduced) uniforms.uTime.value = clock.getElapsedTime() * 0.9;

      camera.position.x += (mouse.x * 1.1 - camera.position.x) * 0.04;
      camera.position.y = 2.6 + scroll.progress * 1.6 + mouse.y * -0.2;
      camera.lookAt(lookAt);

      renderer.render(scene, camera);
    };

    const renderOnce = () => {
      if (!reduced) uniforms.uTime.value = 20;
      camera.lookAt(lookAt);
      renderer.render(scene, camera);
    };

    let ticking = false;
    if (reduced) {
      // Static vista: a single frame is enough.
      renderOnce();
    } else {
      gsap.ticker.add(render);
      ticking = true;
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
