import { ShieldCheck, BookOpen, Scale, Landmark, Cpu } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header Banner */}
      <div className="p-6 bg-paper-raised border border-line rounded-control shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <h1 className="font-serif text-2xl font-semibold text-ink">
            Methodology, accounting standards, and research governance
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
          How data is captured, reconciled, and normalized across different reporting structures without sacrificing primary source integrity.
        </p>
      </div>

      <div className="space-y-6 text-xs text-ink leading-relaxed">
        {/* Section 1: Netflix EBITDA Conflict */}
        <section className="p-5 sm:p-6 bg-paper-raised border border-line rounded-control shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-nflx" />
              <h2 className="font-serif text-base font-semibold text-ink">
                1. Netflix EBITDA and content amortization standard
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-accent-nflx/10 text-accent-nflx rounded font-semibold border border-accent-nflx/20">
              NFLX RECONCILIATION
            </span>
          </div>
          <p className="text-ink-muted leading-relaxed">
            Data providers disagree on Netflix EBITDA. GuruFocus reports TTM EBITDA of ~$35.0B (an 8.97x EV/EBITDA multiple) by adding back all streaming content amortization. StockAnalysis and Bloomberg report EBITDA of ~$13.3B–$14.8B (a 23.2x EV/EBITDA multiple).
          </p>
          <div className="p-4 bg-paper rounded border border-line/70 space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block">
              Accounting decision
            </span>
            <p className="text-ink-muted leading-relaxed">
              We follow the operational standard: streaming content amortization represents an ongoing cash reinvestment cycle (~$17B+ annually) rather than non-cash machinery depreciation. Adding it back overstates cash generation and debt capacity.
            </p>
          </div>
        </section>

        {/* Section 2: JPMorgan Bank Accounting */}
        <section className="p-5 sm:p-6 bg-paper-raised border border-line rounded-control shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-jpm" />
              <h2 className="font-serif text-base font-semibold text-ink">
                2. Commercial banking and regulatory capital framework
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-accent-jpm/10 text-accent-jpm rounded font-semibold border border-accent-jpm/20">
              JPM CAPITAL MODEL
            </span>
          </div>
          <p className="text-ink-muted leading-relaxed">
            For commercial banks, customer deposits are operational liabilities that fund loan creation, not corporate debt. Standard enterprise value formulas (EV = market cap + debt - cash) produce distorted figures ($780B EV compared to $955B market capitalization).
          </p>
          <p className="text-ink-muted leading-relaxed">
            All JPMorgan views use bank-appropriate metrics, including <strong>Managed Net Revenue</strong> (taxable-equivalent basis), <strong>Return on Tangible Common Equity (ROTCE)</strong>, <strong>Tangible Book Value Per Share (TBVPS)</strong>, and <strong>Common Equity Tier 1 (CET1)</strong> capital ratios.
          </p>
        </section>

        {/* Section 3: NVIDIA Fiscal Year Alignment */}
        <section className="p-5 sm:p-6 bg-paper-raised border border-line rounded-control shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-nvda" />
              <h2 className="font-serif text-base font-semibold text-ink">
                3. NVIDIA fiscal period timing and naming
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-accent-nvda/10 text-accent-nvda rounded font-semibold border border-accent-nvda/20">
              NVDA CALENDAR
            </span>
          </div>
          <p className="text-ink-muted leading-relaxed">
            NVIDIA&apos;s fiscal year ends on the last Sunday of January and is designated by the forward calendar year. For example, NVIDIA&apos;s <strong>FY2026</strong> concluded on <strong>January 25, 2026</strong>. To eliminate ambiguity, every period label across GROUNDLINE explicitly includes the exact ISO calendar end date.
          </p>
        </section>

        {/* Section 4: LBO Calculation Conventions */}
        <section className="p-5 sm:p-6 bg-paper-raised border border-line rounded-control shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <h2 className="font-serif text-base font-semibold text-ink">
                4. Leveraged buyout model conventions
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-accent-light text-accent rounded font-semibold border border-accent/20">
              LBO ENGINE
            </span>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-ink-muted leading-relaxed">
            <li>
              <strong>Interest calculation:</strong> Interest is calculated against the beginning-of-year debt balance to avoid circular references.
            </li>
            <li>
              <strong>Maintenance CapEx:</strong> Annual depreciation and amortization is set equal to capital expenditures (D&amp;A = CapEx) to model a steady-state maintenance capital profile.
            </li>
            <li>
              <strong>Cash sweep:</strong> 100% of cash flow available for debt service is swept to prepay debt until debt reaches $0, after which cash accumulates on the balance sheet.
            </li>
            <li>
              <strong>Value creation attribution:</strong> The bridge partitions equity returns into EBITDA growth, multiple expansion, debt paydown, and transaction fees.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
