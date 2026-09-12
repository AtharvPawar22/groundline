import { describe, it, expect } from "vitest";
import { runLBOModel, generateLBOSensitivityMatrix } from "../../lib/finance/lbo-engine";

describe("LBO Engine Golden Tests", () => {
  it("Test Case 1: Baseline Synthetic Case (hand-computed)", () => {
    const result = runLBOModel({
      entryEbitda: 100.0,
      entryMultiple: 10.0,
      entryRevenue: 500.0,
      feePercent: 0.02,
      debtToEbitda: 5.0,
      revenueCagr: 0.1,
      ebitdaMargin: 0.2,
      capexPercent: 0.03,
      interestRate: 0.08,
      taxRate: 0.25,
      holdPeriod: 5,
      exitMultiple: 10.0,
    });

    // Sources & Uses
    expect(result.sourcesAndUses.entryEv).toBeCloseTo(1000.0, 3);
    expect(result.sourcesAndUses.transactionFees).toBeCloseTo(20.0, 3);
    expect(result.sourcesAndUses.totalUses).toBeCloseTo(1020.0, 3);
    expect(result.sourcesAndUses.newDebt).toBeCloseTo(500.0, 3);
    expect(result.sourcesAndUses.sponsorEquity).toBeCloseTo(520.0, 3);

    // Year 1
    const y1 = result.schedule[0];
    expect(y1.revenue).toBeCloseTo(550.0, 3);
    expect(y1.ebitda).toBeCloseTo(110.0, 3);
    expect(y1.ebit).toBeCloseTo(93.5, 3);
    expect(y1.interest).toBeCloseTo(40.0, 3);
    expect(y1.pretaxIncome).toBeCloseTo(53.5, 3);
    expect(y1.tax).toBeCloseTo(13.375, 3);
    expect(y1.cfads).toBeCloseTo(40.125, 3);
    expect(y1.debtEnding).toBeCloseTo(459.875, 3);

    // Year 5
    const y5 = result.schedule[4];
    expect(y5.revenue).toBeCloseTo(805.255, 3);
    expect(y5.ebitda).toBeCloseTo(161.051, 3);
    expect(y5.ebit).toBeCloseTo(136.893, 3);
    expect(y5.interest).toBeCloseTo(22.221, 3);
    expect(y5.pretaxIncome).toBeCloseTo(114.672, 3);
    expect(y5.tax).toBeCloseTo(28.668, 3);
    expect(y5.cfads).toBeCloseTo(86.004, 3);
    expect(y5.debtEnding).toBeCloseTo(191.764, 3);

    // Exit & Returns
    expect(result.returns.exitEbitda).toBeCloseTo(161.051, 3);
    expect(result.returns.exitEv).toBeCloseTo(1610.51, 2);
    expect(result.returns.exitNetDebt).toBeCloseTo(191.764, 3);
    expect(result.returns.exitEquityValue).toBeCloseTo(1418.746, 3);
    expect(result.returns.moic).toBeCloseTo(2.728, 3);
    expect(result.returns.irr).toBeCloseTo(0.2223, 3);

    // Bridge Reconciliation Identity
    expect(result.bridge.ebitdaGrowthContribution).toBeCloseTo(610.51, 2);
    expect(result.bridge.multipleChangeContribution).toBeCloseTo(0.0, 3);
    expect(result.bridge.debtPaydownContribution).toBeCloseTo(308.236, 3);
    expect(result.bridge.transactionFees).toBeCloseTo(-20.0, 3);
    expect(result.bridge.reconciled).toBe(true);
    expect(result.bridge.discrepancy).toBeLessThan(1e-4);
  });

  it("Test Case 2: Multiple Contraction (negative bridge component)", () => {
    const result = runLBOModel({
      entryEbitda: 100.0,
      entryMultiple: 10.0,
      entryRevenue: 500.0,
      feePercent: 0.02,
      debtToEbitda: 5.0,
      revenueCagr: 0.1,
      ebitdaMargin: 0.2,
      capexPercent: 0.03,
      interestRate: 0.08,
      taxRate: 0.25,
      holdPeriod: 5,
      exitMultiple: 8.0,
    });

    expect(result.bridge.multipleChangeContribution).toBeCloseTo(-322.102, 3);
    expect(result.bridge.reconciled).toBe(true);
    expect(result.returns.exitEquityValue).toBeLessThan(1418.746);
  });

  it("Test Case 3: Debt Fully Repaid (Cash Accumulation Branch)", () => {
    const result = runLBOModel({
      entryEbitda: 100.0,
      entryMultiple: 10.0,
      entryRevenue: 500.0,
      feePercent: 0.02,
      debtToEbitda: 2.0, // Low debt: $200M
      revenueCagr: 0.1,
      ebitdaMargin: 0.2,
      capexPercent: 0.03,
      interestRate: 0.08,
      taxRate: 0.25,
      holdPeriod: 5,
      exitMultiple: 10.0,
    });

    const y5 = result.schedule[4];
    expect(y5.debtEnding).toBe(0);
    expect(y5.cashAccumulated).toBeGreaterThan(0);
    expect(y5.netDebt).toBeLessThan(0);
    expect(result.bridge.reconciled).toBe(true);
  });

  it("Test Case 4: Negative CFADS (Warning & zero paydown floor)", () => {
    const result = runLBOModel({
      entryEbitda: 100.0,
      entryMultiple: 10.0,
      entryRevenue: 500.0,
      feePercent: 0.02,
      debtToEbitda: 7.0,
      revenueCagr: -0.2, // revenue crash
      ebitdaMargin: 0.1,
      capexPercent: 0.05,
      interestRate: 0.2, // heavy interest
      taxRate: 0.25,
      holdPeriod: 5,
      exitMultiple: 10.0,
    });

    expect(result.hasNegativeCashFlowYears).toBe(true);
    expect(result.negativeCashFlowYears.length).toBeGreaterThan(0);
    // Debt paydown should floor at 0, not increase debt
    for (const yr of result.schedule) {
      expect(yr.debtPaydown).toBeGreaterThanOrEqual(0);
      expect(yr.debtEnding).toBeGreaterThanOrEqual(0);
    }
  });

  it("Test Case 5: One-Year Hold (IRR = MOIC - 1 boundary)", () => {
    const result = runLBOModel({
      entryEbitda: 100.0,
      entryMultiple: 10.0,
      entryRevenue: 500.0,
      feePercent: 0.02,
      debtToEbitda: 5.0,
      revenueCagr: 0.1,
      ebitdaMargin: 0.2,
      capexPercent: 0.03,
      interestRate: 0.08,
      taxRate: 0.25,
      holdPeriod: 1,
      exitMultiple: 10.0,
    });

    expect(result.returns.irr).toBeCloseTo(result.returns.moic - 1, 6);
    expect(result.bridge.reconciled).toBe(true);
  });

  it("Sensitivity Matrix generates correctly with center as base case", () => {
    const matrix = generateLBOSensitivityMatrix({
      entryEbitda: 100.0,
      entryMultiple: 10.0,
      entryRevenue: 500.0,
      feePercent: 0.02,
      debtToEbitda: 5.0,
      revenueCagr: 0.1,
      ebitdaMargin: 0.2,
      capexPercent: 0.03,
      interestRate: 0.08,
      taxRate: 0.25,
      holdPeriod: 5,
      exitMultiple: 10.0,
    });

    expect(matrix.exitMultiples.length).toBe(7);
    expect(matrix.cagrValues.length).toBe(5);
    expect(matrix.matrix.length).toBe(7);
    expect(matrix.matrix[0].length).toBe(5);

    // Center cell (row index 3, col index 2) should be base case
    const center = matrix.matrix[3][2];
    expect(center.isBaseCase).toBe(true);
    expect(center.moic).toBeCloseTo(2.728, 2);
  });
});
