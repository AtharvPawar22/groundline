import { notFound } from "next/navigation";
import Image from "next/image";
import { getCompany, getCompanySegments, getCompanyRisks } from "@/lib/data";
import SegmentBreakdownChart from "@/components/charts/SegmentBreakdownChart";
import { ShieldAlert, DollarSign, PieChart, Cpu, Server } from "lucide-react";

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

  const visualBriefing = {
    NVDA: {
      imageSrc: "/images/nvda-gpu-inspection.jpg",
      imageAlt: "Blackwell GPU Board Assembly and Optical Inspection",
      imageCaption: "Automated GPU Board Assembly & Optical Inspection",
      accentBorder: "border-accent-nvda/30",
      accentBg: "bg-accent-nvda-light",
      accentText: "text-accent-nvda",
      moatTitle: "The CUDA moat and fabless economics",
      moatDescription:
        "By packaging silicon, NVLink networking switches, and CUDA software libraries into integrated rack systems (DGX/GB200 NVL72), NVIDIA captures hardware margins exceeding 70% while leaving high capital expenditure risks to contract foundry TSMC.",
    },
    NFLX: {
      imageSrc: "/images/nflx-production.jpg",
      imageAlt: "Netflix Production Studio Soundstage",
      imageCaption: "Global Film & Television Production Engine",
      accentBorder: "border-accent-nflx/30",
      accentBg: "bg-accent-nflx-light",
      accentText: "text-accent-nflx",
      moatTitle: "Direct-to-consumer scale and content efficiency",
      moatDescription:
        "Netflix amortizes multi-billion-dollar global production budgets across 300M+ paid memberships worldwide. Unlike linear legacy television, local originals (e.g. Squid Game, Lupin) scale globally at near-zero incremental distribution cost.",
    },
    JPM: {
      imageSrc: "/images/jpm-headquarters.jpg",
      imageAlt: "JPMorgan Chase World Headquarters Manhattan",
      imageCaption: "270 Park Avenue Global Headquarters NYC",
      accentBorder: "border-accent-jpm/30",
      accentBg: "bg-accent-jpm-light",
      accentText: "text-accent-jpm",
      moatTitle: "Balance sheet scale and diversified revenue streams",
      moatDescription:
        "JPMorgan's vast scale ($4.4T assets, $2.4T deposits) generates structural funding cost advantages. Countercyclical revenue streams buffer returns: when interest rate cuts reduce Net Interest Income, investment banking fees and debt/equity underwriting volume expand.",
    },
  }[ticker];

  const operationalInfrastructure = {
    NVDA: {
      title: "Manufacturing and supply chain architecture",
      imageSrc: "/images/nvda-server-assembly.jpg",
      imageAlt: "Foxconn Automated AI Server Assembly Facility",
      imageCaption: "Foxconn AI Server Assembly Line & Rack Integration",
      icon: Server,
      accentBorder: "border-accent-nvda/30",
      accentBg: "bg-accent-nvda-light",
      accentText: "text-accent-nvda",
      lead: "Fabless contract manufacturing and hyperscale rack integration",
      description:
        "NVIDIA operates a fabless manufacturing model. Taiwan Semiconductor Manufacturing Company (TSMC) fabricates the underlying silicon wafers and packages them using Chip-on-Wafer-on-Substrate (CoWoS) technology. Original design manufacturers including Foxconn, Wistron, and Quanta assemble finished GPUs, networking switches, and cooling manifolds into full-rack AI supercomputers (GB200 NVL72). This allows NVIDIA to scale production while keeping annual capital expenditures under 3% of revenue.",
      takeawayLabel: "Asset-light scalability",
      takeawayText:
        "Shifting wafer fabrication and mechanical assembly to specialized partners lets NVIDIA concentrate capital on silicon architecture, interconnect design, and CUDA software ecosystem expansion.",
    },
    NFLX: {
      title: "Global content distribution and edge infrastructure",
      imageSrc: "/images/nflx-production.jpg",
      imageAlt: "Netflix Open Connect Global Edge Infrastructure",
      imageCaption: "Open Connect Global Content Delivery Infrastructure",
      icon: Server,
      accentBorder: "border-accent-nflx/30",
      accentBg: "bg-accent-nflx-light",
      accentText: "text-accent-nflx",
      lead: "Proprietary Open Connect CDN and ISP edge caching",
      description:
        "To distribute video to over 300 million members without paying third-party transit fees, Netflix built Open Connect, a custom content delivery network. Netflix provides purpose-built caching appliances directly to internet service providers worldwide, serving nearly 100% of video traffic from within local telecom networks.",
      takeawayLabel: "Zero marginal distribution cost",
      takeawayText:
        "Once produced, content streams globally across localized Open Connect edge appliances, protecting subscriber viewing quality during peak concurrent releases.",
    },
    JPM: {
      title: "Technology infrastructure and wholesale payments rails",
      imageSrc: "/images/jpm-headquarters.jpg",
      imageAlt: "JPMorgan Chase Global Payments & Technology Operations",
      imageCaption: "Global Technology Operations & Payments Velocity",
      icon: Server,
      accentBorder: "border-accent-jpm/30",
      accentBg: "bg-accent-jpm-light",
      accentText: "text-accent-jpm",
      lead: "Enterprise core banking and institutional payment processing",
      description:
        "JPMorgan Chase spends over $17B annually on technology to operate its wholesale payments rail, which processes more than $10 trillion in daily transactions. Scale advantages allow the bank to spread fixed compliance, cybersecurity, and core banking technology costs over a $4.4T asset base.",
      takeawayLabel: "Structural cost advantage",
      takeawayText:
        "Massive scale generates operating leverage, allowing JPMorgan Chase to reinvest in technological innovation at a volume exceeding entire mid-sized regional bank balance sheets.",
    },
  }[ticker];

  return (
    <div className="space-y-12">
      {/* 1. Revenue Architecture & Moat Narrative with Editorial Visual */}
      <section className="bg-paper-raised border border-line rounded-card overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Narrative (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-accent" />
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                  Revenue architecture and business model
                </h2>
              </div>

              <div className="text-xs sm:text-sm text-ink leading-relaxed space-y-3">
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
            {visualBriefing && (
              <div className={`p-4 rounded-card border ${visualBriefing.accentBorder} ${visualBriefing.accentBg} space-y-1 mt-4`}>
                <span className={`font-mono text-[10px] uppercase tracking-wider font-bold block ${visualBriefing.accentText}`}>
                  Strategic moat: {visualBriefing.moatTitle}
                </span>
                <p className="text-xs text-ink leading-relaxed">
                  {visualBriefing.moatDescription}
                </p>
              </div>
            )}
          </div>

          {/* Right Visual Image (5 cols) */}
          {visualBriefing && (
            <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-line overflow-hidden group">
              <Image
                src={visualBriefing.imageSrc}
                alt={visualBriefing.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-paper-raised text-[11px] font-mono">
                <span>{visualBriefing.imageCaption}</span>
              </div>
            </div>
          )}
        </div>
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

      {/* 3. Operational Infrastructure & Manufacturing Architecture */}
      {operationalInfrastructure && (
        <section className="bg-paper-raised border border-line rounded-card overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Visual Image (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-line overflow-hidden group order-2 lg:order-1">
              <Image
                src={operationalInfrastructure.imageSrc}
                alt={operationalInfrastructure.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-paper-raised text-[11px] font-mono">
                <span>{operationalInfrastructure.imageCaption}</span>
              </div>
            </div>

            {/* Right Narrative (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-4 flex flex-col justify-between order-1 lg:order-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-accent" />
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                    {operationalInfrastructure.title}
                  </h2>
                </div>

                <div className="text-xs sm:text-sm text-ink leading-relaxed space-y-3">
                  <p className="font-medium text-ink">
                    {operationalInfrastructure.lead}
                  </p>
                  <p className="text-ink-muted">
                    {operationalInfrastructure.description}
                  </p>
                </div>
              </div>

              {/* Operational Moat Highlight */}
              <div className={`p-4 rounded-card border ${operationalInfrastructure.accentBorder} ${operationalInfrastructure.accentBg} space-y-1 mt-4`}>
                <span className={`font-mono text-[10px] uppercase tracking-wider font-bold block ${operationalInfrastructure.accentText}`}>
                  {operationalInfrastructure.takeawayLabel}
                </span>
                <p className="text-xs text-ink leading-relaxed">
                  {operationalInfrastructure.takeawayText}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Material Risk Factors (10-K Item 1A Sourced) */}
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
