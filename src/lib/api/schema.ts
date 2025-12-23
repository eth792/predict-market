/* ============================================================
 * API Schema Definitions
 * Zod schemas for API response validation
 * ============================================================ */

import { z } from "zod";

/* ============================================================
 * Base Schemas
 * ============================================================ */

export const TokenTypeSchema = z.enum(["YES", "NO"]);
export const OrderSideSchema = z.enum(["BUY", "SELL"]);
export const OrderStatusSchema = z.enum([
  "OPEN",
  "PARTIALLY_FILLED",
  "FILLED",
  "CANCELLING",
  "CANCELLED",
  "EXPIRED",
]);

/* ============================================================
 * Market Schemas
 * ============================================================ */

export const ApiMarketSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  outcomes: z.array(z.string()).optional(),
  creationTime: z.string().optional(),
  resolutionTimestamp: z.string().optional(),
  resolved: z.boolean().optional(),
  outcome: z.union([z.number(), z.string()]),
  creator: z.string().optional(),
  totalVolume: z.string(),
  totalYesShares: z.string(),
  totalNoShares: z.string(),
  blockNumber: z.string().optional(),
  transactionHash: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).loose();

export const ApiMarketsSchema = z.array(ApiMarketSchema);

/* ============================================================
 * Order Book Schemas
 * ============================================================ */

export const OrderBookEntrySchema = z.object({
  price: z.string(),
  initialShares: z.string(),
});

export const OrderBookSideSchema = z.object({
  bids: z.array(OrderBookEntrySchema),
  asks: z.array(OrderBookEntrySchema),
});

export const OrderBookSchema = z.object({
  yes: OrderBookSideSchema,
  no: OrderBookSideSchema,
});

export const OrderBookDepthEntrySchema = z.object({
  price: z.string(),
  shares: z.string(),
  orderCount: z.number(),
});

export const OrderBookDepthSideSchema = z.object({
  bids: z.array(OrderBookDepthEntrySchema),
  asks: z.array(OrderBookDepthEntrySchema),
});

export const OrderBookDepthSchema = z.object({
  yes: OrderBookDepthSideSchema,
  no: OrderBookDepthSideSchema,
});

export const MarketWithOrderBookSchema = z.object({
  market: ApiMarketSchema,
  orderBook: OrderBookSchema,
});

/* ============================================================
 * Market Stats Schema
 * ============================================================ */

export const MarketStatsSchema = z.object({
  marketId: z.string(),
  totalVolume: z.string(),
  totalYesShares: z.string(),
  totalNoShares: z.string(),
  tradeCount: z.number(),
  uniqueTraders: z.number(),
  last24hTrades: z.number(),
  resolved: z.boolean().optional(),
  outcome: z.number().optional(),
});

/* ============================================================
 * Order Schemas
 * ============================================================ */

export const OrderSchema = z.object({
  id: z.string(),
  marketId: z.string(),
  userId: z.string(),
  walletAddress: z.string(),
  isYes: z.boolean(),
  token: TokenTypeSchema,
  side: OrderSideSchema,
  price: z.string(),
  initialShares: z.string(),
  remainingShares: z.string(),
  lockedAmount: z.string(),
  status: OrderStatusSchema,
  matchedShares: z.string(),
  creationTxHash: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  market: ApiMarketSchema.optional(),
});

export const OrdersSchema = z.array(OrderSchema);

export const CreateOrderResponseSchema = z.object({
  success: z.boolean(),
  order: OrderSchema,
  message: z.string().optional(),
});

export const CancelOrderResponseSchema = z.object({
  success: z.boolean(),
  orderId: z.string(),
  status: z.string(),
  message: z.string().optional(),
});

export const WithdrawSignatureResponseSchema = z.object({
  orderId: z.string(),
  signature: z.string(),
  message: z.string(),
});

/* ============================================================
 * Trade Schemas
 * ============================================================ */

export const TradeSchema = z.object({
  id: z.string(),
  marketId: z.string(),
  makerId: z.string(),
  takerId: z.string(),
  makerOrderId: z.string(),
  takerOrderId: z.string(),
  token: TokenTypeSchema,
  price: z.number(),
  quantity: z.number(),
  shares: z.string(),
  makerSide: OrderSideSchema,
  createdAt: z.string(),
  market: ApiMarketSchema,
  batchTxHash: z.string(),
});

export const TradesSchema = z.array(TradeSchema);

/* ============================================================
 * User Schemas
 * ============================================================ */

export const UserBalanceSchema = z.object({
  userId: z.string(),
  walletAddress: z.string(),
  usdcBalance: z.string(),
});

export const UserPositionSchema = z.object({
  market: ApiMarketSchema,
  outcome: TokenTypeSchema,
  shares: z.number(),
  avgPrice: z.number(),
  currentPrice: z.number(),
  value: z.number(),
  profitLoss: z.number(),
  profitLossPercent: z.number(),
});

export const UserPortfolioSchema = z.object({
  balance: UserBalanceSchema,
  positions: z.array(UserPositionSchema),
  totalValue: z.string(),
  totalPnL: z.string(),
});

/* ============================================================
 * Auth Schemas
 * ============================================================ */

const IdSchema = z
  .union([z.string(), z.number()])
  .transform((value) => value.toString());

export const UserProfileSchema = z.object({
  id: IdSchema,
  walletAddress: z.string(),
  username: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const LoginResponseSchema = z.object({
  access_token: z.string(),
  user: UserProfileSchema,
});

/* ============================================================
 * Type Exports (inferred from schemas)
 * ============================================================ */

export type ApiMarket = z.infer<typeof ApiMarketSchema>;
export type OrderBook = z.infer<typeof OrderBookSchema>;
export type OrderBookDepth = z.infer<typeof OrderBookDepthSchema>;
export type MarketWithOrderBook = z.infer<typeof MarketWithOrderBookSchema>;
export type MarketStats = z.infer<typeof MarketStatsSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type Trade = z.infer<typeof TradeSchema>;
export type UserBalance = z.infer<typeof UserBalanceSchema>;
export type UserPosition = z.infer<typeof UserPositionSchema>;
export type UserPortfolio = z.infer<typeof UserPortfolioSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type TokenType = z.infer<typeof TokenTypeSchema>;
export type OrderSide = z.infer<typeof OrderSideSchema>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>;
