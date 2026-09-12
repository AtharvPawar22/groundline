# QA_CHECKLIST.md
## Quality Assurance Checklist

Organized by the categories the brief specifies. Items are written as pass/fail
checks a reviewer can actually run, not aspirational statements. Where an item is
inherently a judgment call rather than a binary test, it's marked **[manual]**.

---

## 1. Finance accuracy

- [ ] Every `MetricDefinition.applicableTo` list matches `DATA_DICTIONARY.md` §2
      exactly — in particular, confirm no EV, EV/EBITDA, EV/Revenue, FCF, Net Debt, or
      standard EBITDA figure exists anywhere for JPMorgan (`schema-integrity.test.ts`
      should fail the build if one is added).
- [ ] JPMorgan's Valuation tab leads with P/E, P/B, and ROE/ROTCE, and its Bank
      Economics tab opens with the "why not a standard LBO" explanation before any
      interactive control — **[manual]** confirm the explanation appears before, not
      after or beside, the controls, so a reader can't skip straight to sliders
      without the framing.
- [ ] NVIDIA's LBO tab displays the "hypothetical sandbox" framing text
      (`LBO_SPEC.md` §7.1) above the fold, unmissable on page load — **[manual]**.
- [ ] Every `CalculatedMetric` traces to exactly one `formulaKey` in the registry
      (`tests/data/schema-integrity.test.ts`); no formula is implemented inline in a
      component (**[manual]** code review — grep for arithmetic operators combining
      two metric values outside `lib/finance/`).
- [ ] The LBO engine passes all five test cases in `LBO_SPEC.md` §8 exactly, including
      the value-creation bridge reconciling to the exit equity value to floating-point
      tolerance on every test case, not just the baseline.
- [ ] Net Debt and any other figure that can legitimately go negative (net cash
      positions) is displayed as negative, not floored at zero or displayed as an
      absolute value with a misleading positive sign.
- [ ] P/E display gracefully handles a negative or near-zero-earnings peer company
      (shows "N/M," not a nonsensical or negative multiple) — this applies to peer
      companies even though none of the three core companies currently trip this
      condition; test it explicitly rather than assuming it won't come up.
- [ ] Every place a GAAP and non-GAAP figure both exist for the same period (NVIDIA
      gross margin/EPS, Netflix operating income variants, JPMorgan's "reported" vs.
      "excluding significant items" net income), both are shown, both are labeled as
      such, and the reconciling items are named — not just a delta shown with no
      explanation.

## 2. Data accuracy

