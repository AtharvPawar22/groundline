/**
 * Pure LBO Modeling Engine
 * Implements the full Sources & Uses, multi-year debt schedule, returns (MOIC, IRR),
 * exact value creation attribution bridge, and 2-axis sensitivity matrix.
 */

export interface LBOInputs {
  entryEbitda: number; // in millions USD
  entryMultiple: number; // EV / EBITDA
  entryRevenue?: number; // in millions USD
  debtToEbitda: number; // leverage multiple
  feePercent?: number; // e.g. 0.025 (2.5%)
  revenueCagr: number; // e.g. 0.10 (10%)
  ebitdaMargin: number; // e.g. 0.20 (20%)
  capexPercent?: number; // e.g. 0.03 (3% of revenue)
  interestRate: number; // e.g. 0.08 (8%)
  taxRate?: number; // e.g. 0.25 (25%)
  holdPeriod: number; // years (1 to 10)
  exitMultiple: number; // EV / EBITDA
}

export interface LBOSourcesAndUses {
  entryEv: number;
  transactionFees: number;
  totalUses: number;
  newDebt: number;
  sponsorEquity: number;
  totalSources: number;
}

export interface LBOYearSchedule {
  year: number;
  revenue: number;
  ebitda: number;
  dAndA: number;
  ebit: number;
  interest: number;
  pretaxIncome: number;
  tax: number;
  netIncome: number;
  cfads: number; // Cash Flow Available for Debt Service
  debtBeginning: number;
  debtPaydown: number;
  debtEnding: number;
  cashAccumulated: number;
  netDebt: number;
  isNegativeCashFlow: boolean;
}

export interface LBOValueCreationBridge {
  sponsorEntryEquity: number;
  ebitdaGrowthContribution: number;
  multipleChangeContribution: number;
  debtPaydownContribution: number;
  transactionFees: number; // negative
  totalValueCreated: number;
  sponsorExitEquity: number;
  reconciled: boolean;
  discrepancy: number;
}

export interface LBOReturns {
  exitEbitda: number;
  exitEv: number;
  exitNetDebt: number;
  exitEquityValue: number;
  sponsorExitEquity: number;
  moic: number;
  irr: number;
  isUnderwater: boolean;
}

export interface LBOSensitivityCell {
  exitMultiple: number;
  revenueCagr: number;
  moic: number;
  irr: number;
  isBaseCase: boolean;
}

export interface LBOResult {
  inputs: Required<LBOInputs>;
  sourcesAndUses: LBOSourcesAndUses;
  schedule: LBOYearSchedule[];
  returns: LBOReturns;
  bridge: LBOValueCreationBridge;
  hasNegativeCashFlowYears: boolean;
  negativeCashFlowYears: number[];
}

