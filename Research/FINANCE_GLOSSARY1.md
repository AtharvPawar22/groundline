# FINANCE_GLOSSARY.md
## Structured Glossary

Authored content for the `ExplanationContent` records defined in `DATA_DICTIONARY.md`
§1.4. Each entry follows the fixed four-block schema from `PRODUCT_SPEC.md` §D:
**What It Means → Why It Matters → Formula (where useful) → This Company** (per
company where the term applies), plus an optional **Caveat**.

The "This company" figures below use the researched values from
`COMPANY_RESEARCH.md`. In the live product these are **not** static strings — they
are rendered from the template pattern in `DATA_DICTIONARY.md` §1.4 so they stay
correct as the dataset is updated. Treat the numbers here as the authored example the
template should produce given the current dataset, not as text to hardcode.

Numbers cited use the periods noted; verify exact figures against primary sources at
build time per `COMPANY_RESEARCH.md`.

---

## Income statement

### Revenue
**What it means.** The total amount of money a company brought in from selling its
products or services, before subtracting any costs.
**Why it matters.** It's the top of the income statement and the base every other
profitability metric is measured against — growth in revenue is the first signal of
whether a business is expanding.
**This company —**
- *NVIDIA:* FY2026 revenue was $215.9B, up 65% from the prior year, driven almost
  entirely by Data Center demand for AI infrastructure.
- *Netflix:* FY2025 revenue was $45.2B; the company guided FY2026 revenue to
  $51.0–51.4B.
- *JPMorgan:* JPMorgan reports revenue on a "managed" (non-GAAP) basis as its
  headline figure — Q2 2026 managed revenue was $58.0B, up 27% year over year.
**Caveat.** JPMorgan's "managed revenue" isn't the same concept as an industrial
company's revenue — it includes net interest income, which is itself a spread between
what the bank earns on loans and pays on deposits, not a straightforward sale.

### Gross Profit
**What it means.** Revenue minus the direct cost of producing what was sold (cost of
revenue).
**Why it matters.** Shows how much a company keeps from each dollar of sales before
overhead, R&D, and marketing — the first checkpoint on whether the core product is
economically attractive.
**Formula.** Revenue − Cost of Revenue
**This company —**
- *NVIDIA:* GAAP gross margin was 71.1% for FY2026 and 75.0% in the most recent
  quarter (Q2 FY2027) — among the highest of any large hardware company, reflecting
  NVIDIA's pricing power in AI accelerators.
- *Netflix:* Netflix doesn't break out a separate "cost of revenue" line the way a
  hardware company does; most of its content cost flows through amortization within
  operating expenses, so gross profit is a less central metric for Netflix than
  operating margin is.
**Caveat.** Not a standard disclosure for JPMorgan — banks don't have a "cost of
revenue" in the industrial sense, so this metric is not shown on JPMorgan's pages.

### EBIT (Earnings Before Interest and Taxes)
**What it means.** Profit from operations before the effects of how the company is
financed (interest) or taxed. In practice, this is usually the same figure a company
reports as "Operating Income."
**Why it matters.** Lets you compare operating performance between two companies with
different debt loads or tax situations.
**This company —** See Operating Income below — for NVIDIA and Netflix, EBIT and
GAAP Operating Income are effectively the same figure as reported.
**Caveat.** For a bank, "before interest" doesn't work the same way — interest income
and expense are the core business, not a financing layer to strip out. EBIT is not
displayed for JPMorgan.

### EBITDA (Earnings Before Interest, Taxes, Depreciation and Amortization)
**What it means.** Operating income with depreciation and amortization added back —
an attempt to approximate cash operating profitability before the effects of
financing, taxes, and non-cash accounting charges for past capital spending.
**Why it matters.** Widely used to compare companies with different capital
intensity, debt loads, and tax jurisdictions, and it's the standard denominator for
enterprise-value multiples used in M&A and LBO analysis.
**Formula.** Operating Income + Depreciation & Amortization
**This company —**
- *NVIDIA:* TTM EBITDA is approximately $201.3B as of the data snapshot, reflecting
  NVIDIA's combination of very high growth and very high margins.
- *Netflix:* Netflix's EBITDA is meaningfully inflated relative to its actual free
  cash generation, because a large share of what gets "added back" is amortization of
  *content assets* — and unlike depreciation of a factory that was paid for years ago,
  content amortization tracks an ongoing, large, recurring cash outlay (Netflix's cash
  content spending). Adding it back the same way you'd add back factory depreciation
  overstates how much of Netflix's "EBITDA" is actually free cash.
