import {
  Company,
  SourcedValue,
  Period,
  CompanySegments,
  KeyRisk,
  PeerSet,
  MetricDefinition,
  ExplanationContent,
  LBOAssumptionSet,
} from "../types/schema";

import {
  nvdaCompany,
  nvdaPeriods,
  nvdaSourcedValues,
  nvdaSegments,
  nvdaRisks,
} from "./companies/nvda";
import {
  nflxCompany,
  nflxPeriods,
  nflxSourcedValues,
  nflxSegments,
  nflxRisks,
} from "./companies/nflx";
import {
  jpmCompany,
  jpmPeriods,
  jpmSourcedValues,
  jpmSegments,
  jpmRisks,
} from "./companies/jpm";
import { peerSets } from "./peer-sets";
import { lboDefaults } from "./lbo-defaults";
import { metricDefinitions, glossaryExplanations } from "./glossary/terms";

export const companies: Record<string, Company> = {
  NVDA: nvdaCompany,
  NFLX: nflxCompany,
  JPM: jpmCompany,
};

export const companyPeriods: Record<string, Period[]> = {
  NVDA: nvdaPeriods,
  NFLX: nflxPeriods,
  JPM: jpmPeriods,
};

export const sourcedValues: Record<string, SourcedValue[]> = {
  NVDA: nvdaSourcedValues,
  NFLX: nflxSourcedValues,
  JPM: jpmSourcedValues,
};

export const companySegments: Record<string, CompanySegments> = {
  NVDA: nvdaSegments,
  NFLX: nflxSegments,
  JPM: jpmSegments,
};

export const companyRisks: Record<string, KeyRisk[]> = {
  NVDA: nvdaRisks,
  NFLX: nflxRisks,
  JPM: jpmRisks,
};

export function getAllCompanies(): Company[] {
  return Object.values(companies);
}

export function getCompany(ticker: string): Company | undefined {
  return companies[ticker.toUpperCase()];
}

export function getCompanyPeriods(ticker: string): Period[] {
  return companyPeriods[ticker.toUpperCase()] || [];
}

export function getCompanySourcedValues(ticker: string): SourcedValue[] {
  return sourcedValues[ticker.toUpperCase()] || [];
}

export function getSourcedValue(
  ticker: string,
  metricId: string,
  periodId?: string
): SourcedValue | undefined {
  const values = getCompanySourcedValues(ticker);
  if (periodId) {
    return values.find(
      (v) => v.metricId === metricId && v.periodId === periodId
    );
  }
  // If periodId not provided, prefer latest market period or most recent fiscal year
  return (
    values.find((v) => v.metricId === metricId && v.periodId === "MARKET-2026") ||
    values.find((v) => v.metricId === metricId && v.periodId === "FY2026") ||
    values.find((v) => v.metricId === metricId && v.periodId === "FY2025") ||
    values.find((v) => v.metricId === metricId)
  );
}

export function getCompanySegments(ticker: string): CompanySegments | undefined {
  return companySegments[ticker.toUpperCase()];
}

export function getCompanyRisks(ticker: string): KeyRisk[] {
  return companyRisks[ticker.toUpperCase()] || [];
}

export function getPeerSet(ticker: string): PeerSet | undefined {
  return peerSets[ticker.toUpperCase()];
}

export function getLBODefaults(ticker: string): LBOAssumptionSet | undefined {
  return lboDefaults[ticker.toUpperCase()];
}

export function getAllMetricDefinitions(): MetricDefinition[] {
  return metricDefinitions;
}

export function getMetricDefinition(metricId: string): MetricDefinition | undefined {
  return metricDefinitions.find((m) => m.id === metricId);
}

export function getGlossaryExplanation(metricId: string): ExplanationContent | undefined {
  return glossaryExplanations[metricId];
}
