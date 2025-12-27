"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  "Top",
  "New",
  "Breaking News",
  "Politics",
  "Sports",
  "Crypto",
  "Business",
  "Pop Culture",
  "Science",
];
const SUB_CATEGORIES = [
  "New",
  "Breaking News",
  "Trump Week 1",
  "Cabinet",
  "TikTok",
  "Israel",
  "Bitcoin",
  "Inauguration",
  "Biggest Movers",
  "Most Active",
  "Most Viewed",
  "Most Discussed",
  "Most Popular",
  "Most Trending",
  "Most Recent",
];

export function FilterBar() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollable = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowRightArrow(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScrollable();

    const resizeObserver = new ResizeObserver(() => {
      checkScrollable();
    });

    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleRightArrowClick = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <button className="flex cursor-pointer items-center gap-2 rounded-lg border bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white transition-all duration-300 ease-out hover:from-blue-500 hover:via-blue-400 hover:to-blue-300 hover:shadow-md md:px-4 md:text-sm">
          TOP ↗
        </button>

        <div className="relative max-w-150 flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Search by markets"
            className="focus:border-blue-primary focus:ring-blue-primary w-full rounded-lg border border-gray-700 bg-[#0c1d41] py-1.5 pr-4 pl-9 text-xs text-white placeholder-gray-400 focus:outline-none md:text-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex flex-1 items-center gap-2 overflow-x-auto overflow-y-visible pt-4 pb-4"
        >
          {SUB_CATEGORIES.map((sub) => (
            <button
              key={sub}
              className="border-border text-foreground/65 hover:text-foreground cursor-pointer rounded-lg bg-[#0e1f47] px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/15 hover:shadow-md"
            >
              {sub}
            </button>
          ))}
        </div>
        {showRightArrow && (
          <div
            onClick={handleRightArrowClick}
            className="border-border text-muted-foreground hover:text-foreground flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border bg-[#00033b]/90 pt-4 pb-4"
          >
            <svg
              className="h-4 w-4 -rotate-90 text-white"
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
        )}
      </div>
    </div>
  );
}
