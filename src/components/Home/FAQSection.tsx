"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { supabase } from "@/lib/supabase";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      const { data } = await supabase.from("faq").select("*").order("order_index");
      if (data && data.length > 0) setFaqs(data);
      else setFaqs([
        { id: "1", question: "How do we start working together?", answer: "Reach out via our contact form or email. We'll schedule a discovery call to understand your brand, goals, and timeline." },
        { id: "2", question: "What services does Falmic offer?", answer: "We offer branding and identity design, website and digital experience design, social media and content design, and creative strategy." },
        { id: "3", question: "How long does a typical project take?", answer: "A brand identity project typically takes 2–4 weeks, while a full website design and development can take 6–12 weeks." },
        { id: "4", question: "Do you work with startups or only established brands?", answer: "We work with both. Whether you're launching a new brand or refreshing an existing one, we deliver results at any stage." },
        { id: "5", question: "What does the design process look like?", answer: "We follow a four step process — Discover, Discuss, Design, and Develop. Every project starts with deep research and ends with a polished deliverable." },
      ]);
    };
    fetchFAQs();
  }, []);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-black">FAQ</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-tight tracking-tighter text-black text-center mb-12"
        >
          Asked Questions
        </motion.h2>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#F5F5F3] rounded-2xl overflow-hidden"
            >
              <button onClick={() => toggle(i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="text-sm md:text-base font-semibold text-black pr-4">{faq.question}</span>
                <div className="shrink-0">
                  {openIndex === i ? <Minus size={18} className="text-[#BEF264]" /> : <Plus size={18} className="text-[#BEF264]" />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}