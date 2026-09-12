# LBO_SPEC.md
Exact mechanics for the interactive LBO tool. This is an intentionally simplified model — it is labeled as such directly in the UI (see UI_SPEC.md), not just in this document. The simplifications are itemized below so the build team knows exactly what's been left out and why that's an acceptable trade-off for a teaching tool rather than an institutional model.

---

## Applicability by company

| Company | Module type | Why |
|---|---|---|
| NVIDIA | Full simulator, **scale-decoupled** | NVIDIA's real EBITDA (~$86B+ in FY2025, materially higher by FY2026) makes any full-company LBO comically outside real-world leveraged-finance capacity. The tool still uses NVIDIA's real margin profile but must carry an explicit on-screen disclaimer — see below. |
| Netflix | Full simulator, tied to real figures | Best fit of the three. Still far larger than any real historical LBO, but closer to plausible scale and built entirely from real, sourced FY2025 figures. |
| JPMorgan | **Not a simulator** — explainer + "Excess Capital / Dividend Capacity" module | Regulated banks are not real LBO targets. See the JPMorgan Module section below. |

---

## Core Mechanics (NVIDIA / Netflix module)

### Inputs (all user-adjustable via sliders, each with a stated default and realistic range)

| Input | Default | Realistic range | Notes |
|---|---|---|---|
| Entry EBITDA | Company's real, sourced trailing/latest-FY EBITDA | fixed (not user-adjustable) | Pulled from `SourcedValue`, never typed into the UI |
| Entry Multiple | 10.0x | 6x – 14x | Entry EV = Entry EBITDA × Entry Multiple |
| Debt / EBITDA | 6.0x | 3x – 7x | Sets initial debt load |
| Interest Rate (on debt) | 8.0% | 6% – 11% | Blended illustrative leveraged-debt rate; flat for the whole hold period (no rate step-ups modeled — documented simplification) |
| Hold Period | 5 years | 3 – 8 years | |
| Revenue Growth (annual) | Company's recent actual growth rate, rounded | 0% – 40% | Held constant across the hold period — documented simplification (no deceleration curve) |
| EBITDA Margin | Company's current actual margin | held flat by default; optional margin-expansion/contraction slider | Simplification: margin doesn't ramp year over year unless the user explicitly adjusts it |
| Cash Flow Conversion % | 60% | 40% – 80% | The percentage of EBITDA that becomes cash available for debt service *before* interest — a single assumption standing in for CapEx, cash taxes, and working-capital changes, so the tool doesn't need a full three-statement projection (documented simplification) |
| Exit Multiple | = Entry Multiple by default | 6x – 14x | User-adjustable independently to show multiple expansion/contraction |

### Formulas (in calculation order — this is the exact sequence the calculation engine should run)

```
1.  Entry EV               = Entry EBITDA × Entry Multiple
2.  Entry Debt              = Entry EBITDA × Debt/EBITDA
3.  Entry Sponsor Equity    = Entry EV − Entry Debt

    For each year t = 1 … Hold Period:
4.  EBITDA_t                = EBITDA_(t-1) × (1 + Revenue Growth)      [margin held flat by default,
                                                                          so EBITDA grows at the revenue growth rate
                                                                          unless the user adjusts margin separately]
5.  Pre-Interest Cash Flow_t = EBITDA_t × Cash Flow Conversion %
6.  Interest Expense_t      = Debt_(t-1) × Interest Rate                [beginning-of-year balance —
                                                                          avoids circularity, standard simplification]
7.  Cash Available for
    Debt Paydown_t          = MAX(0, Pre-Interest Cash Flow_t − Interest Expense_t)
                                                                        [floor at zero — if interest exceeds
                                                                          pre-interest cash flow, debt does not
                                                                          pay down that year; flag this state in
                                                                          the UI as a "cash flow shortfall" edge case]
8.  Debt Paydown_t          = MIN(Cash Available for Debt Paydown_t, Debt_(t-1))
9.  Debt_t                  = Debt_(t-1) − Debt Paydown_t

    At exit (t = Hold Period):
10. Exit EBITDA             = EBITDA_(Hold Period)
11. Exit EV                 = Exit EBITDA × Exit Multiple
12. Exit Equity Value        = Exit EV − Debt_(Hold Period)
13. MOIC                     = Exit Equity Value ÷ Entry Sponsor Equity
14. IRR                      = MOIC ^ (1 ÷ Hold Period) − 1            [assumes a single entry and single exit
                                                                          cash flow only — no interim dividends
                                                                          modeled; documented simplification]

    Value creation attribution (must sum to total value creation — this is the mathematical-consistency check):
15. EBITDA Growth Contribution   = (Exit EBITDA − Entry EBITDA) × Entry Multiple
16. Multiple Change Contribution = (Exit Multiple − Entry Multiple) × Exit EBITDA
17. Debt Paydown Contribution    = Entry Debt − Debt_(Hold Period)
18. Total Value Creation          = Exit Equity Value − Entry Sponsor Equity
    CHECK: Item 15 + Item 16 + Item 17 must equal Item 18 (within floating-point rounding). If it doesn't in
    testing, the calculation engine has a bug — this identity is the primary unit test for the whole module.
```

