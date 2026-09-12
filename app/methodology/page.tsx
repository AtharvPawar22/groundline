import { ShieldCheck, BookOpen, Scale, Landmark, Cpu } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header Banner */}
      <div className="p-6 bg-paper-raised border border-line rounded-control shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <h1 className="font-serif text-2xl font-semibold text-ink">
            Methodology, Accounting Standards &amp; Research Governance
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
                1. The Netflix EBITDA &amp; Content Amortization Standard
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-accent-nflx/10 text-accent-nflx rounded font-semibold border border-accent-nflx/20">
              NFLX RECONCILIATION
            </span>
          </div>
          <p className="text-ink-muted leading-relaxed">
            Secondary financial data aggregators frequently conflict regarding Netflix&apos;s EBITDA. For example, GuruFocus reports a TTM EBITDA of ~$35.0B (yielding a misleadingly low 8.97x EV/EBITDA multiple) by adding back all streaming content amortization. StockAnalysis and Bloomberg report EBITDA of ~$13.3B–$14.8B (yielding 23.2x EV/EBITDA).
          </p>
          <div className="p-4 bg-paper rounded border border-line/70 space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block">
              GROUNDLINE Standard Decision:
            </span>
            <p className="text-ink-muted leading-relaxed">
              We reject the $35B figure and adopt the strict operational standard: streaming content amortization represents an ongoing, mandatory cash reinvestment cycle (~$17B+ annually) rather than non-cash legacy machinery depreciation. Adding it back distorts true debt capacity.
            </p>
          </div>
        </section>

        {/* Section 2: JPMorgan Bank Accounting */}
        <section className="p-5 sm:p-6 bg-paper-raised border border-line rounded-control shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-jpm" />
              <h2 className="font-serif text-base font-semibold text-ink">
                2. Commercial Banking &amp; Regulatory Capital Framework
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-accent-jpm/10 text-accent-jpm rounded font-semibold border border-accent-jpm/20">
              JPM CAPITAL MODEL
            </span>
          </div>
          <p className="text-ink-muted leading-relaxed">
            For commercial banks, customer deposits are operational liabilities that fund loan creation, not voluntary corporate debt. Standard enterprise value formulas (EV = Market Cap + Debt − Cash) yield mathematically absurd results ($780B EV vs. $955B Market Cap).
          </p>
          <p className="text-ink-muted leading-relaxed">
            We strictly enforce bank-appropriate metrics across all JPMorgan views: <strong>Managed Net Revenue</strong> (taxable-equivalent basis), <strong>Return on Tangible Common Equity (ROTCE)</strong>, <strong>Tangible Book Value Per Share (TBVPS)</strong>, and <strong>Common Equity Tier 1 (CET1)</strong> capital ratios.
          </p>
        </section>

        {/* Section 3: NVIDIA Fiscal Year Alignment */}
        <section className="p-5 sm:p-6 bg-paper-raised border border-line rounded-control shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-nvda" />
              <h2 className="font-serif text-base font-semibold text-ink">
                3. NVIDIA Fiscal Period Timing &amp; Naming
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
                4. Leveraged Buyout Model Conventions
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-accent-light text-accent rounded font-semibold border border-accent/20">
              LBO ENGINE
            </span>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-ink-muted leading-relaxed">
            <li>
              <strong>Interest Calculation:</strong> Interest is calculated against the Beginning-of-Year (BOY) debt balance to eliminate circular reference loops.
            </li>
            <li>
              <strong>Maintenance CapEx:</strong> Annual Depreciation &amp; Amortization is assumed equal to Capital Expenditures (D&amp;A = CapEx) to model a steady-state maintenance capital profile.
            </li>
            <li>
              <strong>Cash Sweep:</strong> 100% of Cash Flow Available for Debt Service (CFADS) is swept to prepay acquisition debt until debt reaches $0, after which excess cash accumulates on the balance sheet.
            </li>
            <li>
              <strong>Value Creation Attribution:</strong> The bridge mathematically partitions returns into EBITDA Growth, Multiple Expansion, Debt Paydown, and Fees with 100% exact equality to exit equity.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
