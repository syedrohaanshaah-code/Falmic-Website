"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-full flex items-center justify-center"
          style={{ minHeight: "260px" }}
        >
          <img
            src="/BG-Toraja.png"
            alt="Contact"
            className="absolute inset-0 w-full h-full object-fill"
          />
          <div className="relative z-10 flex flex-col items-center justify-center w-full py-16 gap-4">
            <h1
              className="font-black tracking-tighter text-black text-center"
              style={{ fontSize: "7rem", lineHeight: 1 }}
            >
              Contact Us
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}