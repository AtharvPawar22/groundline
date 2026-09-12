# PRODUCT_SPEC.md
## Premium Interactive Financial Research Website — Product Specification

Research conducted September 2, 2026. All financial figures cited elsewhere in this
package were current as of that date and are labeled with their fiscal period and
source. This document is the entry point to the package — read it first, then
`COMPANY_RESEARCH.md`, then the rest in any order.

---

## A. EXECUTIVE PRODUCT BRIEF

**What it is.** A three-company financial research site — NVIDIA, Netflix, JPMorgan
Chase — built on the premise that *financial data itself should teach financial
literacy*. Every number a visitor sees is simultaneously a real, sourced fact about a
real company and a doorway into a plain-English explanation of what that number means,
why professionals care about it, and what it specifically implies for the company on
screen. The product is not a stock screener, not a news aggregator, and not a course.
It is a small number of very deep, very well-designed pages.

**Who it's for.** Two readers at once, on the same page, without a "beginner mode"
toggle: (1) a finance professional who wants to see whether the data is accurate, the
peer set defensible, and the LBO math correct; (2) a curious non-professional who has
seen "EBITDA" or "enterprise value" a hundred times and never had it explained in
terms of a company they recognize. The design serves both by putting the explanation
one click away rather than in the primary reading path — the professional never has to
see it, the beginner always can.

**Why these three.** See `COMPANY_RESEARCH.md` §B for the full evaluation. Short
version: the trio is kept, but with one significant adaptation — the LBO module is not
applied uniformly. NVIDIA and Netflix get a standard interactive LBO (with a
scale-appropriate "this is a mechanics sandbox, not a deal thesis" framing for
NVIDIA). JPMorgan does **not** get a conventional EBITDA-multiple LBO screen, because
that mechanic is genuinely inapplicable to a bank holding company and faking it would
be the single worst thing this product could do to its own credibility. JPMorgan
instead gets a "Why Banks Don't Get Leveraged Buyouts" interactive module built on
capital and ROE mechanics. This is treated as a *feature*, not a limitation — it is
the clearest possible demonstration of the product's central promise: different
businesses require different financial frameworks, and a trustworthy tool says so
instead of forcing every company into the same template.

**What "done" looks like.** A finance professional lands on the NVIDIA page, checks
the EV/EBITDA math against the 10-K, and thinks "this is unusually careful." A
beginner clicks the (i) next to "Free Cash Flow" on the Netflix page and, thirty
seconds later, understands why Netflix's GAAP operating income and its cash generation
tell two different stories because of content amortization — and could explain it to
someone else.

---

## B. RECOMMENDED THREE COMPANIES

**Decision: keep NVIDIA, Netflix, JPMorgan Chase**, with the LBO-module adaptation
described above and in `LBO_SPEC.md` §7. Full scoring rationale, the alternative trios
considered, and why they were rejected are in `COMPANY_RESEARCH.md` §B. This section
gives only the summary a build agent needs before touching code.

| Criterion | NVIDIA | Netflix | JPMorgan Chase |
|---|---|---|---|
| Recognizability | Extremely high (most valuable public company, ~$5.2–5.4T market cap as of early Sept 2026) | Extremely high (consumer brand) | High (largest U.S. bank by assets) |
| Data richness | Very high — quarterly press releases are unusually detailed | High | Very high — most heavily disclosed U.S. bank |
| Distinct business model | Fabless semiconductor design, platform economics | Subscription media, content amortization economics | Regulated depository/lending/markets institution |
| Peer availability | Strong (AMD, Broadcom, TSMC) | Strong but currently in flux (Disney, Comcast, WBD/Paramount consolidation — see below) | Strong (BofA, Wells Fargo, Goldman Sachs) |
| Valuation framework needed | EV/EBITDA, EV/Revenue, growth-adjusted multiples | EV/EBITDA (with FCF caveat), P/E | P/E, P/B, ROTCE — **not** EV/EBITDA |
| LBO suitability | Poor as a real deal (too large, too high-multiple) — good as a *mechanics sandbox*, clearly labeled | Best fit of the three for a standard LBO exercise | Not applicable in standard form — used to teach *why* |
| Pedagogical payoff of inclusion | Hypergrowth economics, GAAP vs. non-GAAP, equity-securities gains distorting net income | EBITDA's blind spot (content amortization is a real cash cost, not a non-cash add-back the way PP&E depreciation is) | Why "enterprise value" barely means anything for a bank; regulatory capital as the real constraint |

