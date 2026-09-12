"use client";

import { useState, useMemo } from "react";
import { Company, LBOAssumptionSet } from "@/lib/types/schema";
import { runLBOModel, generateLBOSensitivityMatrix, LBOInputs } from "@/lib/finance/lbo-engine";
import { formatCurrency, formatPercent, formatRatio } from "@/lib/finance/format";
import LBOInputSlider from "./LBOInputSlider";
import LBOWaterfallChart from "../charts/LBOWaterfallChart";
import SensitivityHeatmap from "../charts/SensitivityHeatmap";
import { AlertCircle, Sliders, ChevronDown, ChevronUp, RefreshCw, Layers } from "lucide-react";

interface LBOSimulatorProps {
  company: Company;
  defaults: LBOAssumptionSet;
  actualEbitda: number; // in millions
  actualRevenue?: number; // in millions
}

export default function LBOSimulator({
  company,
  defaults,
  actualEbitda,
  actualRevenue,
}: LBOSimulatorProps) {
  // State for LBO assumptions
  const [entryMultiple, setEntryMultiple] = useState(defaults.defaultEntryMultiple);
  const [debtToEbitda, setDebtToEbitda] = useState(defaults.defaultDebtToEbitda);
  const [revenueGrowth, setRevenueGrowth] = useState(defaults.defaultRevenueGrowth);
  const [ebitdaMargin, setEbitdaMargin] = useState(defaults.defaultEbitdaMargin);
  const [holdPeriod, setHoldPeriod] = useState(defaults.defaultHoldPeriodYears);
  const [exitMultiple, setExitMultiple] = useState(defaults.defaultExitMultiple);
  const [interestRate, setInterestRate] = useState(defaults.defaultInterestRate);

  // Advanced toggled inputs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [feePercent, setFeePercent] = useState(defaults.defaultFeePercent);
  const [taxRate, setTaxRate] = useState(defaults.defaultTaxRate);
  const [capexPercent, setCapexPercent] = useState(defaults.defaultCapexPercent);

  // Clamp debtToEbitda if it exceeds entryMultiple to prevent negative equity
  const effectiveDebtToEbitda = Math.min(debtToEbitda, entryMultiple * 0.95);

  const currentInputs: LBOInputs = {
    entryEbitda: actualEbitda,
    entryMultiple,
    entryRevenue: actualRevenue,
    debtToEbitda: effectiveDebtToEbitda,
    feePercent,
    revenueCagr: revenueGrowth,
    ebitdaMargin,
    capexPercent,
    interestRate,
    taxRate,
    holdPeriod,
    exitMultiple,
  };

  // Run pure calculation engine
  const result = useMemo(() => runLBOModel(currentInputs), [currentInputs]);

  // Generate sensitivity grid
  const sensitivity = useMemo(
    () => generateLBOSensitivityMatrix(currentInputs, 0.5, 7, 0.02, 5),
    [currentInputs]
  );

  const resetToDefaults = () => {
    setEntryMultiple(defaults.defaultEntryMultiple);
    setDebtToEbitda(defaults.defaultDebtToEbitda);
    setRevenueGrowth(defaults.defaultRevenueGrowth);
    setEbitdaMargin(defaults.defaultEbitdaMargin);
    setHoldPeriod(defaults.defaultHoldPeriodYears);
    setExitMultiple(defaults.defaultExitMultiple);
    setInterestRate(defaults.defaultInterestRate);
    setFeePercent(defaults.defaultFeePercent);
    setTaxRate(defaults.defaultTaxRate);
    setCapexPercent(defaults.defaultCapexPercent);
  };

  return (
    <div className="space-y-8 my-6">
      {/* Mandatory Scale & Model Disclaimer Banner */}
      {defaults.scaleDisclaimer && (
        <div className="p-4 sm:p-5 bg-paper-raised border-l-4 border-amber-600 border border-line rounded-card text-xs space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-semibold font-mono text-[11px] uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Analytical Model Framing &amp; Pedagogical Sandbox</span>
          </div>
          <p className="text-ink leading-relaxed sm:pl-6">
            {defaults.scaleDisclaimer}
          </p>
        </div>
      )}

      {/* Main Grid: Controls on Left, Headline Returns & S&U on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Interactive Input Panel (5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-accent" />
              <h3 className="font-serif text-base font-semibold text-ink">
                Model assumptions
              </h3>
            </div>
            <button
              type="button"
              onClick={resetToDefaults}
              className="text-[11px] font-mono text-ink-muted hover:text-ink flex items-center gap-1 cursor-pointer bg-paper px-2 py-1 rounded border border-line"
              title="Reset to default baseline"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-3">
            <LBOInputSlider
              label="Entry Valuation Multiple"
              sublabel="Entry EV / EBITDA"
              value={entryMultiple}
              min={4.0}
              max={35.0}
              step={0.5}
              unit="ratio"
              onChange={setEntryMultiple}
            />

            <LBOInputSlider
              label="Acquisition Leverage"
              sublabel="Opening Debt / EBITDA"
              value={debtToEbitda}
              min={1.0}
              max={8.0}
              step={0.25}
              unit="ratio"
              onChange={setDebtToEbitda}
              warning={
                debtToEbitda > 6.0
                  ? "Leverage >6.0x exceeds typical leveraged lending market tolerances."
                  : undefined
              }
            />

            <LBOInputSlider
              label="Revenue CAGR (Growth)"
              sublabel="Constant annual growth rate"
              value={revenueGrowth}
              min={-0.1}
              max={0.4}
              step={0.01}
              unit="percent"
              onChange={setRevenueGrowth}
            />

            <LBOInputSlider
              label="EBITDA Margin"
              sublabel="Operating profitability assumption"
              value={ebitdaMargin}
              min={0.1}
              max={0.8}
              step={0.01}
              unit="percent"
              onChange={setEbitdaMargin}
            />

            <LBOInputSlider
              label="Holding Period"
              sublabel="Years to sponsor exit"
              value={holdPeriod}
              min={1}
              max={10}
              step={1}
              unit="years"
              onChange={setHoldPeriod}
            />

            <LBOInputSlider
              label="Exit Multiple"
              sublabel="Exit EV / EBITDA"
              value={exitMultiple}
              min={4.0}
              max={35.0}
              step={0.5}
              unit="ratio"
              onChange={setExitMultiple}
            />

            <LBOInputSlider
              label="Debt Interest Rate"
              sublabel="Blended borrowing cost"
              value={interestRate}
              min={0.04}
              max={0.15}
              step={0.005}
              unit="percent"
              onChange={setInterestRate}
            />
          </div>

          {/* Advanced Collapsible Settings */}
          <div className="pt-2 border-t border-line">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-mono text-ink-muted hover:text-ink py-1.5 cursor-pointer"
            >
              <span>Advanced parameters (fees, taxes, CapEx)</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvanced && (
              <div className="space-y-3 pt-3 mt-1 border-t border-line/50">
                <LBOInputSlider
                  label="Transaction Fees"
                  sublabel="% of Entry Enterprise Value"
                  value={feePercent}
                  min={0.01}
                  max={0.05}
                  step={0.005}
                  unit="percent"
                  onChange={setFeePercent}
                />
                <LBOInputSlider
                  label="Corporate Tax Rate"
                  sublabel="Effective cash tax rate"
                  value={taxRate}
                  min={0.1}
                  max={0.35}
                  step={0.01}
                  unit="percent"
                  onChange={setTaxRate}
                />
                <LBOInputSlider
                  label="Maintenance CapEx %"
                  sublabel="% of revenue (assumed = D&A)"
                  value={capexPercent}
                  min={0.01}
                  max={0.1}
                  step={0.005}
                  unit="percent"
                  onChange={setCapexPercent}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Key Outputs & Sources & Uses (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Return Hero Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* MOIC Card */}
            <div className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted block font-semibold">
                Multiple on Invested Capital (MOIC)
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-normal text-ink tabular-nums mt-1">
                {formatRatio(result.returns.moic, 2)}
              </div>
              <span className="text-xs text-ink-muted block mt-1.5 pt-1.5 border-t border-line/50">
                Cash-on-cash equity return ($
                {formatCurrency(result.returns.sponsorExitEquity, "USD_millions", 1)} exit / $
                {formatCurrency(result.sourcesAndUses.sponsorEquity, "USD_millions", 1)} entry)
              </span>
            </div>

            {/* IRR Card */}
            <div className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted block font-semibold">
                Internal Rate of Return (IRR)
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-normal text-accent tabular-nums mt-1">
                {result.returns.isUnderwater
                  ? "-100%"
                  : formatPercent(result.returns.irr, 1)}
              </div>
              <span className="text-xs text-ink-muted block mt-1.5 pt-1.5 border-t border-line/50">
                Annualized compound rate of return over {holdPeriod} years
              </span>
            </div>
          </div>

          {/* Sources & Uses Summary */}
          <div className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs text-xs">
            <h4 className="font-serif text-sm font-semibold text-ink pb-2.5 mb-3.5 border-b border-line flex items-center justify-between">
              <span>Transaction sources and uses (entry capitalization)</span>
              <span className="font-mono text-[10px] text-ink-faint font-normal">
                Balanced Identity
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Uses */}
              <div className="p-3.5 bg-paper rounded-card border border-line/60">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block mb-2 font-bold">
                  Uses of funds
                </span>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Enterprise Value</span>
                    <span className="font-mono tabular-nums font-semibold">
                      {formatCurrency(result.sourcesAndUses.entryEv, "USD_millions", 1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-ink-muted">
                    <span>Transaction Fees ({formatPercent(feePercent, 1)})</span>
                    <span className="font-mono tabular-nums">
                      {formatCurrency(result.sourcesAndUses.transactionFees, "USD_millions", 1)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-line/60 pt-1.5 text-ink">
                    <span>Total Uses</span>
                    <span className="font-mono tabular-nums">
                      {formatCurrency(result.sourcesAndUses.totalUses, "USD_millions", 1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sources */}
              <div className="p-3.5 bg-paper rounded-card border border-line/60">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block mb-2 font-bold">
                  Sources of funds
                </span>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>New Debt ({effectiveDebtToEbitda.toFixed(1)}x EBITDA)</span>
                    <span className="font-mono tabular-nums font-semibold">
                      {formatCurrency(result.sourcesAndUses.newDebt, "USD_millions", 1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sponsor Equity (Plug)</span>
                    <span className="font-mono tabular-nums font-bold text-accent">
                      {formatCurrency(result.sourcesAndUses.sponsorEquity, "USD_millions", 1)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-line/60 pt-1.5 text-ink">
                    <span>Total Sources</span>
                    <span className="font-mono tabular-nums">
                      {formatCurrency(result.sourcesAndUses.totalSources, "USD_millions", 1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Negative Cash Flow Warning */}
      {result.hasNegativeCashFlowYears && (
        <div className="p-4 sm:p-5 bg-negative-light border border-negative-border rounded-card text-negative text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block font-mono text-[11px] uppercase tracking-wider">
              Cash flow shortfall alert
            </span>
            <p className="mt-0.5 leading-relaxed">
              This combination of assumptions produces negative pre-interest cash flow in Year(s){" "}
              {result.negativeCashFlowYears.join(", ")}. In real market conditions, debt service would require an external revolver draw or equity cure. Debt paydown is floored at $0 for those periods.
            </p>
          </div>
        </div>
      )}

      {/* Multi-Year Projection & Debt Schedule Table */}
      <div className="p-5 sm:p-7 bg-paper-raised border border-line rounded-card shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-line gap-1">
          <h4 className="font-serif text-base font-semibold text-ink">
            Operating projection and debt amortization schedule ($M)
          </h4>
          <span className="text-[10px] font-mono text-ink-faint">
            ← Swipe table horizontally →
          </span>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full text-right text-xs border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-line text-[11px] font-mono uppercase text-ink-muted bg-paper/50">
                <th className="p-3 text-left">Line Item ($M)</th>
                {result.schedule.map((yr) => (
                  <th key={yr.year} className="p-3 text-right font-mono">
                    Year {yr.year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line/40">
                <td className="p-2.5 text-left font-medium text-ink">Revenue</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums">
                    {formatCurrency(yr.revenue, "USD_millions", 1)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 bg-paper/30 font-semibold">
                <td className="p-2.5 text-left text-ink">EBITDA</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums text-accent font-bold">
                    {formatCurrency(yr.ebitda, "USD_millions", 1)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 text-ink-muted">
                <td className="p-2.5 text-left">(-) D&amp;A / CapEx</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums">
                    {formatCurrency(yr.dAndA, "USD_millions", 1)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 text-ink-muted">
                <td className="p-2.5 text-left">(-) Interest Expense</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums text-negative">
                    {formatCurrency(yr.interest, "USD_millions", 1)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 text-ink-muted">
                <td className="p-2.5 text-left">(-) Cash Taxes</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums">
                    {formatCurrency(yr.tax, "USD_millions", 1)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 font-semibold bg-accent-light/30">
                <td className="p-2.5 text-left text-ink">CFADS (Cash Available)</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums text-ink font-bold">
                    {formatCurrency(yr.cfads, "USD_millions", 1)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40">
                <td className="p-2.5 text-left text-ink-muted">Debt Paydown</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums text-accent font-semibold">
                    {formatCurrency(yr.debtPaydown, "USD_millions", 1)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line bg-paper/40 font-bold">
                <td className="p-2.5 text-left text-ink">Ending Debt Balance</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums text-ink">
                    {formatCurrency(yr.debtEnding, "USD_millions", 1)}
                  </td>
                ))}
              </tr>
              {result.schedule.some((yr) => yr.cashAccumulated > 0) && (
                <tr className="border-b border-line/40 text-accent font-semibold">
                  <td className="p-2.5 text-left">(+) Cash Accumulated</td>
                  {result.schedule.map((yr) => (
                    <td key={yr.year} className="p-2.5 font-serif tabular-nums">
                      {formatCurrency(yr.cashAccumulated, "USD_millions", 1)}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Value Creation Attribution Bridge Waterfall */}
      <LBOWaterfallChart bridge={result.bridge} currencyUnit="USD_millions" />

      {/* 2-Axis Sensitivity Heatmap */}
      <SensitivityHeatmap
        exitMultiples={sensitivity.exitMultiples}
        cagrValues={sensitivity.cagrValues}
        matrix={sensitivity.matrix}
      />
    </div>
  );
}
