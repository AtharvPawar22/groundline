# DATA_DICTIONARY.md
## Data Schema and Metric Specification

This is the authoritative reference for what every number on the site is, how it is
computed, where it comes from, and where it does or doesn't apply. `TECH_ARCHITECTURE.md`
defines how this is implemented in code; this file defines what is true.

---

## 1. DATA ARCHITECTURE (schema)

Four layers, kept strictly separate. Nothing is hardcoded into a UI component.

```
┌─────────────────────┐     ┌──────────────────────┐
│   RAW SOURCED DATA   │ --> │   CALCULATED METRICS  │
│  (facts as filed)    │     │ (derived, formula-run) │
└─────────────────────┘     └──────────────────────┘
           │                             │
           v                             v
┌─────────────────────┐     ┌──────────────────────┐
│  EXPLANATION CONTENT │     │  DISPLAY FORMATTING   │
│ (glossary, per-term)  │     │ (units, rounding, UI) │
└─────────────────────┘     └──────────────────────┘
```

### 1.1 `RawDataPoint` (raw sourced data — never computed, always cited)

```ts
interface RawDataPoint {
  id: string;                    // e.g. "nvda.fy2026.revenue"
  companyId: CompanyId;          // "nvda" | "nflx" | "jpm"
  metricKey: string;             // FK into MetricDefinition, e.g. "revenue"
  value: number;
  unit: Unit;                    // "USD_millions" | "USD" | "percent" | "ratio" | "count"
  periodType: "FY" | "Q" | "TTM" | "point_in_time";
  fiscalYear: number;             // company's own fiscal year label, e.g. 2026
  fiscalPeriodLabel: string;      // "FY2026", "Q2 FY2027", "as of Jul 26, 2026"
  periodStart: string;            // ISO date
  periodEnd: string;              // ISO date
  isGAAP: boolean;                 // true/false; irrelevant values omit rather than default
  source: SourceRef;
  capturedAt: string;             // ISO datetime this value was entered into the dataset
  restated: boolean;               // true if this value has been restated since original filing
  notes?: string;                  // e.g. "includes $4.5B H20 charge"
}

interface SourceRef {
  sourceType: "10-K" | "10-Q" | "8-K" | "press_release" | "proxy_DEFM14A" |
              "investor_presentation" | "market_data_feed";
  issuer: string;                  // "NVIDIA Corporation"
  documentTitle: string;
  documentDate: string;            // filing or publication date, ISO
  url: string;
  locator?: string;                // page / table / item reference where practical
  retrievedAt: string;             // ISO datetime the build agent captured it
}
```

### 1.2 `CalculatedMetric` (derived — formula-run, never hand-entered)

```ts
interface CalculatedMetric {
  id: string;                    // e.g. "nvda.fy2026.enterprise_value"
  companyId: CompanyId;
  metricKey: string;
  formulaKey: string;              // FK into a formula registry (see §4), single source of truth
  inputs: string[];                 // RawDataPoint ids or other CalculatedMetric ids consumed
  value: number;                    // computed at data-build time, not at render time,
                                     // and re-checked by a test (see TECH_ARCHITECTURE.md §Testing)
  periodType: "FY" | "Q" | "TTM" | "point_in_time";
  fiscalPeriodLabel: string;
}
```

Rule: a `CalculatedMetric` never has a `SourceRef` of its own — its provenance is its
`inputs` array, and the UI source popover for a calculated value must render the
formula plus a link to each input's own source, not a fabricated citation.

### 1.3 `MetricDefinition` (the metric itself — one row per concept, company-agnostic)

```ts
interface MetricDefinition {
  key: string;                     // "ebitda", "free_cash_flow", "ev_to_ebitda", ...
  displayName: string;
  category: "income_statement" | "balance_sheet" | "cash_flow" | "valuation" |
            "credit_capital" | "lbo" | "operating_kpi";
  unit: Unit;
  applicableTo: CompanyId[];        // explicit allow-list — see §3 for why this matters
  formula?: string;                 // human-readable, e.g. "Operating Income + D&A"
  glossaryTermKey: string;          // FK into FINANCE_GLOSSARY.md
}
```

