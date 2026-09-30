import { ArrowUpRight, Search, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { MarketList } from "@/components/market-list";
import { tradingEnabled } from "@/lib/config";

export default function MarketsPage() {
  return (
    <div className="shell">
      <section style={{ padding: "64px 0 34px", display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 30, alignItems: "end" }}>
        <div>
          <div className="pill" style={{ marginBottom: 18 }}><span className="dot" /> Built for Solana</div>
          <h1 className="display" style={{ fontSize: "clamp(42px, 7vw, 76px)", lineHeight: .99, margin: "0 0 20px", maxWidth: 760 }}>
            Predict the outcome.<br /><span style={{ background: "linear-gradient(90deg,#c084fc,#e879f9)", backgroundClip: "text", color: "transparent" }}>Own your position.</span>
          </h1>
          <p className="muted" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 570, margin: 0 }}>
            Explore binary-outcome markets with transparent rules, on-chain settlement, and no made-up numbers.
          </p>
        </div>
        <div className="panel" style={{ padding: 18, minWidth: 190, display: "grid", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13 }}><ShieldCheck size={17} color="#c084fc" /> Verified data only</div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13 }}><Zap size={17} color="#c084fc" /> Solana-native</div>
          <div className="pill" style={{ width: "fit-content" }}>{tradingEnabled ? "Trading configured" : "Trading disabled"}</div>
        </div>
      </section>

      <section style={{ padding: "28px 0 0" }}>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
          <div>
            <h2 className="display" style={{ fontSize: 28, margin: "0 0 6px" }}>Markets</h2>
            <p className="muted" style={{ fontSize: 13, margin: 0 }}>Only markets returned by the configured verified indexer appear here.</p>
          </div>
          <Link href="/account" className="navlink" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>How it works <ArrowUpRight size={15} /></Link>
        </div>
        <MarketList />
      </section>
      <style>{`@media(max-width:700px){.hero-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
