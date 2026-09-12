# DATA_DICTIONARY.md
Schema and per-metric specification. Governing principle from the brief: separate **raw sourced data** from **calculated metrics** from **display formatting** from **explanation content**. Nothing should be hardcoded into a UI component — every number a component renders should come from this data layer.

---

## Schema

```typescript
type Company = {
  ticker: string;              // "NVDA"
  name: string;                // "NVIDIA Corporation"
  exchange: string;            // "NASDAQ"
  industry: string;            // "Semiconductors"
  fiscalYearEnd: string;       // "last Sunday in January" | "December 31" | "December 31"
  description: string;         // 2-3 sentence plain-English business description
};

type Period = {
  id: string;                  // "FY2025", "FY2026", "TTM-2026Q2", "Q4-2025"
  type: "fiscal_year" | "quarter" | "ttm" | "point_in_time";
  fiscalYear: number;
  periodEnd: string;           // ISO date
  isEstimate: boolean;         // true only for forward-looking figures, never used for headline metrics
};

type SourcedValue = {
  metricId: string;            // references Metric.id below
  companyTicker: string;
  periodId: string;
  value: number;
  unit: "USD_millions" | "USD_billions" | "percent" | "ratio" | "count";
  source: {
    type: "10-K" | "10-Q" | "8-K" | "earnings_release" | "earnings_call" | "shareholder_letter" | "market_data_vendor";
    documentName: string;      // "NVIDIA FY2025 10-K"
    url: string;
    accessedOrFiledDate: string; // ISO date
    isPrimary: boolean;        // false for vendor-aggregated figures like stockanalysis.com
  };
  crossCheckSources?: { documentName: string; value: number; url: string }[]; // populate when sources conflicted (see SOURCE_MAP.md)
  confidence: "verified" | "needs_verification"; // "needs_verification" = flagged, not yet confirmed against a primary filing
};

type Metric = {
  id: string;                  // "ebitda", "ev_ebitda", "market_cap"
  displayName: string;
  definition: string;          // one sentence — feeds "What it means"
  whyItMatters: string;        // one paragraph — feeds "Why it matters"
  formula?: string;
  applicableTo: string[];      // which company tickers this metric is meaningful for — e.g. ev_ebitda: ["NVDA","NFLX"], not "JPM"
  caveat?: string;
};

type CalculatedMetric = {
  // derived at build/render time from SourcedValue records — never stored as a hardcoded number
  metricId: string;
  companyTicker: string;
  periodId: string;
  computeFrom: string[];       // metricIds this depends on, e.g. ev_ebitda depends on ["enterprise_value","ebitda"]
};

type Peer = {
  companyTicker: string;
  peerTicker: string;
  rationale: string;           // why comparable
  keyDifference: string;       // what's NOT comparable — required field, not optional
  usefulMultiples: string[];   // which of this pair's multiples are actually meaningful
};

type ExplanationBlock = {
  metricId: string;
  companyTicker: string;       // explanation is company-specific in its "This company" section
  whatItMeans: string;
  whyItMatters: string;
  thisCompanyExample: string;  // must reference the actual SourcedValue, not a separately-typed number
  caveat?: string;
};

type LBOAssumptions = {
  companyTicker: string;
  defaultEntryMultiple: number;
  defaultExitMultiple: number;
  defaultDebtToEbitda: number;
  defaultHoldPeriodYears: number;
  defaultRevenueGrowth: number;
  defaultEbitdaMargin: number;
  scaleDisclaimer?: string;    // required for NVDA — see LBO_SPEC.md
  moduleType: "full_simulator" | "not_applicable_explainer"; // JPM = latter
};
```

**Hard rule for implementation:** a UI component is never allowed to render a number that isn't traced back to a `SourcedValue` or a `CalculatedMetric` that itself resolves to `SourcedValue`s. If a builder is tempted to type a number directly into a React component during development, that's a signal the data layer is incomplete — stop and add the record instead.

---

## Per-Metric Specification (core metrics)

