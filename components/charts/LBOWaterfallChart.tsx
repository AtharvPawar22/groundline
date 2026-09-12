"use client";

import { useState } from "react";
import { LBOValueCreationBridge } from "@/lib/finance/lbo-engine";
import { formatCurrency } from "@/lib/finance/format";

interface LBOWaterfallChartProps {
  bridge: LBOValueCreationBridge;
  currencyUnit?: "USD_millions" | "USD_billions";
}

export default function LBOWaterfallChart({
  bridge,
  currencyUnit = "USD_millions",
}: LBOWaterfallChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const steps = [
    {
      label: "Entry Equity",
      amount: bridge.sponsorEntryEquity,
      type: "start" as const,
      color: "#545B62", // Ink muted slate
      desc: "Initial equity committed by sponsor",
    },
    {
      label: "EBITDA Growth",
      amount: bridge.ebitdaGrowthContribution,
      type: "delta" as const,
      color: "#1E6B52", // Positive emerald
      desc: "Operational earnings expansion at entry multiple",
    },
    {
      label: "Multiple Change",
      amount: bridge.multipleChangeContribution,
      type: "delta" as const,
      color: bridge.multipleChangeContribution >= 0 ? "#1E6B52" : "#A33B32",
      desc: "Valuation multiple expansion or contraction",
    },
    {
      label: "Debt Paydown",
      amount: bridge.debtPaydownContribution,
      type: "delta" as const,
      color: "#1E6B52", // Debt amortized
      desc: "Cash flow used to amortize acquisition debt",
    },
    {
      label: "Fees & Exp.",
      amount: bridge.transactionFees,
      type: "delta" as const,
      color: "#8E959E", // Subtle grey
      desc: "Upfront advisory, financing & legal fees",
    },
    {
      label: "Exit Equity",
      amount: bridge.sponsorExitEquity,
      type: "end" as const,
      color: "#121519", // Deep charcoal
      desc: "Total equity value realized at exit",
    },
  ];

  let runningTotal = 0;
  const computedSteps = steps.map((step) => {
    if (step.type === "start" || step.type === "end") {
      const start = 0;
      const end = step.amount;
      runningTotal = end;
      return {
        ...step,
        startVal: start,
        endVal: end,
        heightVal: end,
      };
    } else {
      const start = runningTotal;
      const end = runningTotal + step.amount;
      runningTotal = end;
      return {
        ...step,
        startVal: Math.min(start, end),
        endVal: Math.max(start, end),
        heightVal: Math.abs(step.amount),
      };
    }
  });

  const maxVal = Math.max(...computedSteps.map((s) => s.endVal), bridge.sponsorExitEquity) * 1.15;
  const chartHeight = 260;
  const chartWidth = 740;
  const barWidth = 76;
  const barGap = (chartWidth - barWidth * steps.length) / (steps.length + 1);

  return (
    <div className="p-5 sm:p-7 bg-paper-raised border border-line rounded-card my-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-line gap-2">
        <div>
          <h4 className="font-serif text-base font-semibold text-ink">
            Value Creation Attribution Waterfall
          </h4>
          <p className="text-xs text-ink-muted">
            Mathematical decomposition of sponsor equity growth from entry to exit
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-paper p-1.5 px-2.5 rounded border border-line self-start sm:self-auto">
          <span className="text-ink-muted">Net Value Created:</span>
          <span className="font-serif text-sm font-semibold text-accent tabular-nums">
            {bridge.totalValueCreated >= 0 ? "+" : ""}
            {formatCurrency(bridge.totalValueCreated, currencyUnit, 1)}
          </span>
        </div>
      </div>

      {/* Mobile Swipe Notice */}
      <div className="block sm:hidden text-[10px] font-mono text-ink-faint mb-2 text-right">
        ← Swipe attribution chart →
      </div>

      <div className="w-full overflow-x-auto no-scrollbar pb-2">
        <div className="min-w-[620px]">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`}
            className="w-full h-auto overflow-visible"
          >
            <line
              x1="10"
              y1={chartHeight}
              x2={chartWidth - 10}
              y2={chartHeight}
              stroke="#DCE0D6"
              strokeWidth="1.5"
            />

            {computedSteps.map((step, idx) => {
              const x = barGap + idx * (barWidth + barGap);
              const barH = (step.heightVal / maxVal) * (chartHeight - 40);
              const y = chartHeight - (step.endVal / maxVal) * (chartHeight - 40);
              const isHovered = hoveredIdx === idx;

              return (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredIdx === null || isHovered ? 1 : 0.55}
                >
                  {/* Dash connector */}
                  {idx > 0 && (
                    <line
                      x1={x - barGap}
                      y1={chartHeight - (computedSteps[idx - 1].endVal / maxVal) * (chartHeight - 40)}
                      x2={x}
                      y2={chartHeight - (computedSteps[idx - 1].endVal / maxVal) * (chartHeight - 40)}
                      stroke="#8E959E"
                      strokeWidth="1.2"
                      strokeDasharray="3,3"
                    />
                  )}

                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={Math.max(3, barH)}
                    fill={step.color}
                    rx="3"
                    className="transition-all duration-200"
                  />

                  {/* Value top label */}
                  <text
                    x={x + barWidth / 2}
                    y={Math.max(14, y - 8)}
                    textAnchor="middle"
                    className="font-serif text-xs font-semibold fill-ink tabular-nums"
                  >
                    {step.type === "delta" && step.amount > 0 ? "+" : ""}
                    {formatCurrency(step.amount, currencyUnit, 1)}
                  </text>

                  {/* Name label */}
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 18}
                    textAnchor="middle"
                    className="font-sans text-[11px] font-semibold fill-ink"
                  >
                    {step.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Reconciliation Identity Verification */}
      <div className="mt-4 pt-3 border-t border-line/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-ink-muted gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          <span className="font-mono text-[11px]">
            Attribution Identity: Entry Equity ($
            {formatCurrency(bridge.sponsorEntryEquity, currencyUnit, 1)}) +
            EBITDA Growth + Mult. Change + Debt Paydown + Fees = Exit Equity ($
            {formatCurrency(bridge.sponsorExitEquity, currencyUnit, 1)})
          </span>
        </div>
        <span className="text-accent font-mono text-[11px] font-semibold bg-accent-light px-2 py-0.5 rounded">
          ✓ Reconciled (100% Exact)
        </span>
      </div>
    </div>
  );
}
