"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    description: "",
    heard_from: "",
    website: "",
    ref_websites: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const { error } = await supabase.from("contacts").insert([formData]);
      if (error) throw error;
      setStatus("success");
      setFormData({
        full_name: "", email: "", phone: "", company: "",
        service: "", budget: "", timeline: "", description: "",
        heard_from: "", website: "", ref_websites: "",
      });
      setFile(null);
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-[#F0F0EE] rounded-2xl px-5 py-4 text-sm text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#BEF264] transition-all duration-200 border border-transparent";
  const selectClass = "w-full bg-[#F0F0EE] rounded-2xl px-5 py-4 text-sm text-black outline-none focus:ring-2 focus:ring-[#BEF264] transition-all duration-200 border border-transparent appearance-none cursor-pointer";
  const labelClass = "text-xs font-bold tracking-widest uppercase text-black px-1";

  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Get In Touch</span>
          </div>
          <h2
            className="font-black tracking-tighter text-black mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}
          >
            Let's Build Something<br />Great Together
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col gap-10"
        >

          {/* SECTION 1 — Personal Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-[#BEF264] flex items-center justify-center text-xs font-black">01</span>
              <h3 className="text-lg font-black text-black">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Full Name</label>
                <input type="text" name="full_name" placeholder="John Doe" value={formData.full_name} onChange={handleChange} className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Email Address</label>
                <input type="email" name="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Phone Number</label>
                <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Company / Brand Name</label>
                <input type="text" name="company" placeholder="Your Company" value={formData.company} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-black/10" />

          {/* SECTION 2 — Project Details */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-[#BEF264] flex items-center justify-center text-xs font-black">02</span>
              <h3 className="text-lg font-black text-black">Project Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Service Interested In</label>
                <select name="service" value={formData.service} onChange={handleChange} className={selectClass}>
                  <option value="">Select a service</option>
                  <option value="branding">Branding & Identity Design</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="webdev">Web Development</option>
                  <option value="social">Social Media & Content</option>
                  <option value="strategy">Creative Strategy</option>
                  <option value="all">Full Package</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Project Budget</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className={selectClass}>
                  <option value="">Select budget range</option>
                  <option value="under5k">Under $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Project Timeline</label>
                <select name="timeline" value={formData.timeline} onChange={handleChange} className={selectClass}>
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="1-3months">1 - 3 Months</option>
                  <option value="3-6months">3 - 6 Months</option>
                  <option value="6months+">6+ Months</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Project Description</label>
              <textarea name="description" placeholder="Tell us about your project, goals, target audience..." rows={5} value={formData.description} onChange={handleChange} className="w-full bg-[#F0F0EE] rounded-2xl px-5 py-4 text-sm text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#BEF264] transition-all duration-200 border border-transparent resize-none" />
            </div>
          </div>

          <div className="w-full h-px bg-black/10" />

          {/* SECTION 3 — Additional Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-[#BEF264] flex items-center justify-center text-xs font-black">03</span>
              <h3 className="text-lg font-black text-black">Additional Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>How Did You Hear About Us?</label>
                <select name="heard_from" value={formData.heard_from} onChange={handleChange} className={selectClass}>
                  <option value="">Select an option</option>
                  <option value="google">Google Search</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Referral / Word of Mouth</option>
                  <option value="portfolio">Saw Our Portfolio</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Your Current Website (if any)</label>
                <input type="url" name="website" placeholder="https://yourwebsite.com" value={formData.website} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Reference Websites / Brands You Like</label>
              <textarea name="ref_websites" placeholder="Share any websites or brands whose design you admire..." rows={3} value={formData.ref_websites} onChange={handleChange} className="w-full bg-[#F0F0EE] rounded-2xl px-5 py-4 text-sm text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#BEF264] transition-all duration-200 border border-transparent resize-none" />
            </div>

            {/* File upload */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Attach Brief / Document (optional)</label>
              <label className="w-full bg-[#F0F0EE] rounded-2xl px-5 py-6 border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#BEF264] transition-colors duration-200">
                <Upload size={20} className="text-gray-400" />
                <span className="text-sm text-gray-400">{file ? file.name : "Click to upload PDF, DOC, or image"}</span>
                <span className="text-xs text-gray-300">Max file size: 10MB</span>
                <input type="file" onChange={handleFile} className="hidden" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-12 py-4 rounded-full bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Submit Your Project"}
              <ArrowRight size={16} />
            </button>

            {status === "success" && (
              <p className="text-sm text-green-600 font-medium">
                ✓ Message sent! We'll get back to you within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500 font-medium">
                Something went wrong. Please try again.
              </p>
            )}
            <p className="text-xs text-gray-400 text-center max-w-sm">
              By submitting this form you agree to our privacy policy.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}