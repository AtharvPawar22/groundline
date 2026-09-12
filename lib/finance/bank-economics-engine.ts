/**
 * Pure Bank Economics & Capital Distribution Engine for JPMorgan Chase.
 * Replaces generic industrial LBO mechanics with real bank value creation levers:
 * ROTCE, Tangible Book Value compounding, Dividend & Buyback distributions, and CET1 capital constraints.
 */

export interface BankEconomicsInputs {
  startingTangibleCommonEquity: number; // in billions USD (e.g. 285.0)
  targetRotce: number; // e.g. 0.20 (20.0%)
  dividendPayoutRatio: number; // e.g. 0.30 (30%)
  buybackPayoutRatio: number; // e.g. 0.35 (35%)
  currentCet1Ratio: number; // e.g. 0.148 (14.8%)
  targetCet1Ratio: number; // e.g. 0.130 (13.0%)
  regulatoryFloorCet1: number; // e.g. 0.115 (11.5% hard regulatory floor)
  riskWeightedAssets: number; // in billions USD (e.g. 1900.0)
  priceToTangibleBook: number; // e.g. 2.33x
  sharesOutstanding: number; // in billions (e.g. 2.66)
  sharePrice: number; // in USD (e.g. 355.0)
  holdPeriod?: number; // years (default 5)
}

export interface BankYearProjection {
  year: number;
  beginningTce: number; // Tangible Common Equity ($B)
  netIncome: number; // ($B)
  dividendsPaid: number; // ($B)
  buybacksPaid: number; // ($B)
  totalCapitalReturned: number; // ($B)
  retainedCapital: number; // ($B)
  endingTce: number; // ($B)
  sharesRemaining: number; // (B)
  tbvPerShare: number; // ($ per share)
  impliedSharePrice: number; // ($ per share at constant P/TBV)
}

export interface BankEconomicsResult {
  inputs: BankEconomicsInputs;
  schedule: BankYearProjection[];
  summary: {
    cumulativeNetIncome: number;
    cumulativeDividends: number;
    cumulativeBuybacks: number;
    cumulativeCapitalReturned: number;
    endingTbvPerShare: number;
    tbvCagr: number;
    endingImpliedSharePrice: number;
    impliedSharePriceCagr: number;
    excessCapitalDollar: number; // ($B)
    excessCapitalVerified: boolean;
  };
  cet1Constraint: {
    currentRatio: number;
    targetRatio: number;
    regulatoryFloor: number;
    bufferAboveTarget: number;
    bufferAboveFloor: number;
    isViolatingFloor: boolean;
  };
}

export function runBankEconomicsModel(
  inputs: BankEconomicsInputs
): BankEconomicsResult {
  const holdPeriod = inputs.holdPeriod ?? 5;
  const targetRotce = Math.max(0.01, Math.min(0.5, inputs.targetRotce));
  const dividendPayout = Math.max(0, Math.min(1.0, inputs.dividendPayoutRatio));
  const maxBuyback = Math.max(0, 1.0 - dividendPayout);
  const buybackPayout = Math.max(0, Math.min(maxBuyback, inputs.buybackPayoutRatio));
  const retainedRatio = Math.max(0, 1.0 - dividendPayout - buybackPayout);

  const regulatoryFloor = inputs.regulatoryFloorCet1;
  const isViolatingFloor = inputs.targetCet1Ratio < regulatoryFloor;

  const schedule: BankYearProjection[] = [];
  let currentTce = inputs.startingTangibleCommonEquity;
  let currentShares = inputs.sharesOutstanding;
  let currentPrice = inputs.sharePrice;

  let cumulativeNetIncome = 0;
  let cumulativeDividends = 0;
  let cumulativeBuybacks = 0;

  for (let t = 1; t <= holdPeriod; t++) {
    const beginningTce = currentTce;
    const netIncome = beginningTce * targetRotce;
    const dividendsPaid = netIncome * dividendPayout;
    const buybacksPaid = netIncome * buybackPayout;
    const totalCapitalReturned = dividendsPaid + buybacksPaid;
    const retainedCapital = netIncome * retainedRatio;
    const endingTce = beginningTce + retainedCapital;

    cumulativeNetIncome += netIncome;
    cumulativeDividends += dividendsPaid;
    cumulativeBuybacks += buybacksPaid;

    // Estimate share reduction from buybacks at current market price
    const sharesRetired =
      currentPrice > 0 ? buybacksPaid / currentPrice : 0;
    const endingShares = Math.max(0.1, currentShares - sharesRetired * 0.9); // 10% dilution offset for SBC

    const tbvPerShare = (endingTce * 1000) / (endingShares * 1000);
    const impliedSharePrice = tbvPerShare * inputs.priceToTangibleBook;

    schedule.push({
      year: t,
      beginningTce,
      netIncome,
      dividendsPaid,
      buybacksPaid,
      totalCapitalReturned,
      retainedCapital,
      endingTce,
      sharesRemaining: endingShares,
      tbvPerShare,
      impliedSharePrice,
    });

    currentTce = endingTce;
    currentShares = endingShares;
    currentPrice = impliedSharePrice;
  }

  const initialTbv =
    (inputs.startingTangibleCommonEquity * 1000) /
    (inputs.sharesOutstanding * 1000);
  const finalYear = schedule[schedule.length - 1];
  const tbvCagr =
    initialTbv > 0
      ? Math.pow(finalYear.tbvPerShare / initialTbv, 1 / holdPeriod) - 1
      : 0;
  const impliedPriceCagr =
    inputs.sharePrice > 0
      ? Math.pow(finalYear.impliedSharePrice / inputs.sharePrice, 1 / holdPeriod) - 1
      : 0;

  // Excess Capital = (Current CET1 - Target CET1) * RWA
  const excessCapitalDollar =
    (inputs.currentCet1Ratio - inputs.targetCet1Ratio) *
    inputs.riskWeightedAssets;

  return {
    inputs: {
      ...inputs,
      dividendPayoutRatio: dividendPayout,
      buybackPayoutRatio: buybackPayout,
    },
    schedule,
    summary: {
      cumulativeNetIncome,
      cumulativeDividends,
      cumulativeBuybacks,
      cumulativeCapitalReturned: cumulativeDividends + cumulativeBuybacks,
      endingTbvPerShare: finalYear.tbvPerShare,
      tbvCagr,
      endingImpliedSharePrice: finalYear.impliedSharePrice,
      impliedSharePriceCagr: impliedPriceCagr,
      excessCapitalDollar: Math.max(0, excessCapitalDollar),
      excessCapitalVerified: false, // Flagged per research doc requirement
    },
    cet1Constraint: {
      currentRatio: inputs.currentCet1Ratio,
      targetRatio: inputs.targetCet1Ratio,
      regulatoryFloor,
      bufferAboveTarget: inputs.currentCet1Ratio - inputs.targetCet1Ratio,
      bufferAboveFloor: inputs.currentCet1Ratio - regulatoryFloor,
      isViolatingFloor,
    },
  };
}
