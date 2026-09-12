import { notFound, redirect } from "next/navigation";
import { getCompany, getSourcedValue } from "../../../../lib/data";
import BankExcessCapitalModule from "../../../../components/lbo/BankExcessCapitalModule";

export default function BankEconomicsPage({
  params,
}: {
  params: { ticker: string };
}) {
  const company = getCompany(params.ticker);
  if (!company) notFound();

  // If company is not a bank, route to standard lbo
  if (!company.isBank) {
    redirect(`/company/${company.ticker}/lbo`);
  }

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-line">
        <h2 className="font-serif text-2xl font-semibold text-ink">
          {company.name}: bank economics and capital distribution
        </h2>
        <p className="text-xs text-ink-muted mt-1">
          Explore ROTCE capital generation, Tangible Book Value per share compounding, dividend & share repurchase capacity, and regulatory CET1 capital constraints.
        </p>
      </div>

      <BankExcessCapitalModule
        company={company}
        startingTce={286.1}
        currentCet1={0.148}
        rwa={1900.0}
        sharePrice={355.32}
        sharesOutstanding={2.66}
        priceToTangibleBook={2.33}
      />
    </div>
  );
}
