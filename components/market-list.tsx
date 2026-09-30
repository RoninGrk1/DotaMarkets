"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, RefreshCw, Search, X } from "lucide-react";
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

  const trimmed = query.trim().toLowerCase();
  const markets = state.status === "ready"
    ? state.markets.filter((market) =>
      market.question.toLowerCase().includes(trimmed) ||
      market.category.toLowerCase().includes(trimmed) ||
      market.status.toLowerCase().replaceAll("_", " ").includes(trimmed)
    )
    : [];

  return (
    <div>
      <label htmlFor="market-search" className="panel search-field">
        <Search size={17} className="muted" aria-hidden style={{ flexShrink: 0 }} />
        <input
          id="market-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search markets or categories"
          autoComplete="off"
          enterKeyHint="search"
          inputMode="search"
        />
        {query ? (
          <button type="button" className="search-clear" aria-label="Clear search" onClick={() => setQuery("")}>
            <X size={16} aria-hidden />
          </button>
        ) : null}
      </label>

      {state.status === "ready" && state.markets.length > 0 ? (
        <p className="muted" style={{ fontSize: 12, margin: "-6px 0 14px" }}>
          {trimmed
            ? `${markets.length} of ${state.markets.length} market${state.markets.length === 1 ? "" : "s"}`
            : `${state.markets.length} market${state.markets.length === 1 ? "" : "s"}`}
        </p>
      ) : null}

      {state.status === "loading" && (
        <div className="panel status-panel muted" role="status" aria-live="polite">
          Loading verified markets…
        </div>
      )}

      {state.status === "error" && (
        <div className="panel status-panel" role="status">
          <AlertCircle size={24} color="#c084fc" aria-hidden />
          <strong>Markets unavailable</strong>
          <p className="muted">{state.message}</p>
          <button type="button" className="secondary" onClick={() => void load()}>
            <RefreshCw size={14} aria-hidden /> Try again
          </button>
        </div>
      )}

      {state.status === "ready" && markets.length === 0 && (
        <div className="panel status-panel">
          <div className="display" style={{ fontSize: 21 }}>{trimmed ? "No matching markets" : "No open markets yet"}</div>
          <p className="muted">
            {trimmed
              ? "Try another search term, or clear the filter to see all markets."
              : "No markets were returned by the verified indexer. Check back later."}
          </p>
          {trimmed ? (
            <button type="button" className="secondary" onClick={() => setQuery("")}>Clear search</button>
          ) : null}
          <p className="muted" style={{ fontSize: 11 }}>
            Indexed {new Date(state.indexedAt).toLocaleString()} · Slot {state.slot ?? "unavailable"}
          </p>
        </div>
      )}

      {state.status === "ready" && markets.length > 0 && (
        <div className="market-cards">
          {markets.map((market) => (
            <Link
              href={`/markets/${encodeURIComponent(market.id)}`}
              key={market.id}
              className="panel market-card"
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                <span className="pill">{market.category}</span>
                <span className="muted" style={{ fontSize: 12, paddingTop: 4 }}>{market.status.replaceAll("_", " ")}</span>
              </div>
              <h3 style={{ fontSize: "clamp(16px, 4vw, 18px)", lineHeight: 1.4, margin: 0 }}>{market.question}</h3>
              <div className="price-grid">
                <div className="price-yes">
                  <div style={{ color: "#86efac", fontSize: 12 }}>YES</div>
                  <strong style={{ fontSize: "clamp(18px, 4vw, 20px)" }}>{formatPrice(market.yesPrice)}</strong>
                </div>
                <div className="price-no">
                  <div style={{ color: "#fda4af", fontSize: 12 }}>NO</div>
                  <strong style={{ fontSize: "clamp(18px, 4vw, 20px)" }}>{formatPrice(market.noPrice)}</strong>
                </div>
              </div>
              <div className="muted" style={{ display: "flex", justifyContent: "space-between", fontSize: 12, gap: 12, flexWrap: "wrap" }}>
                <span>Closes {new Date(market.closeTime).toLocaleDateString()}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>Details <ArrowUpRight size={13} aria-hidden /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