**Caveat.** **Not displayed for JPMorgan** — see `DATA_DICTIONARY.md` §3 for the full
rationale; net interest income is the core operating line for a bank, so there's no
clean "operating income before financing costs" to compute.

### EBITDA Margin
**What it means.** EBITDA expressed as a percentage of revenue.
**Why it matters.** Normalizes profitability comparisons across companies of
different sizes.
**Formula.** EBITDA / Revenue
**This company —** NVIDIA's TTM EBITDA margin is roughly 66% as of the data
snapshot — an unusually high figure reflecting both software-like gross margins and
operating leverage at scale. Netflix's is high as well but, per the EBITDA caveat
above, less indicative of true cash profitability than the same figure would be for a
less content-amortization-heavy business.

### Operating Income
**What it means.** Profit from the core business after operating expenses (R&D,
sales, and administrative costs) but before interest and taxes.
**Why it matters.** The cleanest single-line read on whether the actual business — as
opposed to investment gains, tax effects, or financing — is profitable and how that's
trending.
**Formula.** Gross Profit − Operating Expenses
**This company —**
- *NVIDIA:* Q2 FY2027 GAAP operating income was $63.7B on revenue of $96.2B — a 66%
  operating margin.
- *Netflix:* Q2 2026 operating income was $4.19B on revenue of $12.56B — a 33.4%
  operating margin, down from 34.1% a year earlier because content-amortization
  growth was front-loaded in the first half of 2026.
- *JPMorgan:* not a standard headline metric for a bank in the same way (banks
  typically discuss "pre-provision net revenue" or net income directly), so it is not
  a primary display metric on JPMorgan's pages.

### Net Income
**What it means.** What's left after every expense, including interest and taxes, is
subtracted from revenue — the "bottom line."
**Why it matters.** The single most commonly cited profitability figure, and the
basis for EPS, but it can be moved significantly by one-off items unrelated to the
core business.
**This company —**
- *NVIDIA:* Q2 FY2027 net income was $59.7B, but a meaningful share of the growth in
  reported net income across recent quarters has come from gains on equity securities
  NVIDIA holds (including its investment in Intel), not from chip sales — the Q1
  FY2027 quarter alone included roughly $15.9B of such pre-tax gains.
- *Netflix:* Q2 2026 net income was $3.40B ($0.80/diluted share).
- *JPMorgan:* Q2 2026 reported net income was $21.2B, but $4.6B of that came from a
  gain related to JPMorgan's Visa shares and $1.0B from other equity investment gains
  — excluding those, net income was $16.9B. JPMorgan itself reports both figures side
  by side; the product should too.
**Caveat.** "Net income" is not automatically "quality of earnings" — a spike driven
by one-time investment gains (true for both NVIDIA and JPMorgan in this dataset) tells
you less about the ongoing business than operating income does.

### Diluted EPS (Earnings Per Share)
**What it means.** Net income divided by the number of shares that would be
outstanding if all convertible securities, options, and stock awards were exercised.
**Why it matters.** Converts total profit into a per-share figure investors can
compare to the share price.
**This company —** NVIDIA's FY2026 GAAP diluted EPS was $4.90. Netflix's Q2 2026
diluted EPS was $0.80. JPMorgan's Q2 2026 reported diluted EPS was $7.70 ($6.14
excluding significant items).

---

## Cash flow and capital

### Capital Expenditure (Capex)
**What it means.** Money spent on physical or long-lived assets — property,
equipment, data-center buildout — that will be used for more than one year.
**Why it matters.** High capex relative to cash flow signals a capital-intensive
growth phase; capex is subtracted from operating cash flow to get free cash flow.
**This company —** NVIDIA's capex is modest relative to its cash generation (its
capital-intensity sits mostly with its manufacturing partners like TSMC, not on
NVIDIA's own balance sheet, since NVIDIA is fabless). Netflix's largest "capital
spend" analog isn't traditional capex — it's cash content spending, which is captured
in operating cash flow, not a separate capex line, and is one reason Netflix's capex
figure alone understates its real cash investment in the business.

### Operating Cash Flow
**What it means.** Cash actually generated by core business operations, adjusted for
non-cash items and changes in working capital — as opposed to accounting profit,
which can include non-cash items.
**Why it matters.** A profitability figure that's harder to distort with accounting
choices than net income, because it tracks cash in the door, not just recognized
revenue.
**This company —** NVIDIA generated $74.4B of operating cash flow in the first half
of fiscal 2027 alone. Netflix's operating cash flow in Q2 2026 was $1.7B, down from
$2.4B a year earlier.

