"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllCompanies, getSourcedValue } from "@/lib/data";
import { formatCurrency, formatPercent, formatRatio } from "@/lib/finance/format";
import { Scale, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import PeerBarChart from "@/components/charts/PeerBarChart";
import CompanyLogo from "@/components/common/CompanyLogo";

export default function ComparePage() {
  const companies = getAllCompanies();

  // Metrics Data Extraction
  const data = companies.map((c) => {
    const marketCap = getSourcedValue(c.ticker, "market_cap")?.value || 0;
    const pe = getSourcedValue(c.ticker, "pe_ratio")?.value || null;
    const evEbitda = getSourcedValue(c.ticker, "ev_ebitda")?.value || null;
    const rev =
      (getSourcedValue(c.ticker, "revenue", "FY2025")?.value ||
        getSourcedValue(c.ticker, "revenue", "FY2026")?.value ||
        0) / 1000;
    const netInc =
      (getSourcedValue(c.ticker, "net_income", "FY2025")?.value ||
        getSourcedValue(c.ticker, "net_income", "FY2026")?.value ||
        0) / 1000;
    const netMargin = rev > 0 ? netInc / rev : null;
    const growth =
      c.ticker === "NVDA"
        ? 0.655
        : c.ticker === "NFLX"
        ? 0.159
        : 0.038;

    return {
      company: c,
      marketCap,
      pe,
      evEbitda,
      rev,
      netInc,
      netMargin,
      growth,
    };
  });

  const [activeChartMetric, setActiveChartMetric] = useState<"marketCap" | "rev" | "netInc" | "pe">("marketCap");

  const chartItems = data.map((d) => ({
    name: d.company.name,
    ticker: d.company.ticker,
    value:
      activeChartMetric === "marketCap"
        ? d.marketCap
        : activeChartMetric === "rev"
        ? d.rev
        : activeChartMetric === "netInc"
        ? d.netInc
        : d.pe,
  }));

  const metricTitle = {
    marketCap: "Market Capitalization ($B)",
    rev: "Annual Revenue ($B)",
    netInc: "Annual Net Income ($B)",
    pe: "Trailing P/E Multiple (x)",
  }[activeChartMetric];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-paper-raised border border-line rounded-card shadow-xs">
        <div className="flex items-center gap-2.5 mb-2">
          <Scale className="w-5 h-5 text-accent" />
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
            Cross-company financial comparison
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-3xl">
          This comparison covers three distinct business models: NVIDIA (semiconductors), Netflix (subscription media), and JPMorgan Chase (commercial banking). It highlights where metrics compare directly and where standard corporate finance measures break down.
        </p>
      </div>

      {/* Interactive Metric Toggle Selector */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-paper-raised border border-line rounded-card w-full sm:w-fit shadow-xs">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted px-2 font-bold">
          Metric:
        </span>
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setActiveChartMetric("marketCap")}
            className={`px-3 py-1.5 text-xs font-mono rounded-control transition-all cursor-pointer ${
              activeChartMetric === "marketCap"
                ? "bg-accent text-paper-raised font-semibold shadow-xs"
                : "text-ink-muted hover:text-ink hover:bg-paper"
            }`}
          >
            Market Cap
          </button>
          <button
            type="button"
            onClick={() => setActiveChartMetric("rev")}
            className={`px-3 py-1.5 text-xs font-mono rounded-control transition-all cursor-pointer ${
              activeChartMetric === "rev"
                ? "bg-accent text-paper-raised font-semibold shadow-xs"
                : "text-ink-muted hover:text-ink hover:bg-paper"
            }`}
          >
            Revenue
          </button>
          <button
            type="button"
            onClick={() => setActiveChartMetric("netInc")}
            className={`px-3 py-1.5 text-xs font-mono rounded-control transition-all cursor-pointer ${
              activeChartMetric === "netInc"
                ? "bg-accent text-paper-raised font-semibold shadow-xs"
                : "text-ink-muted hover:text-ink hover:bg-paper"
            }`}
          >
            Net Income
          </button>
          <button
            type="button"
            onClick={() => setActiveChartMetric("pe")}
            className={`px-3 py-1.5 text-xs font-mono rounded-control transition-all cursor-pointer ${
              activeChartMetric === "pe"
                ? "bg-accent text-paper-raised font-semibold shadow-xs"
                : "text-ink-muted hover:text-ink hover:bg-paper"
            }`}
          >
            Trailing P/E
          </button>
        </div>
      </div>

      {/* Visual Chart */}
      <PeerBarChart
        title={`Cross-Industry ${metricTitle}`}
        metricLabel={metricTitle}
        items={chartItems}
        suffix={activeChartMetric === "pe" ? "x" : "B"}
      />

      {/* Side-by-Side Comparison Table */}
      <div className="bg-paper-raised border border-line rounded-card overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-line bg-paper/40 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h3 className="font-serif text-base font-semibold text-ink">
            Multi-company financial summary
          </h3>
          <span className="text-[10px] font-mono text-ink-faint">
            ← Swipe table horizontally →
          </span>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-line bg-paper/60 text-[11px] font-mono uppercase text-ink-muted">
                <th className="p-3.5 pl-4">Metric</th>
                {companies.map((c) => (
                  <th key={c.ticker} className="p-3.5 text-right font-semibold text-ink">
                    <Link
                      href={`/company/${c.ticker}/overview`}
                      className="hover:text-accent hover:underline inline-flex items-center gap-1.5"
                    >
                      <CompanyLogo ticker={c.ticker} size="sm" />
                      <span>{c.name}</span>
                      <span className="font-mono text-[10px] text-ink-muted">({c.ticker})</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line/40">
                <td className="p-3 pl-4 text-xs font-medium text-ink">Business Model</td>
                <td className="p-3 text-right text-xs text-ink-muted font-mono">Fabless AI Silicon</td>
                <td className="p-3 text-right text-xs text-ink-muted font-mono">DTC Subscription Media</td>
                <td className="p-3 text-right text-xs text-ink-muted font-mono">Universal Depository Bank</td>
              </tr>
              <tr className="border-b border-line/40">
                <td className="p-3 pl-4 text-xs font-medium text-ink">Market Capitalization</td>
                {data.map((d) => (
                  <td key={d.company.ticker} className="p-3 text-right font-serif text-xs tabular-nums text-ink font-semibold">
                    {formatCurrency(d.marketCap, "USD_billions", 2)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40">
                <td className="p-3 pl-4 text-xs font-medium text-ink">Annual Revenue / Managed Net Rev.</td>
                {data.map((d) => (
                  <td key={d.company.ticker} className="p-3 text-right font-serif text-xs tabular-nums text-ink">
                    {formatCurrency(d.rev, "USD_billions", 1)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40">
                <td className="p-3 pl-4 text-xs font-medium text-ink">YoY Revenue Growth</td>
                {data.map((d) => (
                  <td key={d.company.ticker} className="p-3 text-right font-serif text-xs tabular-nums text-positive font-semibold">
                    {formatPercent(d.growth, 1, true)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40">
                <td className="p-3 pl-4 text-xs font-medium text-ink">GAAP Net Income</td>
                {data.map((d) => (
                  <td key={d.company.ticker} className="p-3 text-right font-serif text-xs tabular-nums text-ink">
                    {formatCurrency(d.netInc, "USD_billions", 1)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40">
                <td className="p-3 pl-4 text-xs font-medium text-ink">Net Profit Margin</td>
                {data.map((d) => (
                  <td key={d.company.ticker} className="p-3 text-right font-serif text-xs tabular-nums text-ink">
                    {d.netMargin ? formatPercent(d.netMargin, 1) : "—"}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 bg-paper/30">
                <td className="p-3 pl-4 text-xs font-medium text-ink">Trailing P/E Ratio</td>
                {data.map((d) => (
                  <td key={d.company.ticker} className="p-3 text-right font-serif text-xs tabular-nums text-ink font-bold">
                    {d.pe ? formatRatio(d.pe, 1) : "—"}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40">
                <td className="p-3 pl-4 text-xs font-medium text-ink">EV / EBITDA Multiple</td>
                <td className="p-3 text-right font-serif text-xs tabular-nums text-ink font-bold">26.3x</td>
                <td className="p-3 text-right font-serif text-xs tabular-nums text-ink font-bold">23.2x</td>
                <td className="p-3 text-right font-mono text-[11px] text-ink-faint">
                  <span className="px-2 py-0.5 bg-paper rounded border border-line" title="Not Applicable for banks">
                    N/A (Bank)
                  </span>
                </td>
              </tr>
              <tr className="border-b border-line bg-paper/40">
                <td className="p-3 pl-4 text-xs font-medium text-ink">LBO / Capital Model Fit</td>
                <td className="p-3 text-right text-xs text-ink font-mono">Illustrative Sandbox</td>
                <td className="p-3 text-right text-xs text-ink font-mono">Standard Buyout</td>
                <td className="p-3 text-right text-xs text-accent-jpm font-mono font-bold">Bank Economics</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Explicit Inapplicability Callout for JPMorgan */}
      <div className="p-5 sm:p-6 bg-paper-raised border-l-4 border-accent-jpm border border-line rounded-card shadow-xs text-xs space-y-2">
        <div className="flex items-center gap-2 font-serif text-sm font-semibold text-ink">
          <AlertCircle className="w-4 h-4 text-accent-jpm" />
          <span>Cross-industry comparability note</span>
        </div>
        <p className="text-ink leading-relaxed sm:pl-6">
          While <strong>Market Cap, Revenue, Net Income, and P/E</strong> compare directly across all three companies, <strong>EV/EBITDA, Free Cash Flow, and standard LBO leverage</strong> do not apply to JPMorgan Chase. Customer deposits are funding liabilities rather than corporate debt. Netting deposits against cash distorts enterprise value and cash flow metrics, which is why bank analysis relies on return on equity, book value multiples, and regulatory capital ratios instead.
        </p>
      </div>
    </div>
  );
}
