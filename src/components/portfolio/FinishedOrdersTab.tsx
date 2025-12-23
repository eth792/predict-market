"use client";

import { useUserOrders } from "@/lib/api/hooks";
import type { Order, OrderStatus } from "@/types/market";
import { Badge } from "@/components/ui/badge";
import { intPriceToPercent } from "@/lib/api/transform";

interface FinishedOrdersTabProps {
  address: string;
}

const FINISHED_STATUSES: OrderStatus[] = ["FILLED", "CANCELLED", "EXPIRED"];

function formatPrice(price: string) {
  const percent = intPriceToPercent(price);
  return `${percent.toFixed(2)}%`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

function formatValue(price: string, shares: string) {
  const total =
    (parseFloat(price) || 0) * (parseFloat(shares) || 0);
  return total ? `$${total.toFixed(2)}` : "—";
}

export function FinishedOrdersTab({ address }: FinishedOrdersTabProps) {
  const { data, isPending, isError } = useUserOrders(address);

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load orders.
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-24 w-full animate-pulse rounded-xl border border-border/60 bg-card/60"
          />
        ))}
      </div>
    );
  }

  const finishedOrders = (data ?? []).filter((order) =>
    FINISHED_STATUSES.includes(order.status)
  );

  if (finishedOrders.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/60 p-6 text-center text-sm text-muted-foreground">
        No finished orders yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {finishedOrders.map((order) => (
        <OrderHistoryCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderHistoryCard({ order }: { order: Order }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {order.market?.title ?? "Unknown market"}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge
              variant={order.side === "BUY" ? "secondary" : "destructive"}
              className="text-[11px]"
            >
              {order.side} {order.token}
            </Badge>
            <span>{formatPrice(order.price)}</span>
            <span>{formatValue(order.price, order.initialShares)}</span>
          </div>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p className="font-medium text-foreground">{order.status}</p>
          <p>{formatDate(order.updatedAt)}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Created at {formatDate(order.createdAt)}
      </p>
    </div>
  );
}