**Do not silently swap the trio.** The brief's instruction to "not blindly accept" the
three companies was honored by running this evaluation, not by finding a reason to
change the answer. The one real adaptation — how JPMorgan's LBO experience differs
from the other two — is the correct response to what the evaluation found.

---

## C. PAGE-BY-PAGE INFORMATION ARCHITECTURE

### Global structure

```
/                          Home — three-company entry point, no hero section
/[company]                 Company shell (persistent header, sticky section nav)
  /[company]/overview      Default landing tab within a company
  /[company]/business
  /[company]/financials
  /[company]/valuation
  /[company]/lbo
/compare                   Cross-company comparison
/glossary                  Full glossary, browsable and searchable
/glossary/[term]           Deep link to a single term (used by every (i) icon)
/methodology                A short, honest page: what "as of" means, restatement
                            policy, what is GAAP vs. non-GAAP, disclaimer that this is
                            not investment advice
```

There is no `/news`, no `/screener`, no `/portfolio`, no account system. See §M.

### Home (`/`)

- No hero, no tagline, no marketing copy above the fold.
- Three company entry tiles: logo-mark (text wordmark, not a lifted brand asset —
  see IP note in `TECH_ARCHITECTURE.md`), ticker, one-line business description, and
  a single "headline number" per company (market cap as of the data snapshot date),
  each rendered in the numeric-hierarchy type treatment described in `UI_SPEC.md`.
- Below the tiles: one paragraph, restrained, explaining the product's premise in
  plain language (the "click the number, understand the number" idea) — not a value
  proposition, closer to a masthead note. No CTA buttons, no email capture.
- Footer: link to `/methodology`, last-updated date for the dataset, link to source
  documents.

### Company shell (`/[company]`)

Persistent elements across all five tabs for a given company:
- Header: company name, ticker, exchange, industry, one-line description, and a
  compact "vitals strip" (market cap, EV, price, as-of date) that stays visible on
  scroll (not a full sticky navbar — a slim condensed bar, per `UI_SPEC.md`).
- Tab bar: Overview / Business / Financials / Valuation / LBO. JPMorgan's fifth tab
  is labeled **"Bank Economics"** instead of "LBO" — same slot, different content and
  different label, because calling it "LBO" and then not delivering one is worse than
  not having the tab at all.
- Every metric value in every tab carries an (i) affordance. See §D and `UI_SPEC.md`
  §Interactions for exact behavior.

#### Overview tab
Ticker/exchange/industry header data; concise business description (2–3 short
paragraphs, sourced to the 10-K Item 1 and MD&A, paraphrased — see copyright
handling in `TECH_ARCHITECTURE.md`); vitals grid: market cap, enterprise value,
revenue (latest FY and TTM), EBITDA where meaningful, net income, free cash flow,
revenue growth, 2–3 company-specific operating KPIs (see `COMPANY_RESEARCH.md` for
which KPIs per company). Each vitals-grid cell is a (i)-enabled metric.

#### Business tab
What the company sells; how it makes money (revenue model, not just a segment list);
major segments with revenue mix (visualized, not just tabulated); customer
concentration and channel structure where disclosed; the 2–4 business-specific KPIs
that actually drive the model (e.g., Data Center revenue mix for NVIDIA, paid
memberships/ARM for Netflix, NII and efficiency ratio for JPMorgan); a short
"what could go wrong" section drawn from the company's own risk-factor disclosures,
paraphrased and reduced to the 3–4 risks that are actually material to the thesis (not
the boilerplate 30-item list every 10-K contains).

#### Financials tab
Multi-year (5-year where data quality supports it — flagged per company in
`DATA_DICTIONARY.md`) statement view: revenue, gross profit, operating income, EBITDA
(where meaningful — explicitly withheld or caveated for JPMorgan, see
`DATA_DICTIONARY.md`), net income, margins, operating cash flow, capex, free cash
flow, cash, debt, net debt. Chart-first presentation (trend lines/bars) with a
toggleable full table underneath. Period selector (quarterly last 8, annual last 5).

