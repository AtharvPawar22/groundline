"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Company } from "@/lib/types/schema";

interface TabBarProps {
  company: Company;
}

export default function TabBar({ company }: TabBarProps) {
  const pathname = usePathname();
  const ticker = company.ticker;
  const isBank = company.isBank;

  const tabs = [
    { href: `/company/${ticker}/overview`, label: "Overview", id: "overview" },
    { href: `/company/${ticker}/business`, label: "Business & Segments", id: "business" },
    { href: `/company/${ticker}/financials`, label: "Financials", id: "financials" },
    { href: `/company/${ticker}/valuation`, label: "Valuation & Peers", id: "valuation" },
    {
      href: isBank
        ? `/company/${ticker}/bank-economics`
        : `/company/${ticker}/lbo`,
      label: isBank ? "Bank Economics" : "LBO Analysis",
      id: isBank ? "bank-economics" : "lbo",
    },
    { href: `/company/${ticker}/terms`, label: "Key Terms", id: "terms" },
  ];

  const activeTabStyle = {
    NVDA: "border-accent-nvda text-accent-nvda bg-accent-nvda-light/60 font-semibold shadow-xs",
    NFLX: "border-accent-nflx text-accent-nflx bg-accent-nflx-light/60 font-semibold shadow-xs",
    JPM: "border-accent-jpm text-accent-jpm bg-accent-jpm-light/60 font-semibold shadow-xs",
  }[ticker] || "border-accent text-accent bg-accent-light/60 font-semibold";

  return (
    <div className="border-b border-line mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
      <nav className="flex items-center gap-1.5 sm:gap-2 min-w-max pb-2.5 pt-0.5">
        {tabs.map((tab) => {
          const isActive =
            pathname.endsWith(`/${tab.id}`) ||
            (tab.id === "overview" && pathname === `/company/${ticker}`);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-control border transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? activeTabStyle
                  : "border-transparent text-ink-muted hover:text-ink hover:bg-paper-subtle/80"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
