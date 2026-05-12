import * as React from "react";
import { cn } from "../lib/cn";
import { Button, type ButtonProps } from "../primitives/Button";

export interface HeroAction {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonProps["variant"];
  /** Stable key for React list reconciliation when label is JSX. */
  key?: string;
}

export interface HeroTag {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface DoMeHeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  lead?: React.ReactNode;
  actions?: HeroAction[];
  tags?: HeroTag[];
  visual?: React.ReactNode;
}

export function DoMeHero({
  eyebrow = "DoMe Dynamics · Werkstatt",
  title = <>Eine Werkstatt für <span className="italic text-gold-soft font-medium">agentische</span> Software.</>,
  subtitle = "Offen, im Aufbau.",
  lead,
  actions = [],
  tags = [],
  visual,
  className,
  ...props
}: DoMeHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24", className)} {...props}>
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[900px] w-[900px] -translate-x-1/2 bg-gradient-radial-gold opacity-60" />

      <div className="container relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 max-w-[19.5rem] space-y-7 animate-fade-up sm:max-w-2xl lg:col-span-7 lg:max-w-none">
            <div className="inline-flex items-center gap-3">
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.28em] text-gold-soft sm:text-[11px]">— {eyebrow}</span>
              <span className="hidden h-px w-12 shrink-0 bg-gradient-to-r from-gold/40 to-transparent sm:block" />
            </div>

            <h1 className="break-words font-display text-[32px] font-semibold leading-[1.08] tracking-tight sm:text-5xl sm:leading-[1.04] md:text-6xl lg:text-[68px]">
              {title}
              {subtitle && <span className="mt-2 block text-[26px] font-normal text-foreground/85 sm:text-3xl md:text-4xl lg:text-[40px]">{subtitle}</span>}
            </h1>

            <div className="h-px w-20 bg-gradient-to-r from-gold/60 to-transparent" />

            {lead && <p className="max-w-full break-words text-[15px] leading-relaxed text-muted-foreground sm:text-lg md:max-w-2xl md:text-xl">{lead}</p>}

            {actions.length > 0 && (
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                {actions.map((action, index) => (
                  <Button key={action.key ?? action.href ?? index} asChild={Boolean(action.href)} variant={action.variant ?? "gold"} className="w-full whitespace-normal text-center sm:w-auto" onClick={action.onClick}>
                    {action.href ? <a href={action.href}>{action.label}</a> : action.label}
                  </Button>
                ))}
              </div>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => {
                  const inner = (
                    <>
                      {tag.icon && <span className="text-gold-soft">{tag.icon}</span>}
                      {tag.label}
                    </>
                  );
                  return tag.href ? (
                    <a key={tag.label} href={tag.href} className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/30 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur transition-colors hover:border-gold/30 hover:text-foreground">
                      {inner}
                    </a>
                  ) : (
                    <span key={tag.label} className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/30 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur">
                      {inner}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {visual && <div className="hidden animate-fade-up lg:col-span-5 lg:block">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
