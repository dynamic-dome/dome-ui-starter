/* Thin client for the DCO duett UI backend (Phase 6.1).
   Routes match mcp_servers/duett/api.py exactly. */

export type Run = {
  review_id: string;
  schema_version: number;
  date: string;
  task: string;
  agent_a: string;
  agent_b: string;
  finding_a: string;
  finding_b: string;
  accepted: "claude" | "codex" | "neither" | "both";
  verifier_used: string | null;
  verifier_verdict: string | null;
  project: string;
  tags: string[];
  sycophancy_break: boolean;
  note: string;
};

export type SpendSummary = {
  week: string;
  weekly_cap_usd: number;
  providers: Record<
    string,
    { spend_usd: number; open_reservations_usd: number; spend_pct: number }
  >;
};

export type WSEvent =
  | { event_type: "round"; run_id: string; data: RoundData }
  | { event_type: "final"; run_id: string; data: FinalData }
  | { event_type: "cancel"; run_id: string; data: Record<string, never> }
  | { event_type: "error"; run_id: string; data: { error: string } }
  | { event_type: "ping" };

export type RoundData = {
  round_number: number;
  actor: string;
  role: string;
  text: string;
  cost_usd: number;
};

export type FinalData = {
  final_answer: string;
  rounds: RoundData[];
  verifier_used: string | null;
  verifier_verdict: Record<string, unknown> | null;
  memory_entry_id: string;
  convergence_status: "consensus" | "verifier_decided" | "no_consensus";
  total_cost_usd: number;
};

const BASE = ""; // proxied by vite dev-server, same-origin in production

export async function listRuns(opts?: { project?: string; n?: number }) {
  const qs = new URLSearchParams();
  if (opts?.project) qs.set("project", opts.project);
  if (opts?.n) qs.set("n", String(opts.n));
  const url = `${BASE}/duett/api/runs${qs.toString() ? "?" + qs : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`listRuns ${res.status}`);
  return (await res.json()) as { count: number; runs: Run[] };
}

export async function getRun(reviewId: string): Promise<Run> {
  const res = await fetch(`${BASE}/duett/api/runs/${reviewId}`);
  if (!res.ok) throw new Error(`getRun ${res.status}`);
  return res.json();
}

export async function getSpend(): Promise<SpendSummary> {
  const res = await fetch(`${BASE}/duett/api/spend`);
  if (!res.ok) throw new Error(`getSpend ${res.status}`);
  return res.json();
}

export async function cancelRun(runId: string) {
  const res = await fetch(`${BASE}/duett/api/cancel/${runId}`, {
    method: "POST",
  });
  return res.json();
}

export function openRunStream(runId: string): WebSocket {
  const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
  const host = window.location.host || "localhost:5174";
  return new WebSocket(`${proto}//${host}/duett/ws/${runId}`);
}
