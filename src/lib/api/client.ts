/* ============================================================
 * Prediction Market API Client
 * 类型安全的 API 客户端,使用 Zod 验证响应
 * ============================================================ */

import { z } from "zod";
import {
  ApiMarketsSchema,
  ApiMarketSchema,
  MarketWithOrderBookSchema,
  MarketStatsSchema,
  OrderBookSchema,
  OrderBookDepthSchema,
  OrderSchema,
  OrdersSchema,
  CreateOrderResponseSchema,
  CancelOrderResponseSchema,
  WithdrawSignatureResponseSchema,
  TradeSchema,
  TradesSchema,
  UserBalanceSchema,
  UserPortfolioSchema,
  UserProfileSchema,
  LoginResponseSchema,
  type TokenType,
  type OrderSide,
  type OrderStatus,
} from "./schema";

/* ============================================================
 * Configuration
 * ============================================================ */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/* ============================================================
 * Token Management
 * ============================================================ */

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
}

/* ============================================================
 * Base Fetch Wrapper
 * ============================================================ */

interface FetchOptions extends RequestInit {
  auth?: boolean;
}

async function apiFetch<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  options: FetchOptions = {}
): Promise<T> {
  const { auth = false, headers = {}, ...rest } = options;

  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (auth) {
    const token = getAccessToken();
    if (token) {
      (requestHeaders as Record<string, string>)["Authorization"] =
        `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...rest,
    headers: requestHeaders,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  const data = await response.json();

  // Zod 验证
  const result = schema.safeParse(data);
  if (!result.success) {
    const schemaDescription = schema.description || "UnnamedSchema";
    const formattedErrors = result.error.issues.map((issue) => ({
      path: issue.path.join(".") || "(root)",
      code: issue.code,
      message: issue.message,
      expected: "expected" in issue ? issue.expected : undefined,
      received: "received" in issue ? issue.received : undefined,
    }));

    console.error(
      `[Zod] Validation failed for ${endpoint} (${schemaDescription}):`,
      "\n" + formattedErrors.map((e) =>
        `  • ${e.path}: ${e.message}${e.expected ? ` (expected: ${e.expected}, got: ${e.received})` : ""}`
      ).join("\n")
    );

    throw new Error(
      `Invalid API response from ${endpoint}: ${formattedErrors.map((e) => `${e.path}: ${e.message}`).join("; ")}`
    );
  }

  return result.data;
}

/* ============================================================
 * API Functions
 * ============================================================ */

// Markets
export const api = {
  markets: {
    list: (params?: { resolved?: boolean }) => {
      const searchParams = new URLSearchParams();
      if (params?.resolved !== undefined) {
        searchParams.set("resolved", String(params.resolved));
      }
      const query = searchParams.toString();
      return apiFetch(`/markets${query ? `?${query}` : ""}`, ApiMarketsSchema);
    },

    get: (id: string) => apiFetch(`/markets/${id}`, ApiMarketSchema),

    getWithOrderBook: (id: string) =>
      apiFetch(`/markets/${id}/orderbook`, MarketWithOrderBookSchema),

    getStats: (id: string) => apiFetch(`/markets/${id}/stats`, MarketStatsSchema),
  },

  orders: {
    create: (data: {
      marketId: string;
      userId: string;
      token: TokenType;
      side: OrderSide;
      price: number;
      quantity: number;
    }) =>
      apiFetch("/orders/create", CreateOrderResponseSchema, {
        method: "POST",
        auth: true,
        body: JSON.stringify(data),
      }),

    cancel: (id: string) =>
      apiFetch(`/orders/${id}`, CancelOrderResponseSchema, {
        method: "DELETE",
        auth: true,
      }),

    getWithdrawSignature: (orderId: string) =>
      apiFetch(
        `/orders/${orderId}/withdraw-signature`,
        WithdrawSignatureResponseSchema,
        { method: "POST", auth: true }
      ),

    getMy: (params?: { status?: OrderStatus; marketId?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.set("status", params.status);
      if (params?.marketId) searchParams.set("marketId", params.marketId);
      const query = searchParams.toString();
      return apiFetch(`/orders/my${query ? `?${query}` : ""}`, OrdersSchema, {
        auth: true,
      });
    },

    get: (id: string) => apiFetch(`/orders/${id}`, OrderSchema, { auth: true }),

    getMarketOrderBook: (marketId: string) =>
      apiFetch(`/orders/market/${marketId}/orderbook`, OrderBookSchema),

    getMarketOrderBookDepth: (marketId: string) =>
      apiFetch(`/orders/market/${marketId}/orderbook/depth`, OrderBookDepthSchema),
  },

  trades: {
    getRecent: (params?: { limit?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      const query = searchParams.toString();
      return apiFetch(`/trades/recent${query ? `?${query}` : ""}`, TradesSchema);
    },

    getByMarket: (
      marketId: string,
      params?: { limit?: number; offset?: number }
    ) => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      const query = searchParams.toString();
      return apiFetch(
        `/trades/market/${marketId}${query ? `?${query}` : ""}`,
        TradesSchema
      );
    },

    getByUser: (userId: string, params?: { limit?: number; offset?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.limit) searchParams.set("limit", String(params.limit));
      if (params?.offset) searchParams.set("offset", String(params.offset));
      const query = searchParams.toString();
      return apiFetch(
        `/trades/user/${userId}${query ? `?${query}` : ""}`,
        TradesSchema,
        { auth: true }
      );
    },

    get: (id: string) => apiFetch(`/trades/${id}`, TradeSchema),
  },

  users: {
    getBalance: (address: string) =>
      apiFetch(`/users/${address}/balance`, UserBalanceSchema),

    getPositions: (address: string) =>
      apiFetch(
        `/users/${address}/positions`,
        z.array(
          z.object({
            market: ApiMarketSchema,
            outcome: z.enum(["YES", "NO"]),
            shares: z.number(),
            avgPrice: z.number(),
            currentPrice: z.number(),
            value: z.number(),
            profitLoss: z.number(),
            profitLossPercent: z.number(),
          })
        )
      ),

    getPortfolio: (address: string) =>
      apiFetch(`/users/${address}/portfolio`, UserPortfolioSchema),

    getOrders: (address: string, params?: { status?: OrderStatus }) => {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.set("status", params.status);
      const query = searchParams.toString();
      return apiFetch(
        `/users/${address}/orders${query ? `?${query}` : ""}`,
        OrdersSchema
      );
    },

    getTrades: (address: string) =>
      apiFetch(`/users/${address}/trades`, TradesSchema),
  },

  auth: {
    login: (data: { walletAddress: string; signature?: string }) =>
      apiFetch("/auth/login", LoginResponseSchema, {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getProfile: () =>
      apiFetch("/auth/profile", UserProfileSchema, { auth: true }),
  },
};

export default api;
