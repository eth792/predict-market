"use client";

import { Calendar, TrendingUp, Tag, Clock } from "lucide-react";
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

/* ============================================================
 * Chart Data Generator
 * 生成模拟图表数据 (后续接入真实数据)
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
 * MarketDetail Component
 * 市场详情面板 (桌面端)
 * ============================================================ */

interface MarketDetailProps {
  market: Market;
}

export function MarketDetail({ market }: MarketDetailProps) {
  const chartData = generateChartData();

  return (
    <div className="w-full lg:w-[400px] xl:w-[450px] bg-background border-l border-border overflow-y-auto scrollbar-thin animate-slide-in-right">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start gap-3 mb-4">
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

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Start Date
            </span>
            <span className="text-foreground font-medium">11/19/2025</span>
          </div>
          <div>
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              End Date
            </span>
            <span className="text-foreground font-medium">{market.endDate}</span>
          </div>
          <div>
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              24h Volume
            </span>
            <span className="text-foreground font-medium">{market.volume}</span>
          </div>
          <div>
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Total Volume
            </span>
            <span className="text-foreground font-medium">{market.volume}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 border-b border-border">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Markets label */}
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Markets</span>
          <div className="flex items-center gap-4">
            <span>⊕ {market.totalYesShares || "$248K"}</span>
            <span>⊕ {market.volume}</span>
            <span>⊕ {market.totalNoShares || "862K"}</span>
          </div>
        </div>
      </div>

      {/* Trading options */}
      <div className="p-4 space-y-3">
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
  );
}
