"use client";

const CATEGORIES = [
  { id: "live", label: "LIVE", isLive: true },
  { id: "all", label: "All", isLive: false },
  { id: "new", label: "New", isLive: false },
  { id: "politics", label: "Politics", isLive: false },
  { id: "sports", label: "Sports", isLive: false },
  { id: "crypto", label: "Crypto", isLive: false },
  { id: "global-elections", label: "Global Elections", isLive: false },
  { id: "elon-tweets", label: "Elon Tweets", isLive: false },
  { id: "mentions", label: "Mentions", isLive: false },
  { id: "creators", label: "Creators", isLive: false },
  { id: "pop-culture", label: "Pop Culture", isLive: false },
  { id: "business", label: "Business", isLive: false },
];

export function CategoryNav() {
  return (
    <nav className="sticky top-16 z-40 overflow-hidden bg-[#00133c]">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex items-center py-3">
          <div className="flex w-full items-center justify-between">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`cursor-pointer rounded-[10px] border border-[#184470] px-4 py-1 text-sm whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#1f5a8a] hover:shadow-md ${
                  category.isLive
                    ? "bg-[rgba(14,31,70,0.6)] text-orange-400 hover:bg-[rgba(14,31,70,0.8)]"
                    : "bg-[rgba(14,31,70,0.4)] text-white hover:bg-[rgba(14,31,70,0.6)]"
                } `}
              >
                {category.isLive ? (
                  <span className="flex items-center gap-1.5">
                    <span>LIVE</span>
                    <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-red-500" />
                  </span>
                ) : (
                  category.label
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
