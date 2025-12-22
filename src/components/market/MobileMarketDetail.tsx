"use client";

import { X, Calendar, TrendingUp, Tag } from "lucide-react";
import type { Market } from "@/types/market";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

/* ============================================================
 * Chart Data Generator
 * ============================================================ */

const generateChartData = () => {
  const data = [];
  let value = 50;
  for (let i = 0; i < 30; i++) {
    value = Math.max(10, Math.min(90, value + (Math.random() - 0.5) * 10));
    data.push({
      day: i,
      value: value,
    });
  }
  return data;
};

/* ============================================================
 * MobileMarketDetail Component
 * 移动端市场详情面板 (底部抽屉)
 * ============================================================ */

interface MobileMarketDetailProps {
  market: Market;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMarketDetail({
  market,
  isOpen,
  onClose,
}: MobileMarketDetailProps) {
  const chartData = generateChartData();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sheet */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 bg-background border-t border-border rounded-t-2xl max-h-[85vh] overflow-y-auto scrollbar-thin lg:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Handle */}
        <div className="sticky top-0 bg-background z-10 pt-2 pb-3 px-4 flex justify-center">
          <div className="w-12 h-1.5 bg-muted rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <img
                src={market.image}
                alt={market.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h2 className="font-semibold text-foreground text-lg">
                  {market.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs bg-secondary px-2 py-0.5 rounded">
                    <Tag className="w-3 h-3" />
                    {market.category.charAt(0).toUpperCase() +
                      market.category.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 text-xs mt-4">
            <div>
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                End Date
              </span>
              <span className="text-foreground font-medium">
                {market.endDate}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Volume
              </span>
              <span className="text-foreground font-medium">
                {market.volume}
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-4 border-b border-border">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="colorValueMobile"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(217, 91%, 60%)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(217, 91%, 60%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 7%)",
                    border: "1px solid hsl(0, 0%, 15%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "hsl(0, 0%, 55%)" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth={2}
                  fill="url(#colorValueMobile)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trading options */}
        <div className="p-4 space-y-3 pb-8">
          {market.options.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
            >
              <div className="flex items-center gap-2">
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="font-medium text-foreground text-sm">
                  {option.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="success" size="xs">
                  Yes {option.yesPrice.toFixed(1)}¢
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  className="text-muted-foreground"
                >
                  No {option.noPrice.toFixed(1)}¢
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
