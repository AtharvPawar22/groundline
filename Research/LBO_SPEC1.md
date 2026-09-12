# LBO_SPEC.md
## LBO Model Specification

Applies to NVIDIA (hypothetical-sandbox mode) and Netflix (standard mode). §7 covers
JPMorgan's separate "Bank Economics" module. This spec is intentionally a
**simplified, single-tranche, single-sponsor model** — every simplification is
listed explicitly in §5 rather than left implicit, per the brief's instruction not to
overclaim institutional-grade fidelity.

---

## 1. WHAT THIS MODEL IS AND ISN'T

It is a mechanically correct, internally consistent, single-scenario LBO model
covering the standard levers: purchase price, leverage, a multi-year operating
projection, mandatory debt paydown from free cash flow, an exit assumption, and
return metrics (MOIC, IRR), with a value-creation bridge and a two-variable
sensitivity table. It is **not** a multi-tranche debt model (no separate term loan /
revolver / subordinated notes with different rates and amortization schedules), not a
management-rollover/promote model, not a dividend-recap model, and does not model
interim distributions. The UI must state this plainly (see §6). This is the same
honesty standard the rest of the product holds itself to for real company data —
the LBO tool should not imply more sophistication than it has.

---

## 2. INPUTS

| Input | Editable? | Default source | Notes |
|---|---|---|---|
| Entry EBITDA | Yes | Company's actual TTM EBITDA from `DATA_DICTIONARY.md` | |
| Entry Multiple (EV/EBITDA) | Yes | Company's actual current EV/EBITDA from `DATA_DICTIONARY.md` | Entry EV is **derived**, not separately editable — see §3 |
| Debt / EBITDA (entry leverage) | Yes | 5.0x default (typical large-cap LBO leverage as a starting illustrative point) | Capped in the UI at a reasonable maximum (e.g., 7.0x) with a warning above 6.0x that this level of leverage is aggressive by current market standards |
| Transaction Fees & Expenses | Yes, advanced/collapsed by default | 2.5% of Entry EV | Illustrative estimate, not a researched figure — labeled as such |
| Hold Period | Yes | 5 years | Range 1–10 years |
| Revenue CAGR assumption | Yes | Company's own recent revenue growth rate as a starting point, but the UI should nudge toward a more moderate long-run assumption for NVIDIA specifically (see §7.1 — a 5-year hold at NVIDIA's current growth rate is not a defensible base case) | |
| EBITDA Margin assumption | Yes | Company's current EBITDA margin | Applied uniformly across all projection years — see §4 modeling convention; not a glide path in V1 |
| Capex (% of revenue) assumption | Yes, advanced | Company's recent capex/revenue ratio | Also used as the D&A assumption — see §4 |
| Interest Rate on debt | Yes, advanced | 8.5% default | Single blended rate, not tranche-specific |
| Tax Rate | Yes, advanced | 25% default | |
| Exit Multiple | Yes | Defaults to Entry Multiple (i.e., no assumed multiple expansion until the user changes it) | Deliberate default — starting at "no multiple expansion assumed" keeps the base case honest and avoids seeding an inflated return |

**Derived, not separately editable:** Entry Enterprise Value = Entry EBITDA × Entry
Multiple. This is stated as a rule because "entry EV, entry EBITDA, and entry
multiple" cannot all three be independent editable numbers without risking an
inconsistent state — pick two, derive the third, always.

---

## 3. SOURCES & USES (at entry)

```
USES
  Purchase of Enterprise Value      = Entry EBITDA × Entry Multiple      (cash-free,
                                                                           debt-free basis —
                                                                           the target's own
                                                                           existing capital
                                                                           structure is assumed
                                                                           refinanced as part of
                                                                           the transaction)
  Transaction Fees & Expenses        = Fee % × Entry Enterprise Value
  TOTAL USES                        = Purchase of Enterprise Value + Fees

SOURCES
  New Debt                          = (Debt / EBITDA input) × Entry EBITDA
  Sponsor Equity                    = TOTAL USES − New Debt        (plug — always solves
                                                                      so Sources = Uses)
  TOTAL SOURCES                     = TOTAL USES  (by construction)
```

If `New Debt > Total Uses` (only possible with an unrealistically high leverage input
relative to a low entry multiple), floor Sponsor Equity at a small positive minimum
(e.g., $1mm) and surface a validation warning rather than allowing negative equity —
negative sponsor equity is not a meaningful state and must never render.

---

## 4. OPERATING PROJECTION AND DEBT SCHEDULE

For each year *t* = 1 … Hold Period, given Year-0 = the entry-year actuals:

