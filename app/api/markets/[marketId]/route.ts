import { NextResponse } from "next/server";
import { MarketSchema } from "@/lib/market-types";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ marketId: string }> }) {
  const { marketId } = await context.params;
  const upstream = process.env.MARKETS_API_URL;
  if (!upstream) return NextResponse.json({ error: "Verified market indexer is not configured." }, { status: 503 });

  try {
    const response = await fetch(`${upstream.replace(/\/$/, "")}/markets/${encodeURIComponent(marketId)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000)
    });
    if (response.status === 404) return NextResponse.json({ error: "Market not found." }, { status: 404 });
    if (!response.ok) return NextResponse.json({ error: "Market data source unavailable." }, { status: 502 });
    const parsed = MarketSchema.safeParse(await response.json());
    if (!parsed.success) return NextResponse.json({ error: "Market data failed validation." }, { status: 502 });
    return NextResponse.json(parsed.data, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Market data source timed out or is unavailable." }, { status: 502 });
  }
}
