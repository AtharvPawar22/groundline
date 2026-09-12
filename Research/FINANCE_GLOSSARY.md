# FINANCE_GLOSSARY.md
Every term is scoped to what's actually used in the product (per PRODUCT_SPEC.md — this is not an Investopedia clone). Each entry follows the fixed schema used in the ⓘ "Explain This" component: **What it means → Why it matters → Formula → This company (example) → Caveat.** Examples below default to Netflix's FY2025 figures unless a different company illustrates the point better; wire the live component to substitute whichever company the user is currently viewing.

---

### Revenue
**What it means:** The total money a company earns from selling its products or services, before any costs are subtracted.
**Why it matters:** It's the top-line scale of the business and the base every margin is measured against.
**Formula:** Price × units sold (or, for subscription businesses, average subscribers × average revenue per member).
**This company:** Netflix generated $45,183M in revenue in FY2025, up from a lower prior-year base — almost entirely from membership fees plus a growing advertising line.
**Caveat:** Revenue growth alone says nothing about profitability — see Gross Profit and Operating Income below.

### Gross Profit
**What it means:** Revenue minus the direct cost of delivering the product or service (cost of revenue).
**Why it matters:** Shows how much money is left to cover everything else — marketing, R&D, overhead — before you know if the company is actually profitable.
**Formula:** Revenue − Cost of Revenue.
**This company:** NVIDIA's FY2025 gross margin was approximately 75% — extremely high because its cost to produce each chip is small relative to what it sells for.
**Caveat:** A high gross margin doesn't guarantee a profitable company if operating expenses below it are large.

### EBIT (Operating Income)
**What it means:** Profit from the core business after all operating costs, before interest and taxes.
**Why it matters:** Strips out financing decisions (how much debt a company carries) and tax situations, making operating performance easier to compare across companies.
**Formula:** Gross Profit − Operating Expenses (SG&A, R&D, marketing).
**This company:** Netflix's FY2025 operating income was $13,327M, a 29.5% operating margin.
**Caveat:** "Operating Income" and "EBIT" are used interchangeably in practice, though technically EBIT can include some non-operating items depending on presentation — flag as a minor distinction, not worth over-explaining in the UI.

### EBITDA
**What it means:** Operating profit with depreciation and amortization added back — an attempt to show cash-like operating profitability before non-cash accounting charges.
**Why it matters:** Widely used to compare companies with different capital structures and to calculate valuation multiples like EV/EBITDA.
**Formula:** Operating Income + Depreciation + Amortization.
**This company:** This is the one term where the product should show its work explicitly. See the Netflix content-amortization conflict documented in COMPANY_RESEARCH.md and DATA_DICTIONARY.md — different data providers report Netflix's EBITDA as anywhere from roughly $13B to $35B TTM depending on whether content amortization is added back.
**Caveat:** EBITDA is not cash flow — it ignores real cash costs like capital expenditure, working capital changes, interest, and (for some businesses) content or R&D amortization that genuinely needs to be replaced every year.

### EBITDA Margin
**What it means:** EBITDA expressed as a percentage of revenue.
**Why it matters:** Lets you compare operating efficiency between companies of very different sizes.
**Formula:** EBITDA ÷ Revenue.
**This company:** Broadcom's EBITDA margin is roughly 67% (LTM) — reflecting a highly asset-light, software-and-IP-heavy business mix.
**Caveat:** Compare margins only within the same industry — a 20% EBITDA margin is strong for an airline and weak for enterprise software.

### Net Income
**What it means:** What's left of revenue after every expense — operating costs, interest, taxes, everything.
**Why it matters:** The standard "bottom line" figure used for EPS and P/E.
**Formula:** Revenue − all expenses (operating, interest, taxes, one-off items).
**This company:** JPMorgan reported FY2025 net income of $57.0 billion ($20.02 per share).
**Caveat:** Net income can be moved significantly by one-off items — JPMorgan's Q4 2025 net income was $13.0B as reported but $14.7B excluding a one-time $2.2B credit reserve. Always check for "excluding significant items" language.

### Capital Expenditure (CapEx)
**What it means:** Money spent on long-term physical or infrastructure assets — property, equipment, data centers, manufacturing capacity.
**Why it matters:** Shows how capital-intensive a business is, and is subtracted from operating cash flow to get free cash flow.
**Formula:** Not a derived formula — a direct cash-flow-statement line item.
**This company:** NVIDIA spent $3.4 billion on CapEx in FY2025 against $130.5B of revenue — a strikingly low ratio that illustrates how asset-light its business model is relative to a chip fabricator.
**Caveat:** NVIDIA designs chips but doesn't fabricate them (TSMC does) — its low CapEx partly reflects that division of labor, not just efficiency.

