# SOURCE_MAP.md
Exact documents identified during research for the initial dataset. URLs and dates below were verified live during research (September 2, 2026). **Before final build, re-fetch each primary filing directly and pull exact page/table references** — this pack identifies the correct documents and the correct headline figures with cross-checks, but pinpoint page citations inside long SEC filings should be captured by whoever builds the final `SourcedValue` records, opening each filing directly.

Source-type key: 🔵 Primary (SEC filing or direct company release) · 🟡 Secondary/vendor-aggregated (use for cross-checking and for figures not yet available in a filed primary source, e.g. live market multiples)

---

## NVIDIA (NVDA)

| Document | Type | URL | Date | Use for |
|---|---|---|---|---|
| NVIDIA FY2025 Form 10-K | 🔵 Primary | sec.gov/Archives/edgar/data/1045810/000104581025000023/nvda-20250126.htm | Filed ~Feb 2025 (period ended Jan 26, 2025) | Audited FY2025 figures, CapEx ($3.4B, directly confirmed in filing text), balance sheet |
| NVIDIA Q4 & FY2025 earnings release | 🔵 Primary | nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2025 | Feb 2025 | Revenue $130.5B FY2025, EPS figures |
| NVIDIA 10-Q (Q1 FY2026, period ended Apr 27, 2025) | 🔵 Primary | sec.gov/Archives/edgar/data/1045810/000104581025000116/nvda-20250427.htm | Filed ~May 2025 | Quarterly detail, goodwill/intangible notes |
| NVIDIA 10-Q (Q2 FY2026, period ended Jul 27, 2025) | 🔵 Primary | sec.gov/Archives/edgar/data/1045810/000104581025000209/nvda-20250727.htm | Filed ~Aug 2025 | Quarterly detail |
| NVIDIA 10-Q (Q3 FY2026, period ended Oct 26, 2025) | 🔵 Primary | sec.gov/Archives/edgar/data/1045810/000104581025000230/nvda-20251026.htm | Filed ~Nov 2025 | Quarterly detail |
| NVIDIA Investor Relations financial reports index (Q2 FY2027 release, period ended Jul 26, 2026, reported Aug 26, 2026) | 🔵 Primary | investor.nvidia.com/financial-info/financial-reports/default.aspx | Aug 26, 2026 | Most recent quarterly revenue ($96.2B) for TTM context |
| stockanalysis.com — NVDA financials/statistics | 🟡 Secondary | stockanalysis.com/stocks/nvda/financials/ and /statistics/ | Data as of Aug 31, 2026 | FY2026 headline figures, market cap, P/E, EV/EBITDA — **use as primary vendor source for consistency across market-derived metrics** |
| companiesmarketcap.com — NVDA | 🟡 Secondary | companiesmarketcap.com/nvidia/marketcap/ | Aug 28, 2026 | Cross-check for market cap ($5.25T — agrees with stockanalysis.com) |
| MacroTrends — NVDA P/E | 🟡 Secondary | macrotrends.net/stocks/charts/NVDA/nvidia/pe-ratio | Aug 28, 2026 | Cross-check only — differs from stockanalysis.com by ~3 points, documented in DATA_DICTIONARY.md conflict log |
| Bullfincher — NVIDIA financial statements | 🟡 Secondary, lower confidence | bullfincher.io/companies/nvidia-corporation/financial-statements | — | FY2025 EBITDA ($86.14B, calculated not company-reported), gross/operating margin — **flag as needs_verification against the 10-K directly, do not treat as primary** |

---

## NETFLIX (NFLX)