#### Valuation tab
Company-appropriate multiples only (see table in §B above and full detail in
`DATA_DICTIONARY.md`). A peer comparison panel with the 2–3 peers selected in
`COMPANY_RESEARCH.md`, each peer's multiple shown alongside the subject company's,
with a one-line "why this peer" note and a one-line "where the comparison breaks
down" caveat per peer — the caveat is not optional decoration, it is required content
per peer.

#### LBO tab (NVIDIA, Netflix) / Bank Economics tab (JPMorgan)
Full spec in `LBO_SPEC.md`. Inputs on the left or top (responsive), live-updating
outputs and a sensitivity grid on the right/below. NVIDIA's tab opens with a single
sentence of framing ("illustrative mechanics only — see why") that is unmissable but
not alarmist, one click from a fuller explanation in the glossary.

### Compare (`/compare`)

Side-by-side of all three companies on the metrics that are legitimately comparable
across all three (revenue, revenue growth, market cap, P/E, net margin) plus a section
that is explicit about what is *not* comparable (EV/EBITDA is shown for NVIDIA and
Netflix and explicitly blank-with-explanation for JPMorgan, not silently omitted).
This page is where the "different industries need different frameworks" thesis is
made most visible.

### Glossary (`/glossary`, `/glossary/[term]`)

Every term from `FINANCE_GLOSSARY.md`, browsable, searchable, and deep-linkable. Each
term page shows the four-part schema (What It Means / Why It Matters / This Company /
caveat) for **all three companies at once** where the term applies to more than one,
so a visitor who arrived from NVIDIA's EBITDA tooltip can see the same term applied to
Netflix and JPMorgan without leaving the glossary. This is what makes the glossary a
real feature rather than an appendix.

---

## D. THE EXPLANATION SYSTEM (interaction contract)

This is the core mechanic and it must behave identically everywhere:

1. Every metric label in every table, chart axis, and vitals cell has a small (i)
   glyph immediately after it (not a separate legend, not hover-only — see
   accessibility requirement in `UI_SPEC.md`).
2. Clicking/tapping opens an inline expansion directly beneath the metric (not a
   modal, not a route change) containing exactly four short blocks, in this order,
   every time, using this schema and no other:
   - **What it means** — one or two sentences, plain English, no jargon-in-the-
     definition.
   - **Why it matters** — one or two sentences, investor/analyst framing.
   - **Formula** — shown only where a formula is genuinely clarifying (omit for
     pure definitions like "Cash").
   - **This company** — one or two sentences using the *live, real number* on the
     page the visitor is currently looking at, not a static example. If the visitor
     is on Netflix, the EBITDA explanation must cite Netflix's actual EBITDA figure
     for the period currently displayed.
   - **Caveat** (where one exists) — the misconception or limitation. This block is
     omitted, not stubbed, when there genuinely isn't one — do not manufacture
     caveats to fill the slot.
3. A "see full glossary entry" link at the bottom of the expansion routes to
   `/glossary/[term]`.
4. Only one expansion is open at a time per table/section (opening a second closes
   the first) to keep the page calm — this is a deliberate constraint, not an
   oversight.

Full content for every term (all four blocks, per company) lives in
`FINANCE_GLOSSARY.md`; this section defines only the interaction contract.

---

## E. SOURCE DESIGN

Every sourced number carries a citation. Recommended pattern, decided after weighing
three options:

- **Rejected: footnote system** (numbered superscripts to an endnotes list). Standard
  in print, but breaks the "explanation is one click away, in place" principle this
  product is built around — it sends the reader to the bottom of the page instead of
  keeping them at the number.
- **Rejected: always-visible source captions** under every number. Correct
  information but visually loud at the density this product needs; would fight the
  "quiet, editorial" brief in §12.
