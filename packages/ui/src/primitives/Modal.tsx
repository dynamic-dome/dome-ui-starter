import * as React from "react";
import { cn } from "../lib/cn";

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  closeLabel?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  closeLabel = "Close dialog",
  className,
  children,
  ...props
}: ModalProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();

  React.useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange?.(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange?.(false);
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "relative w-full max-w-lg rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-panel",
          className,
        )}
        onMouseDown={(event) => event.stopPropagation()}
        {...props}
      >
        <button
          type="button"
          aria-label={closeLabel}
          className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => onOpenChange?.(false)}
        >
          x
        </button>
        {(title || description) && (
          <header className="mb-5 space-y-2 pr-10">
            {title && (
              <h2 id={titleId} className="text-xl font-semibold tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p id={descriptionId} className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}
