"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Growth Strategy",
    description: "We develop data-driven growth strategies that help brands scale faster and smarter across every market.",
    tags: ["Content Strategy", "Strategy"],
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    tall: true,
  },
  {
    title: "Web Design",
    description: "We design stunning, high-performance websites that captivate visitors and convert them into loyal customers.",
    tags: ["Web Design", "Website"],
    src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    tall: false,
  },
  {
    title: "Content Creation",
    description: "We produce compelling content that tells your brand story and drives meaningful engagement across all channels.",
    tags: ["Content", "Content Strategy"],
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    tall: true,
    featured: true,
  },
  {
    title: "Market Research",
    description: "We conduct deep market analysis to uncover insights that sharpen your competitive edge and inform bold decisions.",
    tags: ["Analysis", "Market"],
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tall: false,
  },
];

export default function PortfolioSection() {
  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-black">
            Projects
          </span>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* LEFT COLUMN */}
          <div className="flex flex-col">
            {/* Heading + subtext */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10"
            >
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-tight tracking-tighter text-black mb-4">
                Work That<br />Drives Results
              </h2>
              <p className="text-sm text-gray-500 max-w-sm">
                A curated selection of projects where strategy meets design to deliver real, measurable impact.
              </p>
            </motion.div>

            {/* Left projects: Growth Strategy + Content Creation */}
            {[projects[0], projects[2]].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group mb-10"
              >
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-black/80 text-white text-xs font-medium backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Featured arrow */}
                  {project.featured && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-black text-black mb-1">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.description}</p>
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN — offset top */}
          <div className="flex flex-col md:mt-32">
            {/* Right projects: Web Design + Market Research */}
            {[projects[1], projects[3]].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
                className="group mb-10"
              >
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-black/80 text-white text-xs font-medium backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-black text-black mb-1">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.description}</p>
              </motion.div>
            ))}

            {/* View More button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#BEF264] text-black font-bold text-sm hover:bg-[#a8e050] transition-colors duration-200 border border-black/10"
              >
                View More
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}