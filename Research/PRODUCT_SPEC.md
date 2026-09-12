# PRODUCT_SPEC.md
Premium Interactive Financial Research Website — Product Specification
Research cutoff for cited figures: September 2, 2026 (see SOURCE_MAP.md for exact dates per figure)

---

## A. Executive Product Brief

**What it is.** A three-company financial research site that teaches financial literacy through real, sourced data. The product is not a database — it's a small number of extremely well-built company profiles where every important number carries its own explanation, applied to that company's real figures.

**The mechanism.** Every metric on every page is dual-purpose: it is both data and a teaching moment. A user who knows nothing about EBITDA can click it, get a plain definition, get the "why it matters," and immediately see it computed from the company they're already looking at. A user who already knows the concept can ignore the explanation layer entirely and use the page as a fast, clean research reference.

**Why three companies, and why these three.** See Section B. Short version: NVIDIA, Netflix, and JPMorgan Chase are kept, but not because they're simply "big and recognizable." They are kept because together they force the product to teach the thing most beginner finance content skips — that valuation and analysis frameworks are industry-specific, not universal. NVIDIA is where EV/EBITDA and growth-multiple analysis work cleanly. Netflix is where EBITDA itself becomes a contested, worth-explaining number. JPMorgan is where EV/EBITDA and standard LBO mechanics *break*, and explaining why they break is more educational than forcing them to "work."

**What makes it feel premium rather than like a dashboard.** Restraint. No card-heavy SaaS layout, no gradient hero, no gamified point system. The product's visual richness comes from typography, spacing, and precise data presentation — see UI_SPEC.md. The interactivity (hover breakdowns, the LBO tool, the explanation drawers) is functional, not decorative.

---

## B. Recommended Three Companies — Evaluated, Not Assumed

The brief's proposed trio (NVIDIA, Netflix, JPMorgan Chase) was evaluated against the eight criteria in the brief and against two live-research findings that materially affect execution. **Recommendation: keep the trio**, with two explicit design adaptations documented below (LBO scale-decoupling for NVIDIA, LBO reframing for JPMorgan) and one peer-set adjustment (Netflix: drop Warner Bros. Discovery as a peer).

| Criterion | NVIDIA | Netflix | JPMorgan Chase |
|---|---|---|---|
| Recognizability | Extremely high — most valuable company in the world as of Aug 2026 ($5.25T market cap) | Extremely high — category-defining consumer brand | High — most recognizable U.S. bank brand |
| Richness of public data | Excellent — clean, well-covered 10-K/10-Q, no segment complexity beyond Compute & Networking / Graphics | Excellent — clean subscription economics, though FY2025 disclosure just changed materially with the WBD situation | Excellent but structurally different — bank disclosure (net interest income, credit losses, capital ratios) doesn't map to standard corporate metrics |
| Diversity of business model | Hardware + platform, asset-light, extreme margins | Subscription media, content-amortization-heavy | Balance-sheet business — deposits are the raw material, not "revenue" in the normal sense |
| Peer availability | Strong (AMD, Broadcom) | Adequate but currently in flux — see note below | Strong (Bank of America, Wells Fargo; Goldman Sachs as a useful contrast peer) |
| Valuation usefulness | P/E, EV/EBITDA, EV/Revenue all meaningful | P/E and EV/EBITDA meaningful but EBITDA itself needs a caveat (see below) | P/E and P/TBV are the real tools; EV/EBITDA is not meaningful — this is a *feature*, not a gap |
| LBO suitability | Poor at real scale ($5.25T) — must be explicitly illustrative/decoupled | Best of the three — real debt, real FCF profile, plausible (if still large) illustrative LBO | Not applicable in the conventional sense — regulatory capital rules and Federal Reserve change-of-control approval make bank LBOs essentially nonexistent in practice. Teach this directly. |
| Cross-industry teaching value | Anchors the "growth tech" framework | Anchors the "EBITDA isn't always EBITDA" nuance | Anchors the meta-lesson the whole product philosophy depends on: different industries need different frameworks |

**Live-research finding that changes execution:** As of September 2026, Warner Bros. Discovery is not a stable Netflix peer. Netflix itself was in a bidding war for WBD's streaming and studio assets — it signed a deal on December 4, 2025, was outbid by Paramount Skydance's $110.9B all-cash offer in February 2026, and withdrew. WBD shareholders approved the Paramount deal on April 23, 2026; it is pending regulatory/litigation resolution as of mid-2026, expected to close Q3 2026. Do not use WBD as a Netflix comparable — its standalone financials won't exist much longer, and its multiple reflects deal dynamics, not operating performance. **Use Disney and Comcast instead** (see COMPANY_RESEARCH.md).

**On JPMorgan specifically:** the brief's own Section 8 anticipates this correctly — do not force EV/EBITDA or LBO conventions onto a bank. The recommendation here is to make that explanation a first-class, visible product moment rather than a quiet omission. When a user opens JPMorgan's LBO tab, they should not find a broken or missing tool — they should find a short, clear explanation of *why this doesn't work for banks* (deposits are operational liabilities, not discretionary financing; Bank Holding Company Act and Federal Reserve approval make change-of-control transactions structurally different; regulatory capital ratios, not debt capacity, are the binding constraint), followed by the one analysis banks actually use instead: **excess capital / dividend capacity analysis** (see LBO_SPEC.md, Section "JPMorgan Module"). This turns JPMorgan's structural "problem" into the product's most differentiated teaching moment.

