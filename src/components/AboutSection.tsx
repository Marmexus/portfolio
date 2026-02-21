"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Layers, Users } from "lucide-react";
import { PERSONAL_INFO } from "@/constants";

const VALUES = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Performance First",
    description:
      "Every system I build is optimized for throughput — from database query plans to frontend bundle sizes.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Enterprise Reliability",
    description:
      "I design for 99.9% uptime with proper error boundaries, retry logic, and graceful degradation.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Clean Architecture",
    description:
      "Modular, testable, and maintainable code that scales with your team and business requirements.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "User-Centric",
    description:
      "Complex backend logic deserves an intuitive frontend. I bridge the gap between systems and people.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-widest uppercase text-violet-400">
              About
            </span>
            <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">
              Engineering at the{" "}
              <span className="gradient-text">Intersection</span>
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
            <p className="mt-4 text-slate-500 leading-relaxed text-sm">
              With {PERSONAL_INFO.yearsOfExperience}+ years focused on enterprise
              software, I&apos;ve developed a deep understanding of what it takes
              to build systems that handle real-world complexity — from
              multi-tenant database schemas to real-time inventory tracking
              pipelines.
            </p>

            {/* Quick facts */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Role", value: PERSONAL_INFO.role },
                { label: "Location", value: PERSONAL_INFO.location },
                { label: "Focus", value: "ERP / WMS Systems" },
                { label: "Status", value: "Open to Work" },
              ].map(({ label, value }) => (
                <div key={label} className="glass rounded-xl border border-white/5 p-3">
                  <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">
                    {label}
                  </div>
                  <div className="text-sm font-medium text-white">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — values grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
                className="glass rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-colors group"
              >
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${value.bg} ${value.color}`}
                >
                  {value.icon}
                </div>
                <h3 className="font-heading text-sm font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {value.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