### 1.4 `ExplanationContent` (the four-block schema from PRODUCT_SPEC.md §D)

```ts
interface ExplanationContent {
  termKey: string;                  // FK into MetricDefinition / glossary
  whatItMeans: string;
  whyItMatters: string;
  formulaDisplay?: string;
  perCompany: {
    [companyId in CompanyId]?: {
      text: string;                 // template string referencing live CalculatedMetric/RawDataPoint ids,
                                     // e.g. "NVIDIA's EBITDA for FY2026 was {{nvda.fy2026.ebitda}}, ..."
      caveat?: string;
    }
  };
}
```

Rule: `perCompany.text` is a **template**, not a static string with the number
baked in at authoring time — this is what makes the "This company" block always
correct even as the dataset is updated at a later version. The renderer interpolates
the live value at render time from the `CalculatedMetric`/`RawDataPoint` store.

### 1.5 `PeerSet` and `LBOAssumptionSet`

```ts
interface PeerSet {
  companyId: CompanyId;
  peers: {
    peerCompanyName: string;
    peerTicker: string;
    whyComparable: string;          // 1 sentence
    keyDifference: string;          // 1 sentence
    usefulMultiples: string[];      // subset of valuation MetricDefinition keys
  }[];
}

interface LBOAssumptionSet {
  companyId: CompanyId;
  mode: "standard" | "hypothetical_sandbox" | "not_applicable";
  defaultInputs: LBOInputs;         // see LBO_SPEC.md §2 for full field list
  disclosureText: string;           // required for "hypothetical_sandbox" and "not_applicable"
}
```

---

## 2. METRIC SPECIFICATION TABLE

For every metric: definition, formula, source type, period convention, unit, known
caveats, and which of the three companies it applies to. This table is the contract
the `MetricDefinition` records must match.

### 2.1 Income statement

