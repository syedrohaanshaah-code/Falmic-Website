"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

type CmsData = Record<string, string>;
type DropdownOption = { label: string; value: string };

const defaults: CmsData = {
  form_label: "Get In Touch",
  form_heading: "Let's Build Something Great Together",
  form_subtext:
    "Fill out the form below and our team will get back to you within 24 hours.",
  section_1_title: "Personal Information",
  section_2_title: "Project Details",
  section_3_title: "Additional Information",
  label_full_name: "Full Name",
  label_email: "Email Address",
  label_phone: "Phone Number",
  label_company: "Company / Brand Name",
  label_service: "Service Interested In",
  label_budget: "Project Budget",
  label_timeline: "Project Timeline",
  label_description: "Project Description",
  label_heard_from: "How Did You Hear About Us?",
  label_website: "Your Current Website (if any)",
  label_ref_websites: "Reference Websites / Brands You Like",
  placeholder_full_name: "John Doe",
  placeholder_email: "john@company.com",
  placeholder_phone: "+1 (555) 000-0000",
  placeholder_company: "Your Company",
  placeholder_description:
    "Tell us about your project, goals, target audience...",
  placeholder_ref_websites:
    "Share any websites or brands whose design you admire...",
  submit_button_text: "Submit Your Project",
  success_message: "Message sent! We'll get back to you within 24 hours.",
  privacy_note: "By submitting this form you agree to our privacy policy.",
  service_options: JSON.stringify([
    { label: "Branding & Identity Design", value: "branding" },
    { label: "UI/UX Design", value: "uiux" },
    { label: "Web Development", value: "webdev" },
    { label: "Social Media & Content", value: "social" },
    { label: "Creative Strategy", value: "strategy" },
    { label: "Full Package", value: "all" },
  ]),
  budget_options: JSON.stringify([
    { label: "Under $5,000", value: "under5k" },
    { label: "$5,000 - $10,000", value: "5k-10k" },
    { label: "$10,000 - $25,000", value: "10k-25k" },
    { label: "$25,000 - $50,000", value: "25k-50k" },
    { label: "$50,000+", value: "50k+" },
  ]),
  timeline_options: JSON.stringify([
    { label: "ASAP", value: "asap" },
    { label: "1 - 3 Months", value: "1-3months" },
    { label: "3 - 6 Months", value: "3-6months" },
    { label: "6+ Months", value: "6months+" },
  ]),
  heard_from_options: JSON.stringify([
    { label: "Google Search", value: "google" },
    { label: "Social Media", value: "social" },
    { label: "Referral / Word of Mouth", value: "referral" },
    { label: "Saw Our Portfolio", value: "portfolio" },
    { label: "Other", value: "other" },
  ]),
};

function parseOptions(json: string): DropdownOption[] {
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

export default function ContactForm() {
  const [cms, setCms] = useState<CmsData>(defaults);
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
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    supabase
      .from("contact_page_content")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setCms({ ...defaults, ...data });
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const { error } = await supabase.from("contacts").insert([formData]);
      if (error) throw error;
      setStatus("success");
      setFormData({
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
      setFile(null);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-[#F0F0EE] rounded-2xl px-5 py-4 text-sm text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#BEF264] transition-all duration-200 border border-transparent";
  const selectClass =
    "w-full bg-[#F0F0EE] rounded-2xl px-5 py-4 text-sm text-black outline-none focus:ring-2 focus:ring-[#BEF264] transition-all duration-200 border border-transparent appearance-none cursor-pointer";
  const labelClass =
    "text-xs font-bold tracking-widest uppercase text-black px-1";

  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              {cms.form_label}
            </span>
          </div>
          <h2
            className="font-black tracking-tighter text-black mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.1 }}
          >
            {cms.form_heading}
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            {cms.form_subtext}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col gap-10"
        >
          {/* Section 1 */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-[#BEF264] flex items-center justify-center text-xs font-black">
                01
              </span>
              <h3 className="text-lg font-black text-black">
                {cms.section_1_title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{cms.label_full_name}</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder={cms.placeholder_full_name}
                  value={formData.full_name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{cms.label_email}</label>
                <input
                  type="email"
                  name="email"
                  placeholder={cms.placeholder_email}
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{cms.label_phone}</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={cms.placeholder_phone}
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{cms.label_company}</label>
                <input
                  type="text"
                  name="company"
                  placeholder={cms.placeholder_company}
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-black/10" />

          {/* Section 2 */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-[#BEF264] flex items-center justify-center text-xs font-black">
                02
              </span>
              <h3 className="text-lg font-black text-black">
                {cms.section_2_title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{cms.label_service}</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select a service</option>
                  {parseOptions(cms.service_options).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{cms.label_budget}</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select budget range</option>
                  {parseOptions(cms.budget_options).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{cms.label_timeline}</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select timeline</option>
                  {parseOptions(cms.timeline_options).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>{cms.label_description}</label>
              <textarea
                name="description"
                placeholder={cms.placeholder_description}
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-[#F0F0EE] rounded-2xl px-5 py-4 text-sm text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#BEF264] transition-all duration-200 border border-transparent resize-none"
              />
            </div>
          </div>

          <div className="w-full h-px bg-black/10" />

          {/* Section 3 */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-[#BEF264] flex items-center justify-center text-xs font-black">
                03
              </span>
              <h3 className="text-lg font-black text-black">
                {cms.section_3_title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{cms.label_heard_from}</label>
                <select
                  name="heard_from"
                  value={formData.heard_from}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select an option</option>
                  {parseOptions(cms.heard_from_options).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{cms.label_website}</label>
                <input
                  type="url"
                  name="website"
                  placeholder="https://yourwebsite.com"
                  value={formData.website}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>{cms.label_ref_websites}</label>
              <textarea
                name="ref_websites"
                placeholder={cms.placeholder_ref_websites}
                rows={3}
                value={formData.ref_websites}
                onChange={handleChange}
                className="w-full bg-[#F0F0EE] rounded-2xl px-5 py-4 text-sm text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#BEF264] transition-all duration-200 border border-transparent resize-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Attach Brief / Document (optional)
              </label>
              <label className="w-full bg-[#F0F0EE] rounded-2xl px-5 py-6 border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#BEF264] transition-colors duration-200">
                <Upload size={20} className="text-gray-400" />
                <span className="text-sm text-gray-400">
                  {file ? file.name : "Click to upload PDF, DOC, or image"}
                </span>
                <span className="text-xs text-gray-300">
                  Max file size: 10MB
                </span>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setFile(e.target.files[0]);
                  }}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                />
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
              {status === "loading" ? "Sending..." : cms.submit_button_text}
              <ArrowRight size={16} />
            </button>
            {status === "success" && (
              <p className="text-sm text-green-600 font-medium">
                ✓ {cms.success_message}
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500 font-medium">
                Something went wrong. Please try again.
              </p>
            )}
            <p className="text-xs text-gray-400 text-center max-w-sm">
              {cms.privacy_note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
