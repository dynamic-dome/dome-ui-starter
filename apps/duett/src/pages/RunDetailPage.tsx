import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack } from "@dome/ui";
import { type Run, type RoundData, cancelRun, getRun } from "../api";
import { useRunStream } from "../hooks";
import { ConvergenceBadge } from "../components/ConvergenceBadge";

export function RunDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [run, setRun] = useState<Run | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Try to load the run from memory. If 404, the run is still active —
  // we open the WS stream instead.
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    getRun(id)
      .then((r) => { if (!cancelled) setRun(r); })
      .catch((e: Error) => {
        if (!cancelled) {
          // 404 likely means it's still live — that's not an error.
          if (!e.message.includes("404")) setError(e.message);
        }
      });
    return () => { cancelled = true; };
  }, [id]);

  // Subscribe to WS if no completed run was found yet.
  const isLive = !run && !error;
  const { events, status } = useRunStream(id, isLive);

  // If the WS sent a `final` event, hydrate from the event_data so the
  // user sees the result immediately without re-fetching.
  const finalEvent = events.find((e) => e.event_type === "final");

  if (error) return <p className="duett-error">Error: {error}</p>;

  if (run) return <CompletedRunView run={run} />;

  if (finalEvent && finalEvent.event_type === "final") {
    return <LiveFinalView runId={id!} data={finalEvent.data} />;
  }

  return (
    <LiveRunView
      runId={id!}
      rounds={events
        .filter((e): e is { event_type: "round"; run_id: string; data: RoundData } =>
          e.event_type === "round")
        .map((e) => e.data)}
      cancelled={events.some((e) => e.event_type === "cancel")}
      errored={events.find((e) => e.event_type === "error")?.data.error ?? null}
      wsStatus={status}
    />
  );
}

function CompletedRunView({ run }: { run: Run }) {
  const status: "consensus" | "verifier_decided" | "no_consensus" =
    run.tags.includes("verifier_decided") ? "verifier_decided"
    : run.tags.includes("no_consensus") ? "no_consensus"
    : "consensus";

  return (
    <Stack gap="md">
      <div className="duett-card">
        <div className="duett-card-header">
          <h1 className="duett-section-title">{run.task}</h1>
          <ConvergenceBadge status={status} />
        </div>
        <div className="duett-card-meta">
          {run.review_id} · {run.date} · {run.project}
          {run.sycophancy_break && (
            <> · <span className="duett-badge sycophancy">sycophancy break</span></>
          )}
        </div>
      </div>

      <div className="duett-card">
        <h2 className="duett-section-title">Findings</h2>
        <div className="duett-row">
          <span className="duett-label">{run.agent_a}</span>
          <div style={{ whiteSpace: "pre-wrap", flex: 1 }}>{run.finding_a}</div>
        </div>
        <div className="duett-row">
          <span className="duett-label">{run.agent_b}</span>
          <div style={{ whiteSpace: "pre-wrap", flex: 1 }}>{run.finding_b}</div>
        </div>
        <div className="duett-row">
          <span className="duett-label">accepted</span>
          <div>{run.accepted}</div>
        </div>
        {run.verifier_used && (
          <div className="duett-row">
            <span className="duett-label">verifier</span>
            <div>
              {run.verifier_used}
              {run.verifier_verdict && <> — {run.verifier_verdict}</>}
            </div>
          </div>
        )}
      </div>

      {run.note && (
        <div className="duett-card">
          <h2 className="duett-section-title">Note</h2>
          <div style={{ whiteSpace: "pre-wrap" }}>{run.note}</div>
        </div>
      )}
    </Stack>
  );
}

function LiveRunView({
  runId, rounds, cancelled, errored, wsStatus,
}: {
  runId: string;
  rounds: RoundData[];
  cancelled: boolean;
  errored: string | null;
  wsStatus: string;
}) {
  const [cancelling, setCancelling] = useState(false);

  async function onCancel() {
    setCancelling(true);
    try { await cancelRun(runId); } finally { setCancelling(false); }
  }

  return (
    <Stack gap="md">
      <div className="duett-card">
        <div className="duett-card-header">
          <h1 className="duett-section-title">
            <span className="duett-badge live">LIVE</span> Run {runId}
          </h1>
          <button
            className="duett-cancel-btn"
            onClick={onCancel}
            disabled={cancelling || cancelled || !!errored}
          >
            {cancelling ? "Cancelling…" : "Cancel run"}
          </button>
        </div>
        <div className="duett-card-meta">
          WebSocket: {wsStatus} · {rounds.length} round{rounds.length !== 1 ? "s" : ""} so far
        </div>
      </div>

      {errored && <div className="duett-error">Run failed: {errored}</div>}
      {cancelled && (
        <div className="duett-empty">⛔ Run was cancelled by the user.</div>
      )}

      {rounds.map((r, i) => <RoundCard key={i} round={r} />)}
      {rounds.length === 0 && !cancelled && !errored && (
        <p className="duett-empty">Waiting for first round…</p>
      )}
    </Stack>
  );
}

function LiveFinalView({ runId, data }: { runId: string; data: import("../api").FinalData }) {
  return (
    <Stack gap="md">
      <div className="duett-card">
        <div className="duett-card-header">
          <h1 className="duett-section-title">Run {runId} — finished</h1>
          <ConvergenceBadge status={data.convergence_status} />
        </div>
        <div className="duett-card-meta">
          {data.rounds.length} rounds · ${data.total_cost_usd.toFixed(4)}
          {data.verifier_used && <> · verifier: {data.verifier_used}</>}
        </div>
      </div>
      <div className="duett-card">
        <h2 className="duett-section-title">Final answer</h2>
        <div style={{ whiteSpace: "pre-wrap" }}>{data.final_answer}</div>
      </div>
      {data.rounds.map((r, i) => <RoundCard key={i} round={r} />)}
    </Stack>
  );
}

function RoundCard({ round }: { round: RoundData }) {
  return (
    <div className={`duett-round actor-${round.actor}`}>
      <div className="duett-round-meta">
        <span><strong>R{round.round_number}</strong></span>
        <span>{round.actor}</span>
        <span>· {round.role}</span>
        <span>· ${round.cost_usd.toFixed(4)}</span>
      </div>
      <div className="duett-round-text">{round.text}</div>
    </div>
  );
}
