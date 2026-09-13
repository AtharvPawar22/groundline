import { notFound } from "next/navigation";
import Image from "next/image";
import { getCompany, getSourcedValue } from "@/lib/data";
import MetricCell from "@/components/metrics/MetricCell";
import { Lightbulb, Layers, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OverviewPage({
  params,
}: {
  params: { ticker: string };
}) {
  const company = getCompany(params.ticker);
  if (!company) notFound();

  const ticker = company.ticker;
  const isBank = company.isBank;

  // Sourced metrics for overview
  const revVal = getSourcedValue(ticker, "revenue", "FY2025") || getSourcedValue(ticker, "revenue", "FY2026");
  const netIncVal = getSourcedValue(ticker, "net_income", "FY2025") || getSourcedValue(ticker, "net_income", "FY2026");
  const opIncVal = getSourcedValue(ticker, "operating_income", "FY2025") || getSourcedValue(ticker, "operating_income", "FY2026");
  const fcfVal = getSourcedValue(ticker, "free_cash_flow", "FY2025");
  const peVal = getSourcedValue(ticker, "pe_ratio");
  const grossProfitVal = getSourcedValue(ticker, "gross_profit", "FY2025") || getSourcedValue(ticker, "gross_profit", "FY2026");
  const debtVal = getSourcedValue(ticker, "total_debt", "FY2025") || getSourcedValue(ticker, "total_debt", "FY2026");
  const cashVal = getSourcedValue(ticker, "cash", "FY2025") || getSourcedValue(ticker, "cash", "FY2026");
  const sharesVal = getSourcedValue(ticker, "shares_outstanding");
  const tbvVal = getSourcedValue(ticker, "tbv_per_share", "FY2025");
  const cet1Val = getSourcedValue(ticker, "cet1_ratio", "FY2025");
  const rotceVal = getSourcedValue(ticker, "rotce", "FY2025");

  // Signature teaching moment text per company
  const signatureMoments = {
    NVDA: {
      title: "Non-operating investment gains and fabless economics",
      accentBorder: "border-accent-nvda",
      accentText: "text-accent-nvda",
      content:
        "In H1 FY2027, NVIDIA reported ~$16B of mark-to-market pre-tax investment gains (including Intel common stock) in 'Other Income Net'. This elevated GAAP net income above core chip-selling operating income. NVIDIA's $3.4B CapEx against over $130B in revenue illustrates how fabless chip designers capture 75% gross margins by shifting fabrication capital intensity to TSMC.",
    },
    NFLX: {
      title: "Content amortization and EBITDA limitations",
      accentBorder: "border-accent-nflx",
      accentText: "text-accent-nflx",
      content:
        "EBITDA is frequently cited as a proxy for cash generation. For Netflix, adding back content amortization lifts EBITDA from ~$13.3B to ~$35.0B. However, streaming content loses viewing value within months. Netflix spends over $17B in cash every year to replace old titles. Content amortization is an ongoing operational cash cost, not a non-cash sunk cost like machinery depreciation.",
    },
    JPM: {
      title: "Why standard EV and EBITDA break down for banks",
      accentBorder: "border-accent-jpm",
      accentText: "text-accent-jpm",
      content:
        "For non-financial corporations, enterprise value equals market cap plus debt minus cash. Applying this formula to JPMorgan Chase produces an enterprise value below its market cap ($780B EV vs. $955B market cap). Customer deposits are balance sheet liabilities that fund lending operations rather than discretionary debt. Bank valuation relies on P/E, Price/Tangible Book, ROTCE, and CET1 capital ratios.",
    },
  }[ticker];

  // Operational context photography per company
  const operationalVisuals = {
    NVDA: [
      {
        title: "Blackwell GPU board assembly and inspection",
        description: "Robotic surface-mount placement and automated optical inspection for AI accelerators.",
        imageSrc: "/images/nvda-gpu-inspection.jpg",
        imageAlt: "Blackwell GPU Board Assembly and Optical Inspection",
        imageCaption: "Automated GPU Board Assembly & Optical Inspection",
      },
      {
        title: "Foxconn AI server assembly line",
        description: "Full-rack liquid-cooled GB200 NVL72 supercluster integration and automated testing.",
        imageSrc: "/images/nvda-server-assembly.jpg",
        imageAlt: "Foxconn Automated AI Server Assembly Facility",
        imageCaption: "Foxconn AI Server Assembly Line & Rack Integration",
      },
    ],
    NFLX: [
      {
        title: "Original content studio production",
        description: "Physical filming infrastructure and cinema camera rigs supporting $17B+ in annual content investment.",
        imageSrc: "/images/nflx-production.jpg",
        imageAlt: "Netflix Original Content Production Soundstage",
        imageCaption: "Global Original Content Production",
      },
      {
        title: "Streaming platform and personalization engineering",
        description: "Product engineering and recommendation algorithms serving 300M+ paid memberships worldwide.",
        imageSrc: "/images/nflx-office.jpg",
        imageAlt: "Netflix Product Engineering and Global Operations",
        imageCaption: "Streaming Platform Engineering",
      },
    ],
    JPM: [
      {
        title: "270 Park Avenue global headquarters",
        description: "Manhattan world headquarters anchoring corporate and institutional investment banking.",
        imageSrc: "/images/jpm-headquarters.jpg",
        imageAlt: "JPMorgan Chase World Headquarters Manhattan",
        imageCaption: "270 Park Avenue NYC",
      },
      {
        title: "Wholesale payments & technology operations",
        description: "Technology infrastructure supporting more than $10 trillion in daily transaction volume.",
        imageSrc: "/images/jpm-headquarters.jpg",
        imageAlt: "Technology Infrastructure and Global Scale",
        imageCaption: "Global Banking Scale ($4.4T Assets)",
      },
    ],
  }[ticker];

  return (
    <div className="space-y-12">
      {/* 1. Core Financial Ledger */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-line pb-2">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
            Audited financial highlights
          </h2>
          <span className="font-mono text-xs text-ink-muted">
            Click <span className="text-accent font-semibold">ⓘ</span> on any metric for plain-English financial mechanics
          </span>
        </div>

        {/* Tier 1: Core Income & Profitability (Large Editorial Ledger) */}
        <div className="p-6 sm:p-8 bg-paper-raised border border-line rounded-card shadow-xs">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold block mb-4">
            Income statement and earning power
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCell
              label="Annual Net Revenue"
              metricId="revenue"
              companyTicker={ticker}
              sourcedValue={revVal}
              size="large"
            />
            <MetricCell
              label="GAAP Net Income"
              metricId="net_income"
              companyTicker={ticker}
              sourcedValue={netIncVal}
              size="large"
            />
            {!isBank ? (
              <>
                <MetricCell
                  label="Operating Income (EBIT)"
                  metricId="operating_income"
                  companyTicker={ticker}
                  sourcedValue={opIncVal}
                  size="large"
                />
                <MetricCell
                  label="Gross Profit"
                  metricId="gross_profit"
                  companyTicker={ticker}
                  sourcedValue={grossProfitVal}
                  size="large"
                />
              </>
            ) : (
              <>
                <MetricCell
                  label="Return on Tangible Equity"
                  metricId="rotce"
                  companyTicker={ticker}
                  sourcedValue={rotceVal}
                  size="large"
                />
                <MetricCell
                  label="CET1 Capital Ratio"
                  metricId="cet1_ratio"
                  companyTicker={ticker}
                  sourcedValue={cet1Val}
                  size="large"
                />
              </>
            )}
          </div>
        </div>

        {/* Tier 2: Solvency, Cash Generation & Valuation Multiples */}
        <div className="p-6 sm:p-8 bg-paper-raised border border-line rounded-card shadow-xs">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted font-bold block mb-4">
            Balance sheet and valuation
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {!isBank ? (
              <>
                <MetricCell
                  label="Free Cash Flow (FCF)"
                  metricId="free_cash_flow"
                  companyTicker={ticker}
                  sourcedValue={fcfVal}
                  size="medium"
                />
                <MetricCell
                  label="Total Gross Debt"
                  metricId="total_debt"
                  companyTicker={ticker}
                  sourcedValue={debtVal}
                  size="medium"
                />
                <MetricCell
                  label="Cash & Equivalents"
                  metricId="cash"
                  companyTicker={ticker}
                  sourcedValue={cashVal}
                  size="medium"
                />
                <MetricCell
                  label="Trailing P/E Ratio"
                  metricId="pe_ratio"
                  companyTicker={ticker}
                  sourcedValue={peVal}
                  size="medium"
                />
              </>
            ) : (
              <>
                <MetricCell
                  label="Tangible Book / Share"
                  metricId="tbv_per_share"
                  companyTicker={ticker}
                  sourcedValue={tbvVal}
                  size="medium"
                />
                <MetricCell
                  label="Price / Tangible Book"
                  metricId="price_to_book"
                  companyTicker={ticker}
                  rawOverrideValue={2.33}
                  unit="ratio"
                  periodLabel="Q2 2026"
                  size="medium"
                />
                <MetricCell
                  label="Trailing P/E Ratio"
                  metricId="pe_ratio"
                  companyTicker={ticker}
                  sourcedValue={peVal}
                  size="medium"
                />
                <MetricCell
                  label="Diluted Common Shares"
                  metricId="shares_outstanding"
                  companyTicker={ticker}
                  sourcedValue={sharesVal}
                  size="medium"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* 2. Operational & Physical Footprint (Two Contextual Photos) */}
      {operationalVisuals && (
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-line pb-2">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
              Operational and manufacturing footprint
            </h2>
            <span className="font-mono text-xs text-ink-muted">
              Physical scale and production infrastructure
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {operationalVisuals.map((visual, idx) => (
              <div
                key={idx}
                className="bg-paper-raised border border-line rounded-card overflow-hidden shadow-xs hover:border-line-strong transition-colors flex flex-col justify-between group"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden border-b border-line">
                  <Image
                    src={visual.imageSrc}
                    alt={visual.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-paper-raised text-[11px] font-mono">
                    <span>{visual.imageCaption}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-2">
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-ink">
                    {visual.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans">
                    {visual.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Signature Pedagogical Memo */}
      {signatureMoments && (
        <section className={`p-6 sm:p-8 bg-paper-raised border-l-4 ${signatureMoments.accentBorder} border border-line rounded-card shadow-xs space-y-3`}>
          <div className="flex items-center gap-2">
            <Lightbulb className={`w-5 h-5 ${signatureMoments.accentText}`} />
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
              {signatureMoments.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-ink leading-relaxed font-sans pl-7">
            {signatureMoments.content}
          </p>
        </section>
      )}

      {/* 4. Deep-Dive Navigation Shortcuts */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <Link
          href={`/company/${ticker}/business`}
          className="p-5 bg-paper-raised border border-line rounded-card hover:border-ink hover:shadow-xs transition-all group flex items-start gap-3.5"
        >
          <Layers className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-serif text-sm font-semibold text-ink block group-hover:text-accent transition-colors">
              Business model and segments
            </span>
            <span className="text-xs text-ink-muted leading-relaxed block mt-0.5">
              Revenue mix breakdown and Form 10-K Item 1A material risks.
            </span>
          </div>
        </Link>

        <Link
          href={`/company/${ticker}/financials`}
          className="p-5 bg-paper-raised border border-line rounded-card hover:border-ink hover:shadow-xs transition-all group flex items-start gap-3.5"
        >
          <BookOpen className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-serif text-sm font-semibold text-ink block group-hover:text-accent transition-colors">
              Financials and waterfall bridge
            </span>
            <span className="text-xs text-ink-muted leading-relaxed block mt-0.5">
              5-year historical trajectory and earnings step-down bridge.
            </span>
          </div>
        </Link>

        <Link
          href={isBank ? `/company/${ticker}/bank-economics` : `/company/${ticker}/lbo`}
          className="p-5 bg-paper-raised border border-line rounded-card hover:border-ink hover:shadow-xs transition-all group flex items-start gap-3.5"
        >
          <ArrowRight className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
          <div>
            <span className="font-serif text-sm font-semibold text-ink block group-hover:text-accent transition-colors">
              {isBank ? "Bank economics module" : "Interactive LBO simulator"}
            </span>
            <span className="text-xs text-ink-muted leading-relaxed block mt-0.5">
              {isBank ? "ROTCE compounding & excess capital distributions." : "Real-time returns engine & value creation waterfall."}
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}
