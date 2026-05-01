"use client";

import { motion } from "framer-motion";

export default function WhyTrustUs() {
  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-tight tracking-tighter text-black text-center mb-10"
        >
          Why Clients Trust Us
        </motion.h2>

        <div className="flex flex-col gap-4">

          {/* ROW 1 — full width, title left, text right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#F5F5F3] border border-black/15 rounded-3xl px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
          >
            <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
              Strategic & Purpose<br />Driven Design
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed text-right">
              We don't just make things look good — we make them work. Every design decision is rooted in strategy, research, and a deep understanding of your audience and goals.
            </p>
          </motion.div>

          {/* ROW 2 — left card + right lime card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#F5F5F3] border border-black/15 rounded-3xl px-8 py-8 flex flex-col gap-4"
            >
              <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
                Creative Execution<br />with Precision
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We combine bold creative thinking with meticulous attention to detail — delivering work that's not only beautiful but built to perform across every touchpoint.
              </p>
            </motion.div>

            {/* Right — lime green with image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#BEF264] rounded-3xl px-8 pt-8 pb-0 flex flex-col gap-4 overflow-hidden"
            >
              <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
                Collaborative &<br />Transparent Workflow
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                We work with you, not just for you. From kickoff to delivery, you're involved at every stage — with clear communication and zero surprises.
              </p>

              {/* Image */}
              <div className="mt-2 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
                  alt="Collaborative workflow"
                  className="w-full h-[200px] object-cover"
                />
              </div>
            </motion.div>

          </div>

          {/* ROW 3 — full width bottom card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#F5F5F3] border border-black/15 rounded-3xl px-8 py-8 flex flex-col gap-4"
          >
            <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
              Focused on Results,<br />Not Just Aesthetics
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
              Beautiful design means nothing if it doesn't convert. We measure success by the impact our work has on your business — from brand recognition to revenue growth.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}