### Operating Cash Flow
**What it means:** Actual cash generated by core business operations, adjusted for non-cash items and working capital changes.
**Why it matters:** A reality check on net income — a profitable company on paper can still run out of cash if operating cash flow is weak.
**Formula:** Net Income + non-cash charges (D&A, stock-based comp) ± working capital changes.
**This company:** Netflix reported Q4 2024 operating cash flow of $1.5B; full-year figures are in the FY2025 10-K cash flow statement.
**Caveat:** Don't confuse this with Free Cash Flow — CapEx hasn't been subtracted yet.

### Free Cash Flow (FCF)
**What it means:** Cash left over after the business has funded its own operations and capital investments.
**Why it matters:** Cash available to pay down debt, buy back stock, pay dividends, or make acquisitions — many investors weight this more heavily than net income.
**Formula:** Operating Cash Flow − Capital Expenditure.
**This company:** Netflix generated approximately $9B of free cash flow in FY2025 (company-guided figure). Netflix's own management explicitly says it considers FCF a more useful liquidity measure than EBITDA for its business.
**Caveat:** This is the metric to lean on for Netflix specifically, given the EBITDA ambiguity described above.

### Working Capital
**What it means:** The short-term assets a business needs on hand to fund day-to-day operations, minus short-term liabilities.
**Why it matters:** Changes in working capital can swing cash flow significantly even when profit is stable — e.g., a company growing fast may tie up more cash in inventory or receivables.
**Formula:** Current Assets − Current Liabilities.
**This company:** Not a headline metric for any of the three companies in this product but referenced inside the LBO cash-flow-available-for-debt-paydown calculation — see LBO_SPEC.md.
**Caveat:** Media/subscription and bank business models handle "working capital" very differently from manufacturers — treat this as a lighter-weight glossary entry, not a core dashboard metric.

### Depreciation
**What it means:** Spreading the cost of a physical asset (equipment, buildings, servers) over its useful life instead of expensing it all at once.
**Why it matters:** A real economic cost (assets wear out and need replacing) but a non-cash charge in the period it's recorded.
**Formula:** Typically (Asset Cost − Salvage Value) ÷ Useful Life, straight-line.
**This company:** Embedded in NVIDIA's and JPMorgan's operating expenses; not separately broken out as a headline UI metric.
**Caveat:** Depreciation is why EBITDA and operating income differ — see the EBITDA entry.

### Amortization
**What it means:** The same concept as depreciation, applied to intangible assets — acquired patents, content libraries, goodwill-adjacent intangibles.
**Why it matters:** For Netflix specifically, content amortization is one of the largest expense lines in the business — this is *not* a minor accounting footnote for a media company the way it might be for a manufacturer.
**Formula:** Content asset cost spread over its expected useful life/viewing pattern.
**This company:** Central to the Netflix EBITDA caveat documented above — Netflix's content amortization is large enough that whether or not it's added back to EBITDA changes the multiple by roughly 2.5x.
**Caveat:** Don't let the product present amortization as a generic, minor line item on Netflix's page — it's one of the most important numbers to explain there.

### Debt
**What it means:** Money a company has borrowed and is obligated to repay, typically bonds or loans.
**Why it matters:** Determines financial risk, interest expense, and (for the LBO tool) how much leverage a hypothetical buyer could layer onto the business.
**Formula:** Sum of short-term and long-term borrowings from the balance sheet.
**This company:** Netflix reported gross debt of $14.5B as of Q3 2025.
**Caveat:** For JPMorgan, "debt" in the conventional sense is a misleading concept — see the JPMorgan framework caveat in COMPANY_RESEARCH.md and DATA_DICTIONARY.md.

### Cash
**What it means:** Cash and cash-equivalent liquid assets on the balance sheet.
**Why it matters:** Offsets debt when calculating Enterprise Value and Net Debt; a liquidity cushion.
**Formula:** Balance sheet line item.
**This company:** Netflix reported $9.3B of cash as of Q3 2025.
**Caveat:** For a bank, "cash" mostly represents required reserves and liquid securities held against liabilities, not discretionary cash — do not net it against market cap the normal way for JPMorgan.

### Net Debt
**What it means:** Total debt minus cash — a measure of a company's real leverage position after accounting for its cash cushion.
**Why it matters:** Used in Enterprise Value and is a cleaner leverage signal than gross debt alone.
**Formula:** Total Debt − Cash & Equivalents.
**This company:** Netflix's net debt was approximately $6.1B at year-end 2024 (company-reported); re-pull the FY2025 year-end figure at build time.
**Caveat:** Same bank caveat as above applies to JPMorgan.

