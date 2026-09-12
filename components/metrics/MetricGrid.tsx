import React from "react";

interface MetricGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  variant?: "open" | "contained" | "divided";
  className?: string;
}

export default function MetricGrid({
  children,
  columns = 4,
  variant = "open",
  className = "",
}: MetricGridProps) {
  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  if (variant === "contained") {
    return (
      <div
        className={`grid ${colClass} gap-6 p-6 bg-paper-raised border border-line rounded-card shadow-xs ${className}`}
      >
        {children}
      </div>
    );
  }

  if (variant === "divided") {
    return (
      <div
        className={`grid ${colClass} gap-x-8 gap-y-6 py-6 border-y border-line ${className}`}
      >
        {children}
      </div>
    );
  }

  // Default "open" editorial style: clean background, subtle borders, generous breathing room
  return (
    <div
      className={`grid ${colClass} gap-6 p-6 bg-paper-raised/80 backdrop-blur-xs border border-line/80 rounded-card shadow-xs ${className}`}
    >
      {children}
    </div>
  );
}
