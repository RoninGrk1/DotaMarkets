"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, RefreshCw, Search } from "lucide-react";
import { MarketListSchema, type Market } from "@/lib/market-types";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; markets: Market[]; indexedAt: string; slot: number | null };

function formatPrice(price: number | null) {
  return price === null ? "—" : `${(price * 100).toFixed(1)}¢`;
}

export function MarketList() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [query, setQuery] = useState("");

  async function load() {
    setState({ status: "loading" });
    try {
      const response = await fetch("/api/markets", { cache: "no-store" });
      if (!response.ok) throw new Error(response.status === 503
        ? "A verified market data source has not been configured."
        : "Market data is temporarily unavailable.");
      const parsed = MarketListSchema.safeParse(await response.json());
      if (!parsed.success) throw new Error("Market data failed validation.");
      setState({ status: "ready", markets: parsed.data.markets, indexedAt: parsed.data.indexedAt, slot: parsed.data.slot });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Unexpected market data error." });
    }
  }

  useEffect(() => { void load(); }, []);

  const markets = state.status === "ready"
    ? state.markets.filter((market) => market.question.toLowerCase().includes(query.toLowerCase()) || market.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div>
      <label htmlFor="market-search" className="panel" style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 14px", height: 48, marginBottom: 16 }}>
        <Search size={17} className="muted" />
        <input id="market-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search markets or categories" style={{ width: "100%", background: "transparent", border: 0, outline: 0, color: "var(--text)" }} />
      </label>

      {state.status === "loading" && <div className="panel muted" style={{ padding: 30, textAlign: "center" }}>Loading verified markets…</div>}
      {state.status === "error" && (
        <div className="panel" role="status" style={{ padding: 28, display: "grid", justifyItems: "center", gap: 12, textAlign: "center" }}>
          <AlertCircle size={24} color="#c084fc" />
          <strong>Markets unavailable</strong>
          <p className="muted" style={{ margin: 0, maxWidth: 500, lineHeight: 1.6 }}>{state.message}</p>
          <button className="secondary" onClick={() => void load()}><RefreshCw size={14} style={{ display: "inline", marginRight: 7 }} />Try again</button>
        </div>
      )}
      {state.status === "ready" && markets.length === 0 && (
        <div className="panel" style={{ padding: 32, textAlign: "center" }}>
          <div className="display" style={{ fontSize: 21, marginBottom: 8 }}>{query ? "No matching markets" : "No open markets yet"}</div>
          <p className="muted" style={{ margin: 0 }}>{query ? "Try another search." : "No markets were returned by the verified indexer. Check back later."}</p>
          <p className="muted" style={{ fontSize: 11, margin: "14px 0 0" }}>Indexed {new Date(state.indexedAt).toLocaleString()} · Slot {state.slot ?? "unavailable"}</p>
        </div>
      )}
      {state.status === "ready" && markets.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 14 }}>
          {markets.map((market) => (
            <Link href={`/markets/${encodeURIComponent(market.id)}`} key={market.id} className="panel" style={{ padding: 20, display: "grid", gap: 16, transition: "border-color .15s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span className="pill">{market.category}</span>
                <span className="muted" style={{ fontSize: 12 }}>{market.status.replaceAll("_", " ")}</span>
              </div>
              <h3 style={{ fontSize: 18, lineHeight: 1.4, margin: 0, minHeight: 50 }}>{market.question}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ borderRadius: 12, padding: 12, background: "#123023", border: "1px solid #20543b" }}>
                  <div style={{ color: "#86efac", fontSize: 12 }}>YES</div>
                  <strong style={{ fontSize: 20 }}>{formatPrice(market.yesPrice)}</strong>
                </div>
                <div style={{ borderRadius: 12, padding: 12, background: "#351b29", border: "1px solid #603044" }}>
                  <div style={{ color: "#fda4af", fontSize: 12 }}>NO</div>
                  <strong style={{ fontSize: 20 }}>{formatPrice(market.noPrice)}</strong>
                </div>
              </div>
              <div className="muted" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, gap: 12 }}>
                <span>Closes {new Date(market.closeTime).toLocaleDateString()}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>Details <ArrowUpRight size={13} /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
