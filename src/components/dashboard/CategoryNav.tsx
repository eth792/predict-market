"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CATEGORIES = [
  { id: "live", label: "LIVE", isLive: true, href: "#" },
  { id: "all", label: "All", isLive: false, href: "#" },
  { id: "new", label: "New", isLive: false, href: "#" },
  { id: "politics", label: "Politics", isLive: false, href: "#" },
  { id: "sports", label: "Sports", isLive: false, href: "/sports" },
  { id: "crypto", label: "Crypto", isLive: false, href: "#" },
  {
    id: "global-elections",
    label: "Global Elections",
    isLive: false,
    href: "#",
  },
  { id: "elon-tweets", label: "Elon Tweets", isLive: false, href: "#" },
  { id: "mentions", label: "Mentions", isLive: false, href: "#" },
  { id: "creators", label: "Creators", isLive: false, href: "#" },
  { id: "pop-culture", label: "Pop Culture", isLive: false, href: "#" },
  { id: "business", label: "Business", isLive: false, href: "#" },
];

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-16 z-40 overflow-hidden bg-[#00133c]">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex items-center py-3">
          <div className="flex w-full items-center justify-between">
            {CATEGORIES.map((category) => {
              const isActive = pathname === category.href;

              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className={`cursor-pointer rounded-[10px] border px-4 py-1 text-sm whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md ${
                    isActive
                      ? "border-0 bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 text-white hover:bg-[#0090e0]"
                      : category.isLive
                        ? "border-[#184470] bg-[rgba(14,31,70,0.6)] text-orange-400 hover:border-[#1f5a8a] hover:bg-[rgba(14,31,70,0.8)]"
                        : "border-[#184470] bg-[rgba(14,31,70,0.4)] text-white hover:border-[#1f5a8a] hover:bg-[rgba(14,31,70,0.6)]"
                  }`}
                >
                  {category.isLive ? (
                    <span className="flex items-center gap-1.5">
                      <span>LIVE</span>
                      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-red-500" />
                    </span>
                  ) : (
                    category.label
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
