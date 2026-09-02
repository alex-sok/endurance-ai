"use client";

import { useEffect, useRef } from "react";

// The field, breathing: violet light settling at the head of the page and
// desert rose at its foot, drifting. Drawn small and upscaled, so it
// costs almost nothing. Under reduced motion it renders one still frame; if
// WebGL is unavailable the CSS wash beneath simply shows through.
const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 u_res;
uniform float u_t;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_t * 0.018;
  float n = fbm(vec2(uv.x * 1.6 + t, uv.y * 1.2 - t * 0.6));
  vec3 white  = vec3(0.988, 0.984, 1.000);
  vec3 violet = vec3(0.906, 0.878, 0.976);
  vec3 rose   = vec3(0.965, 0.882, 0.902);
  // Violet gathers at the head of the field and desert rose settles at the
  // foot, both breathing; the middle stays white, where the copy sits.
  float breath = 0.55 + 0.45 * fbm(vec2(uv.y * 2.0 - t, t));
  float head = pow(smoothstep(0.28, 1.0, uv.y), 1.4);
  float foot = pow(smoothstep(0.52, 0.0, uv.y), 1.4);
  vec3 c = mix(white, violet, head * (0.55 + 0.45 * n) * breath);
  c = mix(c, rose, foot * (0.5 + 0.5 * n) * breath);
  float edge = pow(smoothstep(0.25, 1.0, abs(uv.x - 0.5) * 2.0), 1.6);
  c = mix(c, violet, edge * 0.34 * breath * (1.0 - foot));
  c = mix(c, rose, edge * 0.30 * breath * foot);
  float grain = (hash(gl_FragCoord.xy + fract(u_t)) - 0.5) * 0.012;
  o = vec4(c + grain, 1.0);
}`;

export function FieldShader() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uT = gl.getUniformLocation(prog, "u_t");

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    const start = performance.now();
    const draw = (now: number) => {
      gl.uniform1f(uT, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Size from the canvas's own box, at half resolution, capped: a soft
    // gradient upscales cleanly and the fill cost stays small.
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const cw = Math.max(1, box.width || window.innerWidth);
      const ch = Math.max(1, box.height || window.innerHeight);
      const w = Math.min(720, Math.max(320, Math.round(cw / 2)));
      const h = Math.max(200, Math.round((w * ch) / cw));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      if (still) draw(performance.now());
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / 30) return;
      last = now;
      draw(now);
    };

    resize();
    canvas.classList.add("is-live");
    if (still) {
      draw(start);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onVis = () => {
      if (still) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(loop);
    };
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(canvas);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="lp-canvas-gl" aria-hidden="true" />;
}
