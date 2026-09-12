# COMPANY_RESEARCH.md
Company-by-company content plan. All figures below carry their source and as-of date; full citation detail (filing names, URLs, accession numbers) is in SOURCE_MAP.md. Figures are a research baseline for the build — re-verify anything more than ~2 quarters old before shipping, and always display the "as of" date in the UI next to the number.

---

## 1. NVIDIA (NVDA · NASDAQ · Semiconductors / AI infrastructure)

### Overview snapshot (build these fields)
| Field | Value | Period | Source |
|---|---|---|---|
| Revenue | $215.94B | FY2026 (ended ~Jan 25, 2026) | stockanalysis.com, cross-check against NVDA 10-K when filed |
| Revenue (prior FY, for growth context) | $130.5B | FY2025 (ended Jan 26, 2025) | NVIDIA Q4 FY2025 earnings release (nvidianews.nvidia.com) |
| Revenue growth | 65.5% YoY (FY26 vs FY25) | FY2026 | derived |
| Net income | $120.07B | FY2026 | stockanalysis.com |
| TTM revenue (most recent) | $302.97B | TTM through Q2 FY2027 (ended Jul 26, 2026) | stockanalysis.com statistics, as of Aug 31, 2026 |
| TTM net income | $192.88B | same TTM | stockanalysis.com |
| Gross margin | ~75% (FY2025: 74.99%) | FY2025 baseline; re-pull FY2026 exact figure at build time | Bullfincher (secondary — verify against 10-K) |
| Operating margin | ~62% (FY2025: 62.42%) | FY2025 baseline | Bullfincher (secondary) |
| Market capitalization | $5.25 trillion | Aug 28–31, 2026 | stockanalysis.com / companiesmarketcap.com (agree) |
| P/E (trailing) | 27.88 | Aug 31, 2026 | stockanalysis.com — note: MacroTrends shows 31.53 (Aug 28, 2026); treat stockanalysis as primary, flag the ~3-point spread as a normal EPS-timing/methodology difference in the source drawer |
| EV/EBITDA | 26.34 | Aug 31, 2026 | stockanalysis.com |
| Shares outstanding | 24.15 billion | Aug 2026 | stockanalysis.com |
| CapEx | $3.4B | FY2025 | **Primary source — NVIDIA FY2025 10-K text, directly quoted figure** |

### Business model content
NVIDIA sells accelerated computing hardware and software, reporting through two segments: **Compute & Networking** (data-center GPUs, AI/HPC platforms, networking, automotive platforms) and **Graphics** (gaming GPUs, professional visualization). As of the most recent quarter reported, data center revenue was the overwhelming majority of the business (~$89–96B in a single quarter as of mid-2026), driven by hyperscaler and enterprise AI infrastructure spend. Customers are direct (add-in-board manufacturers, OEMs/ODMs, cloud service providers, system integrators) rather than end consumers for the dominant segment.

**Growth drivers to explain:** AI training and inference compute demand, new architecture cycles (Blackwell ramp referenced through FY2025–2026), and customer concentration risk among a small number of hyperscale buyers — worth one caveat line, since customer concentration is a real, disclosed risk factor.

**Cost structure:** extremely asset-light relative to revenue — CapEx of $3.4B against $130.5B+ revenue in FY2025 is a useful, concrete number for teaching "why gross margin alone doesn't tell you about capital intensity."

### Peers — AMD and Broadcom
| | NVIDIA | AMD | Broadcom |
|---|---|---|---|
| Market cap | $5.25T (Aug 2026) | ~$578B (derived: 1.63B shares × ~$355/share, Aug 2026 — **verify exact figure at build time, this is estimated**) | $1.761T (Aug 31, 2026) |
| TTM Revenue | $302.97B | $41.31B | $75.47B |
| TTM Net income | $192.88B | $6.43B | $29.32B |
| EV/EBITDA | 26.34x | 79.87x | 43.08x |
| P/E (trailing) | 27.88x | 120.79x | 61.83x |

