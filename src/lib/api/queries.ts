/* ============================================================
 * Query Options
 * 使用 queryOptions 获得类型安全的查询配置
 * ============================================================ */

import { queryOptions } from "@tanstack/react-query";
import { api } from "./client";
import type { OrderStatus } from "./schema";

/* ============================================================
 * Query Keys Factory
 * ============================================================ */

export const queryKeys = {
  all: ["prediction-market"] as const,

  markets: {
    all: () => [...queryKeys.all, "markets"] as const,
    list: (params?: { resolved?: boolean }) =>
      [...queryKeys.markets.all(), "list", params] as const,
    detail: (id: string) => [...queryKeys.markets.all(), "detail", id] as const,
    orderBook: (id: string) =>
      [...queryKeys.markets.all(), "orderbook", id] as const,
    stats: (id: string) => [...queryKeys.markets.all(), "stats", id] as const,
  },

  orders: {
    all: () => [...queryKeys.all, "orders"] as const,
    my: (params?: { status?: OrderStatus; marketId?: string }) =>
      [...queryKeys.orders.all(), "my", params] as const,
    detail: (id: string) => [...queryKeys.orders.all(), "detail", id] as const,
    marketOrderBook: (marketId: string) =>
      [...queryKeys.orders.all(), "orderbook", marketId] as const,
    marketOrderBookDepth: (marketId: string) =>
      [...queryKeys.orders.all(), "depth", marketId] as const,
  },

  trades: {
    all: () => [...queryKeys.all, "trades"] as const,
    recent: (limit?: number) =>
      [...queryKeys.trades.all(), "recent", limit] as const,
    market: (marketId: string) =>
      [...queryKeys.trades.all(), "market", marketId] as const,
    user: (userId: string) =>
      [...queryKeys.trades.all(), "user", userId] as const,
    detail: (id: string) => [...queryKeys.trades.all(), "detail", id] as const,
  },

  users: {
    all: () => [...queryKeys.all, "users"] as const,
    balance: (address: string) =>
      [...queryKeys.users.all(), "balance", address] as const,
    positions: (address: string) =>
      [...queryKeys.users.all(), "positions", address] as const,
    portfolio: (address: string) =>
      [...queryKeys.users.all(), "portfolio", address] as const,
    orders: (address: string) =>
      [...queryKeys.users.all(), "orders", address] as const,
    trades: (address: string) =>
      [...queryKeys.users.all(), "trades", address] as const,
  },

  auth: {
    all: () => [...queryKeys.all, "auth"] as const,
    profile: () => [...queryKeys.auth.all(), "profile"] as const,
  },
};

/* ============================================================
 * Market Query Options
 * ============================================================ */

export const marketsQueryOptions = (params?: { resolved?: boolean }) =>
  queryOptions({
    queryKey: queryKeys.markets.list(params),
    queryFn: () => api.markets.list(params),
  });

export const marketQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.markets.detail(id),
    queryFn: () => api.markets.get(id),
    enabled: !!id,
  });

export const marketWithOrderBookQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.markets.orderBook(id),
    queryFn: () => api.markets.getWithOrderBook(id),
    enabled: !!id,
  });

export const marketStatsQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.markets.stats(id),
    queryFn: () => api.markets.getStats(id),
    enabled: !!id,
  });

/* ============================================================
 * Order Query Options
 * ============================================================ */

export const myOrdersQueryOptions = (params?: {
  status?: OrderStatus;
  marketId?: string;
}) =>
  queryOptions({
    queryKey: queryKeys.orders.my(params),
    queryFn: () => api.orders.getMy(params),
  });

export const orderQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => api.orders.get(id),
    enabled: !!id,
  });

export const orderBookQueryOptions = (marketId: string) =>
  queryOptions({
    queryKey: queryKeys.orders.marketOrderBook(marketId),
    queryFn: () => api.orders.getMarketOrderBook(marketId),
    enabled: !!marketId,
    refetchInterval: 5000,
  });

export const orderBookDepthQueryOptions = (marketId: string) =>
  queryOptions({
    queryKey: queryKeys.orders.marketOrderBookDepth(marketId),
    queryFn: () => api.orders.getMarketOrderBookDepth(marketId),
    enabled: !!marketId,
    refetchInterval: 5000,
  });

/* ============================================================
 * Trade Query Options
 * ============================================================ */

export const recentTradesQueryOptions = (limit?: number) =>
  queryOptions({
    queryKey: queryKeys.trades.recent(limit),
    queryFn: () => api.trades.getRecent({ limit }),
    refetchInterval: 10000,
  });

export const marketTradesQueryOptions = (marketId: string) =>
  queryOptions({
    queryKey: queryKeys.trades.market(marketId),
    queryFn: () => api.trades.getByMarket(marketId),
    enabled: !!marketId,
  });

export const tradeQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.trades.detail(id),
    queryFn: () => api.trades.get(id),
    enabled: !!id,
  });

/* ============================================================
 * User Query Options
 * ============================================================ */

export const userBalanceQueryOptions = (address: string) =>
  queryOptions({
    queryKey: queryKeys.users.balance(address),
    queryFn: () => api.users.getBalance(address),
    enabled: !!address,
  });

export const userPositionsQueryOptions = (address: string) =>
  queryOptions({
    queryKey: queryKeys.users.positions(address),
    queryFn: () => api.users.getPositions(address),
    enabled: !!address,
  });

export const userPortfolioQueryOptions = (address: string) =>
  queryOptions({
    queryKey: queryKeys.users.portfolio(address),
    queryFn: () => api.users.getPortfolio(address),
    enabled: !!address,
  });

export const userOrdersQueryOptions = (address: string) =>
  queryOptions({
    queryKey: queryKeys.users.orders(address),
    queryFn: () => api.users.getOrders(address),
    enabled: !!address,
  });

export const userTradesQueryOptions = (address: string) =>
  queryOptions({
    queryKey: queryKeys.users.trades(address),
    queryFn: () => api.users.getTrades(address),
    enabled: !!address,
  });

/* ============================================================
 * Auth Query Options
 * ============================================================ */

export const profileQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.auth.profile(),
    queryFn: () => api.auth.getProfile(),
    retry: false,
  });