### Worked example — Netflix base case (illustrative, rounded to one decimal for readability; the live tool must carry full precision)

Inputs: Entry EBITDA $13.3B (FY2025 operating income used as the EBITDA base, consistent with the "don't add back content amortization" methodology in FINANCE_GLOSSARY.md/DATA_DICTIONARY.md) · Entry Multiple 10.0x · Debt/EBITDA 6.0x · Interest Rate 8% · Hold Period 5 years · Revenue/EBITDA growth 12%/yr · Cash Flow Conversion 60% · Exit Multiple 10.0x (no multiple expansion assumed in the base case).

| | Entry | Yr 1 | Yr 2 | Yr 3 | Yr 4 | Yr 5 (Exit) |
|---|---|---|---|---|---|---|
| EBITDA ($B) | 13.3 | 14.9 | 16.7 | 18.7 | 20.9 | 23.4 |
| Debt ($B), beginning | — | 80.0 | 77.5 | 73.6 | 68.3 | 61.2 |
| Interest expense ($B) | — | 6.4 | 6.2 | 5.9 | 5.5 | 4.9 |
| Pre-interest cash flow ($B) | — | 8.9 | 10.0 | 11.2 | 12.5 | 14.0 |
| Debt paydown ($B) | — | 2.5 | 3.8 | 5.3 | 7.1 | 9.1 |
| Debt, ending ($B) | 80.0 | 77.5 | 73.6 | 68.3 | 61.2 | 52.1 |

- Entry EV = $133.3B · Entry Sponsor Equity = $53.3B
- Exit EV = 23.4 × 10.0 = $234.0B · Exit Equity Value = 234.0 − 52.1 = **$181.9B**
- **MOIC = 181.9 ÷ 53.3 ≈ 3.4x**
- **IRR = 3.4^(1/5) − 1 ≈ 27.8%**
- Value creation bridge: EBITDA growth contribution ≈ $101.0B, multiple change contribution = $0 (no expansion assumed), debt paydown contribution ≈ $27.9B → total ≈ $128.9B, matching Exit Equity ($181.9B) − Entry Equity ($53.3B) ≈ $128.6B (rounding).

This confirms the model is internally consistent and gives the build team a known-good reference case to test the calculation engine against.

### NVIDIA-specific disclaimer (required, not optional)

NVIDIA's FY2025 EBITDA alone (~$86B, and materially higher in FY2026) means a full-company illustrative LBO at even a 6x multiple implies a purchase price several times larger than the entire global leveraged loan market typically finances in a single year, and dramatically larger than the biggest LBO in history (the 2013 Dell take-private, at $24.4B — for scale, see the LBO glossary entry). **Display this exact context as a fixed banner above the NVIDIA LBO tool, not buried in a tooltip:** *"No real leveraged buyout has ever been remotely this size. This tool uses NVIDIA's real margin profile to show how LBO mechanics work — it is not a claim that this transaction is realistic at NVIDIA's actual scale."*

