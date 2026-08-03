import React from "react";

/** Flat line-art temple (gopuram) silhouette, tinted via currentColor. */
const TempleSilhouette: React.FC<{ className?: string }> = ({ className = "w-full h-auto text-orange-500" }) => (
  <svg viewBox="0 0 240 160" fill="none" className={className}>
    <g fill="currentColor">
      <rect x="10" y="140" width="220" height="6" opacity="0.9" />
      <rect x="30" y="120" width="180" height="20" opacity="0.85" />
      <rect x="45" y="70" width="150" height="50" opacity="0.8" />
      <rect x="60" y="30" width="30" height="90" opacity="0.9" />
      <rect x="105" y="20" width="30" height="100" opacity="0.95" />
      <rect x="150" y="30" width="30" height="90" opacity="0.9" />
      <polygon points="60,30 75,10 90,30" opacity="0.9" />
      <polygon points="105,20 120,0 135,20" opacity="0.95" />
      <polygon points="150,30 165,10 180,30" opacity="0.9" />
      <rect x="117" y="-6" width="6" height="14" opacity="0.95" />
      <circle cx="120" cy="-10" r="4" opacity="0.95" />
    </g>
  </svg>
);

export default TempleSilhouette;