**No fourth company for V1.** The architecture should be extensible (see TECH_ARCHITECTURE.md data schema), but do not build a fourth profile. Three done exceptionally well is the entire strategic bet of this product.

---

## C. Page-by-Page Information Architecture

```
/                           Home
                             — no hero section, no marketing copy
                             — three company entry points (name, ticker, one-line description)
                             — a single line explaining the product's premise
                             — link to Compare and to the Glossary

/company/[ticker]           Company page (NVDA, NFLX, JPM)
  → Overview                 snapshot metrics, business description, "Explain This" on every metric
  → Business                 how the company makes money, segments, KPIs, visual revenue breakdown
  → Financials                multi-year table (5yr where available), margin trends, one chart
  → Valuation                 market cap vs EV walk, multiples, 2-3 peer comparison
  → LBO Analysis              interactive tool (NVDA/NFLX: full simulator; JPM: explainer + capital-return module)
  → Key Terms                 the subset of the glossary relevant to this company, each with this company's numbers

/compare                    Compare (2-3 companies side by side)
                             — reuses Overview + Valuation metrics only, not full page reproduction
                             — "who is growing fastest / highest margin / most expensive" is generated
                               from the underlying data, not separately hardcoded

/glossary                   Finance Dictionary
                             — every term used anywhere in the app, alphabetical
                             — each term links to "see it in [Company]" using real numbers
                             — NOT an Investopedia clone: only terms actually used in the product (see FINANCE_GLOSSARY.md)

/sources                    Source & Methodology page
                             — what "as of" means for each data type (fiscal-year vs TTM vs point-in-time market data)
                             — full source list per company (links to SOURCE_MAP.md content)
                             — plainly states the LBO tool is illustrative/simplified, not an institutional model
```

**Explanation system placement (applies everywhere a number appears):** every metric is rendered with a small, consistent "ⓘ" affordance. Clicking it opens an inline expandable panel (not a modal — see UI_SPEC.md) with three fixed sections: **What it means** (one sentence) → **Why it matters** (one short paragraph) → **This company** (the metric computed/quoted using the real number already on the page, with its source and as-of date repeated). This is the single most-reused component in the app — build it once, well, in Section J of TECH_ARCHITECTURE.md.

---

## K. Build Sequence (summary — full detail in TECH_ARCHITECTURE.md)

1. Data layer first: schema + the three companies' data files, fully populated and cited, before any UI is built.
2. Explanation-system component (the ⓘ pattern) — build and test this in isolation, since every other page depends on it.
3. Company Overview page for one company only (recommend Netflix — most balanced dataset) — get this to final visual quality before replicating.
4. Replicate Overview for NVIDIA and JPMorgan; build Business and Financials sections for all three.
5. Valuation section + peer comparison logic (shared component, not three hardcoded tables).
6. LBO simulator (NVDA/NFLX version) — this is the highest-complexity component; build and unit-test the calculation engine before wiring up the UI.
7. LBO module for JPMorgan (explainer + capital-return calculator) — reuses the UI shell, not the leverage math.
8. Compare page.
9. Glossary page (mechanically generated from the same term data used in the ⓘ panels — do not hand-write a separate glossary).
10. Sources/Methodology page.
11. Full QA pass against QA_CHECKLIST.md.

---

## M. Do-Not-Build List (explicit scope discipline)

Do not build any of the following for V1, even if they seem like small additions:

- **A fourth or fifth company**, or "add your own ticker" search. Breaks the entire "three, obsessively deep" positioning and reintroduces the live-data reliability problem this spec deliberately avoids.
- **A live market-data API pipeline.** Use a versioned, dated, cited static dataset (see DATA_DICTIONARY.md and SOURCE_MAP.md). A "last updated [date]" label is honest and sufficient; live tickers are not worth the reliability risk for a V1 with three companies.
- **A real historical LBO deal reconstruction tied to one of the three companies.** None of NVIDIA, Netflix, or JPMorgan has ever actually been the subject of a real leveraged buyout — mega-cap tech and regulated banks are not LBO targets in reality. Forcing a "historical deal" onto one of them would mean either fabricating terms or attaching an unrelated deal, both of which violate the brief's own data-integrity rules. **Recommendation: skip the optional historical-deal feature entirely for V1.** If a future version wants a real-deal case study, the Paramount Skydance/WBD acquisition (Section G, SOURCE_MAP.md) is extraordinarily well-documented and current — but it is a strategic M&A deal, not an LBO, and does not belong bolted onto Netflix's LBO tab.
- **A user login, portfolio, watchlist, or saved-comparison system.** Nothing in this product requires state per user.
- **Full three-statement projection modeling in the LBO tool.** The brief explicitly calls for an intentionally simplified, clearly-labeled tool — see LBO_SPEC.md for exactly which simplifications are made and why each is acceptable.
- **DCF valuation as a built feature.** It's referenced conceptually in the glossary ("what if I estimated value from future cash flows") but a full interactive DCF is a different, larger tool than this V1 needs. One glossary entry, no calculator.
- **Gamification: points, streaks, badges, leaderboards.** The brief is explicit about this and it's worth restating: the interactivity should feel like a professional tool that happens to be pleasant to use, not a app trying to be addictive.
- **News feed, "finance in the real world" current-events module, or any content requiring ongoing editorial upkeep.** Excellent idea for a V2; a content treadmill is the fastest way to never ship V1.
- **Company logos, trademarked imagery, or any third-party brand assets beyond plain text names/tickers.** Use typography, not logos, to identify companies — avoids IP/licensing questions entirely and reinforces the editorial (not fan-site) visual identity.
