# TECH_ARCHITECTURE.md

## Stack recommendation — evaluated, not assumed

The brief proposed Next.js + TypeScript + Tailwind + a charting library + local structured data. **Recommendation: keep this, with specifics locked in below.** Reasoning:

- **Next.js (App Router) + TypeScript** — no real alternative case for a small, content-heavy, mostly-static site with a handful of interactive islands (the LBO tool, the explanation panels). Avoid the temptation to reach for a heavier framework or a separate backend service — there's no backend need here at all for V1.
- **Static generation, not server rendering, for the company/glossary/compare pages.** All data is a versioned local dataset (see DATA_DICTIONARY.md) — there's no reason to hit anything at request time. Use `generateStaticParams` for the three company routes. This also means hosting can be trivial (Vercel or any static host) and there is zero live-data reliability risk, which directly satisfies the brief's "carefully researched and versioned dataset is preferable to unreliable live data" instruction.
- **Tailwind CSS**, but with a real design-token configuration (typography scale, color palette, spacing scale from UI_SPEC.md written into `tailwind.config` as custom values) — not default Tailwind grays/blues, which is exactly the "generic SaaS" look the brief wants to avoid.
- **Charting: a combination, not one library for everything.** Recharts for standard line/bar charts (financial trend, peer comparison bars) since it composes cleanly with React and is lightweight. The custom waterfall/bridge chart (Revenue → EBITDA → Net Income → Cash) should be **hand-built SVG**, not forced into a generic charting library — it's a one-off, highly specific visual and generic libraries fight you on exactly this kind of custom step chart.
- **No database.** Data lives in versioned TypeScript/JSON modules under source control, matching the schema in DATA_DICTIONARY.md. This is the correct choice at this scale — a database adds operational complexity with zero benefit for three companies' worth of largely-static data.
- **No live market-data API for V1**, per PRODUCT_SPEC.md's do-not-build list. If a future version wants a "last verified" refresh workflow, that should be a **build-time script that updates the local dataset**, run manually/periodically, not a runtime API dependency — this preserves the reliability and citation-integrity properties this whole spec is built around.

## Folder Structure

```
/app
  /                          → Home
  /company/[ticker]
    /page.tsx                → Overview (default tab)
    /business/page.tsx
    /financials/page.tsx
    /valuation/page.tsx
    /lbo/page.tsx
    /terms/page.tsx
  /compare/page.tsx
  /glossary/page.tsx
  /sources/page.tsx

/components
  /explanation
    ExplainPanel.tsx          → the ⓘ system, single shared implementation
    ExplainIcon.tsx
  /metrics
    MetricDisplay.tsx         → renders a SourcedValue with correct formatting + unit + as-of label
    MetricGrid.tsx
  /charts
    BridgeChart.tsx           → hand-built SVG waterfall (Revenue→EBITDA→NetIncome→Cash)
    TrendChart.tsx            → Recharts wrapper, multi-year line/bar
    PeerBarChart.tsx          → Recharts wrapper, horizontal comparison bars
    SensitivityGrid.tsx       → LBO sensitivity heatmap
  /lbo
    LBOSimulator.tsx          → full slider-driven tool (NVDA/NFLX)
    LBOInputSlider.tsx        → shared slider+numeric-input component (see UI_SPEC.md)
    BankExcessCapitalModule.tsx → JPM-specific alternative module
    LBOExplainerBanner.tsx    → NVDA scale disclaimer / JPM not-applicable explainer
  /tables
    FinancialsTable.tsx       → sticky-column multi-year table
    ComparisonTable.tsx
  /layout
    CompanyNav.tsx            → the Overview/Business/Financials/Valuation/LBO/Terms tab nav

/lib
  /data
    companies.ts               → Company records
    periods.ts                 → Period records
    sourced-values/
      nvda.ts
      nflx.ts
      jpm.ts
      peers.ts                 → AMD, Broadcom, Disney, Comcast, BAC, WFC, GS
    metrics.ts                  → Metric definitions (id, definition, whyItMatters, formula, applicableTo, caveat)
    explanations.ts             → ExplanationBlock records (or generated from metrics.ts + sourced-values, see note below)
    peers.ts                    → Peer records with rationale/keyDifference
    lbo-assumptions.ts          → LBOAssumptions per company
  /calc
    metrics.ts                  → pure functions: computeEnterpriseValue(), computeEvEbitda(), etc. — one function per CalculatedMetric
    lbo-engine.ts                → the full 18-step calculation from LBO_SPEC.md, pure and fully unit-testable
    lbo-engine.test.ts           → unit tests, including the Netflix worked-example reference case as a regression test
  /format
    currency.ts, percent.ts, ratio.ts   → consistent number formatting, tabular-nums aware

/content
  glossary-terms.md (or .ts)   → source of truth for glossary entries; the glossary page and every ExplainPanel
                                   pull from this SAME data, never a duplicated copy (per the brief's Section 6/17
                                   instruction not to hand-maintain scattered content)
```

