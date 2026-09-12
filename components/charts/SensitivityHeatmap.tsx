"use client";

import { useState } from "react";
import { LBOSensitivityCell } from "@/lib/finance/lbo-engine";
import { formatPercent, formatRatio } from "@/lib/finance/format";

interface SensitivityHeatmapProps {
  exitMultiples: number[];
  cagrValues: number[];
  matrix: LBOSensitivityCell[][];
}

export default function SensitivityHeatmap({
  exitMultiples,
  cagrValues,
  matrix,
}: SensitivityHeatmapProps) {
  const [metricType, setMetricType] = useState<"moic" | "irr">("moic");
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  // Calculate min and max for single-hue sequential shading
  const allValues = matrix.flatMap((row) =>
    row.map((cell) => (metricType === "moic" ? cell.moic : cell.irr))
  );
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const range = maxVal - minVal || 1;

  // Single-hue sequential opacity styling using accent color #145348
  const getCellBg = (val: number) => {
    if (val <= 0) return "rgba(163, 59, 50, 0.12)"; // negative brick tint
    const normalized = Math.max(0, Math.min(1, (val - minVal) / range));
    const opacity = 0.06 + normalized * 0.38;
    return `rgba(20, 83, 72, ${opacity.toFixed(2)})`;
  };

  return (
    <div className="p-5 sm:p-7 bg-paper-raised border border-line rounded-card my-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-line gap-3">
        <div>
          <h4 className="font-serif text-base font-semibold text-ink">
            2-Axis Returns Sensitivity Matrix
          </h4>
          <p className="text-xs text-ink-muted">
            Exit Multiple (Rows) × Revenue CAGR (Columns) — fully recalculated per scenario
          </p>
        </div>

        {/* MOIC / IRR Toggle */}
        <div className="flex items-center gap-1 p-1 bg-paper-subtle border border-line rounded-control shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMetricType("moic")}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-control transition-all cursor-pointer ${
              metricType === "moic"
                ? "bg-paper-raised text-ink shadow-xs border border-line font-semibold"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            MOIC (Multiple)
          </button>
          <button
            type="button"
            onClick={() => setMetricType("irr")}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-control transition-all cursor-pointer ${
              metricType === "irr"
                ? "bg-paper-raised text-ink shadow-xs border border-line font-semibold"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            IRR (% Compounded)
          </button>
        </div>
      </div>

      {/* Mobile Swipe Notice */}
      <div className="block sm:hidden text-[10px] font-mono text-ink-faint mb-2 text-right">
        ← Swipe sensitivity grid →
      </div>

      <div className="w-full overflow-x-auto no-scrollbar pb-2">
        <table className="w-full text-center border-collapse min-w-[560px]">
          <thead>
            <tr>
              <th className="p-2.5 text-left font-mono text-[11px] text-ink-muted border-b border-line bg-paper/60">
                Exit Mult. \ CAGR
              </th>
              {cagrValues.map((cagr, colIdx) => {
                const isColHovered = hoveredCell?.col === colIdx;
                return (
                  <th
                    key={colIdx}
                    className={`p-2.5 font-mono text-xs font-medium border-b border-line transition-colors ${
                      isColHovered
                        ? "bg-accent-light text-accent font-semibold"
                        : "text-ink bg-paper/30"
                    }`}
                  >
                    {formatPercent(cagr, 1, true)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIdx) => {
              const mult = exitMultiples[rowIdx];
              const isRowHovered = hoveredCell?.row === rowIdx;

              return (
                <tr key={rowIdx} className="border-b border-line/40">
                  {/* Row Header */}
                  <td
                    className={`p-2.5 text-left font-mono text-xs font-medium transition-colors border-r border-line/60 ${
                      isRowHovered
                        ? "bg-accent-light text-accent font-semibold"
                        : "text-ink bg-paper/30"
                    }`}
                  >
                    {formatRatio(mult, 1)}
                  </td>

                  {/* Matrix Cells */}
                  {row.map((cell, colIdx) => {
                    const isCellHovered =
                      hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;
                    const val = metricType === "moic" ? cell.moic : cell.irr;
                    const bg = getCellBg(val);

                    return (
                      <td
                        key={colIdx}
                        onMouseEnter={() =>
                          setHoveredCell({ row: rowIdx, col: colIdx })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{ backgroundColor: bg }}
                        className={`p-3 font-serif text-sm tabular-nums transition-all cursor-crosshair relative border-r border-line/30 last:border-r-0 ${
                          cell.isBaseCase
                            ? "ring-2 ring-accent ring-inset font-bold text-ink"
                            : ""
                        } ${
                          isCellHovered
                            ? "scale-105 shadow-md z-10 font-bold bg-accent-light"
                            : ""
                        }`}
                      >
                        {cell.isBaseCase && (
                          <span
                            className="absolute -top-1 -right-1 text-[8px] font-mono uppercase bg-accent text-paper-raised px-1 rounded-xs"
                            title="Current Base Case"
                          >
                            Base
                          </span>
                        )}
                        <span className={val <= 0 ? "text-negative font-semibold" : "text-ink"}>
                          {metricType === "moic"
                            ? formatRatio(cell.moic, 2)
                            : formatPercent(cell.irr, 1)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-line/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-ink-muted gap-2 font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 border-2 border-accent rounded-xs" />
          <span>Framed cell denotes current active model assumptions</span>
        </div>
        <div>Calibrated sequential gradient in system emerald</div>
      </div>
    </div>
  );
}
