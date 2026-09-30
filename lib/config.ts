export const cluster = process.env.NEXT_PUBLIC_SOLANA_CLUSTER || "devnet";

/**
 * Trading is hard-disabled in this scaffold because no transaction builder
 * or reviewed on-chain trading integration exists yet. Do not enable it with
 * an environment variable alone.
 */
export const tradingEnabled = false;

export function explorerUrl(signature: string): string {
  const base = "https://explorer.solana.com/tx/";
  const suffix = cluster === "mainnet-beta" ? "" : `?cluster=${encodeURIComponent(cluster)}`;
  return `${base}${encodeURIComponent(signature)}${suffix}`;
}
