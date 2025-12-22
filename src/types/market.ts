/* ============================================================
 * Market Type Definitions
 * Re-export types from schema + UI display types
 * ============================================================ */

// Re-export API types from schema
export type {
  ApiMarket,
  OrderBook,
  OrderBookDepth,
  MarketWithOrderBook,
  MarketStats,
  Order,
  Trade,
  UserBalance,
  UserPosition,
  UserPortfolio,
  UserProfile,
  LoginResponse,
  TokenType,
  OrderSide,
  OrderStatus,
} from "@/lib/api/schema";

/* ============================================================
 * UI Display Types
 * 用于前端展示的类型定义
 * ============================================================ */

export interface MarketOption {
  id: string;
  name: string;
  image?: string;
  yesPrice: number;
  noPrice: number;
  volume: string;
}

export interface Market {
  id: string;
  title: string;
  description?: string;
  image: string;
  volume: string;
  endDate: string;
  category: string;
  resolved: boolean;
  outcome?: number;
  options: MarketOption[];
  totalYesShares: string;
  totalNoShares: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  href: string;
}
