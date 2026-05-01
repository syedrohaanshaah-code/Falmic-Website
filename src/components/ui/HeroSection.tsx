"use client";

import { motion } from "framer-motion";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
  },
];

const rotations = ["-6deg", "-2deg", "2deg", "6deg"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const prev = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrent((p) => (p - 1 + images.length) % images.length);
  };

  const next = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrent((p) => (p + 1) % images.length);
  };

  const visibleImages = isMobile
    ? [images[current]]
    : [0, 1, 2, 3].map((offset) => images[(current + offset) % images.length]);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-6 pt-24">

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
          <span className="relative inline-flex items-center">
            <span>Fal</span>

            {/* Embedded tilted image */}
            <motion.div
              initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -8, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="inline-block relative mx-2 md:mx-4 align-middle"
              style={{
                width: "clamp(80px, 10vw, 180px)",
                height: "clamp(80px, 10vw, 180px)",
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

        {/* Facebook */}
        <a href="#" aria-label="Facebook"
          className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>

        {/* X */}
        <a href="#" aria-label="X"
          className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
        >
          <X size={16} />
        </a>

        {/* YouTube */}
        <a href="#" aria-label="YouTube"
          className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
          </svg>
        </a>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="relative w-full max-w-5xl mt-14"
      >
        {/* Cards */}
        <div className={`flex ${isMobile ? "justify-center" : "items-end justify-center gap-4"}`}>
          {visibleImages.map((img, i) => (
            <motion.div
              key={img.src + i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden shadow-xl border-4 border-white flex-shrink-0"
              style={{
                transform: `rotate(${isMobile ? "0deg" : rotations[i]})`,
                transformOrigin: "bottom center",
                width: isMobile ? "90vw" : "calc(25% - 12px)",
                maxWidth: isMobile ? "400px" : "280px",
              }}
            >
              <img
                src={img.src}
                alt={`Agency ${i + 1}`}
                className="w-full object-cover"
                style={{ height: isMobile ? "260px" : "220px" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-6 h-2.5 bg-black"
                    : "w-2.5 h-2.5 bg-black/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>

    </section>
  );
}