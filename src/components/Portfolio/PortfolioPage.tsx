"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  project_url: string;
};

const fallback = [
  { id: "1", title: "Growth Strategy", description: "Data-driven growth strategies.", category: "Strategy", image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", project_url: "#" },
  { id: "2", title: "Web Design", description: "Stunning high-performance websites.", category: "Design", image_url: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80", project_url: "#" },
  { id: "3", title: "Content Creation", description: "Compelling content that tells your story.", category: "Content", image_url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", project_url: "#" },
  { id: "4", title: "Market Research", description: "Deep market analysis for competitive edge.", category: "Research", image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", project_url: "#" },
];

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase.from("portfolio").select("*").order("order_index");
      const list = data && data.length > 0 ? data : fallback;
      setItems(list);
      const cats = ["All", ...Array.from(new Set(list.map((i) => i.category).filter(Boolean)))];
      setCategories(cats);
    };
    fetchItems();
  }, []);

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div className="bg-[#F5F5F3] min-h-screen">

      {/* Hero */}
      <section className="px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative w-full flex items-center justify-center"
            style={{ minHeight: "260px" }}
          >
            <img src="/BG-Toraja.png" alt="Portfolio" className="absolute inset-0 w-full h-full object-fill" />
            <div className="relative z-10 flex items-center justify-center w-full py-16">
              <h1 className="font-black tracking-tighter text-black text-center" style={{ fontSize: "7rem", lineHeight: 1 }}>
                Portfolio
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="px-6 md:px-16 lg:px-24 pb-24">
        <div className="max-w-7xl mx-auto">

          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Our Work</span>
          </div>

          {/* Heading */}
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black tracking-tighter text-black mb-8">
            Work That Drives Results
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                  filter === cat ? "bg-black text-white" : "bg-white text-black border border-black/10 hover:border-black/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/80 text-white text-xs font-medium">{item.category}</span>
                  </div>
                  {/* Hover arrow */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={item.project_url || "#"} target="_blank" rel="noreferrer"
                      className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-[#BEF264] transition-colors">
                      <ArrowUpRight size={20} />
                    </a>
                  </div>
                </div>
                <h3 className="text-xl font-black text-black mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}