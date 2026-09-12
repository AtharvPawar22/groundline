# COMPANY_RESEARCH.md
## Trio Evaluation and Company-by-Company Research Dossier

Research date: September 2, 2026. Figures below are drawn from primary filings and
company press releases where possible; secondary aggregators (used only for
point-in-time market data, which companies don't self-publish in real time) are
labeled as such. Every figure a build agent uses in the product must be re-verified
against the exact primary document at build time and logged per the `RawDataPoint`
schema in `DATA_DICTIONARY.md` — the figures here establish *what to look for and
roughly what to expect*, not a copy-paste dataset.

---

## A. HOW THIS EVALUATION WAS DONE

Each company was scored, not assumed, against the nine criteria in the brief:
recognizability; richness of public data; ability to explain finance concepts;
diversity of business models across the trio; peer-data availability; usefulness for
valuation; suitability for LBO analysis; visual/content potential; and the trio's
collective ability to demonstrate that different industries require different
financial frameworks. Two alternative trios were seriously considered and rejected;
see §C.

---

## B. TRIO DECISION: KEEP NVIDIA / NETFLIX / JPMORGAN CHASE, WITH ONE ADAPTATION

**The adaptation:** JPMorgan does not receive a standard EV/EBITDA-multiple LBO
module. It receives a purpose-built "Bank Economics" module instead. This is
detailed in `LBO_SPEC.md` §7 and is treated throughout this package as a deliberate
design decision, not a workaround.

**Why the trio survives scrutiny:**

1. **Recognizability and current relevance are all near-maximal.** As of the
   research date, NVIDIA is the world's most valuable public company by market
   capitalization; Netflix is embroiled in one of 2026's biggest media-industry
   storylines (the collapsed Warner Bros. Discovery acquisition — see §D.2); JPMorgan
   is the largest U.S. bank by assets and just posted its highest quarterly profit in
   company history. None of the three needs an introduction, and all three have live,
   current-events texture that makes the site feel like it was built *this year*
   rather than templated.
2. **Business-model diversity is genuinely maximal for a three-company set.** A
   fabless hardware/platform company, a subscription content company, and a regulated
   depository institution do not share a single financial-statement structure between
   any two of them. That is exactly what forces the product to build a real,
   metric-by-metric applicability system (`DATA_DICTIONARY.md` §2) instead of one
   generic template — which is the single best thing this trio does for the "finance
   isn't one-size-fits-all" mission.
3. **The trio jointly stress-tests the explanation system.** EBITDA means something
   different (and something *incomplete*) for Netflix than it does for NVIDIA, and
   means almost nothing for JPMorgan. A single term, explained three different ways
   for three companies a visitor already recognizes, is a more convincing
   demonstration of "financial literacy" than three unrelated single-industry deep
   dives would be.

---

## C. ALTERNATIVE TRIOS CONSIDERED AND REJECTED

**Swap JPMorgan for a "clean" LBO-friendly industrial or consumer company** (e.g., a
mature, moderate-growth branded consumer company with stable FCF — the profile real
LBO targets actually have). Rejected: this would make the LBO module easier to build
but would remove the one company in the set that forces the product to demonstrate
its own honesty about a framework's limits. A finance-literacy product that only ever
shows frameworks *working* is less credible, not more, to the professional half of
the audience this product is trying to earn trust from. The bank-specific rigor the
brief explicitly demands in its own §8 would have no home.

**Swap NVIDIA for a more "typical" large-cap tech company with a more LBO-plausible
capital structure** (lower growth, lower multiple, larger relative FCF base).
Rejected: NVIDIA's recognizability and current-events salience are too valuable to
give up, and the "hypothetical sandbox" LBO framing (§`LBO_SPEC.md` §7) fully
resolves the mechanical objection without losing the company. The teaching value of
NVIDIA's GAAP-vs-non-GAAP and one-off-items story (the H20 export-control charge, the
equity-securities gains) is also unusually rich and worth keeping.

**Swap Netflix for a company with a cleaner EBITDA story** (i.e., one where D&A really
is a mostly non-cash proxy for capex, so EBITDA behaves the way people assume it
does). Rejected: Netflix's content-amortization dynamic — where a large "add-back" in
the EBITDA calculation corresponds to a real, ongoing cash outlay rather than a
non-cash artifact — is one of the best available real-world illustrations of EBITDA's
most common misuse, and losing it would weaken the glossary's EBITDA entry
considerably.

