import { Search } from "lucide-react";
import { headerNav } from "@/data/static";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex shrink-0 items-center">
      <div className="relative mr-2 h-7 w-7 rounded-lg md:mr-3 md:h-8 md:w-8">
        <Image
          src="/logo.jpg"
          alt="PredictMarket"
          className="rounded-lg"
          width={32}
          height={32}
        />
      </div>
      <span className="text-lg font-bold text-white md:text-xl">
        PredictMarket
      </span>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="mx-2 hidden max-w-2xl flex-1 sm:flex md:mx-4">
      <div className="relative w-full">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          placeholder="Search markets"
          className="focus:border-blue-primary focus:ring-blue-primary w-full rounded-lg border border-gray-700 bg-[#0c1d41] py-1.5 pr-4 pl-9 text-sm text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
}

function NavLinks() {
  return (
    <nav className="hidden shrink-0 items-center space-x-4 lg:flex xl:space-x-6">
      {headerNav.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className="hover:text-blue-light text-[12px] whitespace-nowrap text-white transition-colors"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

function ActionButtons() {
  return (
    <div className="flex shrink-0 items-center space-x-2 md:space-x-3">
      <button className="group relative cursor-pointer rounded-lg bg-linear-to-r from-blue-600 to-blue-400 p-px transition-all hover:from-blue-500 hover:to-blue-300">
        <span className="relative flex rounded-[calc(0.5rem-1px)] bg-[#00133c] px-3 py-[0.3125rem] text-xs font-medium whitespace-nowrap text-white md:px-4 md:text-sm">
          Log In
        </span>
      </button>
      <button className="cursor-pointer rounded-lg border bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white transition-all hover:from-blue-500 hover:via-blue-400 hover:to-blue-300 md:px-4 md:text-sm">
        Sign Up
      </button>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-700 bg-[#00133c]">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex h-16 items-center justify-between gap-2 md:gap-4">
          <Logo />
          <SearchBar />
          <NavLinks />
          <ActionButtons />
        </div>
      </div>
    </header>
  );
}
