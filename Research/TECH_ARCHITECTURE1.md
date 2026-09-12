# TECH_ARCHITECTURE.md
## Technical Architecture Specification

Target build environment: Google Antigravity / Claude Opus, per the brief. This spec
gives a concrete, opinionated architecture rather than a menu of options — where the
brief's suggested stack was evaluated and kept, that evaluation is shown; where it
was adjusted, the reasoning is shown too.

---

## 1. STACK DECISION

**Recommended: Next.js (App Router) + TypeScript + Tailwind CSS + Recharts +
a local, versioned, statically-imported dataset + Vitest.** This is close to the
brief's suggested direction, kept after evaluation rather than accepted by default,
for these reasons:

- **Next.js (App Router), TypeScript.** The site is content- and data-heavy with a
  handful of interactive tools (LBO sliders, chart hovers) rather than a
  highly stateful app — a React framework with strong static-rendering support fits
  better than a heavier client-state framework would, and TypeScript is non-
  negotiable given the schema-heavy data model in `DATA_DICTIONARY.md` (the
  `RawDataPoint`/`CalculatedMetric`/`MetricDefinition` interfaces should be real
  TypeScript types checked at build time, not documentation that code can silently
  drift from).
- **Static rendering, not a live API pipeline.** Per the brief's explicit
  instruction (§16) and `PRODUCT_SPEC.md` §M: the financial dataset is versioned and
  researched, not streamed. Company pages should be statically generated at build
  time from the local dataset (Next.js static generation), with a documented,
  manual, periodic re-research process to publish a new dataset version — not a
  runtime fetch to a financial-data API. The **one exception** is point-in-time
  market data (share price, market cap, and every ratio derived from them) — see
  §4.3 for how that's handled without turning into a live pipeline.
- **Tailwind CSS**, but constrained to the token set in `UI_SPEC.md` §2–3 via a
  project-level Tailwind config (custom colors, font families, spacing scale) rather
  than ad hoc utility classes — this keeps the "quiet, editorial" discipline
  enforceable rather than aspirational.
