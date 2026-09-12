import React from "react";

interface HeaderTextureProps {
  ticker: string;
  className?: string;
}

export default function HeaderTexture({ ticker, className = "" }: HeaderTextureProps) {
  const normTicker = ticker.toUpperCase();

  if (normTicker === "NVDA") {
    // Silicon wafer / tensor grid geometry
    return (
      <svg
        className={`absolute right-0 top-0 h-full w-96 pointer-events-none opacity-[0.05] overflow-hidden ${className}`}
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="nvda-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#2D5F34" strokeWidth="1" />
          <circle cx="12" cy="12" r="1.5" fill="#2D5F34" />
        </pattern>
        <rect width="400" height="200" fill="url(#nvda-grid)" />
        <circle cx="320" cy="100" r="80" stroke="#2D5F34" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="320" cy="100" r="130" stroke="#2D5F34" strokeWidth="1" strokeDasharray="8 8" />
      </svg>
    );
  }

  if (normTicker === "NFLX") {
    // Cinematic 2.39:1 widescreen frame & audio frequency waves
    return (
      <svg
        className={`absolute right-0 top-0 h-full w-96 pointer-events-none opacity-[0.05] overflow-hidden ${className}`}
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="220" y="30" width="160" height="67" rx="3" stroke="#8B242D" strokeWidth="1.5" />
        <rect x="240" y="110" width="140" height="58" rx="3" stroke="#8B242D" strokeWidth="1" strokeDasharray="3 3" />
        <path
          d="M 100 100 Q 150 40 200 100 T 300 100 T 400 100"
          stroke="#8B242D"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 120 100 Q 170 160 220 100 T 320 100"
          stroke="#8B242D"
          strokeWidth="1"
          strokeDasharray="2 4"
          fill="none"
        />
      </svg>
    );
  }

  if (normTicker === "JPM") {
    // Neoclassical banking column grid / financial ledger geometry
    return (
      <svg
        className={`absolute right-0 top-0 h-full w-96 pointer-events-none opacity-[0.05] overflow-hidden ${className}`}
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="220" y1="20" x2="220" y2="180" stroke="#1A3D63" strokeWidth="1.5" />
        <line x1="260" y1="20" x2="260" y2="180" stroke="#1A3D63" strokeWidth="1.5" />
        <line x1="300" y1="20" x2="300" y2="180" stroke="#1A3D63" strokeWidth="1.5" />
        <line x1="340" y1="20" x2="340" y2="180" stroke="#1A3D63" strokeWidth="1.5" />
        <line x1="380" y1="20" x2="380" y2="180" stroke="#1A3D63" strokeWidth="1.5" />
        <rect x="200" y="30" width="190" height="140" stroke="#1A3D63" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    );
  }

  return null;
}
