"use client";

import { Search } from "lucide-react";

const CATEGORIES = ['Top', 'New', 'Breaking News', 'Politics', 'Sports', 'Crypto', 'Business', 'Pop Culture', 'Science'];
const SUB_CATEGORIES = ['New', 'Breaking News', 'Trump Week 1', 'Cabinet', 'TikTok', 'Israel', 'Bitcoin', 'Inauguration'];

export function FilterBar() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-accent text-primary border border-border text-sm font-semibold whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE
          </button>

          <div className="h-6 w-px bg-border mx-2" />

          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                i === 1 ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold whitespace-nowrap hover:bg-primary/90">
          TOP ↗
        </button>

        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search by markets"
            className="w-full bg-background border border-border rounded-lg py-1.5 pl-9 pr-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[50%] md:max-w-none">
          {SUB_CATEGORIES.map(sub => (
            <button
              key={sub}
              className="px-3 py-1.5 rounded-lg bg-background border border-border text-muted-foreground text-xs font-medium whitespace-nowrap hover:bg-accent hover:text-foreground transition-colors"
            >
              {sub}
            </button>
          ))}
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