### Market Capitalization
**What it means:** The total value the stock market currently places on all of a company's outstanding shares.
**Why it matters:** The most commonly cited measure of company "size" or "worth," and the starting point for Enterprise Value.
**Formula:** Share Price × Shares Outstanding.
**This company:** NVIDIA's market cap was $5.25 trillion as of late August 2026 — the largest of any public company at that time.
**Caveat:** Market cap is the value of the *equity* only — it says nothing about how much debt sits underneath it. That's what Enterprise Value corrects for.

### Enterprise Value (EV)
**What it means:** A way of valuing the entire operating business, independent of how it's financed — what it would cost to buy the whole company and pay off its debt, using its cash on hand.
**Why it matters:** Lets you compare companies with very different debt levels on equal footing, and is the numerator for EV-based multiples.
**Formula:** Market Cap + Total Debt − Cash & Equivalents (± minority interest and preferred stock, where applicable).
**This company:** NVIDIA and Netflix both have economically meaningful EV figures. JPMorgan does not — its EV/EBITDA and EV/Revenue should not be shown as ordinary metrics; see the framework caveat in COMPANY_RESEARCH.md.
**Caveat:** This is the single most important "why isn't this the same as market cap" moment in the product — build the visual EV bridge (Market Cap → + Debt → − Cash → EV) as an actual interactive diagram, not just a formula in text.

### P/E Ratio (Price/Earnings)
**What it means:** How much investors are paying for each dollar of the company's annual earnings.
**Why it matters:** The most widely used, easiest-to-understand valuation multiple.
**Formula:** Share Price ÷ Earnings Per Share (or Market Cap ÷ Net Income).
**This company:** JPMorgan trades around 15.5x trailing earnings (Aug 2026) — roughly in line with, slightly above, its peer banks.
**Caveat:** P/E is distorted by one-off items (see Net Income entry) and doesn't work for unprofitable companies. It's also the *right* primary multiple for a bank, where EV-based multiples fail.

### EV/EBITDA
**What it means:** Enterprise Value divided by EBITDA — how many times operating cash-like profit investors are paying for the whole business.
**Why it matters:** Capital-structure-neutral, so it's the standard tool for comparing companies with different debt levels — the classic multiple used in M&A and LBO analysis.
**Formula:** Enterprise Value ÷ EBITDA.
**This company:** NVIDIA trades at roughly 26.3x EV/EBITDA (Aug 2026) versus AMD's ~79.9x and Broadcom's ~43.1x — NVIDIA's dramatically larger earnings base is a big part of why its multiple looks comparatively low despite being the most valuable company in the world.
**Caveat:** Meaningless for JPMorgan (see Enterprise Value caveat) and genuinely ambiguous for Netflix depending on EBITDA methodology (see EBITDA entry).

### EV/Revenue
**What it means:** Enterprise Value divided by total revenue.
**Why it matters:** Useful for comparing early-stage or low/negative-margin companies where EBITDA or P/E don't work.
**Formula:** Enterprise Value ÷ Revenue.
**This company:** Disney trades at roughly 2.4x EV/Revenue (Aug 2026) — a useful contrast to its 10.8x EV/EBITDA, showing how the same company can look "cheap" or "expensive" depending on which multiple you use.
**Caveat:** Ignores profitability entirely — a high-revenue, low-margin business and a lower-revenue, high-margin business can show the same EV/Revenue for very different underlying quality.

### FCF Yield
**What it means:** Free cash flow expressed as a percentage of market capitalization (or enterprise value) — roughly, "what cash return am I buying."
**Why it matters:** A useful cross-check against P/E, especially for companies where reported earnings and actual cash generation diverge.
**Formula:** Free Cash Flow ÷ Market Capitalization (equity FCF yield) or ÷ Enterprise Value (unlevered version).
**This company:** With Netflix's FY2025 FCF of ~$9B against a ~$337B market cap (Sept 2026), equity FCF yield is roughly 2.7% — worth showing next to its P/E as a cross-check.
**Caveat:** Choose one consistent definition (equity vs. enterprise-value-based) and label it clearly in the UI — the two versions are not interchangeable.

### IRR (Internal Rate of Return)
**What it means:** The annualized percentage return an investment generates over its holding period.
**Why it matters:** The primary return metric private equity investors use to judge whether a deal was worth doing.
**Formula (as simplified for this product):** MOIC^(1 ÷ Holding Period in Years) − 1, assuming no interim cash distributions.
**This company:** Used only in the LBO Analysis tool — see LBO_SPEC.md for the full worked example.
**Caveat:** Real institutional IRR calculations account for the exact timing of every cash flow (dividends, fees, interim distributions); this product's simplified formula assumes a single entry and single exit, which is clearly disclosed in the LBO tool itself.