| Document | Type | URL | Date | Use for |
|---|---|---|---|---|
| Netflix FY2025 Form 10-K | 🔵 Primary | Referenced via SEC filing coverage (TradingView news summary of the filing) — **pull the filing directly from sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001065280 at build time for the exact accession number** | Filed ~Jan 2026 (period ended Dec 31, 2025) | Revenue $45,183M, operating income $13,327M, net income $10,981M |
| Netflix FY2024 Form 10-K | 🔵 Primary | sec.gov/Archives/edgar/data/1065280/000106528025000044/nflx-20241231.htm | Filed Jan 2025 | Prior-year comparison base |
| Netflix Q4 2024 shareholder letter | 🔵 Primary | cdn.arstechnica.net/wp-content/uploads/2025/01/FINAL-Q4-24-Shareholder-Letter.pdf (mirrored copy — prefer ir.netflix.net original at build time) | Jan 21, 2025 | FY2024 debt/net debt figures, FCF guidance philosophy language |
| Netflix Q3 2025 update (via TipRanks/TheFly coverage) | 🟡 Secondary reporting of 🔵 primary company language | tipranks.com/news/the-fly/netflix-sees-2025-free-cash-flow-of-about-9b-thefly | Q3 2025 report | Gross debt $14.5B, cash $9.3B, FY2025 FCF guidance ~$9B — **re-source the original Q3 2025 shareholder letter directly from ir.netflix.net at build time** |
| Netflix 8-K, Q2 2026 (non-GAAP FCF reconciliation) | 🔵 Primary | sec.gov/Archives/edgar/data/0001065280/000106528026000211/ex991_q226.htm | Aug 2026 | Most recent operating cash flow detail |
| stockanalysis.com — NFLX statistics | 🟡 Secondary | stockanalysis.com/stocks/nflx/statistics/ | Aug 21, 2026 | TTM revenue/profit, P/E 25.25, EV/EBITDA 23.17 — **primary vendor source used** |
| GuruFocus — NFLX EV/EBITDA | 🟡 Secondary | gurufocus.com/term/enterprise-value-to-ebitda/NFLX | Aug 9, 2026 | Conflicting EV/EBITDA (8.97x) — used deliberately as the documented conflict example, see DATA_DICTIONARY.md |
| stockanalysis.com / MacroTrends — NFLX market cap | 🟡 Secondary | stockanalysis.com/stocks/nflx/market-cap/ ; macrotrends.net/stocks/charts/NFLX/netflix/market-cap | Sept 1, 2026 / Aug 28, 2026 | Market cap $337.49B / $340.28B — agree closely |
| Wikipedia — "Proposed acquisition of Warner Bros. Discovery by Paramount Skydance" | 🟡 Secondary (well-cited) | en.wikipedia.org/wiki/Proposed_acquisition_of_Warner_Bros._Discovery_by_Paramount_Skydance | Ongoing, checked Sept 2026 | Deal timeline background — **for final build, cite the underlying primary sources directly (Paramount/WBD press releases below), not Wikipedia** |
| Paramount press release — deal announcement | 🔵 Primary | paramount.com/press/paramount-to-acquire-warner-bros-discovery-to-form-next-generation-global-media-and-entertainment-company | Feb 27, 2026 | Deal terms ($31.00/share, all-cash) |
| WBD IR — shareholder approval | 🔵 Primary | ir.wbd.com/news-and-events/financial-news/financial-news-details/2026/Warner-Bros--Discovery-Stockholders-Approve-Transaction-with-Paramount-Skydance/default.aspx | Apr 23, 2026 | Confirms shareholder approval, Q3 2026 expected close |
| Britannica Money — deal background/litigation status | 🟡 Secondary | britannica.com/money/netflix-paramount-skydance-battle-for-warner-bros | ~Aug 2026 | State AG litigation status as of July 2026 — verify against primary court filings if this background is used in-product |

---

## JPMORGAN CHASE (JPM)

| Document | Type | URL | Date | Use for |
|---|---|---|---|---|
| JPMorgan Chase FY2025 Form 10-K | 🔵 Primary | sec.gov/Archives/edgar/data/19617/000162828026008131/jpm-20251231.htm | Filed ~Feb 2026 (period ended Dec 31, 2025) | ROTCE, TCE reconciliation, full audited annual figures |
| JPMorgan Q4 2025 earnings release | 🔵 Primary | sec.gov/Archives/edgar/data/19617/000162828026001902/a4q25erfexhibit991narrative.htm | Jan 2026 | FY2025 net income $57.0B, Q4 net income $13.0B / $14.7B ex-item, the Apple card portfolio reserve disclosure |
| JPMorgan Q4 2025 earnings press release (formatted) | 🔵 Primary | jpmorganchase.com/content/dam/.../4th-quarter/d868c7ef-1670-465d-ba75-c2b36ddbcc6b.pdf | Jan 2026 | EPS $20.02 FY2025, CET1 ratios |
| JPMorgan Q3 2025 earnings release | 🔵 Primary | sec.gov/Archives/edgar/data/19617/000162828025044845/a3q25erfexhibit991narrative.htm | Oct 2025 | Q3 2025 net income $14.4B, net revenue $47.1B |
| JPMorgan 3Q25 earnings presentation | 🔵 Primary | jpmorganchase.com/content/dam/.../3rd-quarter/a66755ce-2daf-4303-bae0-55cb6a121a3a.pdf | Oct 14, 2025 | ROTCE, CET1, book value per share detail |
| JPMorgan "Three-Year Summary of Consolidated Financial Highlights" / MD&A | 🔵 Primary | jpmorganchase.com/content/dam/.../managements-discussion-analysis-2025.pdf | 2025 annual MD&A | TCE/ROTCE reconciliation methodology |
| The Asian Banker — FY2025 results summary | 🟡 Secondary | theasianbanker.com/updates-and-articles/jpmorgan-chase-posts-57b-profit-in-2025-plans-105b-spend-as-rate-tailwinds-fade | Mar 25, 2026 | Segment ROE breakdown (AWM 40%, CCB 32%, CIB 18%), total assets $4.4T, TBVPS $107.56 |
| stockanalysis.com — JPM statistics | 🟡 Secondary | stockanalysis.com/stocks/jpm/statistics/ | ~Aug 2026 | Market cap $962.95B, EV $779.84B, P/E 15.49, shares outstanding — **primary vendor source used** |
| Robinhood — JPM quote | 🟡 Secondary | robinhood.com/us/en/stocks/JPM/ | Sept 1, 2026 | Cross-check market cap ($944.49B) — documented conflict, resolved in DATA_DICTIONARY.md |
| GuruFocus / fullratio.com — JPM P/E | 🟡 Secondary | gurufocus.com/term/pettm/JPM ; fullratio.com/stocks/nyse-jpm/pe-ratio | Aug 12–13, 2026 | Cross-check P/E (15.57–15.62) — converges with stockanalysis.com |
| Yahoo Finance — JPM key statistics | 🟡 Secondary | finance.yahoo.com/quote/JPM/key-statistics/ | Q2 2026 | P/B ratio 2.33x |

