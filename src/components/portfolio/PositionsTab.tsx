"use client";

import { useUserPositions } from "@/lib/api/hooks";
import type { UserPosition } from "@/types/market";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PositionsTabProps {
  address: string;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function formatUSD(value: number) {
  if (!Number.isFinite(value)) return "$0.00";
  return usd.format(value);
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "0%";
  const normalized = Math.abs(value) > 1 ? value : value * 100;
  return `${normalized.toFixed(2)}%`;
}

export function PositionsTab({ address }: PositionsTabProps) {
  const { data, isPending, isError } = useUserPositions(address);

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load positions.
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-20 w-full animate-pulse rounded-xl border border-border/60 bg-card/60"
          />
        ))}
      </div>
    );
  }

  const positions = data ?? [];

  if (positions.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/60 p-6 text-center text-sm text-muted-foreground">
        No positions yet. Start trading from the markets list.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-card">
      <div className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 border-b border-border/60 px-6 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Market</span>
        <span className="text-right">Avg → Now</span>
        <span className="text-right">Value</span>
        <span className="text-right">P&L</span>
      </div>

      {positions.map((position) => (
        <PositionRow key={`${position.market.id}-${position.outcome}`} position={position} />
      ))}
    </div>
  );
}

function PositionRow({ position }: { position: UserPosition }) {
  const value = position.value ?? 0;
  const pnl = position.profitLoss ?? 0;
  const avgPrice = position.avgPrice ?? 0;
  const currentPrice = position.currentPrice ?? 0;
  const marketTitle = position.market?.title ?? "Unknown market";
  const initial = marketTitle.charAt(0).toUpperCase();

  return (
    <div className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 border-b border-border/40 px-6 py-4 last:border-b-0 hover:bg-muted/30">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-lg font-semibold text-muted-foreground">
          {initial}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{marketTitle}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge
              variant={position.outcome === "YES" ? "default" : "destructive"}
              className="text-[11px]"
            >
              {position.outcome}
            </Badge>
            <span>{position.shares} shares</span>
          </div>
        </div>
      </div>

      <div className="text-right text-sm text-muted-foreground">
        {formatPercent(avgPrice)} →{" "}
        <span className="text-foreground">{formatPercent(currentPrice)}</span>
      </div>

      <div className="text-right text-sm font-medium text-foreground">
        {formatUSD(value)}
      </div>

      <div
        className={cn(
          "text-right text-sm font-semibold",
          pnl >= 0 ? "text-success" : "text-destructive"
        )}
      >
        {formatUSD(pnl)} ({formatPercent(position.profitLossPercent ?? 0)})
      </div>
    </div>
  );
}
