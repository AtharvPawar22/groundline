"use client";

import { useState } from "react";
import { CompanySegments } from "@/lib/types/schema";
import { formatCurrency, formatPercent } from "@/lib/finance/format";

interface SegmentBreakdownChartProps {
  segmentsData: CompanySegments;
  accentColor?: string;
  unit?: "USD_millions" | "USD_billions";
}

export default function SegmentBreakdownChart({
  segmentsData,
  accentColor = "#145348",
  unit = "USD_millions",
}: SegmentBreakdownChartProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const colors = [
    accentColor,
    "#1A3D63", // Navy
    "#545B62", // Muted slate
    "#8B242D", // Crimson
    "#607274", // Neutral olive
  ];

  return (
    <div className="p-5 sm:p-7 bg-paper-raised border border-line rounded-card my-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-line gap-1">
        <div>
          <h4 className="font-serif text-base font-semibold text-ink">
            Revenue &amp; Business Segment Breakdown
          </h4>
          <p className="text-xs text-ink-muted">
            {segmentsData.periodLabel} Reported Mix ({segmentsData.periodEnd})
          </p>
        </div>
        <span className="font-mono text-[11px] text-ink-faint">
          Hover to isolate segment
        </span>
      </div>

      {/* Segment Proportional Bar */}
      <div className="w-full h-8 bg-paper rounded-control overflow-hidden flex border border-line mb-6 p-0.5">
        {segmentsData.segments.map((seg, idx) => {
          const widthPct = `${(seg.percentage * 100).toFixed(1)}%`;
          const isSelected = selectedIdx === idx;

          return (
            <div
              key={idx}
              style={{
                width: widthPct,
                backgroundColor: colors[idx % colors.length],
              }}
              onMouseEnter={() => setSelectedIdx(idx)}
              onMouseLeave={() => setSelectedIdx(null)}
              className={`h-full rounded-xs transition-all duration-200 cursor-pointer relative group ${
                selectedIdx !== null && !isSelected ? "opacity-35" : "opacity-100"
              }`}
              title={`${seg.segmentName}: ${formatPercent(seg.percentage, 1)}`}
            />
          );
        })}
      </div>

      {/* Detailed Segment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {segmentsData.segments.map((seg, idx) => {
          const isSelected = selectedIdx === idx;
          const color = colors[idx % colors.length];

          return (
            <div
              key={idx}
              onMouseEnter={() => setSelectedIdx(idx)}
              onMouseLeave={() => setSelectedIdx(null)}
              className={`p-4 rounded-card border transition-all cursor-pointer ${
                isSelected
                  ? "bg-paper-raised border-ink shadow-sm ring-1 ring-ink/10"
                  : "bg-paper/50 border-line hover:border-line-strong hover:bg-paper"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-xs shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-sans text-xs font-semibold text-ink leading-tight">
                    {seg.segmentName}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-serif text-sm font-semibold text-ink tabular-nums">
                    {formatCurrency(seg.revenue, unit, 1)}
                  </span>
                  <span className="text-[11px] font-mono text-ink-muted ml-1.5">
                    ({formatPercent(seg.percentage, 1)})
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-ink-muted leading-relaxed pl-5">
                {seg.description}
              </p>

              {seg.growthYoY !== undefined && (
                <div className="mt-2 pt-2 border-t border-line/40 pl-5 text-[10px] font-mono text-positive font-semibold">
                  YoY Segment Growth: {formatPercent(seg.growthYoY, 1, true)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
