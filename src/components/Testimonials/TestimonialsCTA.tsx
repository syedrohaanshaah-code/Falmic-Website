"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestimonialsCTA() {
  const [heading, setHeading] = useState("Ready To Be Our Next Success Story?");
  const [subtext, setSubtext] = useState(
    "Join hundreds of brands that have transformed their identity and grown with Falmic.",
  );
  const [buttonText, setButtonText] = useState("Start Your Project");

  useEffect(() => {
    supabase
      .from("testimonials_page_content")
      .select("cta_heading,cta_subtext,cta_button_text")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data?.cta_heading) setHeading(data.cta_heading);
        if (data?.cta_subtext) setSubtext(data.cta_subtext);
        if (data?.cta_button_text) setButtonText(data.cta_button_text);
      });
  }, []);

  return (
    <section className="bg-[#F5F5F3] px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-black rounded-3xl px-10 md:px-20 py-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <h2
            className="font-black tracking-tighter text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}
          >
            {heading.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <div className="flex flex-col gap-4 items-start md:items-end">
            <p className="text-white/50 text-sm max-w-xs text-left md:text-right leading-relaxed">
              {subtext}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#BEF264] text-black font-bold text-sm hover:bg-[#a8e050] transition-colors duration-200"
            >
              {buttonText} <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
