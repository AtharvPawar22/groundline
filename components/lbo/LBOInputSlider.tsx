"use client";

interface LBOInputSliderProps {
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: "percent" | "ratio" | "years" | "currency";
  onChange: (val: number) => void;
  warning?: string;
}

export default function LBOInputSlider({
  label,
  sublabel,
  value,
  min,
  max,
  step,
  unit = "ratio",
  onChange,
  warning,
}: LBOInputSliderProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value);
    if (!isNaN(raw)) {
      if (unit === "percent") {
        onChange(raw / 100);
      } else {
        onChange(raw);
      }
    }
  };

  const inputValue = unit === "percent" ? +(value * 100).toFixed(1) : value;

  return (
    <div className="space-y-2 p-3.5 bg-paper rounded-card border border-line/80 hover:border-line-strong transition-all">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <span className="font-sans text-xs font-semibold text-ink block truncate">
            {label}
          </span>
          {sublabel && (
            <span className="text-[10px] font-mono text-ink-muted block truncate">
              {sublabel}
            </span>
          )}
        </div>

        {/* Direct Entry Input Box */}
        <div className="flex items-center gap-1 shrink-0">
          <input
            type="number"
            min={unit === "percent" ? min * 100 : min}
            max={unit === "percent" ? max * 100 : max}
            step={unit === "percent" ? step * 100 : step}
            value={inputValue}
            onChange={handleInputChange}
            className="w-16 px-2 py-1 text-right font-serif text-xs font-bold text-ink bg-paper-raised border border-line rounded-control tabular-nums focus:border-accent focus:ring-1 focus:ring-accent"
          />
          <span className="font-mono text-xs text-ink-muted w-4">
            {unit === "percent" ? "%" : unit === "ratio" ? "x" : unit === "years" ? "yr" : ""}
          </span>
        </div>
      </div>

      {/* Touch-Friendly Slider (min 44px hit target) */}
      <div className="py-1.5 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          aria-label={label}
          style={{ touchAction: "pan-y" }}
          className="w-full h-2 bg-line rounded-lg appearance-none cursor-pointer accent-accent focus:outline-none"
        />
      </div>

      {warning && (
        <div className="text-[10px] font-mono text-negative bg-negative-light p-1.5 rounded border border-negative-border">
          ⚠ {warning}
        </div>
      )}
    </div>
  );
}