**Conclusion:** all three swaps trade away more pedagogical value than they'd
recover. The original trio, adapted as described, is the recommendation.

---

## D. COMPANY DOSSIERS

### D.1 NVIDIA Corporation (NVDA · Nasdaq)

**Business.** Fabless designer of GPUs and AI accelerator platforms; reports two
segments, Compute & Networking and Graphics, and disaggregates revenue into Data
Center, Gaming, Professional Visualization, Automotive & Robotics, and OEM & Other.
The overwhelming majority of current revenue and growth is Data Center (AI training
and inference infrastructure). Business description content should be drawn from the
FY2026 Form 10-K, Item 1 and Item 7 (MD&A), paraphrased per the copyright rules in
`TECH_ARCHITECTURE.md`.

**Key figures on file (verify exact to-the-million figures against the primary
filing before shipping):**

| Metric | Period | Value | Source |
|---|---|---|---|
| Revenue | FY2026 (ended Jan 25, 2026) | $215.9B, +65% YoY | NVIDIA Q4/FY2026 press release, Feb 25, 2026 |
| GAAP gross margin | FY2026 | 71.1% | Same |
| GAAP diluted EPS | FY2026 | $4.90 | Same |
| Net income | FY2026 | ~$120.0B (reported net income; **confirm exact figure to the million from the FY2026 10-K income statement** — secondary sources round to $120B) | NVIDIA FY2026 10-K (SEC EDGAR, filed ~Feb 2026); cross-check vs. EPS × diluted share count |
| Cash & equivalents | As of Jan 25, 2026 | $10,605mm | NVIDIA Q2 FY2027 press release (prior-period balance sheet column), Aug 26, 2026 |
| Total assets | As of Jan 25, 2026 | $206,803mm | Same |
| Total liabilities | As of Jan 25, 2026 | $49,510mm | Same |
| Long-term debt | As of Jan 25, 2026 | $7,469mm | Same |
| Shareholders' equity | As of Jan 25, 2026 | $157,293mm | Same |
| Revenue | Q2 FY2027 (ended Jul 26, 2026) | $96,221mm, +106% YoY | NVIDIA Q2 FY2027 press release, Aug 26, 2026 |
| Net income | Q2 FY2027 | $59,688mm | Same |
| Net income | H1 FY2027 (6 mo. ended Jul 26, 2026) | $118,010mm | Same |
| Free cash flow | H1 FY2027 | $69,895mm | Same |
| Cash & equivalents | As of Jul 26, 2026 | $22,443mm | Same |
| Long-term debt | As of Jul 26, 2026 | $32,366mm (note: NVIDIA issued ~$24.9B of new debt during the quarter — a meaningful capital-structure change worth surfacing in the Financials tab narrative) | Same |
| Market capitalization | Early Sept 2026 | ~$5.25–5.38T (multiple aggregators; converge in this range) | Market data (companiesmarketcap.com, CNBC, Robinhood — cross-check against live feed at build time) |
| Share price | Sept 1, 2026 | ~$217–220 | Same |
| Diluted shares outstanding | Sept 2026 | ~24.1B | Same |
| TTM revenue | As of Sept 2026 | ~$303.0B | stockanalysis.com aggregation of trailing four reported quarters |
| TTM EBITDA | As of Sept 2026 | ~$201.3B | Same |
| P/E (TTM) | Sept 2026 | ~27.5x | Same |

**Material one-off items to flag in the data (do not smooth over):**
- Q1 FY2026: a $4.5B charge related to H20 chip export-control restrictions to China,
  which depressed that quarter's gross margin to 60.5% GAAP — a genuinely useful
  real-world example of a non-recurring item distorting a single-quarter margin
  reading, worth calling out in the Financials tab.
