import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllMetricDefinitions,
  getMetricDefinition,
  getGlossaryExplanation,
  getCompany,
} from "@/lib/data";
import { ArrowLeft, BookOpen, ExternalLink, AlertTriangle } from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";

export function generateStaticParams() {
  return getAllMetricDefinitions().map((m) => ({
    term: m.id,
  }));
}

export default function TermDetailPage({
  params,
}: {
  params: { term: string };
}) {
  const metric = getMetricDefinition(params.term);
  const explanation = getGlossaryExplanation(params.term);

  if (!metric || !explanation) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Back Link */}
      <Link
        href="/glossary"
        className="inline-flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-ink transition-colors bg-paper px-2.5 py-1.5 rounded border border-line shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to financial glossary</span>
      </Link>

      {/* Main Term Header */}
      <div className="p-6 sm:p-8 bg-paper-raised border border-line rounded-card shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent-light px-2.5 py-0.5 rounded font-bold">
            {metric.category}
          </span>
          <span className="text-xs font-mono text-ink-faint">
            Term ID: {metric.id}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
          {metric.displayName}
        </h1>

        <p className="text-sm text-ink leading-relaxed pt-2 border-t border-line/60">
          {metric.definition}
        </p>
      </div>

      {/* The 4 Core Pedagogical Blocks */}
      <div className="space-y-6">
        {/* 1. What it means */}
        <section className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs space-y-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold block">
            1. Plain English meaning
          </span>
          <p className="text-xs sm:text-sm text-ink leading-relaxed">
            {explanation.whatItMeans}
          </p>
        </section>

        {/* 2. Why it matters */}
        <section className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs space-y-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold block">
            2. Investor and analyst relevance
          </span>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            {explanation.whyItMatters}
          </p>
        </section>

        {/* 3. Mathematical Formula */}
        {(explanation.formula || metric.formula) && (
          <section className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold block">
              3. Formula
            </span>
            <div className="p-3.5 bg-paper rounded-control font-mono text-xs text-ink border border-line/60">
              {explanation.formula || metric.formula}
            </div>
          </section>
        )}

        {/* 4. Applied Context across all three companies */}
        <section className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold block pb-2 border-b border-line">
            4. Application across companies
          </span>

          <div className="space-y-3.5">
            {metric.applicableTo.map((ticker) => {
              const comp = getCompany(ticker);
              const exp = explanation.perCompany[ticker];

              if (!exp) return null;

              return (
                <div
                  key={ticker}
                  className="p-4 sm:p-5 bg-paper rounded-card border border-line/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/company/${ticker}/overview`}
                      className="font-serif text-sm font-semibold text-ink hover:text-accent hover:underline inline-flex items-center gap-2"
                    >
                      <CompanyLogo ticker={ticker} size="sm" />
                      <span>{comp?.name || ticker}</span>
                      <ExternalLink className="w-3 h-3 text-ink-muted" />
                    </Link>

                    {exp.exampleValue && (
                      <span className="font-serif text-sm font-bold text-ink tabular-nums">
                        {exp.exampleValue}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-ink leading-relaxed">{exp.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Analytical Caveat */}
        {(explanation.globalCaveat || metric.caveat) && (
          <section className="p-4 sm:p-5 bg-negative-light border border-negative-border rounded-card text-xs text-negative flex items-start gap-3 shadow-xs">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block font-mono text-[11px] uppercase tracking-wider">
                Analytical caveat
              </span>
              <p className="mt-0.5 leading-relaxed">
                {explanation.globalCaveat || metric.caveat}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
