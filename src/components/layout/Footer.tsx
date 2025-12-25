import { Twitter, Instagram, Disc, Github } from "lucide-react";

const FooterColumn = ({ title, links }: { title: string; links: string[] }) => (
  <div className="flex flex-col space-y-3">
    <h4 className="text-sm font-semibold">{title}</h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded-sm transform rotate-45 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary-foreground transform -rotate-45" />
              </div>
              <span className="text-lg font-bold">Polymarket</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              The world's largest prediction market.
            </p>
          </div>

          <FooterColumn
            title="Markets"
            links={["Politics", "Crypto", "Sports", "Pop Culture", "Business", "Science", "All"]}
          />

          <FooterColumn
            title="Resources"
            links={["Contact", "Press", "Learn", "Developers", "Elections", "Careers", "Newsletter"]}
          />

          <div className="col-span-2 md:col-span-2 lg:col-span-2 flex flex-col items-end">
            <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
              <span>Powered by</span>
              <span className="font-bold text-primary">UMA</span>
              <span className="ml-2 flex items-center gap-1 text-green-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                All Systems Operational
              </span>
            </div>
            <div className="flex gap-3">
              <button className="bg-background border border-border rounded-md px-3 py-1 hover:border-foreground transition-colors">
                <div className="text-left">
                  <div className="text-[10px] text-muted-foreground leading-none">Download on the</div>
                  <div className="text-xs font-bold leading-none mt-0.5">App Store</div>
                </div>
              </button>
              <button className="bg-background border border-border rounded-md px-3 py-1 hover:border-foreground transition-colors">
                <div className="text-left">
                  <div className="text-[10px] text-muted-foreground leading-none">GET IT ON</div>
                  <div className="text-xs font-bold leading-none mt-0.5">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">Adventure One QSS Inc. © 2024</p>
          <div className="flex items-center gap-6 text-muted-foreground">
            <Twitter className="w-4 h-4 cursor-pointer hover:text-foreground" />
            <Disc className="w-4 h-4 cursor-pointer hover:text-foreground" />
            <Instagram className="w-4 h-4 cursor-pointer hover:text-foreground" />
            <Github className="w-4 h-4 cursor-pointer hover:text-foreground" />
          </div>
        </div>
      </div>
    </footer>
  );
}