| Metric ID | Definition | Formula | Unit | Period type | Applicable companies | Caveat |
|---|---|---|---|---|---|---|
| `revenue` | Total sales | — (reported) | USD millions | fiscal_year, ttm | NVDA, NFLX, JPM* | *For JPM, "net revenue" (managed basis) is the closer analogue — see bank-specific note below |
| `gross_profit` | Revenue − cost of revenue | Revenue − COGS | USD millions | fiscal_year | NVDA, NFLX | Not a standard disclosure line for JPM |
| `operating_income` | EBIT | Gross Profit − OpEx | USD millions | fiscal_year, quarter | NVDA, NFLX | JPM discloses "pre-provision profit" as its closer analogue, not standard operating income |
| `ebitda` | Operating income + D&A | Operating Income + D&A | USD millions | fiscal_year, ttm | NVDA, NFLX | See Netflix EBITDA conflict below — resolve per the documented methodology, do not silently pick a number |
| `net_income` | Bottom-line profit | — (reported) | USD millions | fiscal_year, quarter | NVDA, NFLX, JPM | Flag disclosed one-off items (e.g., JPM Q4'25 Apple card reserve) in the caveat field, not buried in a footnote |
| `free_cash_flow` | Cash after CapEx | Operating CF − CapEx | USD millions | fiscal_year | NVDA, NFLX | JPM's cash-generation dynamics are governed by capital requirements, not a standard FCF concept — do not compute for JPM |
| `capex` | Capital expenditure | — (reported) | USD millions | fiscal_year | NVDA, NFLX | — |
| `total_debt` | Gross debt | — (reported, balance sheet) | USD billions | point_in_time | NVDA, NFLX | Not meaningful in the standard sense for JPM — see `market_cap`/`enterprise_value` caveat |
| `cash` | Cash & equivalents | — (reported, balance sheet) | USD billions | point_in_time | NVDA, NFLX | Same caveat as `total_debt` for JPM |
| `net_debt` | Total Debt − Cash | Total Debt − Cash | USD billions | point_in_time | NVDA, NFLX | — |
| `market_cap` | Equity market value | Share Price × Shares Outstanding | USD billions | point_in_time (daily) | NVDA, NFLX, JPM | Meaningful for all three — this is the one valuation figure that works the same way everywhere |
| `enterprise_value` | Whole-business value | Market Cap + Total Debt − Cash | USD billions | point_in_time | NVDA, NFLX | **Not meaningful for JPM** — render as an explanatory card, not a number, on JPM's page |
| `pe_ratio` | Price/Earnings | Market Cap ÷ Net Income (or Price/EPS) | ratio | point_in_time | NVDA, NFLX, JPM | Primary valuation multiple for JPM |
| `ev_ebitda` | EV/EBITDA | Enterprise Value ÷ EBITDA | ratio | point_in_time | NVDA, NFLX | Not applicable to JPM |
| `ev_revenue` | EV/Revenue | Enterprise Value ÷ Revenue | ratio | point_in_time | NVDA, NFLX | Not applicable to JPM |
| `price_to_book` | Price/Book (or /Tangible Book for banks) | Market Cap ÷ (Tangible) Book Value | ratio | point_in_time | JPM | Primary valuation multiple for JPM; not a headline metric for NVDA/NFLX |
| `roe` / `rotce` | Return on (Tangible Common) Equity | Net Income ÷ Average (Tangible Common) Equity | percent | fiscal_year | JPM | Bank-specific profitability metric — no equivalent shown for NVDA/NFLX |
| `revenue_growth` | YoY revenue growth | (Revenue_t − Revenue_t-1) ÷ Revenue_t-1 | percent | fiscal_year | NVDA, NFLX, JPM | — |
| `shares_outstanding` | Diluted shares | — (reported) | count (billions) | point_in_time | NVDA, NFLX, JPM | — |

*JPM "net revenue" note: JPMorgan reports on a "managed basis" (non-GAAP) for line-of-business analysis, which includes reclassifications to present net revenue on a fully taxable-equivalent basis. Use the "reported" GAAP figure as the headline number and note the managed-basis convention in the source drawer, not the main metric.

---

## Documented Source Conflicts (resolve, don't hide)

The brief requires: *"When sources conflict, identify the conflict, explain why, choose the most appropriate source, document the decision."* Three real conflicts surfaced during research — build UI affordances (a small "sources disagree — why?" link near the metric) for at least the first one, since it's genuinely instructive rather than just a data-quality footnote.

1. **Netflix EBITDA / EV-EBITDA.** stockanalysis.com: EV/EBITDA 23.17x (Aug 21, 2026). GuruFocus: EV/EBITDA 8.97x (Aug 9, 2026), built on a TTM EBITDA of $35.0B — roughly 2.5x Netflix's actual operating income. **Decision: use the stockanalysis.com-consistent methodology (do not add back content amortization) as the primary displayed figure**, and use the GuruFocus figure as the explicit "here's why sources disagree" teaching example inside the EBITDA explanation panel. Rationale is in COMPANY_RESEARCH.md and the EBITDA glossary entry.

2. **NVIDIA trailing P/E.** stockanalysis.com: 27.88 (Aug 31, 2026). MacroTrends: 31.53 (Aug 28, 2026). **Decision: use stockanalysis.com as primary** (more recent, and internally consistent with the EV/EBITDA and market cap figures also sourced from it); note the ~3-point spread in the source drawer as a normal EPS-timing/methodology difference, not a data error worth deep-diving in the main UI.

3. **JPMorgan market capitalization.** stockanalysis.com: $962.95B (~Aug 2026). Robinhood: $944.49B at $355.32/share (Sept 1, 2026). **Decision: use stockanalysis.com as primary** for internal consistency with the P/E and EV figures pulled from the same source; the ~2% spread reflects days-apart pricing and share-count-rounding differences, not an error — no UI treatment needed beyond the standard "as of [date]" label.

**Standing rule for the build:** whenever two reputable sources genuinely disagree by more than a rounding-level amount, do not average them and do not silently pick one. Populate `crossCheckSources` on the `SourcedValue` record and make a documented call, exactly as done above.

---

## Fiscal Period Handling (do not conflate these)

- **NVIDIA's fiscal year ends the last Sunday in January**, and is named for the calendar year in which most of the fiscal year falls forward into — e.g., "FY2026" ended ~Jan 25, 2026, which is *after* most of calendar 2025. Label every NVIDIA period explicitly with its actual end date, not just "FY2026," to avoid the single most common beginner confusion on this dataset.
- **Netflix's and JPMorgan's fiscal years are the calendar year** (ending Dec 31) — no special handling needed, but still display the exact period-end date next to every figure rather than relying on the FY label alone.
- **TTM (trailing twelve months) figures are point-in-time and will drift** — always pair a TTM figure with the exact "as of" date it was pulled, and never present a TTM figure as if it were an audited annual figure. The Overview page should default to the most recent **complete audited fiscal year** as the headline number, with TTM shown as a clearly labeled secondary figure for recency.
