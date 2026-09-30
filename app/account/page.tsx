import { ExternalLink, CircleHelp, AlertTriangle } from "lucide-react";
import { cluster, tradingEnabled } from "@/lib/config";

const items = [
  { title: "How markets work", body: "Each market has a question, explicit resolution rules, a designated source, and a defined trading-close time. Read the rules before taking a position." },
  { title: "Resolution and disputes", body: "An outcome is not claimable until it has been finalised under the market's published resolution and dispute process." },
  { title: "Fees and execution", body: "Fees and execution prices must be shown before wallet approval. Quotes can change; the signed transaction and on-chain result determine execution." },
  { title: "Risk notice", body: "Prediction markets involve risk, including the potential loss of the amount committed. Availability may be restricted by jurisdiction. Do not trade money you cannot afford to lose." }
];

export default function AccountPage() {
  return (
    <div className="shell" style={{ paddingTop: 48, maxWidth: 900 }}>
      <h1 className="display" style={{ fontSize: 42, marginBottom: 8 }}>Account & Help</h1>
      <p className="muted" style={{ marginTop: 0 }}>Network information, product rules, and support basics.</p>
      <div className="panel" style={{ padding: 20, marginTop: 24, display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div><div className="muted" style={{ fontSize: 12 }}>Configured network</div><strong>{cluster}</strong></div>
        <div><div className="muted" style={{ fontSize: 12 }}>Trading status</div><strong style={{ color: tradingEnabled ? "#86efac" : "#fda4af" }}>{tradingEnabled ? "Configured — integration must still be verified" : "Disabled"}</strong></div>
      </div>
      {!tradingEnabled && <div role="status" className="panel" style={{ padding: 16, marginTop: 14, display: "flex", gap: 12, alignItems: "start" }}><AlertTriangle color="#fbbf24" size={20} /><p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>Trading is disabled by default. Do not enable it by setting an environment variable alone; a real program integration, testing, independent security review, and legal approval are required.</p></div>}
      <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
        {items.map((item) => <section key={item.title} className="panel" style={{ padding: 22 }}><h2 style={{ fontSize: 17, marginTop: 0 }}>{item.title}</h2><p className="muted" style={{ lineHeight: 1.75, marginBottom: 0 }}>{item.body}</p></section>)}
      </div>
      <section className="panel" style={{ padding: 22, marginTop: 12 }}>
        <h2 style={{ fontSize: 17, marginTop: 0 }}><CircleHelp size={17} style={{ display: "inline", marginRight: 8 }} />Useful links</h2>
        <p className="muted" style={{ lineHeight: 1.8 }}>Support and legal documents must be published by the operator before launch.</p>
        <a className="navlink" href="https://solana.com/docs" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Solana documentation <ExternalLink size={13} /></a>
      </section>
    </div>
  );
}
