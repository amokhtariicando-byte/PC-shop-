'use client';

import React from 'react';

interface BayProps {
  fill?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Smooth concave upward arch carved into the bottom edge of the Hero green banner
 * matching Screenshot 1 (directly below the CTA button for pagination dots).
 */
export function HeroBottomNotchBay({
  fill = '#fafafa',
  className = '',
  children,
}: BayProps) {
  return (
    <div
      className={`absolute bottom-0 z-20 w-[116px] h-[28px] flex items-end justify-center pb-1.5 ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 116 28"
        width="116"
        height="28"
        fill="none"
        className="absolute inset-0 pointer-events-none select-none block"
      >
        <path
          d="M 0,28 C 16,28 18,1 34,1 L 82,1 C 98,1 100,28 116,28 Z"
          fill={fill}
        />
      </svg>
      <div className="relative z-10 flex items-center gap-1.5">{children}</div>
    </div>
  );
}

/**
 * G1-continuous circular concave scoop carved into the LEFT vertical edge
 * of the 3 Mid Promo Banners (Screenshot 2), with concentric slot for the circular arrow button.
 * Bay center: (8, 48), Bay radius: 28, Shoulder fillets: r=12 tangent to x=0.
 * dx = 12 - 8 = 4, R+r = 40 -> dy = sqrt(1600 - 16) = 39.80.
 * Tangent points: tx = 8 + 4*(28/40) = 10.8, ty = 48 ± 39.80*(28/40) = 48 ± 27.86 -> 20.14 / 75.86.
 */
export function LeftNotchBay({
  fill = '#fafafa',
  className = '',
  children,
}: BayProps) {
  return (
    <div
      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[38px] h-[96px] z-20 pointer-events-none ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="-10 0 48 96"
        width="48"
        height="96"
        fill="none"
        className="absolute top-0 -left-[10px] pointer-events-none select-none block"
      >
        <path
          d="M -10,0 L 0,0 L 0,8.20 A 12,12 0 0 0 10.80,20.14 A 28,28 0 0 1 10.80,75.86 A 12,12 0 0 0 0,87.80 L 0,96 L -10,96 Z"
          fill={fill}
        />
      </svg>
      <div className="absolute left-[8px] top-[48px] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        {children}
      </div>
    </div>
  );
}

/**
 * G1-continuous circular concave scoop carved downward into the TOP horizontal edge
 * of the 2 Wide Audio Banners (Screenshot 4) and 2 Service Cards (Screenshot 6),
 * with concentric slot for the circular arrow/icon badge.
 * Bay center: (56, 4), Bay radius: 31, Shoulder fillets: r=13 tangent to y=0.
 */
export function TopNotchBay({
  fill = '#fafafa',
  className = '',
  children,
}: BayProps) {
  return (
    <div
      className={`absolute top-0 w-[112px] h-[38px] z-20 pointer-events-none ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 -10 112 48"
        width="112"
        height="48"
        fill="none"
        className="absolute -top-[10px] left-0 pointer-events-none select-none block"
      >
        <path
          d="M 0,-10 L 112,-10 L 112,0 L 99.07,0 A 13,13 0 0 0 86.34,10.34 A 31,31 0 0 1 25.66,10.34 A 13,13 0 0 0 12.93,0 L 0,0 Z"
          fill={fill}
        />
      </svg>
      <div className="absolute left-[56px] top-[4px] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        {children}
      </div>
    </div>
  );
}

/**
 * G1-continuous quarter-circle corner cutout carved into the TOP-LEFT corner
 * of the tall Orange Network Banner (Screenshot 3) with concentric slot for the Sarv logo pill.
 * Bay center: (30, 30), Bay radius: 36, Shoulder fillets: r=16 tangent to x=0 and y=0.
 */
export function TopLeftCornerBay({
  fill = '#fafafa',
  className = '',
  children,
}: BayProps) {
  return (
    <div
      className={`absolute top-0 left-0 w-[86px] h-[86px] z-20 pointer-events-none ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="-6 -6 94 94"
        width="94"
        height="94"
        fill="none"
        className="absolute -top-[6px] -left-[6px] pointer-events-none select-none block"
      >
        <path
          d="M -6,-6 L 80.08,-6 L 80.08,0 A 16,16 0 0 0 64.67,20.31 A 36,36 0 0 1 20.31,64.67 A 16,16 0 0 0 0,80.08 L -6,80.08 Z"
          fill={fill}
        />
      </svg>
      <div className="absolute left-[30px] top-[30px] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        {children}
      </div>
    </div>
  );
}

/**
 * Softly rounded inverted-trapezoid orange tab background for the Footer social bar
 * matching Screenshot 7.
 */
export function FooterTrapezoidBg({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 58"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none select-none w-full h-full ${className}`}
    >
      <path
        d="M 22,0 L 298,0 C 314,0 320,10 315,24 L 306,46 C 302,54 295,58 284,58 L 36,58 C 25,58 18,54 14,46 L 5,24 C 0,10 6,0 22,0 Z"
        fill="#ff611a"
      />
    </svg>
  );
}

/**
 * Subtle translucent curly ribbon swoosh in the top-left corner of the Orange Discount
 * and Dark Green Stock Products containers (Screenshots 1, 2, 5).
 */
export function SectionRibbonFlourish({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 200"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M -20,30 C 30,-10 95,12 88,75 C 82,130 22,135 28,85 C 34,35 128,-20 188,25 C 232,58 215,148 145,155 C 95,160 88,108 135,96 C 175,86 225,118 255,175"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
        opacity="0.13"
      />
    </svg>
  );
}