### Free Cash Flow (FCF)
**What it means.** Operating cash flow minus the capital spending needed to sustain
and grow the business — the cash left over that could, in principle, be returned to
shareholders or used to pay down debt.
**Why it matters.** Widely viewed as the most honest single measure of a company's
economic profitability, because it can't be inflated by non-cash accounting
adjustments the way net income or EBITDA sometimes can.
**Formula.** Operating Cash Flow − Capital Expenditures (see each company's own
disclosed formula in `DATA_DICTIONARY.md` §2.1 — NVIDIA's and Netflix's stated
definitions both also subtract certain lease-related principal payments)
**This company —** NVIDIA generated $69.9B of free cash flow in the first half of
fiscal 2027. Netflix generated $1.53B of free cash flow in Q2 2026 and guided to
roughly $12.5B for full-year 2026.
**Caveat.** Not a standard metric for JPMorgan — a bank's operating cash flow is
dominated by changes in loans and deposits, which don't map onto the same "cash left
over after maintaining the business" concept.

### Working Capital
**What it means.** Current assets minus current liabilities — the short-term
resources a company has available to fund day-to-day operations.
**Why it matters.** A rough gauge of short-term financial health and how much cash is
tied up in things like inventory and receivables versus how much is owed
imminently.
**This company —** NVIDIA's working capital swung notably as accounts receivable and
inventory both grew quickly alongside its revenue ramp — receivables alone grew by
over $24.6B in the first half of fiscal 2027, a direct consequence of extremely fast
revenue growth outpacing customer payment cycles.

### Depreciation
**What it means.** The systematic allocation of the cost of a physical asset (like
equipment or buildings) over its useful life, recognized as an expense each period
even though no new cash is spent in that period.
**Why it matters.** A non-cash expense that reduces reported profit without reducing
cash on hand in that period — which is exactly why it gets added back in EBITDA.

### Amortization
**What it means.** The same concept as depreciation, applied to intangible assets
(patents, acquired technology, and — for Netflix specifically — capitalized content).
**Why it matters.** For most companies, amortization is a small, genuinely non-cash
item. For Netflix, content amortization is large and tracks real, ongoing cash
content spending closely — which is why EBITDA's add-back logic is misleading for
Netflix specifically (see the EBITDA entry above).

---

## Balance sheet

### Debt
**What it means.** Money a company has borrowed and must repay, typically bonds or
loans, shown as short-term and long-term debt on the balance sheet.
**Why it matters.** Debt levels affect financial risk, interest expense, and how much
of enterprise value is financed by lenders versus shareholders.
**This company —** NVIDIA's long-term debt roughly quadrupled in a single quarter (to
$32.4B as of July 26, 2026) after the company issued new debt during Q2 FY2027 —
worth surfacing as a genuine capital-structure event, not a rounding change. Netflix
carried $14.5B of total debt as of the end of 2025.
**Caveat.** For JPMorgan, conventional "debt" (funded borrowings) is a small slice of
a balance sheet dominated by customer deposits — deposits fund JPMorgan's lending
far more than bond issuance does, which is part of why "debt" isn't a meaningful
lever in a bank valuation the way it is for an industrial company.

### Cash
**What it means.** Cash and cash equivalents (and, often, short-term investments)
held on the balance sheet.
**Why it matters.** A direct measure of liquidity and financial flexibility.
**This company —** NVIDIA held $22.4B of cash and equivalents as of July 26, 2026 (and
substantially more when marketable debt and equity securities are included). Netflix
held roughly $9.1B of cash, equivalents, restricted cash, and short-term investments
at the end of 2025.

### Net Debt
**What it means.** Total debt minus cash and equivalents — a measure of how much a
company would still owe if it used all its cash to pay down debt today. Can be
negative ("net cash").
**Why it matters.** Used to build enterprise value and is a cleaner leverage measure
than gross debt alone, since it accounts for cash on hand.
**Formula.** Total Debt − Cash & Equivalents
**Caveat.** Not computed or displayed for JPMorgan — see `DATA_DICTIONARY.md` §3.

---

## Valuation

### Market Capitalization
**What it means.** The total value of all of a company's outstanding shares — share
price multiplied by shares outstanding.
**Why it matters.** The most commonly cited measure of company size in the market,
and the starting point for enterprise value.
**Formula.** Share Price × Diluted Shares Outstanding
**This company —** As of the early-September 2026 data snapshot, NVIDIA's market
capitalization was approximately $5.3 trillion (the largest of any public company),
Netflix's was approximately $337.5B, and JPMorgan's was approximately $950–965B.

