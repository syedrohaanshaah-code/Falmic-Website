"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { fetchWithCache } from "@/lib/cms-cache";

export default function AboutHero() {
  const [data, setData] = useState({ heading: "About Us", background_image_url: "" });

useEffect(() => {
  fetchWithCache("about_hero", () =>
    new Promise((resolve) => {
      supabase.from("about_hero_content").select("*").eq("id", 1).single()
        .then(({ data }) => resolve(data));
    })
  ).then((data: any) => {
    if (data) {
      const cleaned = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== null && v !== "")
      );
      setData((prev) => ({ ...prev, ...cleaned }));
    }
  });
}, []);

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
          {data.background_image_url ? (
            <img src={data.background_image_url} alt="About Us Background"
              className="absolute inset-0 w-full h-full object-fill" />
          ) : (
            <img src="/BG-Toraja.png" alt="About Us Background"
              className="absolute inset-0 w-full h-full object-fill" />
          )}
          <div className="relative z-10 flex items-center justify-center w-full py-16">
            <h1 className="font-black tracking-tighter text-black"
              style={{ fontSize: "8rem", lineHeight: 1 }}>
              {data.heading}
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}