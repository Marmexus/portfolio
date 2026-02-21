"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Code2,
  User,
  Cpu,
  Briefcase,
  FolderOpen,
  Mail,
} from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/constants";

const NAV_ICONS: Record<string, React.ElementType> = {
  "#about": User,
  "#tech": Cpu,
  "#experience": Briefcase,
  "#projects": FolderOpen,
  "#contact": Mail,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -60% 0px" }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/20 border border-violet-500/30 group-hover:bg-violet-600/30 transition-colors">
              <Code2 className="h-4 w-4 text-violet-400" />
            </div>
            <span className="font-heading font-semibold text-sm text-white/90 group-hover:text-white transition-colors">
              NN
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeSection === href
                      ? "text-violet-300"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {activeSection === href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-violet-600/10 border border-violet-500/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors border border-violet-500/50"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col bg-slate-900/98 backdrop-blur-xl border-l border-white/10 shadow-2xl shadow-black/60"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/20 border border-violet-500/30 group-hover:bg-violet-600/30 transition-colors">
                    <Code2 className="h-4 w-4 text-violet-400" />
                  </div>
                  <span className="font-semibold text-sm text-white/90">
                    Nattapong N.
                  </span>
                </button>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, href }, index) => {
                    const Icon = NAV_ICONS[href];
                    const isActive = activeSection === href;
                    return (
                      <motion.li
                        key={href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <button
                          onClick={() => handleNavClick(href)}
                          className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                            isActive
                              ? "text-violet-300 bg-violet-600/15 border border-violet-500/25"
                              : "text-slate-400 hover:text-white hover:bg-white/6 border border-transparent"
                          }`}
                        >
                          {/* Active left accent bar */}
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full bg-violet-400" />
                          )}
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 transition-colors ${
                              isActive
                                ? "bg-violet-600/25 text-violet-400"
                                : "bg-white/5 text-slate-500 group-hover:bg-white/10 group-hover:text-slate-300"
                            }`}
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                          </span>
                          <span>{label}</span>
                          {isActive && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                          )}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="px-4 pb-8 pt-4 border-t border-white/8 space-y-3">
                <motion.a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 transition-colors border border-violet-500/50 shadow-lg shadow-violet-900/30"
                >
                  <Mail className="h-4 w-4" />
                  Hire Me
                </motion.a>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-xs text-slate-500 truncate"
                >
                  {PERSONAL_INFO.email}
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
