"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { formatCurrency, formatPercent } from "@/lib/finance/format";

export interface TrendDataPoint {
  period: string;
  value: number;
  secondaryValue?: number;
  formattedValue?: string;
  label?: string;
}

interface TrendChartProps {
  title: string;
  subtitle?: string;
  data: TrendDataPoint[];
  metricType?: "currency" | "percent" | "ratio";
  unit?: "USD_millions" | "USD_billions";
  accentColor?: string;
  secondaryLabel?: string;
  primaryLabel?: string;
}

export default function TrendChart({
  title,
  subtitle,
  data,
  metricType = "currency",
  unit = "USD_millions",
  accentColor = "#145348",
  primaryLabel = "Reported",
  secondaryLabel,
}: TrendChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="p-6 bg-paper-raised border border-line rounded-card my-6 h-72 flex items-center justify-center text-xs font-mono text-ink-muted">
        Loading interactive chart...
      </div>
    );
  }

  const formatYAxis = (val: number) => {
    if (metricType === "percent") {
      return formatPercent(val, 0);
    }
    return formatCurrency(val, unit, 0);
  };

  const cleanId = `grad-${title.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div className="p-5 sm:p-7 bg-paper-raised border border-line rounded-card my-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-line gap-2">
        <div>
          <h4 className="font-serif text-base font-semibold text-ink">{title}</h4>
          {subtitle && <p className="text-xs text-ink-muted mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono self-start sm:self-auto">
          <div className="flex items-center gap-1.5 bg-paper p-1 px-2 rounded border border-line">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className="text-ink font-medium">{primaryLabel}</span>
          </div>
          {secondaryLabel && (
            <div className="flex items-center gap-1.5 bg-paper p-1 px-2 rounded border border-line">
              <span className="w-2.5 h-2.5 rounded-full bg-ink-muted/60" />
              <span className="text-ink-muted">{secondaryLabel}</span>
            </div>
          )}
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full -ml-2 sm:ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 0 }}>
            <defs>
              <linearGradient id={cleanId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={accentColor} stopOpacity={0.16} />
                <stop offset="95%" stopColor={accentColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECE2" />

            <XAxis
              dataKey="period"
              stroke="#545B62"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#DCE0D6" }}
            />

            <YAxis
              stroke="#545B62"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              domain={["auto", "auto"]}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const val = payload[0].value as number;
                  const secVal = payload[1]?.value as number | undefined;

                  return (
                    <div className="p-3 bg-paper-raised border border-line shadow-md rounded-card text-xs font-sans">
                      <div className="font-mono text-ink-muted text-[10px] uppercase mb-1">
                        {label}
                      </div>
                      <div className="font-serif text-base font-semibold text-ink tabular-nums">
                        {metricType === "percent"
                          ? formatPercent(val, 1)
                          : formatCurrency(val, unit, 2)}
                      </div>
                      {secVal !== undefined && (
                        <div className="font-serif text-xs text-ink-muted tabular-nums mt-1 pt-1 border-t border-line/60">
                          {secondaryLabel}: {metricType === "percent" ? formatPercent(secVal, 1) : formatCurrency(secVal, unit, 2)}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={accentColor}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#${cleanId})`}
            />

            {secondaryLabel && (
              <Line
                type="monotone"
                dataKey="secondaryValue"
                stroke="#8E959E"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
