import * as React from "react";
import { cn } from "../lib/cn";

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
}

export const Section = ({ id, className, containerClassName, children }: SectionProps) => (
  <section id={id} className={cn("relative scroll-mt-24 py-20 md:py-28", className)}>
    <div className={cn("container relative max-w-full overflow-hidden", containerClassName)}>{children}</div>
  </section>
);

export interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export const Eyebrow = ({ children, className }: EyebrowProps) => (
  <div className={cn("inline-flex items-center gap-3", className)}>
    <span className="min-w-0 break-words font-mono text-[10px] uppercase tracking-[0.22em] text-gold-soft sm:text-[11px] sm:tracking-[0.3em]">
      — {children}
    </span>
    <span className="hidden h-px w-10 shrink-0 bg-gradient-to-r from-gold/40 to-transparent sm:block" />
  </div>
);

export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading = ({ eyebrow, title, description, align = "center", className }: SectionHeadingProps) => (
  <div
    className={cn(
      "w-full max-w-[19.5rem] space-y-5 sm:max-w-2xl md:max-w-[42rem]",
      align === "center" ? "mx-auto text-center" : "",
      className,
    )}
  >
    {eyebrow && (
      <div className={align === "center" ? "flex justify-center" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
    )}
    <h2 className="break-words font-display text-[28px] font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[44px] md:leading-[1.05]">
      {title}
    </h2>
    {description && (
      <>
        <div className={cn("h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent", align === "center" ? "mx-auto w-20" : "w-20")} />
        <p className="text-[15px] leading-relaxed text-muted-foreground md:text-lg">{description}</p>
      </>
    )}
  </div>
);
