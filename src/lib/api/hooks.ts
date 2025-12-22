"use client";

/* ============================================================
 * React Query Hooks
 * 基于 queryOptions 的类型安全 hooks
 * ============================================================ */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";
import {
  marketsQueryOptions,
  marketQueryOptions,
  marketWithOrderBookQueryOptions,
  marketStatsQueryOptions,
  myOrdersQueryOptions,
  orderQueryOptions,
  orderBookQueryOptions,
  orderBookDepthQueryOptions,
  recentTradesQueryOptions,
  marketTradesQueryOptions,
  userBalanceQueryOptions,
  userPositionsQueryOptions,
  userPortfolioQueryOptions,
  userOrdersQueryOptions,
  userTradesQueryOptions,
  profileQueryOptions,
  queryKeys,
} from "./queries";
import type { TokenType, OrderSide, OrderStatus } from "./schema";

/* ============================================================
 * Market Hooks
 * ============================================================ */

export function useMarkets(params?: { resolved?: boolean }) {
  return useQuery(marketsQueryOptions(params));
}

export function useMarket(id: string) {
  return useQuery(marketQueryOptions(id));
}

export function useMarketWithOrderBook(id: string) {
  return useQuery(marketWithOrderBookQueryOptions(id));
}

export function useMarketStats(id: string) {
  return useQuery(marketStatsQueryOptions(id));
}

/* ============================================================
 * Order Hooks
 * ============================================================ */

export function useMyOrders(params?: {
  status?: OrderStatus;
  marketId?: string;
}) {
  return useQuery(myOrdersQueryOptions(params));
}

export function useOrder(id: string) {
  return useQuery(orderQueryOptions(id));
}

export function useOrderBook(marketId: string) {
  return useQuery(orderBookQueryOptions(marketId));
}

export function useOrderBookDepth(marketId: string) {
  return useQuery(orderBookDepthQueryOptions(marketId));
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      marketId: string;
      userId: string;
      token: TokenType;
      side: OrderSide;
      price: number;
      quantity: number;
    }) => api.orders.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.my() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.marketOrderBook(variables.marketId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.marketOrderBookDepth(variables.marketId),
      });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => api.orders.cancel(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.my() });
    },
  });
}

/* ============================================================
 * Trade Hooks
 * ============================================================ */

export function useRecentTrades(limit?: number) {
  return useQuery(recentTradesQueryOptions(limit));
}

export function useMarketTrades(marketId: string) {
  return useQuery(marketTradesQueryOptions(marketId));
}

/* ============================================================
 * User Hooks
 * ============================================================ */

export function useUserBalance(address: string) {
  return useQuery(userBalanceQueryOptions(address));
}

export function useUserPositions(address: string) {
  return useQuery(userPositionsQueryOptions(address));
}

export function useUserPortfolio(address: string) {
  return useQuery(userPortfolioQueryOptions(address));
}

export function useUserOrders(address: string) {
  return useQuery(userOrdersQueryOptions(address));
}

export function useUserTrades(address: string) {
  return useQuery(userTradesQueryOptions(address));
}

/* ============================================================
 * Auth Hooks
 * ============================================================ */

export function useProfile() {
  return useQuery(profileQueryOptions());
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { walletAddress: string; signature?: string }) =>
      api.auth.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() });
    },
  });
}

/* ============================================================
 * Re-export queryOptions for external use
 * ============================================================ */

export {
  marketsQueryOptions,
  marketQueryOptions,
  marketWithOrderBookQueryOptions,
  marketStatsQueryOptions,
  myOrdersQueryOptions,
  orderQueryOptions,
  orderBookQueryOptions,
  orderBookDepthQueryOptions,
  recentTradesQueryOptions,
  marketTradesQueryOptions,
  userBalanceQueryOptions,
  userPositionsQueryOptions,
  userPortfolioQueryOptions,
  userOrdersQueryOptions,
  userTradesQueryOptions,
  profileQueryOptions,
  queryKeys,
};
