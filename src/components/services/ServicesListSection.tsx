"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ServiceItem = {
  number: string;
  title: string;
  description: string;
  tags: string;
  image_url: string;
  projects: string;
};

const fallback: ServiceItem[] = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "We develop comprehensive brand strategies that position your business for long-term success.",
    tags: "digital branding, Content Strategy, market ad, visual identity",
    image_url:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    projects: "40+ PROJECTS",
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "We craft intuitive, beautiful digital experiences that delight users and drive measurable business results.",
    tags: "digital branding, Content Strategy, market ad, visual identity",
    image_url:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    projects: "40+ PROJECTS",
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "We build fast, scalable, and modern web applications using the latest technologies.",
    tags: "digital branding, Content Strategy, market ad, visual identity",
    image_url:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    projects: "40+ PROJECTS",
  },
  {
    number: "04",
    title: "Creative Strategy & Copywriting",
    description:
      "We develop bold creative concepts and compelling copy that align your brand voice with your goals.",
    tags: "digital branding, Content Strategy, market ad, visual identity",
    image_url:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    projects: "40+ PROJECTS",
  },
];

export default function ServicesListSection() {
  const [heading, setHeading] = useState("Services That\nElevate Your Brand");
  const [services, setServices] = useState<ServiceItem[]>(fallback);

  useEffect(() => {
    supabase
      .from("services_content")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (!data) return;
        if (data.section_heading) setHeading(data.section_heading);
        const list: ServiceItem[] = [];
        for (let n = 1; n <= 4; n++) {
          const svc = data[`service_${n}`];
          if (svc) list.push(typeof svc === "string" ? JSON.parse(svc) : svc);
        }
        if (list.length > 0) setServices(list);
      });
  }, []);

  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-tight tracking-tighter text-black text-center mb-16"
        >
          {heading.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </motion.h2>

        <div className="relative flex flex-col">
          {services.map((service, i) => (
            <div
              key={service.number}
              className="sticky bg-white border border-black/10 rounded-3xl px-8 py-10 shadow-sm"
              style={{
                top: `${80 + i * 20}px`,
                zIndex: i + 1,
                marginBottom: "16px",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-mono text-black/40">
                  [{service.number}]
                </span>
                <span className="text-sm font-mono text-black/40 tracking-widest">
                  [ {service.projects} ]
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="flex flex-col gap-6">
                  <h3 className="text-2xl md:text-4xl font-black text-black leading-tight">
                    {service.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 rounded-full border border-black/20 text-xs text-black/60 font-medium"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-between h-full gap-6">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="w-12 h-12 rounded-full bg-[#BEF264] flex items-center justify-center hover:bg-[#a8e050] transition-colors duration-200"
                    >
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