```
Revenue_t          = Revenue_(t-1) × (1 + Revenue CAGR assumption)
EBITDA_t            = Revenue_t × EBITDA Margin assumption
D&A_t               = Capex_t = (Capex % of Revenue assumption) × Revenue_t
                        [modeling convention: D&A is set equal to Capex, i.e. capex is
                         assumed to run at a steady-state "maintenance" level that
                         roughly offsets the depreciation of the asset base — a standard,
                         explicitly-flagged simplification, not a claim that this holds
                         precisely for any real company]
EBIT_t              = EBITDA_t − D&A_t
Interest_t          = Interest Rate × Debt_(t-1)   [beginning-of-year balance,
                                                      not average balance — simplification]
Pretax Income_t     = EBIT_t − Interest_t
Taxes_t             = Tax Rate × max(Pretax Income_t, 0)   [no carryback/carryforward
                                                              tax benefit modeled for a
                                                              loss year]
Net Income_t        = Pretax Income_t − Taxes_t
CFADS_t             = Net Income_t + D&A_t − Capex_t = Net Income_t
                        [simplifies exactly because D&A_t = Capex_t by the convention
                         above; ΔNet Working Capital assumed = 0 in V1 — flagged
                         simplification]
Debt Paydown_t      = max(0, min(CFADS_t, Debt_(t-1)))
Debt_t              = Debt_(t-1) − Debt Paydown_t
Cash Accumulated_t  = Cash Accumulated_(t-1) + max(0, CFADS_t − Debt_(t-1))
                        [only accrues once Debt_t has hit zero — i.e. once the paydown
                         is capped by an empty debt balance, any further CFADS in that
                         same year and all subsequent years builds cash instead]
Net Debt_t          = Debt_t − Cash Accumulated_t     [can go negative]
```

**Edge case — negative CFADS in a given year** (possible with an aggressive growth
assumption combined with high leverage and high interest cost): `Debt Paydown_t = 0`
in that year (debt does not pay down, and this simplified model does **not** grow the
debt balance to fund a shortfall — there is no revolver draw in V1). The UI must
surface a visible warning banner: *"This combination of assumptions implies negative
free cash flow in Year [t] — in practice this capital structure would not be
financeable at this leverage level."* This is a required behavior, not an optional
polish item — silently proceeding past a negative-cash-flow year without comment would
misrepresent what the model is telling the user.

---

## 5. EXIT AND RETURNS

```
Exit EBITDA         = EBITDA_N                          (N = Hold Period)
Exit EV             = Exit EBITDA × Exit Multiple
Exit Net Debt        = Net Debt_N
Exit Equity Value    = max(0, Exit EV − Exit Net Debt)   [floored at zero — equity
                                                             cannot be worth less than
                                                             zero to the sponsor]
Sponsor Exit Equity  = Exit Equity Value                 [single sponsor owns 100% of
                                                             equity in this simplified
                                                             model — no management
                                                             rollover/promote in V1]

MOIC                = Sponsor Exit Equity / Sponsor Equity (entry)
IRR                 = MOIC ^ (1 / Hold Period) − 1        [single entry / single exit
                                                             cash flow only — no interim
                                                             dividends modeled in V1]
```

If `Exit Equity Value` is floored at zero (i.e. the deal is entirely underwater),
display `MOIC = 0.0x` and `IRR = -100%` rather than an undefined or NaN result, and
show a plain-language note: *"At these assumptions, the debt exceeds what the
business is worth at exit — the sponsor's equity is wiped out."*

### Value-creation bridge (must reconcile exactly — this is a required test, see §8)

```
EBITDA Growth Contribution     = (Exit EBITDA − Entry EBITDA) × Entry Multiple
Multiple Change Contribution   = Exit EBITDA × (Exit Multiple − Entry Multiple)
Debt Paydown Contribution      = Entry Debt − Exit Net Debt
Transaction Fees (negative)    = − (Transaction Fees & Expenses)

Sponsor Entry Equity + EBITDA Growth Contribution + Multiple Change Contribution
    + Debt Paydown Contribution + Transaction Fees  ==  Sponsor Exit Equity  (exactly,
    to floating-point rounding tolerance — enforce with a unit test)
```

Render this bridge as a waterfall chart (see `UI_SPEC.md` §Charts) — this is the
single most important visual in the LBO tab, because it's the direct answer to "where
did the return actually come from," which is the whole point of the exercise.

---

## 6. SENSITIVITY TABLE

Two-axis grid, MOIC in each cell by default with a toggle to switch the displayed
output to IRR:

