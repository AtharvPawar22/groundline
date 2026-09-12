"use client";

import { useState } from "react";
import { formatRatio } from "@/lib/finance/format";
import CompanyLogo from "../common/CompanyLogo";

interface PeerBarItem {
  name: string;
  ticker: string;
  value: number | null;
  isCurrentCompany?: boolean;
}

interface PeerBarChartProps {
  title: string;
  metricLabel: string;
  items: PeerBarItem[];
  accentColor?: string;
  suffix?: string;
}

export default function PeerBarChart({
  title,
  metricLabel,
  items,
  accentColor = "#145348",
  suffix = "x",
}: PeerBarChartProps) {
  const [hoveredTicker, setHoveredTicker] = useState<string | null>(null);

  const validValues = items
    .map((i) => i.value)
    .filter((v): v is number => v !== null && v > 0);
  const maxVal = Math.max(...validValues, 1) * 1.12;

  return (
    <div className="p-5 sm:p-7 bg-paper-raised border border-line rounded-card my-6 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-line">
        <h4 className="font-serif text-base font-semibold text-ink">{title}</h4>
        <span className="font-mono text-xs text-ink-muted bg-paper px-2 py-0.5 rounded border border-line">
          {metricLabel}
        </span>
      </div>

      <div className="space-y-3.5">
        {items.map((item) => {
          const isCurrent = item.isCurrentCompany;
          const isHovered = hoveredTicker === item.ticker;
          const barWidth =
            item.value !== null && item.value > 0
              ? `${Math.max(4, (item.value / maxVal) * 100)}%`
              : "0%";

          return (
            <div
              key={item.ticker}
              onMouseEnter={() => setHoveredTicker(item.ticker)}
              onMouseLeave={() => setHoveredTicker(null)}
              className={`p-3 rounded-control transition-all cursor-pointer ${
                isHovered
                  ? "bg-paper border border-line shadow-xs"
                  : isCurrent
                  ? "bg-accent-light/50 border border-accent/30"
                  : "bg-paper/30 border border-transparent"
              }`}
            >
              <div className="flex justify-between items-center text-xs mb-1.5 font-sans">
                <div className="flex items-center gap-2">
                  <CompanyLogo ticker={item.ticker} size="sm" />
                  <span
                    className={`font-semibold ${
                      isCurrent ? "text-ink font-bold" : "text-ink-muted"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">
                    ({item.ticker})
                  </span>
                  {isCurrent && (
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 bg-accent text-paper-raised rounded-xs font-semibold">
                      Subject
                    </span>
                  )}
                </div>

                <span className="font-serif text-sm font-semibold text-ink tabular-nums">
                  {item.value !== null ? formatRatio(item.value, 1, suffix) : "N/A"}
                </span>
              </div>

              {/* Horizontal Bar */}
              <div className="w-full h-3 bg-paper rounded-xs overflow-hidden border border-line/50 p-0.5">
                <div
                  style={{
                    width: barWidth,
                    backgroundColor: isCurrent ? accentColor : "#545B62",
                  }}
                  className={`h-full rounded-xs transition-all duration-300 ${
                    !isCurrent && !isHovered ? "opacity-60" : "opacity-100"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
