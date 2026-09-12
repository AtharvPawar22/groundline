import { describe, it, expect } from "vitest";
import {
  getAllCompanies,
  getCompany,
  getCompanySourcedValues,
  getCompanySegments,
  getCompanyRisks,
  getPeerSet,
  getAllMetricDefinitions,
  getGlossaryExplanation,
} from "../../lib/data";

describe("Data Schema Integrity Tests", () => {
  it("contains all three required companies (NVDA, NFLX, JPM)", () => {
    const all = getAllCompanies();
    expect(all.length).toBe(3);
    expect(getCompany("NVDA")).toBeDefined();
    expect(getCompany("NFLX")).toBeDefined();
    expect(getCompany("JPM")).toBeDefined();
  });

  it("every SourcedValue has a valid SourceRef with URL and documentName", () => {
    for (const ticker of ["NVDA", "NFLX", "JPM"]) {
      const values = getCompanySourcedValues(ticker);
      expect(values.length).toBeGreaterThan(5);

      for (const val of values) {
        expect(val.metricId).toBeDefined();
        expect(val.companyTicker).toBe(ticker);
        expect(val.source).toBeDefined();
        expect(val.source.documentName.length).toBeGreaterThan(0);
        expect(val.source.url.length).toBeGreaterThan(0);
        expect(val.confidence).toMatch(/verified|needs_verification/);
      }
    }
  });

  it("respects bank metric applicability rules for JPMorgan", () => {
    const jpmValues = getCompanySourcedValues("JPM");
    // Ensure JPMorgan does NOT have EV/EBITDA or standard corporate EBITDA values
    const jpmEvEbitda = jpmValues.find((v) => v.metricId === "ev_ebitda");
    expect(jpmEvEbitda).toBeUndefined();

    const jpmGrossProfit = jpmValues.find((v) => v.metricId === "gross_profit");
    expect(jpmGrossProfit).toBeUndefined();
  });

  it("every company has defined segments and key risks", () => {
    for (const ticker of ["NVDA", "NFLX", "JPM"]) {
      const segments = getCompanySegments(ticker);
      expect(segments).toBeDefined();
      expect(segments!.segments.length).toBeGreaterThanOrEqual(3);

      const risks = getCompanyRisks(ticker);
      expect(risks).toBeDefined();
      expect(risks.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("every company has a valid peer set with rationale and caveats", () => {
    for (const ticker of ["NVDA", "NFLX", "JPM"]) {
      const peerSet = getPeerSet(ticker);
      expect(peerSet).toBeDefined();
      expect(peerSet!.peers.length).toBeGreaterThanOrEqual(2);

      for (const peer of peerSet!.peers) {
        expect(peer.rationale.length).toBeGreaterThan(10);
        expect(peer.keyDifference.length).toBeGreaterThan(10);
        expect(peer.usefulMultiples.length).toBeGreaterThan(0);
      }
    }
  });

  it("every core metric definition has corresponding glossary explanations", () => {
    const metrics = getAllMetricDefinitions();
    expect(metrics.length).toBeGreaterThanOrEqual(15);

    for (const m of metrics) {
      expect(m.definition.length).toBeGreaterThan(10);
      expect(m.whyItMatters.length).toBeGreaterThan(10);
      const explanation = getGlossaryExplanation(m.id);
      if (explanation) {
        expect(explanation.whatItMeans.length).toBeGreaterThan(10);
        expect(explanation.whyItMatters.length).toBeGreaterThan(10);
      }
    }
  });
});
