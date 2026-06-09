"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type StoryData = {
  heading?: string;
  card_title?: string;
  card_description?: string;
  stat_1_value?: string; stat_1_label?: string;
  stat_2_value?: string; stat_2_label?: string;
  stat_3_value?: string; stat_3_label?: string;
};

export default function StorySection() {
  const [d, setD] = useState<StoryData>({
    heading: "The Story Behind Our Creativity",
    card_title: "Get to Know Us Better",
    card_description: "We are a passionate team of creatives and strategists dedicated to building brands that leave lasting impressions.",
    stat_1_value: "564+", stat_1_label: "Happy Clients",
    stat_2_value: "722K+", stat_2_label: "Company Building",
    stat_3_value: "25+", stat_3_label: "Years Of Experience",
  });

  useEffect(() => {
    supabase.from("story_content").select("*").eq("id", 1).single()
      .then(({ data }) => { if (data) setD(data); });
  }, []);

  const stats = [
    { value: d.stat_1_value, label: d.stat_1_label, icon: true, size: "normal" },
    { value: d.stat_2_value, label: d.stat_2_label, icon: false, size: "large" },
    { value: d.stat_3_value, label: d.stat_3_label, icon: true, size: "normal" },
  ];

  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none tracking-tighter text-black">
            {d.heading}
          </motion.h2>
          <div />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="relative bg-[#BEF264] border border-black/10 rounded-3xl p-8 md:p-10 mb-6 md:w-2/3">
          <h3 className="text-xl md:text-2xl font-black text-black mb-4">{d.card_title}</h3>
          <p className="text-sm md:text-base text-black/70 leading-relaxed max-w-lg">{d.card_description}</p>
          <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </motion.div>

        <div className="w-full h-px bg-black/10 mb-6" />

        <div className="grid grid-cols-3 gap-3 md:gap-4 items-end">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative bg-[#F5F5F3] border border-black/15 rounded-2xl flex flex-col items-center justify-center text-center ${stat.size === "large" ? "py-10 md:py-14" : "py-7 md:py-10"}`}>
              {stat.icon && (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-black flex items-center justify-center mb-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              )}
              <span className={`font-black tracking-tighter text-black leading-none ${stat.size === "large" ? "text-[clamp(2.5rem,7vw,6rem)]" : "text-[clamp(2rem,5vw,4rem)]"}`}>
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-gray-500 mt-2">{stat.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="w-full h-px bg-black/10 mt-6" />
      </div>
    </section>
  );
}