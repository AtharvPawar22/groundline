import { notFound } from "next/navigation";
import {
  getCompany,
  getCompanyPeriods,
  getCompanySourcedValues,
} from "../../../../lib/data";
import FinancialsTable, { StatementRow } from "../../../../components/tables/FinancialsTable";
import TrendChart, { TrendDataPoint } from "../../../../components/charts/TrendChart";
import BridgeChart from "../../../../components/charts/BridgeChart";

export default function FinancialsPage({
  params,
}: {
  params: { ticker: string };
}) {
  const company = getCompany(params.ticker);
  if (!company) notFound();

  const ticker = company.ticker;
  const isBank = company.isBank;
  const allPeriods = getCompanyPeriods(ticker);
  const values = getCompanySourcedValues(ticker);

  // Filter 5-year annual periods
  const annualPeriods = allPeriods.filter((p) => p.type === "fiscal_year");

  // Trend chart data
  const trendData: TrendDataPoint[] = annualPeriods.map((p) => {
    const rev = values.find((v) => v.metricId === "revenue" && v.periodId === p.id)?.value || 0;
    const net = values.find((v) => v.metricId === "net_income" && v.periodId === p.id)?.value || 0;
    return {
      period: p.label.split(" ")[0],
      value: rev,
      secondaryValue: net,
    };
  });

  // Financial Table Rows based on Company Type
  const rows: StatementRow[] = !isBank
    ? [
        { metricId: "header_income", label: "Income Statement", unit: "USD_millions", isHeader: true },
        { metricId: "revenue", label: "Total Revenue", unit: "USD_millions" },
        { metricId: "gross_profit", label: "Gross Profit", unit: "USD_millions" },
        { metricId: "operating_income", label: "Operating Income (EBIT)", unit: "USD_millions", isSubtotal: true },
        { metricId: "net_income", label: "GAAP Net Income", unit: "USD_millions", isSubtotal: true },
        { metricId: "header_cf", label: "Cash Flow Statement", unit: "USD_millions", isHeader: true },
        { metricId: "capex", label: "Capital Expenditures (CapEx)", unit: "USD_millions" },
        { metricId: "free_cash_flow", label: "Free Cash Flow (FCF)", unit: "USD_millions", isSubtotal: true },
        { metricId: "header_bs", label: "Balance Sheet & Solvency", unit: "USD_millions", isHeader: true },
        { metricId: "cash", label: "Cash & Equivalents", unit: "USD_millions" },
        { metricId: "total_debt", label: "Total Gross Debt", unit: "USD_millions" },
        { metricId: "total_assets", label: "Total Assets", unit: "USD_millions" },
        { metricId: "total_liabilities", label: "Total Liabilities", unit: "USD_millions" },
      ]
    : [
        { metricId: "header_managed", label: "Managed Basis Income Statement", unit: "USD_millions", isHeader: true },
        { metricId: "revenue", label: "Net Managed Revenue", unit: "USD_millions" },
        { metricId: "net_interest_income", label: "Net Interest Income (NII)", unit: "USD_millions" },
        { metricId: "net_income", label: "GAAP Net Income", unit: "USD_millions", isSubtotal: true },
        { metricId: "header_bank_bs", label: "Consolidated Balance Sheet & Capital", unit: "USD_millions", isHeader: true },
        { metricId: "total_assets", label: "Total Assets ($M)", unit: "USD_millions" },
        { metricId: "stockholders_equity", label: "Stockholders' Equity", unit: "USD_millions" },
        { metricId: "tangible_common_equity", label: "Tangible Common Equity (TCE)", unit: "USD_millions", isSubtotal: true },
        { metricId: "tbv_per_share", label: "Tangible Book Value Per Share ($)", unit: "USD_actual" },
        { metricId: "cet1_ratio", label: "Standardized CET1 Ratio", unit: "percent" },
        { metricId: "rotce", label: "ROTCE", unit: "percent" },
      ];

  // Custom Waterfall Step-Down Data per company
  const waterfallSteps = {
    NVDA: {
      title: "FY2026 earnings step-down waterfall",
      subtitle: "From $215.9B top-line revenue to $120.1B GAAP net income",
      steps: [
        { label: "Revenue", amount: 215938, type: "total" as const, subtext: "100% Top Line" },
        { label: "Cost of Rev.", amount: -62406, type: "deduction" as const, subtext: "Wafer/Packaging" },
        { label: "R&D & SG&A", amount: -19732, type: "deduction" as const, subtext: "Overhead/Engineers" },
        { label: "Op. Income", amount: 133800, type: "total" as const, subtext: "62.0% Margin" },
        { label: "Tax & Non-Op", amount: -13730, type: "deduction" as const, subtext: "Net Tax Provision" },
        { label: "Net Income", amount: 120070, type: "total" as const, subtext: "55.6% Net Margin" },
      ],
    },
    NFLX: {
      title: "FY2025 revenue to free cash flow waterfall",
      subtitle: "How $45.2B in subscription revenues converts to $9.5B in free cash flow",
      steps: [
        { label: "Revenue", amount: 45183, type: "total" as const, subtext: "Subscriptions" },
        { label: "Content Amort.", amount: -15500, type: "deduction" as const, subtext: "Content Cost" },
        { label: "Mktg & Tech", amount: -16356, type: "deduction" as const, subtext: "SG&A / Infrastructure" },
        { label: "Op. Income", amount: 13327, type: "total" as const, subtext: "29.5% Operating" },
        { label: "Tax/Interest", amount: -2346, type: "deduction" as const, subtext: "Debt service/tax" },
        { label: "Net Income", amount: 10981, type: "total" as const, subtext: "24.3% Net Margin" },
        { label: "CapEx/Other", amount: -1521, type: "deduction" as const, subtext: "Net Cash Adjust." },
        { label: "Free Cash Flow", amount: 9460, type: "total" as const, subtext: "20.9% FCF Margin" },
      ],
    },
    JPM: {
      title: "FY2025 banking revenue to bottom-line profit",
      subtitle: "Managed net revenue spread conversion to $57.0B net income",
      steps: [
        { label: "Managed Rev.", amount: 182100, type: "total" as const, subtext: "Spread + Fees" },
        { label: "Noninterest Exp.", amount: -96000, type: "deduction" as const, subtext: "Compensation/Tech" },
        { label: "Pre-Provision", amount: 86100, type: "total" as const, subtext: "Core Spread Profit" },
        { label: "Credit Reserves", amount: -10500, type: "deduction" as const, subtext: "Card/Loan Provisions" },
        { label: "Income Taxes", amount: -18552, type: "deduction" as const, subtext: "Effective Tax" },
        { label: "Net Income", amount: 57048, type: "total" as const, subtext: "Record Profit" },
      ],
    },
  }[ticker];

  return (
    <div className="space-y-8">
      {/* 1. Multi-Year Historical Trend Chart */}
      <section>
        <TrendChart
          title={`${company.name}: 5-year revenue and net income trajectory`}
          subtitle="Annual reported financial statement performance (FY2021/2022 to FY2025/2026)"
          data={trendData}
          accentColor={company.accentColor}
          primaryLabel="Total Revenue ($M)"
          secondaryLabel="GAAP Net Income ($M)"
          unit="USD_millions"
        />
      </section>

      {/* 2. Custom Handcrafted SVG Waterfall Step-Down */}
      {waterfallSteps && (
        <section>
          <BridgeChart
            title={waterfallSteps.title}
            subtitle={waterfallSteps.subtitle}
            steps={waterfallSteps.steps}
            unit="USD_millions"
            accentColor={company.accentColor}
          />
        </section>
      )}

      {/* 3. Comprehensive Multi-Year Financial Statements Table */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif text-lg font-semibold text-ink">
            Consolidated financial statements
          </h3>
          <span className="font-mono text-xs text-ink-muted">
            Audited 10-K disclosures in $USD Millions
          </span>
        </div>

        <FinancialsTable
          companyTicker={ticker}
          periods={annualPeriods}
          rows={rows}
          values={values}
        />
      </section>
    </div>
  );
}
