import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 32, className = '' }) => {
  const gradId = 'logo-gradient';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label="Srinidhi Portfolio OS logo"
    >
      <defs>
        <linearGradient id={gradId} x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent-light)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="9" fill={`url(#${gradId})`} />
      <rect
        x="2.75"
        y="2.75"
        width="26.5"
        height="26.5"
        rx="8.25"
        stroke="white"
        strokeOpacity="0.18"
      />
      <text
        x="16"
        y="17"
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight="800"
        fontSize="16"
        fill="#ffffff"
        letterSpacing="-0.5"
      >
        S
      </text>
    </svg>
  );
};

export default Logo;
