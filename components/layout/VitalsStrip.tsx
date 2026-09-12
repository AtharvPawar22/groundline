import { Company } from "@/lib/types/schema";
import { getSourcedValue } from "@/lib/data";
import MetricCell from "../metrics/MetricCell";

interface VitalsStripProps {
  company: Company;
}

export default function VitalsStrip({ company }: VitalsStripProps) {
  const ticker = company.ticker;
  const isBank = company.isBank;

  const marketCapVal = getSourcedValue(ticker, "market_cap");
  const peVal = getSourcedValue(ticker, "pe_ratio");
  const revenueVal = getSourcedValue(ticker, "revenue", "FY2025") || getSourcedValue(ticker, "revenue", "FY2026");
  const evVal = getSourcedValue(ticker, "enterprise_value");
  const assetsVal = getSourcedValue(ticker, "total_assets", "FY2025");
  const rotceVal = getSourcedValue(ticker, "rotce", "FY2025");

  return (
    <div className="mb-8 border-y border-line bg-paper-raised/90 backdrop-blur-xs py-4 px-2 sm:px-6 shadow-xs">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-line">
        {/* 1. Market Cap */}
        <div className="pb-3 lg:pb-0 lg:px-4 first:pl-0">
          <MetricCell
            label="Market Capitalization"
            metricId="market_cap"
            companyTicker={ticker}
            sourcedValue={marketCapVal}
            size="medium"
          />
        </div>

        {/* 2. Enterprise Value OR Total Assets */}
        <div className="pb-3 lg:pb-0 lg:px-4 pl-3 lg:pl-4">
          {isBank ? (
            <MetricCell
              label="Total Assets"
              metricId="total_assets"
              companyTicker={ticker}
              sourcedValue={assetsVal}
              size="medium"
            />
          ) : (
            <MetricCell
              label="Enterprise Value"
              metricId="enterprise_value"
              companyTicker={ticker}
              sourcedValue={evVal}
              rawOverrideValue={
                ticker === "NVDA" ? 5260.0 : 342.9
              }
              unit="USD_billions"
              periodLabel="Market (Sep 2026)"
              size="medium"
            />
          )}
        </div>

        {/* 3. Revenue */}
        <div className="pt-3 lg:pt-0 lg:px-4 first:pl-0">
          <MetricCell
            label={isBank ? "Net Managed Revenue" : "Annual Revenue"}
            metricId="revenue"
            companyTicker={ticker}
            sourcedValue={revenueVal}
            size="medium"
          />
        </div>

        {/* 4. P/E or ROTCE */}
        <div className="pt-3 lg:pt-0 lg:px-4 pl-3 lg:pl-4">
          {isBank ? (
            <MetricCell
              label="ROTCE (FY2025)"
              metricId="rotce"
              companyTicker={ticker}
              sourcedValue={rotceVal}
              size="medium"
            />
          ) : (
            <MetricCell
              label="Trailing P/E Ratio"
              metricId="pe_ratio"
              companyTicker={ticker}
              sourcedValue={peVal}
              size="medium"
            />
          )}
        </div>
      </div>
    </div>
  );
}
