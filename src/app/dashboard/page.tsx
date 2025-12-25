"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { MarketCard } from "@/components/dashboard/MarketCard";
import { ActivitySection } from "@/components/dashboard/ActivitySection";
import { MARKETS_DATA } from "@/data/dashboard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">
        <HeroSection />

        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm py-2 -mx-4 px-4 md:mx-0 md:px-0">
          <FilterBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MARKETS_DATA.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        <div className="flex justify-center py-8">
          <button className="flex items-center space-x-2 px-6 py-2 rounded-full border border-border hover:bg-accent transition-colors text-sm font-medium">
            <span>Show more</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <ActivitySection />
      </div>

      <Footer />
    </div>
  );
}
