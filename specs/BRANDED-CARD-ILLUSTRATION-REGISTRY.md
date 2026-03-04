# Rello Branded Card Illustration Registry

## Purpose

This is the master registry of all branded card illustrations used across the Rello platform. Each illustration is **permanently assigned** to a specific section and must never be swapped, reused, or substituted with generic icon library icons.

This document serves as the single source of truth for developers and designers creating or implementing branded card illustrations.

---

## 3-Layer Construction Reference

Every illustration follows the same 3-layer system:

| Layer | What It Is | Specs |
|-------|-----------|-------|
| **Layer 1 — Tinted Container** | Rounded rectangle background | 80–96px, border-radius 16–20px, accent color at 6–10% opacity |
| **Layer 2 — Decorative Pattern** | Geometric texture inside the container | 3–12% opacity. One of: concentric circles, dot grids, hexagons, orbital rings, dashed orbits, or wave lines |
| **Layer 3 — Primary Icon** | Custom SVG illustration | Card accent color at varied opacities for depth, minimum one micro-detail (sparkle, steam, pulse, ring, wisp, etc.) |

### Dark Background Adaptation

| Layer | Light Background | Dark Background |
|-------|-----------------|-----------------|
| Container | Accent color at 6–10% | White at 5–8% opacity |
| Pattern | Accent at 3–12% | Accent color at 10–20% |
| Icon | Filled accent, varied opacities | Stroke-only outline at 40–60% opacity |

### Background Pattern Families

To create visual grouping, apps in the same lifecycle phase share a background pattern:

| Phase | Pattern | Rationale |
|-------|---------|-----------|
| **Discovery & Lead Gen** | Orbital rings / dashed orbits | Outward expansion, finding leads |
| **Capture & Engagement** | Dot grids | Connection points, data collection |
| **Nurture & Education** | Concentric circles | Deepening relationship, growing inward |
| **Transaction & Closing** | Hexagons | Structure, precision, interlocking steps |
| **Post-Close & Retention** | Wave lines | Long-term flow, ongoing relationship |
| **Intelligence & Tools** | Concentric circles | Central knowledge, radiating insight |

---

## Accent Color Palette

Each card gets a unique accent color. Colors are grouped by warmth within lifecycle phases to maintain visual cohesion.

| Color Name | Hex | Phase Assignment |
|------------|-----|-----------------|
| Coral Rose | `#C9785D` | Discovery / Lead Gen |
| Burnt Sienna | `#B85C38` | Discovery / Lead Gen |
| Amber Gold | `#D4943A` | Discovery / Lead Gen |
| Dusty Mauve | `#A67B8A` | Discovery / Lead Gen |
| Terracotta | `#C27052` | Discovery / Lead Gen |
| Periwinkle | `#7B8EC2` | Capture / Engagement |
| Slate Blue | `#5A7EB5` | Capture / Engagement |
| Soft Indigo | `#6E6EA8` | Capture / Engagement |
| Lavender | `#8E7CC3` | Capture / Engagement |
| Teal | `#5B9EA6` | Nurture / Education |
| Sage Green | `#7A9E7E` | Nurture / Education |
| Forest | `#5E8C6A` | Nurture / Education |
| Deep Teal | `#3D7A80` | Transaction / Closing |
| Steel Blue | `#4A7B94` | Transaction / Closing |
| Plum | `#8B5E83` | Transaction / Closing |
| Warm Taupe | `#9E8B7E` | Post-Close / Retention |
| Dusty Rose | `#B07A7A` | Post-Close / Retention |
| Copper | `#B07850` | Post-Close / Retention |
| Soft Navy | `#5B6B8A` | Intelligence / Tools |
| Cool Gray | `#7A8A95` | Intelligence / Tools |

---

## Complete Illustration Registry

### EXISTING — Already Built (4)

These are live in the configurator. Do not modify their assignments.

---

#### 1. Five Before 9

| Field | Value |
|-------|-------|
| **Section** | Calls / Daily Outreach |
| **Accent Color** | Coral Rose `#C9785D` |
| **Pattern** | Concentric circles |
| **Icon Concept** | Play/dial button with forward motion lines |
| **Micro-Detail** | Small pulse ring on button corner |
| **Status** | ✅ Built |

