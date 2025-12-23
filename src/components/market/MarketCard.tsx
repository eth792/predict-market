import Image from "next/image";
import { Calendar, TrendingUp } from "lucide-react";
import type { Market, MarketOption } from "@/types/market";
import { cn } from "@/lib/utils";

/* ============================================================
 * MarketCard Component
 * 市场列表中的单个市场卡片
 * ============================================================ */

interface MarketCardProps {
  market: Market;
  isSelected: boolean;
  onClick: () => void;
}

export function MarketCard({ market, isSelected, onClick }: MarketCardProps) {
  return (
    <div
      className={cn(
        "border-b border-border py-4 px-4 cursor-pointer transition-colors",
        isSelected ? "bg-muted shadow-inner" : "hover:bg-muted/50"
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Image
            src={market.image}
            alt={market.title}
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <h3 className="font-medium text-foreground text-sm">{market.title}</h3>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {market.volume}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {market.endDate}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {market.options.slice(0, 3).map((option) => (
          <MarketOptionRow key={option.id} option={option} />
        ))}
        {market.options.length > 3 && (
          <button className="text-muted-foreground text-xs hover:text-foreground transition-colors">
            ...
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
 * MarketOptionRow Component
 * 市场选项行显示
 * ============================================================ */

function MarketOptionRow({ option }: { option: MarketOption }) {
  const progressWidth = option.yesPrice;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {option.image && (
          <Image
            src={option.image}
            alt={option.name}
            width={20}
            height={20}
            className="w-5 h-5 rounded-full object-cover"
          />
        )}
        <span className="text-sm text-muted-foreground truncate">
          {option.name}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex-1 max-w-[200px] hidden sm:block">
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-chart-line rounded-full transition-all duration-300"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      {/* Prices */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-foreground font-medium">Yes</span>
        <span className="text-muted-foreground w-16 text-right">
          {option.yesPrice.toFixed(1)}¢ • {option.volume}
        </span>
      </div>
    </div>
  );
}
