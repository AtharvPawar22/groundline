"use client";

import Link from "next/link";
import { ExplanationContent } from "@/lib/types/schema";
import { getMetricDefinition } from "@/lib/data";
import { HelpCircle, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";

interface ExplanationExpansionProps {
  explanation: ExplanationContent;
  companyTicker: string;
  isOpen: boolean;
  onClose?: () => void;
}

export default function ExplanationExpansion({
  explanation,
  companyTicker,
  isOpen,
}: ExplanationExpansionProps) {
  if (!isOpen) return null;

  const metricDef = getMetricDefinition(explanation.metricId);
  const companyExp = explanation.perCompany[companyTicker.toUpperCase()];
  const formula = explanation.formula || metricDef?.formula;
  const caveat = companyExp?.caveat || explanation.globalCaveat || metricDef?.caveat;

  const accentStyles = {
    NVDA: {
      border: "border-accent-nvda/40",
      bg: "bg-accent-nvda-light/70",
      text: "text-accent-nvda",
    },
    NFLX: {
      border: "border-accent-nflx/40",
      bg: "bg-accent-nflx-light/70",
      text: "text-accent-nflx",
    },
    JPM: {
      border: "border-accent-jpm/40",
      bg: "bg-accent-jpm-light/70",
      text: "text-accent-jpm",
    },
  }[companyTicker.toUpperCase()] || {
    border: "border-accent/40",
    bg: "bg-accent-light/70",
    text: "text-accent",
  };

  return (
    <div className="mt-3 p-4 sm:p-5 bg-paper-raised border border-line-strong shadow-sm rounded-card transition-all animate-in fade-in duration-150 z-20">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-line gap-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-accent shrink-0" />
          <h4 className="font-serif text-sm font-semibold text-ink">
            {metricDef?.displayName || explanation.metricId.toUpperCase()}, contextual breakdown
          </h4>
        </div>
        <Link
          href={`/glossary/${explanation.metricId}`}
          className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Glossary definition</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Block 1: What it means */}
        <div className="p-3 bg-paper rounded-control border border-line/50 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block font-semibold">
            1. Plain English meaning
          </span>
          <p className="text-ink leading-relaxed">
            {explanation.whatItMeans}
          </p>
        </div>

        {/* Block 2: Why it matters */}
        <div className="p-3 bg-paper rounded-control border border-line/50 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block font-semibold">
            2. Relevance
          </span>
          <p className="text-ink-muted leading-relaxed">
            {explanation.whyItMatters}
          </p>
        </div>
      </div>

      {/* Block 3: Formula (if applicable) */}
      {formula && (
        <div className="mt-3 p-3 bg-paper rounded-control border border-line/50">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block mb-1 font-semibold">
            3. Formula
          </span>
          <div className="bg-paper-raised px-3 py-1.5 rounded font-mono text-[11px] text-ink border border-line">
            {formula}
          </div>
        </div>
      )}

      {/* Block 4: This Company */}
      {companyExp && (
        <div className={`mt-3 p-3.5 rounded-control border ${accentStyles.border} ${accentStyles.bg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
            <span className={`font-mono text-[10px] uppercase tracking-wider ${accentStyles.text} font-bold`}>
              4. {companyTicker} application ({companyExp.periodLabel || "Current"})
            </span>
            {companyExp.exampleValue && (
              <span className="font-serif text-xs font-semibold text-ink tabular-nums">
                {companyExp.exampleValue}
              </span>
            )}
          </div>
          <p className="text-ink leading-relaxed text-xs">
            {companyExp.text}
          </p>
        </div>
      )}

      {/* Block 5: Caveat / Misconception */}
      {caveat && (
        <div className="mt-3 p-3 bg-negative-light border border-negative-border rounded-control text-negative text-xs flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block font-mono text-[10px] uppercase tracking-wider">
              Analytical caveat
            </span>
            <span className="leading-relaxed mt-0.5 block">{caveat}</span>
          </div>
        </div>
      )}
    </div>
  );
}