export function runLBOModel(inputs: LBOInputs): LBOResult {
  const entryEbitda = Math.max(0.1, inputs.entryEbitda);
  const entryMultiple = Math.max(1, inputs.entryMultiple);
  const ebitdaMargin = Math.max(0.01, Math.min(0.99, inputs.ebitdaMargin));
  const entryRevenue =
    inputs.entryRevenue && inputs.entryRevenue > 0
      ? inputs.entryRevenue
      : entryEbitda / ebitdaMargin;
  const debtToEbitda = Math.max(0, Math.min(15, inputs.debtToEbitda));
  const feePercent = inputs.feePercent ?? 0.025;
  const revenueCagr = inputs.revenueCagr;
  const capexPercent = inputs.capexPercent ?? 0.03;
  const interestRate = Math.max(0, inputs.interestRate);
  const taxRate = inputs.taxRate ?? 0.25;
  const holdPeriod = Math.max(1, Math.min(10, Math.round(inputs.holdPeriod)));
  const exitMultiple = Math.max(0.1, inputs.exitMultiple);

  const fullInputs: Required<LBOInputs> = {
    entryEbitda,
    entryMultiple,
    entryRevenue,
    debtToEbitda,
    feePercent,
    revenueCagr,
    ebitdaMargin,
    capexPercent,
    interestRate,
    taxRate,
    holdPeriod,
    exitMultiple,
  };

  // 1. Sources & Uses
  const entryEv = entryEbitda * entryMultiple;
  const transactionFees = entryEv * feePercent;
  const totalUses = entryEv + transactionFees;
  const newDebt = entryEbitda * debtToEbitda;
  const sponsorEquity = Math.max(1.0, totalUses - newDebt);
  const totalSources = newDebt + sponsorEquity;

  const sourcesAndUses: LBOSourcesAndUses = {
    entryEv,
    transactionFees,
    totalUses,
    newDebt,
    sponsorEquity,
    totalSources,
  };

  // 2. Year-by-year Operating & Debt Schedule
  const schedule: LBOYearSchedule[] = [];
  let currentDebt = newDebt;
  let currentCashAcc = 0;
  let currentRevenue = entryRevenue;
  const negativeCashFlowYears: number[] = [];

  for (let t = 1; t <= holdPeriod; t++) {
    const revenue = currentRevenue * (1 + revenueCagr);
    currentRevenue = revenue;
    const ebitda = revenue * ebitdaMargin;
    const dAndA = revenue * capexPercent;
    const ebit = ebitda - dAndA;
    const debtBeginning = currentDebt;
    const interest = debtBeginning * interestRate;
    const pretaxIncome = ebit - interest;
    const tax = taxRate * Math.max(0, pretaxIncome);
    const netIncome = pretaxIncome - tax;
    const cfads = netIncome; // Net Income = CFADS since Capex = D&A and delta NWC = 0

    const isNegative = cfads < 0;
    if (isNegative) {
      negativeCashFlowYears.push(t);
    }

    const debtPaydown = Math.max(0, Math.min(cfads, debtBeginning));
    const debtEnding = debtBeginning - debtPaydown;

    // Cash accumulation only begins when debt reaches 0
    const residualCash = Math.max(0, cfads - debtBeginning);
    currentCashAcc += residualCash;
    currentDebt = debtEnding;
    const netDebt = debtEnding - currentCashAcc;

    schedule.push({
      year: t,
      revenue,
      ebitda,
      dAndA,
      ebit,
      interest,
      pretaxIncome,
      tax,
      netIncome,
      cfads,
      debtBeginning,
      debtPaydown,
      debtEnding,
      cashAccumulated: currentCashAcc,
      netDebt,
      isNegativeCashFlow: isNegative,
    });
  }

  // 3. Exit and Returns
  const exitYearData = schedule[schedule.length - 1];
  const exitEbitda = exitYearData.ebitda;
  const exitEv = exitEbitda * exitMultiple;
  const exitNetDebt = exitYearData.netDebt;
  const exitEquityValue = Math.max(0, exitEv - exitNetDebt);
  const sponsorExitEquity = exitEquityValue;
  const isUnderwater = sponsorExitEquity <= 0;

  let moic = 0;
  let irr = -1.0;

  if (sponsorEquity > 0) {
    moic = sponsorExitEquity / sponsorEquity;
    if (moic > 0) {
      irr = Math.pow(moic, 1 / holdPeriod) - 1;
    } else {
      irr = -1.0; // -100%
    }
  }

  const returns: LBOReturns = {
    exitEbitda,
    exitEv,
    exitNetDebt,
    exitEquityValue,
    sponsorExitEquity,
    moic,
    irr,
    isUnderwater,
  };

  // 4. Value Creation Attribution Bridge
  const ebitdaGrowthContribution =
    (exitEbitda - entryEbitda) * entryMultiple;
  const multipleChangeContribution =
    exitEbitda * (exitMultiple - entryMultiple);
  const debtPaydownContribution = newDebt - exitNetDebt;
  const feesNegative = -transactionFees;
  const totalValueCreated = sponsorExitEquity - sponsorEquity;

  const sumComponents =
    sponsorEquity +
    ebitdaGrowthContribution +
    multipleChangeContribution +
    debtPaydownContribution +
    feesNegative;

  const discrepancy = Math.abs(sumComponents - sponsorExitEquity);
  const reconciled = discrepancy < 1e-4;

  const bridge: LBOValueCreationBridge = {
    sponsorEntryEquity: sponsorEquity,
    ebitdaGrowthContribution,
    multipleChangeContribution,
    debtPaydownContribution,
    transactionFees: feesNegative,
    totalValueCreated,
    sponsorExitEquity,
    reconciled,
    discrepancy,
  };

  return {
    inputs: fullInputs,
    sourcesAndUses,
    schedule,
    returns,
    bridge,
    hasNegativeCashFlowYears: negativeCashFlowYears.length > 0,
    negativeCashFlowYears,
  };
}

/**
 * Generates the 2-axis sensitivity matrix (Exit Multiple x Revenue CAGR).
 */
export function generateLBOSensitivityMatrix(
  baseInputs: LBOInputs,
  multipleStep: number = 0.5,
  multipleCount: number = 7, // 7 rows: base - 1.5x to base + 1.5x in 0.5x steps
  cagrStep: number = 0.02,
  cagrCount: number = 5 // 5 cols: base - 4pp to base + 4pp in 2pp steps
): {
  exitMultiples: number[];
  cagrValues: number[];
  matrix: LBOSensitivityCell[][];
} {
  const baseMultiple = baseInputs.exitMultiple;
  const baseCagr = baseInputs.revenueCagr;

  const halfMult = Math.floor(multipleCount / 2);
  const exitMultiples: number[] = [];
  for (let i = -halfMult; i <= halfMult; i++) {
    exitMultiples.push(Math.max(1.0, +(baseMultiple + i * multipleStep).toFixed(2)));
  }

  const halfCagr = Math.floor(cagrCount / 2);
  const cagrValues: number[] = [];
  for (let j = -halfCagr; j <= halfCagr; j++) {
    cagrValues.push(+(baseCagr + j * cagrStep).toFixed(4));
  }

  const matrix: LBOSensitivityCell[][] = [];

  for (const mult of exitMultiples) {
    const row: LBOSensitivityCell[] = [];
    for (const cagr of cagrValues) {
      const isBaseCase =
        Math.abs(mult - baseMultiple) < 1e-5 &&
        Math.abs(cagr - baseCagr) < 1e-5;

      const cellResult = runLBOModel({
        ...baseInputs,
        exitMultiple: mult,
        revenueCagr: cagr,
      });

      row.push({
        exitMultiple: mult,
        revenueCagr: cagr,
        moic: cellResult.returns.moic,
        irr: cellResult.returns.irr,
        isBaseCase,
      });
    }
    matrix.push(row);
  }

  return {
    exitMultiples,
    cagrValues,
    matrix,
  };
}
