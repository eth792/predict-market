import { Twitter, Instagram, Disc, Github } from "lucide-react";

const AppleIcon = () => (
  <div className="h-5 w-5">
    <svg
      className="absolute -top-1 -left-2.5 h-12 w-12"
      viewBox="0 0 14 44"
      fill="currentColor"
    >
      <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"></path>
    </svg>
  </div>
);

const GooglePlayIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M0,0h40v40H0V0z"></path>
    <g>
      <path
        d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z"
        fill="#EA4335"
      ></path>
      <path
        d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z"
        fill="#FBBC04"
      ></path>
      <path
        d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z"
        fill="#4285F4"
      ></path>
      <path
        d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z"
        fill="#34A853"
      ></path>
    </g>
  </svg>
);

const FooterColumn = ({ title, links }: { title: string; links: string[] }) => (
  <div className="flex flex-col space-y-3">
    <h4 className="text-sm font-semibold">{title}</h4>
    <ul className="">
      {links.map((link) => (
        <li key={link}>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground inline-block cursor-pointer rounded-lg px-2 py-1 text-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/15 hover:shadow-md"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export function Footer() {
  return (
    <footer className="border-border border-t bg-gradient-to-r from-[#0e1f47] to-[#1e3969] pt-16 pb-8">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-primary flex h-6 w-6 rotate-45 transform items-center justify-center rounded-sm">
                <div className="bg-primary-foreground h-3 w-3 -rotate-45 transform" />
              </div>
              <span className="text-lg font-bold">PredictMarket</span>
            </div>
            <p className="mb-6 max-w-xs text-sm text-white/80">
              The world's largest prediction market.
            </p>
          </div>

          <FooterColumn
            title="Markets"
            links={[
              "Politics",
              "Crypto",
              "Sports",
              "Pop Culture",
              "Business",
              "Science",
              "All",
            ]}
          />

          <FooterColumn
            title="Resources"
            links={[
              "Contact",
              "Press",
              "Learn",
              "Developers",
              "Elections",
              "Careers",
              "Newsletter",
            ]}
          />

          <div className="col-span-2 flex flex-col items-end md:col-span-2 lg:col-span-2">
            <div className="text-muted-foreground mb-4 flex items-center gap-2 text-xs">
              <span>Powered by</span>
              <span className="text-primary font-bold">UMA</span>
              <span className="ml-2 flex items-center gap-1 text-green-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                All Systems Operational
              </span>
            </div>
            <div className="hidden gap-3">
              <button className="group flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/60 from-white/5 to-white/10 px-1 py-0.5 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:from-white/10 hover:to-white/15 hover:shadow-lg">
                <AppleIcon />
                <div className="text-left">
                  <div className="text-[10px] leading-tight text-white/70">
                    Download on the
                  </div>
                  <div className="text-sm leading-tight font-semibold text-white">
                    App Store
                  </div>
                </div>
              </button>
              <button className="group flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/60 from-white/5 to-white/10 px-1 py-0.5 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:from-white/10 hover:to-white/15 hover:shadow-lg">
                <GooglePlayIcon />
                <div className="text-left">
                  <div className="text-[10px] leading-tight text-white/70">
                    GET IT ON
                  </div>
                  <div className="text-xs leading-tight font-semibold text-white">
                    Google Play
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[white]/10 pt-8 md:flex-row">
          <p className="text-muted-foreground text-xs">
            Adventure One QSS Inc. © 2024
          </p>
          <div className="flex items-center gap-6 text-white/80">
            <Twitter className="hover:text-foreground h-4 w-4 cursor-pointer" />
            <Disc className="hover:text-foreground h-4 w-4 cursor-pointer" />
            <Instagram className="hover:text-foreground h-4 w-4 cursor-pointer" />
            <Github className="hover:text-foreground h-4 w-4 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
