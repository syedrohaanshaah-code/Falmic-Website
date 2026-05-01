"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We dive deep into your brand, audience, and market to uncover insights that form the foundation of every decision we make together.",
    highlight: false,
    wide: true,
  },
  {
    number: "02",
    title: "Discuss",
    description:
      "We align on goals, timelines, and creative direction through open collaboration — ensuring every stakeholder is heard and every idea is considered.",
    highlight: true,
    wide: true,
  },
  {
    number: "03",
    title: "Design",
    description:
      "We translate strategy into stunning visuals and experiences — crafting every detail with precision, purpose, and a bold creative eye.",
    highlight: false,
    wide: false,
  },
  {
    number: "04",
    title: "Develop",
    description:
      "We bring designs to life with clean, performant code and polished execution — delivering a final product that's built to last and built to impress.",
    highlight: false,
    wide: false,
  },
];

export default function WorkflowSection() {
  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-tight tracking-tighter text-black text-center mb-12"
        >
          Our Creative Workflow
        </motion.h2>

        <div className="flex flex-col gap-4">

          {/* 01 — full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 bg-[#F5F5F3] border border-black/15 rounded-3xl px-6 py-6 md:px-8 md:py-7"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#BEF264] flex items-center justify-center shrink-0">
              <span className="text-xl md:text-2xl font-black text-black">01</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-black text-black mb-1">Discover</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                We dive deep into your brand, audience, and market to uncover insights that form the foundation of every decision we make together.
              </p>
            </div>
            <div className="hidden md:flex w-10 h-10 rounded-full border-2 border-black items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </motion.div>

          {/* 02 — full width, lime green */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6 bg-[#BEF264] border border-black/10 rounded-3xl px-6 py-6 md:px-8 md:py-7"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/60 flex items-center justify-center shrink-0">
              <span className="text-xl md:text-2xl font-black text-black">02</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-black text-black mb-1">Discuss</h3>
              <p className="text-sm text-black/60 leading-relaxed max-w-2xl">
                We align on goals, timelines, and creative direction through open collaboration — ensuring every stakeholder is heard and every idea is considered.
              </p>
            </div>
            <div className="hidden md:flex w-10 h-10 rounded-full border-2 border-black items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </motion.div>

          {/* 03 + 04 — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                number: "03",
                title: "Design",
                description:
                  "We translate strategy into stunning visuals and experiences — crafting every detail with precision, purpose, and a bold creative eye.",
              },
              {
                number: "04",
                title: "Develop",
                description:
                  "We bring designs to life with clean, performant code and polished execution — delivering a final product built to last and impress.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="flex flex-col gap-4 bg-[#F5F5F3] border border-black/15 rounded-3xl px-6 py-7 md:px-8 md:py-8"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#BEF264] flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-black text-black">{step.number}</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-black text-black mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}