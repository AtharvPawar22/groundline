import { LBOAssumptionSet } from "../types/schema";

export const lboDefaults: Record<string, LBOAssumptionSet> = {
  NVDA: {
    companyTicker: "NVDA",
    defaultEntryMultiple: 25.0,
    defaultExitMultiple: 25.0,
    defaultDebtToEbitda: 5.0,
    defaultHoldPeriodYears: 5,
    defaultRevenueGrowth: 0.18, // Nudged from 65% to a defensible long-run 18% CAGR
    defaultEbitdaMargin: 0.66,
    defaultCapexPercent: 0.03,
    defaultInterestRate: 0.08,
    defaultTaxRate: 0.20,
    defaultFeePercent: 0.025,
    scaleDisclaimer:
      "No real leveraged buyout has ever been remotely this size. NVIDIA's ~$5.25T market capitalization exceeds the capacity of the global leveraged finance market combined (the historical record is the 2013 Dell buyout at $24.4B). This tool uses NVIDIA's real financial profile as an illustrative mechanics sandbox. It is not a claim that an LBO of this scale is financeable in the real world.",
    isBankModule: false,
  },
  NFLX: {
    companyTicker: "NFLX",
    defaultEntryMultiple: 10.0,
    defaultExitMultiple: 10.0,
    defaultDebtToEbitda: 5.0,
    defaultHoldPeriodYears: 5,
    defaultRevenueGrowth: 0.12,
    defaultEbitdaMargin: 0.295,
    defaultCapexPercent: 0.03,
    defaultInterestRate: 0.08,
    defaultTaxRate: 0.25,
    defaultFeePercent: 0.025,
    scaleDisclaimer:
      "This simulator models an illustrative buyout tied directly to Netflix's real FY2025 operating income baseline ($13.3B) and cash generation profile, showing how subscription cash flow amortizes acquisition leverage over a 5-year horizon.",
    isBankModule: false,
  },
  JPM: {
    companyTicker: "JPM",
    defaultEntryMultiple: 0,
    defaultExitMultiple: 0,
    defaultDebtToEbitda: 0,
    defaultHoldPeriodYears: 5,
    defaultRevenueGrowth: 0,
    defaultEbitdaMargin: 0,
    defaultCapexPercent: 0,
    defaultInterestRate: 0,
    defaultTaxRate: 0,
    defaultFeePercent: 0,
    isBankModule: true,
  },
};
