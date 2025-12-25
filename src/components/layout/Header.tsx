import { Search, Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Ranks", href: "#" },
  { label: "Activity", href: "#" },
  { label: "Sports", href: "#" },
  { label: "Dashboards", href: "#" },
  { label: "Markets", href: "#" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border h-16">
      <div className="max-w-[1400px] mx-auto px-4 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-1">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center transform rotate-45">
              <div className="w-4 h-4 bg-primary-foreground transform -rotate-45" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden md:block">
              Polymarket
            </span>
          </div>

          <div className="relative max-w-md w-full hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search markets"
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary sm:text-sm transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:inline-flex px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-accent transition-colors">
              Log In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors">
              Sign Up
            </button>
            <button className="md:hidden p-2 text-muted-foreground">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
