import { notFound } from "next/navigation";
import { getCompany, getCompanySegments, getCompanyRisks } from "@/lib/data";
import SegmentBreakdownChart from "@/components/charts/SegmentBreakdownChart";
import { ShieldAlert, DollarSign, PieChart } from "lucide-react";

export default function BusinessPage({
  params,
}: {
  params: { ticker: string };
}) {
  const company = getCompany(params.ticker);
  if (!company) notFound();

  const ticker = company.ticker;
  const segmentsData = getCompanySegments(ticker);
  const risks = getCompanyRisks(ticker);

  const moatBriefing = {
    NVDA: {
      accentBorder: "border-accent-nvda/30",
      accentBg: "bg-accent-nvda-light",
      accentText: "text-accent-nvda",
      moatTitle: "The CUDA moat and fabless economics",
      moatDescription:
        "By packaging silicon, NVLink networking switches, and CUDA software libraries into integrated rack systems (DGX/GB200 NVL72), NVIDIA captures hardware margins exceeding 70% while leaving high capital expenditure risks to contract foundry TSMC.",
    },
    NFLX: {
      accentBorder: "border-accent-nflx/30",
      accentBg: "bg-accent-nflx-light",
      accentText: "text-accent-nflx",
      moatTitle: "Direct-to-consumer scale and content efficiency",
      moatDescription:
        "Netflix amortizes multi-billion-dollar global production budgets across 300M+ paid memberships worldwide. Unlike linear legacy television, local originals (e.g. Squid Game, Lupin) scale globally at near-zero incremental distribution cost.",
    },
    JPM: {
      accentBorder: "border-accent-jpm/30",
      accentBg: "bg-accent-jpm-light",
      accentText: "text-accent-jpm",
      moatTitle: "Balance sheet scale and diversified revenue streams",
      moatDescription:
        "JPMorgan's vast scale ($4.4T assets, $2.4T deposits) generates structural funding cost advantages. Countercyclical revenue streams buffer returns: when interest rate cuts reduce Net Interest Income, investment banking fees and debt/equity underwriting volume expand.",
    },
  }[ticker];

  return (
    <div className="space-y-12">
      {/* 1. Revenue Architecture & Moat Narrative */}
      <section className="bg-paper-raised border border-line rounded-card overflow-hidden shadow-xs p-6 sm:p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-accent" />
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
              Revenue architecture and business model
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-ink leading-relaxed space-y-3 max-w-4xl">
            {ticker === "NVDA" && (
              <>
                <p>
                  NVIDIA sells accelerated hardware compute systems, networking silicon, and enterprise software licenses. The core monetization engine is centered on full-system reference architectures (DGX, HGX, Grace Hopper, Blackwell GB200 NVL72) sold directly to hyperscale cloud service providers (CSPs), sovereign AI initiatives, enterprise OEMs, and system integrators.
                </p>
                <p className="text-ink-muted">
                  Software monetization is accelerating via NVIDIA AI Enterprise and CUDA proprietary libraries, creating recurring high-margin software streams that lock developers into NVIDIA hardware architecture.
                </p>
              </>
            )}

            {ticker === "NFLX" && (
              <>
                <p>
                  Netflix generates revenue almost exclusively through recurring direct-to-consumer digital subscription memberships across 190+ countries. Pricing tiers (Standard with ads, Standard, Premium) vary by geographical region, stream concurrency, and video resolution.
                </p>
                <p className="text-ink-muted">
                  Revenue expansion is driven by paid sharing extra-member slots and a programmatic digital advertising platform that monetizes ad-tier subscribers through video commercial impressions.
                </p>
              </>
            )}

            {ticker === "JPM" && (
              <>
                <p>
                  JPMorgan Chase operates a dual revenue engine: <strong>Net Interest Income (NII)</strong>, which is the spread between interest earned on loans/securities and interest paid on customer deposits, plus <strong>Noninterest Revenue</strong> from investment banking fees, trading markets commissions, asset management advisory fees ($4.8T AUM), and card payment interchange.
                </p>
                <p className="text-ink-muted">
                  This diversified revenue mix dampens cyclical volatility: when interest rates drop and NII spread contracts, investment banking debt/equity underwriting and mortgage origination fee activity typically surges.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Strategic Moat Highlight */}
        {moatBriefing && (
          <div className={`p-4 sm:p-5 rounded-card border ${moatBriefing.accentBorder} ${moatBriefing.accentBg} space-y-1`}>
            <span className={`font-mono text-[10px] uppercase tracking-wider font-bold block ${moatBriefing.accentText}`}>
              Strategic moat: {moatBriefing.moatTitle}
            </span>
            <p className="text-xs text-ink leading-relaxed max-w-4xl">
              {moatBriefing.moatDescription}
            </p>
          </div>
        )}
      </section>

      {/* 2. Visual Segment Breakdown */}
      {segmentsData && (
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-accent" />
              <h2 className="font-serif text-xl font-semibold text-ink">
                Reporting segment revenue mix (FY2023–FY2026)
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-muted">
              Audited 10-K Disclosures ($M)
            </span>
          </div>

          <SegmentBreakdownChart
            segmentsData={segmentsData}
            accentColor={company.accentColor}
            unit="USD_millions"
          />
        </section>
      )}

      {/* 3. Material Risk Factors (10-K Item 1A Sourced) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-line">
          <ShieldAlert className="w-5 h-5 text-negative" />
          <div>
            <h3 className="font-serif text-xl font-semibold text-ink">
              Material operational and regulatory risks
            </h3>
            <p className="text-xs text-ink-muted">
              Distilled directly from Form 10-K Item 1A Risk Factors disclosures
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {risks.map((risk, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 bg-paper-raised rounded-card border border-line shadow-xs flex flex-col justify-between hover:border-line-strong transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-negative bg-negative-light px-2 py-0.5 rounded font-semibold border border-negative-border/60">
                    Risk Factor 0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">
                    Form 10-K
                  </span>
                </div>

                <h4 className="font-serif text-base font-semibold text-ink leading-snug">
                  {risk.title}
                </h4>

                <p className="text-xs text-ink-muted leading-relaxed font-sans">
                  {risk.summary}
                </p>
              </div>

              {risk.sourceSection && (
                <div className="mt-4 pt-3 border-t border-line/60 flex items-start gap-1.5 text-[11px] font-mono text-ink-muted">
                  <span className="text-accent font-semibold shrink-0">Source:</span>
                  <span className="text-ink-faint leading-relaxed break-words">
                    {risk.sourceSection}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
