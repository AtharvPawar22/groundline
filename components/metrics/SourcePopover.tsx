"use client";

import { useState, useRef, useEffect } from "react";
import { SourceRef, CrossCheckSource } from "@/lib/types/schema";
import { ExternalLink, FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface SourcePopoverProps {
  source: SourceRef;
  crossCheckSources?: CrossCheckSource[];
  confidence: "verified" | "needs_verification";
  notes?: string;
  className?: string;
}

export default function SourcePopover({
  source,
  crossCheckSources,
  confidence,
  notes,
  className = "",
}: SourcePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-flex items-center ${className}`} ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View primary source and citation"
        className="inline-flex items-center justify-center text-[10px] font-mono text-ink-muted/80 hover:text-accent border border-line rounded px-1 py-0.2 hover:bg-paper-subtle transition-all cursor-pointer select-none"
        title="View source citation"
      >
        src
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-72 sm:w-80 bg-paper-raised border border-line shadow-lg p-3.5 z-50 text-left animate-in fade-in zoom-in-95 duration-100 rounded-control">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-line text-xs font-medium text-ink">
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span>Primary Source Filing</span>
            </div>
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded ${
                confidence === "verified"
                  ? "bg-accent-light text-accent"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {confidence === "verified" ? (
                <>
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Verified
                </>
              ) : (
                <>
                  <AlertCircle className="w-2.5 h-2.5" />
                  Pending
                </>
              )}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <div className="font-semibold text-ink leading-tight">
                {source.documentName}
              </div>
              {source.sectionOrTable && (
                <div className="text-[11px] text-ink-muted mt-0.5">
                  {source.sectionOrTable}
                </div>
              )}
            </div>

            <div className="flex justify-between text-[11px] text-ink-muted border-t border-line/50 pt-1.5">
              <span>Date:</span>
              <span className="font-mono text-ink">
                {source.accessedOrFiledDate}
              </span>
            </div>

            <div className="flex justify-between text-[11px] text-ink-muted">
              <span>Type:</span>
              <span className="font-mono text-ink uppercase">
                {source.type}
              </span>
            </div>

            {notes && (
              <div className="p-2 bg-paper-subtle text-[11px] text-ink-muted rounded-control border border-line/60 mt-2">
                <span className="font-semibold text-ink">Note: </span>
                {notes}
              </div>
            )}

            {crossCheckSources && crossCheckSources.length > 0 && (
              <div className="border-t border-line/60 pt-2 mt-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-ink-muted mb-1">
                  Sources Disagreement Note:
                </div>
                {crossCheckSources.map((cc, idx) => (
                  <div
                    key={idx}
                    className="text-[11px] text-ink-muted p-1.5 bg-paper rounded mb-1"
                  >
                    <span className="font-medium text-ink">{cc.documentName}: </span>
                    <span className="font-mono font-semibold">{cc.value}</span>
                    {cc.note && <p className="text-[10px] mt-0.5">{cc.note}</p>}
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-line/60">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:underline"
              >
                <span>View EDGAR Filing / Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
