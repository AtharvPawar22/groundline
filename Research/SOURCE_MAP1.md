# SOURCE_MAP.md
## Primary Source Document Map

This lists the exact primary/authoritative documents to use for the initial dataset,
by company, with what each document should be used for. Every document listed here
was directly retrieved and read during this research pass (September 2, 2026) unless
marked "locate at build time." Build agents should treat this as a starting index,
not a substitute for opening each filing directly — re-verify every number pulled
from a document against that document itself, not against this summary, per
`DATA_DICTIONARY.md` §1.1.

Format per entry: **Document — what to pull from it — where to find it — status.**

---

## NVIDIA Corporation (CIK 0001045810)

1. **Form 10-K, fiscal year ended January 25, 2026** (filed ~Feb 25, 2026) — full-year
   income statement, balance sheet, cash flow statement, segment revenue
   disaggregation, Item 1 business description, Item 1A risk factors, Item 7 MD&A.
   Primary source for all FY2026 annual figures.
   `https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm`
   — **retrieved and partially reviewed; re-open directly for exact line-item figures
   before populating `RawDataPoint` records.**

2. **Press release: "NVIDIA Announces Financial Results for Fourth Quarter and Fiscal
   2026"** (Feb. 25, 2026) — headline FY2026 and Q4 FY2026 figures, GAAP/non-GAAP
   reconciliation, outlook.
   `https://www.sec.gov/Archives/edgar/data/1045810/000104581026000019/q4fy26pr.htm`
   — retrieved.

3. **Press release: "NVIDIA Announces Financial Results for Second Quarter Fiscal
   2027"** (Aug. 26, 2026) — most recent quarter as of the research date; full
   condensed income statement, balance sheet, cash flow statement, non-GAAP
   reconciliation including the definitional change (SBC now included in non-GAAP
   from Q1 FY2027 onward — see `DATA_DICTIONARY.md` §5).
   `https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027`
   — retrieved and fully reviewed; this is the richest single document obtained
   during this research pass and should be the primary source for current-quarter
   and balance-sheet figures.

4. **Form 10-Q, quarter ended October 26, 2025** — for Q3 FY2026 detail if needed for
   quarterly trend charts.
   `https://www.sec.gov/Archives/edgar/data/1045810/000104581025000230/nvda-20251026.htm`
   — retrieved (partial).

5. **Prior-quarter press releases (Q1 FY2026, Q2 FY2026, Q3 FY2026, Q1 FY2027)** — for
   the trailing-8-quarter chart data. All filed as 8-K exhibits on SEC EDGAR under
   NVIDIA's CIK; locate each via the SEC EDGAR full-text search or NVIDIA's investor
   relations Quarterly Results page (`https://investor.nvidia.com/financial-info/
   quarterly-results/default.aspx`).

6. **Market data** (share price, market cap, shares outstanding, P/E, TTM aggregates)
   — use a live market-data feed at build time, not the point-in-time figures
   captured during this research pass (~$5.25–5.38T market cap, ~$217–220 share
   price, as of Aug 31–Sept 1, 2026), which will already be stale by the time of
   implementation. Cross-referenced during research: stockanalysis.com,
   companiesmarketcap.com, CNBC quote page, Robinhood.

---

## Netflix, Inc. (CIK 0001065280)

1. **Form 10-K, fiscal year ended December 31, 2025** (filed ~Jan 2026) — full-year
   income statement, balance sheet, cash flow statement, Item 1 business description,
   debt schedule, the WBD acquisition-agreement disclosure (Note on subsequent/
   pending transactions).
   `https://www.sec.gov/Archives/edgar/data/1065280/000106528026000034/nflx-20251231.htm`
   — retrieved (debt/cash table and net income figure directly reviewed).

2. **Form 10-Q, quarter ended June 30, 2026** — most recent full quarterly filing as
   of the research date; contains the official financial-results table (revenue,
   operating income, net income) reconciled to GAAP.
   `https://www.sec.gov/Archives/edgar/data/0001065280/000106528026000212/nflx-20260630.htm`
   — retrieved.

3. **Form 8-K exhibit — Q2 2026 shareholder letter** (filed Jul. 16, 2026) — the
   fullest narrative detail on Q2 2026 results, FY2026 guidance, and the
   post-WBD-collapse capital-allocation commentary (buyback authorization, cash
   content spend).
   `https://www.sec.gov/Archives/edgar/data/0001065280/000106528026000211/ex991_q226.htm`
   — retrieved and fully reviewed.

