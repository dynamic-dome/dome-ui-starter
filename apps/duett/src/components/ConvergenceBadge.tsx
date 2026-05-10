type Status = "consensus" | "verifier_decided" | "no_consensus" | null;

const LABELS: Record<NonNullable<Status>, string> = {
  consensus: "consensus",
  verifier_decided: "verifier",
  no_consensus: "no consensus",
};

const CLASSES: Record<NonNullable<Status>, string> = {
  consensus: "consensus",
  verifier_decided: "verifier",
  no_consensus: "no-consensus",
};

export function ConvergenceBadge({ status }: { status: Status }) {
  if (!status) return null;
  return <span className={`duett-badge ${CLASSES[status]}`}>{LABELS[status]}</span>;
}
