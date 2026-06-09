"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Service = {
  id: string;
  title: string;
  description: string;
  tags: string;
  order_index: number;
};

const fallback = [
  { id: "1", title: "Branding & Identity Design", description: "We craft distinctive brand identities that resonate deeply with your audience — from logos and typography to full visual systems that tell your story.", tags: "", order_index: 0 },
  { id: "2", title: "Website & Digital Experience", description: "We build fast, beautiful, and conversion-focused websites and digital products that elevate your brand presence across every screen and platform.", tags: "", order_index: 1 },
  { id: "3", title: "Social Media & Content Design", description: "We create scroll-stopping content and cohesive social media strategies that grow your audience and keep your brand consistently visible and engaging.", tags: "", order_index: 2 },
  { id: "4", title: "Creative Strategy & Concepting", description: "We develop bold creative concepts and strategic direction that align your brand's voice with its goals — turning ideas into impactful campaigns.", tags: "", order_index: 3 },
];

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>(fallback);
  const [heading, setHeading] = useState("Services That\nElevate Your Brand");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("services")
        .select("*")
        .order("order_index");
      if (data && data.length > 0) setServices(data);
    };
    fetch();
  }, []);

  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-tight tracking-tighter text-black text-center mb-16"
        >
          Services That<br />Elevate Your Brand
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`rounded-3xl p-8 md:p-10 border transition-all duration-300 ${
                i % 2 !== 0
                  ? "bg-[#BEF264] border-black/10"
                  : "bg-transparent border-black/15 hover:border-black/30"
              }`}
            >
              <h3 className="text-xl md:text-2xl font-black text-black mb-4 leading-tight">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-black/60 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}