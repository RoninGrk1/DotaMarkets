import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { MarketSchema } from "@/lib/market-types";
import { tradingEnabled } from "@/lib/config";

async function getMarket(id: string) {
  const base = process.env.MARKETS_API_URL;
  if (!base) return null;
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/markets/${encodeURIComponent(id)}`, { cache: "no-store" });
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
      <div className="shell" style={{ paddingTop: 48 }}>
        <Link href="/" className="navlink" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><ArrowLeft size={15} /> Back to markets</Link>
        <div className="panel" style={{ padding: 32, marginTop: 24 }}>
          <h1 className="display" style={{ fontSize: 28, marginTop: 0 }}>Market unavailable</h1>
          <p className="muted" style={{ lineHeight: 1.7 }}>This market could not be retrieved from the configured verified data source. It may not exist, or the indexer may be unavailable.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shell" style={{ paddingTop: 38 }}>
      <Link href="/" className="navlink" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><ArrowLeft size={15} /> All markets</Link>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(280px,.8fr)", gap: 18, marginTop: 22 }}>
        <section className="panel" style={{ padding: 26 }}>
          <span className="pill">{market.category} · {market.status.replaceAll("_", " ")}</span>
          <h1 className="display" style={{ fontSize: "clamp(28px,4vw,42px)", lineHeight: 1.12 }}>{market.question}</h1>
          <h2 style={{ fontSize: 16 }}>Resolution rules</h2>
          <p className="muted" style={{ whiteSpace: "pre-wrap", lineHeight: 1.75 }}>{market.rules}</p>
          <a href={market.resolutionSource} target="_blank" rel="noreferrer" className="navlink" style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>Resolution source <ExternalLink size={14} /></a>
          <p className="muted" style={{ fontSize: 12, marginTop: 24 }}>Closes: {new Date(market.closeTime).toLocaleString()}</p>
        </section>
        <aside className="panel" style={{ padding: 24, alignSelf: "start" }}>
          <h2 className="display" style={{ fontSize: 22, marginTop: 0 }}>Trade this market</h2>
          <div className="muted" style={{ fontSize: 13, lineHeight: 1.65 }}>YES: {market.yesPrice === null ? "Price unavailable" : `${(market.yesPrice * 100).toFixed(1)}¢`}<br />NO: {market.noPrice === null ? "Price unavailable" : `${(market.noPrice * 100).toFixed(1)}¢`}</div>
          <button className="primary" disabled={!tradingEnabled} style={{ width: "100%", marginTop: 18 }}>{tradingEnabled ? "Trading integration required" : "Trading disabled"}</button>
          <p className="muted" style={{ fontSize: 12, lineHeight: 1.6 }}><ShieldCheck size={14} style={{ display: "inline", verticalAlign: "text-bottom", marginRight: 5 }} />Trading is disabled until a verified, reviewed program and collateral mint are configured.</p>
        </aside>
      </div>
      <style>{`@media(max-width:760px){.shell > div[style*="grid-template-columns"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
