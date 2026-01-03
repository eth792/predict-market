"use client";

import { useRef, useState, useEffect } from "react";
import { SPORTS_MATCHES } from "@/data/static-data";

interface Match {
  id: string;
  date: string;
  time: string;
  team1: {
    name: string;
    abbr: string;
    logo: string;
    odds: string;
  };
  team2: {
    name: string;
    abbr: string;
    logo: string;
    odds: string;
  };
  volume: string;
}

export function SportsMatchCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-[#00133c] py-4">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="relative">
          {/* 左箭头 */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute top-1/2 -left-3 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#2a3e6c]/95 text-white shadow-lg transition-all hover:scale-110 hover:bg-[#0e1f46]"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* 滚动容器 */}
          <div
            ref={scrollContainerRef}
            className="no-scrollbar flex gap-3 overflow-x-auto pb-2"
          >
            {SPORTS_MATCHES.map((match) => (
              <div
                key={match.id}
                className="group relative flex min-w-[220px] shrink-0 cursor-pointer rounded-xl border border-[#184470] bg-[#0e1f46]/40 transition-all duration-300 ease-out hover:min-w-[260px] hover:border-[#00a3ff] hover:shadow-[0_0_20px_rgba(0,163,255,0.5)]"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom center, #223969, #0e1f47)",
                }}
              >
                {/* 主内容区域 - 固定宽度 */}
                <div className="w-[220px] p-3">
                  {/* 头部：时间 */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="rounded-lg border border-white/15 bg-black/20 px-2 py-1 text-white">
                        {match.time}
                      </div>
                      <div className="mt-0.5 text-white/30 line-through">
                        {match.volume}
                      </div>
                    </div>
                  </div>

                  {/* 队伍1 */}
                  <div className="mb-2 flex items-center justify-between rounded-full bg-[#00133c]/30 p-1.5 pr-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{match.team1.logo}</span>
                      <span className="text-sm font-medium text-white">
                        {match.team1.abbr}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-white">
                      {match.team1.odds}
                    </span>
                  </div>

                  {/* 队伍2 */}
                  <div className="mb-2 flex items-center justify-between rounded-full bg-[#00133c]/30 p-1.5 pr-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{match.team2.logo}</span>
                      <span className="text-sm font-medium text-white">
                        {match.team2.abbr}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-white">
                      {match.team2.odds}
                    </span>
                  </div>
                </div>

                {/* 右侧按钮区域 - 悬浮时显示 */}
                <div className="flex w-0 flex-col items-center justify-center gap-2 overflow-hidden bg-white/10 opacity-0 transition-all duration-300 ease-out group-hover:w-14 group-hover:opacity-100">
                  <button className="flex h-8 w-8 translate-x-4 cursor-pointer items-center justify-center rounded-full bg-[#00133c]/80 text-gray-400 transition-all duration-300 ease-out group-hover:translate-x-0 hover:scale-110 hover:bg-[#00133c] hover:text-white">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <button className="flex h-8 w-8 translate-x-4 cursor-pointer items-center justify-center rounded-full bg-[#00133c]/80 text-gray-400 transition-all delay-75 duration-300 ease-out group-hover:translate-x-0 hover:scale-110 hover:bg-[#00133c] hover:text-white">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>
                  <button className="flex h-8 w-8 translate-x-4 cursor-pointer items-center justify-center rounded-full bg-[#00133c]/80 text-gray-400 transition-all delay-150 duration-300 ease-out group-hover:translate-x-0 hover:scale-110 hover:bg-[#00133c] hover:text-white">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 右箭头 */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute top-1/2 -right-3 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#2a3e6c]/95 text-white shadow-lg transition-all hover:scale-110 hover:bg-[#0e1f46]"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
