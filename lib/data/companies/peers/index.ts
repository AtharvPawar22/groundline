import { Peer } from "../../../types/schema";

export const peerCompanies: Peer[] = [
  // NVIDIA Peers
  {
    companyTicker: "NVDA",
    peerTicker: "AMD",
    name: "Advanced Micro Devices, Inc.",
    exchange: "NASDAQ",
    industry: "Semiconductors & Accelerators",
    marketCap: 578.0,
    revenue: 41.31,
    netIncome: 6.43,
    peRatio: 120.79,
    evEbitda: 79.87,
    evRevenue: 13.9,
    asOfDate: "Aug 31, 2026",
    rationale:
      "Closest direct competitor in data center AI accelerators (Instinct MI300/MI350 series) and x86 data center CPUs (EPYC). Shares the same fabless business model and TSMC manufacturing ecosystem.",
    keyDifference:
      "Roughly an order of magnitude smaller in AI accelerator revenue and operating margins. Much higher P/E multiple reflects a smaller earnings base pricing in future market-share gains rather than current profitability.",
    usefulMultiples: ["EV / EBITDA", "EV / Revenue", "Revenue Growth"],
  },
  {
    companyTicker: "NVDA",
    peerTicker: "AVGO",
    name: "Broadcom Inc.",
    exchange: "NASDAQ",
    industry: "Custom Silicon & Infrastructure Software",
    marketCap: 1761.0,
    revenue: 75.47,
    netIncome: 29.32,
    peRatio: 61.83,
    evEbitda: 43.08,
    evRevenue: 23.3,
    asOfDate: "Aug 31, 2026",
    rationale:
      "Leading provider of custom AI application-specific ICs (XPUs / ASICs) for hyperscalers like Google (TPU) and Meta, plus high-speed data center networking silicon (Tomahawk, Jericho).",
    keyDifference:
      "Hybrid business model: approximately half semiconductor solutions and half high-margin enterprise infrastructure software (following the VMware acquisition), which elevates its blended multiple and gross margin profile.",
    usefulMultiples: ["EV / EBITDA", "EV / Revenue", "EBITDA Margin"],
  },
  {
    companyTicker: "NVDA",
    peerTicker: "TSM",
    name: "Taiwan Semiconductor Manufacturing Co.",
    exchange: "NYSE / TWSE",
    industry: "Pure-Play Semiconductor Foundry",
    marketCap: 885.0,
    revenue: 86.5,
    netIncome: 37.2,
    peRatio: 23.8,
    evEbitda: 14.5,
    evRevenue: 10.2,
    asOfDate: "Aug 31, 2026",
    rationale:
      "Exclusive fabrication partner for NVIDIA's advanced GPU architectures (Hopper, Blackwell) and CoWoS advanced packaging. Essential context for understanding gross margin boundaries and supply constraints.",
    keyDifference:
      "Contract manufacturing business with extreme capital expenditure intensity (~$30B-$35B annually in fab facilities) compared to NVIDIA's fabless, asset-light design model ($3.4B capex). Included as supply-chain context rather than a direct multiple peer.",
    usefulMultiples: ["EV / EBITDA", "CapEx / Revenue"],
    isSupplyChainContext: true,
  },

  // Netflix Peers
  {
    companyTicker: "NFLX",
    peerTicker: "DIS",
    name: "The Walt Disney Company",
    exchange: "NYSE",
    industry: "Diversified Entertainment & DTC Streaming",
    marketCap: 191.0,
    revenue: 94.4,
    netIncome: 12.4,
    peRatio: 17.8,
    evEbitda: 10.8,
    evRevenue: 2.4,
    asOfDate: "Aug 25, 2026",
    rationale:
      "Direct streaming competitor with Disney+, Hulu, and ESPN+. Disney's Direct-to-Consumer (DTC) segment is now independently profitable (~$1.33B segment operating income on ~$24.6B DTC revenue in FY2025).",
    keyDifference:
      "Disney is an entertainment conglomerate whose profit engine is Parks & Experiences (~$10B operating income). Whole-company multiples (10.8x EV/EBITDA) blend theme parks, linear networks, and cruises with streaming, masking pure DTC streaming economics.",
    usefulMultiples: ["EV / EBITDA", "EV / Revenue", "DTC Segment Margin"],
  },
  {
    companyTicker: "NFLX",
    peerTicker: "CMCSA",
    name: "Comcast Corporation",
    exchange: "NASDAQ",
    industry: "Media, Broadband & Streaming",
    marketCap: 86.95,
    revenue: 121.5,
    netIncome: 15.3,
    peRatio: 8.55,
    evEbitda: 5.18,
    evRevenue: 1.1,
    asOfDate: "Aug 4, 2026",
    rationale:
      "Operates Peacock streaming alongside NBCUniversal studio production and theme parks. Provides a stark contrast in media valuation multiples.",
    keyDifference:
      "Comcast completed the spin-off of its legacy cable-networks business into Versant Media Group effective January 2, 2026. Its deeply discounted multiples (5.18x EV/EBITDA) reflect secular cord-cutting in legacy pay-TV rather than streaming health alone.",
    usefulMultiples: ["EV / EBITDA", "P / E", "Free Cash Flow Yield"],
  },

  // JPMorgan Chase Peers
  {
    companyTicker: "JPM",
    peerTicker: "BAC",
    name: "Bank of America Corporation",
    exchange: "NYSE",
    industry: "Diversified Universal Banking",
    marketCap: 435.0,
    revenue: 102.5,
    netIncome: 29.055,
    peRatio: 14.1,
    priceToBook: 1.42,
    rotce: 0.155,
    asOfDate: "Sep 1, 2026",
    rationale:
      "Closest structural peer: diversified universal bank with consumer banking, wealth management (Merrill), and global corporate/investment banking operating under the same U.S. regulatory and capital regime.",
    keyDifference:
      "Lower Return on Tangible Common Equity (ROTCE of ~15.5% vs. JPMorgan's 20.0%), leading to a lower Price/Tangible Book valuation multiple (~1.42x vs JPM's ~2.33x).",
    usefulMultiples: ["P / E", "Price / Tangible Book", "ROTCE"],
  },
  {
    companyTicker: "JPM",
    peerTicker: "WFC",
    name: "Wells Fargo & Company",
    exchange: "NYSE",
    industry: "Commercial & Retail Banking",
    marketCap: 215.0,
    revenue: 82.4,
    netIncome: 18.2,
    peRatio: 13.0,
    priceToBook: 1.58,
    rotce: 0.148,
    asOfDate: "Sep 1, 2026",
    rationale:
      "Direct competitor in consumer retail branch banking, commercial lending, and U.S. residential mortgages.",
    keyDifference:
      "Historically constrained by the Federal Reserve's $1.95T asset cap consent order. With regulatory relief progressing, management raised medium-term ROTCE targets to 17-18%, providing a clear example of how regulatory capital dynamics drive bank equity re-ratings.",
    usefulMultiples: ["P / E", "Price / Tangible Book", "ROTCE"],
  },
  {
    companyTicker: "JPM",
    peerTicker: "GS",
    name: "The Goldman Sachs Group, Inc.",
    exchange: "NYSE",
    industry: "Investment Banking & Markets",
    marketCap: 178.0,
    revenue: 52.8,
    netIncome: 12.1,
    peRatio: 17.8,
    priceToBook: 1.52,
    rotce: 0.142,
    asOfDate: "Sep 1, 2026",
    rationale:
      "Direct peer specifically for JPMorgan's Commercial & Investment Bank (CIB) segment — investment banking advisory, equity/debt underwriting, and institutional trading.",
    keyDifference:
      "Goldman has negligible retail branch consumer deposits, funding itself through wholesale markets and wealth deposits. Its higher forward multiple (17.8x) reflects advisory-led capital-light earnings rather than deposit spread intermediation.",
    usefulMultiples: ["P / E", "Price / Tangible Book", "ROE"],
  },
];