- **Recharts** for line/bar/area charts (segment breakdowns, financial trends,
  sensitivity heatmap) — evaluated against D3 directly and against a heavier
  dashboard-charting library; Recharts was chosen because it's React-native
  (no manual DOM/SVG lifecycle management fighting React's render cycle), has
  first-class hover/tooltip primitives needed for the crosshair interaction in
  `UI_SPEC.md` §6, and is easy to theme with the exact token colors rather than a
  library-imposed palette. D3 remains available as an escape hatch specifically for
  the LBO waterfall chart and the sensitivity heatmap if Recharts' primitives prove
  too restrictive for those two custom visualizations — evaluate that decision when
  those two components are actually built, don't pre-commit.
- **Vitest** for unit tests (fast, native ESM/TypeScript support, minimal config) —
  see §6 for what must be tested.
- **Explicitly not chosen:** a database (Postgres/etc.) — there is no user-generated
  data and no need for query flexibility beyond "look up this company's dataset,"
  which a typed, versioned, statically-imported data module handles with less
  operational surface area. No live financial-data API subscription for V1, per
  `PRODUCT_SPEC.md` §M. No state-management library (Redux/Zustand/etc.) — the
  amount of client state (which tab is open, which (i) is expanded, current LBO
  slider values) is small enough for local component state and, where it needs to be
  shared, React Context; reaching for a global store here would be unjustified
  complexity for this app's actual state surface.

---

## 2. FOLDER STRUCTURE

```
/app
  /(marketing)
    page.tsx                       # Home
  /[company]
    layout.tsx                     # Company shell: header, vitals strip, tab bar
    /overview/page.tsx
    /business/page.tsx
    /financials/page.tsx
    /valuation/page.tsx
    /lbo/page.tsx                  # NVDA, NFLX — LBO tab
    /bank-economics/page.tsx       # JPM only — see below
  /compare/page.tsx
  /glossary
    page.tsx                       # Browsable/searchable index
    /[term]/page.tsx
  /methodology/page.tsx
  /lbo-case-study/dell-2013/page.tsx   # standalone, per LBO_SPEC.md §9

/components
  /metrics
    MetricCell.tsx                 # the vitals-grid/table cell described in UI_SPEC.md §5
    ExplanationExpansion.tsx       # the (i) interaction, PRODUCT_SPEC.md §D
    SourcePopover.tsx              # PRODUCT_SPEC.md §E
  /charts
    TrendChart.tsx                 # line/bar, Recharts-based
    SegmentBreakdownChart.tsx
    SensitivityHeatmap.tsx
    LBOWaterfallChart.tsx
    ChartCrosshairTooltip.tsx      # shared hover tooltip, used by all chart components
  /tables
    FinancialsTable.tsx
    PeerComparisonPanel.tsx
  /lbo
    LBOInputPanel.tsx              # sliders + linked numeric fields
    LBOOutputPanel.tsx
    BankEconomicsInputPanel.tsx    # JPM-specific, distinct component per LBO_SPEC.md §7.2
    BankEconomicsOutputPanel.tsx
  /layout
    CompanyHeader.tsx
    VitalsStrip.tsx
    TabBar.tsx
  /glossary
    GlossaryEntry.tsx              # renders the four-block schema

/lib
  /finance
    formulas.ts                    # DATA_DICTIONARY.md §4 — single source of truth,
                                    # every CalculatedMetric references exactly one
                                    # exported function from this file, never
                                    # reimplemented inline in a component
    lbo-engine.ts                  # LBO_SPEC.md §3–6 — the projection/debt-schedule/
                                    # returns/bridge engine, pure functions, fully unit-
                                    # tested against LBO_SPEC.md §8 test cases
    bank-economics-engine.ts       # LBO_SPEC.md §7.2 engine, kept separate from
                                    # lbo-engine.ts deliberately — these are not the
                                    # same model with different inputs, they are
                                    # different models, and the codebase should say so
    format.ts                      # formatCurrency(), formatPercent(), formatRatio() —
                                    # DATA_DICTIONARY.md §6, single implementation
  /data
    companies/
      nvda.ts                      # typed RawDataPoint[] + CalculatedMetric[] for NVIDIA
      nflx.ts
      jpm.ts
      peers/
        amd.ts
        avgo.ts
        tsm.ts
        dis.ts
        cmcsa.ts
        bac.ts
        gs.ts
        wfc.ts
    glossary/
      terms.ts                     # MetricDefinition[] + ExplanationContent[] per
                                    # FINANCE_GLOSSARY.md
    peer-sets.ts                   # PeerSet[] per COMPANY_RESEARCH.md
    lbo-defaults.ts                # LBOAssumptionSet[] per LBO_SPEC.md §2, §7.1
    dell-2013-case-study.ts        # fixed, non-editable dataset, LBO_SPEC.md §9
  /types
    schema.ts                      # every interface from DATA_DICTIONARY.md §1, as
                                    # actual TypeScript types
  /market-data
    fetch-live-quote.ts            # the one place a market-data feed call happens —
                                    # see §4.3

/tests
  finance/
    formulas.test.ts
    lbo-engine.test.ts              # implements every test case in LBO_SPEC.md §8
    bank-economics-engine.test.ts
  data/
    schema-integrity.test.ts        # DATA_DICTIONARY.md §5/§6 — every RawDataPoint has
                                    # a SourceRef, every CalculatedMetric's declared
                                    # inputs actually exist, no MetricDefinition is
                                    # applicable to a company with no corresponding
                                    # RawDataPoint, etc.
```

---

## 3. COMPONENT ARCHITECTURE PRINCIPLES

- **One `MetricCell` component, used everywhere a metric appears** (vitals grid,
  financials table, valuation panel). A metric should never be hand-rendered as bare
  JSX in a page component — if a new page needs to show a metric, it uses
  `MetricCell`, which guarantees the (i) glyph, the source mark, and the formatting
  rules are applied consistently without being re-implemented (and potentially
  re-implemented *incorrectly*) per page.
- **`ExplanationExpansion` is a single shared component parameterized by
  `termKey` and `companyId`**, not a per-metric custom component — it looks up the
  `ExplanationContent` record and interpolates the live value per
  `DATA_DICTIONARY.md` §1.4. This is what guarantees the "This company" block is
  always current rather than a static string someone forgot to update.
- **The LBO engine and Bank Economics engine are pure functions with no React
  dependency** (`lib/finance/lbo-engine.ts`, `bank-economics-engine.ts`) — they take
  a typed input object and return a typed output object, which is what makes them
  unit-testable against `LBO_SPEC.md` §8 without rendering anything. `LBOInputPanel`
  and `LBOOutputPanel` are thin — they hold slider state and call the pure engine
  function on every change.
- **No page component computes a financial formula inline.** Every calculation goes
  through `lib/finance/formulas.ts` or one of the two engine modules. This is the
  direct implementation of `DATA_DICTIONARY.md`'s "the system must separate raw
  sourced data, calculated metrics, display formatting, and explanation content" —
  it's a rule that only holds if it's enforced at the component-boundary level, not
  just documented.

---

## 4. DATA ARCHITECTURE

### 4.1 Authoring workflow

Each company's `lib/data/companies/[ticker].ts` file exports a typed array of
`RawDataPoint` and `CalculatedMetric` objects (types from `lib/types/schema.ts`,
definitions from `DATA_DICTIONARY.md` §1). This file is hand-authored/updated by
whoever is doing the periodic research refresh (per `SOURCE_MAP.md`), not generated
by a script that scrapes a filing — the "read the 10-K, transcribe the number,
attach the citation" step is a human (or a carefully-supervised agent) task, not one
to automate away, because it's exactly the step where fabrication risk lives.

### 4.2 Data integrity tests (must run in CI on every change to `/lib/data`)

`tests/data/schema-integrity.test.ts` enforces, at minimum:
- Every `RawDataPoint` has a non-empty `SourceRef` with a real `url`.
- Every `CalculatedMetric.inputs` array references IDs that actually exist in the
  dataset (no dangling reference to a `RawDataPoint` that was renamed or removed).
- Every `MetricDefinition.applicableTo` is respected — no `CalculatedMetric` exists
  for a `(companyId, metricKey)` pair that isn't in that metric's `applicableTo` list
  (this is the automated enforcement of the JPMorgan EV/EBITDA exclusion in
  `DATA_DICTIONARY.md` §3 — a future contributor cannot accidentally add JPMorgan
  EV/EBITDA data without the test suite failing).
- Every `formulaKey` referenced by a `CalculatedMetric` exists in the
  `lib/finance/formulas.ts` registry.
- Every `ExplanationContent.perCompany[companyId].text` template references only
  metric/data-point IDs that exist for that company.

### 4.3 Market data (the one live-ish exception)

Share price, market capitalization, and every ratio derived from them are the only
figures that should not be frozen at a single "as of" date indefinitely, since they
go stale within a trading day. Recommended approach: a single server-side data-fetch
function (`lib/market-data/fetch-live-quote.ts`) called at build time (or via a
scheduled rebuild — e.g., a nightly static-regeneration job), **not** a client-side
call on every page load. This keeps the "no live API pipeline" commitment (the site
is rebuilt periodically, not continuously polling) while keeping the single most
visibly time-sensitive numbers reasonably fresh. Every rendered market-cap/price
figure must display its "as of" timestamp per `DATA_DICTIONARY.md` §5 — this is what
makes an occasionally-stale value honest rather than misleading.

### 4.4 Restatement handling

Per `DATA_DICTIONARY.md` §5: updates to `lib/data/companies/*.ts` append a new
`RawDataPoint` with a new `capturedAt` rather than mutating an existing one in
place, when the update reflects a genuine restatement (vs. simply adding a newly-
reported period, which is just a new record). A lightweight convention: restated
values keep `restated: true` and the array preserves both records — the UI's default
render picks the latest `capturedAt` per `(companyId, metricKey, fiscalPeriodLabel)`
tuple, but the underlying data is never destroyed.

---

## 5. HANDLING COMPANY DESCRIPTIONS, NAMES, AND LOGOS (IP discipline)

- Business-description copy on the Overview/Business tabs must be **paraphrased**
  from the source 10-K/press release, not lifted verbatim — this package's own
  research notes in `COMPANY_RESEARCH.md` follow the same discipline and the build
  agent should hold the shipped product to the same standard. No direct quotation
  of company-authored prose beyond short, clearly-quoted fragments where the exact
  wording is itself the point (e.g., a CEO's specific stated guidance framing) —
  and even then, keep any such quotation short and singular per source.
- Company names and tickers (text) are used factually and are not themselves an IP
  concern. **Do not use company logos, wordmarks, or other brand assets** — the
  Home page's company tiles (`PRODUCT_SPEC.md` §C) use a text-based treatment (the
  company name set in the site's own Fraunces/Plex Sans type system), not an
  imported logo file. This avoids both a licensing question and a design
  inconsistency (three different brand typefaces fighting the site's own type
  system on one page).
- Do not reproduce charts, tables, or figures directly from a 10-K or an analyst
  report as images — rebuild every chart from the underlying numeric data in this
  site's own chart components and visual system.

---

## 6. TESTING STRUCTURE

| Test file | Covers |
|---|---|
| `tests/finance/formulas.test.ts` | Every formula in `DATA_DICTIONARY.md` §4 — e.g., `enterprise_value`, `ev_to_ebitda`, `price_to_book`, `roe` — against hand-computed synthetic inputs, plus explicit boundary cases (negative EPS → P/E returns "N/M" not a negative number; net debt can be negative and must render as such, not clamp to zero) |
| `tests/finance/lbo-engine.test.ts` | All five test cases in `LBO_SPEC.md` §8, asserting exact numeric output (within floating-point tolerance) for Test Case 1's full year-by-year table, and the specific qualitative behaviors (cash-accumulation branch, negative-CFADS floor, one-year IRR degenerate case) for Test Cases 2–5. The value-creation bridge reconciliation (`LBO_SPEC.md` §5) is asserted as an exact equality test on every test case, not just Test Case 1. |
| `tests/finance/bank-economics-engine.test.ts` | The JPMorgan-specific engine (`LBO_SPEC.md` §7.2) — tangible book value projection arithmetic, the CET1-floor UI constraint behaving as a hard floor not just a visual suggestion, and the implied-share-price calculation's constant-multiple assumption being clearly flagged in its output object (not just in UI copy that could drift from the code) |
| `tests/data/schema-integrity.test.ts` | Per §4.2 above |
| Component tests (React Testing Library, alongside Vitest) | `ExplanationExpansion` renders exactly the four-block schema and omits (not stubs) a missing caveat block; `MetricCell` renders the (i) glyph as a real `<button>` (accessibility, per `UI_SPEC.md` §8/§10); `SensitivityHeatmap` renders the numeral in every cell regardless of color (accessibility, per `UI_SPEC.md` §6) |
| Visual/manual QA | See `QA_CHECKLIST.md` — some of this package's requirements (does it *feel* calm and editorial, not a SaaS dashboard) are not unit-testable and are called out explicitly as manual review items rather than left implicit |

---

## 7. BUILD SEQUENCE

Recommended implementation order — each stage should be functionally complete and
tested before starting the next, because later stages depend on earlier ones being
correct (in particular, no UI work should start before the finance formulas and LBO
engine are unit-tested, since a beautiful screen showing a wrong number is worse than
an unstyled screen showing a right one).

1. **Types and schema.** Implement `lib/types/schema.ts` from `DATA_DICTIONARY.md`
   §1 in full. Nothing else can be built correctly without this being settled first.
2. **Formula registry and its tests.** `lib/finance/formulas.ts` +
   `tests/finance/formulas.test.ts`, per `DATA_DICTIONARY.md` §4. Get this fully
   green before touching the LBO engine.
3. **LBO engine and Bank Economics engine, and their tests.** `lib/finance/
   lbo-engine.ts`, `bank-economics-engine.ts`, and both test files, implementing
   every test case in `LBO_SPEC.md` §8 exactly. This is the highest-risk piece of
   business logic in the product and should be provably correct before any UI is
   built on top of it.
4. **Data authoring: NVIDIA, Netflix, JPMorgan.** Populate `lib/data/companies/*.ts`
   from `COMPANY_RESEARCH.md` and `SOURCE_MAP.md`, re-verifying every figure against
   the primary source directly (not against this package's summary tables) as
   described in `DATA_DICTIONARY.md` §1.1. Run `schema-integrity.test.ts` continuously
   during this stage.
5. **Glossary content.** Populate `lib/data/glossary/terms.ts` from
   `FINANCE_GLOSSARY.md`, wiring the template-based "This company" text per
   `DATA_DICTIONARY.md` §1.4.
6. **Design tokens and shared components.** Tailwind config from `UI_SPEC.md` §2–3;
   build `MetricCell`, `ExplanationExpansion`, `SourcePopover` first, since every page
   depends on them — per §3 above, no page should hand-roll a metric or an
   explanation.
7. **Company shell and the four shared tabs** (Overview, Business, Financials,
   Valuation) for all three companies, using the shared components from step 6.
8. **LBO tab (NVIDIA, Netflix) and Bank Economics tab (JPMorgan)**, wiring the
   already-tested engines from step 3 to `LBOInputPanel`/`LBOOutputPanel` and their
   Bank Economics equivalents.
9. **Compare page and Glossary pages.**
10. **Home page** — built last deliberately, since it's the simplest page and its
    only job is to route into the (by then fully built) company shells; building it
    first would risk designing an entry point for a product that doesn't exist yet.
11. **Historical deal case study** (`LBO_SPEC.md` §9) — genuinely optional/last, per
    the brief's own framing of it as an advanced feature, and dependent on locating
    the closing-terms 8-K flagged as outstanding in `SOURCE_MAP.md`.
12. **Full QA pass** against `QA_CHECKLIST.md`, including the non-unit-testable
    visual/editorial-feel review items.
