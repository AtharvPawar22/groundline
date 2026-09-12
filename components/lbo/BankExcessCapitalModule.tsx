"use client";

import { useState, useMemo } from "react";
import { Company } from "@/lib/types/schema";
import { runBankEconomicsModel, BankEconomicsInputs } from "@/lib/finance/bank-economics-engine";
import { formatCurrency, formatPercent } from "@/lib/finance/format";
import LBOInputSlider from "./LBOInputSlider";
import { Landmark, AlertTriangle, RefreshCw, TrendingUp, ShieldCheck } from "lucide-react";

interface BankExcessCapitalModuleProps {
  company: Company;
  startingTce: number; // in billions ($286.1B)
  currentCet1: number; // 0.148 (14.8%)
  rwa: number; // in billions ($1,900B)
  sharePrice: number; // $355.32
  sharesOutstanding: number; // 2.66B
  priceToTangibleBook: number; // 2.33x
}

export default function BankExcessCapitalModule({
  company,
  startingTce = 286.1,
  currentCet1 = 0.148,
  rwa = 1900.0,
  sharePrice = 355.32,
  sharesOutstanding = 2.66,
  priceToTangibleBook = 2.33,
}: BankExcessCapitalModuleProps) {
  // Interactive state
  const [rotceAssumption, setRotceAssumption] = useState(0.20); // 20.0%
  const [dividendPayout, setDividendPayout] = useState(0.30); // 30.0%
  const [buybackPayout, setBuybackPayout] = useState(0.35); // 35.0%
  const [targetCet1, setTargetCet1] = useState(0.130); // 13.0%

  const inputs: BankEconomicsInputs = {
    startingTangibleCommonEquity: startingTce,
    targetRotce: rotceAssumption,
    dividendPayoutRatio: dividendPayout,
    buybackPayoutRatio: buybackPayout,
    currentCet1Ratio: currentCet1,
    targetCet1Ratio: targetCet1,
    regulatoryFloorCet1: 0.115, // 11.5% Basel III minimum floor
    riskWeightedAssets: rwa,
    priceToTangibleBook,
    sharesOutstanding,
    sharePrice,
    holdPeriod: 5,
  };

  const result = useMemo(() => runBankEconomicsModel(inputs), [inputs]);

  const resetDefaults = () => {
    setRotceAssumption(0.20);
    setDividendPayout(0.30);
    setBuybackPayout(0.35);
    setTargetCet1(0.130);
  };

  return (
    <div className="space-y-8 my-6">
      {/* Editorial Explainer Panel */}
      <div className="p-5 sm:p-7 bg-paper-raised border-l-4 border-accent-jpm border border-line rounded-card shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-ink font-serif text-base sm:text-lg font-semibold">
          <Landmark className="w-5 h-5 text-accent-jpm shrink-0" />
          <span>Why Commercial Banks Do Not Receive Standard Leveraged Buyouts</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ink leading-relaxed pt-3 border-t border-line/60">
          <div className="p-3.5 bg-paper rounded-card border border-line/60">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent-jpm font-bold block mb-1">
              1. Deposits Are Operational Funding
            </span>
            <p className="text-ink-muted">
              A standard LBO layers debt onto an enterprise. A bank is already leveraged by design: customer deposits are balance sheet liabilities that fund lending operations rather than discretionary financial debt.
            </p>
          </div>
          <div className="p-3.5 bg-paper rounded-card border border-line/60">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent-jpm font-bold block mb-1">
              2. Regulatory Capital Constraints
            </span>
            <p className="text-ink-muted">
              Banks operate under binding Basel III capital minimums (CET1, Tier 1, Total Capital). Cash flow cannot simply be swept to amortize buyout debt; capital must be preserved against Risk-Weighted Assets.
            </p>
          </div>
          <div className="p-3.5 bg-paper rounded-card border border-line/60">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent-jpm font-bold block mb-1">
              3. Bank Holding Company Act
            </span>
            <p className="text-ink-muted">
              Any change of control of a Global Systemically Important Bank requires explicit Federal Reserve approval, precluding hostile or high-leverage private equity take-private buyouts.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Interactive Inputs (5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <h3 className="font-serif text-base font-semibold text-ink">
              Capital Distribution Levers
            </h3>
            <button
              type="button"
              onClick={resetDefaults}
              className="text-[11px] font-mono text-ink-muted hover:text-ink flex items-center gap-1 cursor-pointer bg-paper px-2 py-1 rounded border border-line"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-3">
            <LBOInputSlider
              label="Return on Tangible Equity (ROTCE)"
              sublabel="Core bank capital generation rate"
              value={rotceAssumption}
              min={0.10}
              max={0.30}
              step={0.005}
              unit="percent"
              onChange={setRotceAssumption}
            />

            <LBOInputSlider
              label="Dividend Payout Ratio"
              sublabel="% of annual net income distributed as cash"
              value={dividendPayout}
              min={0.10}
              max={0.60}
              step={0.01}
              unit="percent"
              onChange={setDividendPayout}
            />

            <LBOInputSlider
              label="Share Repurchase Payout Ratio"
              sublabel="% of annual net income deployed to buybacks"
              value={buybackPayout}
              min={0.0}
              max={0.60}
              step={0.01}
              unit="percent"
              onChange={setBuybackPayout}
            />

            <LBOInputSlider
              label="Management Target CET1 Ratio"
              sublabel="Target capital ratio (Regulatory floor = 11.5%)"
              value={targetCet1}
              min={0.11}
              max={0.16}
              step={0.001}
              unit="percent"
              onChange={setTargetCet1}
              warning={
                result.cet1Constraint.isViolatingFloor
                  ? "Target CET1 violates Basel III regulatory minimum floor of 11.5%!"
                  : undefined
              }
            />
          </div>

          <div className="p-3.5 bg-paper rounded-card text-xs space-y-1.5 border border-line/70 font-mono text-ink-muted">
            <div className="flex justify-between">
              <span>Retained Capital Ratio:</span>
              <span className="font-bold text-ink">
                {formatPercent(1 - dividendPayout - buybackPayout, 1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Current Standardized CET1:</span>
              <span className="font-bold text-accent-jpm">14.8%</span>
            </div>
            <div className="flex justify-between">
              <span>CET1 Buffer Above Target:</span>
              <span className="font-bold text-ink">
                {formatPercent(result.cet1Constraint.bufferAboveTarget, 1)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Outputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Return Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted block font-semibold">
                5-Yr Capital Returned to Shareholders
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-normal text-ink tabular-nums mt-1">
                ${result.summary.cumulativeCapitalReturned.toFixed(1)}B
              </div>
              <span className="text-xs text-ink-muted block mt-1.5 pt-1.5 border-t border-line/50">
                Dividends (${result.summary.cumulativeDividends.toFixed(1)}B) + Buybacks ($
                {result.summary.cumulativeBuybacks.toFixed(1)}B)
              </span>
            </div>

            <div className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted block font-semibold">
                Ending Tangible Book / Share
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-normal text-accent-jpm tabular-nums mt-1">
                ${result.summary.endingTbvPerShare.toFixed(2)}
              </div>
              <span className="text-xs text-ink-muted block mt-1.5 pt-1.5 border-t border-line/50">
                Compounded at {formatPercent(result.summary.tbvCagr, 1)} CAGR from current $107.56
              </span>
            </div>
          </div>

          {/* Implied Share Price Card */}
          <div className="p-5 sm:p-6 bg-paper-raised border border-line rounded-card shadow-xs text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 mb-3.5 border-b border-line gap-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <h4 className="font-serif text-sm font-semibold text-ink">
                  Implied 5-Year Equity Valuation at Constant Multiple
                </h4>
              </div>
              <span className="font-mono text-[11px] text-ink-muted">
                Assumes constant {priceToTangibleBook.toFixed(2)}x Price/Tangible Book
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-paper/60 p-4 rounded-card border border-line/60">
              <div>
                <span className="text-ink-muted block text-xs">5-Year Implied Share Price:</span>
                <span className="font-serif text-3xl font-bold text-ink tabular-nums">
                  ${result.summary.endingImpliedSharePrice.toFixed(2)}
                </span>
                <span className="text-xs font-mono text-ink-muted ml-2">
                  (vs. current ${sharePrice.toFixed(2)})
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-ink-muted block text-xs">Implied Equity Value CAGR:</span>
                <span className="font-serif text-xl font-bold text-accent tabular-nums">
                  {formatPercent(result.summary.impliedSharePriceCagr, 1, true)} / yr
                </span>
              </div>
            </div>
          </div>

          {/* Excess Capital Note */}
          <div className="p-4 sm:p-5 bg-paper-raised border border-line rounded-card shadow-xs text-xs space-y-2">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="font-bold text-ink uppercase tracking-wider">
                Regulatory Excess Capital Calculation
              </span>
              <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[10px] font-semibold">
                Target Pending Official Disclosure
              </span>
            </div>
            <p className="text-ink-muted leading-relaxed">
              Excess Capital = (Current CET1 {formatPercent(currentCet1, 1)} − Target CET1{" "}
              {formatPercent(targetCet1, 1)}) × RWA (${rwa}B) ={" "}
              <strong className="text-ink font-serif tabular-nums text-sm font-bold">
                ${result.summary.excessCapitalDollar.toFixed(1)} Billion
              </strong>
              . This represents discretionary capital JPMorgan could distribute or deploy into asset growth while preserving management&apos;s capital cushion.
            </p>
          </div>
        </div>
      </div>

      {/* Year by Year Bank Projection Schedule */}
      <div className="p-5 sm:p-7 bg-paper-raised border border-line rounded-card shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-line gap-1">
          <h4 className="font-serif text-base font-semibold text-ink">
            5-Year Tangible Common Equity &amp; Distribution Schedule ($B)
          </h4>
          <span className="text-[10px] font-mono text-ink-faint">
            ← Swipe table horizontally →
          </span>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full text-right text-xs border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-line text-[11px] font-mono uppercase text-ink-muted bg-paper/50">
                <th className="p-3 text-left">Line Item ($B)</th>
                {result.schedule.map((yr) => (
                  <th key={yr.year} className="p-3 text-right font-mono">
                    Year {yr.year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line/40">
                <td className="p-2.5 text-left font-medium text-ink">Beginning Tangible Common Equity</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums">
                    ${yr.beginningTce.toFixed(1)}B
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 bg-accent-light/30 font-semibold">
                <td className="p-2.5 text-left text-ink">Net Income ({formatPercent(rotceAssumption, 1)} ROTCE)</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums text-accent-jpm font-bold">
                    ${yr.netIncome.toFixed(1)}B
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 text-ink-muted">
                <td className="p-2.5 text-left">(-) Dividends Paid ({formatPercent(dividendPayout, 0)})</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums">
                    ${yr.dividendsPaid.toFixed(1)}B
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 text-ink-muted">
                <td className="p-2.5 text-left">(-) Share Repurchases ({formatPercent(buybackPayout, 0)})</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums">
                    ${yr.buybacksPaid.toFixed(1)}B
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 text-accent font-semibold">
                <td className="p-2.5 text-left">(+) Retained Capital Reinvested</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums">
                    ${yr.retainedCapital.toFixed(1)}B
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line bg-paper/40 font-bold">
                <td className="p-2.5 text-left text-ink">Ending Tangible Common Equity</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums text-ink">
                    ${yr.endingTce.toFixed(1)}B
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line/40 text-ink-muted">
                <td className="p-2.5 text-left">Diluted Shares Outstanding (B)</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums">
                    {yr.sharesRemaining.toFixed(2)}B
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line bg-accent-light/40 font-bold">
                <td className="p-2.5 text-left text-ink">Tangible Book Value Per Share ($)</td>
                {result.schedule.map((yr) => (
                  <td key={yr.year} className="p-2.5 font-serif tabular-nums text-accent-jpm text-sm font-bold">
                    ${yr.tbvPerShare.toFixed(2)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