---

#### 2. The Pulse

| Field | Value |
|-------|-------|
| **Section** | Active Deals / Pipeline |
| **Accent Color** | Periwinkle `#7B8EC2` |
| **Pattern** | Orbital arcs |
| **Icon Concept** | Heartbeat line with data point dot |
| **Micro-Detail** | Sparkle dot at the peak of the heartbeat |
| **Status** | ✅ Built |

---

#### 3. Morning Brew

| Field | Value |
|-------|-------|
| **Section** | Market Intel / Daily Digest |
| **Accent Color** | Coral Rose `#C9785D` |
| **Pattern** | Dot grid |
| **Icon Concept** | Coffee mug with liquid level indicator |
| **Micro-Detail** | Steam wisps rising from the cup |
| **Status** | ✅ Built |

---

#### 4. The Vault

| Field | Value |
|-------|-------|
| **Section** | Contacts / CRM Core |
| **Accent Color** | Sage Green `#7A9E7E` |
| **Pattern** | Concentric rings |
| **Icon Concept** | Target/compass crosshair with center dot |
| **Micro-Detail** | Outer ring pulse indicator |
| **Status** | ✅ Built |

---

### RELLO DASHBOARD CARDS — To Build

These are the primary dashboard section cards that appear on the MLO and Broker dashboards.

---

#### 5. The Launchpad

| Field | Value |
|-------|-------|
| **Section** | Today's Action Plan / Milo Daily Brief |
| **Accent Color** | Amber Gold `#D4943A` |
| **Pattern** | Orbital rings |
| **Icon Concept** | Rocket with upward trajectory, checklist overlay |
| **Micro-Detail** | Sparkle at rocket tip |
| **Tier** | Tier 1 Hero Card |
| **Status** | 🔲 To Build |

---

#### 6. The Thermometer

| Field | Value |
|-------|-------|
| **Section** | Pipeline Thermometer / Lead Scoring Overview |
| **Accent Color** | Deep Teal `#3D7A80` |
| **Pattern** | Hexagons |
| **Icon Concept** | Thermometer with graduated heat bands (cold→hot gradient implied) |
| **Micro-Detail** | Small flame icon at top of mercury |
| **Tier** | Tier 1 Hero Card |
| **Status** | 🔲 To Build |

---

#### 7. The Radar

| Field | Value |
|-------|-------|
| **Section** | Hot Leads / Priority Alerts |
| **Accent Color** | Burnt Sienna `#B85C38` |
| **Pattern** | Dashed orbits |
| **Icon Concept** | Radar sweep with blip dots at different distances |
| **Micro-Detail** | Pulse ring expanding from center |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 8. The Agenda

| Field | Value |
|-------|-------|
| **Section** | Today's Schedule / Calendar Sync |
| **Accent Color** | Slate Blue `#5A7EB5` |
| **Pattern** | Dot grid |
| **Icon Concept** | Calendar page with clock overlay, time blocks stacked |
| **Micro-Detail** | Small check mark on the top time block |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

### CONSUMER APPS — To Build

Each consumer app gets one branded illustration for its card on the dashboard and its own in-app identity.

---

#### 9. HomeReady — "The Compass"

| Field | Value |
|-------|-------|
| **Section** | HomeReady / Buyer Qualification |
| **Accent Color** | Teal `#5B9EA6` |
| **Pattern** | Concentric circles |
| **Icon Concept** | Compass needle pointing upward with gauge arc, house silhouette at north |
| **Micro-Detail** | Small sparkle at the needle tip |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 10. HomeStretch — "The Finish Line"

| Field | Value |
|-------|-------|
| **Section** | HomeStretch / Education & Closing Dashboard |
| **Accent Color** | Forest `#5E8C6A` |
| **Pattern** | Concentric circles |
| **Icon Concept** | Winding path with milestone dots leading to a flag/finish marker, book overlay |
| **Micro-Detail** | Sparkle at the finish flag |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 11. The Oven — "The Hearth"

