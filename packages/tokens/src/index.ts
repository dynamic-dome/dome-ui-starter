export const domeTokenVersion = "0.1.1";

export const domeThemeClass = "dome-theme";
export const domeMiniappThemeClass = "dome-miniapp-theme";

export const statusLabels = {
  queued: "in Warteschlange",
  running: "läuft",
  waiting_approval: "wartet auf Freigabe",
  completed: "fertig",
  failed: "fehlgeschlagen",
  cancelled: "abgebrochen",
  ok: "bereit",
  idle: "bereit",
  busy: "arbeitet",
  warn: "Achtung",
} as const;

export type DomeStatus = keyof typeof statusLabels;
