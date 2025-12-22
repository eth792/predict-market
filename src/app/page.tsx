"use client";

/* ============================================================
 * Home Page
 * 预测市场首页 - 展示市场列表和详情
 * ============================================================ */

import { useState, useEffect } from "react";
import { Sidebar, MobileMenuButton } from "@/components/layout/Sidebar";
import { MarketList } from "@/components/market/MarketList";
import { MarketDetail } from "@/components/market/MarketDetail";
import { MobileMarketDetail } from "@/components/market/MobileMarketDetail";
import { useMarkets } from "@/lib/api/hooks";
import { transformApiMarkets } from "@/lib/api/transform";
import type { Market } from "@/types/market";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("trending");
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  // 获取市场数据
  const { data: apiMarkets, isLoading, error } = useMarkets();

  // 转换 API 数据为 UI 格式
  const markets = apiMarkets ? transformApiMarkets(apiMarkets) : [];

  // 根据分类筛选市场
  const filteredMarkets =
    selectedCategory === "trending"
      ? markets
      : markets.filter((m) => m.category === selectedCategory);

  // 当市场数据加载完成且没有选中市场时,自动选中第一个
  useEffect(() => {
    if (filteredMarkets.length > 0 && !selectedMarket) {
      setSelectedMarket(filteredMarkets[0]);
    }
  }, [filteredMarkets, selectedMarket]);

  // 当分类改变时,重置选中的市场
  useEffect(() => {
    if (filteredMarkets.length > 0) {
      setSelectedMarket(filteredMarkets[0]);
    } else {
      setSelectedMarket(null);
    }
  }, [selectedCategory]);

  const handleSelectMarket = (market: Market) => {
    setSelectedMarket(market);
    setShowMobileDetail(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header with menu button */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-background sticky top-0 z-30">
          <MobileMenuButton onClick={() => setSidebarOpen(true)} />
          <span className="text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </span>
          <span className="text-muted-foreground">›</span>
          <span className="text-sm text-foreground font-medium truncate">
            {selectedMarket?.title || "Markets"}
          </span>
        </header>

        <main className="flex-1 flex flex-col lg:flex-row">
          {/* Error State */}
          {error && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-destructive mb-2">Failed to load markets</p>
                <p className="text-sm text-muted-foreground">
                  {error.message}
                </p>
              </div>
            </div>
          )}

          {/* Market List */}
          {!error && (
            <MarketList
              markets={filteredMarkets}
              selectedMarket={selectedMarket}
              onSelectMarket={handleSelectMarket}
              selectedCategory={selectedCategory}
              isLoading={isLoading}
            />
          )}

          {selectedMarket && (
            <>
              {/* Desktop detail */}
              <div className="hidden lg:block">
                <MarketDetail market={selectedMarket} />
              </div>

              {/* Mobile detail */}
              <MobileMarketDetail
                market={selectedMarket}
                isOpen={showMobileDetail}
                onClose={() => setShowMobileDetail(false)}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
