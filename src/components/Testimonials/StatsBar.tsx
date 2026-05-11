"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "564+", label: "Happy Clients" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "722K+", label: "Projects Delivered" },
  { value: "25+", label: "Years Experience" },
];

export default function StatsBar() {
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
              <span className="text-sm text-white/50 font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}