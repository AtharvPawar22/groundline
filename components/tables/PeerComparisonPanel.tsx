import { Peer, Company } from "@/lib/types/schema";
import { formatCurrency, formatRatio, formatPercent } from "@/lib/finance/format";
import CompanyLogo from "../common/CompanyLogo";
import { Info, AlertCircle, CheckCircle2 } from "lucide-react";

interface PeerComparisonPanelProps {
  currentCompany: Company;
  peers: Peer[];
  currentMultiples: {
    peRatio?: number;
    evEbitda?: number;
    priceToBook?: number;
    rotce?: number;
    revenue: number;
    marketCap: number;
    netIncome: number;
  };
}

export default function PeerComparisonPanel({
  currentCompany,
  peers,
  currentMultiples,
}: PeerComparisonPanelProps) {
  const isBank = currentCompany.isBank;

  return (
    <div className="space-y-6 my-6">
      {/* Comparative Multiples Table */}
      <div className="bg-paper-raised border border-line rounded-card overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-line bg-paper/40 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h4 className="font-serif text-base font-semibold text-ink">
              Valuation Multiples &amp; Peer Benchmarking
            </h4>
            <p className="text-xs text-ink-muted mt-0.5">
              Side-by-side multiple analysis. Multiples vary materially by business mix and growth runway.
            </p>
          </div>
          <span className="text-[10px] font-mono text-ink-faint self-start sm:self-auto">
            ← Swipe table horizontally →
          </span>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-line bg-paper/60 text-[11px] font-mono uppercase text-ink-muted">
                <th className="p-3 pl-4">Company</th>
                <th className="p-3 text-right">Market Cap</th>
                <th className="p-3 text-right">Revenue</th>
                <th className="p-3 text-right">Net Income</th>
                <th className="p-3 text-right">P/E Ratio</th>
                {!isBank ? (
                  <th className="p-3 text-right">EV / EBITDA</th>
                ) : (
                  <>
                    <th className="p-3 text-right">Price / Book</th>
                    <th className="p-3 text-right">ROTCE</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Subject Company Row */}
              <tr className="border-b border-line bg-accent-light/50 font-semibold">
                <td className="p-3 pl-4 text-xs font-sans text-ink">
                  <div className="flex items-center gap-2">
                    <CompanyLogo ticker={currentCompany.ticker} size="sm" />
                    <span className="font-bold">{currentCompany.name}</span>
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 bg-accent text-paper-raised rounded-xs">
                      {currentCompany.ticker}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-right font-serif text-xs tabular-nums text-ink">
                  {formatCurrency(currentMultiples.marketCap, "USD_billions", 1)}
                </td>
                <td className="p-3 text-right font-serif text-xs tabular-nums text-ink">
                  {formatCurrency(currentMultiples.revenue, "USD_billions", 1)}
                </td>
                <td className="p-3 text-right font-serif text-xs tabular-nums text-ink">
                  {formatCurrency(currentMultiples.netIncome, "USD_billions", 1)}
                </td>
                <td className="p-3 text-right font-serif text-xs tabular-nums text-ink font-bold">
                  {currentMultiples.peRatio ? formatRatio(currentMultiples.peRatio, 1) : "—"}
                </td>
                {!isBank ? (
                  <td className="p-3 text-right font-serif text-xs tabular-nums text-ink font-bold">
                    {currentMultiples.evEbitda ? formatRatio(currentMultiples.evEbitda, 1) : "—"}
                  </td>
                ) : (
                  <>
                    <td className="p-3 text-right font-serif text-xs tabular-nums text-ink font-bold">
                      {currentMultiples.priceToBook ? formatRatio(currentMultiples.priceToBook, 2) : "—"}
                    </td>
                    <td className="p-3 text-right font-serif text-xs tabular-nums text-ink font-bold">
                      {currentMultiples.rotce ? formatPercent(currentMultiples.rotce, 1) : "—"}
                    </td>
                  </>
                )}
              </tr>

              {/* Peers Rows */}
              {peers.map((peer) => (
                <tr key={peer.peerTicker} className="border-b border-line/50 hover:bg-paper/30 transition-colors">
                  <td className="p-3 pl-4 text-xs text-ink font-medium">
                    <div className="flex items-center gap-2">
                      <CompanyLogo ticker={peer.peerTicker} size="sm" />
                      <span>{peer.name}</span>
                      <span className="font-mono text-[10px] text-ink-muted">
                        ({peer.peerTicker})
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-right font-serif text-xs tabular-nums text-ink-muted">
                    {formatCurrency(peer.marketCap, "USD_billions", 1)}
                  </td>
                  <td className="p-3 text-right font-serif text-xs tabular-nums text-ink-muted">
                    {formatCurrency(peer.revenue, "USD_billions", 1)}
                  </td>
                  <td className="p-3 text-right font-serif text-xs tabular-nums text-ink-muted">
                    {formatCurrency(peer.netIncome, "USD_billions", 1)}
                  </td>
                  <td className="p-3 text-right font-serif text-xs tabular-nums text-ink font-medium">
                    {peer.peRatio ? formatRatio(peer.peRatio, 1) : "—"}
                  </td>
                  {!isBank ? (
                    <td className="p-3 text-right font-serif text-xs tabular-nums text-ink font-medium">
                      {peer.evEbitda ? formatRatio(peer.evEbitda, 1) : "—"}
                    </td>
                  ) : (
                    <>
                      <td className="p-3 text-right font-serif text-xs tabular-nums text-ink font-medium">
                        {peer.priceToBook ? formatRatio(peer.priceToBook, 2) : "—"}
                      </td>
                      <td className="p-3 text-right font-serif text-xs tabular-nums text-ink font-medium">
                        {peer.rotce ? formatPercent(peer.rotce, 1) : "—"}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Peer Comparability Deep Dives & Caveats */}
      <div className="space-y-4">
        <h4 className="font-serif text-base font-semibold text-ink">
          Peer Comparability Rationale &amp; Analytical Boundaries
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {peers.map((peer) => (
            <div
              key={peer.peerTicker}
              className="p-5 bg-paper-raised border border-line rounded-card shadow-xs text-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-2.5 gap-2">
                <div className="flex items-center gap-2.5">
                  <CompanyLogo ticker={peer.peerTicker} size="md" />
                  <div>
                    <span className="font-serif text-sm font-semibold text-ink">
                      {peer.name}
                    </span>
                    <span className="font-mono text-xs text-ink-muted ml-2">
                      [{peer.peerTicker} · {peer.exchange}]
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                  {peer.usefulMultiples.map((m) => (
                    <span key={m} className="px-2 py-0.5 bg-paper rounded border border-line text-ink-muted">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-bold block mb-1">
                  Why Comparable:
                </span>
                <p className="text-ink leading-relaxed">{peer.rationale}</p>
              </div>

              <div className="p-3 bg-negative-light border border-negative-border rounded-control text-negative">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold block">
                      Where the Comparison Breaks Down:
                    </span>
                    <p className="text-[11px] leading-relaxed mt-0.5">{peer.keyDifference}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