### Enterprise Value (EV)
**What it means.** What it would theoretically cost to acquire a company's entire
operating business — its equity value plus its debt, minus its cash (since an
acquirer would inherit the debt but could use the cash to help pay for the deal).
**Why it matters.** A capital-structure-neutral way to value a business, which is why
it's the standard basis for EV/EBITDA and EV/Revenue multiples used in M&A.
**Formula.** Market Cap + Total Debt − Cash & Equivalents
**This company —** Computed and shown for NVIDIA and Netflix. **Not shown for
JPMorgan** — see `DATA_DICTIONARY.md` §3 for why treating a bank's deposits/borrowings
as "debt to add back" produces a number that doesn't mean what enterprise value is
supposed to mean.

### P/E (Price-to-Earnings Ratio)
**What it means.** Share price divided by earnings per share — how many dollars an
investor is paying for each dollar of annual profit.
**Why it matters.** The most widely used, most widely understood valuation multiple,
directly comparable across companies with different capital structures because it's
based on equity value and net income (both already "below the debt line").
**Formula.** Share Price / Diluted EPS (TTM)
**This company —** NVIDIA's TTM P/E was approximately 27.5x as of the data snapshot.
JPMorgan's TTM P/E was approximately 15.3–15.5x — reflecting the market's typically
lower multiple for a mature, heavily regulated bank versus a hypergrowth technology
company.

### EV/EBITDA
**What it means.** Enterprise value divided by EBITDA — how many years of (unlevered,
pre-tax, pre-depreciation) operating cash profit it would take to "pay for" the whole
business at its current valuation.
**Why it matters.** The standard multiple for comparing companies with different debt
loads and tax situations, and the multiple most directly used in LBO analysis.
**Formula.** Enterprise Value / EBITDA (TTM)
**This company —** Shown for NVIDIA and Netflix, each against their own peer set. Not
shown for JPMorgan (no EV, no standard bank EBITDA).

### EV/Revenue
**What it means.** Enterprise value divided by revenue — used when profitability
isn't yet a reliable comparison point, or to sanity-check an EV/EBITDA multiple
against how richly a company's top line is being valued.
**Formula.** Enterprise Value / Revenue (TTM)

### FCF Yield
**What it means.** Free cash flow divided by market capitalization — the free cash
flow return an investor is "earning" on the current stock price, expressed as a
percentage.
**Why it matters.** A more cash-grounded alternative (or complement) to earnings
yield (the inverse of P/E), useful for comparing how much actual spendable cash a
company generates relative to its price.
**Formula.** Free Cash Flow (TTM) / Market Cap

### P/B (Price-to-Book Ratio)
**What it means.** Market capitalization divided by shareholders' equity (book
value) — how much the market is paying relative to the accounting net worth of the
company.
**Why it matters.** For an industrial or tech company, book value is often a poor
proxy for economic value (it ignores brand, IP, and growth prospects), which is why
P/B is a secondary metric for NVIDIA and Netflix. For a bank, however, most assets
and liabilities (loans, securities, deposits) are financial instruments carried at or
close to fair value, so book value is a much more meaningful anchor — which is why
P/B is JPMorgan's *primary* valuation lens on this site, not a footnote.
**Formula.** Market Cap / Stockholders' Equity
**This company —** JPMorgan traded at roughly 2.3x book value as of Q2 2026 —
notably above 1.0x, meaning the market values JPMorgan's ongoing earnings power well
above the accounting value of its net assets, consistent with its industry-leading
returns on equity (see ROE/ROTCE below).

### ROE / ROTCE (Return on Equity / Return on Tangible Common Equity)
**What it means.** Net income divided by (tangible) shareholders' equity — how much
profit a company generates per dollar of capital shareholders have invested in it.
**Why it matters.** For a bank specifically, ROE/ROTCE is close to the central
profitability metric bank management and analysts organize around, the way operating
margin does for an industrial company — because a bank's core job is deploying
capital (subject to regulatory minimums) as productively as possible.
**Formula.** Net Income (annualized) / Average (Tangible Common) Equity
**This company —** JPMorgan reported Q2 2026 ROTCE of 23% (excluding significant
items); TTM ROE is roughly 17.8–17.9% on a blended basis. These are strong figures by
large-bank standards and a direct driver of why JPMorgan trades above book value.

---

## LBO-specific terms

### LBO (Leveraged Buyout)
**What it means.** The acquisition of a company using a significant amount of
borrowed money (debt) to fund the purchase price, with the acquired company's own
future cash flows expected to pay that debt down over the ownership period.
**Why it matters.** Understanding LBO mechanics explains how private equity firms
generate returns (through some mix of debt paydown, operational/EBITDA growth, and
multiple expansion) and is the analytical backbone of the private-equity industry.
**This company —** NVIDIA and Netflix both have an interactive LBO tool (see
`LBO_SPEC.md`); NVIDIA's is explicitly framed as a mechanics sandbox rather than a
plausible real deal, given its scale and growth profile. JPMorgan does not have a
standard LBO tool at all — see the Bank Economics entry below.

