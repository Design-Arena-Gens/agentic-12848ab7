"use client";

import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 shadow-2xl">
      <div className="absolute inset-y-0 -right-16 hidden h-full w-2/5 translate-x-12 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-teal-400/20 blur-3xl md:block" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-2xl space-y-6"
      >
        <span className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-200">
          Auto-create digital products in seconds
        </span>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Launch signature e-books without the creative bottleneck
        </h1>
        <p className="text-lg text-slate-300 md:text-xl">
          Auto E-Book Forge turns a single idea into a polished digital product
          with positioning, chapter outlines, bonus assets, and launch copy—ready
          to ship on your storefront or inside your next funnel.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-slate-200">
          <span className="rounded-full border border-slate-700 px-3 py-1">
            Adaptive category intelligence
          </span>
          <span className="rounded-full border border-slate-700 px-3 py-1">
            Marketing-ready copy suites
          </span>
          <span className="rounded-full border border-slate-700 px-3 py-1">
            Bonus resource generator
          </span>
        </div>
      </motion.div>
    </section>
  );
};
