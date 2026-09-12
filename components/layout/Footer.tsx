import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-auto bg-paper py-12">
      <div className="max-w-content w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="font-serif text-lg font-medium tracking-tight text-ink block">
              GROUNDLINE
            </span>
            <p className="text-xs text-ink-muted mt-1 max-w-md">
              A bespoke editorial financial research platform demonstrating that different
              industries require distinct analytical frameworks. Sourced from primary SEC
              filings and official investor disclosures.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted font-mono">
            <Link href="/compare" className="hover:text-ink transition-colors">
              Peer Comparison
            </Link>
            <Link href="/glossary" className="hover:text-ink transition-colors">
              Finance Glossary
            </Link>
            <Link href="/methodology" className="hover:text-ink transition-colors">
              Methodology & Notes
            </Link>
            <Link href="/sources" className="hover:text-ink transition-colors">
              SEC Filings Directory
            </Link>
          </div>
        </div>

        <div className="border-t border-line/60 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-ink-faint">
          <div>
            Dataset reference date: <span className="font-mono text-ink-muted">September 2, 2026</span> · Form 10-K, 10-Q & 8-K primary filings.
          </div>
          <div>
            Not investment advice. Strictly designed for educational financial literacy.
          </div>
        </div>
      </div>
    </footer>
  );
}
