import { Code2, Heart } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/20 border border-violet-500/30">
              <Code2 className="h-3.5 w-3.5 text-violet-400" />
            </div>
            <span className="font-heading text-sm font-semibold text-white/70">
              {PERSONAL_INFO.name}
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="flex items-center gap-1.5 text-xs text-slate-700">
            <span>© {currentYear}</span>
            <span className="flex items-center gap-1">
              Created by Nattapong Nantasang
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
