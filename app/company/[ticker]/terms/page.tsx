import { notFound } from "next/navigation";
import { getCompany, getAllMetricDefinitions, getGlossaryExplanation } from "../../../../lib/data";
import ExplanationExpansion from "../../../../components/metrics/ExplanationExpansion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function KeyTermsPage({
  params,
}: {
  params: { ticker: string };
}) {
  const company = getCompany(params.ticker);
  if (!company) notFound();

  const ticker = company.ticker;
  const allDefinitions = getAllMetricDefinitions();

  // Filter definitions applicable to this company
  const applicableMetrics = allDefinitions.filter((m) =>
    m.applicableTo.includes(ticker)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-ink">
            {company.name}: core financial glossary
          </h2>
          <p className="text-xs text-ink-muted mt-0.5">
            Key concepts and metrics governing {company.name}&apos;s business model with company numbers.
          </p>
        </div>

        <Link
          href="/glossary"
          className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1.5 shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Browse full glossary</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-6">
        {applicableMetrics.map((metric) => {
          const explanation = getGlossaryExplanation(metric.id);
          if (!explanation) return null;

          return (
            <div key={metric.id} className="p-1">
              <ExplanationExpansion
                explanation={explanation}
                companyTicker={ticker}
                isOpen={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
