# RS Labs — art direction & design system

## 1. Three directions

### A. Working Drawings (selected)
- **Personality:** a studio that plans before it builds. Precise, calm, quietly confident.
- **Layout:** the page is a set of numbered drawing sheets (`SHEET 01 / WORK`). Asymmetric grids, a visible 12-column hairline grid in places, registration marks at section corners, annotation callouts that point at real things (words in the headline, parts of the product preview).
- **Type:** an expressive grotesque for display, a clean humanist sans for reading, and a monospace for labels, measurements and status — the "annotation layer".
- **Color:** midnight ink sheets, warm drafting-paper sheets for editorial content; electric blue marks what is interactive or live, violet marks what is still in development.
- **Interaction:** lines draw in, callouts appear once, hovering a component highlights its annotation. Motion explains structure, never decorates.

### B. Editorial Index
- **Personality:** a literary, magazine-like studio.
- **Layout:** huge serif headlines, an index of numbered entries, long-form columns, mostly off-white.
- **Type:** a high-contrast serif with a small sans.
- **Color:** almost monochrome; one accent.
- **Interaction:** almost none — hover underlines and page-turn transitions.
- **Why not:** reads more "agency portfolio" than "software company". It undersells the engineering and has no natural home for product UI.

### C. Signal Network
- **Personality:** systems and connectivity, extending the hexagon-and-nodes mark.
- **Layout:** full-bleed dark, an interactive node graph as the hero, sections as nodes.
- **Type:** geometric sans throughout.
- **Color:** dark with glowing blue and violet.
- **Interaction:** a physics-driven graph and a cursor that links nodes.
- **Why not:** it is the closest to the generic "dark tech + glowing particles" template, and it is heavy on mobile. The coming-soon page already used it.

### Decision
**A, Working Drawings.** An independent studio that will launch several products needs a system that frames each product as a documented piece of work, not as a glowing card. Sheets, annotations and status colors scale to any number of future products: each product gets its own case-study sheet with the same title block. The mark (hexagon, three nodes, a core) already reads as a technical drawing, so the direction grows out of the existing logo.

## 2. Brief
RS Labs builds useful software: its own products, plus SaaS, web, Android and AI work for others. The site should feel like opening a well-kept set of plans. A visitor should understand within one screen *what* RS Labs builds, see one real product in development, and know how to get in touch. No invented clients, numbers, team or history.

Signature decisions (and only these):
1. **Sheet numbering + title blocks** structure the page and the navigation.
2. **Annotations** that point at real content (headline words, product UI parts).
3. **Status color:** blue = live/interactive, violet = in development. Nothing else is colored.
4. **Paper sheets** for editorial reading (product case study, studio).

## 3. Tokens
| Token | Value | Use |
|---|---|---|
| `ink-950` | `#070B16` | page background |
| `ink-900` | `#0C1324` | raised dark surfaces |
| `ink-700` | `#1C2740` | hairlines on dark |
| `mist` | `#8C96AD` | secondary text on dark |
| `paper` | `#F2EEE5` | warm light sheets |
| `paper-line` | `#D9D3C4` | hairlines on paper |
| `graphite` | `#14161D` | text on paper |
| `signal` | `#3D7BFF` | live / interactive |
| `violet` | `#8B6CFF` | in development |

- **Type:** Bricolage Grotesque (display, 500–800), Instrument Sans (text), JetBrains Mono (labels). Scale (fluid): display `clamp(2.9rem, 7.4vw, 7.25rem)`, h2 `clamp(2rem, 4.6vw, 4rem)`, h3 `1.5rem`, body `1.0625rem/1.65`, label `0.75rem` mono uppercase `+0.14em`.
- **Spacing:** 4px base; section padding `clamp(5rem, 11vw, 9rem)`; gutter `clamp(1rem, 4vw, 3rem)`.
- **Borders:** 1px hairlines only; radius 2px (controls) or 0. No shadows except the product window.
- **Motion:** `ease-draw: cubic-bezier(.65,0,.35,1)` 900ms for lines; `ease-out: cubic-bezier(.2,.7,.2,1)` 600ms for entrances; 150ms for hover. All disabled under `prefers-reduced-motion`.
