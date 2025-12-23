import { Flame, ChevronRight } from "lucide-react";
import type { Market } from "@/types/market";
import { MarketCard } from "./MarketCard";

/* ============================================================
 * MarketList Component
 * 市场列表组件
 * ============================================================ */

interface MarketListProps {
  markets: Market[];
  selectedMarket: Market | null;
  onSelectMarket: (market: Market) => void;
  selectedCategory: string;
  isLoading?: boolean;
}

export function MarketList({
  markets,
  selectedMarket,
  onSelectMarket,
  selectedCategory,
  isLoading,
}: MarketListProps) {
  const categoryName =
    selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

  return (
    <div className="flex-1 border-r border-border overflow-y-auto scrollbar-thin">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3 z-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Flame className="w-4 h-4" />
          <span>{categoryName}</span>
          <ChevronRight className="w-4 h-4" />
          {selectedMarket && (
            <span className="text-foreground">{selectedMarket.title}</span>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && markets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No markets found</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Check back later for new markets
          </p>
        </div>
      )}

      {/* Market list */}
      {!isLoading && (
        <div>
          {markets.map((market) => (
            <MarketCard
              key={market.id}
              market={market}
              isSelected={selectedMarket?.id === market.id}
              onClick={() => onSelectMarket(market)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
