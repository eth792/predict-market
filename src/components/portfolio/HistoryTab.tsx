"use client";

import { useUserTrades } from "@/lib/api/hooks";
import type { Trade } from "@/types/market";
import { Badge } from "@/components/ui/badge";
import { useBlockExplorerUrl } from "@/hooks/useWeb3";

interface HistoryTabProps {
  address: string;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function normalizePrice(value: number) {
  if (!Number.isFinite(value)) return 0;
  return value > 1 ? value / 100 : value;
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "0%";
  const normalized = value > 1 ? value : value * 100;
  return `${normalized.toFixed(2)}%`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

export function HistoryTab({ address }: HistoryTabProps) {
  const { data, isPending, isError } = useUserTrades(address);
  const blockExplorerBase = useBlockExplorerUrl();

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load trade history.
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

  const trades = data ?? [];

  if (trades.length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card/60 p-6 text-center text-sm text-muted-foreground">
        No trades executed yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {trades.map((trade) => {
        const explorerUrl =
          blockExplorerBase && trade.batchTxHash
            ? `${blockExplorerBase}/tx/${trade.batchTxHash}`
            : null;

        return (
          <div
            key={trade.id}
            className="rounded-xl border border-border/60 bg-card p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {trade.market?.title ?? "Unknown market"}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge
                    variant={trade.makerSide === "BUY" ? "secondary" : "destructive"}
                    className="text-[11px]"
                  >
                    {trade.token} @ {formatPercent(trade.price)}
                  </Badge>
                  <span>{trade.quantity.toLocaleString()} shares</span>
                  <span>
                    {usd.format(trade.quantity * normalizePrice(trade.price))}
                  </span>
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>{formatDate(trade.createdAt)}</p>
                {explorerUrl && (
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    View on explorer
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
