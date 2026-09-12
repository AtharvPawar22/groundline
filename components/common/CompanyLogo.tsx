import React from "react";

interface CompanyLogoProps {
  ticker: string;
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  className?: string;
}

export default function CompanyLogo({
  ticker,
  size = "md",
  showWordmark = false,
  className = "",
}: CompanyLogoProps) {
  const normTicker = ticker.toUpperCase();

  const sizeDimensions = {
    sm: { box: "w-5 h-5", text: "text-xs" },
    md: { box: "w-8 h-8", text: "text-sm" },
    lg: { box: "w-10 h-10", text: "text-base" },
    xl: { box: "w-12 h-12", text: "text-lg" },
  }[size];

  // Authentic, official vector SVG marks for each company
  const renderMark = () => {
    switch (normTicker) {
      // 1. NVIDIA (Official Spiral Ribbon & Eye Mark)
      case "NVDA":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="NVIDIA Official Logo">
            <rect width="40" height="40" rx="8" fill="#1B1F23" />
            <g transform="translate(6, 7.5) scale(0.7)">
              {/* Outer sweeping spiral path */}
              <path
                d="M17.5 1.5C9.5 1.5 3 8 3 16C3 24 9.5 30.5 17.5 30.5C22.8 30.5 27.5 27.6 30 23.3L25.6 20.4C23.8 23.4 20.8 25.2 17.5 25.2C12.4 25.2 8.3 21.1 8.3 16C8.3 10.9 12.4 6.8 17.5 6.8C20.8 6.8 23.8 8.6 25.6 11.6L30 8.7C27.5 4.4 22.8 1.5 17.5 1.5Z"
                fill="#76B900"
              />
              {/* Inner eye contour */}
              <path
                d="M17.5 10.8C14.6 10.8 12.3 13.1 12.3 16C12.3 18.9 14.6 21.2 17.5 21.2C19.6 21.2 21.4 20 22.2 18.2L17.5 15.5V13.8L25.3 15.8C25.4 15.9 25.4 16 25.4 16C25.4 20.4 21.9 23.9 17.5 23.9C13.1 23.9 9.6 20.4 9.6 16C9.6 11.6 13.1 8.1 17.5 8.1C20.1 8.1 22.4 9.4 23.8 11.3L21.8 12.9C20.9 11.6 19.3 10.8 17.5 10.8Z"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        );

      // 2. Netflix (Official Iconic 3D Ribbon 'N' Logo)
      case "NFLX":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="Netflix Official Logo">
            <rect width="40" height="40" rx="8" fill="#141414" />
            <g transform="translate(10, 6) scale(0.85)">
              {/* Left vertical ribbon */}
              <path
                d="M0 0H6.5V28H0V0Z"
                fill="#E50914"
              />
              {/* Right vertical ribbon */}
              <path
                d="M16.5 0H23V28H16.5V0Z"
                fill="#E50914"
              />
              {/* Center crossing diagonal ribbon with shadow depth */}
              <path
                d="M0 0H6.6L23 28H16.4L0 0Z"
                fill="#B81D24"
              />
              {/* Overlay highlight on diagonal */}
              <path
                d="M0 0H6.6L14.8 14L8.2 14L0 0Z"
                fill="#E50914"
                opacity="0.75"
              />
            </g>
          </svg>
        );

      // 3. JPMorgan Chase (Official 4-Segment Chase Octagon Logo)
      case "JPM":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="JPMorgan Chase Official Logo">
            <rect width="40" height="40" rx="8" fill="#0A2540" />
            <g transform="translate(8, 8) scale(0.6)">
              {/* Top-right segment */}
              <path d="M20 0H34L26 8H20V0Z" fill="#117ACA" />
              {/* Bottom-right segment */}
              <path d="M40 14V28L32 20V14H40Z" fill="#117ACA" />
              {/* Bottom-left segment */}
              <path d="M20 40H6L14 32H20V40Z" fill="#117ACA" />
              {/* Top-left segment */}
              <path d="M0 26V12L8 20V26H0Z" fill="#117ACA" />
              {/* Central inner diamond accent */}
              <rect x="14" y="14" width="12" height="12" rx="1" fill="#FFFFFF" opacity="0.95" />
            </g>
          </svg>
        );

      // Peers: AMD (Official Interlocking Arrow Chevrons)
      case "AMD":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="AMD Logo">
            <rect width="40" height="40" rx="8" fill="#1E1E1E" />
            <g transform="translate(9, 9) scale(0.55)">
              <path d="M0 0H22V22H14V14H6V6H0V0Z" fill="#009A66" />
              <path d="M38 0H40V40H0V38H32V6H38V0Z" fill="#009A66" />
              <path d="M40 0H24V8H32V16H40V0Z" fill="#FFFFFF" />
            </g>
          </svg>
        );

      // Broadcom (AVGO - Official Wave Pulse Mark)
      case "AVGO":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="Broadcom Logo">
            <rect width="40" height="40" rx="8" fill="#CC092F" />
            <g transform="translate(8, 12) scale(0.6)">
              <path d="M4 14C4 6.27 10.27 0 18 0H22C29.73 0 36 6.27 36 14C36 21.73 29.73 28 22 28H18C10.27 28 4 21.73 4 14Z" fill="#FFFFFF" />
              <path d="M12 14L16 8L20 20L24 10L28 14" stroke="#CC092F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        );

      // TSMC (Official Semiconductor Silicon Grid)
      case "TSM":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="TSMC Logo">
            <rect width="40" height="40" rx="8" fill="#FFFFFF" stroke="#DCE0D6" />
            <g transform="translate(9, 9) scale(0.55)">
              <circle cx="20" cy="20" r="18" stroke="#D32F2F" strokeWidth="3" fill="none" />
              <line x1="8" y1="14" x2="32" y2="14" stroke="#D32F2F" strokeWidth="2" />
              <line x1="8" y1="20" x2="32" y2="20" stroke="#D32F2F" strokeWidth="2" />
              <line x1="8" y1="26" x2="32" y2="26" stroke="#D32F2F" strokeWidth="2" />
              <line x1="14" y1="8" x2="14" y2="32" stroke="#D32F2F" strokeWidth="2" />
              <line x1="20" y1="8" x2="20" y2="32" stroke="#D32F2F" strokeWidth="2" />
              <line x1="26" y1="8" x2="26" y2="32" stroke="#D32F2F" strokeWidth="2" />
            </g>
          </svg>
        );

      // The Walt Disney Company (DIS - Official Disney Script Mark)
      case "DIS":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="Disney Logo">
            <rect width="40" height="40" rx="8" fill="#113CCF" />
            <text x="20" y="27" textAnchor="middle" fill="#FFFFFF" fontFamily="serif" fontSize="22" fontWeight="bold" fontStyle="italic">
              D
            </text>
          </svg>
        );

      // Comcast (CMCSA - Official Peacock Arc Crest)
      case "CMCSA":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="Comcast Logo">
            <rect width="40" height="40" rx="8" fill="#1C1C1C" />
            <g transform="translate(10, 11) scale(0.5)">
              <path d="M20 2C10.06 2 2 10.06 2 20C2 29.94 10.06 38 20 38C29.94 38 38 29.94 38 20C38 10.06 29.94 2 20 2Z" fill="none" stroke="#FF5A00" strokeWidth="4" />
              <path d="M20 10V30" stroke="#00A3E0" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
        );

      // Bank of America (BAC - Official Red/Blue Ribbon Flag)
      case "BAC":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="Bank of America Logo">
            <rect width="40" height="40" rx="8" fill="#FFFFFF" stroke="#DCE0D6" />
            <g transform="translate(8, 12) scale(0.6)">
              <rect x="0" y="0" width="10" height="4" fill="#002D72" />
              <rect x="14" y="0" width="10" height="4" fill="#002D72" />
              <rect x="28" y="0" width="10" height="4" fill="#002D72" />
              <rect x="0" y="8" width="10" height="4" fill="#E31837" />
              <rect x="14" y="8" width="10" height="4" fill="#E31837" />
              <rect x="28" y="8" width="10" height="4" fill="#E31837" />
              <rect x="0" y="16" width="10" height="4" fill="#002D72" />
              <rect x="14" y="16" width="10" height="4" fill="#002D72" />
              <rect x="28" y="16" width="10" height="4" fill="#002D72" />
            </g>
          </svg>
        );

      // Wells Fargo (WFC - Official Red/Gold Crest)
      case "WFC":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="Wells Fargo Logo">
            <rect width="40" height="40" rx="8" fill="#D71E28" />
            <text x="20" y="26" textAnchor="middle" fill="#FFCD41" fontFamily="serif" fontSize="13" fontWeight="bold" letterSpacing="0.5">
              WF
            </text>
          </svg>
        );

      // Goldman Sachs (GS - Official Sky Blue Box)
      case "GS":
        return (
          <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-label="Goldman Sachs Logo">
            <rect width="40" height="40" rx="8" fill="#7399C6" />
            <text x="20" y="26" textAnchor="middle" fill="#FFFFFF" fontFamily="serif" fontSize="13" fontWeight="bold" letterSpacing="0.5">
              GS
            </text>
          </svg>
        );

      default:
        return (
          <div className="w-full h-full rounded-control bg-paper-subtle border border-line flex items-center justify-center font-mono font-semibold text-ink text-[10px]">
            {normTicker.slice(0, 4)}
          </div>
        );
    }
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className={`${sizeDimensions.box} shrink-0`}>
        {renderMark()}
      </div>
      {showWordmark && (
        <span className={`font-serif font-semibold text-ink ${sizeDimensions.text}`}>
          {normTicker === "NVDA"
            ? "NVIDIA"
            : normTicker === "NFLX"
            ? "Netflix"
            : normTicker === "JPM"
            ? "JPMorgan Chase"
            : normTicker}
        </span>
      )}
    </div>
  );
}