| Metric | Formula | Source type | Period | Unit | Applies to | Caveats |
|---|---|---|---|---|---|---|
| Revenue | As reported | 10-K/10-Q/8-K press release | FY, Q, TTM | USD mm | All | JPMorgan reports on both a GAAP and "managed" (non-GAAP, tax-equivalent) basis for revenue — display managed-basis revenue for JPM since that is what the company itself leads with, and label it as such. |
| Gross Profit | Revenue − Cost of Revenue | 10-K/press release | FY, Q, TTM | USD mm | NVDA, NFLX | Not a standard disclosure line for JPMorgan (banks don't have "cost of revenue" in the industrial sense) — omit for JPM rather than approximate. |
| Operating Income | Gross Profit − Operating Expenses (GAAP) | 10-K/press release | FY, Q, TTM | USD mm | All | NVIDIA and Netflix both report GAAP and non-GAAP operating income; default display is GAAP, non-GAAP shown as a secondary figure with the reconciling items named (not just the delta). |
| EBITDA | Operating Income + Depreciation & Amortization | Calculated | FY, Q, TTM | USD mm | NVDA, NFLX | **Not displayed for JPMorgan** as a primary metric — see §3. |
| Net Income | As reported (GAAP) | 10-K/10-Q/press release | FY, Q, TTM | USD mm | All | For JPMorgan and NVIDIA, flag when a period contains large one-off items (JPM: Visa share gain, equity investment gains; NVDA: H20 export-control charge, non-marketable/publicly-held equity security gains) — these should be visible as `notes` on the RawDataPoint and surfaced in the UI, not smoothed over. |
| Diluted EPS | Net Income (adj. for preferred divs where applicable) / Diluted Shares | 10-K/press release | FY, Q | USD | All | |
| Free Cash Flow | Operating Cash Flow − Capex (company convention: NVIDIA and Netflix both also subtract principal payments on finance leases/intangibles in their own FCF definition — match the company's own stated formula, don't invent a house formula) | Calculated, per company's own disclosed formula | FY, Q, TTM | USD mm | NVDA, NFLX | JPMorgan does not report or conventionally use "free cash flow" the way an industrial/tech company does (deposit-taking distorts operating cash flow beyond usefulness) — omit for JPM. |

### 2.2 Balance sheet / credit

| Metric | Formula | Source type | Period | Unit | Applies to | Caveats |
|---|---|---|---|---|---|---|
| Cash & Equivalents | As reported | 10-K/10-Q | Point-in-time | USD mm | All | |
| Total Debt | Short-term debt + Long-term debt | 10-K/10-Q | Point-in-time | USD mm | NVDA, NFLX | For JPMorgan, "debt" in the industrial sense (funded borrowings) is a small, largely irrelevant slice of the balance sheet next to deposits — display JPM's long-term debt figure but do not compute Net Debt or feed it into an EV bridge (see §3). |
| Net Debt | Total Debt − Cash & Equivalents | Calculated | Point-in-time | USD mm | NVDA, NFLX | Can be negative (net cash) — display as such, don't floor at zero. |
| Total Assets | As reported | 10-K/10-Q | Point-in-time | USD mm | All | For JPMorgan this is the headline balance-sheet number ($4.4T at 12/31/25) and should be prominent; for NVDA/NFLX it is secondary context. |
| Stockholders' Equity | As reported | 10-K/10-Q | Point-in-time | USD mm | All | For JPMorgan, also show Tangible Common Equity if disclosed (used in ROTCE, which JPM itself reports and which is more meaningful than plain ROE for a bank). |
| Diluted Shares Outstanding | As reported (period-weighted for EPS calcs; period-end for market-cap calcs — do not conflate the two) | 10-K/10-Q | FY, Q, point-in-time | Millions | All | |

### 2.3 Valuation

| Metric | Formula | Source type | Period | Unit | Applies to | Caveats |
|---|---|---|---|---|---|---|
| Market Capitalization | Share Price × Diluted Shares Outstanding (period-end count) | Calculated from market data feed | Point-in-time | USD mm | All | Must be timestamped to the minute/day it was captured; this is the single most time-sensitive figure in the whole dataset — see `TECH_ARCHITECTURE.md` §Data for the versioning/refresh policy. |
| Enterprise Value | Market Cap + Total Debt − Cash & Equivalents (+ minority interest, + preferred, if material — none is material for these three as of this dataset) | Calculated | Point-in-time | USD mm | NVDA, NFLX | **Do not compute or display EV for JPMorgan.** See §3 — this is the single most important accounting-rigor rule in this package. |
| P/E (Price / Earnings) | Share Price / Diluted EPS (TTM) | Calculated | TTM | Ratio | All | Undefined/misleading with negative or near-zero earnings — none of the three currently trip this, but the display component must handle a negative-EPS case gracefully (show "N/M" not a negative multiple) for peer companies that might. |
| EV / EBITDA | Enterprise Value / EBITDA (TTM) | Calculated | TTM | Ratio | NVDA, NFLX | Not shown for JPM (no EV, no standard EBITDA — see §3). |
| EV / Revenue | Enterprise Value / Revenue (TTM) | Calculated | TTM | Ratio | NVDA, NFLX | Most useful for NVIDIA given its margin profile is itself part of the investment case; less standard for Netflix but included since it's genuinely used by streaming-sector analysts. |
| FCF Yield | Free Cash Flow (TTM) / Market Cap | Calculated | TTM | Percent | NVDA, NFLX | |
| P/B (Price / Book) | Market Cap / Stockholders' Equity | Calculated | Point-in-time | Ratio | JPM (primary), shown as secondary context for NVDA/NFLX | This is JPMorgan's primary valuation multiple — see §3. |
| ROE / ROTCE | Net Income (annualized) / Avg. Stockholders' Equity (or Avg. Tangible Common Equity) | Calculated | TTM | Percent | JPM (primary) | JPMorgan itself reports ROTCE quarterly — use the company's own reported figure rather than recomputing from scratch where the company discloses it directly, to avoid a mismatched definition of "tangible." |
| Dividend Yield | Annualized Dividend / Share Price | Calculated | Point-in-time | Percent | All (secondary for NVDA/NFLX, more relevant for JPM) | |

### 2.4 LBO-specific

Full formula set in `LBO_SPEC.md` §3–4. Metric keys only, for schema completeness:
`entry_ev`, `entry_ebitda`, `entry_multiple`, `debt_to_ebitda`, `sponsor_equity`,
`hold_period_years`, `revenue_cagr_assumption`, `exit_ebitda_margin_assumption`,
`exit_multiple`, `exit_ebitda`, `exit_ev`, `remaining_debt`, `exit_equity_value`,
`moic`, `irr`, `cumulative_debt_paydown`, `value_creation_ebitda_growth`,
`value_creation_multiple_expansion`, `value_creation_debt_paydown`. Applies to NVDA
(hypothetical-sandbox mode) and NFLX (standard mode) only; JPMorgan uses a distinct
`BankEconomicsInputs`/`BankEconomicsOutputs` set defined in `LBO_SPEC.md` §7.

### 2.5 Operating KPIs (company-specific, non-standardized across the trio by design)

| Company | KPI | Definition | Source |
|---|---|---|---|
| NVIDIA | Data Center revenue (segment) | Segment revenue as reported | 10-K/press release segment table |
| NVIDIA | Gross margin (GAAP and non-GAAP) | Gross Profit / Revenue | Press release |
| Netflix | Operating margin | Operating Income / Revenue | Press release/10-Q |
| Netflix | Paid memberships (where still disclosed) | As reported | 10-K — **verify at build time whether the most recent filing still discloses a member count**; Netflix stated in 2025 it would move away from headline subscriber-count emphasis in some disclosures, so confirm current practice before wiring this KPI |
| JPMorgan | Net Interest Income (NII) | As reported, managed basis | Press release/10-Q |
| JPMorgan | Efficiency ratio | Noninterest Expense / Net Revenue | 10-K/press release |
| JPMorgan | Return on Tangible Common Equity (ROTCE) | As reported by company | Press release |
| JPMorgan | CET1 ratio | As reported | 10-K/press release |

---

## 3. WHY EV/EBITDA AND NET DEBT ARE WITHHELD FOR JPMORGAN (rationale, not just a rule)

This is worth stating in full because it is the rule most likely to be "fixed" by a
well-meaning contributor who sees a blank cell and wants to fill it in.

- **Enterprise Value** is designed to answer "what would it cost to buy the whole
  operating business, capital structure and all?" For an industrial or tech company,
  debt is a financing choice layered on top of an operating business, and EV
  correctly adds it back. For a bank, deposits and borrowings *are* the raw material
  of the business — a bank's "debt" funds the loans that generate its revenue in the
  first place. Adding total liabilities (or even just funded debt) to market cap for
  a bank does not produce a meaningful "cost to acquire the operations" figure; it
  produces a number several times the size of the bank's actual total assets and
  means nothing. This is not a subtlety — it is a category error, and displaying it
  would actively mislead a reader who doesn't already know better (i.e., exactly the
  reader this product is for).
