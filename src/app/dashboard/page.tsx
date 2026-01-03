"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { MarketCard } from "@/components/dashboard/MarketCard";
import { ActivitySection } from "@/components/dashboard/ActivitySection";
import { MARKETS_DATA } from "@/data/static-data";
import { CategoryNav } from "@/components/dashboard/CategoryNav";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#00133c]">
      <Header />
      <CategoryNav />
      <div className="mx-auto max-w-[1400px] space-y-3 px-4 py-3">
        <HeroSection />

        <div className="-mx-4 bg-[#00133c]/95 px-4  backdrop-blur-sm md:mx-0 md:px-0">
          <FilterBar />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {MARKETS_DATA.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        <div className="flex flex-col items-center space-y-3 py-3">
          {/* 进度条 */}
          <div className="w-full max-w-xs">
            <div className="h-1 overflow-hidden rounded-full bg-gray-300/20">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 transition-all duration-300"
                style={{ width: `${(12 / 130) * 100}%` }}
              />
            </div>
          </div>

          {/* 文本显示 */}
          <div className="text-center text-sm">
            <span className="text-white">You viewed: </span>
            <span className="font-medium">12 out of 130 Predictions</span>
          </div>

          {/* Show more 按钮 */}
          <div className="relative inline-flex rounded-full bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 p-px">
            <button className="flex cursor-pointer items-center space-x-1.5 rounded-full bg-[#00133c] px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#00133c]/90">
              <span>Show more</span>
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-400/20">
                <svg
                  className="h-2.5 w-2.5 text-[#00a3ff]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <ActivitySection />
      </div>

      <Footer />
    </div>
  );
}
