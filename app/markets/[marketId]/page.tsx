import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { MarketSchema } from "@/lib/market-types";
import { tradingEnabled } from "@/lib/config";

async function getMarket(id: string) {
  const base = process.env.MARKETS_API_URL;
  if (!base) return null;
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/markets/${encodeURIComponent(id)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) return null;
    const parsed = MarketSchema.safeParse(await response.json());
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export default async function MarketDetailPage({ params }: { params: Promise<{ marketId: string }> }) {
  const { marketId } = await params;
  const market = await getMarket(marketId);
  if (!market) {
    return (
      <div className="shell page-section">
        <Link href="/" className="navlink" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44 }}>
          <ArrowLeft size={15} aria-hidden /> Back to markets
        </Link>
        <div className="panel status-panel" style={{ marginTop: 24, justifyItems: "start", textAlign: "left" }}>
          <h1 className="display page-title" style={{ margin: 0 }}>Market unavailable</h1>
          <p className="muted" style={{ maxWidth: "none" }}>
            This market could not be retrieved from the configured verified data source. It may not exist, or the indexer may be unavailable.
          </p>
          <Link href="/" className="secondary">Browse markets</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell page-section">
      <Link href="/" className="navlink" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44 }}>
        <ArrowLeft size={15} aria-hidden /> All markets
      </Link>
      <div className="market-detail-grid">
        <section className="panel" style={{ padding: "clamp(18px, 4vw, 26px)", minWidth: 0 }}>
          <span className="pill">{market.category} · {market.status.replaceAll("_", " ")}</span>
          <h1 className="display" style={{ fontSize: "clamp(24px, 6vw, 42px)", lineHeight: 1.12 }}>{market.question}</h1>
          <div className="price-grid" style={{ margin: "8px 0 20px" }}>
            <div className="price-yes">
              <div style={{ color: "#86efac", fontSize: 12 }}>YES</div>
              <strong style={{ fontSize: 22 }}>
                {market.yesPrice === null ? "—" : `${(market.yesPrice * 100).toFixed(1)}¢`}
              </strong>
            </div>
            <div className="price-no">
              <div style={{ color: "#fda4af", fontSize: 12 }}>NO</div>
              <strong style={{ fontSize: 22 }}>
                {market.noPrice === null ? "—" : `${(market.noPrice * 100).toFixed(1)}¢`}
              </strong>
            </div>
          </div>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Resolution rules</h2>
          <p className="muted" style={{ whiteSpace: "pre-wrap", lineHeight: 1.75, overflowWrap: "anywhere" }}>{market.rules}</p>
          <a
            href={market.resolutionSource}
            target="_blank"
            rel="noreferrer"
            className="navlink"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, minHeight: 44, overflowWrap: "anywhere" }}
          >
            Resolution source <ExternalLink size={14} aria-hidden />
          </a>
          <p className="muted" style={{ fontSize: 12, marginTop: 24, marginBottom: 0 }}>
            Closes: {new Date(market.closeTime).toLocaleString()}
          </p>
        </section>
        <aside className="panel" style={{ padding: "clamp(18px, 4vw, 24px)", alignSelf: "start", minWidth: 0 }}>
          <h2 className="display" style={{ fontSize: "clamp(20px, 4vw, 22px)", marginTop: 0 }}>Trade this market</h2>
          <div className="muted" style={{ fontSize: 13, lineHeight: 1.65 }}>
            YES: {market.yesPrice === null ? "Price unavailable" : `${(market.yesPrice * 100).toFixed(1)}¢`}
            <br />
            NO: {market.noPrice === null ? "Price unavailable" : `${(market.noPrice * 100).toFixed(1)}¢`}
          </div>
          <button className="primary" disabled={!tradingEnabled} style={{ width: "100%", marginTop: 18 }}>
            {tradingEnabled ? "Trading integration required" : "Trading disabled"}
          </button>
          <p className="muted" style={{ fontSize: 12, lineHeight: 1.6, marginBottom: 0 }}>
            <ShieldCheck size={14} style={{ display: "inline", verticalAlign: "text-bottom", marginRight: 5 }} aria-hidden />
            Trading is disabled until a verified, reviewed program and collateral mint are configured.
          </p>
        </aside>
      </div>
    </div>
  );
}
