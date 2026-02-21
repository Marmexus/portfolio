"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, TrendingUp } from "lucide-react";
import { EXPERIENCE } from "@/constants";
import { Badge } from "@/components/ui/badge";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-padding">
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
            Career
          </span>
          <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            The Enterprise{" "}
            <span className="gradient-text">Core</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500 text-sm leading-relaxed">
            Building mission-critical systems that power real business operations
            at scale.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2"
                  >
                    <div className="h-4 w-4 rounded-full border-2 border-violet-500 bg-[#020617] shadow-[0_0_12px_rgba(124,58,237,0.6)]" />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isLeft ? -40 : 40,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 0.1,
                    }}
                    className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <div className="glass rounded-2xl border border-white/5 p-6 hover:border-violet-500/20 transition-colors duration-300 group">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-heading text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                              {exp.role}
                            </h3>
                            <p className="mt-0.5 text-sm font-semibold text-violet-400">
                              {exp.company}
                            </p>
                          </div>
                          <div className="shrink-0 rounded-lg bg-violet-500/10 border border-violet-500/20 p-2">
                            <TrendingUp className="h-4 w-4 text-violet-400" />
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-4 text-sm text-slate-400 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Metrics */}
                      <ul className="mb-5 space-y-2">
                        {exp.metrics.map((metric, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                            className="flex items-start gap-2 text-sm text-slate-400"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                            {metric}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-white/10 text-slate-400 text-[10px] hover:border-violet-500/30 hover:text-violet-300 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
