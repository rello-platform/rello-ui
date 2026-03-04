"use client";

import * as React from "react";

/** Concentric circles pattern — radiating rings from center */
export function ConcentricCircles({ accent }: { accent: string }) {
  return (
    <>
      {[14, 24, 34].map((r) => (
        <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke={accent} strokeWidth="0.8" />
      ))}
    </>
  );
}

/** Dot grid pattern — 5x5 evenly spaced dots */
export function DotGrid({ accent }: { accent: string }) {
  return (
    <>
      {Array.from({ length: 25 }).map((_, i) => (
        <circle
          key={i}
          cx={14 + (i % 5) * 16}
          cy={14 + Math.floor(i / 5) * 16}
          r="1.8"
          fill={accent}
        />
      ))}
    </>
  );
}

/** Orbital rings pattern — dashed concentric orbits with satellite dot */
export function OrbitalRings({ accent }: { accent: string }) {
  return (
    <>
      <circle cx="50%" cy="50%" r="20" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="4 5" />
      <circle cx="50%" cy="50%" r="30" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="3 6" />
      <circle cx="68" cy="22" r="2" fill={accent} opacity="0.4" />
    </>
  );
}

/** Cross hatch pattern — diagonal lines */
export function CrossHatch({ accent }: { accent: string }) {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`a${i}`}
          x1={i * 14 - 10}
          y1="0"
          x2={i * 14 + 40}
          y2="88"
          stroke={accent}
          strokeWidth="0.6"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`b${i}`}
          x1={i * 14 + 10}
          y1="0"
          x2={i * 14 - 40}
          y2="88"
          stroke={accent}
          strokeWidth="0.6"
        />
      ))}
    </>
  );
}

/** Diamond grid pattern — rotated squares */
export function DiamondGrid({ accent }: { accent: string }) {
  return (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <rect
          key={i}
          x={14 + (i % 3) * 22}
          y={14 + Math.floor(i / 3) * 22}
          width="10"
          height="10"
          fill="none"
          stroke={accent}
          strokeWidth="0.7"
          transform={`rotate(45 ${19 + (i % 3) * 22} ${19 + Math.floor(i / 3) * 22})`}
        />
      ))}
    </>
  );
}

/** Radial burst pattern — lines radiating from center */
export function RadialBurst({ accent }: { accent: string }) {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1="44"
            y1="44"
            x2={44 + Math.cos(angle) * 36}
            y2={44 + Math.sin(angle) * 36}
            stroke={accent}
            strokeWidth="0.6"
          />
        );
      })}
    </>
  );
}

/** Registry of all available patterns by key */
export const PATTERNS: Record<string, React.ComponentType<{ accent: string }>> = {
  "concentric-circles": ConcentricCircles,
  "dot-grid": DotGrid,
  "orbital-rings": OrbitalRings,
  "cross-hatch": CrossHatch,
  "diamond-grid": DiamondGrid,
  "radial-burst": RadialBurst,
};