4. **December 2025 8-K — WBD acquisition agreement announcement**, and **February 26,
   2026 8-K — termination of the WBD agreement** — locate both at build time via SEC
   EDGAR full-text search on Netflix's CIK; needed for the Business tab's treatment
   of the collapsed deal and for the Netflix peer-set caveat regarding WBD/Paramount
   Skydance. Secondary confirmation used during this research pass: Variety (Mar. 4,
   2026), The Motley Fool (Mar. 9, 2026), CNBC (Feb. 26, 2026), eMarketer — all
   consistent on the $27.75/share, ~$82.7B EV original terms and the $2.8B break-up
   fee Netflix received.

5. **8-K confirming stock-split ratio and effective date** — **locate at build
   time.** Research observed a share-price/share-count pattern consistent with
   roughly a 10-for-1 split sometime in the year preceding September 2026 (price fell
   from >$1,200 to ~$81 while diluted shares rose from ~440mm to ~4.16B) but the exact
   ratio and effective date were not directly confirmed against a primary filing
   during this pass — **do not build any historical share-price chart spanning this
   period until this is confirmed**, per `COMPANY_RESEARCH.md` §D.2.

6. **Market data** — as of Sept 1, 2026, market cap ~$337.5B, share price ~$81,
   ~4.16B diluted shares (stockanalysis.com, TradingView) — refresh at build time.

---

## JPMorgan Chase & Co. (CIK 0000019617)

1. **Form 10-K, fiscal year 2025** (filed ~Feb 2026) — full-year consolidated
   statements of income and comprehensive income, balance sheet, segment results,
   Item 1 business description, capital and regulatory disclosure.
   `https://www.sec.gov/Archives/edgar/data/19617/000162828026008131/jpm-20251231.htm`
   — retrieved (net income figure directly reviewed from the comprehensive-income
   statement).

2. **4Q25 Earnings Press Release** (Jan. 13, 2026) — full-year and Q4 2025 headline
   figures, total assets ($4.4T) and stockholders' equity ($362.4B) as of Dec. 31,
   2025, the Apple Card credit-reserve item detail.
   `https://www.jpmorganchase.com/content/dam/jpmc/jpmorgan-chase-and-co/investor-relations/documents/quarterly-earnings/2025/4th-quarter/d868c7ef-1670-465d-ba75-c2b36ddbcc6b.pdf`
   — retrieved.

3. **2Q26 Earnings Press Release** (Jul. 14, 2026) — most recent quarter as of the
   research date; managed revenue, NII, net income (reported and excluding
   significant items), ROTCE, segment detail, FY2026 outlook figures.
   `https://www.jpmorganchase.com/content/dam/jpmc/jpmorgan-chase-and-co/investor-relations/documents/quarterly-earnings/2026/2nd-quarter/6cded9fd-a164-4e6c-8cff-377357cf105c.pdf`
   — retrieved and fully reviewed.

4. **Q2 2026 Earnings Call Transcript** (Jul. 22, 2026 call date as indexed) — outlook
   commentary (NII, expense, charge-off-rate guidance) not always present verbatim in
   the press release; useful for the Business tab's forward-looking framing.
   Secondary aggregation reviewed via The Motley Fool and Yahoo Finance transcript
   pages; verify any quoted figures against the official transcript/webcast on
   `jpmorganchase.com/ir` before use, and keep any direct quotation to the strict
   under-15-word / one-quote-per-source limits noted in this package's own sourcing
   discipline.

5. **1Q26 Form 10-Q** — interim balance sheet ($4.9T total assets, $364.0B
   stockholders' equity as of Mar. 31, 2026) if a Q1 data point is needed for
   trend charts.
   `https://www.jpmorganchase.com/content/dam/jpmc/jpmorgan-chase-and-co/investor-relations/documents/quarterly-earnings/2026/1st-quarter/corp-q1-2026.pdf`
   — retrieved (partial).

6. **Market data** — as of early Sept 2026, market cap in the ~$945–965B range
   (sources converge but don't agree to the dollar — stockanalysis.com ~$963B,
   Robinhood ~$944B same-week), share price ~$355–359, ~2.66B diluted shares, P/B
   ~2.3x. Refresh at build time and pick one feed as the canonical source rather than
   averaging across aggregators.

---

## Peer companies (secondary priority — sufficient for peer-panel display, not for a
full company profile)

