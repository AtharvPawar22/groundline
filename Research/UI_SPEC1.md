# UI_SPEC.md
## Visual and Interaction Design Specification

This section exists because "make it premium and minimal" (brief §12) isn't
buildable as written — it has to become specific tokens, specific type choices, and
specific rules a build agent can implement without guessing. The choices below were
made deliberately *against* the visual defaults a generic AI-assisted build tends to
produce (a warm cream-and-terracotta palette, a near-black-and-neon-accent palette, a
broadsheet-hairline layout, or a SaaS rounded-card kit with one grey shadow on
everything) — none of those are wrong in the abstract, but none of them were chosen
*for* this brief, so none of them appear here.

---

## 1. DESIGN PRINCIPLES (the four things that make this feel like this product)

1. **The number is the hero, because the number is the content.** Most sites treat a
   big display number as a decorative device borrowed from someone else's landing
   page. Here it's the literal subject matter — this is the one brief where "a big
   number with a small label" is the *correct* signature move, not a default to
   avoid, because the entire product's premise is that the number deserves your full
   attention.
2. **Quiet everywhere except the numbers.** Chrome, navigation, and prose stay
   restrained and low-contrast so that when a number appears — in a vitals cell, a
   chart, an LBO output — it's the loudest thing on the screen without needing bold
   color or a card to announce it.
3. **Each company has a quiet, distinct identity without borrowing its real brand.**
   The three companies get three muted accent hues (below) used only for thin
   wayfinding marks (active-tab underline, chart line color, section rule) — enough
   that a screenshot of any tab tells you immediately which company you're on, never
   enough to look like a brand-mimicking skin.
4. **One deliberate motion moment, not motion everywhere.** Per the frontend-design
   guidance this package follows: hover/expand transitions that answer a person's
   action (opening an explanation, dragging an LBO slider) are welcome; scroll-
   triggered fade-ins on every section are not present anywhere on this site.

---

## 2. COLOR

### 2.1 Base palette (shared across the whole site)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F1F2EE` | Page background — a cool, slightly greyed-warm neutral (not the cream/terracotta-AI-default `#F4F1EA`) |
| `paper-raised` | `#FFFFFF` | Table rows, expanded explanation panels, input controls — anything sitting just above the page plane |
| `ink` | `#14181C` | Primary text — a deep blue-charcoal, not flat black and not the generic near-black `#0B0B0B`/`#111` |
| `ink-muted` | `#565C61` | Secondary text, captions, source citations |
| `ink-faint` | `#9AA0A4` | Disabled states, placeholder text, hairline dividers |
| `line` | `#DCDDD7` | Hairline rules and table borders — always 1px, never a drop shadow |
| `system-accent` | `#1F5C52` | The one shared interactive color: links, active states, primary buttons, the (i) glyph, positive/growth numeric encoding |
| `negative` | `#9A4B36` | Numeric decline/negative encoding — a muted brick red, deliberately distinct in hue from both `system-accent` and the Netflix company accent below so "down" is never confusable with "Netflix" |

### 2.2 Per-company accent (muted, evocative, never a literal brand-color lift)

| Company | Token | Hex | Character |
|---|---|---|---|
| NVIDIA | `accent-nvda` | `#3D5A3E` | Deep moss/circuit green — evokes hardware without using NVIDIA's actual saturated brand green |
| Netflix | `accent-nflx` | `#6E2A32` | Deep wine/oxblood — evokes the brand register without using Netflix's actual saturated red |
| JPMorgan | `accent-jpm` | `#233B57` | Deep ink-navy — evokes banking without using JPMorgan's actual brand blue |

Usage rule: a company accent may color a thin (2px) active-tab underline, a chart's
primary line/bar fill, and the small source-mark glyph on that company's pages. It
must **never** be used as a background fill behind body text (contrast risk) and
never covers more than roughly 5% of any viewport.

### 2.3 What was deliberately avoided

No gradients, anywhere. No drop shadows — depth is communicated with the `line`
hairline and the `paper`/`paper-raised` two-step background system, not `box-shadow`.
No rounded-card kit with a single repeated border-radius on every element regardless
of hierarchy (see §4 — radius is used purposefully, not uniformly). No neon or
saturated "fintech blue." No crypto-adjacent green-on-black.

---

## 3. TYPOGRAPHY

Two typefaces, clearly distinct roles, per the frontend-design guidance against
using a single neutral family for everything:

