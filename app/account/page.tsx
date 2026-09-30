import Link from "next/link";
import { ExternalLink, CircleHelp, AlertTriangle, ArrowUpRight } from "lucide-react";
import { cluster, tradingEnabled } from "@/lib/config";

const items = [
  { title: "How markets work", body: "Each market has a question, explicit resolution rules, a designated source, and a defined trading-close time. Read the rules before taking a position." },
  { title: "Resolution and disputes", body: "An outcome is not claimable until it has been finalised under the market's published resolution and dispute process." },
  { title: "Fees and execution", body: "Fees and execution prices must be shown before wallet approval. Quotes can change; the signed transaction and on-chain result determine execution." },
  { title: "Risk notice", body: "Prediction markets involve risk, including the potential loss of the amount committed. Availability may be restricted by jurisdiction. Do not trade money you cannot afford to lose." }
];

export default function AccountPage() {
  return (
    <div className="shell page-section" style={{ maxWidth: 900 }}>
      <h1 className="display page-title">Account & Help</h1>
      <p className="muted page-lead">Network information, product rules, and support basics.</p>

      <div className="panel metric-row" style={{ marginTop: 24 }}>
        <div className="metric">
          <div className="metric-label">Configured network</div>
          <strong>{cluster}</strong>
        </div>
        <div className="metric">
          <div className="metric-label">Trading status</div>
          <strong style={{ color: tradingEnabled ? "#86efac" : "#fda4af" }}>
            {tradingEnabled ? "Configured — integration must still be verified" : "Disabled"}
          </strong>
        </div>
        <div className="metric">
          <div className="metric-label">Wallet support</div>
          <strong>Phantom</strong>
        </div>
      </div>

      {!tradingEnabled && (
        <div role="status" className="panel alert-row" style={{ marginTop: 14 }}>
          <AlertTriangle color="#fbbf24" size={20} aria-hidden style={{ flexShrink: 0, marginTop: 2 }} />
          <p className="muted">
            Trading is disabled by default. Do not enable it by setting an environment variable alone; a real program integration, testing, independent security review, and legal approval are required.
          </p>
        </div>
      )}

      <div className="stack" style={{ marginTop: 18 }}>
        {items.map((item) => (
          <section key={item.title} className="panel" style={{ padding: "clamp(18px, 4vw, 22px)" }}>
            <h2 style={{ fontSize: 17, marginTop: 0 }}>{item.title}</h2>
            <p className="muted" style={{ lineHeight: 1.75, marginBottom: 0 }}>{item.body}</p>
          </section>
        ))}
      </div>

      <section className="panel" style={{ padding: "clamp(18px, 4vw, 22px)", marginTop: 12 }}>
        <h2 style={{ fontSize: 17, marginTop: 0 }}>
          <CircleHelp size={17} style={{ display: "inline", marginRight: 8, verticalAlign: "text-bottom" }} aria-hidden />
          Useful links
        </h2>
        <p className="muted" style={{ lineHeight: 1.8 }}>
          Support and legal documents must be published by the operator before launch.
        </p>
        <div className="stack" style={{ gap: 8 }}>
          <a
            className="navlink"
            href="https://solana.com/docs"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, minHeight: 44 }}
          >
            Solana documentation <ExternalLink size={13} aria-hidden />
          </a>
          <Link href="/" className="navlink" style={{ display: "inline-flex", alignItems: "center", gap: 6, minHeight: 44 }}>
            Back to markets <ArrowUpRight size={13} aria-hidden />
          </Link>
          <Link href="/portfolio" className="navlink" style={{ display: "inline-flex", alignItems: "center", gap: 6, minHeight: 44 }}>
            View portfolio <ArrowUpRight size={13} aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
