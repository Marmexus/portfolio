"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/constants";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 80 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 80 });

  const gradient1X = useTransform(springX, [0, 1], ["-10%", "10%"]);
  const gradient1Y = useTransform(springY, [0, 1], ["-10%", "10%"]);
  const gradient2X = useTransform(springX, [0, 1], ["10%", "-10%"]);
  const gradient2Y = useTransform(springY, [0, 1], ["10%", "-10%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleScrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            x: gradient1X,
            y: gradient1Y,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            x: gradient2X,
            y: gradient2Y,
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 blur-[160px] bg-violet-500" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-32 text-center"
      >
        {/* Badge
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-violet-300 border border-violet-500/30 bg-violet-500/10">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            Available for new opportunities
          </span>
        </motion.div> */}

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {PERSONAL_INFO.name.split(" ").map((word, i) => (
            <span key={i} className={i === 1 ? "gradient-text block" : "block"}>
              {word}
            </span>
          ))}
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-xl font-medium text-slate-400 sm:text-2xl"
        >
          <span className="text-slate-500">Building the backbone of </span>
          <TypeAnimation
            sequence={[
              "Modern Web Apps.",
              2000,
              "Landing Pages.",
              2000,
              "REST APIs.",
              2000,
              "Full Stack Solutions.",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="gradient-text font-semibold"
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-500 leading-relaxed sm:text-lg"
        >
          {PERSONAL_INFO.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleScrollToProjects}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-medium text-sm hover:bg-violet-500 transition-all duration-200 glow-violet"
          >
            View My Work
            <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <a
            href={PERSONAL_INFO.cvUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-medium text-sm hover:border-violet-500/50 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a
            href={SOCIAL_LINKS[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL_LINKS[1].href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-xs text-slate-600">
            {PERSONAL_INFO.location}
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: "2+", label: "Years Experience" },
            { value: "2+", label: "Production Apps Shipped" },
            { value: "Full Stack", label: "Frontend & Backend" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-heading text-3xl font-bold gradient-text">
                {value}
              </div>
              <div className="mt-1 text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