- **EBITDA** adds back interest expense on the theory that interest is a financing
  cost, separable from operating performance. For a bank, net interest income *is*
  the core operating revenue line — there is no clean "operating income before the
  cost of the thing we sell" concept, because interest income and interest expense
  are both fundamental to the operating business, not one financing layer on top of
  it.
- **What replaces them:** P/E, P/B, and ROE/ROTCE, which is exactly the standard
  toolkit bank analysts actually use, and which is explained on the JPMorgan
  Valuation tab with the same rigor as EV/EBITDA gets for NVIDIA and Netflix — this
  is presented as "the right tool for this business," not as a consolation prize.

---

## 4. FORMULA REGISTRY (single source of truth, referenced by `formulaKey`)

Implemented once, in one module (`lib/finance/formulas.ts` per
`TECH_ARCHITECTURE.md`), never re-implemented inline in a component. Every
`CalculatedMetric` cites exactly one `formulaKey`.

```
ebitda                 = operating_income + depreciation_and_amortization
enterprise_value        = market_cap + total_debt - cash_and_equivalents
ev_to_ebitda            = enterprise_value / ebitda_ttm
ev_to_revenue           = enterprise_value / revenue_ttm
pe_ratio                = share_price / diluted_eps_ttm
fcf_yield               = free_cash_flow_ttm / market_cap
net_debt                = total_debt - cash_and_equivalents
price_to_book            = market_cap / stockholders_equity
roe                     = net_income_annualized / avg_stockholders_equity
rotce                   = net_income_annualized_to_common / avg_tangible_common_equity
revenue_growth_yoy       = (revenue_current_period - revenue_prior_year_period) / revenue_prior_year_period
gross_margin             = gross_profit / revenue
operating_margin         = operating_income / revenue
net_margin               = net_income / revenue
free_cash_flow           = operating_cash_flow - capex - principal_payments_finance_leases  // per company's own stated convention; document exceptions inline
```

