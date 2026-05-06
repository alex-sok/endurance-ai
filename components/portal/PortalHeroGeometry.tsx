"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ── Icosahedron geometry ──────────────────────────────────────────────────────
// 12 vertices, 30 edges, 20 triangular faces.
// Standard form: (0, ±1, ±φ) and cyclic permutations.

const PHI = (1 + Math.sqrt(5)) / 2;

const VERTS: [number, number, number][] = [
  [ 0,  1,  PHI], [ 0, -1,  PHI], [ 0,  1, -PHI], [ 0, -1, -PHI],
  [ 1,  PHI,  0], [-1,  PHI,  0], [ 1, -PHI,  0], [-1, -PHI,  0],
  [ PHI,  0,  1], [-PHI,  0,  1], [ PHI,  0, -1], [-PHI,  0, -1],
];

// Edges connect vertices whose distance equals 2 (the icosahedron edge length)
const EDGES: [number, number][] = [];
for (let i = 0; i < VERTS.length; i++) {
  for (let j = i + 1; j < VERTS.length; j++) {
    const dx = VERTS[i][0] - VERTS[j][0];
    const dy = VERTS[i][1] - VERTS[j][1];
    const dz = VERTS[i][2] - VERTS[j][2];
    if (Math.abs(Math.sqrt(dx * dx + dy * dy + dz * dz) - 2) < 0.01) {
      EDGES.push([i, j]);
    }
  }
}

// ── Math helpers ──────────────────────────────────────────────────────────────

function rotate(
  [x, y, z]: [number, number, number],
  rx: number,
  ry: number,
): [number, number, number] {
  // Rotate around Y axis
  const x1 =  x * Math.cos(ry) + z * Math.sin(ry);
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
  // Rotate around X axis
  const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
  return [x1, y2, z2];
}

function project(
  [x, y, z]: [number, number, number],
  cx: number,
  cy: number,
  scale: number,
): [number, number, number] {
  const fov = 6;
  const d = fov / (fov + z);
  return [cx + x * scale * d, cy - y * scale * d, z];
}

// ── Component ─────────────────────────────────────────────────────────────────

interface GeometryProps {
  color?: string;
  /** 0–1 opacity for the <svg> element itself */
  opacity?: number;
}

export function PortalHeroGeometry({ color = "var(--portal-accent, #7c3aed)", opacity = 0.9 }: GeometryProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lines = svg.querySelectorAll<SVGLineElement>("line[data-e]");
    const W = 800, H = 400;
    const cx = W * 0.72; // offset right so it doesn't sit dead-center on the text
    const cy = H * 0.5;
    const scale = 148;

    let rx = 0.38, ry = 0.22;
    let animId: number;

    function tick() {
      rx += 0.0018;
      ry += 0.0029;

      const proj = VERTS.map(v => project(rotate(v, rx, ry), cx, cy, scale));

      EDGES.forEach(([a, b], i) => {
        const [x1, y1, z1] = proj[a];
        const [x2, y2, z2] = proj[b];
        const line = lines[i];
        if (!line) return;

        line.setAttribute("x1", x1.toFixed(1));
        line.setAttribute("y1", y1.toFixed(1));
        line.setAttribute("x2", x2.toFixed(1));
        line.setAttribute("y2", y2.toFixed(1));

        // Depth cue: edges closer to viewer are brighter and slightly thicker
        const avgZ = (z1 + z2) / 2;
        const t = (avgZ + PHI) / (PHI * 2); // 0 → back, 1 → front
        line.setAttribute("stroke-opacity", (0.2 + t * 0.6).toFixed(3));
        line.setAttribute("stroke-width",   (0.6  + t * 1.2).toFixed(2));
      });

      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeIn" }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        style={{ opacity }}
      >
        {EDGES.map((_, i) => (
          <line
            key={i}
            data-e="1"
            x1="0" y1="0" x2="0" y2="0"
            stroke={color}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </motion.div>
  );
}