- **Rows:** Exit Multiple, base case ± 1.5x in 0.5x increments (7 rows)
- **Columns:** Revenue CAGR assumption, base case ± 4 percentage points in 2pp
  increments (5 columns)

Each cell re-runs the full projection and exit calculation at that combination — cells
are not interpolated or approximated. The base-case cell (center of the grid) is
visually distinguished (not just numerically identical to the primary output panel —
a reader should be able to find "where am I" on the grid instantly). Hovering a cell
highlights its row and column headers, per `PRODUCT_SPEC.md` §F.

---

## 7. PER-COMPANY TREATMENT

### 7.1 NVIDIA — hypothetical sandbox mode

**Required framing, displayed prominently at the top of the tab, not buried in a
tooltip:** *"NVIDIA's actual scale (~$5T+ market capitalization) and growth profile
make a real leveraged buyout implausible — no combination of private-market debt and
equity at this size, nor a business with NVIDIA's capital-intensity-light,
R&D-intensive profile, matches the leveraged-buyout playbook. This tool uses NVIDIA's
real entry EBITDA and real current trading multiple as a starting point purely to
teach LBO mechanics on a familiar, real company — treat every output as illustrative,
not as a deal thesis."*

Default assumptions should deliberately avoid projecting NVIDIA's current ~65-100%+
YoY growth rate across a full hold period — the UI's default Revenue CAGR input for
NVIDIA should be set to a materially more moderate figure (e.g., 15–20%) with an
explanatory note that extrapolating the current hypergrowth rate for 5 years would
itself be an unrealistic assumption, independent of the LBO-feasibility issue. This
keeps the sandbox pedagogically honest on two axes at once, not just the leverage
axis.

### 7.2 JPMorgan — "Bank Economics" module (replaces the LBO tab entirely)

This is not a stripped-down or apologetic version of the LBO tool — it is a
differently-scoped interactive tool built around the mechanics that actually govern
value creation for a bank. Full rationale in `DATA_DICTIONARY.md` §3.

**Why a standard LBO doesn't work here, stated plainly for the user (opening
copy):** *"A leveraged buyout works by using a target company's own future cash flow
to pay down acquisition debt over time. A bank doesn't have 'free cash flow' in that
sense — its balance sheet is already, by design, built on borrowed money (mostly
customer deposits), and it operates under regulatory capital minimums that cap how
much additional leverage it can take on, for anyone, at any price. Layering LBO-style
acquisition debt on top of a bank holding company doesn't just multiply the leverage
in a straightforward way — regulators would not permit it. That's why you won't find
this labeled 'LBO' for JPMorgan."*

