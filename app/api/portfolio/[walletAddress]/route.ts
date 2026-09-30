import { NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";

export async function GET(_request: Request, context: { params: Promise<{ walletAddress: string }> }) {
  const { walletAddress } = await context.params;
  try {
    new PublicKey(walletAddress);
  } catch {
    return NextResponse.json({ error: "Invalid Solana wallet address." }, { status: 400 });
  }
  return NextResponse.json(
    { error: "Verified portfolio indexer is not configured.", walletAddress },
    { status: 503, headers: { "Cache-Control": "no-store" } }
  );
}
