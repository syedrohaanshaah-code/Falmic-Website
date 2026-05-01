"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-tight tracking-tighter text-black text-center mb-10"
        >
          What Our Clients Say
        </motion.h2>

        <div className="flex flex-col gap-4">

          {/* ROW 1 — full width card with cutout photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#F5F5F3] border border-black/15 rounded-3xl px-8 py-8 flex items-center justify-between overflow-hidden"
          >
            <div className="max-w-2xl">
              <p className="text-2xl md:text-3xl font-black text-black leading-snug mb-4">
                "Working with this agency was a game changer for our brand. The design quality and attention to detail exceeded our expectations."
              </p>
              <span className="text-sm text-gray-500">Jonathan Reed</span>
            </div>
            {/* Cutout photo — overflows top */}
            <div className="hidden md:block absolute right-12 -top-2 w-[180px] h-[260px]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                alt="Jonathan Reed"
                className="w-full h-full object-cover object-top rounded-2xl"
              />
            </div>
          </motion.div>

          {/* ROW 2 — left card with photo + right lime card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Left: photo + quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#F5F5F3] border border-black/15 rounded-3xl px-6 py-7 flex items-center gap-6"
            >
              <div className="w-[110px] h-[130px] shrink-0 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
                  alt="Ethan Cole"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-lg md:text-xl font-black text-black leading-snug mb-3">
                  "They don't just design they think, strategize, and bring ideas to life with clarity and creativity."
                </p>
                <span className="text-sm text-gray-500">Ethan Cole</span>
              </div>
            </motion.div>

            {/* Right: lime green card with portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-[#BEF264] rounded-3xl px-8 py-7 overflow-hidden flex flex-col justify-end min-h-[220px]"
            >
              {/* Portrait photo top right */}
              <div className="absolute top-0 right-6 w-[150px] h-[200px]">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                  alt="Michael Larson"
                  className="w-full h-full object-cover object-top rounded-b-2xl"
                />
              </div>
              <div className="relative z-10">
                <p className="text-2xl md:text-3xl font-black text-black mb-2">
                  "Professional"
                </p>
                <span className="text-sm text-black/60">Michael Larson</span>
              </div>
            </motion.div>
          </div>

          {/* ROW 3 — quote card + see more card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Left: text quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#F5F5F3] border border-black/15 rounded-3xl px-8 py-8"
            >
              <p className="text-xl md:text-2xl font-black text-black leading-snug mb-4">
                "Fast, professional, and highly creative. Our visual identity now feels stronger."
              </p>
              <span className="text-sm text-gray-500">Jonathan Reed</span>
            </motion.div>

            {/* Right: See more CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-[#BEF264]/30 border border-[#BEF264] rounded-3xl px-8 py-8 overflow-hidden flex flex-col justify-between min-h-[180px]"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-black leading-tight mb-4">
                  See More<br />Client Stories
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors duration-200"
                >
                  View More
                  <ArrowRight size={14} />
                </a>
              </div>

              {/* Decorative 3D spheres bottom right */}
              <div className="absolute bottom-4 right-4 flex items-end gap-2 opacity-60">
                <div className="w-8 h-8 rounded-full bg-white border border-black/10 shadow-md" />
                <div className="w-16 h-16 rounded-full bg-white border border-black/10 shadow-md" />
                <div className="w-10 h-24 rounded-full bg-white border border-black/10 shadow-md" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}