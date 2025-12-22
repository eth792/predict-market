/* ============================================================
 * API Data Transformation
 * 将 API 响应数据转换为 UI 展示格式
 * ============================================================ */

import type { ApiMarket, OrderBook } from "./schema";
import type { Market, MarketOption } from "@/types/market";

/* ============================================================
 * Price Conversion
 * API 使用整数价格 (0-10,000,000), UI 使用百分比 (0-100)
 * ============================================================ */

/**
 * 将整数价格转换为美元
 */
export function intPriceToDollar(intPrice: number | string): number {
  const price = typeof intPrice === "string" ? parseFloat(intPrice) : intPrice;
  return price / 10000;
}

/**
 * 将整数价格转换为百分比
 */
export function intPriceToPercent(intPrice: number | string): number {
  const dollar = intPriceToDollar(intPrice);
  return dollar * 100;
}

/**
 * 将百分比转换为整数价格
 */
export function percentToIntPrice(percent: number): number {
  return Math.floor((percent / 100) * 10000);
}

/* ============================================================
 * Volume Formatting
 * ============================================================ */

export function formatVolume(volume: string | number): string {
  const num = typeof volume === "string" ? parseFloat(volume) : volume;

  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(1)}K`;
  }
  return `$${num.toFixed(0)}`;
}

/* ============================================================
 * Date Formatting
 * ============================================================ */

export function formatDate(timestamp: string | number): string {
  const ts = typeof timestamp === "string" ? parseInt(timestamp) : timestamp;
  const date = new Date(ts * 1000);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

export function formatISODate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

/* ============================================================
 * Market Transformation
 * ============================================================ */

// 默认市场图片
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=100&fit=crop";

/**
 * 根据订单簿计算 YES/NO 价格
 */
function calculatePricesFromOrderBook(orderBook?: OrderBook): {
  yesPrice: number;
  noPrice: number;
} {
  if (!orderBook) {
    return { yesPrice: 50, noPrice: 50 };
  }

  const yesBids = orderBook.yes.bids;
  const yesAsks = orderBook.yes.asks;

  let yesPrice = 50;

  if (yesBids.length > 0 && yesAsks.length > 0) {
    const bestBid = intPriceToPercent(yesBids[0].price);
    const bestAsk = intPriceToPercent(yesAsks[0].price);
    yesPrice = (bestBid + bestAsk) / 2;
  } else if (yesBids.length > 0) {
    yesPrice = intPriceToPercent(yesBids[0].price);
  } else if (yesAsks.length > 0) {
    yesPrice = intPriceToPercent(yesAsks[0].price);
  }

  return {
    yesPrice: Math.round(yesPrice * 10) / 10,
    noPrice: Math.round((100 - yesPrice) * 10) / 10,
  };
}

/**
 * 将 API 市场数据转换为 UI 展示格式
 * 注意: category 默认为 "trending", 由前端静态数据控制分类显示
 */
export function transformApiMarket(
  apiMarket: ApiMarket,
  orderBook?: OrderBook
): Market {
  const { yesPrice, noPrice } = calculatePricesFromOrderBook(orderBook);

  // outcomes 可能不存在，默认 ["Yes", "No"]
  const outcomes = apiMarket.outcomes ?? ["Yes", "No"];

  const options: MarketOption[] = outcomes.map((outcome, index) => ({
    id: String(index + 1),
    name: outcome,
    yesPrice: index === 0 ? yesPrice : noPrice,
    noPrice: index === 0 ? noPrice : yesPrice,
    volume: formatVolume(parseFloat(apiMarket.totalVolume) / outcomes.length),
  }));

  return {
    id: apiMarket.id,
    title: apiMarket.title,
    description: apiMarket.description,
    image: DEFAULT_IMAGE,
    volume: formatVolume(apiMarket.totalVolume),
    endDate: apiMarket.resolutionTimestamp
      ? formatDate(apiMarket.resolutionTimestamp)
      : "TBD",
    category: "trending",
    resolved: apiMarket.resolved ?? false,
    outcome:
      typeof apiMarket.outcome === "string"
        ? parseInt(apiMarket.outcome)
        : apiMarket.outcome,
    options,
    totalYesShares: apiMarket.totalYesShares,
    totalNoShares: apiMarket.totalNoShares,
  };
}

/**
 * 批量转换市场数据
 */
export function transformApiMarkets(
  apiMarkets: ApiMarket[],
  orderBooks?: Record<string, OrderBook>
): Market[] {
  return apiMarkets.map((m) => transformApiMarket(m, orderBooks?.[m.id]));
}
