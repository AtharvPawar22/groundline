import { describe, it, expect } from "vitest";
import {
  computeEnterpriseValue,
  computeNetDebt,
  computeEvEbitda,
  computeEvRevenue,
  computePeRatio,
  computePriceToBook,
  computeGrossMargin,
  computeOperatingMargin,
  computeNetMargin,
  computeRevenueGrowth,
  computeFreeCashFlow,
  computeEbitda,
  computeFcfYield,
} from "../../lib/finance/formulas";

describe("Finance Formulas Unit Tests", () => {
  it("computes Enterprise Value and Net Debt correctly", () => {
    // Market cap $337B, Debt $14.5B, Cash $9.3B
    const ev = computeEnterpriseValue(337.5, 14.5, 9.3);
    expect(ev).toBeCloseTo(342.7, 2);

    const netDebt = computeNetDebt(14.5, 9.3);
    expect(netDebt).toBeCloseTo(5.2, 2);

    // Negative net debt (Net cash)
    const netCash = computeNetDebt(5.0, 15.0);
    expect(netCash).toBe(-10.0);
  });

  it("handles EV/EBITDA and EV/Revenue", () => {
    expect(computeEvEbitda(342.7, 14.8)).toBeCloseTo(23.16, 1);
    expect(computeEvEbitda(342.7, 0)).toBeNull();
    expect(computeEvEbitda(342.7, -5)).toBeNull();

    expect(computeEvRevenue(342.7, 45.18)).toBeCloseTo(7.59, 2);
  });

  it("computes P/E ratio with negative handling", () => {
    expect(computePeRatio(337.5, 10.98)).toBeCloseTo(30.74, 2);
    expect(computePeRatio(100, -10)).toBeNull(); // N/M for negative earnings
    expect(computePeRatio(100, 0)).toBeNull();
  });

  it("computes Price to Book and Margins", () => {
    expect(computePriceToBook(950, 362.4)).toBeCloseTo(2.62, 2);
    expect(computeGrossMargin(75, 100)).toBeCloseTo(0.75, 2);
    expect(computeOperatingMargin(30, 100)).toBeCloseTo(0.3, 2);
    expect(computeNetMargin(25, 100)).toBeCloseTo(0.25, 2);
  });

  it("computes YoY Growth, FCF and EBITDA", () => {
    expect(computeRevenueGrowth(215.9, 130.5)).toBeCloseTo(0.6544, 3);
    expect(computeFreeCashFlow(12.5, 3.0)).toBe(9.5);
    expect(computeEbitda(13.3, 1.5)).toBe(14.8);
    expect(computeFcfYield(9.5, 337.5)).toBeCloseTo(0.0281, 4);
  });
});
