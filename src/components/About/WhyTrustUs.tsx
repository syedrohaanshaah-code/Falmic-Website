"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Data = Record<string, string>;

export default function WhyTrustUs() {
  const [d, setD] = useState<Data>({
    heading: "Why Clients Trust Us",
    card_1_title: "Strategic & Purpose Driven Design",
    card_1_description: "We don't just make things look good — we make them work. Every design decision is rooted in strategy, research, and a deep understanding of your audience and goals.",
    card_2_title: "Creative Execution with Precision",
    card_2_description: "We combine bold creative thinking with meticulous attention to detail — delivering work that's not only beautiful but built to perform across every touchpoint.",
    card_3_title: "Collaborative & Transparent Workflow",
    card_3_description: "We work with you, not just for you. From kickoff to delivery, you're involved at every stage — with clear communication and zero surprises.",
    card_3_image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    card_4_title: "Focused on Results, Not Just Aesthetics",
    card_4_description: "Beautiful design means nothing if it doesn't convert. We measure success by the impact our work has on your business — from brand recognition to revenue growth.",
  });

  useEffect(() => {
    supabase.from("why_trust_content").select("*").eq("id", 1).single()
      .then(({ data }) => { if (data) setD(data); });
  }, []);

  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-tight tracking-tighter text-black text-center mb-10">
          {d.heading}
        </motion.h2>

        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-[#F5F5F3] border border-black/15 rounded-3xl px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">{d.card_1_title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed text-right">{d.card_1_description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#F5F5F3] border border-black/15 rounded-3xl px-8 py-8 flex flex-col gap-4">
              <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">{d.card_2_title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{d.card_2_description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#BEF264] rounded-3xl px-8 pt-8 pb-0 flex flex-col gap-4 overflow-hidden">
              <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">{d.card_3_title}</h3>
              <p className="text-sm text-black/60 leading-relaxed">{d.card_3_description}</p>
              {d.card_3_image_url && (
                <div className="mt-2 rounded-2xl overflow-hidden">
                  <img src={d.card_3_image_url} alt="Collaborative workflow" className="w-full h-[200px] object-cover" />
                </div>
              )}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#F5F5F3] border border-black/15 rounded-3xl px-8 py-8 flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">{d.card_4_title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{d.card_4_description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}