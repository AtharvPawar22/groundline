"use client";

import { useState, useRef, useEffect, useId } from "react";
import { SourcedValue, UnitType } from "@/lib/types/schema";
import { formatMetricValue } from "@/lib/finance/format";
import { getGlossaryExplanation, getMetricDefinition } from "@/lib/data";
import SourcePopover from "./SourcePopover";
import ExplanationPopover from "./ExplanationPopover";
import { Info } from "lucide-react";

interface MetricCellProps {
  label: string;
  metricId: string;
  companyTicker: string;
  sourcedValue?: SourcedValue;
  rawOverrideValue?: number;
  unit?: UnitType;
  periodLabel?: string;
  size?: "hero" | "large" | "medium" | "small" | "table";
  className?: string;
  showExplanationInline?: boolean;
}

export default function MetricCell({
  label,
  metricId,
  companyTicker,
  sourcedValue,
  rawOverrideValue,
  unit,
  periodLabel,
  size = "medium",
  className = "",
  showExplanationInline = true,
}: MetricCellProps) {
  const [isExplaining, setIsExplaining] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const instanceId = useId();

  const value = rawOverrideValue !== undefined ? rawOverrideValue : sourcedValue?.value;
  const effectiveUnit = unit || sourcedValue?.unit || "USD_millions";
  const formattedValue = formatMetricValue(value, effectiveUnit);

  const explanation = getGlossaryExplanation(metricId);
  const metricDef = getMetricDefinition(metricId);
  const period = periodLabel || sourcedValue?.periodId || "";

  // Mutual exclusivity: close this popover if any other metric popover opens
  useEffect(() => {
    function handleOtherOpened(e: Event) {
      const customEvent = e as CustomEvent<{ instanceId: string }>;
      if (customEvent.detail?.instanceId !== instanceId) {
        setIsExplaining(false);
      }
    }

    window.addEventListener("groundline:open-metric-explanation", handleOtherOpened);
    return () => {
      window.removeEventListener("groundline:open-metric-explanation", handleOtherOpened);
    };
  }, [instanceId]);

  const toggleExplanation = () => {
    const nextState = !isExplaining;
    setIsExplaining(nextState);
    if (nextState) {
      window.dispatchEvent(
        new CustomEvent("groundline:open-metric-explanation", {
          detail: { instanceId, metricId },
        })
      );
    }
  };

  // Typography size classes based on hierarchy
  const valueSizeClass = {
    hero: "text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-ink font-normal",
    large: "text-2xl sm:text-3xl font-serif text-ink font-normal",
    medium: "text-xl sm:text-2xl font-serif text-ink font-normal",
    small: "text-lg sm:text-xl font-serif text-ink font-normal",
    table: "text-sm font-sans font-medium text-ink",
  }[size];

  return (
    <div ref={cellRef} className={`relative flex flex-col text-left group transition-all ${className}`}>
      {/* Header Line: Label + (i) Button */}
      <div className="flex items-center justify-between gap-1.5 mb-1 text-xs">
        <span className="font-medium text-ink-muted leading-tight truncate">
          {label || metricDef?.displayName || metricId}
        </span>

        {explanation && (
          <button
            ref={infoButtonRef}
            type="button"
            onClick={toggleExplanation}
            aria-label={`Explain ${label || metricDef?.displayName || metricId}`}
            aria-expanded={isExplaining}
            className={`inline-flex items-center justify-center w-5 h-5 rounded-full transition-all shrink-0 cursor-pointer ${
              isExplaining
                ? "bg-accent text-paper-raised shadow-xs ring-1 ring-accent"
                : "text-ink-muted/70 hover:text-accent hover:bg-paper-subtle"
            }`}
            title="Click for contextual financial explanation"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Main Display: Tabular Value */}
      <div className="flex items-baseline gap-2 my-0.5">
        <span className={`${valueSizeClass} tabular-nums leading-none`}>
          {formattedValue}
        </span>
      </div>

      {/* Footer Line: Period Caption + Source Popover */}
      {(period || sourcedValue?.source) && (
        <div className="flex items-center justify-between gap-2 mt-1 text-[11px] text-ink-faint font-mono">
          {period && <span className="text-ink-muted/80 truncate">{period}</span>}
          {sourcedValue?.source && (
            <SourcePopover
              source={sourcedValue.source}
              crossCheckSources={sourcedValue.crossCheckSources}
              confidence={sourcedValue.confidence}
              notes={sourcedValue.notes}
            />
          )}
        </div>
      )}

      {/* Floating Contextual Explanation Popover (Zero layout disruption) */}
      {showExplanationInline && explanation && (
        <ExplanationPopover
          explanation={explanation}
          companyTicker={companyTicker}
          isOpen={isExplaining}
          onClose={() => setIsExplaining(false)}
          triggerRef={cellRef}
        />
      )}
    </div>
  );
}
