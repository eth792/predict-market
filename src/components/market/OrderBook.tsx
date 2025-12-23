"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOrderBookDepth } from "@/lib/api/hooks";
import type { OrderBookDepth } from "@/types/market";
import { cn } from "@/lib/utils";

type Outcome = "yes" | "no";
type OrderBookDepthSide = OrderBookDepth["yes"];

interface OrderBookProps {
  marketId: string;
  className?: string;
  selectedOutcome?: Outcome;
  onOutcomeChange?: (outcome: Outcome) => void;
}

const FORMATTER = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatPrice = (price?: string | number) => {
  if (price === undefined) return "—";
  const value = typeof price === "string" ? parseFloat(price) : price;
  const cents = Number.isFinite(value) ? Math.round(value * 100) : 0;
  return `${cents}¢`;
};

const formatShares = (shares?: string | number) => {
  if (shares === undefined) return "0";
  const value =
    typeof shares === "string" ? parseFloat(shares) : shares;
  if (!Number.isFinite(value)) return String(shares);
  return FORMATTER.format(value);
};

const formatValue = (price?: string, shares?: string) => {
  if (!price || !shares) return "$0.00";
  const value =
    (parseFloat(price) || 0) *
    (parseFloat(shares) || 0);
  return `$${value.toFixed(2)}`;
};

function aggregateStats(side?: OrderBookDepthSide) {
  if (!side) {
    return {
      bestBid: undefined,
      bestAsk: undefined,
      totalBidShares: 0,
      totalAskShares: 0,
    };
  }

  const bestBid = side.bids[0]?.price;
  const bestAsk = side.asks[0]?.price;

  const totalBidShares = side.bids.reduce((acc, bid) => acc + (parseFloat(bid.shares) || 0), 0);
  const totalAskShares = side.asks.reduce((acc, ask) => acc + (parseFloat(ask.shares) || 0), 0);

  return {
    bestBid,
    bestAsk,
    totalBidShares,
    totalAskShares,
  };
}

export function OrderBook({
  marketId,
  className,
  selectedOutcome,
  onOutcomeChange,
}: OrderBookProps) {
  const [internalOutcome, setInternalOutcome] = useState<Outcome>(selectedOutcome ?? "yes");
  const { data, isPending, isError } = useOrderBookDepth(marketId);

  useEffect(() => {
    if (selectedOutcome) {
      setInternalOutcome(selectedOutcome);
    }
  }, [selectedOutcome]);

  const outcome = selectedOutcome ?? internalOutcome;
  const side = data?.[outcome];

  const { bestBid, bestAsk, totalAskShares, totalBidShares } = useMemo(
    () => aggregateStats(side),
    [side]
  );

  const spread =
    bestBid !== undefined && bestAsk !== undefined
      ? `${Math.max(0, Math.round((parseFloat(bestAsk) - parseFloat(bestBid)) * 100))}¢`
      : "—";

  const handleOutcomeChange = (value: Outcome) => {
    if (!selectedOutcome) {
      setInternalOutcome(value);
    }
    onOutcomeChange?.(value);
  };

  return (
    <Card className={cn("bg-card border-border py-0 gap-0", className)}>
      <CardHeader className="border-b border-border py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-base text-foreground">Order Book</CardTitle>
        <div className="flex gap-2">
          {(["yes", "no"] as Outcome[]).map((value) => (
            <Button
              key={value}
              variant={outcome === value ? (value === "yes" ? "success" : "destructive") : "outline"}
              size="xs"
              className={cn(
                "px-3",
                outcome !== value && "bg-card border-border text-muted-foreground"
              )}
              onClick={() => handleOutcomeChange(value)}
            >
              {value.toUpperCase()}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="py-6 space-y-6">
        {isPending ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-10 w-full animate-pulse rounded-md bg-muted/40" />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load order book. Please try again later.
          </div>
        ) : !side ? (
          <div className="rounded-md border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
            No order book data available for this market yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 rounded-lg bg-muted/30 p-4 text-xs text-muted-foreground">
              <div>
                <div className="text-muted-foreground/80">Best Bid</div>
                <div className="font-semibold text-success">
                  {formatPrice(bestBid)}
                </div>
                <div className="text-[10px] text-muted-foreground/80">
                  {formatShares(side.bids[0]?.shares)} sh
                </div>
              </div>
              <div>
                <div className="text-muted-foreground/80">Best Ask</div>
                <div className="font-semibold text-destructive">
                  {formatPrice(bestAsk)}
                </div>
                <div className="text-[10px] text-muted-foreground/80">
                  {formatShares(side.asks[0]?.shares)} sh
                </div>
              </div>
              <div>
                <div className="text-muted-foreground/80">Spread</div>
                <div className="font-semibold text-foreground">{spread}</div>
                <div className="text-[10px] text-muted-foreground/80">({outcome.toUpperCase()})</div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs uppercase text-muted-foreground/80">
                  <span>Asks (Sell)</span>
                  <span>
                    Depth: {formatShares(String(totalAskShares))} sh
                  </span>
                </div>
                <div className="space-y-2">
                  {side.asks.length === 0 ? (
                    <div className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                      No sell orders yet
                    </div>
                  ) : (
                    side.asks.slice(0, 10).map((order, index) => (
                      <div
                        key={`ask-${order.price}-${index}`}
                        className="grid grid-cols-[80px_1fr_auto] items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2"
                      >
                        <span className="font-mono text-sm text-destructive">
                          {formatPrice(order.price)}
                        </span>
                        <div className="text-right text-foreground">
                          {formatShares(order.shares)} sh
                          <span className="ml-2 text-[10px] text-muted-foreground">
                            {order.orderCount} orders
                          </span>
                        </div>
                        <span className="text-right text-xs text-muted-foreground">
                          {formatValue(order.price, order.shares)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="mb-2 flex items-center justify-between text-xs uppercase text-muted-foreground/80">
                  <span>Bids (Buy)</span>
                  <span>
                    Depth: {formatShares(String(totalBidShares))} sh
                  </span>
                </div>
                <div className="space-y-2">
                  {side.bids.length === 0 ? (
                    <div className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                      No buy orders yet
                    </div>
                  ) : (
                    side.bids.slice(0, 10).map((order, index) => (
                      <div
                        key={`bid-${order.price}-${index}`}
                        className="grid grid-cols-[80px_1fr_auto] items-center gap-2 rounded-md border border-success/30 bg-success/5 px-3 py-2"
                      >
                        <span className="font-mono text-sm text-success">
                          {formatPrice(order.price)}
                        </span>
                        <div className="text-right text-foreground">
                          {formatShares(order.shares)} sh
                          <span className="ml-2 text-[10px] text-muted-foreground">
                            {order.orderCount} orders
                          </span>
                        </div>
                        <span className="text-right text-xs text-muted-foreground">
                          {formatValue(order.price, order.shares)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
