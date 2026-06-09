"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type NewsData = Record<string, string>;

export default function NewsSection() {
  const [d, setD] = useState<NewsData>({
    heading: "Latest News & Updates",
    article_1_date: "October 16, 2025", article_1_category: "Business News",
    article_1_title: "How We Transformed a Simple Brief into a Bold Brand Identity",
    article_1_image_url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    article_1_url: "#",
    article_2_date: "October 16, 2025", article_2_category: "Business News",
    article_2_title: "Design Trends That Will Shape the Creative Industry This Year",
    article_2_image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    article_2_url: "#",
  });

  useEffect(() => {
    supabase.from("news_content").select("*").eq("id", 1).single()
      .then(({ data }) => { if (data) setD(data); });
  }, []);

  const articles = [1, 2].map((n) => ({
    date: d[`article_${n}_date`],
    category: d[`article_${n}_category`],
    title: d[`article_${n}_title`],
    src: d[`article_${n}_image_url`],
    url: d[`article_${n}_url`] || "#",
  }));

  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-tight tracking-tighter text-black text-center mb-12"
        >
          {d.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group flex flex-col gap-5"
            >
              {article.src && (
                <div className="rounded-3xl overflow-hidden">
                  <img src={article.src} alt={article.title}
                    className="w-full h-[280px] md:h-[320px] object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>{article.category}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-black leading-tight">{article.title}</h3>
              <a href={article.url}
                className="inline-flex items-center w-fit px-6 py-2.5 rounded-full bg-[#BEF264] text-black text-sm font-bold border border-black/10 hover:bg-[#a8e050] transition-colors duration-200">
                View More
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}