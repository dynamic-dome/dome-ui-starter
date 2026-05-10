import { useEffect, useState } from "react";
import {
  type Run,
  type SpendSummary,
  type WSEvent,
  getSpend,
  listRuns,
  openRunStream,
} from "./api";

type AsyncState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function useRuns(project?: string, refreshMs = 5000) {
  const [state, setState] = useState<AsyncState<Run[]>>({
    data: null, error: null, loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchOnce() {
      try {
        const res = await listRuns({ project, n: 200 });
        if (!cancelled) {
          setState({ data: res.runs, error: null, loading: false });
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setState((s) => ({
            ...s, error: (e as Error).message, loading: false,
          }));
        }
      }
    }
    fetchOnce();
    const id = setInterval(fetchOnce, refreshMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [project, refreshMs]);

  return state;
}

export function useSpend(refreshMs = 10_000) {
  const [state, setState] = useState<AsyncState<SpendSummary>>({
    data: null, error: null, loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchOnce() {
      try {
        const res = await getSpend();
        if (!cancelled) setState({ data: res, error: null, loading: false });
      } catch (e: unknown) {
        if (!cancelled) {
          setState((s) => ({
            ...s, error: (e as Error).message, loading: false,
          }));
        }
      }
    }
    fetchOnce();
    const id = setInterval(fetchOnce, refreshMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [refreshMs]);

  return state;
}

export function useRunStream(runId: string | undefined, enabled: boolean) {
  const [events, setEvents] = useState<WSEvent[]>([]);
  const [status, setStatus] = useState<
    "idle" | "connecting" | "open" | "closed" | "error"
  >("idle");

  useEffect(() => {
    if (!runId || !enabled) {
      setStatus("idle");
      return;
    }
    setStatus("connecting");
    const ws = openRunStream(runId);
    ws.onopen = () => setStatus("open");
    ws.onmessage = (msg) => {
      try {
        const ev = JSON.parse(msg.data) as WSEvent;
        if (ev.event_type === "ping") return;
        setEvents((prev) => [...prev, ev]);
      } catch {
        /* ignore malformed */
      }
    };
    ws.onerror = () => setStatus("error");
    ws.onclose = () => setStatus("closed");
    return () => {
      try { ws.close(); } catch { /* ignore */ }
    };
  }, [runId, enabled]);

  return { events, status };
}