**Interactive inputs (all pre-seeded from JPMorgan's real, current figures):**
- Starting Tangible Common Equity
- Target ROTCE assumption (default: JPMorgan's own current reported ROTCE)
- Net income payout mix: dividends vs. buybacks vs. retained/reinvested capital
  (slider, sums to 100%)
- CET1 ratio target/floor (default: JPMorgan's current reported CET1 ratio, with a
  regulatory-minimum floor line clearly marked on the control so the user can see
  they cannot drag below it)

**Interactive outputs (live-updating):**
- Projected tangible book value per share growth over a 5-year horizon at the chosen
  payout mix and ROTCE assumption
- Capital generated vs. capital returned to shareholders (dividends + buybacks) each
  year, and how much is retained to support balance-sheet/RWA growth
- A simple "implied share price" range using the P/B multiple the market currently
  assigns JPMorgan, applied to the projected tangible book value — i.e., "if JPMorgan
  keeps earning this ROTCE and the market keeps paying this multiple of book, here's
  what the equity could be worth in 5 years" — explicitly labeled as a
  multiple-holds-constant assumption, not a forecast
- A short explainer panel (using the CET1 glossary entry) showing why the capital
  ratio, not a debt/EBITDA leverage ratio, is the real constraint on how aggressively
  JPMorgan can return capital to shareholders

This module reuses the same visual language (input controls, live-updating outputs,
a bridge-style chart) as the LBO tab on the other two companies specifically so that a
visitor who has used NVIDIA's or Netflix's LBO tool recognizes the interaction
pattern immediately on JPMorgan's page — the mechanism is different, the *feel* of
"move an input, watch the outputs respond" should not be.

---

## 8. TEST CASES (for engineering — hand-verifiable)

### Test Case 1 — baseline, fully hand-computed (use exact figures below as a golden
test; do not substitute real company numbers here, this is a clean synthetic case
chosen specifically to be simple to verify by hand)

**Inputs:**
Entry EBITDA = $100mm · Entry Multiple = 10.0x · Fee % = 2% · Debt/EBITDA = 5.0x ·
Entry Revenue (Year 0) = $500mm (implies 20% entry EBITDA margin) · Revenue CAGR =
10% · EBITDA Margin assumption = 20% (flat) · Capex/D&A = 3% of revenue · Interest
Rate = 8% · Tax Rate = 25% · Hold Period = 5 years · Exit Multiple = 10.0x (equal to
entry — isolates EBITDA growth and debt paydown, zero multiple-expansion
contribution, useful specifically because it makes the bridge easy to sanity-check).

**Expected Sources & Uses:** Entry EV = $1,000.0mm · Fees = $20.0mm · Total Uses =
$1,020.0mm · New Debt = $500.0mm · Sponsor Equity = $520.0mm.

**Expected year-by-year (rounded to 3 decimals, $mm):**

| Year | Revenue | EBITDA | D&A=Capex | EBIT | Interest | Pretax | Tax | Net Income = CFADS | Debt Paydown | Ending Debt |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 550.000 | 110.000 | 16.500 | 93.500 | 40.000 | 53.500 | 13.375 | 40.125 | 40.125 | 459.875 |
| 2 | 605.000 | 121.000 | 18.150 | 102.850 | 36.790 | 66.060 | 16.515 | 49.545 | 49.545 | 410.330 |
| 3 | 665.500 | 133.100 | 19.965 | 113.135 | 32.826 | 80.309 | 20.077 | 60.232 | 60.232 | 350.098 |
| 4 | 732.050 | 146.410 | 21.962 | 124.449 | 28.008 | 96.441 | 24.110 | 72.330 | 72.330 | 277.768 |
| 5 | 805.255 | 161.051 | 24.158 | 136.893 | 22.221 | 114.672 | 28.668 | 86.004 | 86.004 | 191.764 |

**Expected exit:** Exit EBITDA = $161.051mm · Exit EV = $1,610.51mm · Exit Net Debt =
$191.764mm (no cash accumulation — debt never reaches zero) · Exit Equity Value =
**$1,418.746mm**.

**Expected returns:** MOIC = 1,418.746 / 520.0 = **2.728x** · IRR = 2.728^(1/5) − 1 =
**≈22.2%**.

**Expected value-creation bridge:** EBITDA Growth Contribution = (161.051 − 100) ×
10.0 = $610.51mm · Multiple Change Contribution = 161.051 × (10.0 − 10.0) = $0.00mm ·
Debt Paydown Contribution = 500.0 − 191.764 = $308.236mm · Transaction Fees =
−$20.0mm. Sum = 610.51 + 0 + 308.236 − 20 = $898.746mm. Sponsor Entry Equity
($520.0mm) + $898.746mm = **$1,418.746mm**, matching Exit Equity Value exactly. This
reconciliation must pass as an automated test to floating-point tolerance (e.g.,
1e-6) on every build.

### Test Case 2 — multiple contraction (tests negative-contribution branch)

Same inputs as Test Case 1 except Exit Multiple = 8.0x. Expect: Multiple Change
Contribution = 161.051 × (8.0 − 10.0) = **−$322.102mm** (negative), and the bridge
should still reconcile exactly to the recomputed Exit Equity Value using the same
formula. Confirms the waterfall chart correctly renders a negative segment.

### Test Case 3 — debt fully repaid before hold period ends (tests cash-accumulation
branch)

Same base inputs as Test Case 1 except Debt/EBITDA = 2.0x (New Debt = $200mm at
entry). By roughly Year 3–4 CFADS will exceed the remaining debt balance. Confirms:
(a) `Debt_t` floors at exactly $0 rather than going negative, (b) `Cash Accumulated_t`
begins correctly accruing the residual CFADS in the same year debt hits zero, (c)
`Net Debt_t` correctly goes negative for the remaining projection years, (d) Exit
Equity Value correctly adds the accumulated cash back (i.e., is *larger* than Exit EV
minus the stale debt figure would suggest).

### Test Case 4 — negative CFADS year (tests the warning banner and zero-paydown
floor)

Same base inputs as Test Case 1 except Interest Rate = 20% and Debt/EBITDA = 7.0x.
Confirms: (a) at least one projection year produces `Pretax Income_t < 0` and/or
`CFADS_t < 0`, (b) `Debt Paydown_t` floors at $0 rather than going negative (debt
balance does not increase), (c) the UI warning banner fires for that specific year,
(d) the model still completes the full projection and produces a (likely poor) MOIC/
IRR rather than erroring out.

### Test Case 5 — one-year hold (tests the IRR formula's degenerate case)

