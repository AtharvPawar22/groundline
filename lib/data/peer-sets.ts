import { PeerSet } from "../types/schema";
import { peerCompanies } from "./companies/peers";

export const peerSets: Record<string, PeerSet> = {
  NVDA: {
    companyTicker: "NVDA",
    peers: peerCompanies.filter((p) => p.companyTicker === "NVDA"),
  },
  NFLX: {
    companyTicker: "NFLX",
    peers: peerCompanies.filter((p) => p.companyTicker === "NFLX"),
  },
  JPM: {
    companyTicker: "JPM",
    peers: peerCompanies.filter((p) => p.companyTicker === "JPM"),
  },
};