- [ ] Every `RawDataPoint` in `lib/data/companies/*.ts` has been checked against the
      primary source document directly (not against this package's summary tables)
      per `SOURCE_MAP.md` — **[manual]**, tracked via a per-figure sign-off, not just
      "the file compiles."
- [ ] All items flagged in `SOURCE_MAP.md` as "not yet pulled" or "locate at build
      time" have been resolved before shipping — the Netflix stock-split
      confirmation and the Dell 2013 closing-terms 8-K are named as hard blockers in
      their respective specs and must not ship as open questions.
- [ ] The Bank of America FY2025 net income discrepancy noted in `SOURCE_MAP.md`
      (two sources disagreeing, ~$29.1B vs. ~$30.5B) is resolved against the primary
      filing before the peer figure ships, with the resolution and reasoning recorded
      in the `RawDataPoint.notes` field.
- [ ] Every market-derived figure (price, market cap, EV, and every ratio built from
      them) displays a visible "as of [date]" caption at the point of display, not
      only in a global footer.
- [ ] The NVIDIA non-GAAP definitional break at Q1 FY2027 (stock-based compensation
      inclusion — `DATA_DICTIONARY.md` §5) is either handled by consistent restatement
      or visually flagged on any chart spanning that boundary — **[manual]** visually
      inspect the relevant trend chart specifically.
- [ ] No dataset value has a `fiscalPeriodLabel` without an explicit fiscal-year-end
      convention stated on first appearance per company (NVIDIA's January fiscal
      year-end vs. Netflix/JPMorgan's calendar year) — **[manual]**.

## 3. Citations

- [ ] Every `RawDataPoint` has a non-empty, real `SourceRef.url` (enforced by
      `schema-integrity.test.ts`).
- [ ] Every `CalculatedMetric`'s source popover renders the formula and links to its
      inputs' sources, rather than fabricating a direct citation for a number that
      was never itself filed anywhere.
- [ ] The Sources drawer (`PRODUCT_SPEC.md` §E) lists every primary document used for
      a given company's dataset, and every link in it resolves (no dead links) —
      **[manual]** spot-check a sample before ship, automate a link-checker if
      feasible.
- [ ] No business-description copy is copied verbatim from a 10-K or press release
      beyond a short, singular, clearly-marked quotation per source, per
      `TECH_ARCHITECTURE.md` §5 — **[manual]** review.

## 4. Formulas

- [ ] `formulas.test.ts` covers every formula listed in `DATA_DICTIONARY.md` §4,
      including boundary cases (negative net debt, negative/zero EPS).
- [ ] `lbo-engine.test.ts` covers all five `LBO_SPEC.md` §8 test cases with exact
      numeric assertions, not just "runs without throwing."
- [ ] `bank-economics-engine.test.ts` confirms the CET1 floor is a hard constraint in
      the engine itself, not only a UI slider limit that could be bypassed by a
      differently-built client.
- [ ] Sensitivity-grid cells are independently recomputed per cell (full projection
      re-run), not interpolated from the base case — **[manual]** spot-check two or
      three off-diagonal cells by hand against the engine's own test-case methodology.

## 5. Responsive layout

- [ ] Full layout verified at 1120px+, 768–1119px, and <768px per `UI_SPEC.md` §9 —
      **[manual]**, on real devices or accurate emulation, not just browser
      zoom.
- [ ] Minimum supported width (360px) renders without horizontal overflow anywhere
      on the site, including the sensitivity heatmap (which should scroll
      horizontally with sticky headers, not overflow the viewport) and the vitals
      strip (which should scroll horizontally, not wrap awkwardly).
- [ ] LBO input/output panel layout switches from side-by-side to stacked at the
      tablet breakpoint per `UI_SPEC.md` §9 — **[manual]**.
- [ ] The (i) explanation expansion behaves identically (in-place, not a modal) at
      every breakpoint — **[manual]**.

## 6. Accessibility

- [ ] Color contrast for `ink`/`ink-muted` text against `paper`/`paper-raised`
      meets WCAG AA at every defined type-scale size, explicitly checked at the
      smallest (13px caption) size, not just the largest.
- [ ] Every interactive element is a real semantic element (button/link), not a
      styled div with a click handler — **[manual]** code review plus an automated
      axe-core (or equivalent) pass.
- [ ] Visible 2px focus outlines present on every interactive element via keyboard
      navigation (Tab through an entire company page start to finish) —
      **[manual]**.
- [ ] `prefers-reduced-motion` collapses every transition to an instant state change
      site-wide — **[manual]**, toggle the OS setting and re-test the (i) expansion,
      LBO slider updates, and chart hover.
- [ ] The sensitivity heatmap and any other color-encoded data always shows the
      underlying numeral in addition to color — verified for every cell, not a
      sample.
- [ ] Every chart's underlying data is also available in a table (no chart-only
      information) — **[manual]**, cross-check each chart against its accompanying
      table.

## 7. Interaction behavior

- [ ] The (i) explanation expansion always renders exactly the fixed four-block
      order (What It Means → Why It Matters → Formula [if present] → This Company),
      and correctly *omits* (does not render an empty stub for) a missing Formula or
      Caveat block.
- [ ] Only one explanation expansion is open at a time per section (opening a second
      closes the first) per `PRODUCT_SPEC.md` §D.
- [ ] The "This company" text block always reflects the *currently displayed*
      period/value on the page, not a stale hardcoded example — **[manual]** spot
      check: change the displayed period (if a period selector is present) and
      confirm the explanation text updates accordingly, or confirm it's clearly
      scoped to the metric shown.
- [ ] LBO sliders update the output panel on every drag frame (or throttled no
      coarser than ~60ms), not only on mouse-up, per `UI_SPEC.md` §8 —
      **[manual]**, drag a slider slowly and watch for output lag or a
      "jump only at release" behavior, which would be a fail.
- [ ] The negative-CFADS warning banner (`LBO_SPEC.md` §4) actually fires when
      Test Case 4's assumption combination is entered manually through the live UI,
      not only in the unit test.
- [ ] Peer-panel row hover correctly highlights the corresponding chart series (or
      degrades gracefully with no chart present) per `PRODUCT_SPEC.md` §F.

## 8. Visual quality

- [ ] No drop shadows, gradients, or a single repeated border-radius applied
      uniformly regardless of element hierarchy anywhere on the site —
      **[manual]**, this is exactly the "SaaS-card kit" default the design spec
      instructs against.
- [ ] No tracked-out ALL-CAPS labels, no middot-joined metadata strings, no
      monospace-as-decoration data labels, no arrow-suffixed button text —
      **[manual]** sweep across every page.
- [ ] Fraunces appears only at 20px and above; IBM Plex Sans (with tabular figures
      in numeric contexts) used everywhere else — **[manual]** or automated font-
      usage audit.
- [ ] Each company's muted accent hue (`accent-nvda`/`accent-nflx`/`accent-jpm`)
      appears only in the specified limited contexts (active-tab underline, primary
      chart series, source-mark glyph) and never as a body-text-bearing background
      — **[manual]**.
- [ ] The site does not, on first impression, resemble Bloomberg, Yahoo Finance,
      Finviz, StockAnalysis, a generic SaaS dashboard, an AI-startup landing page, a
      finance game, or an Excel spreadsheet — **[manual]**, ideally judged by someone
      who hasn't been staring at the build for weeks; this is explicitly called out
      in the brief (§1) as a real requirement, not a throwaway line, and deserves a
      genuine fresh-eyes review pass, not a self-assessment.
- [ ] Overall impression check, run by a finance-literate reviewer: does the site
      read as "unusually clean and careful" (the brief's own success test, §21) —
      **[manual]**, and if the honest answer is no, that's a real finding, not a
      formality to wave through.

## 9. Performance

- [ ] Company pages are statically generated at build time (per
      `TECH_ARCHITECTURE.md` §1/§4.3), not fetching the full dataset client-side on
      every visit.
- [ ] Chart libraries and any heavier dependencies are code-split so the Home page
      (which needs none of them) doesn't pay their load cost.
- [ ] The LBO engine computation (including the sensitivity grid's per-cell re-run)
      completes fast enough to feel instantaneous during slider dragging on a
      mid-range device — **[manual]**, test on throttled CPU, not only a development
      machine.
- [ ] Market-data refresh (§4.3 of `TECH_ARCHITECTURE.md`) happens at build/
      scheduled-regeneration time, not as a client-side call blocking initial page
      render.

## 10. Scope discipline (final check against `PRODUCT_SPEC.md` §M)

- [ ] Confirm none of the explicitly out-of-scope items in `PRODUCT_SPEC.md` §M
      crept in during implementation — re-read that list against the shipped
      product line by line before calling V1 done. In particular: no user accounts,
      no fourth company, no live data pipeline, no DCF tool, no gamification of any
      kind, no generic blank-slate LBO calculator disconnected from the three real
      companies.
