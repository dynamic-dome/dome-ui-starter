import { Stack } from "@dynamic-dome/ui";
import { useSpend } from "../hooks";

export function SpendPage() {
  const { data, error, loading } = useSpend();
  if (loading) return <p className="duett-empty">Loading spend…</p>;
  if (error) return <p className="duett-error">Error: {error}</p>;
  if (!data) return null;

  const cap = data.weekly_cap_usd;
  const totalSpend = Object.values(data.providers).reduce(
    (s, p) => s + p.spend_usd, 0,
  );
  const totalReserved = Object.values(data.providers).reduce(
    (s, p) => s + p.open_reservations_usd, 0,
  );
  const projected = totalSpend + totalReserved;
  const pct = projected / cap;
  const fillClass = pct >= 1 ? "bad" : pct >= 0.8 ? "warn" : "";

  return (
    <Stack gap="md">
      <h1 className="duett-section-title">
        Spend — week {data.week} (${totalSpend.toFixed(4)} of ${cap.toFixed(2)})
      </h1>

      <div className="duett-card">
        <div className="duett-card-header">
          <div>Total projected (spend + reserved)</div>
          <div className="duett-card-meta">
            ${projected.toFixed(4)} ({(pct * 100).toFixed(2)}%)
          </div>
        </div>
        <div className="duett-spend-bar">
          <div
            className={`duett-spend-fill ${fillClass}`}
            style={{ width: `${Math.min(100, pct * 100)}%` }}
          />
        </div>
      </div>

      {Object.entries(data.providers).map(([provider, p]) => (
        <div key={provider} className="duett-card">
          <div className="duett-card-header">
            <div><strong>{provider}</strong></div>
            <div className="duett-card-meta">
              ${p.spend_usd.toFixed(4)} spent
              {p.open_reservations_usd > 0 && (
                <> · ${p.open_reservations_usd.toFixed(4)} reserved</>
              )}
            </div>
          </div>
          <div className="duett-spend-bar">
            <div
              className="duett-spend-fill"
              style={{ width: `${Math.min(100, p.spend_pct * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </Stack>
  );
}
