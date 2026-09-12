export type UnitType =
  | "USD_millions"
  | "USD_billions"
  | "USD_actual"
  | "percent"
  | "ratio"
  | "count_millions"
  | "count_billions"
  | "count_actual";

export type PeriodType = "fiscal_year" | "quarter" | "ttm" | "point_in_time";

export type SourceType =
  | "10-K"
  | "10-Q"
  | "8-K"
  | "earnings_release"
  | "earnings_call"
  | "shareholder_letter"
  | "investor_presentation"
  | "market_data_vendor";

export interface SourceRef {
  type: SourceType;
  documentName: string;
  url: string;
  accessedOrFiledDate: string;
  isPrimary: boolean;
  sectionOrTable?: string;
  accessionNumber?: string;
}

export interface CrossCheckSource {
  documentName: string;
  value: number | string;
  url: string;
  note?: string;
}

export interface SourcedValue {
  metricId: string;
  companyTicker: string;
  periodId: string;
  value: number;
  unit: UnitType;
  source: SourceRef;
  crossCheckSources?: CrossCheckSource[];
  confidence: "verified" | "needs_verification";
  notes?: string;
}

export interface MetricDefinition {
  id: string;
  displayName: string;
  category:
    | "Income Statement"
    | "Balance Sheet"
    | "Cash Flow"
    | "Valuation"
    | "Operating KPIs"
    | "Bank Metrics"
    | "LBO Returns";
  definition: string;
  whyItMatters: string;
  formula?: string;
  applicableTo: string[]; // ["NVDA", "NFLX"], ["JPM"], etc.
  caveat?: string;
  isBankSpecific?: boolean;
}

export interface CalculatedMetric {
  metricId: string;
  companyTicker: string;
  periodId: string;
  computeFrom: string[];
  formulaKey: string;
  derivedValue?: number;
  unit: UnitType;
}

export interface Company {
  ticker: string;
  name: string;
  exchange: string;
  industry: string;
  sector: string;
  fiscalYearEnd: string;
  description: string;
  headquarters: string;
  founded: number;
  ceo: string;
  headlineMetric: {
    label: string;
    value: string;
    period: string;
    metricId: string;
  };
  accentColor: string;
  accentBg: string;
  accentToken: "accent-nvda" | "accent-nflx" | "accent-jpm";
  isBank?: boolean;
}

export interface Period {
  id: string;
  type: PeriodType;
  fiscalYear: number;
  quarter?: 1 | 2 | 3 | 4;
  periodEnd: string; // ISO date format e.g. "2025-12-31"
  label: string; // e.g. "FY2025", "Q2 FY2027", "TTM"
  isEstimate?: boolean;
}

export interface Peer {
  companyTicker: string;
  peerTicker: string;
  name: string;
  exchange: string;
  industry: string;
  marketCap: number; // in billions
  revenue: number; // in billions
  netIncome: number; // in billions
  peRatio?: number;
  evEbitda?: number;
  priceToBook?: number;
  rotce?: number;
  evRevenue?: number;
  asOfDate: string;
  rationale: string;
  keyDifference: string;
  usefulMultiples: string[];
  isTransitionPeer?: boolean;
  isSupplyChainContext?: boolean;
}

export interface PeerSet {
  companyTicker: string;
  peers: Peer[];
}

export interface CompanyExplanation {
  text: string;
  exampleValue?: string;
  periodLabel?: string;
  caveat?: string;
}

export interface ExplanationContent {
  metricId: string;
  whatItMeans: string;
  whyItMatters: string;
  formula?: string;
  perCompany: Record<string, CompanyExplanation>;
  globalCaveat?: string;
}

export interface LBOAssumptionSet {
  companyTicker: string;
  defaultEntryMultiple: number;
  defaultExitMultiple: number;
  defaultDebtToEbitda: number;
  defaultHoldPeriodYears: number;
  defaultRevenueGrowth: number; // decimal e.g. 0.12
  defaultEbitdaMargin: number; // decimal e.g. 0.30
  defaultCapexPercent: number; // decimal e.g. 0.03
  defaultInterestRate: number; // decimal e.g. 0.08
  defaultTaxRate: number; // decimal e.g. 0.25
  defaultFeePercent: number; // decimal e.g. 0.025
  scaleDisclaimer?: string;
  isBankModule?: boolean;
}

export interface SegmentData {
  segmentName: string;
  revenue: number; // in millions
  percentage: number; // decimal e.g. 0.88
  growthYoY?: number;
  description: string;
}

export interface CompanySegments {
  companyTicker: string;
  periodLabel: string;
  periodEnd: string;
  segments: SegmentData[];
  geographicMix?: { region: string; percentage: number }[];
}

export interface KeyRisk {
  title: string;
  summary: string;
  sourceSection: string;
}
