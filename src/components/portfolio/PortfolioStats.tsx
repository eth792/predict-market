"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserPortfolio } from "@/lib/api/hooks";
import { cn } from "@/lib/utils";

interface PortfolioStatsProps {
  address: string;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function PortfolioStats({ address }: PortfolioStatsProps) {
  const { data, isPending, isError } = useUserPortfolio(address);

  const totalValue = parseFloat(data?.totalValue ?? "0");
  const totalPnL = parseFloat(data?.totalPnL ?? "0");
  const usdcBalance = parseFloat(data?.balance?.usdcBalance ?? "0");
  const positionsCount = data?.positions?.length ?? 0;

  const pnlPercent =
    totalValue !== 0 ? (totalPnL / Math.abs(totalValue)) * 100 : 0;

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load portfolio stats. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Portfolio Value"
        highlight
        isLoading={isPending}
        value={formatCurrency(totalValue)}
        subLabel={
          totalPnL >= 0
            ? `+${formatCurrency(totalPnL)} (${pnlPercent.toFixed(2)}%)`
            : `${formatCurrency(totalPnL)} (${pnlPercent.toFixed(2)}%)`
        }
        trend={totalPnL}
      />

      <StatCard
        label="Available USDC"
        isLoading={isPending}
        value={formatCurrency(usdcBalance)}
        subLabel="Ready to deploy"
      />

      <StatCard
        label="Open P&L"
        isLoading={isPending}
        value={formatCurrency(totalPnL)}
        subLabel="Unrealized gains"
        trend={totalPnL}
      />

      <StatCard
        label="Open Positions"
        isLoading={isPending}
        value={positionsCount.toString()}
        subLabel="Active markets"
      />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  subLabel?: string;
  isLoading?: boolean;
  trend?: number;
  highlight?: boolean;
}

function StatCard({
  label,
  value,
  subLabel,
  isLoading,
  trend,
  highlight,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "border border-border/60 bg-card/80 backdrop-blur",
        highlight && "border-primary/50"
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-7 w-1/2 animate-pulse rounded bg-muted/60" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-muted/40" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-semibold text-foreground">{value}</div>
            {subLabel && (
              <p
                className={cn(
                  "mt-1 text-sm",
                  trend === undefined
                    ? "text-muted-foreground"
                    : trend >= 0
                      ? "text-success"
                      : "text-destructive"
                )}
              >
                {subLabel}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
