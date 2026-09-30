import { describe, expect, it } from "vitest";
import { MarketListSchema, MarketSchema } from "../lib/market-types";

const validMarket = {
  id: "market-1",
  question: "Will event X happen?",
  category: "Esports",
  status: "OPEN",
  closeTime: "2030-01-01T00:00:00Z",
  resolutionSource: "https://example.com/results",
  rules: "Resolve YES if the official source confirms the event.",
  yesPrice: 0.52,
  noPrice: 0.48,
  liquidity: null,
  updatedAt: "2029-12-01T00:00:00Z"
};

describe("MarketSchema", () => {
  it("accepts a well-formed market", () => {
    expect(MarketSchema.safeParse(validMarket).success).toBe(true);
  });

  it("rejects prices outside the 0..1 range", () => {
    expect(MarketSchema.safeParse({ ...validMarket, yesPrice: 1.01 }).success).toBe(false);
  });

  it("rejects non-HTTPS/non-URL resolution sources", () => {
    expect(MarketSchema.safeParse({ ...validMarket, resolutionSource: "not-a-url" }).success).toBe(false);
  });

  it("accepts nullable prices when a quote is unavailable", () => {
    expect(MarketSchema.safeParse({ ...validMarket, yesPrice: null, noPrice: null }).success).toBe(true);
  });
});

describe("MarketListSchema", () => {
  it("requires the verified-indexer source marker", () => {
    const payload = { markets: [validMarket], source: "verified-indexer", indexedAt: "2029-12-01T00:00:00Z", slot: 42 };
    expect(MarketListSchema.safeParse(payload).success).toBe(true);
    expect(MarketListSchema.safeParse({ ...payload, source: "mock" }).success).toBe(false);
  });
});
