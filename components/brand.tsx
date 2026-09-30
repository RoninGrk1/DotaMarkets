import Link from "next/link";
import { ChartNoAxesCombined } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" aria-label="DotaMarkets home" style={{ display: "inline-flex", alignItems: "center", gap: 10, minWidth: 0 }}>
      <span style={{
        width: compact ? 32 : 36,
        height: compact ? 32 : 36,
        borderRadius: 12,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        background: "linear-gradient(145deg, #7c3aed, #d946ef)",
        boxShadow: "0 0 28px #9333ea35"
      }}>
        <ChartNoAxesCombined size={compact ? 17 : 19} color="white" strokeWidth={2.5} />
      </span>
      <span className="display brand-text" style={{ fontSize: compact ? 17 : 20, fontWeight: 700, whiteSpace: "nowrap" }}>
        Dota<span style={{ color: "#c084fc" }}>Markets</span>
      </span>
    </Link>
  );
}
