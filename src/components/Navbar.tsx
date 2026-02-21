"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      // Only hide/show on mobile (max-width: 768px)
      if (window.innerWidth < 768) {
        if (currentY > lastY && currentY > 60) {
          setHidden(true);
          setMobileOpen(false);
        } else {
          setHidden(false);
        }
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
        animate={{ y: hidden ? "-100%" : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
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

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-slate-900 border-l border-violet-500/30 shadow-2xl shadow-black/60 md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/20 border border-violet-500/30">
                    <Code2 className="h-3.5 w-3.5 text-violet-400" />
                  </div>
                  <span className="font-heading font-semibold text-sm text-white/90">NN</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links */}
              <ul className="flex flex-col gap-1 p-4 flex-1">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <button
                      onClick={() => handleNavClick(href)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                        activeSection === href
                          ? "text-violet-300 bg-violet-600/10 border border-violet-500/20"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <div className="p-4 border-t border-white/5">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="block w-full text-center px-4 py-3 text-sm font-medium text-white rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