**Comparability rationale:** AMD is the closest direct competitor in GPUs/data-center accelerators — same customer base, same AI-cycle exposure, much smaller scale. Broadcom is comparable on custom AI silicon/networking exposure but has a materially different, more diversified business (networking, software via VMware, broadcom's own ASIC business) — flag this difference explicitly rather than presenting Broadcom as a pure-play comp. **Caveat to surface in the UI:** AMD's and Broadcom's much higher P/E and EV/EBITDA multiples relative to NVIDIA do not mean they are "more expensive" in a simple sense — their earnings bases are far smaller and analysts are pricing in a different growth/market-share trajectory. This is a good "why does anyone care about multiples" teaching moment.

---

## 2. NETFLIX (NFLX · NASDAQ · Streaming entertainment)

### Overview snapshot
| Field | Value | Period | Source |
|---|---|---|---|
| Revenue | $45,183M | FY2025 (ended Dec 31, 2025) | Netflix FY2025 10-K |
| Operating income | $13,327M (29.5% margin) | FY2025 | Netflix FY2025 10-K |
| Net income | $10,981M (24.3% margin) | FY2025 | Netflix FY2025 10-K |
| Free cash flow | ~$9.0–9.5B (company guided "approximately $9B") | FY2025 | Netflix Q3 2025 shareholder update; confirm exact figure against FY2025 10-K cash flow statement at build time |
| Gross debt | $14.5B | Q3 2025 (Sept 30, 2025) | Netflix Q3 2025 shareholder letter — **pull year-end 2025 balance sheet figure at build time for consistency with FY2025 headline numbers** |
| Cash | $9.3B | Q3 2025 | same |
| TTM revenue | $48.37B | as of Aug 21, 2026 | stockanalysis.com |
| TTM net income | $13.65B | as of Aug 21, 2026 | stockanalysis.com |
| Market capitalization | $337.49B | Sept 1, 2026 | stockanalysis.com |
| P/E (trailing) | 25.25 | Aug 21, 2026 | stockanalysis.com |
| EV/EBITDA | 23.17 (stockanalysis methodology) | Aug 21, 2026 | stockanalysis.com — **see conflict note below, this is the recommended figure** |
| Shares outstanding | 4.16 billion | Aug 2026 | stockanalysis.com |

**Notable context (down, not just up):** Netflix's market cap fell roughly 34% over the trailing year to Sept 2026. This is real and worth a one-line caveat in the UI rather than ignoring — it coincides with the Warner Bros. Discovery acquisition saga (below) and rising investor scrutiny of engagement growth. Do not editorialize on cause; state the fact and point to the company's own disclosures.

### Business model content
Netflix earns revenue almost entirely from **subscription fees**, plus a growing **advertising** revenue stream tied to its ad-supported tier. There is no reported per-title box-office or licensing revenue line at the segment level in recent disclosure — membership/subscription and advertising are the two revenue drivers to explain. Major costs: content (production and licensing, amortized over the content's useful life), marketing, and technology/development.

**Key nuance to build directly into the product — EBITDA is genuinely contested for Netflix, and this is a teaching opportunity, not a bug to hide:**
- stockanalysis.com's EV/EBITDA for Netflix: **23.17x** (Aug 21, 2026)
- GuruFocus's EV/EBITDA for Netflix: **8.97x** (Aug 9, 2026), built on a TTM EBITDA figure of **$35.0B**

That $35B EBITDA figure is roughly 2.5x Netflix's actual TTM operating income (~$13–14B). The gap is almost certainly explained by whether **content amortization** is treated as a normal recurring operating cost (excluded from any EBITDA add-back — consistent with how Netflix's own management discusses free cash flow as its preferred profitability lens) or treated like traditional D&A and added back (which inflates EBITDA substantially for a content business). **Product recommendation:** do not add back content amortization when computing Netflix's EBITDA. Content is a real, continuously-replaced cash cost of running the business, not a one-time capital asset being depreciated. Use this exact conflict as a worked example inside Netflix's "Explain This → EBITDA" panel — it's a genuinely instructive, real, current example of why EBITDA methodology varies by vendor, which is a more valuable lesson than a clean textbook definition alone.

**M&A context to hold as background knowledge (not a core metric, but relevant to "why does this stock look the way it does"):** On Dec 4, 2025, Netflix agreed to acquire WBD's streaming and studio businesses (HBO Max, HBO) in a cash-and-stock deal. In February 2026, Paramount Skydance outbid with a $110.9B all-cash offer ($31/share); Netflix declined to match and withdrew. WBD shareholders approved the Paramount deal April 23, 2026; it remains subject to litigation as of mid-2026 (12 state AGs sued to block it in July 2026), expected to close Q3 2026. This is why WBD is excluded as a peer (below) — its standalone financials are in flux and won't persist.

### Peers — Disney and Comcast (not Warner Bros. Discovery)
| | Netflix | Disney | Comcast |
|---|---|---|---|
| Market cap | $337.49B (Sept 1, 2026) | $191B (Aug 25, 2026) | $86.95B (Aug 4, 2026) |
| Enterprise value | — | $239B | — |
| Revenue | $45.18B (FY2025) | $94.4B (FY2025, ended Sept 27, 2025) | — (pull at build time) |
| Net income | $10.98B (FY2025) | $12.4B (FY2025) | — |
| EV/EBITDA | 23.17x (stockanalysis) | 10.8x | 5.18x |
| P/E (trailing) | 25.25x | 17.8x | 8.55x |

**Comparability rationale:** Disney is the closest like-for-like comparable — direct-to-consumer streaming (Disney+/Hulu) plus a broader entertainment portfolio (parks, studios, linear networks), so its lower multiple partly reflects the non-streaming, lower-growth segments diluting the blended business. Comcast is a useful *contrast* peer specifically because its very low multiple (5.18x EV/EBITDA, 8.55x P/E) reflects legacy cable/linear-TV decline dragging down an otherwise-growing streaming business (Peacock) — good material for a "why isn't the cheapest multiple always the best deal" caveat. **Do not use Warner Bros. Discovery** — see M&A context above.

---

## 3. JPMORGAN CHASE (JPM · NYSE · Diversified bank)

### Overview snapshot — *note the field set is intentionally different from NVDA/NFLX; see caveats below*
| Field | Value | Period | Source |
|---|---|---|---|
| Net income | $57.0B ($20.02/share) | FY2025 (ended Dec 31, 2025) | JPMorgan Q4 2025 earnings release |
| Q4 2025 net income | $13.0B (or $14.7B excluding a $2.2B credit reserve for the Apple card portfolio) | Q4 2025 | JPMorgan Q4 2025 earnings release — good example of a disclosed one-off/non-GAAP adjustment |
| ROE | 17% | FY2025 | JPMorgan Q4 2025 earnings release |
| ROTCE | 20% | FY2025 | JPMorgan Q4 2025 earnings release |
| Total assets | $4.4 trillion | FY2025 year-end | JPMorgan Q4 2025 earnings release |
| Tangible book value/share | $107.56 (+11% YoY) | FY2025 year-end | JPMorgan Q4 2025 earnings release |
| Market capitalization | $962.95B | ~Aug 2026 | stockanalysis.com — cross-check: Robinhood shows $944.49B at $355.32/share on Sept 1, 2026 (~2% spread, normal daily movement, not a data error) |
| "Enterprise value" (as conventionally calculated) | $779.84B | ~Aug 2026 | stockanalysis.com — **flag prominently: EV < market cap here, and neither figure is economically meaningful for a bank; see caveat below** |
| P/E (trailing) | ~15.5x (range 15.49–15.62 across sources) | Aug 2026 | stockanalysis.com, GuruFocus, fullratio.com — converge closely |
| Forward P/E | ~14.8–15.0x | Aug 2026 | GuruFocus, stockanalysis.com |
| P/B | 2.33x | Q2 2026 | Yahoo Finance |
| Shares outstanding | 2.66 billion | Aug 2026 | stockanalysis.com |

### Business model content
JPMorgan operates through three segments: **Consumer & Community Banking** (deposits, cards, mortgages, auto), **Commercial & Investment Bank** (markets, banking, payments), and **Asset & Wealth Management** (AUM $4.8T, up 18% YoY; delivered a 40% ROE in FY2025, the highest of the three segments, against 32% in CCB and 18% in CIB). A bank's core "product" is intermediation: it takes deposits (a liability, but also its funding source) and makes loans/investments (its assets), earning **net interest income** (the spread) plus **noninterest revenue** (fees — trading, investment banking, asset management, card fees).

### The framework caveat — build this as a first-class content block, not a footnote
For a normal company, Enterprise Value = Market Cap + Debt − Cash, and it represents "what it costs to buy the whole operating business." For a bank, this breaks down for two structural reasons:
1. **Deposits function like debt on the balance sheet but are the bank's raw material, not discretionary financing it chose to take on.** Netting them against market cap the way you would with a normal company's bonds produces a number with no clean economic meaning.
2. **A bank's "cash" is mostly required reserves and liquid securities held against its liabilities, not a discretionary offset to a purchase price.**

That's why the JPMorgan figures above show EV *below* market cap — the standard formula, applied mechanically to a bank, produces a number that inverts the usual relationship and shouldn't be read as "the market thinks JPMorgan's core business is cheap." **The metrics that actually work for a bank are P/E, Price/Tangible Book Value, ROE, and ROTCE** — use these as JPMorgan's primary valuation tools in the Valuation tab, with EV/EBITDA and EV/Revenue explicitly greyed out or replaced with an explanatory card rather than shown as normal numbers.

### Peers — Bank of America and Wells Fargo (Goldman Sachs as a contrast peer)
| | JPMorgan | Bank of America | Wells Fargo | Goldman Sachs (contrast) |
|---|---|---|---|---|
| Market cap | $962.95B | ~$410.75B (Jun 29, 2026 — re-verify, several months stale relative to Sept 2026) | (pull at build time) | (pull at build time) |
| P/E (trailing) | ~15.5x | ~14x | ~13x | — |
| Forward P/E | ~14.8x | ~12x | ~12.7x | ~17.8x (highest of the group) |
| P/B | 2.33x | ~1.4x | ~1.6x | — |
| ROTCE target/trend | 20% (FY2025 actual) | improving toward ~18% (2yr projection) | raised to 17–18% medium-term target | — |

**Comparability rationale:** Bank of America and Wells Fargo are the closest structural peers — large, diversified, deposit-funded universal/consumer-commercial banks operating under the same regulatory regime as JPMorgan. Goldman Sachs is included as a deliberate **contrast peer**: its capital-light, advisory/trading-weighted business mix earns it the highest forward P/E of the group (~17.8x) despite far less balance-sheet/deposit business — a clean, real example for teaching that *within* an industry, business mix still changes which multiple is "expensive" for good reason, not just sentiment. **Noteworthy, timely context for Wells Fargo:** its regulatory asset cap (in place for years following its prior sales-practices scandal) was recently lifted, and management raised its ROTCE target to 17–18% partly as a result — a genuinely good real-world example of a regulatory event directly re-rating a bank's growth story, useful if the product ever adds short contextual notes to peer cards.
