"use client";

import { useState, useEffect } from "react";
import { useUserOrders, useCancelOrder } from "@/lib/api/hooks";
import type { Order, OrderStatus } from "@/types/market";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { intPriceToPercent } from "@/lib/api/transform";

interface OpenOrdersTabProps {
  address: string;
}

const OPEN_STATUSES: OrderStatus[] = ["OPEN", "PARTIALLY_FILLED", "CANCELLING"];

function formatPrice(price: string) {
  const percent = intPriceToPercent(price);
  return `${percent.toFixed(2)}%`;
}

function formatShares(shares: string) {
  const value = parseFloat(shares);
  if (Number.isNaN(value)) return shares;
  return `${value.toLocaleString()} sh`;
}

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString();
}

export function OpenOrdersTab({ address }: OpenOrdersTabProps) {
  const { data, isPending, isError, refetch } = useUserOrders(address);
  const cancelOrder = useCancelOrder();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const openOrders = (data ?? []).filter((order) =>
    OPEN_STATUSES.includes(order.status)
  );

  useEffect(() => {
    if (cancelOrder.isError && cancelOrder.error instanceof Error) {
      setCancelError(cancelOrder.error.message);
    }
  }, [cancelOrder.isError, cancelOrder.error]);

  useEffect(() => {
    if (cancelOrder.isSuccess) {
      refetch();
    }
  }, [cancelOrder.isSuccess, refetch]);

  const handleCancel = (orderId: string) => {
    setCancelError(null);
    setSelectedOrderId(orderId);
    cancelOrder.mutate(orderId, {
      onSettled: () => setSelectedOrderId(null),
      onSuccess: () => refetch(),
    });
  };

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

  if (openOrders.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/60 p-6 text-center text-sm text-muted-foreground">
        No open orders at the moment.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cancelError && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          {cancelError}
        </div>
      )}
      {openOrders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onCancel={() => handleCancel(order.id)}
          isCancelling={selectedOrderId === order.id && cancelOrder.isPending}
        />
      ))}
    </div>
  );
}

function OrderCard({
  order,
  onCancel,
  isCancelling,
}: {
  order: Order;
  onCancel: () => void;
  isCancelling: boolean;
}) {
  const totalValue =
    (parseFloat(order.price) || 0) * (parseFloat(order.remainingShares) || 0);

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
            <span>{formatShares(order.remainingShares)} remaining</span>
            <span>{formatPrice(order.price)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{formatDate(order.createdAt)}</span>
          <span className="text-foreground">
            {totalValue ? `$${totalValue.toFixed(2)}` : "—"}
          </span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          Status:{" "}
          <span className="font-medium text-foreground">{order.status}</span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={onCancel}
          disabled={isCancelling}
        >
          {isCancelling ? "Cancelling..." : "Cancel Order"}
        </Button>
      </div>
    </div>
  );
}
