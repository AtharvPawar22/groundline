"use client";

import { useState } from "react";
import { SourcedValue, Period } from "@/lib/types/schema";
import { formatMetricValue, formatPercent } from "@/lib/finance/format";

export interface StatementRow {
  metricId: string;
  label: string;
  unit: SourcedValue["unit"];
  isHeader?: boolean;
  isSubtotal?: boolean;
}

interface FinancialsTableProps {
  companyTicker: string;
  periods: Period[];
  rows: StatementRow[];
  values: SourcedValue[];
}

export default function FinancialsTable({
  companyTicker,
  periods,
  rows,
  values,
}: FinancialsTableProps) {
  const [viewMode, setViewMode] = useState<"summary" | "full">("full");

  // Map values for O(1) lookup
  const valueMap = new Map<string, SourcedValue>();
  values.forEach((v) => {
    valueMap.set(`${v.metricId}_${v.periodId}`, v);
  });

  const latestPeriod = periods[periods.length - 1];
  const priorPeriod = periods.length > 1 ? periods[periods.length - 2] : null;

  return (
    <div className="bg-paper-raised border border-line rounded-card my-6 overflow-hidden shadow-xs">
      {/* Table Controls Header */}
      <div className="px-4 py-3 bg-paper-subtle/70 border-b border-line flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-ink">View Presentation:</span>
          <div className="inline-flex rounded-control bg-paper border border-line p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("summary")}
              className={`px-3 py-1 text-xs font-mono rounded-control transition-all cursor-pointer ${
                viewMode === "summary"
                  ? "bg-accent text-paper-raised font-semibold shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Summary (Latest &amp; YoY)
            </button>
            <button
              type="button"
              onClick={() => setViewMode("full")}
              className={`px-3 py-1 text-xs font-mono rounded-control transition-all cursor-pointer ${
                viewMode === "full"
                  ? "bg-accent text-paper-raised font-semibold shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Full 5-Year History ({periods.length} FYs)
            </button>
          </div>
        </div>

        {viewMode === "full" && (
          <span className="sm:hidden text-[11px] font-mono text-accent font-medium self-end">
            ← Swipe table horizontally →
          </span>
        )}
      </div>

      {viewMode === "full" ? (
        /* Full 5-Year History Table */
        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-line bg-paper/60">
                <th className="p-3.5 pl-4 text-xs font-mono uppercase tracking-wider text-ink-muted sticky left-0 bg-paper/98 backdrop-blur-md z-10 w-64 border-r border-line shadow-[2px_0_4px_-2px_rgba(0,0,0,0.05)]">
                  Financial Line Item
                </th>
                {periods.map((p) => (
                  <th
                    key={p.id}
                    className="p-3.5 text-right font-mono text-xs font-semibold text-ink border-r border-line/40 last:border-r-0"
                  >
                    <div>{p.label}</div>
                    <div className="text-[10px] font-normal text-ink-faint">
                      {p.periodEnd}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => {
                if (row.isHeader) {
                  return (
                    <tr key={rowIdx} className="bg-paper-subtle/70 border-b border-line">
                      <td
                        colSpan={periods.length + 1}
                        className="p-2.5 pl-4 text-[11px] font-mono uppercase tracking-widest text-ink font-bold"
                      >
                        {row.label}
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr
                    key={rowIdx}
                    className={`border-b border-line/40 hover:bg-paper/40 transition-colors ${
                      row.isSubtotal ? "bg-paper/30 font-semibold" : ""
                    }`}
                  >
                    <td className="p-3 pl-4 text-xs text-ink sticky left-0 bg-paper-raised/98 backdrop-blur-md z-10 border-r border-line shadow-[2px_0_4px_-2px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center justify-between pr-2">
                        <span className={row.isSubtotal ? "font-bold text-ink" : "font-normal text-ink-muted group-hover:text-ink"}>
                          {row.label}
                        </span>
                      </div>
                    </td>

                    {periods.map((p) => {
                      const sourced = valueMap.get(`${row.metricId}_${p.id}`);
                      const val = sourced?.value;

                      return (
                        <td
                          key={p.id}
                          className={`p-3 text-right font-serif text-xs tabular-nums border-r border-line/30 last:border-r-0 ${
                            row.isSubtotal ? "font-bold text-ink" : "text-ink font-normal"
                          }`}
                        >
                          {val !== undefined ? (
                            formatMetricValue(val, row.unit)
                          ) : (
                            <span className="text-ink-faint">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Summary (Latest FY, Prior FY, YoY Change) Table */
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-line bg-paper/60 text-xs font-mono uppercase text-ink-muted">
                <th className="p-3.5 pl-4">Financial Line Item</th>
                {priorPeriod && (
                  <th className="p-3.5 text-right font-semibold text-ink">
                    <div>{priorPeriod.label.split(" ")[0]}</div>
                    <div className="text-[10px] font-normal text-ink-faint">{priorPeriod.periodEnd}</div>
                  </th>
                )}
                {latestPeriod && (
                  <th className="p-3.5 text-right font-semibold text-accent">
                    <div>{latestPeriod.label.split(" ")[0]} (Latest)</div>
                    <div className="text-[10px] font-normal text-ink-faint">{latestPeriod.periodEnd}</div>
                  </th>
                )}
                <th className="p-3.5 pr-4 text-right font-semibold text-ink">YoY Change</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => {
                if (row.isHeader) {
                  return (
                    <tr key={rowIdx} className="bg-paper-subtle/70 border-b border-line">
                      <td
                        colSpan={priorPeriod ? 4 : 3}
                        className="p-2.5 pl-4 text-[11px] font-mono uppercase tracking-widest text-ink font-bold"
                      >
                        {row.label}
                      </td>
                    </tr>
                  );
                }

                const latestVal = latestPeriod ? valueMap.get(`${row.metricId}_${latestPeriod.id}`)?.value : undefined;
                const priorVal = priorPeriod ? valueMap.get(`${row.metricId}_${priorPeriod.id}`)?.value : undefined;

                let yoyGrowth: number | null = null;
                let yoyDiff: number | null = null;

                if (latestVal !== undefined && priorVal !== undefined) {
                  if (row.unit === "percent") {
                    yoyDiff = (latestVal - priorVal) * 10000; // in basis points or direct pts
                  } else if (priorVal !== 0) {
                    yoyGrowth = (latestVal - priorVal) / Math.abs(priorVal);
                  }
                }

                return (
                  <tr
                    key={rowIdx}
                    className={`border-b border-line/40 hover:bg-paper/40 transition-colors ${
                      row.isSubtotal ? "bg-paper/30 font-semibold" : ""
                    }`}
                  >
                    <td className="p-3 pl-4 text-xs text-ink">
                      <span className={row.isSubtotal ? "font-bold text-ink" : "text-ink-muted"}>
                        {row.label}
                      </span>
                    </td>

                    {priorPeriod && (
                      <td className="p-3 text-right font-serif text-xs tabular-nums text-ink-muted">
                        {priorVal !== undefined ? formatMetricValue(priorVal, row.unit) : "—"}
                      </td>
                    )}

                    {latestPeriod && (
                      <td className="p-3 text-right font-serif text-xs tabular-nums font-bold text-ink">
                        {latestVal !== undefined ? formatMetricValue(latestVal, row.unit) : "—"}
                      </td>
                    )}

                    <td className="p-3 pr-4 text-right font-mono text-xs tabular-nums">
                      {row.unit === "percent" && yoyDiff !== null ? (
                        <span className={yoyDiff >= 0 ? "text-positive font-semibold" : "text-negative font-semibold"}>
                          {yoyDiff >= 0 ? "+" : ""}{(yoyDiff / 100).toFixed(1)}% pts
                        </span>
                      ) : yoyGrowth !== null ? (
                        <span className={yoyGrowth >= 0 ? "text-positive font-semibold" : "text-negative font-semibold"}>
                          {yoyGrowth >= 0 ? "+" : ""}{formatPercent(yoyGrowth, 1)}
                        </span>
                      ) : (
                        <span className="text-ink-faint">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
