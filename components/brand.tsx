import { ChartNoAxesCombined } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="/" aria-label="DotaMarkets home" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span style={{
        width: 36, height: 36, borderRadius: 12, display: "grid", placeItems: "center",
        background: "linear-gradient(145deg, #7c3aed, #d946ef)", boxShadow: "0 0 28px #9333ea35"
      }}>
        <ChartNoAxesCombined size={19} color="white" strokeWidth={2.5} />
      </span>
      <span className="display" style={{ fontSize: compact ? 17 : 20, fontWeight: 700 }}>
        Dota<span style={{ color: "#c084fc" }}>Markets</span>
      </span>
    </a>
  );
}