### MOIC (Multiple on Invested Capital)
**What it means:** How many times an investor's original money they got back, ignoring the time it took.
**Why it matters:** The simplest, most intuitive private-equity return measure — "I put in $1, I got back $2.40, that's a 2.4x."
**Formula:** Exit Equity Value ÷ Initial Sponsor Equity Investment.
**This company:** Used only in the LBO Analysis tool.
**Caveat:** MOIC ignores time — a 2.4x MOIC over 3 years is a much better result than the same 2.4x over 8 years. Always show MOIC and IRR together, never MOIC alone.

### DCF (Discounted Cash Flow)
**What it means:** A valuation method that estimates what a company is worth today based on the cash it's projected to generate in the future, discounted back to present value.
**Why it matters:** The theoretical foundation for "intrinsic value" investing, independent of what the market currently thinks the company is worth.
**Formula:** Sum of (Projected Free Cash Flow in year t ÷ (1 + discount rate)^t), plus a discounted terminal value.
**This company:** Referenced conceptually only — no interactive DCF calculator is built in V1 (see PRODUCT_SPEC.md, do-not-build list).
**Caveat:** DCF outputs are extremely sensitive to the discount rate and terminal growth assumptions — worth one sentence on this sensitivity even without a full calculator.

### LBO (Leveraged Buyout)
**What it means:** An acquisition where a buyer (typically a private equity firm) funds most of the purchase price with borrowed money, using the target company's own future cash flow to pay that debt down over time.
**Why it matters:** Explains a huge share of what private equity actually does, and is the conceptual foundation for the product's interactive LBO tool.
**Formula:** See LBO_SPEC.md for the full sources-and-uses and return-calculation mechanics.
**This company:** Fully modeled for NVIDIA and Netflix (illustratively — see LBO_SPEC.md for scale caveats). Not applicable to JPMorgan in practice — see the JPMorgan module in LBO_SPEC.md.
**Caveat:** Real LBOs are rarely done on mega-cap companies (historically the largest ever, like the 2013 Dell take-private at $24.4B, are a fraction of NVIDIA's or Netflix's current market cap) or on regulated banks. The tool is explicitly illustrative — see LBO_SPEC.md.

### Entry Multiple
**What it means:** The EV/EBITDA multiple paid to acquire the company at the start of an LBO.
**Why it matters:** Directly sets the purchase price and therefore how much debt and equity are needed to fund the deal.
**Formula:** Entry Enterprise Value ÷ Entry EBITDA.
**This company:** A user-adjustable slider in the LBO tool — see LBO_SPEC.md for realistic default ranges (typically 8–12x for mid-market/large-cap LBOs).
**Caveat:** None beyond what's in LBO_SPEC.md.

### Exit Multiple
**What it means:** The EV/EBITDA multiple the company is assumed to be sold at, at the end of the holding period.
**Why it matters:** Along with EBITDA growth and debt paydown, it's one of the three drivers of investor returns — and the one most exposed to market conditions outside the sponsor's control.
**Formula:** Exit Enterprise Value ÷ Exit EBITDA.
**This company:** A user-adjustable slider in the LBO tool.
**Caveat:** "Multiple expansion" (exit multiple higher than entry multiple) is a real driver of historical PE returns but is increasingly treated as an unreliable assumption to build a deal thesis around — worth a one-line caveat in the tool itself.

### Debt Paydown
**What it means:** The amount of acquisition debt repaid using the company's own cash flow during the holding period.
**Why it matters:** One of the three components of LBO value creation (alongside EBITDA growth and multiple change) — sometimes called "the silent driver" of PE returns because it happens automatically if cash flow is strong, regardless of market multiples.
**Formula:** See LBO_SPEC.md — cash flow available for debt paydown = EBITDA − CapEx − change in working capital − cash interest − cash taxes (simplified in this tool via an FCF-conversion assumption).
**This company:** Calculated live in the LBO tool.
**Caveat:** None beyond what's in LBO_SPEC.md.

### Accretion / Dilution
**What it means:** Whether a deal increases (accretive) or decreases (dilutive) the acquirer's earnings per share.
**Why it matters:** A standard first-pass test bankers and investors apply to M&A deals — used in real coverage of situations like the Paramount Skydance/Warner Bros. Discovery deal referenced in COMPANY_RESEARCH.md.
**Formula:** Compare pro forma combined EPS to the acquirer's standalone EPS before the deal.
**This company:** Not built as a calculator in V1 — referenced as a glossary concept only, since none of the three flagship companies is currently party to an accretion/dilution-relevant deal in a way this product should model.
**Caveat:** Accretion/dilution is a useful first screen but doesn't by itself tell you whether a deal creates real economic value — a deal can be accretive to EPS and still destroy value, or vice versa.
