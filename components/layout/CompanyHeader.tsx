import Image from "next/image";
import { Company } from "@/lib/types/schema";
import CompanyLogo from "../common/CompanyLogo";

interface CompanyHeaderProps {
  company: Company;
}

export default function CompanyHeader({ company }: CompanyHeaderProps) {
  const meta = {
    NVDA: {
      imageSrc: "/images/nvda-datacenter.jpg",
      imageAlt: "NVIDIA AI Supercomputer & Accelerated Computing Cluster",
      imageCaption: "Data Center Infrastructure & Blackwell GPU Architecture",
      accentBorder: "border-accent-nvda/30",
      accentText: "text-accent-nvda",
      accentBg: "bg-accent-nvda-light",
      pill: "border-accent-nvda-border bg-accent-nvda-light text-accent-nvda",
      overlayGradient: "from-accent-nvda/80 via-ink/60 to-transparent",
    },
    NFLX: {
      imageSrc: "/images/nflx-production.jpg",
      imageAlt: "Netflix Production Studio & Cinematic Filming Rig",
      imageCaption: "Global Content Production Studio & Direct-to-Consumer Streaming",
      accentBorder: "border-accent-nflx/30",
      accentText: "text-accent-nflx",
      accentBg: "bg-accent-nflx-light",
      pill: "border-accent-nflx-border bg-accent-nflx-light text-accent-nflx",
      overlayGradient: "from-accent-nflx/80 via-ink/60 to-transparent",
    },
    JPM: {
      imageSrc: "/images/jpm-headquarters.jpg",
      imageAlt: "JPMorgan Chase Global Headquarters Manhattan",
      imageCaption: "270 Park Avenue World Headquarters & Commercial Banking Scale",
      accentBorder: "border-accent-jpm/30",
      accentText: "text-accent-jpm",
      accentBg: "bg-accent-jpm-light",
      pill: "border-accent-jpm-border bg-accent-jpm-light text-accent-jpm",
      overlayGradient: "from-accent-jpm/80 via-ink/60 to-transparent",
    },
  }[company.ticker] || {
    imageSrc: "/images/nvda-datacenter.jpg",
    imageAlt: company.name,
    imageCaption: company.industry,
    accentBorder: "border-accent/30",
    accentText: "text-accent",
    accentBg: "bg-accent-light",
    pill: "border-line bg-paper-subtle text-ink",
    overlayGradient: "from-accent/80 via-ink/60 to-transparent",
  };

  return (
    <div className="relative mb-8 bg-paper-raised border border-line rounded-card overflow-hidden shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[220px]">
        {/* Left Column (60% Desktop): Identity & Research Thesis */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Metadata Badges Strip */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-muted">
              <span className={`font-semibold px-2 py-0.5 rounded border text-[11px] ${meta.pill}`}>
                {company.exchange}: {company.ticker}
              </span>
              <span className="text-line-strong">·</span>
              <span className="text-ink font-medium">{company.industry}</span>
              <span className="text-line-strong hidden sm:inline">·</span>
              <span className="text-ink-faint hidden sm:inline">{company.headquarters}</span>
            </div>

            {/* Company Vector Logo + Name */}
            <div className="flex items-start sm:items-center gap-3.5 pt-1">
              <CompanyLogo ticker={company.ticker} size="xl" />
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink tracking-tight">
                  {company.name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-muted mt-0.5">
                  <span>CEO: <strong className="font-medium text-ink">{company.ceo}</strong></span>
                  <span>·</span>
                  <span>Founded {company.founded}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Research Thesis */}
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-2xl pt-2 border-t border-line/50">
            {company.description}
          </p>
        </div>

        {/* Right Column (40% Desktop): Curated Real Imagery + Floating Key Metric */}
        <div className="lg:col-span-5 relative min-h-[180px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-line overflow-hidden group">
          <Image
            src={meta.imageSrc}
            alt={meta.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
          
          {/* Subtle Duotone / Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

          {/* Standout Financial Number Card Floating on Image */}
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-paper-raised flex flex-col justify-end space-y-1 z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-paper-subtle/80 block">
              {company.headlineMetric.label}
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-paper-raised tracking-tight tabular-nums">
              {company.headlineMetric.value}
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-paper-subtle/70 pt-1 border-t border-white/20">
              <span>{company.headlineMetric.period}</span>
              <span className="truncate max-w-[200px] text-right">{meta.imageCaption}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