### Sensitivity Table (required output, not optional)

A 2-axis grid — **Exit Multiple (rows) × Revenue Growth (columns)** — showing resulting MOIC (or IRR, toggleable) at each combination, holding all other inputs at their current slider values. This is the single most useful institutional-style output to include, and it's cheap to compute since it's just re-running steps 4–14 above across a grid of two varying inputs. Default grid: Exit Multiple {Entry−2x, Entry−1x, Entry, Entry+1x, Entry+2x} × Revenue Growth {current−4pp, current−2pp, current, current+2pp, current+4pp}.

---

## JPMorgan Module — "Why an LBO doesn't work here" + Excess Capital / Dividend Capacity

### The explainer (required content, displayed first)

Three concrete, factual reasons, each tied to something in COMPANY_RESEARCH.md — not abstract:
1. **Deposits aren't discretionary financing.** A normal LBO layers debt onto a business voluntarily. A bank's core liabilities are customer deposits — pulling them isn't something a sponsor could choose to do differently, and they aren't "debt capacity" in the leveraged-finance sense.
2. **Regulatory capital ratios, not cash flow, are the binding constraint.** JPMorgan's Standardized CET1 ratio was 14.8% (Advanced 14.9%) as of Q3 2025 — a bank's ability to operate is governed by these ratios, not by debt service coverage the way a normal LBO target is.
3. **Change of control requires Federal Reserve approval under the Bank Holding Company Act.** A private equity sponsor cannot simply acquire a systemically important bank the way it would a normal corporate target — this is a structural, legal barrier, not just a financing-availability issue.

### The alternative: Excess Capital / Dividend Capacity (simplified)

**Concept:** instead of "how much debt could a buyer add," show "how much capital could JPMorgan itself return to shareholders (dividends + buybacks) while staying above its regulatory capital targets." This is the real lever bank management teams and analysts actually discuss.

```
Excess Capital ≈ (Current CET1 Ratio − Target CET1 Ratio) × Risk-Weighted Assets (RWA)
```

**Data needed to make this real (flagged for build-time sourcing — do not invent):** JPMorgan's Standardized RWA was approximately $1.9T as of Q3 2025 and its Standardized CET1 ratio was 14.8%. **What's missing from this research pack and must be sourced directly from JPMorgan's own investor materials before this module ships:** JPMorgan's explicitly stated *management target* CET1 ratio (as distinct from the regulatory minimum) — this number was referenced in earnings coverage but not confirmed to a specific figure during this research pass. Mark this input as `confidence: needs_verification` in the data layer and pull it from JPMorgan's most recent Investor Day materials or CFO commentary before computing a displayed dollar figure. **Do not ship a computed "excess capital" dollar amount until that target is verified from a primary source** — showing a plausible-looking but unverified number here would be a worse outcome than not showing the calculator at all.

### Edge cases to test (all three companies, full simulator)

- Interest Rate high enough that Interest Expense_t > Pre-Interest Cash Flow_t in an early year → debt paydown floors at zero, debt balance can even need to be checked against not going negative in the paydown formula (it can't, since Debt Paydown_t is capped at Debt_(t-1) via the MIN function in step 8).
- Debt/EBITDA set high enough that Entry Debt > Entry EV (i.e., Debt/EBITDA slider exceeds Entry Multiple) → Entry Sponsor Equity would be negative, which is nonsensical. **Validation rule: disable/clamp the Debt/EBITDA slider so it cannot exceed the current Entry Multiple value.**
- Exit Multiple set to 0 or Hold Period set to 0 → both should be excluded from the slider's valid range entirely (minimums above zero), not handled as a runtime edge case.
- Revenue Growth negative (a valid, realistic scenario for a stress-test) → EBITDA_t should be allowed to decline; Cash Available for Debt Paydown can legitimately hit zero for multiple consecutive years — this is a valid and instructive scenario, not an error state, and should be visually distinguished from an invalid input (e.g., muted amber "cash flow shortfall" note versus a red validation error).
