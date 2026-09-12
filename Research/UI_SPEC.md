# UI_SPEC.md
Design direction, made concrete. The brief is right that "make it premium" isn't actionable — here are actual values and rules.

---

## Typography

- **Two typefaces maximum.** A serif or high-contrast editorial sans for headings and company names (something in the character of a financial-publication masthead — e.g., a font like Tiempos, Söhne, or a similar editorial serif/grotesk; avoid anything that reads as a default SaaS font like Inter used everywhere at default weights), and a highly legible tabular-figure-capable sans for data (numbers, tables) — **tabular figures (`font-variant-numeric: tabular-nums`) are non-negotiable for any column of numbers**, or columns won't align and the whole "sophisticated tables" goal fails immediately.
- **Numeric hierarchy is the actual design system here.** The headline metric on a page (e.g., Revenue on the Overview page) should be meaningfully larger and heavier than secondary metrics, which should be larger than metadata (source labels, as-of dates). Three tiers is enough: hero number (~40-56px), standard metric (~20-24px), label/meta (~12-13px, muted color).
- **No more than 2 font weights per typeface in active use** (e.g., Regular + Semibold). Avoid a cascade of 4-5 weights, which reads as unstyled defaults rather than intentional.

## Color Philosophy

- **Restrained, near-monochrome base + one accent used sparingly.** A warm off-white or cool near-black background (pick one direction and commit — don't ship both a light and dark theme for V1, that's scope creep), text in a near-black/near-white with reduced-contrast greys for secondary content, and a single accent color reserved for interactive affordances (the ⓘ icon, active states, the LBO tool's key output numbers) and for exactly one semantic use: positive/negative directional numbers (revenue growth up vs. down, MOIC above/below a threshold). Do not assign a full traffic-light palette to every metric — this is what makes finance dashboards look like Finviz.
- **Explicitly avoid:** neon green, gradient fills, glassmorphism/blur panels, drop shadows beyond a 1-2px subtle elevation on hover states.
- **Peer comparison and chart colors:** use a small, deliberate set of 3-4 muted, desaturated hues (not the default Recharts/Chart.js rainbow palette) — assign one hue per company consistently across every chart in the app (e.g., Netflix is always the same muted red-adjacent tone everywhere it appears, Disney always the same muted blue, etc.) so the eye doesn't have to re-learn a legend on every page.

## Spacing & Layout

- Generous whitespace is doing real work here — minimum content margins should feel closer to an editorial long-form article than a dashboard. Target a max content width around 1100-1200px for reading-heavy sections (Business, explanations) and allow tables/charts to run wider within that container.
- **Subtle dividers, not cards.** The brief explicitly asks to avoid "excessive rounded cards." Prefer thin 1px hairline dividers between sections over boxed/shadowed cards. Where a contained element is genuinely needed (the LBO input panel, the explanation drawer), use minimal or no border-radius (0-4px) and a very subtle background tint rather than a shadow.
- **Precise data alignment.** Every table column of numbers is right-aligned with consistent decimal placement; every metric label is left-aligned; never center-align a number column.

## Charts

- Line and bar charts only where they earn their place (see the revenue/EBITDA bridge, the LBO debt-paydown schedule, the multi-year financial trend). No pie/donut charts — they're a poor fit for the "editorial, precise" tone and are explicitly weak at showing the kind of comparisons this product needs.
- **The Revenue → EBITDA → Net Income → Cash "bridge" is the single most important custom chart in the product** (referenced throughout PRODUCT_SPEC.md and COMPANY_RESEARCH.md). Build it as a waterfall chart: starting bar (Revenue), stepped bars descending through each deduction (cost of revenue, opex, D&A add-back for EBITDA, taxes/interest to Net Income), ending bar. Label each step's dollar delta directly on the chart, not in a separate legend.
- Peer comparison charts: horizontal bar charts for multiple comparisons (easier to read company names as labels than rotated x-axis labels).
- Sensitivity table (LBO tool): a shaded grid/heatmap, not a plain table — color intensity mapped to MOIC/IRR value using the single accent hue at varying opacity, not a full color spectrum.
- Motion: chart transitions on data change (e.g., moving an LBO slider) should animate the transition (300-500ms ease-out), not snap — this is the one place "meaningful animation" earns its keep per the brief's "fun through interaction, not gamification" goal.

## Tables

- Multi-year financial tables: sticky first column (metric name) on horizontal scroll for mobile, tabular-nums throughout, subtle row-hover highlight, no zebra-striping (reads as spreadsheet, not editorial).
- Comparison tables (Compare page, peer tables): the company being viewed (if applicable) or the "best" value in each row can carry a single subtle visual marker (e.g., a small dot or bolded figure) — but do not color-code entire rows/columns green/red across a comparison table, which undermines the restrained palette goal.

## The Explanation System ("ⓘ Explain This") — the most-reused component

- **Inline expandable panel, not a modal.** A modal interrupts the reading flow and is heavier than this interaction deserves. Clicking the ⓘ expands a panel directly below/beside the metric, pushing content down smoothly (animate height, not opacity-only).
- **Fixed three-part structure every time** (per PRODUCT_SPEC.md/FINANCE_GLOSSARY.md schema): What it means → Why it matters → This company. Never vary this structure between metrics — consistency here is what makes the pattern learnable across the whole site.
- **Always show the source and as-of date inside the panel**, small and muted, at the bottom — this is where "credible but not cluttered" sourcing lives (per the brief's Section 14), not as a separate footnote system cluttering the main page.
- **Where a documented source conflict exists** (Netflix EBITDA — see DATA_DICTIONARY.md), add a small secondary "sources disagree — why?" toggle inside the panel that reveals the conflict explanation. Don't surface this by default; it's a depth feature for curious users, not a first-read requirement.

## Interaction Design

- **LBO sliders:** drag updates all dependent outputs (MOIC, IRR, debt schedule, sensitivity grid) live, with the 300-500ms eased transition described above. Numeric input should also be directly typeable next to each slider for precision — sliders alone are imprecise for a finance-literate user who wants to type "8.5x" exactly.
- **Hoverable revenue/segment breakdowns:** hover a segment of a stacked bar or donut-free breakdown visual to see the exact figure and % of total in a small tooltip; tapping (mobile) should do the same via tap-and-hold or tap-to-toggle, not require hover.
- **Company comparison:** selecting companies to compare should feel like picking from a small, fixed set (max 3) — simple toggle chips, not a search/autocomplete pattern (there's no need for search across only 3 companies).
- **Every interaction must be traceable to a purpose stated in this document or PRODUCT_SPEC.md.** If a proposed animation or interaction doesn't map to one of: teaching a concept, revealing more precision on demand, or confirming a live calculation update — cut it.

## Responsive Behavior

- **Mobile-first for the Overview and Explanation system** — these will get the most mobile traffic (someone sharing/clicking a link from social media). The LBO tool's multi-slider layout needs a genuinely reworked mobile layout (stacked, not a squeezed side-by-side), not just a naive reflow.
- Multi-year tables: horizontal scroll with a sticky label column (above) rather than hiding columns on mobile — hiding data contradicts the "data-rich" goal.
- The sensitivity grid: on mobile, allow tap-to-select a single row or column to view in isolation rather than trying to render a full 5×5 grid at small width.
- Minimum tap target 44px for all interactive elements (sliders, ⓘ icons, comparison toggles) — standard accessibility floor, worth stating explicitly since some of these elements (the ⓘ icon especially) will be tempting to render small.

## Explicitly Avoid (restating the brief's list with the specific components it applies to)

| Avoid | Where this temptation will show up | Do instead |
|---|---|---|
| Giant hero section | Home page | One line stating the product's premise, then straight into the three company entry points |
| Rounded cards everywhere | Overview metric grid | Hairline dividers, minimal/no radius |
| Neon green / crypto aesthetic | Growth/positive-number styling | Muted, desaturated accent color, used sparingly |
| Excessive shadows/glassmorphism | LBO input panel, explanation drawer | Subtle background tint, 1px borders |
| Meaningless animation | Page transitions, hover states | Reserve animation for the chart-update and panel-expand interactions described above |
| "Finance bro" aesthetic (dark mode + neon charts + candlesticks) | Any chart styling decision | Editorial, muted, restrained — closer to a well-designed annual report than a trading terminal |
