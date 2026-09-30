import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "dotamarkets-web",
    marketDataConfigured: Boolean(process.env.MARKETS_API_URL),
    tradingEnabled: false
  });
}
