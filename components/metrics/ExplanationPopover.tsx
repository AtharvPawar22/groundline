"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExplanationContent } from "@/lib/types/schema";
import { getMetricDefinition } from "@/lib/data";
import { HelpCircle, ArrowRight, AlertTriangle, X, BookOpen } from "lucide-react";

interface ExplanationPopoverProps {
  explanation: ExplanationContent;
  companyTicker: string;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
}

export default function ExplanationPopover({
  explanation,
  companyTicker,
  isOpen,
  onClose,
  triggerRef,
}: ExplanationPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [alignRight, setAlignRight] = useState(false);

  // Compute horizontal alignment to prevent right-edge screen clipping
  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      if (rect.left + 420 > window.innerWidth - 24) {
        setAlignRight(true);
      } else {
        setAlignRight(false);
      }
    }
  }, [isOpen, triggerRef]);

  // Click outside and Escape key listeners
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(target)
      ) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const metricDef = getMetricDefinition(explanation.metricId);
  const companyExp = explanation.perCompany[companyTicker.toUpperCase()];
  const formula = explanation.formula || metricDef?.formula;
  const caveat = companyExp?.caveat || explanation.globalCaveat || metricDef?.caveat;

  const accentStyles = {
    NVDA: {
      border: "border-accent-nvda/40",
      bg: "bg-accent-nvda-light/70",
      text: "text-accent-nvda",
    },
    NFLX: {
      border: "border-accent-nflx/40",
      bg: "bg-accent-nflx-light/70",
      text: "text-accent-nflx",
    },
    JPM: {
      border: "border-accent-jpm/40",
      bg: "bg-accent-jpm-light/70",
      text: "text-accent-jpm",
    },
  }[companyTicker.toUpperCase()] || {
    border: "border-accent/40",
    bg: "bg-accent-light/70",
    text: "text-accent",
  };

  const contentElements = (
    <div className="space-y-3.5 text-xs text-ink">
      {/* Header bar */}
      <div className="flex items-start justify-between pb-3 border-b border-line gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent-light px-2 py-0.5 rounded font-semibold">
              {metricDef?.category || "Financial Metric"}
            </span>
            <span className="font-mono text-[10px] text-ink-muted">
              {companyTicker.toUpperCase()} Context
            </span>
          </div>
          <h4 className="font-serif text-base font-semibold text-ink leading-snug">
            {metricDef?.displayName || explanation.metricId.toUpperCase()}
          </h4>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close explanation popover"
          className="p-1 rounded-control text-ink-muted hover:text-ink hover:bg-paper-subtle transition-colors shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Block 1: Plain English Meaning */}
      <div className="p-3 bg-paper rounded-control border border-line/60 space-y-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block font-semibold">
          1. Plain English Meaning
        </span>
        <p className="text-ink leading-relaxed">
          {explanation.whatItMeans}
        </p>
      </div>

      {/* Block 2: Institutional Relevance */}
      <div className="p-3 bg-paper rounded-control border border-line/60 space-y-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block font-semibold">
          2. Institutional Relevance
        </span>
        <p className="text-ink-muted leading-relaxed">
          {explanation.whyItMatters}
        </p>
      </div>

      {/* Block 3: Formula (if present) */}
      {formula && (
        <div className="p-3 bg-paper rounded-control border border-line/60 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block font-semibold">
            3. Exact Financial Formula
          </span>
          <div className="bg-paper-raised px-2.5 py-1.5 rounded font-mono text-[11px] text-ink border border-line">
            <span className="text-accent font-semibold">fx: </span>
            {formula}
          </div>
        </div>
      )}

      {/* Block 4: Company-Specific Application */}
      {companyExp && (
        <div className={`p-3.5 rounded-control border ${accentStyles.border} ${accentStyles.bg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
            <span className={`font-mono text-[10px] uppercase tracking-wider ${accentStyles.text} font-bold`}>
              4. {companyTicker.toUpperCase()} Application ({companyExp.periodLabel || "Reported"})
            </span>
            {companyExp.exampleValue && (
              <span className="font-serif text-xs font-semibold text-ink tabular-nums">
                {companyExp.exampleValue}
              </span>
            )}
          </div>
          <p className="text-ink leading-relaxed text-xs">
            {companyExp.text}
          </p>
        </div>
      )}

      {/* Block 5: Analytical Warning / Misconception */}
      {caveat && (
        <div className="p-3 bg-negative-light border border-negative-border rounded-control text-negative text-xs flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block font-mono text-[10px] uppercase tracking-wider">
              Analytical Warning / Caveat:
            </span>
            <span className="leading-relaxed mt-0.5 block">{caveat}</span>
          </div>
        </div>
      )}

      {/* Footer bar */}
      <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs font-mono">
        <Link
          href={`/glossary/${explanation.metricId}`}
          onClick={onClose}
          className="text-accent hover:underline inline-flex items-center gap-1 font-medium"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Full Glossary Deep Dive</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
        <span className="text-[10px] text-ink-faint hidden sm:inline">
          Esc to close
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer (screens < 640px) */}
      <div className="sm:hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-ink/40 backdrop-blur-xs z-50 animate-in fade-in duration-150"
          onClick={onClose}
          aria-hidden="true"
        />
        {/* Bottom Sheet Modal */}
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="true"
          className="fixed bottom-0 inset-x-0 max-h-[85vh] bg-paper-raised border-t border-line-strong rounded-t-2xl shadow-2xl z-50 p-5 overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200"
        >
          <div className="w-10 h-1 bg-line-strong rounded-full mx-auto mb-3" />
          {contentElements}
        </div>
      </div>

      {/* Desktop Floating Popover (screens >= 640px) */}
      <div
        ref={popoverRef}
        role="dialog"
        aria-modal="false"
        className={`hidden sm:block absolute top-full mt-2.5 ${
          alignRight ? "right-0" : "left-0"
        } w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] bg-paper-raised border border-line-strong rounded-card shadow-xl z-50 p-5 max-h-[500px] overflow-y-auto text-left animate-in fade-in zoom-in-95 duration-150`}
      >
        {contentElements}
      </div>
    </>
  );
}
