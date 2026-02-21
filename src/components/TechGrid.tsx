"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { TECH_STACK } from "@/constants";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const TECH_ICONS: Record<string, string> = {
  NestJS: "🦅",
  "Next.js": "▲",
  PostgreSQL: "🐘",
  TypeScript: "TS",
  Docker: "🐳",
  "Tailwind CSS": "🌊",
  Prisma: "◈",
  Redis: "⚡",
};

const CATEGORY_COLORS: Record<string, string> = {
  Backend: "text-red-400 bg-red-500/10 border-red-500/20",
  Frontend: "text-white bg-white/10 border-white/20",
  Database: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Language: "text-blue-500 bg-blue-600/10 border-blue-600/20",
  DevOps: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  Styling: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
  ORM: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  Cache: "text-orange-400 bg-orange-500/10 border-orange-500/20",
};

export default function TechGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="tech" className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-violet-400">
            Tech Stack
          </span>
          <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Tools of the{" "}
            <span className="gradient-text">Trade</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500 text-sm leading-relaxed">
            The technologies I use to architect enterprise-grade systems and
            deliver performant web experiences.
          </p>
        </motion.div>

        {/* Tech grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-2xl p-5 cursor-default border border-white/5 hover:border-violet-500/30 transition-colors duration-300"
                style={{
                  boxShadow:
                    hoveredIndex === index
                      ? "0 0 30px rgba(124, 58, 237, 0.15), 0 0 60px rgba(124, 58, 237, 0.05)"
                      : "none",
                }}
              >
                {/* Icon */}
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold border"
                  style={{
                    backgroundColor: `${tech.color}15`,
                    borderColor: `${tech.color}30`,
                    color: tech.color,
                  }}
                >
                  {TECH_ICONS[tech.name] || tech.name.slice(0, 2)}
                </div>

                {/* Name */}
                <div className="font-heading text-sm font-semibold text-white">
                  {tech.name}
                </div>

                {/* Category badge */}
                <div
                  className={`mt-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                    CATEGORY_COLORS[tech.category] ||
                    "text-slate-400 bg-slate-500/10 border-slate-500/20"
                  }`}
                >
                  {tech.category}
                </div>
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-1/2 z-20 mb-3 w-56 -translate-x-1/2 rounded-xl bg-slate-900 border border-violet-500/30 p-3 shadow-2xl shadow-black/60"
                  >
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <span className="font-semibold text-white">{tech.name}:</span>{" "}
                      {tech.tooltip}
                    </p>
                    {/* Arrow */}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 rounded-sm bg-slate-900 border-b border-r border-violet-500/30" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-center text-xs text-slate-600"
        >
          Hover over each card to learn how I use it in production
        </motion.p>
      </div>
    </section>
  );
}
