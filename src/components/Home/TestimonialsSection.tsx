"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fetchWithCache } from "@/lib/cms-cache";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image_url: string;
  rating: number;
};

const fallback: Testimonial[] = [
  { id: "1", name: "Jonathan Reed", role: "CEO, Brandify", quote: "Working with Falmic was a game changer for our brand. The design quality and attention to detail exceeded our expectations completely.", image_url: "https://i.pravatar.cc/150?img=11", rating: 5 },
  { id: "2", name: "Ethan Cole", role: "Marketing Director", quote: "They don't just design — they think, strategize, and bring ideas to life with clarity and creativity that sets them apart.", image_url: "https://i.pravatar.cc/150?img=12", rating: 5 },
  { id: "3", name: "Priya Nair", role: "Brand Manager", quote: "Falmic transformed our outdated brand into something modern, bold, and instantly recognizable in the market.", image_url: "https://i.pravatar.cc/150?img=13", rating: 5 },
  { id: "4", name: "Sarah Mitchell", role: "Founder, Bloom Studio", quote: "Absolutely incredible team. They understood our vision from day one and delivered something beyond what we imagined.", image_url: "https://i.pravatar.cc/150?img=14", rating: 5 },
  { id: "5", name: "Michael Larson", role: "Product Lead, Nexus", quote: "Professional, fast, and incredibly creative. Our visual identity now feels stronger than ever before.", image_url: "https://i.pravatar.cc/150?img=15", rating: 5 },
  { id: "6", name: "James Whitfield", role: "Co-Founder, Launchpad", quote: "The team's strategic thinking combined with stunning design execution is truly unmatched. Highly recommended.", image_url: "https://i.pravatar.cc/150?img=16", rating: 5 },
];

const highlightIndices = [2, 3];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallback);

  useEffect(() => {
    fetchWithCache("testimonials_home", () =>
      new Promise((resolve) => {
        supabase.from("testimonials").select("*").order("created_at")
          .then(({ data }) => resolve(data));
      })
    ).then((data: any) => {
      if (data && data.length > 0) setTestimonials(data);
    });
  }, []);

  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">What They Say</span>
        </div>
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tighter text-black text-center mb-14 leading-tight">
          Words From Our<br />Happy Clients
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const isLime = highlightIndices.includes(i);
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: isLime
                    ? "0 16px 40px rgba(190,242,100,0.5)"
                    : "0 16px 40px rgba(0,0,0,0.10)",
                }}
                className={`rounded-2xl p-6 flex flex-col justify-between gap-6 cursor-pointer transition-colors duration-300 ${isLime ? "bg-[#BEF264]" : "bg-white"
                  }`}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating || 5 }).map((_, s) => (
                    <span key={s} className="text-black text-base">★</span>
                  ))}
                  {Array.from({ length: 5 - (t.rating || 5) }).map((_, s) => (
                    <span key={s} className="text-black/20 text-base">★</span>
                  ))}
                </div>
                <p className={`text-sm leading-relaxed flex-1 ${isLime ? "text-black" : "text-gray-700"}`}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.image_url} alt={t.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-black">{t.name}</p>
                    <p className="text-xs text-black/60">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}