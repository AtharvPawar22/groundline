import { notFound } from "next/navigation";
import { getCompany, getPeerSet, getSourcedValue } from "@/lib/data";
import PeerComparisonPanel from "@/components/tables/PeerComparisonPanel";
import PeerBarChart from "@/components/charts/PeerBarChart";
import MetricCell from "@/components/metrics/MetricCell";
import { Scale, ArrowRight, ShieldCheck, AlertCircle, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/finance/format";

export default function ValuationPage({
  params,
}: {
  params: { ticker: string };
}) {
  const company = getCompany(params.ticker);
  if (!company) notFound();

  const ticker = company.ticker;
  const isBank = company.isBank;
  const peerSet = getPeerSet(ticker);

  const marketCapVal = getSourcedValue(ticker, "market_cap");
  const peVal = getSourcedValue(ticker, "pe_ratio");
  const evEbitdaVal = getSourcedValue(ticker, "ev_ebitda");
  const revVal = getSourcedValue(ticker, "revenue", "FY2025") || getSourcedValue(ticker, "revenue", "FY2026");
  const netIncVal = getSourcedValue(ticker, "net_income", "FY2025") || getSourcedValue(ticker, "net_income", "FY2026");
  const debtVal = getSourcedValue(ticker, "total_debt", "FY2025") || getSourcedValue(ticker, "total_debt", "FY2026");
  const cashVal = getSourcedValue(ticker, "cash", "FY2025") || getSourcedValue(ticker, "cash", "FY2026");
  const rotceVal = getSourcedValue(ticker, "rotce", "FY2025");
  const tbvVal = getSourcedValue(ticker, "tbv_per_share", "FY2025");

  const marketCapB = marketCapVal?.value || 0;
  const debtB = (debtVal?.value || 0) / 1000;
  const cashB = (cashVal?.value || 0) / 1000;
  const evB = ticker === "NVDA" ? 5260.0 : 342.9;

  // Multiples summary object for PeerComparisonPanel
  const currentMultiples = {
    peRatio: peVal?.value,
    evEbitda: evEbitdaVal?.value,
    priceToBook: isBank ? 2.33 : undefined,
    rotce: rotceVal?.value,
    revenue: (revVal?.value || 0) / 1000,
    marketCap: marketCapB,
    netIncome: (netIncVal?.value || 0) / 1000,
  };

  // Peer bar chart items
  const peBarItems = [
    {
      name: company.name,
      ticker: company.ticker,
      value: peVal?.value || null,
      isCurrentCompany: true,
    },
    ...(peerSet?.peers.map((p) => ({
      name: p.name,
      ticker: p.peerTicker,
      value: p.peRatio || null,
      isCurrentCompany: false,
    })) || []),
  ];

  const evEbitdaBarItems = !isBank
    ? [
        {
          name: company.name,
          ticker: company.ticker,
          value: evEbitdaVal?.value || null,
          isCurrentCompany: true,
        },
        ...(peerSet?.peers.map((p) => ({
          name: p.name,
          ticker: p.peerTicker,
          value: p.evEbitda || null,
          isCurrentCompany: false,
        })) || []),
      ]
    : [];

  return (
    <div className="space-y-12">
      {/* 1. Core Valuation Multiples Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-line pb-2">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
            Valuation Multiples &amp; Trading Metrics
          </h2>
          <span className="font-mono text-xs text-ink-muted">
            September 1, 2026 Market Baseline
          </span>
        </div>

        <div className="p-6 sm:p-8 bg-paper-raised border border-line rounded-card shadow-xs">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${isBank ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6`}>
            <MetricCell
              label="Market Capitalization"
              metricId="market_cap"
              companyTicker={ticker}
              sourcedValue={marketCapVal}
              size="large"
            />
            <MetricCell
              label="Trailing P/E Ratio"
              metricId="pe_ratio"
              companyTicker={ticker}
              sourcedValue={peVal}
              size="large"
            />
            {!isBank ? (
              <>
                <MetricCell
                  label="EV / EBITDA Multiple"
                  metricId="ev_ebitda"
                  companyTicker={ticker}
                  sourcedValue={evEbitdaVal}
                  size="large"
                />
                <MetricCell
                  label="Enterprise Value"
                  metricId="enterprise_value"
                  companyTicker={ticker}
                  rawOverrideValue={evB}
                  unit="USD_billions"
                  periodLabel="Market (Sep 2026)"
                  size="large"
                />
              </>
            ) : (
              <>
                <MetricCell
                  label="Price / Tangible Book"
                  metricId="price_to_book"
                  companyTicker={ticker}
                  rawOverrideValue={2.33}
                  unit="ratio"
                  periodLabel="Q2 2026"
                  size="large"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* 2. Enterprise Value Bridge (Corporate) OR Bank Explainer Card */}
      {!isBank ? (
        <section className="p-6 sm:p-8 bg-paper-raised border border-line rounded-card shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-line">
            <Scale className="w-5 h-5 text-accent" />
            <h3 className="font-serif text-lg font-semibold text-ink">
              Enterprise Value Bridge Walk ($B)
            </h3>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            How equity value connects to total operating enterprise value via net balance sheet debt adjustments:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center pt-1">
            <div className="p-4 bg-paper rounded-card border border-line">
              <span className="font-mono text-[10px] uppercase text-ink-muted block">Market Cap</span>
              <span className="font-serif text-xl font-bold text-ink tabular-nums mt-1 block">
                {formatCurrency(marketCapB, "USD_billions", 1)}
              </span>
            </div>

            <div className="p-4 bg-paper rounded-card border border-line">
              <span className="font-mono text-[10px] uppercase text-ink-muted block">(+) Total Gross Debt</span>
              <span className="font-serif text-xl font-bold text-negative tabular-nums mt-1 block">
                +{formatCurrency(debtB, "USD_billions", 1)}
              </span>
            </div>

            <div className="p-4 bg-paper rounded-card border border-line">
              <span className="font-mono text-[10px] uppercase text-ink-muted block">(−) Cash &amp; Equivalents</span>
              <span className="font-serif text-xl font-bold text-accent tabular-nums mt-1 block">
                −{formatCurrency(cashB, "USD_billions", 1)}
              </span>
            </div>

            <div className="p-4 bg-accent-light rounded-card border border-accent/30 font-bold">
              <span className="font-mono text-[10px] uppercase text-accent block">(=) Enterprise Value</span>
              <span className="font-serif text-xl text-ink tabular-nums mt-1 block">
                {formatCurrency(evB, "USD_billions", 1)}
              </span>
            </div>
          </div>
        </section>
      ) : (
        <section className="p-6 sm:p-8 bg-paper-raised border-l-4 border-accent-jpm border border-line rounded-card shadow-xs text-xs space-y-2.5">
          <div className="flex items-center gap-2 text-ink font-serif text-base font-semibold">
            <AlertCircle className="w-5 h-5 text-accent-jpm" />
            <span>Why Enterprise Value &amp; EV/EBITDA Break Down for JPMorgan Chase</span>
          </div>
          <p className="text-xs sm:text-sm text-ink leading-relaxed font-sans pl-7">
            Unlike non-financial corporations where debt represents discretionary leverage, a commercial bank relies on customer deposits ($2.4+ trillion) as its fundamental operational funding inventory to create loans. Subtracting cash and adding liabilities according to the corporate EV formula produces an economically meaningless figure ($780B EV &lt; $955B Market Cap). Bank valuation is appropriately conducted via <strong>Price-to-Tangible-Book (2.33x)</strong>, <strong>ROTCE (20.0%)</strong>, and <strong>Trailing P/E (15.5x)</strong>.
          </p>
        </section>
      )}

      {/* 3. Horizontal Multiple Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PeerBarChart
          title="Trailing P/E Multiples Comparison"
          metricLabel="Price / Earnings (x)"
          items={peBarItems}
          accentColor={company.accentColor}
        />

        {!isBank && evEbitdaBarItems.length > 0 && (
          <PeerBarChart
            title="EV / EBITDA Multiple Comparison"
            metricLabel="Enterprise Value / EBITDA (x)"
            items={evEbitdaBarItems}
            accentColor={company.accentColor}
          />
        )}
      </section>

      {/* 4. Comprehensive Peer Benchmark Panel */}
      {peerSet && (
        <section>
          <PeerComparisonPanel
            currentCompany={company}
            peers={peerSet.peers}
            currentMultiples={currentMultiples}
          />
        </section>
      )}
    </div>
  );
}
