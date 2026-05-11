"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";

export default function VideoTestimonialCTA() {
  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Video Stories</span>
            </div>
            <h2
              className="font-black tracking-tighter text-black"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05 }}
            >
              See What Our<br />Clients Have<br />To Say
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Don't just take our word for it — hear directly from the brands we've helped transform through bold design and strategic thinking.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 w-fit px-6 py-3 rounded-full bg-[#BEF264] text-black text-sm font-bold hover:bg-[#a8e050] transition-colors duration-200"
            >
              View All Stories
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right — video thumbnail */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
            style={{ height: "400px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
              alt="Video testimonial"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#BEF264] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Play size={28} fill="black" className="ml-1" />
              </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-black text-lg">Watch Client Story</p>
              <p className="text-white/60 text-sm">2:45 min</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}