### Entry Multiple
**What it means.** The EV/EBITDA multiple paid to acquire the company at the start of
an LBO.
**Formula.** Entry Enterprise Value / Entry EBITDA

### Exit Multiple
**What it means.** The EV/EBITDA multiple assumed when the company is sold (or taken
public again) at the end of the holding period.
**Why it matters.** One of the three classic levers of LBO value creation (alongside
EBITDA growth and debt paydown) — and one of the riskiest to assume, since it depends
on future market conditions that can't be controlled.

### Debt Paydown
**What it means.** The reduction in an LBO's debt balance over the holding period,
funded by the acquired company's free cash flow.
**Why it matters.** A source of equity value creation that doesn't require the
business to grow or the exit multiple to be favorable — pure deleveraging still
increases the sponsor's equity stake in the enterprise value.

### MOIC (Multiple of Invested Capital)
**What it means.** Total cash returned to an investor divided by the total cash they
invested — a simple, undiscounted measure of "how many times did my money multiply."
**Formula.** Total Cash Returned / Total Cash Invested

### IRR (Internal Rate of Return)
**What it means.** The annualized rate of return that accounts for *when*, not just
*how much*, cash was returned — so a 2x MOIC over 3 years shows a much higher IRR than
a 2x MOIC over 8 years.
**Why it matters.** Private equity funds are typically evaluated on IRR more than raw
MOIC precisely because it captures the time value of capital and speed of return.

### DCF (Discounted Cash Flow)
**What it means.** A valuation method that estimates a company's worth as the present
value of the cash flows it's expected to generate in the future, discounted back at a
rate reflecting the risk of those cash flows.
**Why it matters.** The theoretical foundation most other valuation shortcuts (like
trading multiples) are ultimately trying to approximate.
**Caveat.** DCF is defined here for reference but is **not** an interactive tool on
this site — see `PRODUCT_SPEC.md` §M ("Do Not Build").

### Accretion / Dilution
**What it means.** In an acquisition, "accretive" means the deal increases the
acquirer's earnings per share; "dilutive" means it decreases it — typically because of
how the deal is financed (cash, debt, or new stock) relative to the target's own
earnings yield.
**Why it matters.** A quick first-pass sanity check bankers and investors run on any
announced acquisition, though it says nothing on its own about whether the deal
creates long-term value.
**This company —** Directly relevant to Netflix's now-terminated bid for Warner Bros.
Discovery's studio and streaming assets — the $82.7B enterprise value and how it
would have been financed is exactly the kind of scenario accretion/dilution analysis
is built for, even though the deal ultimately didn't close.

---

## Bank-specific terms

### Net Interest Income (NII)
**What it means.** The difference between the interest income a bank earns on
loans/securities and the interest it pays on deposits/borrowings.
**Why it matters.** The core "spread" business of banking — the closest bank analog
to a manufacturer's gross profit.
**This company —** JPMorgan's net interest income was $25.6B in Q2 2026, up 10% year
over year.

### Efficiency Ratio
**What it means.** Noninterest expense divided by net revenue — the share of a bank's
revenue consumed by operating costs.
**Why it matters.** A bank's version of an operating-margin proxy; a lower efficiency
ratio means more of each revenue dollar flows through to profit.

### CET1 Ratio (Common Equity Tier 1)
**What it means.** A regulatory capital ratio measuring a bank's core equity capital
against its risk-weighted assets.
**Why it matters.** The primary regulatory constraint on how much a bank can lend,
buy back stock, or pay in dividends — the closest thing a bank has to a "how
leveraged is too leveraged" line, and part of why standard corporate-finance leverage
concepts (like an LBO's debt/EBITDA) don't translate directly to banks. See "Bank
Economics" below.

### Bank Economics (site-specific module name, not a standard finance term)
**What it means.** The name of JPMorgan's fifth tab, replacing a conventional LBO
tool. It's an interactive explainer, anchored to JPMorgan's real capital position,
covering why a bank can't be leveraged-bought-out the way an industrial company can,
and what actually drives value for a bank instead (ROE/ROTCE relative to cost of
equity, capital return via dividends and buybacks, and the regulatory capital
constraint).
**Why it matters.** This is the single clearest place on the whole site where the
product demonstrates its core promise: it would be easy, and wrong, to bolt a
generic LBO calculator onto every company page. Full specification in
`LBO_SPEC.md` §7.2.
