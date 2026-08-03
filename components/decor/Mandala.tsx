import React from "react";

/** Decorative line-art mandala motif, tinted via currentColor. */
const Mandala: React.FC<{ className?: string }> = ({ className = "w-40 h-40 text-orange-300" }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className}>
    <g stroke="currentColor" strokeWidth="1">
      <circle cx="100" cy="100" r="96" opacity="0.25" />
      <circle cx="100" cy="100" r="78" opacity="0.35" />
      <circle cx="100" cy="100" r="60" opacity="0.45" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`} opacity="0.5">
            <path d="M100 22 Q106 40 100 60 Q94 40 100 22 Z" fill="currentColor" opacity="0.3" stroke="none" />
          </g>
        );
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8 + 11.25;
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + 96 * Math.cos((angle * Math.PI) / 180)}
            y2={100 + 96 * Math.sin((angle * Math.PI) / 180)}
            opacity="0.15"
          />
        );
      })}
      <circle cx="100" cy="100" r="8" opacity="0.5" />
    </g>
  </svg>
);

export default Mandala;
