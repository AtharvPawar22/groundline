import { describe, it, expect } from "vitest";
import { runBankEconomicsModel } from "../../lib/finance/bank-economics-engine";

describe("Bank Economics Engine Unit Tests", () => {
  it("projects tangible book value compounding and capital return correctly", () => {
    const result = runBankEconomicsModel({
      startingTangibleCommonEquity: 285.0, // $285B
      targetRotce: 0.2, // 20%
      dividendPayoutRatio: 0.3, // 30%
      buybackPayoutRatio: 0.35, // 35%
      currentCet1Ratio: 0.148, // 14.8%
      targetCet1Ratio: 0.13, // 13.0%
      regulatoryFloorCet1: 0.115, // 11.5%
      riskWeightedAssets: 1900.0, // $1.9T
      priceToTangibleBook: 2.33,
      sharesOutstanding: 2.66,
      sharePrice: 355.0,
      holdPeriod: 5,
    });

    expect(result.schedule.length).toBe(5);

    // Year 1: Net Income = 285 * 0.20 = 57.0B
    const y1 = result.schedule[0];
    expect(y1.netIncome).toBeCloseTo(57.0, 2);
    expect(y1.dividendsPaid).toBeCloseTo(17.1, 2);
    expect(y1.buybacksPaid).toBeCloseTo(19.95, 2);
    expect(y1.retainedCapital).toBeCloseTo(19.95, 2);
    expect(y1.endingTce).toBeCloseTo(304.95, 2);

    // Summary checks
    expect(result.summary.cumulativeNetIncome).toBeGreaterThan(300);
    expect(result.summary.cumulativeCapitalReturned).toBeGreaterThan(150);
    expect(result.summary.endingTbvPerShare).toBeGreaterThan(107);
    expect(result.summary.tbvCagr).toBeGreaterThan(0.05);

    // CET1 constraints
    expect(result.cet1Constraint.currentRatio).toBe(0.148);
    expect(result.cet1Constraint.isViolatingFloor).toBe(false);
    expect(result.cet1Constraint.bufferAboveTarget).toBeCloseTo(0.018, 3);
  });

  it("detects regulatory floor violation when target CET1 is set below minimum", () => {
    const result = runBankEconomicsModel({
      startingTangibleCommonEquity: 285.0,
      targetRotce: 0.2,
      dividendPayoutRatio: 0.3,
      buybackPayoutRatio: 0.35,
      currentCet1Ratio: 0.148,
      targetCet1Ratio: 0.1, // 10% (below 11.5% floor)
      regulatoryFloorCet1: 0.115,
      riskWeightedAssets: 1900.0,
      priceToTangibleBook: 2.33,
      sharesOutstanding: 2.66,
      sharePrice: 355.0,
      holdPeriod: 5,
    });

    expect(result.cet1Constraint.isViolatingFloor).toBe(true);
  });
});
