"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryNav } from "@/components/dashboard/CategoryNav";
import { SportsMatchCarousel } from "@/components/sports/SportsMatchCarousel";
import { MarketDetailPanel } from "@/components/sports/MarketDetailPanel";
import { TradingPanel } from "@/components/sports/TradingPanel";

export default function SportsPage() {
  return (
    <div className="min-h-screen bg-[#00133c]">
      <Header />
      <CategoryNav />

      {/* 顶部横向比赛轮播 */}
      <SportsMatchCarousel />

      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* 左侧：市场详情 */}
          <div>
            <MarketDetailPanel />
          </div>

          {/* 右侧：交易面板 */}
          <div>
            <TradingPanel />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
