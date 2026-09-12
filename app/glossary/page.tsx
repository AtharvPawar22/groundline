"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllMetricDefinitions } from "@/lib/data";
import { Search, BookOpen, ArrowRight, Layers, FileSpreadsheet, Scale, TrendingUp, Landmark, LineChart, Sparkles } from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";

const CATEGORY_META: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; description: string }> = {
  "Income Statement": {
    label: "Income Statement & Profitability",
    icon: FileSpreadsheet,
    description: "Core operating performance, top-line scale, gross margins, and bottom-line earnings before and after overhead.",
  },
  "Cash Flow": {
    label: "Cash Flow Dynamics & Capital Intensity",
    icon: TrendingUp,
    description: "Actual liquidity generation, working capital needs, and reinvestment requirements into physical and digital infrastructure.",
  },
  "Balance Sheet": {
    label: "Balance Sheet & Capital Structure",
    icon: Scale,
    description: "Solvency, gross and net leverage, enterprise value bridge, and long-term capital cushion.",
  },
  "Valuation": {
    label: "Valuation & Market Multiples",
    icon: LineChart,
    description: "Market pricing relative to cash flow, earnings, and asset base across comparable market leaders.",
  },
  "Bank Metrics": {
    label: "Bank Regulatory Capital & Spread Economics",
    icon: Landmark,
    description: "Specialized financial institution metrics: Net Interest Margin (NIM), CET1 regulatory ratios, and ROTCE.",
  },
  "LBO Returns": {
    label: "LBO & Value Creation Economics",
    icon: Layers,
    description: "Private equity mechanics: financial leverage, debt paydown, multiple expansion, and IRR / MOIC returns attribution.",
  },
};

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const allDefinitions = getAllMetricDefinitions();

  const categories = [
    "All",
    "Income Statement",
    "Balance Sheet",
    "Cash Flow",
    "Valuation",
    "Bank Metrics",
    "LBO Returns",
  ];

  const filtered = allDefinitions.filter((m) => {
    const matchesCategory =
      selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch =
      m.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.formula && m.formula.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Group by category when viewing All with no active search
  const isCategorizedView = selectedCategory === "All" && searchQuery.trim() === "";

  const categoryGroups = isCategorizedView
    ? Object.keys(CATEGORY_META).map((catKey) => ({
        category: catKey,
        meta: CATEGORY_META[catKey],
        metrics: allDefinitions.filter((m) => m.category === catKey),
      })).filter((group) => group.metrics.length > 0)
    : [];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-paper-raised border border-line rounded-card shadow-xs">
        <div className="flex items-center gap-2.5 mb-2">
          <BookOpen className="w-5 h-5 text-accent" />
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
            Financial Literacy &amp; Concepts Dictionary
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-3xl">
          Every financial metric across GROUNDLINE explained with institutional precision: definitions, investor significance, exact mathematical formulas, and live company numbers.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3.5 justify-between items-stretch sm:items-center sticky top-16 z-20 bg-paper/95 backdrop-blur-md py-2 border-b border-line/60">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 23+ terms (e.g. EBITDA, ROTCE, MOIC)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-paper-raised border border-line rounded-card text-xs text-ink placeholder:text-ink-faint focus:border-accent focus:ring-1 focus:ring-accent shadow-xs"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono rounded-control whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-accent text-paper-raised font-semibold shadow-xs"
                  : "bg-paper-raised border border-line text-ink-muted hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {isCategorizedView ? (
        /* Categorized Chapter Sections */
        <div className="space-y-12">
          {categoryGroups.map((group) => {
            const Icon = group.meta.icon;
            return (
              <section key={group.category} className="space-y-4">
                <div className="border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-accent" />
                    <h3 className="font-serif text-xl font-semibold text-ink">
                      {group.meta.label}
                    </h3>
                    <span className="font-mono text-[10px] px-2 py-0.5 bg-paper-subtle border border-line rounded-control text-ink-muted ml-auto">
                      {group.metrics.length} {group.metrics.length === 1 ? "term" : "terms"}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted mt-1 max-w-2xl">
                    {group.meta.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.metrics.map((metric) => (
                    <Link
                      key={metric.id}
                      href={`/glossary/${metric.id}`}
                      className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card hover:border-ink hover:shadow-sm transition-all group flex flex-col justify-between text-left shadow-xs"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent-light px-2 py-0.5 rounded font-semibold">
                            {metric.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {metric.applicableTo.map((ticker) => (
                              <CompanyLogo key={ticker} ticker={ticker} size="sm" />
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-serif text-lg font-semibold text-ink group-hover:text-accent transition-colors">
                            {metric.displayName}
                          </h4>
                          <p className="text-xs text-ink-muted leading-relaxed mt-1.5 line-clamp-3">
                            {metric.definition}
                          </p>
                        </div>

                        {metric.formula && (
                          <div className="p-2.5 bg-paper rounded border border-line/70 font-mono text-[11px] text-ink-muted truncate">
                            <span className="text-accent font-semibold">fx: </span>
                            {metric.formula}
                          </div>
                        )}
                      </div>

                      <div className="pt-3.5 mt-3.5 border-t border-line/60 flex items-center justify-between text-xs font-mono text-accent">
                        <span>Explore interactive analysis &amp; disclosures</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* Filtered Grid View */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-ink-muted px-1">
            <span>Showing {filtered.length} matching {filtered.length === 1 ? "term" : "terms"}</span>
            {selectedCategory !== "All" && (
              <span className="text-accent">Filtered by: {selectedCategory}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((metric) => (
              <Link
                key={metric.id}
                href={`/glossary/${metric.id}`}
                className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card hover:border-ink hover:shadow-sm transition-all group flex flex-col justify-between text-left shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent-light px-2 py-0.5 rounded font-semibold">
                      {metric.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {metric.applicableTo.map((ticker) => (
                        <CompanyLogo key={ticker} ticker={ticker} size="sm" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-semibold text-ink group-hover:text-accent transition-colors">
                      {metric.displayName}
                    </h4>
                    <p className="text-xs text-ink-muted leading-relaxed mt-1.5 line-clamp-3">
                      {metric.definition}
                    </p>
                  </div>

                  {metric.formula && (
                    <div className="p-2.5 bg-paper rounded border border-line/70 font-mono text-[11px] text-ink-muted truncate">
                      <span className="text-accent font-semibold">fx: </span>
                      {metric.formula}
                    </div>
                  )}
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-line/60 flex items-center justify-between text-xs font-mono text-accent">
                  <span>Explore interactive analysis &amp; disclosures</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-paper-raised border border-line rounded-card text-ink-muted font-mono text-xs shadow-xs">
          No financial terms matched &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
        </div>
      )}
    </div>
  );
}
