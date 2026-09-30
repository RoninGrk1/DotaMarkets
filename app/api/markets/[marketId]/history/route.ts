import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "Historical data is unavailable until a verified event indexer is configured." },
    { status: 503, headers: { "Cache-Control": "no-store" } }
  );
}
