import { Link } from "react-router-dom";
import { Stack } from "@dome/ui";
import { useRuns } from "../hooks";
import { ConvergenceBadge } from "../components/ConvergenceBadge";
import type { Run } from "../api";

export function RunListPage() {
  const { data, error, loading } = useRuns();

  if (loading) return <p className="duett-empty">Loading runs…</p>;
  if (error) return <p className="duett-error">Error: {error}</p>;
  if (!data || data.length === 0) {
    return <p className="duett-empty">No runs yet. Trigger one via /duett &lt;frage&gt; in TG.</p>;
  }

  return (
    <Stack gap="md">
      <h1 className="duett-section-title">All runs ({data.length})</h1>
      {data.map((run) => <RunCard key={run.review_id} run={run} />)}
    </Stack>
  );
}

function RunCard({ run }: { run: Run }) {
  return (
    <Link to={`/run/${run.review_id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="duett-card">
        <div className="duett-card-header">
          <div className="duett-task">{run.task}</div>
          <ConvergenceBadge status={statusFromTags(run.tags)} />
        </div>
        <div className="duett-card-meta">
          {run.review_id} · {run.date} · accepted: {run.accepted}
          {run.verifier_used && <> · verifier: {run.verifier_used}</>}
          {run.sycophancy_break && (
            <> · <span className="duett-badge sycophancy">sycophancy break</span></>
          )}
        </div>
        <div className="duett-tags" style={{ marginTop: "0.4rem" }}>
          {run.tags.map((t) => <span key={t} className="duett-tag">{t}</span>)}
        </div>
      </div>
    </Link>
  );
}

function statusFromTags(tags: string[]): "consensus" | "verifier_decided" | "no_consensus" | null {
  if (tags.includes("consensus")) return "consensus";
  if (tags.includes("verifier_decided")) return "verifier_decided";
  if (tags.includes("no_consensus")) return "no_consensus";
  return null;
}