- FY2027 to date: large gains on non-marketable and publicly-held equity securities
  (including NVIDIA's investment in Intel common stock, and gains reflected in "Other
  income, net" — e.g., $16.4B in Q1 FY2027 alone) are pushing GAAP net income well
  above operating-income-driven earnings. This is a genuinely excellent, real,
  current example for the glossary's "Net Income" caveat block: net income moved by
  billions of dollars from investment-portfolio mark-to-market gains that have
  nothing to do with chip sales.
- Beginning Q1 FY2027, NVIDIA's non-GAAP measures changed definition to include
  stock-based compensation (previously excluded) — see `DATA_DICTIONARY.md` §5.

**Peers recommended:** AMD, Broadcom, TSMC.

| Peer | Why comparable | Key difference | Useful multiples |
|---|---|---|---|
| Advanced Micro Devices (AMD) | Closest direct competitor in GPUs/AI accelerators and data-center CPUs; fabless model, same foundry ecosystem | Roughly an order of magnitude smaller in AI data-center revenue and market cap (~$750–760B market cap vs. NVIDIA's ~$5.3T as of Aug 2026); lower gross margin profile | EV/Revenue, EV/EBITDA, revenue growth |
| Broadcom (AVGO) | Major AI silicon supplier (custom accelerators/ASICs for hyperscalers) and networking, plus a large infrastructure-software business NVIDIA doesn't have | Business mix is roughly half semiconductors, half software (post-VMware), which mechanically changes its margin and multiple profile — flag this explicitly as the "where the comparison breaks down" caveat | EV/EBITDA, EV/Revenue |
| Taiwan Semiconductor Manufacturing Company (TSMC) | The foundry that actually manufactures NVIDIA's chips — essential context for understanding NVIDIA's gross margin and supply constraints, even though it's not a product competitor | Different business entirely (contract manufacturer vs. fabless designer) — this peer is included for supply-chain/economics context, not head-to-head multiple comparison; label it distinctly from AMD/Broadcom in the UI | EV/EBITDA (context only, not apples-to-apples) |

**LBO treatment:** hypothetical sandbox. See `LBO_SPEC.md` §7.1 for the required
framing language and default assumption set.

---

### D.2 Netflix, Inc. (NFLX · Nasdaq)

**Business.** Subscription streaming entertainment; single reportable segment
(streaming). Revenue driven by memberships, pricing, and a growing
advertising-supported tier. Content is capitalized and amortized, which is central to
understanding Netflix's margin structure (see EBITDA caveat below). Business
description content should be drawn from the FY2025 Form 10-K, Item 1 and Item 7.

**Important, current, and easy to get wrong from stale knowledge:** on December 4–5,
2025, Netflix signed a definitive agreement to acquire Warner Bros. Discovery's
studio and streaming assets (including HBO and HBO Max) for $27.75/share, implied
enterprise value ~$82.7B. A competing bid from Paramount Skydance triggered a bidding
war; on February 26, 2026, Netflix declined to raise its offer, WBD's board deemed
Paramount's revised $31/share (~$110–111B enterprise value for the whole of WBD)
offer superior, and Netflix walked away, collecting a $2.8B break-up fee. **Warner
Bros. Discovery is being acquired by Paramount Skydance, not by Netflix, and is not a
clean standalone public comparable going forward** — this must not be treated as
background trivia; it directly changes the Netflix peer set (see below) and is a
legitimate, current talking point for the Business tab. (Sources: Variety, March 4,
2026; The Motley Fool, March 9, 2026; CNBC, Feb 26, 2026; Netflix FY2025 10-K.)

**Key figures on file:**

| Metric | Period | Value | Source |
|---|---|---|---|
| Revenue | FY2025 (calendar year) | $45.18B (multiple sources; **verify exact figure against the FY2025 10-K income statement**) | Netflix FY2025 10-K, filed ~Jan 2026 |
| Net income | FY2025 | $10,981mm, +26% YoY | Same |
| Free cash flow | FY2025 | ~$9.46B (secondary aggregator; verify against 10-K cash flow statement) | Bullfincher aggregation of Netflix 10-K |
| Total debt (short + long-term) | As of Dec 31, 2025 | $14,462.8mm | Netflix FY2025 10-K |
| Cash, equivalents, restricted cash & ST investments | As of Dec 31, 2025 | $9,067.9mm | Same |
| Total assets | FY2025 | ~$55.60B | Aggregator; verify against 10-K balance sheet |
| Total liabilities | FY2025 | ~$28.98B | Same |
| Revenue | Q2 2026 (ended Jun 30, 2026) | $12,559.9mm, +13% YoY | Netflix Q2 2026 shareholder letter / 8-K, Jul 16, 2026 |
| Operating income | Q2 2026 | $4,192.6mm; operating margin 33.4% | Same |
| Net income | Q2 2026 | $3,401.4mm; diluted EPS $0.80 | Same |
| Free cash flow | Q2 2026 | $1,525.2mm | Same |
| FY2026 guidance | Full year | Revenue $51.0–51.4B; operating margin target 31.5%; FCF ~$12.5B | Netflix Q2 2026 shareholder letter |
| Market capitalization | Sept 1, 2026 | ~$337.5B | stockanalysis.com / TradingView (cross-check at build time) |
| Share price | Aug 31, 2026 | ~$81 | Same |
| Diluted shares outstanding | Sept 2026 | ~4.16B | Same |

**Capital-structure note to verify at build time:** the jump in Netflix's share count
(roughly 440M a year earlier to ~4.16B in Sept 2026) alongside the price move (from
above $1,200 to ~$81) is consistent with a stock split on the order of 10-for-1
sometime in the preceding year. **Confirm the exact split ratio and effective date
from a Netflix 8-K before building any historical share-price or per-share chart that
spans the split date** — an un-adjusted chart would show a fake 93% price "crash."

**Peers recommended:** The Walt Disney Company, Comcast Corporation, and the
Paramount Skydance / Warner Bros. Discovery combination (with an explicit
in-transition caveat).

| Peer | Why comparable | Key difference | Useful multiples |
|---|---|---|---|
| The Walt Disney Company (DIS) | Direct streaming competitor (Disney+, Hulu) now profitable at the DTC segment level; also a media/content conglomerate | Disney's economics are diversified across Parks & Experiences (its actual profit engine, ~$10B FY2025 segment operating income) in addition to streaming — comparing whole-company multiples conflates a theme-park business with a streaming business; use segment-level DTC data where available, and caveat clearly when using whole-company multiples | EV/EBITDA, EV/Revenue, DTC segment operating margin |
| Comcast Corporation (CMCSA) | Owns Peacock and NBCUniversal studios/theme parks; broadly comparable diversified media/content peer | Comcast completed the spin-off of its cable-networks business into Versant Media Group effective January 2, 2026 — this is a **structural break** in Comcast's own reported financials right around the dataset's reference period; make sure any Comcast figures used post-date the separation and are clearly labeled as "post-Versant-spinoff Comcast," not blended with the old structure | EV/EBITDA, EV/Revenue, FCF |
| Paramount Skydance / Warner Bros. Discovery (in-transition) | The former WBD — Netflix's would-be acquisition target — is being absorbed into Paramount Skydance; the combined entity will be a major streaming/studio competitor (HBO Max) once the deal closes | **Explicitly label as "peer in transition."** As of the research date the deal had not yet closed; do not present combined-entity pro forma financials as if they were a reported fact. Track deal-close status and update this peer's data only once post-close financials exist. | Track qualitatively for now; do not force a multiple until standalone post-close data exists |

**LBO treatment:** standard mode — Netflix is the best-fit company of the three for a
conventional LBO exercise. See `LBO_SPEC.md` §2 for default inputs.

---

### D.3 JPMorgan Chase & Co. (JPM · NYSE)

**Business.** The largest U.S. bank holding company by assets, operating through
three reportable segments — Consumer & Community Banking (CCB), Commercial &
Investment Bank (CIB), and Asset & Wealth Management (AWM) — plus a Corporate
category. Business description content should be drawn from the FY2025 Form 10-K,
Item 1.

**Key figures on file:**

| Metric | Period | Value | Source |
|---|---|---|---|
| Net income | FY2025 (calendar year) | $57,048mm | JPMorgan FY2025 10-K, Consolidated Statements of Comprehensive Income |
| Total assets | As of Dec 31, 2025 | $4.4 trillion | JPMorgan 4Q25 earnings press release, Jan 2026 |
| Stockholders' equity | As of Dec 31, 2025 | $362.4B | Same |
| Net income | Q4 2025 | $13.0B reported (down 7% YoY); $14.7B excluding a $2.2B credit reserve tied to the Apple Card portfolio forward purchase commitment — **use the reported (GAAP) figure as primary and show the excl.-item figure as a labeled non-GAAP secondary figure, exactly as the company itself presents it** | JPMorgan 4Q25 earnings press release |
| Net income | Q2 2026 | $21.2B reported ($7.70/share) including a $4.6B Visa-share-related gain and $1.0B of equity investment gains; $16.9B ($6.14/share) excluding those significant items, ROTCE 23% | JPMorgan 2Q26 earnings press release / earnings call transcript, Jul 14, 2026 |
| Managed revenue | Q2 2026 | $58.0B, +27% YoY reported (+15% excluding significant items) | Same |
| Net interest income | Q2 2026 | $25.6B, +10% YoY | Same |
| FY2026 outlook | Full year | NII ex-Markets ≈ $96.5B; total NII ≈ $105.5B; adjusted expenses ≈ $107.5B; card net charge-off rate ≈ 3.2% | JPMorgan Q2 2026 earnings call, Jul 22, 2026 |
| Market capitalization | Early Sept 2026 | ~$945–965B (sources converge in this band; use live feed value at build time) | stockanalysis.com, Robinhood |
| Share price | Sept 1, 2026 | ~$355–359 | Same |
| Diluted shares outstanding | Sept 2026 | ~2.66B | Same |
| P/E (TTM) | Sept 2026 | ~15.3–15.5x | Same |
| P/B | Q2 2026 | ~2.3x | Yahoo Finance valuation summary |
| TTM revenue | Sept 2026 | ~$186.3B | stockanalysis.com |
| TTM net income | Sept 2026 | ~$63.6B | Same |
| ROE (TTM) | Sept 2026 | ~17.8–17.9% | Same |

**Material one-off items to flag:** the Q2 2026 Visa-share gain ($4.6B) and equity
investment gains ($1.0B), and the Q4 2025 Apple Card credit-reserve charge ($2.2B),
should both be visible in the data with `notes` rather than folded silently into a
smooth net-income trend line — these are exactly the kind of items that make "which
net income figure is the real one" a genuinely useful teaching moment for a bank, the
same way NVIDIA's equity-securities gains are.

**Peers recommended:** Bank of America, Goldman Sachs, Wells Fargo.

| Peer | Why comparable | Key difference | Useful multiples |
|---|---|---|---|
| Bank of America (BAC) | Closest overall peer — comparably diversified universal bank (consumer + commercial + markets + wealth management) at large scale | Somewhat smaller (FY2025 net income ~$29.1B vs. JPM's $57.0B; market cap ~$435–438B vs. JPM's ~$950B as of late Aug/early Sept 2026); generally lower ROTCE than JPM | P/E, P/B, ROE/ROTCE |
| Goldman Sachs (GS) | Best peer specifically for the Commercial & Investment Bank segment — trading, investment banking, asset management | Goldman has little-to-no traditional consumer banking business, so a whole-company comparison understates how much of JPM's earnings come from CCB — use this peer for CIB-segment-level comparison specifically, and say so | P/E, P/B, ROE |
| Wells Fargo (WFC) | Best peer for consumer-banking-segment comparison at scale; comparable branch-banking footprint | Different business mix (historically smaller markets/investment-banking business than JPM or Goldman); still working through some post-consent-order normalization dynamics from prior years — **verify current regulatory-asset-cap status at build time**, as this materially affects Wells Fargo's comparability and has changed over recent years | P/E, P/B, ROE |

**LBO treatment:** not applicable in standard form — replaced with the "Bank
Economics" module. See `LBO_SPEC.md` §7.2 for the full specification, including why
this is the *more* rigorous choice, not a lesser one.

---

## E. CONTENT-PLAN SUMMARY (cross-reference)

| | NVIDIA | Netflix | JPMorgan |
|---|---|---|---|
| Primary valuation lens | EV/EBITDA, EV/Revenue | EV/EBITDA (caveated), P/E | P/E, P/B, ROTCE |
| EBITDA displayed? | Yes | Yes, with a mandatory "content amortization" caveat | No |
| Free Cash Flow displayed? | Yes | Yes | No |
| Fifth tab | LBO (hypothetical sandbox) | LBO (standard) | Bank Economics |
| Signature teaching moment | GAAP net income swung by billions from equity-securities gains unrelated to chip sales | EBITDA add-back (content amortization) is a real, ongoing cash cost, not a non-cash artifact | Why "enterprise value" and "EBITDA" don't apply to a bank at all |
| Current-events hook | AI infrastructure buildout, record data-center revenue | Collapsed WBD acquisition bid; Comcast's Versant spinoff reshaping peers | Record Q2 2026 profit; Visa-share and Apple Card items making "which net income" a live question |
