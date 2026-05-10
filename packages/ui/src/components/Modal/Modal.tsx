import * as React from "react";

import { cn } from "../../lib/cn";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  closeLabel?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  width?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  closeLabel = "Dialog schließen",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  width,
  className,
  children,
  style,
  ...rest
}: ModalProps) {
  const titleId = React.useId();
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc) {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [closeOnEsc, onOpenChange, open]);

  if (!open) return null;

  const modalStyle = {
    ...style,
    ...(width ? { "--dome-modal-width": width } : {}),
  } as React.CSSProperties;

  return (
    <div
      className="dome-modal__overlay"
      onMouseDown={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn("dome-modal", className)}
        style={modalStyle}
        {...rest}
      >
        <div className="dome-modal__header">
          {title ? (
            <h2 id={titleId} className="dome-modal__title">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            ref={closeButtonRef}
            type="button"
            className="dome-modal__close"
            aria-label={closeLabel}
            onClick={() => onOpenChange(false)}
          >
            ×
          </button>
        </div>
        <div className="dome-modal__body">{children}</div>
      </div>
    </div>
  );
}