| Field | Value |
|-------|-------|
| **Section** | The Oven / Post-Close Intelligence |
| **Accent Color** | Warm Taupe `#9E8B7E` |
| **Pattern** | Wave lines |
| **Icon Concept** | Oven/hearth with warm glow radiating outward, house shape in the opening |
| **Micro-Detail** | Heat waves rising from the top |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 12. Newsletter Studio — "The Press"

| Field | Value |
|-------|-------|
| **Section** | Newsletter Studio / Email Campaigns |
| **Accent Color** | Soft Indigo `#6E6EA8` |
| **Pattern** | Dot grid |
| **Icon Concept** | Envelope with layered content cards fanning out, send arrow |
| **Micro-Detail** | Small sparkle on the send arrow |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 13. Open House Hub — "The Welcome Mat"

| Field | Value |
|-------|-------|
| **Section** | Open House Hub / Offline Capture |
| **Accent Color** | Dusty Mauve `#A67B8A` |
| **Pattern** | Orbital rings |
| **Icon Concept** | Open door with welcome rays streaming outward, clipboard overlay |
| **Micro-Detail** | Small person silhouette stepping through |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 14. Harvest Home — "The Fields"

| Field | Value |
|-------|-------|
| **Section** | Harvest Home / Lead Discovery & Enrichment |
| **Accent Color** | Terracotta `#C27052` |
| **Pattern** | Dashed orbits |
| **Icon Concept** | Magnifying glass over a field/grid of data points with some highlighted, wheat/harvest accent |
| **Micro-Detail** | Sparkle on highlighted data points |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 15. Phone App — "The Signal"

| Field | Value |
|-------|-------|
| **Section** | Phone App / Conversations & Dialer |
| **Accent Color** | Amber Gold `#D4943A` |
| **Pattern** | Orbital rings |
| **Icon Concept** | Phone handset with sound wave arcs radiating outward, small speech bubble |
| **Micro-Detail** | Pulse ring expanding from the earpiece |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 16. Marketing Hub — "Command Center"

| Field | Value |
|-------|-------|
| **Section** | Marketing Hub / Unified Marketing |
| **Accent Color** | Lavender `#8E7CC3` |
| **Pattern** | Dot grid |
| **Icon Concept** | Mission control panel with multiple small screens/channels, central broadcast tower |
| **Micro-Detail** | Broadcast waves from the tower top |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 17. MarketIntel — "The Observatory"

| Field | Value |
|-------|-------|
| **Section** | MarketIntel / Market Data & Rates |
| **Accent Color** | Steel Blue `#4A7B94` |
| **Pattern** | Dot grid |
| **Icon Concept** | Telescope/observatory dome with data stream flowing through the lens, trend line |
| **Micro-Detail** | Star/sparkle at the focal point |
| **Tier** | Tier 2 Feature Card |
| **Note** | Morning Brew (Market Intel daily digest) is a separate card — this is the full MarketIntel app |
| **Status** | 🔲 To Build |

---

### RELLO BUILT-IN MODULES — To Build

These are features built directly into Rello (not standalone apps) that still need their own visual identity on the dashboard.

---

#### 18. Closing Copilot — "The Runway"

| Field | Value |
|-------|-------|
| **Section** | Closing Copilot / Transaction Pipeline & Closing Experience |
| **Accent Color** | Deep Teal `#3D7A80` |
| **Pattern** | Hexagons |
| **Icon Concept** | Runway/path converging to a single point (closing), document stack with checkmarks along the way |
| **Micro-Detail** | Key icon at the convergence point |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 19. Report Builder — "The Blueprint"

| Field | Value |
|-------|-------|
| **Section** | Report Builder / CMA, Buyer Reports, Market Snapshots |
| **Accent Color** | Soft Navy `#5B6B8A` |
| **Pattern** | Concentric circles |
| **Icon Concept** | Blueprint page with chart overlay, ruler edge, data visualization implied |
| **Micro-Detail** | Small pencil/edit icon at the corner |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 20. Referral Network — "The Web"

