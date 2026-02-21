"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Star } from "lucide-react";
import { PROJECTS, SOCIAL_LINKS } from "@/constants";
import { Badge } from "@/components/ui/badge";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const PROJECT_GRADIENTS = [
  "from-violet-900/40 via-violet-800/20 to-transparent",
  "from-cyan-900/40 via-cyan-800/20 to-transparent",
  "from-indigo-900/40 via-indigo-800/20 to-transparent",
  "from-purple-900/40 via-purple-800/20 to-transparent",
];

const PROJECT_ACCENT_COLORS = [
  { border: "rgba(124, 58, 237, 0.6)", glow: "rgba(124, 58, 237, 0.15)" },
  { border: "rgba(6, 182, 212, 0.6)", glow: "rgba(6, 182, 212, 0.15)" },
  { border: "rgba(99, 102, 241, 0.6)", glow: "rgba(99, 102, 241, 0.15)" },
  { border: "rgba(168, 85, 247, 0.6)", glow: "rgba(168, 85, 247, 0.15)" },
];

export default function ProjectsGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding">
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
            Portfolio
          </span>
          <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500 text-sm leading-relaxed">
            Enterprise systems and web applications built for real-world scale
            and performance.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {PROJECTS.map((project, index) => {
            const accent =
              PROJECT_ACCENT_COLORS[index % PROJECT_ACCENT_COLORS.length];
            const gradient =
              PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length];
            const isHovered = hoveredIndex === index;

            return (
              <motion.article
                key={project.title}
                variants={cardVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative overflow-hidden rounded-2xl"
                style={{
                  border: `1px solid ${isHovered ? accent.border : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isHovered
                    ? `0 0 40px ${accent.glow}, 0 0 80px ${accent.glow}`
                    : "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* Card image / gradient header */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${gradient} overflow-hidden`}
                >
                  {/* Project screenshot — hidden on error, gradient shows as fallback */}
                  {project.image && (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      animate={{ scale: isHovered ? 1.05 : 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}

                  {/* Gradient overlay on top of image */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`} />

                  {/* Animated grid overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='0.5'/%3E%3C/svg%3E\")",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Project title overlay — only shown when no image */}
                  {!project.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                      >
                        <div className="font-heading text-4xl font-bold text-white/10 select-none">
                          {project.title.split(" ")[0]}
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-violet-600/80 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      Featured
                    </div>
                  )}

                  {/* Hover arrow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      scale: isHovered ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
                  >
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </motion.div>
                </div>

                {/* Card body */}
                <div className="glass p-6">
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-white/10 text-slate-400 text-[10px] hover:border-violet-500/30 hover:text-violet-300 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 hover:border-violet-500/40 hover:text-violet-300 transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      View Code
                    </a>
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 px-3 py-2 text-xs font-medium text-violet-300 hover:bg-violet-600/30 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live Demo
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/5 px-3 py-2 text-xs font-medium text-slate-600">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Private
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href={SOCIAL_LINKS[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-400 hover:border-violet-500/40 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <Github className="h-4 w-4" />
            View All on GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