- **Chosen: compact source popover**, opened by a small superscript source-mark
  (distinct glyph from the (i) explanation icon — the two must never be visually
  confusable) next to any number that came from an external filing or market-data
  feed. The popover shows, in this fixed order:
  ```
  NVIDIA Corporation
  Form 10-K, fiscal year ended January 25, 2026
  Filed February 25, 2026 · SEC EDGAR
  [View filing →]
  ```
  For market-derived values (price, market cap): `Market Data · Source: [feed] · As
  of [timestamp]`. Calculated values (e.g., EV, net debt) get a source popover that
  instead shows the calculation and links to the *inputs'* sources rather than citing
  a single filing.
- A single **"Sources" drawer**, reachable from the company header, lists every
  primary document used for that company's dataset in one place — for the visitor who
  wants to audit everything at once rather than number-by-number. This is the
  concession to the professional reader; it should never be the only way to see a
  source (that would be clutter-avoidance at the cost of credibility).

Every data point's structured record (see `DATA_DICTIONARY.md`) carries source
document, source date, and exact section/table where practical — this is populated at
data-authoring time, not fetched live.

---

## F. INTERACTION DESIGN (non-gimmick inventory)

Every interaction below exists because it serves a specific comprehension purpose.
None are decorative.

| Interaction | Purpose |
|---|---|
| (i) metric expansion | Core teaching mechanic — see §D |
| Source popover | Credibility without visual clutter — see §E |
| Period selector (quarterly/annual, trailing N) | Lets the reader see a trend, not a snapshot |
| Chart hover crosshair with exact value | Precision on demand without permanent axis clutter |
| Revenue-segment breakdown (hover/tap a segment to isolate it in the chart) | Makes "how it makes money" spatial rather than a table to parse |
| LBO input sliders + linked numeric fields | Immediate causal feedback — move debt/EBITDA, watch MOIC and IRR respond, with sources & uses re-rendering live |
| Sensitivity grid cell hover (highlights the row/column driver) | Makes "which assumption matters most" visible instantly |
| Peer-comparison row hover (highlights that peer across the whole panel) | Ties a multiple back to the specific company producing it |
| Comparison-page metric toggle (switch which metric drives the bar chart) | One chart, several honest comparisons, no dashboard sprawl |

**Explicitly rejected as gimmicks:** animated number count-ups on page load, confetti
or celebratory micro-animations on LBO "good" outcomes, a quiz/gamified scoring layer,
progress bars for "how much of the site you've explored," parallax scrolling, any
sound.

---

## L. QA CHECKLIST

See `QA_CHECKLIST.md` for the full, standalone checklist.

---

## M. "DO NOT BUILD" LIST

Explicit scope boundary. If a feature is not on the "build" side of this package, it
is out of scope for V1, full stop — not "maybe later in this same PR."

**Do not build:**
- A fourth, fifth, or Nth company, or an "add your own ticker" feature.
- User accounts, watchlists, portfolios, or saved preferences of any kind.
- A live/real-time data pipeline. The dataset is versioned and researched, not
  streamed. (See `TECH_ARCHITECTURE.md` §Data.)
- A news feed, headline ticker, or any aggregation of third-party articles.
- A stock screener or filter-across-many-companies tool (the comparison page covers
  the legitimate cross-company use case for exactly three companies; do not
  generalize it).
- A full DCF builder. DCF is defined and explained in the glossary (it's a term
  people encounter) but is **not** an interactive tool in V1 — only the LBO gets the
  full interactive treatment. Do not scope-creep a second interactive model.
- Options chains, technical-analysis indicators (moving averages, RSI, etc.), or any
  trading-adjacent tooling. This product explains fundamentals, not trading signals.
- Social features: comments, sharing scorecards, leaderboards.
- Gamification of any kind: XP, streaks, badges, "finance literacy score." The brief
  is explicit that "fun through interaction, not gamification" — a badge system is
  the single fastest way to violate that.
- A generic, uncurated "EBITDA calculator" that accepts arbitrary user-entered
  numbers unconnected to any of the three companies. The LBO tool's inputs are
  pre-seeded from real company data specifically so the tool stays anchored to
  something real; a blank-slate calculator is a different (and out-of-scope) product.
- Mobile native apps. Responsive web only for V1.
- Localization/i18n and multi-currency. All figures in USD, English only, for V1.
- An "explain like I'm 5" difficulty toggle or reading-level switch. The four-part
  explanation schema in §D is written to work for both audiences at once; a second
  register is redundant complexity, not a real user need.
