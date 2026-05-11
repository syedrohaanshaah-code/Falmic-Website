"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jonathan Reed",
    role: "CEO, Brandify",
    quote: "Working with Falmic was a game changer for our brand. The design quality and attention to detail exceeded our expectations completely.",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    size: "large",
    highlight: false,
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, Bloom Studio",
    quote: "Absolutely incredible team. They understood our vision from day one and delivered something beyond what we imagined.",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    size: "small",
    highlight: true,
  },
  {
    name: "Ethan Cole",
    role: "Marketing Director",
    quote: "They don't just design — they think, strategize, and bring ideas to life with clarity and creativity that sets them apart.",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    size: "medium",
    highlight: false,
  },
  {
    name: "Michael Larson",
    role: "Product Lead, Nexus",
    quote: "Professional, fast, and incredibly creative. Our visual identity now feels stronger than ever before.",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    size: "small",
    highlight: false,
  },
  {
    name: "Priya Nair",
    role: "Brand Manager",
    quote: "Falmic transformed our outdated brand into something modern, bold, and instantly recognizable in the market.",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    size: "medium",
    highlight: true,
  },
  {
    name: "James Whitfield",
    role: "Co-Founder, Launchpad",
    quote: "The team's strategic thinking combined with stunning design execution is truly unmatched. Highly recommended.",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    size: "large",
    highlight: false,
  },
];

export default function TestimonialsGrid() {
  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">What They Say</span>
          </div>
          <h2
            className="font-black tracking-tighter text-black"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}
          >
            Words From Our<br />Happy Clients
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`break-inside-avoid rounded-3xl p-6 mb-4 ${
                t.highlight
                  ? "bg-[#BEF264] border border-black/10"
                  : "bg-white border border-black/10"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#000" className="opacity-80">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className={`text-base font-semibold leading-relaxed mb-6 ${t.highlight ? "text-black" : "text-black/80"}`}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.src}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover object-top border-2 border-black/10"
                />
                <div>
                  <p className="text-sm font-black text-black">{t.name}</p>
                  <p className={`text-xs ${t.highlight ? "text-black/60" : "text-gray-400"}`}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}