| Field | Value |
|-------|-------|
| **Section** | Referral Network / Connected Client Graph |
| **Accent Color** | Dusty Rose `#B07A7A` |
| **Pattern** | Wave lines |
| **Icon Concept** | Network graph with connected person nodes, lines radiating from center hub |
| **Micro-Detail** | Sparkle on a newly connected node |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 21. Lead Source Attribution — "The Tracker"

| Field | Value |
|-------|-------|
| **Section** | Lead Source Attribution / ROI Dashboard |
| **Accent Color** | Cool Gray `#7A8A95` |
| **Pattern** | Concentric circles |
| **Icon Concept** | Funnel with attribution paths flowing in from multiple sources, dollar sign at the bottom |
| **Micro-Detail** | Small arrow heads on each source path |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

### ENGINE IDENTITY CARDS — To Build

These appear in the Platform Admin / Super Admin context and represent the invisible engines.

---

#### 22. Milo Engine — "The Brain"

| Field | Value |
|-------|-------|
| **Section** | Milo Engine / AI Intelligence |
| **Accent Color** | Soft Navy `#5B6B8A` |
| **Pattern** | Concentric circles |
| **Icon Concept** | Abstract brain/circuit pattern with glowing center, neural pathways radiating outward |
| **Micro-Detail** | Pulse ring at the glowing center |
| **Tier** | Tier 2 Feature Card (Admin) |
| **Status** | 🔲 To Build |

---

#### 23. Content Engine — "The Mill"

| Field | Value |
|-------|-------|
| **Section** | Content Engine / Content Generation & Storage |
| **Accent Color** | Cool Gray `#7A8A95` |
| **Pattern** | Dot grid |
| **Icon Concept** | Gear/cog with content blocks (text lines, image placeholder) flowing through it |
| **Micro-Detail** | Small sparkle on an output block |
| **Tier** | Tier 2 Feature Card (Admin) |
| **Status** | 🔲 To Build |

---

#### 24. Journey Engine — "The Pathmaker"

| Field | Value |
|-------|-------|
| **Section** | Journey Engine / Nurture Orchestration |
| **Accent Color** | Sage Green `#7A9E7E` |
| **Pattern** | Concentric circles |
| **Icon Concept** | Branching path with decision diamonds, goal flag at the end |
| **Micro-Detail** | Small arrow at active decision point |
| **Tier** | Tier 2 Feature Card (Admin) |
| **Status** | 🔲 To Build |

---

#### 25. Property Engine — "The Foundation"

| Field | Value |
|-------|-------|
| **Section** | Property Engine / MLS, Matching, Neighborhood Intel |
| **Accent Color** | Steel Blue `#4A7B94` |
| **Pattern** | Hexagons |
| **Icon Concept** | House with data layers stacked underneath (like geological strata), map pin on top |
| **Micro-Detail** | Small radar sweep on the neighborhood data layer |
| **Tier** | Tier 2 Feature Card (Admin) |
| **Status** | 🔲 To Build |

---

### BROKER-SPECIFIC CARDS — To Build

These only appear on the Broker dashboard, not MLO.

---

#### 26. Team Performance Hub — "The Scoreboard"

| Field | Value |
|-------|-------|
| **Section** | Team Performance / Agent Productivity & Rankings |
| **Accent Color** | Plum `#8B5E83` |
| **Pattern** | Hexagons |
| **Icon Concept** | Leaderboard podium with bar chart bars rising, people silhouettes |
| **Micro-Detail** | Trophy/star at the top of the tallest bar |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

#### 27. MLO Partner Manager — "The Bridge"

| Field | Value |
|-------|-------|
| **Section** | MLO Partnerships / Lead Sharing & Partner Stats |
| **Accent Color** | Copper `#B07850` |
| **Pattern** | Wave lines |
| **Icon Concept** | Two buildings connected by a bridge/arc, handshake implied in the middle |
| **Micro-Detail** | Small data flow dots traveling across the bridge |
| **Tier** | Tier 2 Feature Card |
| **Status** | 🔲 To Build |

---

## Summary Table

