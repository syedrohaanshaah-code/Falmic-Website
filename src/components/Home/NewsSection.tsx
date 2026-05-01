"use client";

import { motion } from "framer-motion";

const articles = [
  {
    date: "October 16, 2025",
    category: "Business News",
    title: "How We Transformed a Simple Brief into a Bold Brand Identity",
    src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
  },
  {
    date: "October 16, 2025",
    category: "Business News",
    title: "Design Trends That Will Shape the Creative Industry This Year",
    src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
  },
];

export default function NewsSection() {
  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-tight tracking-tighter text-black text-center mb-12"
        >
          Latest News & Updates
        </motion.h2>

        {/* Two column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group flex flex-col gap-5"
            >
              {/* Image */}
              <div className="rounded-3xl overflow-hidden">
                <img
                  src={article.src}
                  alt={article.title}
                  className="w-full h-[280px] md:h-[320px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>{article.category}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-black text-black leading-tight">
                {article.title}
              </h3>

              {/* CTA */}
              <a
                href="#"
                className="inline-flex items-center w-fit px-6 py-2.5 rounded-full bg-[#BEF264] text-black text-sm font-bold border border-black/10 hover:bg-[#a8e050] transition-colors duration-200"
              >
                View More
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}