---

## PEERS

| Company | Document | Type | URL | Date |
|---|---|---|---|---|
| AMD | stockanalysis.com statistics | 🟡 Secondary | stockanalysis.com/stocks/amd/statistics/ | Aug 24, 2026 |
| AMD | Q2 2026 8-K financial results | 🔵 Primary | sec.gov/Archives/edgar/data/0000002488/000000248826000121/amdq22026earningsslidesf.htm | Aug 4, 2026 |
| Broadcom | stockanalysis.com statistics | 🟡 Secondary | stockanalysis.com/stocks/avgo/statistics/ | Aug 28, 2026 |
| Broadcom | Multiples.vc public comps | 🟡 Secondary | multiples.vc/public-comps/broadcom-valuation-multiples | May 28, 2026 (re-verify closer to build date) |
| Disney | Multiples.vc public comps | 🟡 Secondary | multiples.vc/public-comps/disney-valuation-multiples | Aug 25, 2026 |
| Disney | stock-analysis-on.net EV/EBITDA history (built on 10-Ks) | 🟡 Secondary, filing-derived | stock-analysis-on.net/NYSE/Company/Walt-Disney-Co/Valuation/EV-to-EBITDA | Based on FY2025 10-K (period ended Sept 27, 2025) |
| Comcast | stockanalysis.com statistics | 🟡 Secondary | stockanalysis.com/stocks/cmcsa/statistics/ | — |
| Comcast | companiesmarketcap.com | 🟡 Secondary | companiesmarketcap.com/comcast/marketcap/ | Aug 4, 2026 |
| Bank of America | 8-K, Q1 2026 results | 🔵 Primary | sec.gov/Archives/edgar/data/0000070858/000007085826000222/bac03312026ex992.htm | Apr 15, 2026 |
| Bank of America | MacroTrends market cap | 🟡 Secondary | macrotrends.net/stocks/charts/BAC/bank-of-america/market-cap | Jun 29, 2026 (stale relative to Sept 2026 — re-pull) |
| Bank of America / Wells Fargo | Yahoo Finance comparison article | 🟡 Secondary | finance.yahoo.com/markets/stocks/articles/more-bang-buck-bank-america-131504660.html | Jul 6, 2026 |
| Banking sector | IndMoney Q2 2026 bank earnings scorecard (JPM, BAC, GS, WFC, C) | 🟡 Secondary, well-cited | indmoney.com/blog/us-stocks/us-bank-earnings-q2-jpm-bac-gs-wfc-citi-stock-earnings | Jul 14, 2026 |

---

## Standing Instructions for the Build Team

1. **Every SEC filing URL above is a real, live filing found during research** — open it directly rather than re-searching, and pull the exact table/page for each figure into the `SourcedValue.source` field.
2. **Vendor sites (stockanalysis.com, MacroTrends, GuruFocus, companiesmarketcap.com) are acceptable for market-derived figures** (market cap, P/E, EV/EBITDA) that aren't disclosed as clean line items in filings — but always prefer the company's own primary disclosure for anything that is directly reported (revenue, net income, CapEx, debt, cash).
3. **Re-verify every figure within roughly one quarter of the actual build date.** This pack is dated September 2, 2026 — if the build happens materially later, at minimum re-pull market cap, P/E, and EV/EBITDA for all six companies (three flagship + relevant peers), since those move daily and the rest of this pack's structure/methodology still holds.
4. **Never fill a missing field with an estimate presented as fact.** Where this pack flags a figure as estimated or in need of verification (AMD's derived market cap, Netflix's exact FY2025 year-end debt figure, Wikipedia-sourced deal background), the final dataset must either replace it with a verified primary figure or carry the same "needs_verification" flag through to the live `SourcedValue.confidence` field.
