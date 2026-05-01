"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", telephone: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-[#F0F0EE] rounded-full px-6 py-4 text-sm text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#BEF264] transition-all duration-200 border border-transparent";

  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">

        {/* Giant heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(5rem,16vw,14rem)] font-black leading-none tracking-tighter text-black text-center mb-6"
        >
          Contact
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-14 leading-relaxed"
        >
          We'd love to hear from you. Fill out the form below and our team will
          get back to you as soon as possible.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-5"
        >
          {/* Row 1: Name + Telephone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-black px-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-black px-2">
                Telephone
              </label>
              <input
                type="tel"
                name="telephone"
                placeholder="Telephone"
                value={formData.telephone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest uppercase text-black px-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Row 3: Subject */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest uppercase text-black px-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Row 4: Message */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest uppercase text-black px-2">
              Message
            </label>
            <textarea
              name="message"
              placeholder="Hello There!"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-[#F0F0EE] rounded-3xl px-6 py-4 text-sm text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#BEF264] transition-all duration-200 border border-transparent resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center gap-3 mt-2">
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="px-10 py-4 rounded-full bg-[#BEF264] text-black font-bold text-sm hover:bg-[#a8e050] transition-colors duration-200 border border-black/10 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Submit Button"}
            </button>

            {status === "success" && (
              <p className="text-sm text-green-600 font-medium">
                ✓ Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500 font-medium">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}