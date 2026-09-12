"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Scale, BookOpen, ShieldCheck, FileText } from "lucide-react";
import CompanyLogo from "../common/CompanyLogo";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const companies = [
    { href: "/company/NVDA/overview", label: "NVIDIA", ticker: "NVDA", colorDot: "bg-accent-nvda" },
    { href: "/company/NFLX/overview", label: "Netflix", ticker: "NFLX", colorDot: "bg-accent-nflx" },
    { href: "/company/JPM/overview", label: "JPMorgan Chase", ticker: "JPM", colorDot: "bg-accent-jpm" },
  ];

  const tools = [
    { href: "/compare", label: "Compare", icon: Scale },
    { href: "/glossary", label: "Glossary", icon: BookOpen },
    { href: "/methodology", label: "Methodology", icon: ShieldCheck },
    { href: "/sources", label: "Sources", icon: FileText },
  ];

  return (
    <header className="border-b border-line bg-paper/95 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-content w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Masthead Brand */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="font-serif text-xl sm:text-2xl tracking-tight text-ink hover:text-accent transition-colors font-medium flex items-center gap-2"
            >
              <span>GROUNDLINE</span>
            </Link>
            <span className="hidden md:inline-block text-[11px] uppercase tracking-widest text-ink-muted border-l border-line pl-4 font-mono">
              Research Dossier
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {/* Companies */}
            <div className="flex items-center gap-1 p-1 bg-paper-subtle/70 rounded-control border border-line mr-2">
              {companies.map((c) => {
                const isActive = pathname.startsWith(`/company/${c.ticker}`);
                return (
                  <Link
                    key={c.ticker}
                    href={c.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-control transition-all ${
                      isActive
                        ? "bg-paper-raised text-ink shadow-xs border border-line font-semibold"
                        : "text-ink-muted hover:text-ink hover:bg-paper-raised/60"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${c.colorDot}`} />
                    <span>{c.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Global Tools */}
            {tools.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 text-xs sm:text-sm font-medium rounded-control transition-all ${
                    isActive
                      ? "text-accent font-semibold bg-accent-light"
                      : "text-ink-muted hover:text-ink hover:bg-paper-subtle"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-control text-ink-muted hover:text-ink hover:bg-paper-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-line bg-paper-raised/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint block mb-2 px-2">
              Company Dossiers
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {companies.map((c) => {
                const isActive = pathname.startsWith(`/company/${c.ticker}`);
                return (
                  <Link
                    key={c.ticker}
                    href={c.href}
                    className={`flex items-center justify-between p-2.5 rounded-control transition-all ${
                      isActive
                        ? "bg-paper-subtle text-ink font-semibold border border-line"
                        : "text-ink-muted hover:text-ink hover:bg-paper"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CompanyLogo ticker={c.ticker} size="sm" />
                      <span className="text-sm">{c.label}</span>
                    </div>
                    <span className="font-mono text-[11px] text-ink-faint">
                      {c.ticker}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="border-t border-line/60 pt-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint block mb-2 px-2">
              Tools &amp; References
            </span>
            <div className="grid grid-cols-2 gap-2">
              {tools.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 p-2.5 rounded-control text-xs font-medium transition-all ${
                      isActive
                        ? "bg-accent-light text-accent font-semibold"
                        : "bg-paper text-ink-muted hover:text-ink border border-line/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
