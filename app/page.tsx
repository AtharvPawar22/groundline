import Link from "next/link";
import Image from "next/image";
import { getAllCompanies, getSourcedValue } from "@/lib/data";
import { ArrowUpRight, Scale, BookOpen, FileText, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { formatCurrency, formatPercent, formatRatio } from "@/lib/finance/format";
import CompanyLogo from "@/components/common/CompanyLogo";

export default function HomePage() {
  const allCompanies = getAllCompanies();

  const companyProfiles = [
    {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      industry: "Accelerated Computing & AI Platforms",
      exchange: "NASDAQ",
      imageSrc: "/images/nvda-datacenter.jpg",
      imageAlt: "NVIDIA Data Center AI Cluster",
      accentBorder: "hover:border-accent-nvda/80",
      accentPill: "bg-accent-nvda-light text-accent-nvda border-accent-nvda-border",
      accentText: "text-accent-nvda",
      accentBar: "bg-accent-nvda",
      headlineMetric: { label: "Market Cap", value: "$5.26T" },
      secondaryMetric: { label: "Gross Margin", value: "71.1%" },
      tertiaryMetric: { label: "FY26 Revenue", value: "$215.9B" },
      coreThesis:
        "Fabless chip design shifts heavy fabrication capital expenditures to TSMC, supporting 71% gross margins and high cash flow while developers build on the proprietary CUDA computing ecosystem.",
      url: "/company/NVDA/overview",
    },
    {
      ticker: "NFLX",
      name: "Netflix, Inc.",
      industry: "Direct-to-Consumer Streaming Media",
      exchange: "NASDAQ",
      imageSrc: "/images/nflx-production.jpg",
      imageAlt: "Netflix Production Studio Soundstage",
      accentBorder: "hover:border-accent-nflx/80",
      accentPill: "bg-accent-nflx-light text-accent-nflx border-accent-nflx-border",
      accentText: "text-accent-nflx",
      accentBar: "bg-accent-nflx",
      headlineMetric: { label: "Market Cap", value: "$420.9B" },
      secondaryMetric: { label: "Free Cash Flow", value: "$9.5B" },
      tertiaryMetric: { label: "FY25 Revenue", value: "$45.2B" },
      coreThesis:
        "Content amortization is not a non-cash historical sunk cost. It represents an ongoing cash reinvestment cycle of over $17B annually to maintain 300M subscribers and advertising tiers.",
      url: "/company/NFLX/overview",
    },
    {
      ticker: "JPM",
      name: "JPMorgan Chase & Co.",
      industry: "Diversified Global Commercial Banking",
      exchange: "NYSE",
      imageSrc: "/images/jpm-headquarters.jpg",
      imageAlt: "JPMorgan Chase World Headquarters Manhattan",
      accentBorder: "hover:border-accent-jpm/80",
      accentPill: "bg-accent-jpm-light text-accent-jpm border-accent-jpm-border",
      accentText: "text-accent-jpm",
      accentBar: "bg-accent-jpm",
      headlineMetric: { label: "Market Cap", value: "$955.5B" },
      secondaryMetric: { label: "FY25 ROTCE", value: "20.0%" },
      tertiaryMetric: { label: "Total Assets", value: "$4.4T" },
      coreThesis:
        "Customer deposits are operational inventory rather than corporate debt. Valuation is governed by Return on Tangible Common Equity (20% ROTCE), Price/Tangible Book (2.33x), and Basel III CET1 capital ratios.",
      url: "/company/JPM/overview",
    },
  ];

  return (
    <div className="space-y-16 py-4">
      {/* 1. Editorial Masthead Lead */}
      <section className="space-y-4 max-w-4xl border-b border-line pb-10">
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-ink-muted">
          <span className="font-semibold uppercase tracking-widest text-accent px-2.5 py-0.5 bg-accent-light rounded border border-accent/20">
            Primary Financial Research
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink leading-tight tracking-tight">
          Financial research, with the context for you to understand it, in plain English.
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans max-w-3xl">
          Every figure across these three companies comes directly from SEC Form 10-K, 10-Q, or 8-K filings. Select any metric to see its definition, formula, and business context.
        </p>
      </section>

      {/* 2. The Three Company Dossiers (Editorial Triptych) */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Company profiles
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Select a company to explore financial statements, business mechanics, valuation, and interactive financial models.
            </p>
          </div>
          <span className="hidden sm:inline-block font-mono text-xs text-ink-faint">
            Click to open dossier →
          </span>
        </div>

        <div className="space-y-8">
          {companyProfiles.map((company, idx) => (
            <Link
              key={company.ticker}
              href={company.url}
              className={`group block bg-paper-raised border border-line rounded-card overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 ${company.accentBorder}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Visual Imagery Snippet (5 cols Desktop) */}
                <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-line">
                  <Image
                    src={company.imageSrc}
                    alt={company.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                  
                  {/* Overlay Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded border ${company.accentPill}`}>
                      {company.exchange}: {company.ticker}
                    </span>
                  </div>

                  {/* Overlay Key Metric */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-paper-raised">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-paper-subtle/80 block">
                      {company.headlineMetric.label}
                    </span>
                    <span className="font-serif text-3xl font-semibold text-paper-raised tabular-nums">
                      {company.headlineMetric.value}
                    </span>
                  </div>
                </div>

                {/* Narrative & Financial Snapshot (7 cols Desktop) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <CompanyLogo ticker={company.ticker} size="lg" />
                        <div>
                          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink tracking-tight group-hover:text-accent transition-colors">
                            {company.name}
                          </h3>
                          <span className="text-xs font-mono text-ink-muted">
                            {company.industry}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-ink-faint group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>

                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mt-3">
                      {company.coreThesis}
                    </p>
                  </div>

                  {/* Multi-Metric Footer Bar */}
                  <div className="pt-4 border-t border-line/60 grid grid-cols-3 gap-4">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint block">
                        {company.headlineMetric.label}
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-bold text-ink tabular-nums mt-0.5 block">
                        {company.headlineMetric.value}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint block">
                        {company.secondaryMetric.label}
                      </span>
                      <span className={`font-serif text-lg sm:text-xl font-bold tabular-nums mt-0.5 block ${company.accentText}`}>
                        {company.secondaryMetric.value}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint block">
                        {company.tertiaryMetric.label}
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-bold text-ink tabular-nums mt-0.5 block">
                        {company.tertiaryMetric.value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Cross-Industry Analytical Divergence Framework */}
      <section className="p-6 sm:p-8 bg-paper-raised border border-line rounded-card shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-accent" />
          <h2 className="font-serif text-xl font-semibold text-ink">
            Why one valuation formula does not fit all three companies
          </h2>
        </div>
        
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-3xl">
          Standard financial screening tools often apply identical EV/EBITDA multiples across every industry. Different business models require different metrics:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 bg-paper rounded border border-line/80 space-y-1.5">
            <div className="flex items-center gap-2 font-serif text-sm font-semibold text-ink">
              <span className="w-2 h-2 rounded-full bg-accent-nvda" />
              <span>Semiconductor (NVDA)</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Fabless design concentrates value in IP, the CUDA software ecosystem, and packaging. CapEx is low (~2.6% of revenue), which produces free cash flow conversion above 50%.
            </p>
          </div>

          <div className="p-4 bg-paper rounded border border-line/80 space-y-1.5">
            <div className="flex items-center gap-2 font-serif text-sm font-semibold text-ink">
              <span className="w-2 h-2 rounded-full bg-accent-nflx" />
              <span>Streaming media (NFLX)</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              EBITDA adds back over $17B in content amortization. Real cash generation depends on free cash flow after content production spending.
            </p>
          </div>

          <div className="p-4 bg-paper rounded border border-line/80 space-y-1.5">
            <div className="flex items-center gap-2 font-serif text-sm font-semibold text-ink">
              <span className="w-2 h-2 rounded-full bg-accent-jpm" />
              <span>Banking and capital (JPM)</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Enterprise value and EV/EBITDA do not apply to commercial banks. Valuation is driven by ROTCE (20.0%), price to tangible book (2.33x), and CET1 regulatory capital.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Global Exploration Navigation Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/compare"
          className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card hover:border-ink hover:shadow-xs transition-all text-left flex items-start gap-4 group"
        >
          <Scale className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-serif text-base font-semibold text-ink block group-hover:text-accent transition-colors">
              Cross-company comparison
            </span>
            <span className="text-xs text-ink-muted leading-relaxed block mt-1">
              Side-by-side comparison across 8 core financial metrics with interactive toggle charts.
            </span>
          </div>
        </Link>

        <Link
          href="/glossary"
          className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card hover:border-ink hover:shadow-xs transition-all text-left flex items-start gap-4 group"
        >
          <BookOpen className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-serif text-base font-semibold text-ink block group-hover:text-accent transition-colors">
              Financial concepts dictionary
            </span>
            <span className="text-xs text-ink-muted leading-relaxed block mt-1">
              25+ institutional finance concepts with formulas, analytical relevance, and company examples.
            </span>
          </div>
        </Link>

        <Link
          href="/sources"
          className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card hover:border-ink hover:shadow-xs transition-all text-left flex items-start gap-4 group"
        >
          <FileText className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-serif text-base font-semibold text-ink block group-hover:text-accent transition-colors">
              Primary SEC filings directory
            </span>
            <span className="text-xs text-ink-muted leading-relaxed block mt-1">
              Complete index of Form 10-K, 10-Q, and 8-K accession numbers and direct EDGAR links.
            </span>
          </div>
        </Link>
      </section>
    </div>
  );
}
