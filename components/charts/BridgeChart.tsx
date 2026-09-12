"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/finance/format";

interface BridgeStep {
  label: string;
  amount: number; // positive = starting or ending bar; negative = deduction
  type: "total" | "deduction" | "addition";
  subtext?: string;
}

interface BridgeChartProps {
  title: string;
  subtitle?: string;
  steps: BridgeStep[];
  unit?: "USD_millions" | "USD_billions";
  accentColor?: string;
}

export default function BridgeChart({
  title,
  subtitle,
  steps,
  unit = "USD_millions",
  accentColor = "#145348",
}: BridgeChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Determine running totals to position the waterfall blocks
  let runningTotal = 0;
  const computedSteps = steps.map((step) => {
    if (step.type === "total") {
      const top = step.amount;
      runningTotal = step.amount;
      return {
        ...step,
        startVal: 0,
        endVal: top,
        heightVal: top,
        isPositive: true,
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
        isPositive: step.amount >= 0,
      };
    }
  });

  const maxVal = Math.max(...steps.map((s) => Math.abs(s.amount)), runningTotal) * 1.15;
  const chartHeight = 260;
  const chartWidth = 740;
  const barWidth = 68;
  const barGap = (chartWidth - barWidth * steps.length) / (steps.length + 1);

  return (
    <div className="p-5 sm:p-7 bg-paper-raised border border-line rounded-card my-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-line gap-1">
        <div>
          <h3 className="font-serif text-lg font-semibold text-ink">{title}</h3>
          {subtitle && <p className="text-xs text-ink-muted mt-0.5">{subtitle}</p>}
        </div>
        <span className="font-mono text-[11px] text-ink-faint self-start sm:self-auto">
          Interactive Step-Down Bridge
        </span>
      </div>

      {/* Mobile Swipe Notice */}
      <div className="block sm:hidden text-[10px] font-mono text-ink-faint mb-2 text-right">
        ← Swipe chart horizontally →
      </div>

      <div className="w-full overflow-x-auto no-scrollbar pb-2">
        <div className="min-w-[640px]">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight + 60}`}
            className="w-full h-auto overflow-visible"
          >
            {/* Horizontal baseline */}
            <line
              x1="10"
              y1={chartHeight}
              x2={chartWidth - 10}
              y2={chartHeight}
              stroke="#DCE0D6"
              strokeWidth="1.5"
            />

            {/* Steps & Bars */}
            {computedSteps.map((step, idx) => {
              const x = barGap + idx * (barWidth + barGap);
              const barH = (step.heightVal / maxVal) * (chartHeight - 40);
              const y = chartHeight - (step.endVal / maxVal) * (chartHeight - 40);
              const isHovered = hoveredIdx === idx;

              let fillColor = accentColor;
              if (step.type === "deduction") {
                fillColor = "#A33B32"; // Restrained brick red
              } else if (step.type === "addition") {
                fillColor = "#1E6B52"; // Positive green
              }

              return (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="cursor-pointer transition-opacity"
                  opacity={hoveredIdx === null || isHovered ? 1 : 0.55}
                >
                  {/* Connecting dash line from previous step */}
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

                  {/* Step Rect */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={Math.max(4, barH)}
                    fill={fillColor}
                    rx="3"
                    className="transition-all duration-200"
                  />

                  {/* Top Value Label */}
                  <text
                    x={x + barWidth / 2}
                    y={Math.max(16, y - 8)}
                    textAnchor="middle"
                    className="font-serif text-xs font-semibold fill-ink tabular-nums"
                  >
                    {step.type === "deduction" ? "−" : step.type === "addition" ? "+" : ""}
                    {formatCurrency(Math.abs(step.amount), unit, 1)}
                  </text>

                  {/* Step Name X-Axis Label */}
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 18}
                    textAnchor="middle"
                    className="font-sans text-[11px] font-semibold fill-ink"
                  >
                    {step.label}
                  </text>

                  {/* Subtext */}
                  {step.subtext && (
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight + 32}
                      textAnchor="middle"
                      className="font-mono text-[9px] fill-ink-muted"
                    >
                      {step.subtext}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
