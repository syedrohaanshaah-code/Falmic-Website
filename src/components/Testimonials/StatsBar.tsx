"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const fallback = [
  { value: "564+", label: "Happy Clients" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "722K+", label: "Projects Delivered" },
  { value: "25+", label: "Years Experience" },
];

export default function StatsBar() {
  const [stats, setStats] = useState(fallback);

  useEffect(() => {
    supabase
      .from("testimonials_page_content")
      .select(
        "stat_1_value,stat_1_label,stat_2_value,stat_2_label,stat_3_value,stat_3_label,stat_4_value,stat_4_label",
      )
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) {
          setStats([
            {
              value: data.stat_1_value || fallback[0].value,
              label: data.stat_1_label || fallback[0].label,
            },
            {
              value: data.stat_2_value || fallback[1].value,
              label: data.stat_2_label || fallback[1].label,
            },
            {
              value: data.stat_3_value || fallback[2].value,
              label: data.stat_3_label || fallback[2].label,
            },
            {
              value: data.stat_4_value || fallback[3].value,
              label: data.stat_4_label || fallback[3].label,
            },
          ]);
        }
      });
  }, []);

  return (
    <section className="bg-black px-6 md:px-16 lg:px-24 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-1"
            >
              <span
                className="font-black tracking-tighter text-[#BEF264]"
                style={{ fontSize: "3rem", lineHeight: 1 }}
              >
                {stat.value}
              </span>
              <span className="text-sm text-white/50 font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
