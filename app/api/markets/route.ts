import { NextResponse } from "next/server";
import { MarketListSchema } from "@/lib/market-types";

export const dynamic = "force-dynamic";

export async function GET() {
  const upstream = process.env.MARKETS_API_URL;
  if (!upstream) {
    return NextResponse.json(
      { error: "Verified market indexer is not configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const response = await fetch(`${upstream.replace(/\/$/, "")}/markets`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) {
      return NextResponse.json({ error: "Market data source unavailable." }, { status: 502 });
    }
    const body: unknown = await response.json();
    const parsed = MarketListSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Market data failed validation." }, { status: 502 });
    }
    return NextResponse.json(parsed.data, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch {
    return NextResponse.json({ error: "Market data source timed out or is unavailable." }, { status: 502 });
  }
}