| # | Name | Section | Accent | Pattern | Status |
|---|------|---------|--------|---------|--------|
| 1 | Five Before 9 | Calls | Coral Rose | Concentric circles | ✅ Built |
| 2 | The Pulse | Active Deals | Periwinkle | Orbital arcs | ✅ Built |
| 3 | Morning Brew | Market Intel Digest | Coral Rose | Dot grid | ✅ Built |
| 4 | The Vault | Contacts | Sage Green | Concentric rings | ✅ Built |
| 5 | The Launchpad | Today's Action Plan | Amber Gold | Orbital rings | 🔲 To Build |
| 6 | The Thermometer | Pipeline Scoring | Deep Teal | Hexagons | 🔲 To Build |
| 7 | The Radar | Hot Leads | Burnt Sienna | Dashed orbits | 🔲 To Build |
| 8 | The Agenda | Today's Schedule | Slate Blue | Dot grid | 🔲 To Build |
| 9 | The Compass | HomeReady | Teal | Concentric circles | 🔲 To Build |
| 10 | The Finish Line | HomeStretch | Forest | Concentric circles | 🔲 To Build |
| 11 | The Hearth | The Oven | Warm Taupe | Wave lines | 🔲 To Build |
| 12 | The Press | Newsletter Studio | Soft Indigo | Dot grid | 🔲 To Build |
| 13 | The Welcome Mat | Open House Hub | Dusty Mauve | Orbital rings | 🔲 To Build |
| 14 | The Fields | Harvest Home | Terracotta | Dashed orbits | 🔲 To Build |
| 15 | The Signal | Phone App | Amber Gold | Orbital rings | 🔲 To Build |
| 16 | Command Center | Marketing Hub | Lavender | Dot grid | 🔲 To Build |
| 17 | The Observatory | MarketIntel (full app) | Steel Blue | Dot grid | 🔲 To Build |
| 18 | The Runway | Closing Copilot | Deep Teal | Hexagons | 🔲 To Build |
| 19 | The Blueprint | Report Builder | Soft Navy | Concentric circles | 🔲 To Build |
| 20 | The Web | Referral Network | Dusty Rose | Wave lines | 🔲 To Build |
| 21 | The Tracker | Lead Source Attribution | Cool Gray | Concentric circles | 🔲 To Build |
| 22 | The Brain | Milo Engine | Soft Navy | Concentric circles | 🔲 To Build |
| 23 | The Mill | Content Engine | Cool Gray | Dot grid | 🔲 To Build |
| 24 | The Pathmaker | Journey Engine | Sage Green | Concentric circles | 🔲 To Build |
| 25 | The Foundation | Property Engine | Steel Blue | Hexagons | 🔲 To Build |
| 26 | The Scoreboard | Team Performance Hub | Plum | Hexagons | 🔲 To Build |
| 27 | The Bridge | MLO Partner Manager | Copper | Wave lines | 🔲 To Build |

---

### HOME STRETCH THREE-TRACK PROGRAM — Built (20)

These illustrations are used in the Home Stretch three-track program system. All built in `src/components/card-illustration/track-illustrations.tsx` and registered in `TRACK_ILLUSTRATIONS`.

#### Track Selection Cards

| # | Codename | Section | Accent | Pattern | Status |
|---|----------|---------|--------|---------|--------|
| 28 | The Sunrise | Daily Exercises Track | Amber Gold `#D4943A` | Concentric circles | ✅ Built |
| 29 | The Summit | Weekly Challenges Track | Slate Blue `#5A7EB5` | Orbital rings | ✅ Built |
| 30 | The Wanderer | Self-Paced Track | Sage Green `#7A9E7E` | Dot grid | ✅ Built |

#### Daily Track Cards

