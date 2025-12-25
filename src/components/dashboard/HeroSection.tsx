import Image from "next/image";

const HERO_CARDS = [
  {
    id: 'hero-1',
    title: "The 47th President",
    subtitle: "Track promises, policies, appointments & more!",
    image: "https://picsum.photos/200/200?random=100",
    action: "Dashboard",
    gradient: "from-blue-600 via-blue-800 to-slate-900"
  },
  {
    id: 'hero-2',
    title: "TikTok's Future",
    subtitle: "Ban, sale, or status quo? The clock is ticking.",
    image: "https://picsum.photos/200/200?random=101",
    action: "Trade Now",
    gradient: "from-cyan-600 via-cyan-800 to-slate-900"
  },
  {
    id: 'hero-3',
    title: "Crypto 2025",
    subtitle: "Bitcoin $100k? ETF approvals? The future of DeFi.",
    image: "https://picsum.photos/200/200?random=102",
    action: "Markets",
    gradient: "from-indigo-600 via-indigo-800 to-slate-900"
  },
  {
    id: 'hero-4',
    title: "First 100 Days",
    subtitle: "Executive orders, pardons, and legislation.",
    image: "https://picsum.photos/200/200?random=103",
    action: "View All",
    gradient: "from-sky-600 via-sky-800 to-slate-900"
  }
];

function HeroCard({ title, subtitle, image, action, gradient }: typeof HERO_CARDS[0]) {
  return (
    <div className={`relative overflow-hidden rounded-xl h-48 flex-shrink-0 w-80 md:w-96 snap-center group cursor-pointer border border-border hover:border-primary/50 transition-all duration-300`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className="absolute right-0 bottom-0 h-48 w-48 object-cover opacity-60 mix-blend-overlay transform group-hover:scale-105 transition-transform duration-500"
      />

      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white leading-tight drop-shadow-md tracking-tight">{title}</h2>
          <p className="text-sm text-blue-50/90 leading-snug font-medium max-w-[80%]">{subtitle}</p>
        </div>

        <button className="self-start px-4 py-1.5 rounded-lg border border-white/20 bg-white/10 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-all uppercase tracking-wide flex items-center gap-1 shadow-sm">
          {action}
          <span className="group-hover:translate-x-0.5 transition-transform">›</span>
        </button>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-4 pt-2">
      {HERO_CARDS.map((card) => (
        <HeroCard key={card.id} {...card} />
      ))}
    </div>
  );
}
