import { z } from "zod";

export const MarketStatusSchema = z.enum([
  "OPEN", "CLOSED", "PROPOSED_RESOLUTION", "DISPUTED", "RESOLVED", "CANCELLED"
]);

export const MarketSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1).max(500),
  category: z.string().min(1).max(80),
  status: MarketStatusSchema,
  closeTime: z.string().datetime({ offset: true }),
  resolutionSource: z.string().url(),
  rules: z.string().min(1),
  yesPrice: z.number().min(0).max(1).nullable(),
  noPrice: z.number().min(0).max(1).nullable(),
  liquidity: z.string().nullable(),
  updatedAt: z.string().datetime({ offset: true })
});

export const MarketListSchema = z.object({
  markets: z.array(MarketSchema),
  source: z.literal("verified-indexer"),
  indexedAt: z.string().datetime({ offset: true }),
  slot: z.number().int().nonnegative().nullable()
});

export type Market = z.infer<typeof MarketSchema>;
export type MarketList = z.infer<typeof MarketListSchema>;
