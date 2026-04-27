"use client";

import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-6"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-black">
          Business Agency
        </span>
      </motion.div>

      {/* Giant Name with embedded image */}
      <div className="relative flex items-center justify-center w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[clamp(5rem,18vw,17rem)] font-black leading-none tracking-tighter text-black text-center relative z-10 select-none"
        >
          {/* Split text with image in between */}
          <span className="relative inline-flex items-center">
            <span>Fal</span>

            {/* Embedded tilted image card */}
            <motion.div
              initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -8, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="inline-block relative mx-2 md:mx-4 align-middle"
              style={{
                width: "clamp(100px, 12vw, 200px)",
                height: "clamp(100px, 12vw, 200px)",
              }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80"
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <span>mic</span>
          </span>
        </motion.h1>
      </div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-center text-gray-500 text-sm md:text-base max-w-xl mt-6 leading-relaxed"
      >
        We shape bold identities and digital experiences that make brands
        impossible to ignore. Trusted by companies worldwide.
      </motion.p>

      {/* CTA + Socials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex items-center gap-4 mt-8"
      >
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#BEF264] text-black text-sm font-bold hover:bg-[#a8e050] transition-colors duration-200"
        >
          Get Started
          <ArrowRight size={16} />
        </a>

        {/* Social Icons */}
        {[{ icon: X, label: "Twitter" }].map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
          >
            <Icon size={16} />
          </a>
        ))}
      </motion.div>

      {/* Bottom image cards row */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="flex items-end justify-center gap-3 md:gap-5 mt-14 w-full max-w-5xl"
      >
        {[
          {
            src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80",
            rotate: "-6deg",
            scale: 0.92,
          },
          {
            src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&q=80",
            rotate: "-2deg",
            scale: 0.96,
          },
          {
            src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
            rotate: "2deg",
            scale: 0.96,
          },
          {
            src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=80",
            rotate: "6deg",
            scale: 0.92,
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04, rotate: "0deg" }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden shadow-xl border-4 border-white flex-1 max-w-[260px]"
            style={{
              transform: `rotate(${card.rotate}) scale(${card.scale})`,
              transformOrigin: "bottom center",
            }}
          >
            <img
              src={card.src}
              alt={`Agency work ${i + 1}`}
              className="w-full h-[180px] md:h-[240px] object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
