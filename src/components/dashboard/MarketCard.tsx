import Image from "next/image";
import { MessageSquare, Star } from "lucide-react";

interface Market {
  id: string;
  question: string;
  iconUrl: string;
  volume: string;
  chance: number;
  isBinary: boolean;
  outcomes?: { name: string; percent: number }[];
  tags: string[];
  commentsCount: number;
}

export function MarketCard({ market }: { market: Market }) {
  const isBinary = market.isBinary;

  return (
    <div className="group relative flex flex-col h-full rounded-xl transition-all duration-300 cursor-pointer overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
      <div className="p-4 pb-2 flex items-start gap-3">
        <Image
          src={market.iconUrl}
          alt="icon"
          width={40}
          height={40}
          className="w-10 h-10 rounded-md object-cover flex-shrink-0 shadow-sm"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-medium text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-3">
            {market.question}
          </h3>
        </div>

        {isBinary && (
          <div className="flex flex-col items-end pl-2">
            <span className={`text-xl font-bold tracking-tight ${market.chance > 50 ? 'text-green-500' : 'text-primary'} drop-shadow-sm`}>
              {market.chance}%
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">chance</span>
          </div>
        )}
      </div>

      <div className="px-4 flex-1 flex flex-col justify-end">
        {isBinary ? (
          <div className="grid grid-cols-2 gap-3 py-3">
            <button className="relative flex flex-col items-center justify-center py-2 rounded-lg bg-green-500/5 border border-green-500/20 hover:bg-green-500 hover:border-green-500 group/yes transition-all duration-200">
              <span className="text-xs font-bold uppercase tracking-wider text-green-500 group-hover/yes:text-white">Buy Yes</span>
            </button>
            <button className="relative flex flex-col items-center justify-center py-2 rounded-lg bg-red-500/5 border border-red-500/20 hover:bg-red-500 hover:border-red-500 group/no transition-all duration-200">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 group-hover/no:text-white">Buy No</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-3">
            {market.outcomes?.slice(0, 3).map((outcome, idx) => (
              <div key={idx} className="relative flex items-center justify-between p-1.5 rounded-md hover:bg-accent transition-colors group/item">
                <div
                  className="absolute inset-y-0 left-0 bg-accent rounded-md"
                  style={{ width: `${outcome.percent}%`, opacity: 0.5 }}
                />

                <div className="relative z-10 flex items-center gap-2 flex-1 min-w-0 pr-2 pl-1">
                  <span className="text-sm text-foreground font-medium truncate group-hover/item:text-foreground transition-colors">{outcome.name}</span>
                </div>

                <span className="relative z-10 text-sm font-bold text-primary pr-1">
                  {outcome.percent}%
                </span>
              </div>
            ))}

            {market.outcomes && market.outcomes.length > 3 && (
              <div className="pt-1 text-center">
                <span className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Show {market.outcomes.length - 3} more
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-border mt-auto bg-accent/20">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
          <div className="flex items-center gap-1">
            <span className="text-emerald-500/80 font-bold">$</span>
            <span>{market.volume} Vol.</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 hover:text-foreground transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{market.commentsCount}</span>
            </div>
            <button className="hover:text-yellow-400 transition-colors">
              <Star className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
