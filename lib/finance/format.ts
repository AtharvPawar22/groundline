import { UnitType } from "../types/schema";

/**
 * Formats a currency value cleanly according to financial reporting conventions.
 * If raw is in USD_millions:
 *   - >= 1000M -> $X.XXB or $X.XB
 *   - < 1000M -> $X.XM or $X.XXM
 */
export function formatCurrency(
  value: number | undefined | null,
  unit: UnitType = "USD_millions",
  decimals: number = 2
): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "—";
  }

  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);

  if (unit === "USD_billions") {
    if (abs >= 1000) {
      return `${sign}$${(abs / 1000).toFixed(decimals)}T`;
    }
    return `${sign}$${abs.toFixed(decimals)}B`;
  }

  if (unit === "USD_millions") {
    if (abs >= 1000000) {
      return `${sign}$${(abs / 1000000).toFixed(decimals)}T`;
    }
    if (abs >= 1000) {
      const bVal = abs / 1000;
      return `${sign}$${bVal.toFixed(decimals)}B`;
    }
    return `${sign}$${abs.toFixed(decimals)}M`;
  }

  if (unit === "USD_actual") {
    return `${sign}$${abs.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  }

  return `${sign}$${abs.toFixed(decimals)}`;
}

/**
 * Formats percentage values. Input expected as decimal (e.g., 0.125 -> 12.5%).
 */
export function formatPercent(
  value: number | undefined | null,
  decimals: number = 1,
  showPlusSign: boolean = false
): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "—";
  }
  const pct = value * 100;
  const prefix = showPlusSign && pct > 0 ? "+" : "";
  return `${prefix}${pct.toFixed(decimals)}%`;
}

/**
 * Formats valuation and leverage multiples (e.g., 25.3x).
 */
export function formatRatio(
  value: number | undefined | null,
  decimals: number = 1,
  suffix: string = "x"
): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "—";
  }
  if (value <= 0 && suffix === "x") {
    return "N/M"; // Not Meaningful for negative P/E or EV/EBITDA
  }
  return `${value.toFixed(decimals)}${suffix}`;
}

/**
 * Formats share counts and general counts.
 */
export function formatCount(
  value: number | undefined | null,
  unit: UnitType = "count_billions",
  decimals: number = 2
): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "—";
  }
  if (unit === "count_billions") {
    return `${value.toFixed(decimals)}B`;
  }
  if (unit === "count_millions") {
    return `${value.toFixed(decimals)}M`;
  }
  return value.toLocaleString("en-US");
}

/**
 * Generic metric value formatter using UnitType.
 */
export function formatMetricValue(
  value: number | undefined | null,
  unit: UnitType,
  decimals?: number
): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "—";
  }

  switch (unit) {
    case "USD_billions":
      return formatCurrency(value, "USD_billions", decimals ?? 2);
    case "USD_millions":
      return formatCurrency(value, "USD_millions", decimals ?? 2);
    case "USD_actual":
      return formatCurrency(value, "USD_actual", decimals ?? 2);
    case "percent":
      return formatPercent(value, decimals ?? 1);
    case "ratio":
      return formatRatio(value, decimals ?? 1);
    case "count_billions":
      return formatCount(value, "count_billions", decimals ?? 2);
    case "count_millions":
      return formatCount(value, "count_millions", decimals ?? 1);
    case "count_actual":
      return formatCount(value, "count_actual", 0);
    default:
      return String(value);
  }
}