| # | Codename | Section | Accent | Pattern | Status |
|---|----------|---------|--------|---------|--------|
| 31 | The Gauge | Credit Score Education | Teal `#5B9EA6` | Concentric circles | ✅ Built |
| 32 | The Nest Egg | Savings Goals & Tips | Forest `#5E8C6A` | Concentric circles | ✅ Built |
| 33 | The Balancer | Debt-to-Income Ratio | Soft Indigo `#6E6EA8` | Dot grid | ✅ Built |
| 34 | The Vision Board | Dream Home Exploration | Coral Rose `#C9785D` | Orbital rings | ✅ Built |
| 35 | The Decoder | Mortgage Terms & Concepts | Steel Blue `#4A7B94` | Cross hatch | ✅ Built |
| 36 | The Ledger | Budget & Affordability | Periwinkle `#7B8EC2` | Diamond grid | ✅ Built |
| 37 | The Roadmap | Home Buying Timeline | Plum `#8B5E83` | Concentric circles | ✅ Built |
| 38 | The Flame | Streak & Motivation | Burnt Sienna `#B85C38` | Radial burst | ✅ Built |
| 39 | The Confetti | Milestone Celebration | Amber Gold `#D4943A` | Radial burst | ✅ Built |
| 40 | The Stack | Down Payment Progress | Deep Teal `#3D7A80` | Dot grid | ✅ Built |
| 41 | The Shield | Pre-Approval Readiness | Slate Blue `#5A7EB5` | Cross hatch | ✅ Built |
| 42 | The Village | Neighborhood Exploration | Dusty Mauve `#A67B8A` | Orbital rings | ✅ Built |

#### Weekly Track Cards

| # | Codename | Section | Accent | Pattern | Status |
|---|----------|---------|--------|---------|--------|
| 43 | The Compass Check | Weekly Credit Review | Teal `#5B9EA6` | Concentric circles | ✅ Built |
| 44 | The Milestone Jar | Weekly Savings Target | Sage Green `#7A9E7E` | Concentric circles | ✅ Built |
| 45 | The Weekly Ledger | Weekly Budget Review | Slate Blue `#5A7EB5` | Diamond grid | ✅ Built |
| 46 | The Explorer | Weekly Research Task | Lavender `#8E7CC3` | Orbital rings | ✅ Built |
| 47 | The Trophy Case | Weekly Challenge Completion | Terracotta `#C27052` | Radial burst | ✅ Built |

---

## Rules & Governance

1. **Assignments are permanent.** Once an illustration is assigned to a section, it never moves. If a section is deprecated (like Neighborhood Intel → Property Engine), the illustration is retired, not reassigned.

2. **No duplicates.** Every illustration is unique. If two sections seem similar, their icons must still be visually distinct.

3. **Pattern family enforcement.** New cards in a lifecycle phase must use that phase's assigned pattern family unless there's a compelling visual reason to deviate (document the exception here).

4. **Color uniqueness.** No two cards in the same dashboard view should share an identical accent color. Adjacent cards should have enough contrast to be distinguishable at a glance.

5. **Naming convention.** Every illustration gets a creative "codename" (The Vault, The Pulse, etc.) that reflects its function metaphorically. This name appears in code comments, design files, and this registry.

6. **Dark mode is required.** Every illustration must be built with both light and dark variants from the start. Never ship a light-only illustration.

7. **SVG requirements.** All illustrations must be delivered as clean SVGs with no embedded raster images, no inline styles (use classes), and viewBox set for scalability.

---

## Build Priority

### Phase 1 — Dashboard Essentials (build first)
Cards 5–8: The Launchpad, The Thermometer, The Radar, The Agenda
*These complete the core dashboard experience for both MLO and Broker views.*

### Phase 2 — Production Apps
Cards 9–12: The Compass (HomeReady), The Finish Line (HomeStretch), The Hearth (The Oven), The Press (Newsletter Studio)
*These are the apps already in production or near-production.*

### Phase 3 — Rello Modules
Cards 18–21: The Runway (Closing Copilot), The Blueprint (Report Builder), The Web (Referral Network), The Tracker (Lead Source Attribution)
*Built-in Rello features getting their visual identity.*

### Phase 4 — New Apps
Cards 13–17: The Welcome Mat (Open House Hub), The Fields (Harvest Home), The Signal (Phone App), Command Center (Marketing Hub), The Observatory (MarketIntel full app)
*New and upgrading apps in Wave 3-4 of the ecosystem roadmap.*

### Phase 5 — Admin & Broker
Cards 22–27: Engine identity cards + Broker-specific cards
*Lower priority since these are admin/internal or broker-only views.*

---

*Last Updated: March 4, 2026*
*Version: 2.0*
*Total Illustrations: 47 (24 built, 23 to build)*
