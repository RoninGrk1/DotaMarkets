"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "lucide-react";

export default function PortfolioPage() {
  const { connected, publicKey } = useWallet();
  return (
    <div className="shell" style={{ paddingTop: 48 }}>
      <h1 className="display" style={{ fontSize: 42, marginBottom: 8 }}>Portfolio</h1>
      <p className="muted" style={{ marginTop: 0 }}>Your positions and claims, derived from verified on-chain state.</p>
      {!connected || !publicKey ? (
        <div className="panel" style={{ padding: 32, marginTop: 24, textAlign: "center" }}>
          <Wallet size={28} color="#c084fc" />
          <h2 style={{ fontSize: 20 }}>Connect your wallet</h2>
          <p className="muted">Connect a Solana wallet to view positions associated with that address.</p>
        </div>
      ) : (
        <div className="panel" style={{ padding: 24, marginTop: 24 }}>
          <div className="pill">Connected wallet</div>
          <p style={{ overflowWrap: "anywhere" }}>{publicKey.toBase58()}</p>
          <p className="muted" style={{ lineHeight: 1.7 }}>Portfolio indexing is not configured yet. No position or balance data will be fabricated. Configure the verified indexer API to display your positions.</p>
        </div>
      )}
    </div>
  );
}
