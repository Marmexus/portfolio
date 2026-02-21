"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  MapPin,
  Send,
} from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
};

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = PERSONAL_INFO.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    // Simulate send delay
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-padding">
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
            Contact
          </span>
          <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Let&apos;s Build{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500 text-sm leading-relaxed">
            Have an enterprise project in mind? I&apos;m open to new
            opportunities and collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Bio card */}
            <div className="glass rounded-2xl border border-white/5 p-6">
              <h3 className="font-heading text-lg font-bold text-white mb-3">
                Get in Touch
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4 text-violet-400" />
                {PERSONAL_INFO.location}
              </div>
            </div>

            {/* Email copy */}
            <div className="glass rounded-2xl border border-white/5 p-6">
              <p className="text-xs text-slate-500 mb-2 uppercase tracking-widest">
                Email
              </p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Mail className="h-4 w-4 text-violet-400 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </div>
                <motion.button
                  onClick={handleCopyEmail}
                  whileTap={{ scale: 0.95 }}
                  className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    copied
                      ? "bg-green-500/20 border border-green-500/30 text-green-400"
                      : "bg-violet-600/20 border border-violet-500/30 text-violet-300 hover:bg-violet-600/30"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Social links */}
            <div className="glass rounded-2xl border border-white/5 p-6">
              <p className="text-xs text-slate-500 mb-4 uppercase tracking-widest">
                Social
              </p>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/5 p-3 text-sm text-slate-400 hover:border-violet-500/30 hover:text-violet-300 hover:bg-violet-500/5 transition-all duration-200 group"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-violet-500/10 transition-colors">
                      {SOCIAL_ICONS[link.icon]}
                    </span>
                    <div>
                      <div className="font-medium text-white text-xs">
                        {link.label}
                      </div>
                      <div className="text-[10px] text-slate-600 truncate">
                        {link.href}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass rounded-2xl border border-white/5 p-6 h-full">
              <h3 className="font-heading text-lg font-bold text-white mb-6">
                Send a Message
              </h3>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-500 uppercase tracking-widest">
                      Name
                    </label>
                    <Input
                      required
                      placeholder="Your name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-500 uppercase tracking-widest">
                      Email
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="your@email.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500 uppercase tracking-widest">
                    Subject
                  </label>
                  <Input
                    required
                    placeholder="Project inquiry, collaboration..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500 uppercase tracking-widest">
                    Message
                  </label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/50 focus:ring-violet-500/20 rounded-xl resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending || sent}
                  className={`mt-2 w-full rounded-xl font-medium transition-all duration-200 ${
                    sent
                      ? "bg-green-600 hover:bg-green-600 text-white"
                      : "bg-violet-600 hover:bg-violet-500 text-white glow-violet"
                  }`}
                >
                  {sent ? (
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Message Sent!
                    </span>
                  ) : sending ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
