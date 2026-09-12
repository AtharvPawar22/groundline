# QA_CHECKLIST.md

## Finance Accuracy

- [ ] Every headline figure (Revenue, Net Income, Market Cap, etc.) on every company's Overview page matches its `SourcedValue` record exactly — no rounding drift between the data layer and the display.
- [ ] NVIDIA's fiscal-year labeling is unambiguous everywhere it appears — every NVDA period shows its actual period-end date, not just "FY2026," per the fiscal-period rule in DATA_DICTIONARY.md.
- [ ] JPMorgan's Enterprise Value, EV/EBITDA, and EV/Revenue are **not** displayed as ordinary metrics — confirm the Valuation page renders the explanatory card treatment instead, per DATA_DICTIONARY.md and COMPANY_RESEARCH.md.
- [ ] The Netflix EBITDA/EV-EBITDA figure shown as primary matches the documented decision in DATA_DICTIONARY.md (stockanalysis.com-consistent methodology, content amortization not added back) — and the GuruFocus conflict figure appears only inside the "sources disagree" toggle, never as a second primary number competing for attention.
- [ ] LBO calculation engine passes the Netflix reference-case regression test (MOIC ≈ 3.4x, IRR ≈ 27.8% at the documented default inputs) exactly as specified in LBO_SPEC.md and TECH_ARCHITECTURE.md.
- [ ] LBO value-creation attribution sums correctly (EBITDA growth + multiple change + debt paydown = total value creation) across at least 10 different randomized valid input combinations, not just the default case.
- [ ] JPMorgan's Excess Capital / Dividend Capacity module does not display a computed dollar figure unless the management target CET1 ratio input has been verified against a primary JPMorgan source (per the explicit block in LBO_SPEC.md) — confirm this hasn't been shipped with a placeholder or guessed target.
- [ ] Every disclosed one-off/non-GAAP adjustment referenced in the data (e.g., JPMorgan's Q4 2025 Apple card portfolio reserve) is described accurately and matches the company's own characterization, not a simplified/distorted version of it.

## Data Accuracy & Citations

- [ ] Every `SourcedValue` has a populated `source` object with a real, working URL and an accurate `accessedOrFiledDate` — no empty or placeholder source fields anywhere in the shipped dataset.
- [ ] Every figure flagged `needs_verification` in this research pack (AMD's derived market cap, Netflix's exact FY2025 year-end debt/cash figures, JPMorgan's target CET1 ratio, Wikipedia-sourced M&A background) has been either replaced with a verified primary-source figure or still carries `confidence: needs_verification` visibly in the source drawer — never silently upgraded to look verified without actually re-sourcing it.
- [ ] All three documented source conflicts (Netflix EBITDA, NVIDIA P/E, JPMorgan market cap — see DATA_DICTIONARY.md) are represented with both figures and a stated resolution rationale, not silently resolved with no trace.
- [ ] No figure anywhere in the shipped product is invented, interpolated, or "reasonably estimated" without an explicit `needs_verification` flag and disclosure — this includes peer figures, which are easy to under-scrutinize relative to the three flagship companies.
- [ ] Every "as of [date]" label displayed in the UI matches the actual `periodId`/date on the underlying `SourcedValue` — a stale or mismatched date label is a credibility failure even if the number itself is correct.
- [ ] The `/sources` page accurately lists every primary document used, with working links, organized by company (mirrors SOURCE_MAP.md).

## Formulas

- [ ] Enterprise Value = Market Cap + Total Debt − Cash, verified against at least one hand-calculated example per company (NVDA, NFLX) using the actual shipped figures.
- [ ] EV/EBITDA and EV/Revenue calculated metrics recompute correctly if the underlying `SourcedValue`s are updated — i.e., these are genuinely derived, not separately hardcoded numbers that happen to currently match.
- [ ] P/E = Market Cap ÷ Net Income (or equivalent per-share form) verified against JPMorgan's and NVIDIA's shipped figures.
- [ ] LBO engine's 18-step calculation sequence (LBO_SPEC.md) is implemented in the documented order — spot-check that beginning-of-year debt balances (not average or ending balances) are used for interest expense, matching the documented anti-circularity simplification.
- [ ] All percentage figures are stored and computed as decimals internally (e.g., 0.295) and only converted to "29.5%" display format at the formatting layer — confirm no accidental double-conversion (e.g., displaying "2950%").

## Responsive Layout

- [ ] LBO simulator's slider panel is usable (not cramped, no overlapping tap targets) at a 375px mobile viewport width.
- [ ] Multi-year financial tables scroll horizontally with a sticky metric-name column on mobile, per UI_SPEC.md — confirm no columns are silently hidden.
- [ ] The sensitivity grid degrades to the tap-to-select single row/column view on mobile per UI_SPEC.md, rather than rendering a squeezed illegible 5×5 grid.
- [ ] The Compare page's side-by-side layout reflows sensibly at mobile width (stacked or horizontally scrollable, not compressed to illegibility) for both 2 and 3 selected companies.

## Accessibility

- [ ] All interactive elements (ⓘ icons, sliders, comparison toggles, tab navigation) meet the 44px minimum tap target specified in UI_SPEC.md.
- [ ] Color is never the sole carrier of meaning — the positive/negative directional accent color used for growth figures is paired with a +/− sign or explicit label, not color alone (relevant given the single-accent-color palette described in UI_SPEC.md).
- [ ] All charts (BridgeChart, TrendChart, PeerBarChart, SensitivityGrid) have a text-accessible equivalent (e.g., an underlying data table available to screen readers, or meaningful `aria-label`s summarizing the key figures) — a purely visual SVG chart with no fallback fails this.
- [ ] Slider inputs (LBO tool) are operable via keyboard, not mouse/touch-drag only, and the paired numeric input (per UI_SPEC.md's "always typeable next to each slider" rule) provides the accessible alternative input path.
- [ ] Sufficient color contrast for body text and metric labels against the chosen background, per WCAG AA, in the final near-black/near-white palette chosen from UI_SPEC.md.

## Interaction Behavior

- [ ] ExplainPanel expands/collapses smoothly (height-animated, not opacity-only, per UI_SPEC.md) and does not shift unrelated page content unexpectedly when opened.
- [ ] LBO slider changes update all dependent outputs (MOIC, IRR, debt schedule chart, sensitivity grid) live and consistently — no stale numbers left on screen after a slider move.
- [ ] The Debt/EBITDA slider is clamped so it cannot exceed the current Entry Multiple value, per the LBO_SPEC.md edge-case validation rule — confirm this is enforced in the UI, not just documented.
- [ ] The "cash flow shortfall" edge-case state (interest expense exceeding pre-interest cash flow) is visually distinguished from a normal state and from an invalid-input error state, per LBO_SPEC.md.
- [ ] Comparison company selection is capped at 3 and cannot be set to fewer than 2.

## Visual Quality

- [ ] No component in the shipped product uses default Tailwind gray/blue palette values — confirm the custom design tokens from UI_SPEC.md are actually wired into `tailwind.config`, not just documented and then ignored during implementation.
- [ ] Tabular figures (`tabular-nums`) are applied to every column of numbers in every table and metric grid — spot check at least one multi-year financials table for column misalignment.
- [ ] No pie/donut charts, no default rainbow chart palettes, no drop-shadow-heavy cards anywhere in the shipped product — direct violations of UI_SPEC.md's explicit avoid-list.
- [ ] Company-to-color mapping is consistent across every chart the company appears in (Netflix is always the same hue in the Compare page, the Valuation peer chart, etc.).

## Performance

- [ ] All company/glossary/compare pages are statically generated at build time (confirm via `next build` output), not server-rendered per-request, per the TECH_ARCHITECTURE.md recommendation.
- [ ] LBO calculation engine runs fast enough for live slider updates with no perceptible lag (it's simple arithmetic — if this is slow, something is architecturally wrong, e.g., recalculating the full dataset instead of just the LBO engine on each tick).
- [ ] No client-side data fetching for content that's already known at build time — the entire flagship dataset is static, so any runtime fetch for company data is a sign the architecture wasn't followed.

## Final Pre-Ship Gate

- [ ] Every one of the three documented "do not build" items that were tempting to sneak back in during implementation (a fourth company, a live API, a fabricated historical LBO deal — see PRODUCT_SPEC.md Section M) is confirmed absent from the shipped product.
- [ ] A finance-literate reviewer (even informally) has looked specifically for wrong or misleading causal claims — not just wrong numbers — since narrative/causal errors are the harder-to-catch failure mode this kind of product is exposed to, per the framing discussed earlier in this project's development.
