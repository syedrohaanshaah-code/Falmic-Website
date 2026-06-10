"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { fetchWithCache } from "@/lib/cms-cache";

export default function TestimonialsHero() {
  const [heading, setHeading] = useState("Client Stories");

  useEffect(() => {
    fetchWithCache("testimonials_page", () =>
      new Promise((resolve) => {
        supabase.from("testimonials_page_content").select("*").eq("id", 1).single()
          .then(({ data }) => resolve(data));
      })
    ).then((data: any) => {
      if (data?.hero_heading) setHeading(data.hero_heading);
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
          <img src="/BG-Toraja.png" alt="Testimonials"
            className="absolute inset-0 w-full h-full object-fill" />
          <div className="relative z-10 flex items-center justify-center w-full py-16">
            <h1 className="font-black tracking-tighter text-black text-center"
              style={{ fontSize: "6rem", lineHeight: 1 }}>
              {heading}
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}