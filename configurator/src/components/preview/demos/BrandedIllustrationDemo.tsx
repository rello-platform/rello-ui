import { useState } from "react";

interface Illustration {
  id: string;
  name: string;
  codename: string;
  section: string;
  accent: string;
  pattern: string;
  tier: string;
  status: "built" | "to-build";
  render: (s: number) => React.ReactNode;
}

// Pattern renderers
function ConcentricCircles({ accent }: { accent: string }) {
  return <>{[14, 24, 34].map(r => <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke={accent} strokeWidth="0.8" />)}</>;
}
function DotGrid({ accent }: { accent: string }) {
  return <>{Array.from({ length: 25 }).map((_, i) => <circle key={i} cx={14 + (i % 5) * 16} cy={14 + Math.floor(i / 5) * 16} r="1.8" fill={accent} />)}</>;
}
function OrbitalRings({ accent }: { accent: string }) {
  return <><circle cx="50%" cy="50%" r="20" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="4 5" /><circle cx="50%" cy="50%" r="30" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="3 6" /><circle cx="68" cy="22" r="2" fill={accent} opacity="0.4" /></>;
}
function Hexagons({ accent }: { accent: string }) {
  const hex = (cx: number, cy: number, r: number) => { const pts = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 3 * i - Math.PI / 6; return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(" "); return <polygon key={`${cx}-${cy}`} points={pts} fill="none" stroke={accent} strokeWidth="0.6" />; };
  return <>{[hex(44,30,10), hex(44,50,10), hex(44,70,10), hex(60,40,10), hex(60,60,10), hex(28,40,10), hex(28,60,10)]}</>;
}
function WaveLines({ accent }: { accent: string }) {
  return <><path d="M0,35 Q22,20 44,35 T88,35" fill="none" stroke={accent} strokeWidth="0.8" /><path d="M0,50 Q22,35 44,50 T88,50" fill="none" stroke={accent} strokeWidth="0.8" /><path d="M0,65 Q22,50 44,65 T88,65" fill="none" stroke={accent} strokeWidth="0.8" /></>;
}
function DashedOrbits({ accent }: { accent: string }) {
  return <><ellipse cx="44" cy="44" rx="25" ry="18" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="3 4" /><ellipse cx="44" cy="44" rx="18" ry="28" fill="none" stroke={accent} strokeWidth="0.7" strokeDasharray="3 4" /><circle cx="60" cy="24" r="2" fill={accent} opacity="0.3" /></>;
}

const PATTERNS: Record<string, ({ accent }: { accent: string }) => React.ReactNode> = {
  "concentric-circles": ConcentricCircles,
  "dot-grid": DotGrid,
  "orbital-rings": OrbitalRings,
  "hexagons": Hexagons,
  "wave-lines": WaveLines,
  "dashed-orbits": DashedOrbits,
};