**Important architectural rule, worth stating explicitly:** the Glossary page and the inline ⓘ explanation panels must read from **the same underlying content records**, not separately maintained copies. This was an explicit trap in the brief's own examples (Section 6 vs. Section 17's `FINANCE_GLOSSARY.md` vs. the inline explanation schema in Section 2/6) — build one `ExplanationBlock`/glossary-term data source and derive both surfaces from it.

## Component Architecture Notes

- `MetricDisplay` is the only component allowed to render a raw number pulled from `SourcedValue`/`CalculatedMetric`. It handles unit formatting, the "as of [date]" label, and renders the `ExplainIcon` next to itself automatically based on whether an `ExplanationBlock` exists for that metric. This centralization is what makes the "never hardcode a number into a component" rule in DATA_DICTIONARY.md actually enforceable — if every number goes through this one component, a code reviewer can grep for raw numeric literals in `/components` and `/app` and flag any that show up outside test files.
- `LBOSimulator` should hold slider state locally (no need for global state management — Redux/Zustand would be over-engineering for a single-page tool) and call `lib/calc/lbo-engine.ts` on every change. Debounce is not necessary at this scale (the calculation is simple arithmetic, not expensive) — update live on every slider tick.
- `BankExcessCapitalModule` should visually reuse `LBOInputSlider` and the general panel layout of `LBOSimulator` so JPMorgan's page doesn't feel like a different product, even though the underlying calculation is entirely different (see LBO_SPEC.md).

## Calculation Modules — testing structure

`lib/calc/lbo-engine.ts` is the highest-risk module in the codebase (it's the one place a math error would be genuinely embarrassing in public, per the "being wrong in public" risk this kind of project carries). Test structure:

1. **Reference case regression test:** the exact Netflix worked example in LBO_SPEC.md (Entry EBITDA $13.3B, 10x entry, 6x Debt/EBITDA, 8% rate, 5yr hold, 12% growth, 60% conversion) must produce MOIC ≈ 3.4x and IRR ≈ 27.8% (within a small tolerance for rounding). If this test fails after any change to the engine, treat it as a blocking bug.
2. **Identity test:** for every randomized/generated set of valid inputs, assert `EBITDA Growth Contribution + Multiple Change Contribution + Debt Paydown Contribution ≈ Total Value Creation` (LBO_SPEC.md step 15-18 check) — this is a property-based test, not a fixed-case test, and it's the single strongest guard against a subtle formula bug.
3. **Edge case tests:** the four scenarios listed at the end of LBO_SPEC.md (interest exceeding cash flow, Debt/EBITDA clamped to Entry Multiple, boundary hold periods, negative growth) each need an explicit test asserting the engine doesn't throw, doesn't produce a negative debt balance, and doesn't produce NaN/Infinity in MOIC or IRR.
4. **Metric calculation tests** (`lib/calc/metrics.ts`): each `CalculatedMetric` function (Enterprise Value, EV/EBITDA, EV/Revenue, Net Debt) gets a unit test against the real Netflix/NVIDIA figures documented in COMPANY_RESEARCH.md as known-good expected outputs.

## Build Sequence (detailed — expands PRODUCT_SPEC.md Section K)

1. `lib/data` schema + fully populated, cited data for all three companies and all peers (from DATA_DICTIONARY.md/SOURCE_MAP.md/COMPANY_RESEARCH.md). **No UI work starts before this is complete and reviewed** — every subsequent step depends on this being right.
2. `lib/calc/metrics.ts` + tests.
3. `lib/calc/lbo-engine.ts` + tests, validated against the worked example in LBO_SPEC.md, **before any LBO UI is built.**
4. `MetricDisplay` + `ExplainPanel`/`ExplainIcon` — build and visually finalize in isolation (e.g., in a scratch route or Storybook-style harness) since every other page depends on these.
5. Netflix Overview page end-to-end, to final visual polish — the reference implementation the other two companies replicate.
6. Replicate Overview for NVIDIA and JPMorgan (data-driven, should be fast if step 4-5 were done generically).
7. Business, Financials pages for all three (mostly `MetricDisplay`/`TrendChart`/`FinancialsTable` composition, plus the custom `BridgeChart`).
8. Valuation pages + peer comparison — including the JPMorgan-specific "EV isn't meaningful here" treatment.
9. `LBOSimulator` for NVIDIA/Netflix, including the sensitivity grid and the NVIDIA scale-disclaimer banner.
10. `BankExcessCapitalModule` for JPMorgan (**blocked on sourcing JPMorgan's actual target CET1 ratio** per LBO_SPEC.md — do not ship a computed dollar figure with an unverified input).
11. `/compare` page.
12. `/glossary` page (generated from the shared content source, per the architectural rule above).
13. `/sources` page.
14. Full pass against QA_CHECKLIST.md, with particular attention to the accuracy and citation sections given this product's credibility depends on both.
