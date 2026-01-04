"use client";

export default function FastXPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1)_0%,transparent_60%)] pointer-events-none" />
      <div className="fixed top-[10%] -left-[100px] w-[500px] h-[500px] bg-[#00F0FF] rounded-full blur-[80px] opacity-15 pointer-events-none" />
      <div className="fixed bottom-[20%] -right-[100px] w-[400px] h-[400px] bg-[#0044ff] rounded-full blur-[80px] opacity-15 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 h-20 md:h-[100px] flex items-center justify-between px-4 md:px-[60px] bg-black/80 backdrop-blur-md border-b border-[#00F0FF]/20">
        <div className="flex items-center gap-3 md:gap-[15px]">
          <img src="/fastx-logo.svg" alt="FastX" className="h-8 md:h-10 drop-shadow-[0_0_5px_#00F0FF]" />
        </div>
        <nav className="hidden md:flex gap-10">
          {[
            { label: "Home", href: "#hero" },
            { label: "Advantages", href: "#advantages" },
            { label: "Architecture", href: "#architecture" },
            { label: "Token", href: "#tokenomics" },
            { label: "Roadmap", href: "#roadmap" }
          ].map((item) => (
            <a key={item.label} href={item.href} className="text-sm uppercase tracking-wider opacity-80 hover:opacity-100 hover:text-[#00F0FF] hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] transition-all">
              {item.label}
            </a>
          ))}
        </nav>
        <button className="px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm uppercase tracking-wider bg-[#00F0FF]/10 text-white border border-[#00F0FF] rounded shadow-[0_0_10px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all">
          Launch App
        </button>
      </header>

      {/* Hero */}
      <section id="hero" className="min-h-[600px] md:h-[900px] flex flex-col items-center justify-center text-center px-4 py-20 md:py-0">
        <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] flex items-center justify-center mb-8 md:mb-10">
          <div className="absolute w-[140px] h-[140px] md:w-[200px] md:h-[200px] border-2 border-dashed border-[#00F0FF]/30 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-[180px] h-[180px] md:w-[260px] md:h-[260px] border border-[#00F0FF]/60 rounded-full animate-[spin_15s_linear_infinite_reverse]" style={{ transform: "rotateX(60deg)" }} />
          <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] border border-[#00F0FF]/20 rounded-full animate-[spin_25s_linear_infinite]" />
          <img src="/fastx-logo.svg" alt="Core" className="w-16 md:w-[120px] z-10" />
        </div>
        <h1 className="text-4xl md:text-[80px] leading-tight md:leading-[1.1] mb-4 md:mb-6 font-bold bg-gradient-to-b from-white to-[#00F0FF] bg-clip-text text-transparent">
          See through the<br />world with AI
        </h1>
        <p className="max-w-[90%] md:max-w-[700px] text-sm md:text-xl text-gray-400 mb-8 md:mb-10 leading-relaxed">
          FastX Network is an AI infrastructure built on a decentralized vector database. It collects, structures, and analyzes real-world, real-time data to deliver powerful AI tools that help users make better decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
          <button className="px-8 md:px-10 py-3 md:py-4 text-sm md:text-lg uppercase tracking-wider bg-[#00F0FF]/10 text-white border border-[#00F0FF] rounded shadow-[0_0_10px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all">
            Join the Community
          </button>
          <button className="px-8 md:px-10 py-3 md:py-4 text-sm md:text-lg uppercase tracking-wider text-[#00F0FF] bg-black/60 border border-[#00F0FF] rounded shadow-[0_0_10px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all">
            View Tokenomics
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="advantages" className="py-16 md:py-[100px] px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <span className="block text-[#00F0FF] text-xs md:text-base tracking-[4px] uppercase mb-2 md:mb-2.5">// Advantages</span>
            <h2 className="text-3xl md:text-5xl uppercase tracking-wider">Core Advantages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[30px]">
            {[
              { icon: "ri-brain-line", title: "AI-Driven Real-World Analysis", desc: "FastX Network runs custom AI algorithms and AIGC models trained to process real-world and real-time data. It transforms raw, unstructured information into actionable insights and decision-making tools." },
              { icon: "ri-globe-line", title: "Multi-Platform Analysis, Anytime, Anywhere", desc: "Access FastX Network from Web, Mobile Apps, and Telegram Bots. Stay connected to real-time AI insights wherever you are." },
              { icon: "ri-shield-check-line", title: "Security & Privacy Powered by Blockchain", desc: "User assets and data are stored and protected by blockchain technology. This ensures asset security, data integrity, and information privacy across the network." },
              { icon: "ri-group-line", title: "Community-Driven, Miner-Powered Network", desc: "FastX Network is organized and secured by miners and node holders who contribute computing resources, data, and governance. Together, they build and maintain the AI infrastructure as a truly community-driven network." }
            ].map((f, i) => (
              <div key={i} className="bg-[rgba(5,10,15,0.8)] border border-[#00F0FF]/50 rounded-2xl p-6 md:p-10 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:translate-y-[-5px] transition-transform">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-[#00F0FF]/10 border border-[#00F0FF]/30 rounded-xl mb-4 md:mb-5 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  <i className={`${f.icon} text-3xl md:text-[40px] text-[#00F0FF]`} />
                </div>
                <h3 className="text-xl md:text-[28px] text-[#00F0FF] mb-3 md:mb-4">{f.title}</h3>
                <p className="text-sm md:text-lg text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="py-16 md:py-[100px] px-4 bg-gradient-to-b from-transparent via-[rgba(0,240,255,0.05)] to-transparent">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <span className="block text-[#00F0FF] text-xs md:text-base tracking-[4px] uppercase mb-2 md:mb-2.5">// Architecture</span>
            <h2 className="text-3xl md:text-5xl uppercase tracking-wider mb-4">FastX Network Product Architecture</h2>
            <p className="text-sm md:text-lg text-gray-400 max-w-[800px] mx-auto">
              FastX Network is built as a three-layer AI infrastructure: Data Layer, AI Layer, and Application Layer. Each layer is designed to securely collect, process, and deliver real-world data and AI-powered experiences.
            </p>
          </div>
          <div className="flex flex-col items-center gap-8 md:gap-10 max-w-[90%] md:max-w-[800px] mx-auto">
            {[
              { title: "APPLICATION LAYER", sub: "Applications built on different AI models • AI workflows • User interaction and data visualization • Web, Mobile, and Telegram Bot clients" },
              { title: "AI LAYER", sub: "Custom AI algorithms • AIGC models • Advanced analytics, pattern recognition, prediction, and content generation" },
              { title: "DATA LAYER", sub: "Decentralized vector database • Collection of real-world data from multiple sources • Transformation of raw data into vector representations for AI" }
            ].map((layer, i) => (
              <div key={i} className="relative w-full bg-gradient-to-r from-black/80 via-[rgba(0,20,30,0.9)] to-black/80 border border-[#00F0FF] rounded-lg p-6 md:p-[30px] text-center shadow-[0_10px_30px_rgba(0,240,255,0.15)]">
                {i < 2 && <div className="absolute left-1/2 -bottom-8 md:-bottom-10 w-0.5 h-8 md:h-10 bg-gradient-to-b from-[#00F0FF] to-transparent -translate-x-1/2" />}
                <div className="text-lg md:text-2xl text-[#00F0FF] font-medium tracking-wider mb-1">{layer.title}</div>
                <div className="text-xs md:text-base text-gray-500">{layer.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="py-16 md:py-[100px] px-4">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <span className="block text-[#00F0FF] text-xs md:text-base tracking-[4px] uppercase mb-2 md:mb-2.5">// Tokenomics</span>
            <h2 className="text-3xl md:text-5xl uppercase tracking-wider mb-4 md:mb-5">FXN Tokenomics</h2>
            <div className="text-xl md:text-[32px] text-[#00F0FF] font-medium drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
              Total Supply: 1,000,000,000 FXN
            </div>
          </div>
          <div className="space-y-4 md:space-y-5">
            {[
              { label: "Mining", percent: 40, note: "Distributed over 10 years" },
              { label: "Ecosystem Development", percent: 15, note: "Locked for at least 2 years; vested as needed after 2 years" },
              { label: "Team", percent: 10, note: "2-year cliff, then linear vesting over 12 months" },
              { label: "Investors", percent: 10, note: "1-year cliff, then linear vesting over 12 months" },
              { label: "Foundation Reserve", percent: 10, note: "Locked until needed (e.g. listings, strategic initiatives)" },
              { label: "Liquidity & Market Making", percent: 10, note: "" },
              { label: "Advisors", percent: 3, note: "" },
              { label: "Airdrops", percent: 2, note: "" }
            ].map((t, i) => (
              <div key={i} className="flex flex-col gap-2 p-3 md:p-4 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#00F0FF] hover:bg-[#00F0FF]/5 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all">
                <div className="flex items-center gap-3 md:gap-5">
                  <div className="w-32 md:w-[200px] text-xs md:text-base font-medium">{t.label}</div>
                  <div className="flex-1 h-2 md:h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00F0FF] rounded-full shadow-[0_0_10px_#00F0FF]" style={{ width: `${t.percent}%` }} />
                  </div>
                  <div className="w-12 md:w-20 text-right text-[#00F0FF] font-bold text-xs md:text-base">{t.percent}%</div>
                </div>
                {t.note && <div className="text-xs text-gray-500 pl-32 md:pl-[200px]">{t.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-16 md:py-[100px] px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <span className="block text-[#00F0FF] text-xs md:text-base tracking-[4px] uppercase mb-2 md:mb-2.5">// Timeline</span>
            <h2 className="text-3xl md:text-5xl uppercase tracking-wider mb-4">Roadmap</h2>
            <p className="text-sm md:text-lg text-gray-400 max-w-[800px] mx-auto">
              A clear path from product rebranding to a fully decentralized AI infrastructure and a growing ecosystem.
            </p>
          </div>
          <div className="relative max-w-[90%] md:max-w-[800px] mx-auto">
            <div className="absolute left-5.5 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#00F0FF] to-transparent md:-translate-x-1/2 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
            {[
              { date: "2025 Q4", title: "Rebranding & Funding", desc: "FastXParking rebranded to FastX Network • New product development started • Closed a 3M USD investment round" },
              { date: "2026 Q1", title: "Product Launch & Token Listing", desc: "Product launch with self-built vector database and AI algorithms • Mining node sale • FXN token listing" },
              { date: "2026 Q2", title: "Decentralization Begins", desc: "Release of decentralized vector database • Start of node mining" },
              { date: "2026 Q3", title: "Ecosystem Expansion", desc: "Release of additional AI models • Enrichment of product features and user scenarios" }
            ].map((r, i) => (
              <div key={i} className="relative flex items-center mb-12 md:mb-[60px] pl-12 md:pl-0">
                <div className="absolute left-4 md:left-1/2 w-4 md:w-5 h-4 md:h-5 bg-black border-4 border-[#00F0FF] rounded-full md:-translate-x-1/2 shadow-[0_0_15px_#00F0FF]" />
                <div className={`w-full md:w-[45%] p-5 md:p-6 bg-[rgba(5,10,15,0.8)] border border-[#00F0FF]/30 rounded-xl backdrop-blur-sm hover:-translate-y-1 hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all ${i % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto"}`}>
                  <span className="block text-base md:text-xl text-[#00F0FF] font-medium mb-2">{r.date}</span>
                  <h4 className="text-lg md:text-xl mb-2">{r.title}</h4>
                  <p className="text-xs md:text-base text-gray-300">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-20 border-t border-white/10 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-2xl md:text-3xl mb-3 md:mb-4">Join the FastX Network Community</h3>
            <p className="text-sm md:text-base text-gray-400 max-w-[600px] mx-auto">
              Stay up to date with product releases, mining opportunities, and ecosystem news. Connect with the FastX Network community across our official channels.
            </p>
          </div>
          <div className="flex justify-center gap-4 md:gap-5 mb-8 md:mb-10">
            <a href="https://x.com/FastXNetwork" target="_blank" rel="noopener noreferrer" className="px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base border border-[#00F0FF] rounded hover:bg-[#00F0FF]/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all flex items-center gap-2">
              <i className="ri-twitter-x-line" />
              Follow us on X
            </a>
            <a href="https://t.me/fastXNetwork" target="_blank" rel="noopener noreferrer" className="px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base border border-[#00F0FF] rounded hover:bg-[#00F0FF]/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all flex items-center gap-2">
              <i className="ri-telegram-fill" />
              Join our Telegram
            </a>
          </div>
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold mb-2">FastX Network</div>
            <div className="text-xs md:text-sm text-gray-500 mb-3">AI Infrastructure on a Decentralized Vector Database</div>
            <div className="text-xs md:text-sm text-gray-500 opacity-60">
              © 2025 FastX Network. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <link href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css" rel="stylesheet" />
    </div>
  );
}