LBO formulas are registered separately and specified in full in `LBO_SPEC.md` §3–4
(they involve a multi-year debt schedule and are not one-line calculations).

---

## 5. RESTATEMENT AND VERSIONING POLICY

- Every `RawDataPoint` has a `capturedAt` and a `restated` flag. If a company restates
  a prior period (rare for these three, but NVIDIA's non-GAAP definitions changed
  starting Q1 FY2027 — see note below — and this is exactly the kind of change that
  must be tracked, not silently overwritten), the dataset keeps the original value
  with `restated: true` and adds the new value as a new `RawDataPoint`, never
  mutating history in place.
- **Known definitional change to encode at build time:** beginning in Q1 FY2027,
  NVIDIA's non-GAAP financial measures began *including* stock-based compensation
  expense, whereas they previously excluded it. Any trend chart spanning this
  boundary must either restate consistently or visually flag the methodology break —
  do not plot FY2026 non-GAAP figures next to FY2027 non-GAAP figures as if they were
  computed the same way, because they are not. (Source: NVIDIA Q2 FY2027 press
  release, "Non-GAAP Measures" section, August 26, 2026.)
- Market-data-derived figures (price, market cap, EV, and every ratio built on them)
  carry a hard "as of [date]" stamp everywhere they are displayed, not just in a
  global footer — because these are the figures likeliest to look stale to a
  visitor checking against a live quote.

---

## 6. UNIT AND FORMATTING CONVENTIONS

- All currency in USD. Values stored in millions (`USD_millions`) except share price
  and per-share figures, stored in whole dollars.
- Display formatting is a pure function of `MetricDefinition.unit` + magnitude — e.g.
  values ≥ $1,000mm display as "$X.XXB", not "$X,XXXM" — implemented once in a
  `formatCurrency()` utility (see `TECH_ARCHITECTURE.md`), never formatted ad hoc in
  a component.
- Percentages to one decimal place by default (margins, growth rates, yields).
  Ratios (P/E, EV/EBITDA) to one decimal place.
- Fiscal-year labeling always uses the company's own convention and states it
  explicitly the first time it appears on a page (NVIDIA's FY2026 ended January 25,
  2026; Netflix and JPMorgan both use the calendar year as their fiscal year) — never
  assume a reader knows NVIDIA's fiscal year runs roughly one calendar year ahead of
  its label.
