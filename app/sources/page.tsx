import { FileText, ExternalLink, CheckCircle2, ShieldCheck } from "lucide-react";
import CompanyLogo from "@/components/common/CompanyLogo";

export default function SourcesPage() {
  const sources = [
    // NVIDIA
    {
      company: "NVIDIA Corporation",
      ticker: "NVDA",
      cik: "0001045810",
      exchange: "NASDAQ",
      accentBg: "bg-accent-nvda/10 text-accent-nvda border-accent-nvda/20",
      docs: [
        {
          title: "Form 10-K (Annual Report FY2026)",
          period: "Period Ended Jan 25, 2026",
          filed: "Feb 25, 2026",
          accession: "0001045810-26-000021",
          url: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000021/nvda-20260125.htm",
          usage: "Audited FY2026 revenue ($215.94B), gross margin (71.1%), net income ($120.07B), segment breakdown.",
        },
        {
          title: "Form 10-K (Annual Report FY2025)",
          period: "Period Ended Jan 26, 2025",
          filed: "Feb 26, 2025",
          accession: "0001045810-25-000023",
          url: "https://www.sec.gov/Archives/edgar/data/1045810/000104581025000023/nvda-20250126.htm",
          usage: "Audited FY2025 revenue ($130.5B), gross margin (74.99%), CapEx ($3.4B).",
        },
        {
          title: "Q2 FY2027 Earnings Release (Form 8-K)",
          period: "Period Ended Jul 26, 2026",
          filed: "Aug 26, 2026",
          accession: "0001045810-26-000045",
          url: "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027",
          usage: "Q2 FY2027 standalone revenue ($96.2B), H1 net income, $24.9B debt issuance, cash balance.",
        },
      ],
    },

    // Netflix
    {
      company: "Netflix, Inc.",
      ticker: "NFLX",
      cik: "0001065280",
      exchange: "NASDAQ",
      accentBg: "bg-accent-nflx/10 text-accent-nflx border-accent-nflx/20",
      docs: [
        {
          title: "Form 10-K (Annual Report FY2025)",
          period: "Period Ended Dec 31, 2025",
          filed: "Jan 29, 2026",
          accession: "0001065280-26-000034",
          url: "https://www.sec.gov/Archives/edgar/data/1065280/000106528026000034/nflx-20251231.htm",
          usage: "Audited FY2025 revenue ($45.18B), operating income ($13.33B), net income ($10.98B), debt balance.",
        },
        {
          title: "Form 10-Q (Quarterly Report Q2 2026)",
          period: "Period Ended Jun 30, 2026",
          filed: "Jul 16, 2026",
          accession: "0001065280-26-000212",
          url: "https://www.sec.gov/Archives/edgar/data/0001065280/000106528026000212/nflx-20260630.htm",
          usage: "Q2 2026 revenue ($12.56B), operating margin (33.4%), post-split share count verification.",
        },
        {
          title: "Q4 2025 Shareholder Letter (Free Cash Flow)",
          period: "Period Ended Dec 31, 2025",
          filed: "Jan 20, 2026",
          accession: "EX-99.1",
          url: "https://ir.netflix.net",
          usage: "FY2025 Free Cash Flow ($9.46B) non-GAAP reconciliation and guidance.",
        },
      ],
    },

    // JPMorgan Chase
    {
      company: "JPMorgan Chase & Co.",
      ticker: "JPM",
      cik: "0000019617",
      exchange: "NYSE",
      accentBg: "bg-accent-jpm/10 text-accent-jpm border-accent-jpm/20",
      docs: [
        {
          title: "Form 10-K (Annual Report FY2025)",
          period: "Period Ended Dec 31, 2025",
          filed: "Feb 17, 2026",
          accession: "0001628280-26-008131",
          url: "https://www.sec.gov/Archives/edgar/data/19617/000162828026008131/jpm-20251231.htm",
          usage: "Record FY2025 net income ($57.05B), $4.4T assets, ROTCE (20.0%), CET1 ratio (14.8%).",
        },
        {
          title: "4Q25 Earnings Release Narrative (Form 8-K)",
          period: "Period Ended Dec 31, 2025",
          filed: "Jan 13, 2026",
          accession: "0001628280-26-001902",
          url: "https://www.sec.gov/Archives/edgar/data/19617/000162828026001902/a4q25erfexhibit991narrative.htm",
          usage: "TBVPS ($107.56), $2.2B Apple Card credit reserve breakout, segment ROE disclosures.",
        },
        {
          title: "2Q26 Earnings Press Release & Presentation",
          period: "Period Ended Jun 30, 2026",
          filed: "Jul 14, 2026",
          accession: "EX-99.1",
          url: "https://www.jpmorganchase.com/ir",
          usage: "Managed revenue ($58.0B), Visa share gain ($4.6B), ROTCE (23%).",
        },
      ],
    },

    // Peers
    {
      company: "Peer comparable companies",
      ticker: "PEERS",
      cik: "MULTIPLE",
      exchange: "US EXCHANGES",
      accentBg: "bg-accent-light text-accent border-accent/20",
      docs: [
        {
          title: "AMD Form 10-K & Q2 2026 8-K",
          period: "FY2025 / Q2 2026",
          filed: "Aug 4, 2026",
          accession: "0000002488-26-000121",
          url: "https://www.sec.gov/edgar/browse/?CIK=0000002488",
          usage: "AMD TTM revenue ($41.31B), P/E (120.8x), EV/EBITDA (79.9x).",
        },
        {
          title: "The Walt Disney Company FY2025 10-K",
          period: "FY2025 ended Sep 27, 2025",
          filed: "Nov 2025",
          accession: "0001744489-25-000098",
          url: "https://www.sec.gov/edgar/browse/?CIK=0001744489",
          usage: "Disney revenue ($94.4B), DTC operating profit ($1.33B), EV/EBITDA (10.8x).",
        },
        {
          title: "Bank of America Corporation FY2025 10-K",
          period: "FY2025 ended Dec 31, 2025",
          filed: "Feb 2026",
          accession: "0000070858-26-000115",
          url: "https://www.sec.gov/edgar/browse/?CIK=0000070858",
          usage: "BofA FY2025 net income ($29.055B), P/TBV (1.42x), ROTCE (15.5%).",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header Banner */}
      <div className="p-6 bg-paper-raised border border-line rounded-control shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-accent" />
          <h1 className="font-serif text-2xl font-semibold text-ink">
            Primary sources and SEC filings directory
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
          Every financial figure in GROUNDLINE is traceable to SEC Form 10-K, 10-Q, and 8-K filings, with accession numbers and EDGAR links.
        </p>
      </div>

      <div className="space-y-6">
        {sources.map((group) => (
          <div
            key={group.ticker}
            className="p-5 sm:p-6 bg-paper-raised border border-line rounded-control shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-3">
                {group.ticker !== "PEERS" ? (
                  <CompanyLogo ticker={group.ticker} size="md" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent-light border border-line flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                  </div>
                )}
                <div>
                  <h3 className="font-serif text-base font-semibold text-ink">
                    {group.company}
                  </h3>
                  <span className="font-mono text-xs text-ink-muted">
                    {group.exchange} · CIK: {group.cik}
                  </span>
                </div>
              </div>
              <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded border font-semibold ${group.accentBg}`}>
                {group.ticker}
              </span>
            </div>

            <div className="space-y-3">
              {group.docs.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-paper rounded border border-line/70 text-xs space-y-2 hover:border-line transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-ink text-sm font-serif">{doc.title}</span>
                    <span className="font-mono text-[11px] text-ink-muted px-2 py-0.5 bg-paper-raised rounded border border-line/50 inline-block self-start sm:self-auto">
                      Filed: {doc.filed}
                    </span>
                  </div>

                  <div className="text-ink-muted leading-relaxed text-xs">
                    {doc.usage}
                  </div>

                  <div className="pt-2 border-t border-line/40 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono gap-1">
                    <span className="text-ink-faint">Accession: {doc.accession}</span>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline inline-flex items-center gap-1 font-sans font-medium"
                    >
                      <span>SEC EDGAR Filing</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