const ALL_ILLUSTRATIONS: Illustration[] = [
  // === EXISTING (4 built) ===
  { id: "1", name: "Five Before 9", codename: "Five Before 9", section: "Calls", accent: "#C9785D", pattern: "concentric-circles", tier: "Tier 2", status: "built",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M20 14l12 5v14l-12 5V14z" stroke="#C9785D" strokeWidth="2" /><path d="M20 14l-8 3.5v14l8 3.5" stroke="#C9785D" strokeWidth="2" /><circle cx="30" cy="16" r="3" stroke="#C9785D" strokeWidth="1" opacity="0.4" /><circle cx="30" cy="16" r="6" stroke="#C9785D" strokeWidth="0.7" opacity="0.2" /></svg> },
  { id: "2", name: "The Pulse", codename: "The Pulse", section: "Active Deals", accent: "#7B8EC2", pattern: "orbital-rings", tier: "Tier 2", status: "built",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M6 26h8l4-14 6 28 5-14h8" stroke="#7B8EC2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="37" cy="14" r="3" fill="#7B8EC2" opacity="0.5" /><circle cx="37" cy="14" r="1.5" fill="#7B8EC2" /></svg> },
  { id: "3", name: "Morning Brew", codename: "Morning Brew", section: "Market Intel", accent: "#C9785D", pattern: "dot-grid", tier: "Tier 2", status: "built",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="10" y="18" width="22" height="20" rx="3" stroke="#C9785D" strokeWidth="2.5" /><rect x="12" y="20" width="18" height="8" rx="1.5" fill="#C9785D" opacity="0.1" /><rect x="12" y="28" width="18" height="8" rx="1.5" fill="#C9785D" opacity="0.2" /><path d="M32 24c6 0 6 8 0 8" stroke="#C9785D" strokeWidth="2.5" /><path d="M17 14c0-3 3-3 3 0" stroke="#C9785D" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" /><path d="M22 12c0-3 3-3 3 0" stroke="#C9785D" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" /><path d="M27 14c0-3 3-3 3 0" stroke="#C9785D" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" /></svg> },
  { id: "4", name: "The Vault", codename: "The Vault", section: "Contacts", accent: "#7A9E7E", pattern: "concentric-circles", tier: "Tier 2", status: "built",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="#7A9E7E" strokeWidth="1.5" opacity="0.3" /><circle cx="24" cy="24" r="10" stroke="#7A9E7E" strokeWidth="1.5" opacity="0.5" /><circle cx="24" cy="24" r="4" stroke="#7A9E7E" strokeWidth="2" /><circle cx="24" cy="24" r="1.5" fill="#7A9E7E" /><line x1="24" y1="4" x2="24" y2="12" stroke="#7A9E7E" strokeWidth="1.5" opacity="0.3" /><line x1="24" y1="36" x2="24" y2="44" stroke="#7A9E7E" strokeWidth="1.5" opacity="0.3" /><line x1="4" y1="24" x2="12" y2="24" stroke="#7A9E7E" strokeWidth="1.5" opacity="0.3" /><line x1="36" y1="24" x2="44" y2="24" stroke="#7A9E7E" strokeWidth="1.5" opacity="0.3" /></svg> },

  // === PHASE 1: Dashboard Essentials ===
  { id: "5", name: "The Launchpad", codename: "The Launchpad", section: "Today's Action Plan", accent: "#D4943A", pattern: "orbital-rings", tier: "Tier 1 Hero", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M24 8c0 0-8 8-8 20l8 8 8-8c0-12-8-20-8-20z" stroke="#D4943A" strokeWidth="2.5" /><circle cx="24" cy="22" r="3" stroke="#D4943A" strokeWidth="1.5" opacity="0.5" /><path d="M16 28l-4 4 4-1" stroke="#D4943A" strokeWidth="1.5" opacity="0.4" /><path d="M32 28l4 4-4-1" stroke="#D4943A" strokeWidth="1.5" opacity="0.4" /><circle cx="24" cy="40" r="1.5" fill="#D4943A" opacity="0.3" /><path d="M30 10l2-2" stroke="#D4943A" strokeWidth="1" opacity="0.6" /><circle cx="33" cy="7" r="1" fill="#D4943A" opacity="0.5" /></svg> },
  { id: "6", name: "The Thermometer", codename: "The Thermometer", section: "Pipeline Scoring", accent: "#3D7A80", pattern: "hexagons", tier: "Tier 1 Hero", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="20" y="6" width="8" height="28" rx="4" stroke="#3D7A80" strokeWidth="2" /><circle cx="24" cy="38" r="6" stroke="#3D7A80" strokeWidth="2" /><rect x="22" y="18" width="4" height="16" rx="2" fill="#3D7A80" opacity="0.3" /><circle cx="24" cy="38" r="3" fill="#3D7A80" opacity="0.4" /><line x1="29" y1="12" x2="33" y2="12" stroke="#3D7A80" strokeWidth="1" opacity="0.3" /><line x1="29" y1="18" x2="33" y2="18" stroke="#3D7A80" strokeWidth="1" opacity="0.3" /><line x1="29" y1="24" x2="33" y2="24" stroke="#3D7A80" strokeWidth="1" opacity="0.3" /><path d="M29 8l3-2" stroke="#3D7A80" strokeWidth="1" opacity="0.5" /><circle cx="34" cy="5" r="1.5" fill="#3D7A80" opacity="0.3" /></svg> },
  { id: "7", name: "The Radar", codename: "The Radar", section: "Hot Leads", accent: "#B85C38", pattern: "dashed-orbits", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="#B85C38" strokeWidth="1.5" opacity="0.2" /><circle cx="24" cy="24" r="10" stroke="#B85C38" strokeWidth="1.5" opacity="0.3" /><circle cx="24" cy="24" r="4" stroke="#B85C38" strokeWidth="1.5" opacity="0.4" /><path d="M24 24L36 12" stroke="#B85C38" strokeWidth="2" opacity="0.6" /><circle cx="30" cy="18" r="2.5" fill="#B85C38" opacity="0.5" /><circle cx="18" cy="14" r="2" fill="#B85C38" opacity="0.3" /><circle cx="32" cy="28" r="1.5" fill="#B85C38" opacity="0.25" /><circle cx="24" cy="24" r="14" stroke="#B85C38" strokeWidth="0.7" opacity="0.15" strokeDasharray="2 4" /></svg> },
  { id: "8", name: "The Agenda", codename: "The Agenda", section: "Today's Schedule", accent: "#5A7EB5", pattern: "dot-grid", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="8" y="12" width="32" height="30" rx="3" stroke="#5A7EB5" strokeWidth="2" /><line x1="18" y1="6" x2="18" y2="16" stroke="#5A7EB5" strokeWidth="2.5" strokeLinecap="round" /><line x1="30" y1="6" x2="30" y2="16" stroke="#5A7EB5" strokeWidth="2.5" strokeLinecap="round" /><line x1="8" y1="22" x2="40" y2="22" stroke="#5A7EB5" strokeWidth="1" opacity="0.3" /><circle cx="16" cy="28" r="2" fill="#5A7EB5" opacity="0.15" /><circle cx="24" cy="28" r="2" fill="#5A7EB5" opacity="0.15" /><circle cx="32" cy="28" r="2" fill="#5A7EB5" opacity="0.5" /><circle cx="16" cy="35" r="2" fill="#5A7EB5" opacity="0.15" /><circle cx="24" cy="35" r="2" fill="#5A7EB5" opacity="0.15" /><path d="M13 28l2 2 4-4" stroke="#5A7EB5" strokeWidth="1" opacity="0.4" /></svg> },

  // === PHASE 2: Production Apps ===
  { id: "9", name: "The Compass", codename: "HomeReady", section: "Buyer Qualification", accent: "#5B9EA6", pattern: "concentric-circles", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke="#5B9EA6" strokeWidth="2" /><circle cx="24" cy="24" r="12" stroke="#5B9EA6" strokeWidth="1" opacity="0.3" /><polygon points="24,10 28,22 24,26 20,22" fill="#5B9EA6" opacity="0.3" /><polygon points="24,38 20,26 24,22 28,26" fill="#5B9EA6" opacity="0.15" /><circle cx="24" cy="24" r="2" fill="#5B9EA6" /><path d="M24 6v2" stroke="#5B9EA6" strokeWidth="1.5" opacity="0.4" /><circle cx="30" cy="12" r="1" fill="#5B9EA6" opacity="0.5" /></svg> },
  { id: "10", name: "The Finish Line", codename: "HomeStretch", section: "Education & Closing", accent: "#5E8C6A", pattern: "concentric-circles", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M10 38 Q16 28 20 30 Q24 32 28 24 Q32 16 38 12" stroke="#5E8C6A" strokeWidth="2.5" fill="none" strokeLinecap="round" /><circle cx="16" cy="32" r="2" fill="#5E8C6A" opacity="0.2" /><circle cx="24" cy="26" r="2" fill="#5E8C6A" opacity="0.3" /><circle cx="32" cy="18" r="2" fill="#5E8C6A" opacity="0.4" /><path d="M38 8v8h-4" stroke="#5E8C6A" strokeWidth="2" fill="none" /><circle cx="38" cy="8" r="1.5" fill="#5E8C6A" opacity="0.5" /></svg> },
  { id: "11", name: "The Hearth", codename: "The Oven", section: "Post-Close Intel", accent: "#9E8B7E", pattern: "wave-lines", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M10 38h28l-4-20H14z" stroke="#9E8B7E" strokeWidth="2" /><rect x="16" y="22" width="16" height="12" rx="2" stroke="#9E8B7E" strokeWidth="1.5" opacity="0.4" /><path d="M20 22v-4l4-3 4 3v4" stroke="#9E8B7E" strokeWidth="1.5" opacity="0.5" /><path d="M18 14c0-3 2-3 2 0" stroke="#9E8B7E" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" /><path d="M24 12c0-3 2-3 2 0" stroke="#9E8B7E" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" /><path d="M30 14c0-3 2-3 2 0" stroke="#9E8B7E" strokeWidth="1.2" opacity="0.2" strokeLinecap="round" /></svg> },
  { id: "12", name: "The Press", codename: "Newsletter Studio", section: "Email Campaigns", accent: "#6E6EA8", pattern: "dot-grid", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M8 16l16 10 16-10" stroke="#6E6EA8" strokeWidth="2" /><rect x="8" y="16" width="32" height="22" rx="3" stroke="#6E6EA8" strokeWidth="2" /><rect x="14" y="10" width="20" height="8" rx="2" stroke="#6E6EA8" strokeWidth="1.5" opacity="0.3" /><line x1="18" y1="13" x2="30" y2="13" stroke="#6E6EA8" strokeWidth="1" opacity="0.2" /><line x1="18" y1="16" x2="26" y2="16" stroke="#6E6EA8" strokeWidth="1" opacity="0.2" /><path d="M36 12l2-2" stroke="#6E6EA8" strokeWidth="1" opacity="0.5" /><circle cx="39" cy="9" r="1.2" fill="#6E6EA8" opacity="0.4" /></svg> },

  // === PHASE 3: Rello Modules ===
  { id: "13", name: "The Welcome Mat", codename: "Open House Hub", section: "Offline Capture", accent: "#A67B8A", pattern: "orbital-rings", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="14" y="12" width="16" height="26" rx="2" stroke="#A67B8A" strokeWidth="2" /><path d="M14 24h16" stroke="#A67B8A" strokeWidth="1" opacity="0.2" /><rect x="22" y="24" width="3" height="10" rx="1.5" fill="#A67B8A" opacity="0.3" /><path d="M14 18 Q6 24 14 30" stroke="#A67B8A" strokeWidth="1.2" opacity="0.3" /><path d="M14 20 Q8 24 14 28" stroke="#A67B8A" strokeWidth="1.2" opacity="0.2" /><circle cx="10" cy="16" r="2" fill="#A67B8A" opacity="0.15" /></svg> },
  { id: "14", name: "The Fields", codename: "Harvest Home", section: "Lead Discovery", accent: "#C27052", pattern: "dashed-orbits", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="20" cy="20" r="10" stroke="#C27052" strokeWidth="2" /><line x1="27" y1="27" x2="38" y2="38" stroke="#C27052" strokeWidth="2.5" strokeLinecap="round" /><circle cx="18" cy="18" r="2" fill="#C27052" opacity="0.4" /><circle cx="24" cy="16" r="1.5" fill="#C27052" opacity="0.3" /><circle cx="16" cy="22" r="1.5" fill="#C27052" opacity="0.3" /><circle cx="22" cy="23" r="1" fill="#C27052" opacity="0.2" /><circle cx="36" cy="36" r="1.5" fill="#C27052" opacity="0.4" /></svg> },
  { id: "15", name: "The Signal", codename: "Phone App", section: "Conversations", accent: "#D4943A", pattern: "orbital-rings", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="16" y="8" width="16" height="32" rx="4" stroke="#D4943A" strokeWidth="2" /><rect x="20" y="14" width="8" height="14" rx="1" fill="#D4943A" opacity="0.1" /><circle cx="24" cy="36" r="2" stroke="#D4943A" strokeWidth="1.5" opacity="0.3" /><path d="M34 18 Q38 18 38 22" stroke="#D4943A" strokeWidth="1.5" opacity="0.3" /><path d="M34 14 Q42 14 42 22" stroke="#D4943A" strokeWidth="1.5" opacity="0.2" /><circle cx="38" cy="12" r="2" fill="#D4943A" opacity="0.15" /></svg> },
  { id: "16", name: "Command Center", codename: "Marketing Hub", section: "Unified Marketing", accent: "#8E7CC3", pattern: "dot-grid", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="8" y="14" width="14" height="10" rx="2" stroke="#8E7CC3" strokeWidth="1.5" opacity="0.4" /><rect x="26" y="14" width="14" height="10" rx="2" stroke="#8E7CC3" strokeWidth="1.5" opacity="0.4" /><rect x="8" y="28" width="14" height="10" rx="2" stroke="#8E7CC3" strokeWidth="1.5" opacity="0.4" /><rect x="26" y="28" width="14" height="10" rx="2" stroke="#8E7CC3" strokeWidth="1.5" opacity="0.4" /><line x1="24" y1="8" x2="24" y2="14" stroke="#8E7CC3" strokeWidth="2" /><circle cx="24" cy="6" r="3" stroke="#8E7CC3" strokeWidth="1.5" /><path d="M22 6l2-2 2 2" stroke="#8E7CC3" strokeWidth="1" opacity="0.5" /></svg> },
  { id: "17", name: "The Observatory", codename: "MarketIntel", section: "Market Data", accent: "#4A7B94", pattern: "dot-grid", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M8 38l8-12 6 6 8-14 10 8" stroke="#4A7B94" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="40" cy="26" r="3" stroke="#4A7B94" strokeWidth="1.5" opacity="0.4" /><path d="M38 14l2-6" stroke="#4A7B94" strokeWidth="1.5" opacity="0.4" /><circle cx="40" cy="8" r="2" fill="#4A7B94" opacity="0.3" /><line x1="8" y1="38" x2="40" y2="38" stroke="#4A7B94" strokeWidth="1" opacity="0.2" /></svg> },

  // === PHASE 3: Rello Modules ===
  { id: "18", name: "The Runway", codename: "Closing Copilot", section: "Transaction Pipeline", accent: "#3D7A80", pattern: "hexagons", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M8 38L24 12L40 38" stroke="#3D7A80" strokeWidth="2" fill="none" /><line x1="14" y1="28" x2="34" y2="28" stroke="#3D7A80" strokeWidth="1" opacity="0.3" /><line x1="18" y1="22" x2="30" y2="22" stroke="#3D7A80" strokeWidth="1" opacity="0.2" /><circle cx="24" cy="34" r="3" stroke="#3D7A80" strokeWidth="1.5" /><path d="M22 34l2-2 2 2" stroke="#3D7A80" strokeWidth="1.2" /><circle cx="24" cy="12" r="2" fill="#3D7A80" opacity="0.4" /></svg> },
  { id: "19", name: "The Blueprint", codename: "Report Builder", section: "CMA & Reports", accent: "#5B6B8A", pattern: "concentric-circles", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="10" y="8" width="28" height="32" rx="2" stroke="#5B6B8A" strokeWidth="2" /><line x1="16" y1="16" x2="32" y2="16" stroke="#5B6B8A" strokeWidth="1" opacity="0.3" /><line x1="16" y1="22" x2="28" y2="22" stroke="#5B6B8A" strokeWidth="1" opacity="0.3" /><rect x="16" y="26" width="6" height="8" rx="1" fill="#5B6B8A" opacity="0.15" /><rect x="24" y="28" width="6" height="6" rx="1" fill="#5B6B8A" opacity="0.15" /><path d="M34 36l2-2" stroke="#5B6B8A" strokeWidth="1.5" opacity="0.4" /><circle cx="37" cy="33" r="2" stroke="#5B6B8A" strokeWidth="1" opacity="0.3" /></svg> },
  { id: "20", name: "The Web", codename: "Referral Network", section: "Client Graph", accent: "#B07A7A", pattern: "wave-lines", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="4" stroke="#B07A7A" strokeWidth="2" /><circle cx="12" cy="14" r="3" stroke="#B07A7A" strokeWidth="1.5" opacity="0.5" /><circle cx="36" cy="14" r="3" stroke="#B07A7A" strokeWidth="1.5" opacity="0.5" /><circle cx="12" cy="36" r="3" stroke="#B07A7A" strokeWidth="1.5" opacity="0.5" /><circle cx="36" cy="36" r="3" stroke="#B07A7A" strokeWidth="1.5" opacity="0.5" /><line x1="21" y1="21" x2="14" y2="16" stroke="#B07A7A" strokeWidth="1.5" opacity="0.3" /><line x1="27" y1="21" x2="34" y2="16" stroke="#B07A7A" strokeWidth="1.5" opacity="0.3" /><line x1="21" y1="27" x2="14" y2="34" stroke="#B07A7A" strokeWidth="1.5" opacity="0.3" /><line x1="27" y1="27" x2="34" y2="34" stroke="#B07A7A" strokeWidth="1.5" opacity="0.3" /><circle cx="40" cy="10" r="1.5" fill="#B07A7A" opacity="0.3" /></svg> },
  { id: "21", name: "The Tracker", codename: "Lead Attribution", section: "ROI Dashboard", accent: "#7A8A95", pattern: "concentric-circles", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M16 8L16 20L24 28L24 40" stroke="#7A8A95" strokeWidth="2" /><path d="M8 14h8" stroke="#7A8A95" strokeWidth="1.5" opacity="0.3" /><path d="M32 14L32 20L24 28" stroke="#7A8A95" strokeWidth="2" opacity="0.5" /><path d="M32 14h8" stroke="#7A8A95" strokeWidth="1.5" opacity="0.3" /><circle cx="24" cy="40" r="4" stroke="#7A8A95" strokeWidth="1.5" /><text x="22" y="43" fontSize="6" fill="#7A8A95" opacity="0.6">$</text><circle cx="16" cy="8" r="2" fill="#7A8A95" opacity="0.3" /><circle cx="32" cy="10" r="2" fill="#7A8A95" opacity="0.3" /></svg> },

  // === PHASE 5: Engines & Admin ===
  { id: "22", name: "The Brain", codename: "Milo Engine", section: "Smart Assistant", accent: "#5B6B8A", pattern: "concentric-circles", tier: "Tier 2 Admin", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M24 8 C14 8 8 16 8 24 C8 32 14 38 20 38 L20 42 L28 42 L28 38 C34 38 40 32 40 24 C40 16 34 8 24 8Z" stroke="#5B6B8A" strokeWidth="2" fill="none" /><path d="M18 20 Q24 16 30 20" stroke="#5B6B8A" strokeWidth="1.5" opacity="0.3" /><path d="M18 28 Q24 24 30 28" stroke="#5B6B8A" strokeWidth="1.5" opacity="0.3" /><circle cx="24" cy="24" r="3" fill="#5B6B8A" opacity="0.2" /><circle cx="24" cy="24" r="1.5" fill="#5B6B8A" opacity="0.4" /><circle cx="24" cy="24" r="8" stroke="#5B6B8A" strokeWidth="0.7" opacity="0.15" /></svg> },
  { id: "23", name: "The Mill", codename: "Content Engine", section: "Content Gen", accent: "#7A8A95", pattern: "dot-grid", tier: "Tier 2 Admin", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><circle cx="20" cy="24" r="10" stroke="#7A8A95" strokeWidth="2" /><circle cx="20" cy="24" r="3" fill="#7A8A95" opacity="0.2" /><path d="M20 14v-2M20 34v2M10 24h-2M30 24h2" stroke="#7A8A95" strokeWidth="1.5" opacity="0.3" /><rect x="32" y="16" width="10" height="4" rx="1" fill="#7A8A95" opacity="0.15" /><rect x="32" y="22" width="10" height="4" rx="1" fill="#7A8A95" opacity="0.15" /><rect x="32" y="28" width="10" height="4" rx="1" fill="#7A8A95" opacity="0.15" /><circle cx="38" cy="12" r="1.5" fill="#7A8A95" opacity="0.3" /></svg> },
  { id: "24", name: "The Pathmaker", codename: "Journey Engine", section: "Nurture", accent: "#7A9E7E", pattern: "concentric-circles", tier: "Tier 2 Admin", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M8 38 L16 30 L24 34 L32 18 L40 10" stroke="#7A9E7E" strokeWidth="2.5" fill="none" strokeLinecap="round" /><circle cx="16" cy="30" r="2.5" fill="#7A9E7E" opacity="0.2" stroke="#7A9E7E" strokeWidth="1" /><circle cx="24" cy="34" r="2.5" fill="#7A9E7E" opacity="0.2" stroke="#7A9E7E" strokeWidth="1" /><circle cx="32" cy="18" r="2.5" fill="#7A9E7E" opacity="0.3" stroke="#7A9E7E" strokeWidth="1" /><path d="M40 6v8h-4" stroke="#7A9E7E" strokeWidth="1.5" fill="none" opacity="0.5" /><path d="M38 8l4-4" stroke="#7A9E7E" strokeWidth="1" opacity="0.3" /></svg> },
  { id: "25", name: "The Foundation", codename: "Property Engine", section: "MLS & Matching", accent: "#4A7B94", pattern: "hexagons", tier: "Tier 2 Admin", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M24 10L10 22v16h28V22z" stroke="#4A7B94" strokeWidth="2" /><rect x="18" y="26" width="12" height="12" rx="1" stroke="#4A7B94" strokeWidth="1.5" opacity="0.3" /><rect x="14" y="30" width="20" height="4" rx="1" fill="#4A7B94" opacity="0.08" /><rect x="14" y="34" width="20" height="4" rx="1" fill="#4A7B94" opacity="0.12" /><circle cx="24" cy="16" r="2" fill="#4A7B94" opacity="0.3" /><path d="M36 12l2-2" stroke="#4A7B94" strokeWidth="1" opacity="0.4" /></svg> },

  // === PHASE 5: Broker ===
  { id: "26", name: "The Scoreboard", codename: "Team Performance", section: "Agent Rankings", accent: "#8B5E83", pattern: "hexagons", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="10" y="26" width="8" height="14" rx="1" fill="#8B5E83" opacity="0.2" /><rect x="20" y="18" width="8" height="22" rx="1" fill="#8B5E83" opacity="0.3" /><rect x="30" y="22" width="8" height="18" rx="1" fill="#8B5E83" opacity="0.2" /><circle cx="14" cy="22" r="3" stroke="#8B5E83" strokeWidth="1.5" opacity="0.4" /><circle cx="24" cy="14" r="3" stroke="#8B5E83" strokeWidth="1.5" opacity="0.5" /><circle cx="34" cy="18" r="3" stroke="#8B5E83" strokeWidth="1.5" opacity="0.4" /><path d="M22 10l2-4 2 4" stroke="#8B5E83" strokeWidth="1.2" opacity="0.5" /></svg> },
  { id: "27", name: "The Bridge", codename: "MLO Partner Mgr", section: "Partnerships", accent: "#B07850", pattern: "wave-lines", tier: "Tier 2", status: "to-build",
    render: (s) => <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="6" y="22" width="12" height="18" rx="2" stroke="#B07850" strokeWidth="1.5" opacity="0.4" /><rect x="30" y="22" width="12" height="18" rx="2" stroke="#B07850" strokeWidth="1.5" opacity="0.4" /><path d="M18 26 Q24 14 30 26" stroke="#B07850" strokeWidth="2.5" fill="none" /><circle cx="24" cy="20" r="3" stroke="#B07850" strokeWidth="1.5" opacity="0.4" /><circle cx="22" cy="30" r="1.5" fill="#B07850" opacity="0.2" /><circle cx="26" cy="30" r="1.5" fill="#B07850" opacity="0.2" /><path d="M22 32h4" stroke="#B07850" strokeWidth="1" opacity="0.3" /></svg> },
];

export function BrandedIllustrationDemo({ params }: { params: { iconSize?: number; containerSize?: number; containerOpacity?: number; patternOpacity?: number } }) {
  const containerSize = params.containerSize ?? 88;
  const containerOpacity = params.containerOpacity ?? 0.08;
  const patternOpacity = params.patternOpacity ?? 0.07;
  const [filter, setFilter] = useState<"all" | "built" | "to-build">("all");

  const filtered = filter === "all" ? ALL_ILLUSTRATIONS : ALL_ILLUSTRATIONS.filter(i => i.status === filter);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)] flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-[var(--neutral-700)]">Branded Card Illustrations — {ALL_ILLUSTRATIONS.length} Total</span>
          <p className="text-[10px] text-[var(--neutral-400)]">{ALL_ILLUSTRATIONS.filter(i => i.status === "built").length} built, {ALL_ILLUSTRATIONS.filter(i => i.status === "to-build").length} to build</p>
        </div>
        <div className="flex gap-1">
          {(["all", "built", "to-build"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-2 py-1 text-[10px] rounded-md ${filter === f ? "bg-[var(--brand-primary)] text-white" : "bg-[var(--neutral-100)] text-[var(--neutral-600)]"}`}>
              {f === "all" ? "All" : f === "built" ? "Built" : "To Build"}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {filtered.map((illust) => {
          const PatternComp = PATTERNS[illust.pattern];
          return (
            <div key={illust.id} className="bg-white rounded-xl border border-[var(--neutral-100)] p-3 flex flex-col items-center">
              <div
                className="relative flex items-center justify-center overflow-hidden mb-2"
                style={{ width: containerSize, height: containerSize, borderRadius: 18, backgroundColor: `${illust.accent}${Math.round(containerOpacity * 255).toString(16).padStart(2, "0")}` }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 88 88" style={{ opacity: patternOpacity }}>
                  {PatternComp && <PatternComp accent={illust.accent} />}
                </svg>
                <div className="relative">{illust.render(48)}</div>
              </div>
              <p className="text-[11px] font-semibold text-[var(--foreground)] text-center">{illust.name}</p>
              <p className="text-[9px] text-[var(--neutral-500)] text-center">{illust.section}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="size-2.5 rounded-full" style={{ backgroundColor: illust.accent }} />
                <span className="text-[8px] text-[var(--neutral-400)] font-mono">{illust.accent}</span>
                {illust.status === "built" && <span className="text-[8px] text-[var(--success)]">✓</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dark variant */}
      <div className="px-4 pb-4">
        <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Dark Background Adaptation</p>
        <div className="bg-gradient-to-br from-[var(--neutral-800)] to-[var(--neutral-900)] rounded-xl p-4 grid grid-cols-6 gap-3">
          {ALL_ILLUSTRATIONS.slice(0, 6).map((illust) => {
            const PatternComp = PATTERNS[illust.pattern];
            return (
              <div key={illust.id} className="flex flex-col items-center">
                <div className="relative flex items-center justify-center overflow-hidden" style={{ width: 64, height: 64, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 88 88" style={{ opacity: 0.12 }}>
                    {PatternComp && <PatternComp accent={illust.accent} />}
                  </svg>
                  <div className="relative" style={{ opacity: 0.5 }}>{illust.render(36)}</div>
                </div>
                <p className="text-[8px] text-white/50 text-center mt-1">{illust.codename}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
