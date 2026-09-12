/**
 * Single source of truth for all corporate finance calculations.
 * Every CalculatedMetric references these functions.
 */

/**
 * Enterprise Value = Market Cap + Total Debt - Cash & Equivalents
 * Values should be in the same units (e.g. USD_millions or USD_billions).
 */
export function computeEnterpriseValue(
  marketCap: number,
  totalDebt: number,
  cash: number
): number {
  return marketCap + totalDebt - cash;
}

/**
 * Net Debt = Total Debt - Cash & Equivalents
 * Note: Net Debt can be negative (Net Cash position).
 */
export function computeNetDebt(totalDebt: number, cash: number): number {
  return totalDebt - cash;
}

/**
 * EV / EBITDA Multiple
 */
export function computeEvEbitda(
  enterpriseValue: number,
  ebitda: number
): number | null {
  if (ebitda <= 0 || isNaN(ebitda) || isNaN(enterpriseValue)) {
    return null;
  }
  return enterpriseValue / ebitda;
}

/**
 * EV / Revenue Multiple
 */
export function computeEvRevenue(
  enterpriseValue: number,
  revenue: number
): number | null {
  if (revenue <= 0 || isNaN(revenue) || isNaN(enterpriseValue)) {
    return null;
  }
  return enterpriseValue / revenue;
}

/**
 * Trailing P/E Ratio = Market Cap / Net Income (or Share Price / Diluted EPS)
 */
export function computePeRatio(
  marketCapOrPrice: number,
  netIncomeOrEps: number
): number | null {
  if (netIncomeOrEps <= 0 || isNaN(netIncomeOrEps) || isNaN(marketCapOrPrice)) {
    return null; // Negative earnings => N/M
  }
  return marketCapOrPrice / netIncomeOrEps;
}

/**
 * Price / Book Ratio = Market Cap / Stockholders' Equity
 */
export function computePriceToBook(
  marketCap: number,
  equity: number
): number | null {
  if (equity <= 0 || isNaN(equity) || isNaN(marketCap)) {
    return null;
  }
  return marketCap / equity;
}

/**
 * Price / Tangible Book Value
 */
export function computePriceToTangibleBook(
  sharePrice: number,
  tangibleBookValuePerShare: number
): number | null {
  if (
    tangibleBookValuePerShare <= 0 ||
    isNaN(tangibleBookValuePerShare) ||
    isNaN(sharePrice)
  ) {
    return null;
  }
  return sharePrice / tangibleBookValuePerShare;
}

/**
 * FCF Yield = Free Cash Flow / Market Cap
 */
export function computeFcfYield(
  freeCashFlow: number,
  marketCap: number
): number | null {
  if (marketCap <= 0 || isNaN(marketCap) || isNaN(freeCashFlow)) {
    return null;
  }
  return freeCashFlow / marketCap;
}

/**
 * Return on Equity (ROE) = Net Income / Stockholders' Equity
 */
export function computeRoe(netIncome: number, equity: number): number | null {
  if (equity <= 0 || isNaN(equity) || isNaN(netIncome)) {
    return null;
  }
  return netIncome / equity;
}

/**
 * Return on Tangible Common Equity (ROTCE) = Net Income / Tangible Common Equity
 */
export function computeRotce(
  netIncome: number,
  tangibleEquity: number
): number | null {
  if (tangibleEquity <= 0 || isNaN(tangibleEquity) || isNaN(netIncome)) {
    return null;
  }
  return netIncome / tangibleEquity;
}

/**
 * Gross Margin = Gross Profit / Revenue
 */
export function computeGrossMargin(
  grossProfit: number,
  revenue: number
): number | null {
  if (revenue <= 0 || isNaN(revenue) || isNaN(grossProfit)) {
    return null;
  }
  return grossProfit / revenue;
}

/**
 * Operating Margin = Operating Income / Revenue
 */
export function computeOperatingMargin(
  operatingIncome: number,
  revenue: number
): number | null {
  if (revenue <= 0 || isNaN(revenue) || isNaN(operatingIncome)) {
    return null;
  }
  return operatingIncome / revenue;
}

/**
 * Net Profit Margin = Net Income / Revenue
 */
export function computeNetMargin(
  netIncome: number,
  revenue: number
): number | null {
  if (revenue <= 0 || isNaN(revenue) || isNaN(netIncome)) {
    return null;
  }
  return netIncome / revenue;
}

/**
 * YoY Revenue Growth = (Current Revenue - Prior Revenue) / Prior Revenue
 */
export function computeRevenueGrowth(
  currentRevenue: number,
  priorRevenue: number
): number | null {
  if (
    priorRevenue <= 0 ||
    isNaN(priorRevenue) ||
    isNaN(currentRevenue) ||
    currentRevenue === undefined
  ) {
    return null;
  }
  return (currentRevenue - priorRevenue) / priorRevenue;
}

/**
 * EBITDA = Operating Income + Depreciation & Amortization
 */
export function computeEbitda(
  operatingIncome: number,
  dAndA: number
): number {
  return operatingIncome + dAndA;
}

/**
 * Free Cash Flow = Operating Cash Flow - Capital Expenditures
 */
export function computeFreeCashFlow(
  operatingCashFlow: number,
  capex: number
): number {
  return operatingCashFlow - capex;
}
