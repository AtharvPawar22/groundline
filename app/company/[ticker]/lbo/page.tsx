import { notFound, redirect } from "next/navigation";
import { getCompany, getLBODefaults, getSourcedValue } from "../../../../lib/data";
import LBOSimulator from "../../../../components/lbo/LBOSimulator";

export default function LBOPage({
  params,
}: {
  params: { ticker: string };
}) {
  const company = getCompany(params.ticker);
  if (!company) notFound();

  // If company is a bank, route directly to bank-economics
  if (company.isBank) {
    redirect(`/company/${company.ticker}/bank-economics`);
  }

  const defaults = getLBODefaults(company.ticker);
  if (!defaults) notFound();

  const ticker = company.ticker;
  // Sourced EBITDA and Revenue
  const ebitdaVal =
    ticker === "NVDA"
      ? 201300 // $201.3B TTM EBITDA
      : 13327; // $13.3B FY2025 operating income baseline

  const revVal =
    ticker === "NVDA"
      ? 302970 // $303B TTM revenue
      : 45183; // $45.18B FY2025 revenue

  return (
    <div className="space-y-6">
      <div className="pb-3 border-b border-line">
        <h2 className="font-serif text-2xl font-semibold text-ink">
          {company.name} — Interactive Leveraged Buyout Analysis
        </h2>
        <p className="text-xs text-ink-muted mt-1">
          Adjust acquisition leverage, revenue growth, margin, and exit multiples to analyze returns (MOIC & IRR) and value creation attribution in real time.
        </p>
      </div>

      <LBOSimulator
        company={company}
        defaults={defaults}
        actualEbitda={ebitdaVal}
        actualRevenue={revVal}
      />
    </div>
  );
}