- **Display/numeric serif — Fraunces.** Used for every large standalone number (the
  vitals-grid headline figures, the LBO output panel's MOIC/IRR, the home page's
  per-company headline market-cap figure) and for page/section headlines. Fraunces
  has real editorial character (it's a "wonky," high-contrast serif built for
  display use) that signals "considered publication" rather than "spreadsheet" —
  which is exactly the register the brief asks for (§12: "editorial," not "Excel
  spreadsheet in a browser"). Use its optical-size axis at large sizes; do not use it
  below 20px.
- **UI/body sans — IBM Plex Sans.** Used for all body copy, table cells, labels,
  navigation, buttons, and form controls. Chosen over the more generic default
  (Inter) for its slightly technical, engineered character, which fits a
  data-density product without looking like a marketing site. Numerals must be set
  with tabular (fixed-width) figures wherever numbers appear in a column — this is a
  functional requirement, not a style preference, since misaligned decimal points in
  a financial table are a real credibility problem.

### Type scale (base 16px, ratio ~1.25)

| Role | Size / line-height | Weight | Typeface |
|---|---|---|---|
| Display number (hero figure) | 56px / 1.05 | 400 (Fraunces has enough contrast at 400 that bold is rarely needed) | Fraunces |
| Section headline (H1) | 32px / 1.15 | 500 | Fraunces |
| Subsection headline (H2) | 22px / 1.25 | 500 | Fraunces |
| Table headline number | 28px / 1.1 | 400 | Fraunces, tabular figures |
| Body | 16px / 1.55 | 400 | IBM Plex Sans |
| Small / caption / source text | 13px / 1.4 | 400 | IBM Plex Sans |
| Table cell (numeric) | 15px / 1.4 | 500, tabular figures | IBM Plex Sans |
| Labels/nav | 14px / 1.3 | 500 | IBM Plex Sans |

**Explicitly avoided:** tracked-out ALL-CAPS labels anywhere (the brief's own list of
things to avoid, and independently a known generic-AI tell); middot-joined metadata
strings ("A · B · C"); a monospace face used decoratively for labels (tabular figures
within IBM Plex Sans solve the alignment problem without reaching for a "data" font
as a costume); arrows appended to link/button text.

Line length capped at ~72 characters for body prose (per Elements-of-Typographic-
Style guidance referenced in the design skill).

---

## 4. LAYOUT AND SPACING

- 8px base spacing unit; all margins/padding are multiples of it (8/16/24/32/48/64).
- Content max-width 1120px, centered, with generous outer margin at desktop widths —
  the "quiet, editorial" feel comes partly from not filling the full viewport width
  with dense grid cells the way a trading terminal does.
- **Left-aligned throughout**, including numeric vitals grids (each cell
  left-aligns its label and its number rather than centering) — centered stat blocks
  are a SaaS-marketing convention this product deliberately avoids; left alignment
  reads as a ledger/report, which is the correct register here.
- Border-radius used purposefully, at exactly two values, not one blanket radius on
  everything: `4px` on small interactive controls (buttons, input fields, the source
  popover) and `0px` (hard corner) on data tables and chart containers — the hard
  corner on tabular content is itself a small, intentional signal that "this is a
  precise data object," distinct from the softer controls around it.
- Dividers between sections are single 1px `line`-colored hairlines with generous
  (48px+) surrounding whitespace — never a heavy rule, never a decorative gradient
  divider.

---

## 5. THE VITALS STRIP AND METRIC CELLS

Each metric cell (in the Overview vitals grid, the Financials table, etc.) has this
fixed internal structure, left to right / top to bottom:
```
Label (14px, ink-muted, sentence case — never ALL CAPS)  [i]
Value (28–56px depending on context, Fraunces, tabular figures, ink)
Period/as-of caption (13px, ink-faint)  [source mark, if applicable]
```
The (i) glyph sits immediately after the label, inline, at the same visual weight as
the label — not a floating icon in a corner, so it reads as part of the label rather
than a decorative badge.

---

## 6. CHARTS

- Line and bar charts use the subject company's accent color as the primary series;
  peer-comparison series use `ink-muted` at reduced opacity so the subject company is
  always visually dominant.
- No 3D effects, no gradient fills under line charts, no drop shadows on bars.
- Gridlines: horizontal only, `line` color, very light — vertical gridlines are
  omitted (the x-axis labels themselves provide enough structure).
- Axis labels in IBM Plex Sans, 13px, `ink-muted`.
- Hover state: a thin vertical crosshair in `ink`, with a small tooltip in
  `paper-raised` showing the exact value in tabular Fraunces numerals — this is the
  moment where the display serif appears *inside* a chart, reinforcing that the
  number, not the chart chrome, is what matters.
- The LBO value-creation bridge is a waterfall chart: each segment (EBITDA growth,
  multiple change, debt paydown, fees) gets its own fixed color from a small
  four-color qualitative palette (not the company accent, which is reserved for
  single-series charts) — positive segments in `system-accent`, negative segments in
  `negative`, fees always shown as a distinct neutral grey regardless of sign, so a
  reader learns to read the same bridge chart the same way on every company page.
- Sensitivity-grid heatmap: a single-hue sequential scale built from `system-accent`
  (light tint → full saturation), never a red-to-green diverging scale — a diverging
  red/green heatmap is the single most overused financial-dashboard cliché and also
  reads badly for the ~8% of users with red-green color-vision deficiency; a
  single-hue scale plus the actual numeral in each cell (always shown, never
  color-only) solves both problems.

---

## 7. TABLES

- Right-aligned numeric columns, left-aligned label/text columns — standard
  financial-table convention, non-negotiable.
- Tabular (fixed-width) figures throughout, so decimal points align down a column.
- Zebra striping is **not** used (it reads as spreadsheet-generic); row separation
  comes from generous 12–16px vertical padding plus a hairline `line` border only
  every fifth row on long tables, to aid horizontal scanning without visual noise.
- Period headers (column headers for quarterly/annual data) are sticky on scroll for
  any table taller than the viewport.

---

## 8. INTERACTIONS (implementation notes — see `PRODUCT_SPEC.md` §D/F for the "what
and why"; this section is the "how it looks and moves")

- (i) metric expansion: expands downward in place, 200ms ease-out height transition,
  no accompanying fade — a height transition alone reads as "this content was always
  there, just hidden," which is the right feeling; combining it with a fade/slide
  adds motion without adding clarity.
- Source popover: appears on click adjacent to the source-mark glyph, no transition
  needed beyond a simple 100ms opacity fade (it's a small, low-stakes disclosure, and
  doesn't need the same weight of motion as the explanation expansion).
- LBO sliders: the connected numeric output panel updates on every drag-frame (not
  only on release) — this immediacy is the entire pedagogical point of the tool (see
  `PRODUCT_SPEC.md` §F), so any implementation that only recalculates on
  mouse-up is a functional regression, not an acceptable performance shortcut.
  If recalculation cost genuinely requires throttling, throttle to no coarser than
  ~60ms, not to "on release."
- Peer-panel row hover: the hovered peer's row gets a `paper-raised` background and
  its corresponding series (if shown in an adjacent chart) is highlighted at full
  opacity while other series dim — a linked-highlight pattern, implemented once as a
  shared component, not duplicated per page.
- Focus states: every interactive element (including the (i) glyphs, which are
  real buttons, not divs with a click handler) gets a visible 2px `system-accent`
  focus outline, offset 2px from the element — required for keyboard navigation, not
  optional polish.
- `prefers-reduced-motion` is respected globally: all transitions above collapse to
  an instant state change (no animation, not just a faster one) when the user's OS
  preference requests it.

---

## 9. RESPONSIVE BEHAVIOR

- Breakpoints: 1120px+ (desktop, full layout as specced above), 768–1119px (tablet —
  vitals grid drops from 4 columns to 2, LBO inputs move above outputs instead of
  beside them), <768px (mobile).
- Mobile-specific rules:
  - The condensed "vitals strip" in the company header becomes horizontally
    scrollable rather than wrapping (wrapping would push the tab bar too far down
    the page on a small screen).
  - Charts render at a fixed aspect ratio with touch-drag replacing hover for the
    crosshair tooltip.
  - The sensitivity-grid heatmap becomes horizontally scrollable with the row/column
    headers sticky, rather than shrinking cell text below legibility.
  - The (i) explanation expansion behaves identically to desktop (in-place, not a
    modal) — this is a case where it would be tempting to switch to a bottom-sheet
    modal pattern on mobile, and that temptation should be resisted, because it
    would make the interaction inconsistent between platforms for no real benefit;
    in-place expansion works fine at mobile widths.
- Minimum supported viewport width: 360px.

---

## 10. ACCESSIBILITY BASELINE

- Color contrast: `ink` on `paper` and `paper-raised` exceeds WCAG AA for body text
  at all defined sizes; `ink-muted` is checked against AA specifically for the
  13px caption size (the smallest text on the site), not just the larger sizes.
- Every chart's data is also available in the underlying full data table (per
  `PRODUCT_SPEC.md` Financials tab spec — chart-first, table available underneath) so
  no information is chart-only/color-only.
- All interactive elements are real semantic elements (`<button>`, not `<div
  onClick>`), keyboard-operable, with visible focus states per §8.
- The sensitivity heatmap's single-hue scale (§6) is itself an accessibility choice,
  not just an aesthetic one.
