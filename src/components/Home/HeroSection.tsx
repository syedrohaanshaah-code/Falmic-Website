"use client";

import { motion } from "framer-motion";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

const rotations = ["-6deg", "-2deg", "2deg", "6deg"];

type HeroData = {
  label?: string;
  heading_part1?: string;
  heading_part2?: string;
  heading_image_url?: string;
  subtext?: string;
  cta_text?: string;
  cta_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  youtube_url?: string;
  [key: string]: string | undefined;
};

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [heroData, setHeroData] = useState<HeroData>({
    label: "BUSINESS AGENCY",
    heading_part1: "Fal",
    heading_part2: "mic",
    heading_image_url: "",
    subtext: "We shape bold identities and digital experiences that make brands impossible to ignore.",
    cta_text: "Get Started",
    cta_url: "/contact",
    facebook_url: "#",
    twitter_url: "#",
    youtube_url: "#",
  });
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabase.from("hero_content").select("*").single();
      if (data) {
        setHeroData(data);
        // Build carousel array from dynamic fields
        const imgs: string[] = [];
        let i = 1;
        while (data[`carousel_image_${i}`]) {
          imgs.push(data[`carousel_image_${i}`]);
          i++;
        }
        // Fallback to unsplash if no carousel images uploaded yet
        // REPLACE with:
        setCarouselImages(imgs);
      }
    };
    fetchHero();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (carouselImages.length === 0) return;
    autoPlayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [carouselImages]);

  const prev = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrent((p) => (p - 1 + carouselImages.length) % carouselImages.length);
  };

  const next = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrent((p) => (p + 1) % carouselImages.length);
  };

  const visibleImages = isMobile
    ? [carouselImages[current]]
    : [0, 1, 2, 3].map((offset) => carouselImages[(current + offset) % carouselImages.length]);

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
          {heroData.label || "BUSINESS AGENCY"}
        </span>
      </motion.div>

      {/* Giant Heading */}
      <div className="relative flex items-center justify-center w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[clamp(5rem,18vw,17rem)] font-black leading-none tracking-tighter text-black text-center relative z-10 select-none"
        >
          <span className="relative inline-flex items-center">
            <span>{heroData.heading_part1 || "Fal"}</span>
            {heroData.heading_image_url && (
              <motion.div
                initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                animate={{ opacity: 1, rotate: -8, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="inline-block relative mx-2 md:mx-4 align-middle"
                style={{ width: "clamp(80px, 10vw, 180px)", height: "clamp(80px, 10vw, 180px)" }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                  {heroData.heading_image_url && (
                    <img
                      src={heroData.heading_image_url}
                      alt="Hero"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </motion.div>
            )}
            <span>{heroData.heading_part2 || "mic"}</span>
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
        {heroData.subtext}
      </motion.p>

      {/* CTA + Socials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex items-center gap-4 mt-8"
      >
        <a
          href={heroData.cta_url || "/contact"}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#BEF264] text-black text-sm font-bold hover:bg-[#a8e050] transition-colors duration-200"
        >
          {heroData.cta_text || "Get Started"}
          <ArrowRight size={16} />
        </a>

        {/* Facebook */}
        {heroData.facebook_url && heroData.facebook_url !== "#" && (
          <a href={heroData.facebook_url} aria-label="Facebook" target="_blank" rel="noreferrer"
            className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        )}
        {(!heroData.facebook_url || heroData.facebook_url === "#") && (
          <a href="#" aria-label="Facebook"
            className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        )}

        {/* X */}
        <a href={heroData.twitter_url || "#"} aria-label="X" target="_blank" rel="noreferrer"
          className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
        >
          <X size={16} />
        </a>

        {/* YouTube */}
        <a href={heroData.youtube_url || "#"} aria-label="YouTube" target="_blank" rel="noreferrer"
          className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
          </svg>
        </a>
      </motion.div>

      {/* Carousel */}
      {carouselImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="relative w-full max-w-5xl mt-14"
        >
          <div className={`flex ${isMobile ? "justify-center" : "items-end justify-center gap-4"}`}>
            {visibleImages.map((src, i) => (
              src ? (
                <motion.div
                  key={src + i}
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
                    src={src}
                    alt={`Agency ${i + 1}`}
                    className="w-full object-cover"
                    style={{ height: isMobile ? "260px" : "220px" }}
                  />
                </motion.div>
              ) : null
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {carouselImages.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-2.5 bg-black" : "w-2.5 h-2.5 bg-black/20"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

    </section>
  );
}