Hold Period = 1 year, otherwise Test Case 1 inputs. Confirms `IRR == MOIC − 1` exactly
in this case (no compounding root needed when N=1), and that the exponent `1/N` does
not produce a divide-by-zero or malformed result at the N=1 boundary.

---

## 9. OPTIONAL ADVANCED FEATURE — HISTORICAL DEAL CASE STUDY

**Recommendation: include, as a separate, clearly-labeled "Historical Deal" case
study, distinct from the "Illustrative" sandbox tools on NVIDIA/Netflix/JPMorgan —
implemented as its own small standalone view (e.g., `/lbo-case-study/dell-2013`),
not bolted onto any of the three company pages.** None of the three core companies is
a suitable subject for a real historical LBO case study (NVIDIA and JPMorgan have
never been remotely LBO candidates; Netflix has not been the subject of an actual
buyout). Forcing a "historical deal" onto one of them would mean fabricating a
counterfactual, which is exactly the kind of invented-scenario risk the brief warns
against. A genuine historical deal, kept separate, is safer and more educational.

**Recommended deal: Dell Inc.'s 2013 going-private transaction** (Michael Dell +
Silver Lake Partners, with Microsoft providing part of the financing).

**Why it qualifies against the brief's three tests:**
- *Terms are publicly documented:* the deal was announced via 8-K (Feb. 5, 2013) and
  went through a full public proxy contest (Carl Icahn and Southeastern Asset
  Management opposed the price), generating an unusually rich public record —
  DEFA14A/DFAN14A soliciting materials, an SC 13E-3 going-private filing, and multiple
  amendments, all on SEC EDGAR.
- *Inputs are sourceable:* headline terms are directly confirmed in primary filings —
  $13.65/share cash, ~$24.4B total transaction value, a 25% premium to Dell's
  undisturbed closing price of $10.88 (Jan. 11, 2013), Michael Dell's ~15.7% equity
  rollover plus ~$700mm of additional cash, Silver Lake's equity commitment (~$1–2B
  depending on the filing referenced — reconcile to the final SC 13E-3 at build time),
  Microsoft's $2.0B financing (structured as a loan, not straight equity — verify
  exact instrument type from the 8-K/proxy before labeling it), and debt financing
  arranged by Bank of America Merrill Lynch, Barclays, Credit Suisse, and RBC Capital
  Markets. Break-up fees of $180mm (go-shop period) / $450mm (thereafter) are also
  directly documented. **Important build-time note:** the deal was later amended
  during the Icahn contest — the price the shareholders ultimately received at
  closing (October 2013) differed from (was higher than) the originally announced
  $13.65/share. Reconcile which figure ("as announced" vs. "as closed") the case
  study uses, use it consistently throughout, and source the closing figure to the
  closing 8-K, not the announcement 8-K.
- *Reconstruction can be done accurately:* projected returns are directly stated in
  the proxy fight's own soliciting materials — Evercore (advisor to Dell's Special
  Committee), citing Boston Consulting Group projections, disclosed that Silver Lake
  could realize an average annualized return of up to 44.7% and Michael Dell up to
  50.1% over a 4–5 year hold, giving the case study a real, sourced, citable
  return benchmark to reconstruct toward and compare the simplified model's output
  against — itself a useful teaching moment about how sensitive projected IRR is to
  the underlying operating assumptions.
- *It improves the product materially:* it gives a professional reader something the
  "Illustrative" sandbox tools can't — a real deal to check the mechanics against —
  without requiring the product to fabricate a counterfactual buyout of NVIDIA,
  Netflix, or JPMorgan.

**Sourcing for build:** SEC EDGAR filings under Dell Inc., CIK 0000826083 — Form 8-K
filed Feb. 5, 2013 (announcement), Form DEFA14A filed Mar. 29, 2013 (preliminary
proxy), Form DFAN14A filed Jun. 26, 2013 (Icahn/Southeastern soliciting materials,
containing the Evercore/BCG return projections), Form SC 13E-3/A filings (going-
private disclosure, financing detail), and the closing 8-K (~October 2013 — locate
and verify at build time). Every figure used in the case study must carry the same
`SourceRef` treatment as the three core companies' data per `DATA_DICTIONARY.md` §1.1
— this is real historical data and deserves the same rigor, not looser treatment
because it's "just an extra feature."

**What NOT to build for the case study (scope discipline):** a live editable version
of the Dell LBO (i.e., don't let a user "replay" Dell 2013 with different
assumptions) — that would blur the line between "here is what actually happened" and
"here is a sandbox," which is precisely the distinction this whole section exists to
preserve. Present it as a fixed, narrated case study with the real numbers, not a
sixth interactive tool.