| Company | Document to use | Status |
|---|---|---|
| Advanced Micro Devices (AMD) | Most recent 10-K/10-Q and quarterly earnings 8-K exhibit (Q2 2026 results reviewed: revenue $11.5B, +50% YoY) | Q2 2026 slide deck retrieved; full 10-K not yet pulled — locate at build time via SEC EDGAR CIK 0000002488 |
| Broadcom Inc. (AVGO) | Most recent 10-K (fiscal year ends in late Oct/early Nov) and quarterly results | Not yet pulled; FY2025 revenue (~$63.9B, semis + infrastructure software) sourced from secondary aggregation (startupfeed.in) during this pass — **replace with primary 10-K figures at build time, do not ship secondary-sourced peer figures without upgrading to primary** |
| Taiwan Semiconductor Manufacturing Co. (TSM) | Annual report / 20-F (foreign private issuer — different filing regime than the other peers, flag this) | Not yet pulled; used only for qualitative context in V1 (see `COMPANY_RESEARCH.md` D.1) |
| The Walt Disney Company (DIS) | Most recent 10-K (fiscal year ends late September) — FY2025 10-K, filed ~Nov 2025 | Segment-level figures ($94.4B FY2025 revenue, DTC segment ~$24.6B revenue / $1.33B operating income) sourced from secondary aggregation and press coverage during this pass — **verify against the primary 10-K at build time** |
| Comcast Corporation (CMCSA) | Most recent 10-K plus the Versant Media Group spin-off 8-K (effective Jan. 2, 2026) | Not yet pulled — **critical to source the spin-off 8-K specifically**, since Comcast's post-spin financial structure differs from what any pre-2026 filing would show |
| Bank of America (BAC) | FY2025 Annual Report to Shareholders (Form ARS) and 10-K | FY2025 net income figure ($29.055B per one aggregator source; $30.5B appears in a BofA IR chart graphic — **reconcile this discrepancy against the primary 10-K/ARS at build time**, don't ship both numbers) |
| Goldman Sachs (GS) | Most recent 10-K/10-Q | Not yet pulled — locate at build time |
| Wells Fargo (WFC) | Most recent 10-K/10-Q, plus confirm current status of any Federal Reserve asset cap / consent order | Not yet pulled — the asset-cap status specifically must be checked at build time, as noted in `COMPANY_RESEARCH.md` D.3, since it is a live regulatory situation that has changed over time |

---

## Historical deal case study (Dell 2013 — see `LBO_SPEC.md` §9)

| Document | Purpose | Status |
|---|---|---|
| Form 8-K, Feb. 5, 2013 (announcement) | Headline terms: $13.65/share, ~$24.4B transaction value, 25% premium to $10.88 undisturbed price | Retrieved and reviewed (`sec.gov/Archives/edgar/data/0000826083/000119312513038969/d480650dex991.htm`) |
| Form DEFA14A, Mar. 29, 2013 | Preliminary proxy confirmation of terms | Retrieved and reviewed |
| Form DFAN14A, Jun. 26, 2013 (Icahn/Southeastern soliciting material) | Evercore/BCG projected sponsor returns (Silver Lake up to 44.7% IRR, Michael Dell up to 50.1% IRR over 4–5 years) — a genuinely rare public disclosure of projected LBO sponsor returns, directly useful for the case study | Retrieved and reviewed |
| Form SC 13E-3/A filings | Financing structure detail (Silver Lake equity up to $2B, Michael Dell rollover + ~$700mm cash, Microsoft's $2B, debt financing banks) | Retrieved (partial) |
| Closing 8-K, ~October 2013 | Final, as-closed per-share price and terms (differs from the original $13.65 announcement due to the Icahn-driven amendment) | **Not yet located — required before building the case study**, per the explicit caveat in `LBO_SPEC.md` §9 |

---

## General sourcing discipline for the build agent

- Every number that ends up in the product must trace to one row in this map (or an
  explicit addition to it) and one `RawDataPoint` record per `DATA_DICTIONARY.md`
  §1.1 — no number should exist in the codebase without a source it can point back to.
- Where this research pass used a secondary aggregator (stockanalysis.com,
  companiesmarketcap.com, TradingView, Yahoo Finance, etc.) for a figure a primary
  filing would also contain (net income, revenue, balance-sheet items), **upgrade to
  the primary filing before shipping.** Secondary sources are acceptable, permanently,
  only for point-in-time market data (share price, market cap, real-time multiples)
  that companies do not themselves publish continuously.
- Where two sources disagreed during this research pass (flagged explicitly above —
  Bank of America's FY2025 net income, JPMorgan's exact market-cap figure), resolve
  by going to the primary filing or a single canonical live feed, document which
  source won and why in the `notes` field of the resulting `RawDataPoint`, and do not
  average or split the difference.
