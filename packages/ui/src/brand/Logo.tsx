import * as React from "react";
import { cn } from "../lib/cn";

export interface LogoProps {
  className?: string;
  showText?: boolean;
  title?: string;
  subtitle?: string;
}

export const Logo = ({ className, showText = true, title = "DoMe Dynamics", subtitle = "AI Agent Systems" }: LogoProps) => {
  const id = React.useId().replace(/:/g, "");
  const goldId = `${id}-gold`;
  const neonId = `${id}-neon`;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative h-9 w-9 shrink-0">
        <svg viewBox="0 0 40 40" className="h-full w-full" role="img" aria-label={title}>
          <defs>
            <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(42 70% 70%)" />
              <stop offset="50%" stopColor="hsl(42 65% 55%)" />
              <stop offset="100%" stopColor="hsl(38 55% 40%)" />
            </linearGradient>
            <linearGradient id={neonId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(188 95% 58%)" />
              <stop offset="100%" stopColor="hsl(320 95% 62%)" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="13" fill="none" stroke={`url(#${goldId})`} strokeWidth="1" />
          <ellipse cx="20" cy="20" rx="13" ry="5" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.7" opacity="0.7" />
          <ellipse cx="20" cy="20" rx="5" ry="13" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.7" opacity="0.7" />
          <line x1="7" y1="20" x2="33" y2="20" stroke={`url(#${goldId})`} strokeWidth="0.7" opacity="0.7" />
          <ellipse cx="20" cy="20" rx="17" ry="5" fill="none" stroke={`url(#${neonId})`} strokeWidth="1.2" transform="rotate(-20 20 20)" />
          <circle cx="36" cy="16" r="1.2" fill="hsl(320 95% 62%)" />
        </svg>
      </div>
      {showText && (
        <div className="leading-none">
          <div className="font-display text-[15px] font-semibold tracking-wide">
            <span className="text-foreground">{title.split(" ")[0]}</span>{" "}
            <span className="text-gold">{title.split(" ").slice(1).join(" ") || "Dynamics"}</span>
          </div>
          <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">{subtitle}</div>
        </div>
      )}
    </div>
  );
};
