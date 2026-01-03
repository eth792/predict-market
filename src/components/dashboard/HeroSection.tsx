import Image from "next/image";
import { HERO_CARDS } from "@/data/static-data";

interface HeroCardProps {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  action: string;
  gradient: string;
}

function HeroCard({ title, subtitle, image, action, gradient }: HeroCardProps) {
  return (
    <div className="group border-border hover:border-white/20 relative h-48 cursor-pointer overflow-hidden rounded-xl border transition-all duration-300">
      <Image
        src={image}
        alt={title}
        fill
        className="absolute right-0 bottom-0 h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div
        className="relative z-10 flex h-full w-4/5 flex-col justify-between p-6"
        style={{
          background:
            "linear-gradient(90deg, #3a80ff 0%, #3a80ff 50%, transparent)",
        }}
      >
        <div className="space-y-2">
          <h2 className="text-xl leading-tight font-bold tracking-tight text-white drop-shadow-md">
            {title}
          </h2>
          <p className="max-w-[80%] text-sm leading-snug font-medium text-blue-50/90">
            {subtitle}
          </p>
        </div>

        <button className="flex cursor-pointer items-center gap-1 self-start rounded-xl border border-white/60 bg-white/10 px-4 py-2.5 text-xs font-semibold tracking-wide text-white uppercase shadow-sm backdrop-blur-md transition-all hover:bg-white/20">
          {action}
          <span className="transition-transform group-hover:translate-x-0.5">
            ›
          </span>
        </button>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <div className="grid grid-cols-1 gap-4 pt-2 pb-4 sm:grid-cols-2 lg:grid-cols-4">
      {HERO_CARDS.map((card) => (
        <HeroCard key={card.id} {...card} />
      ))}
    </div>
  );
}
