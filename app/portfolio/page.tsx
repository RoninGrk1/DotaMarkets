"use client";

import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AlertCircle, ArrowUpRight, Wallet } from "lucide-react";

export default function PortfolioPage() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="shell page-section">
      <h1 className="display page-title">Portfolio</h1>
      <p className="muted page-lead">Your positions and claims, derived from verified on-chain state.</p>

      {!connected || !publicKey ? (
        <div className="panel status-panel" style={{ marginTop: 24 }}>
          <Wallet size={28} color="#c084fc" aria-hidden />
          <h2 style={{ fontSize: "clamp(18px, 4vw, 20px)", margin: 0 }}>Connect your wallet</h2>
          <p className="muted">
            Connect a Phantom Solana wallet to view positions associated with that address. No balances are invented while indexing is offline.
          </p>
          <WalletMultiButton style={{ height: 44, borderRadius: 11, background: "#7c3aed", fontFamily: "inherit", fontSize: 13, fontWeight: 700 }} />
          <Link href="/account" className="navlink" style={{ display: "inline-flex", alignItems: "center", gap: 6, minHeight: 44 }}>
            Read account & risk notes <ArrowUpRight size={14} aria-hidden />
          </Link>
        </div>
      ) : (
        <div className="stack" style={{ marginTop: 24 }}>
          <div className="panel" style={{ padding: "clamp(18px, 4vw, 24px)" }}>
            <div className="pill" style={{ marginBottom: 12 }}>Connected wallet</div>
            <p className="wallet-address" style={{ margin: "0 0 8px" }}>{publicKey.toBase58()}</p>
            <p className="muted" style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
              Supported wallet: Phantom. Positions only appear after a verified portfolio indexer is configured.
            </p>
          </div>

          <div className="panel status-panel" role="status" style={{ justifyItems: "start", textAlign: "left" }}>
            <AlertCircle size={22} color="#c084fc" aria-hidden />
            <strong style={{ fontSize: 16 }}>Portfolio data unavailable</strong>
            <p className="muted" style={{ maxWidth: "none" }}>
              Portfolio indexing is not configured yet. No position or balance data will be fabricated. Once the verified indexer API is live, open positions, claims, and settlement status will show here.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, width: "100%" }}>
              <Link href="/" className="secondary">Browse markets</Link>
              <Link href="/account" className="secondary">Account & Help</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
