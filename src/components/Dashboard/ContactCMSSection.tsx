"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Plus, Trash2 } from "lucide-react";

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";

type DropdownOption = { label: string; value: string };

type ContactData = {
  // Hero
  hero_heading: string;
  // Form intro
  form_label: string;
  form_heading: string;
  form_subtext: string;
  // Section titles
  section_1_title: string;
  section_2_title: string;
  section_3_title: string;
  // Field labels
  label_full_name: string;
  label_email: string;
  label_phone: string;
  label_company: string;
  label_service: string;
  label_budget: string;
  label_timeline: string;
  label_description: string;
  label_heard_from: string;
  label_website: string;
  label_ref_websites: string;
  // Placeholders
  placeholder_full_name: string;
  placeholder_email: string;
  placeholder_phone: string;
  placeholder_company: string;
  placeholder_description: string;
  placeholder_ref_websites: string;
  // Submit
  submit_button_text: string;
  response_time_text: string;
  success_message: string;
  privacy_note: string;
  // Dropdown options (stored as JSON strings)
  service_options: string;
  budget_options: string;
  timeline_options: string;
  heard_from_options: string;
};

const defaults: ContactData = {
  hero_heading: "Contact Us",
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
  response_time_text: "within 24 hours",
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

// Dropdown options editor component
function OptionsEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [options, setOptions] = useState<DropdownOption[]>([]);

  useEffect(() => {
    try {
      setOptions(JSON.parse(value));
    } catch {
      setOptions([]);
    }
  }, [value]);

  const update = (index: number, field: keyof DropdownOption, val: string) => {
    const updated = options.map((o, i) =>
      i === index ? { ...o, [field]: val } : o,
    );
    setOptions(updated);
    onChange(JSON.stringify(updated));
  };

  const add = () => {
    const updated = [...options, { label: "", value: "" }];
    setOptions(updated);
    onChange(JSON.stringify(updated));
  };

  const remove = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
    onChange(JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className={labelClass}>{label}</label>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className={inputClass}
              placeholder="Display label"
              value={opt.label}
              onChange={(e) => update(i, "label", e.target.value)}
            />
            <input
              className={inputClass + " max-w-[140px]"}
              placeholder="value"
              value={opt.value}
              onChange={(e) => update(i, "value", e.target.value)}
            />
            <button
              onClick={() => remove(i)}
              className="text-red-400 hover:text-red-600 transition flex-shrink-0"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button
          onClick={add}
          className="flex items-center gap-1 text-xs font-bold text-black/40 hover:text-black transition border border-dashed border-gray-200 hover:border-black rounded-xl px-4 py-2 w-fit"
        >
          <Plus size={13} /> Add Option
        </button>
      </div>
    </div>
  );
}

export default function ContactCMSSection() {
  const [d, setD] = useState<ContactData>(defaults);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase
      .from("contact_page_content")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setD({ ...defaults, ...data });
      });
  }, []);

  const set = (key: keyof ContactData, value: string) =>
    setD((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await supabase
      .from("contact_page_content")
      .upsert({ id: 1, ...d });
    setMsg(error ? "✗ Error saving." : "✓ Saved!");
    setSaving(false);
  };

  const Block = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-4">
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">
        {title}
      </h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );

  const Field = ({
    label,
    k,
    textarea,
    placeholder,
  }: {
    label: string;
    k: keyof ContactData;
    textarea?: boolean;
    placeholder?: string;
  }) => (
    <div className="flex flex-col gap-2">
      <label className={labelClass}>{label}</label>
      {textarea ? (
        <textarea
          className={inputClass + " resize-none"}
          rows={2}
          value={d[k] || ""}
          placeholder={placeholder}
          onChange={(e) => set(k, e.target.value)}
        />
      ) : (
        <input
          className={inputClass}
          value={d[k] || ""}
          placeholder={placeholder}
          onChange={(e) => set(k, e.target.value)}
        />
      )}
    </div>
  );

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black">Contact Page</h2>
          <p className="text-sm text-gray-500 mt-1">
            Full control over the contact page content and form
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition disabled:opacity-50"
        >
          <Save size={15} /> {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {msg && (
        <p
          className={`mb-4 text-sm font-medium ${msg.startsWith("✓") ? "text-green-600" : "text-red-500"}`}
        >
          {msg}
        </p>
      )}

      {/* Hero */}
      <Block title="Hero Section">
        <Field label="Hero Heading" k="hero_heading" />
      </Block>

      {/* Form Intro */}
      <Block title="Form Intro">
        <Field label="Label Text" k="form_label" />
        <Field label="Main Heading" k="form_heading" />
        <Field label="Subtext" k="form_subtext" textarea />
      </Block>

      {/* Section Titles */}
      <Block title="Section Titles">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Section 1 Title" k="section_1_title" />
          <Field label="Section 2 Title" k="section_2_title" />
          <Field label="Section 3 Title" k="section_3_title" />
        </div>
      </Block>

      {/* Field Labels */}
      <Block title="Field Labels">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name Label" k="label_full_name" />
          <Field label="Email Label" k="label_email" />
          <Field label="Phone Label" k="label_phone" />
          <Field label="Company Label" k="label_company" />
          <Field label="Service Label" k="label_service" />
          <Field label="Budget Label" k="label_budget" />
          <Field label="Timeline Label" k="label_timeline" />
          <Field label="Description Label" k="label_description" />
          <Field label="Heard From Label" k="label_heard_from" />
          <Field label="Website Label" k="label_website" />
          <Field label="Ref Websites Label" k="label_ref_websites" />
        </div>
      </Block>

      {/* Placeholders */}
      <Block title="Field Placeholders">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name Placeholder" k="placeholder_full_name" />
          <Field label="Email Placeholder" k="placeholder_email" />
          <Field label="Phone Placeholder" k="placeholder_phone" />
          <Field label="Company Placeholder" k="placeholder_company" />
        </div>
        <Field
          label="Description Placeholder"
          k="placeholder_description"
          textarea
        />
        <Field
          label="Ref Websites Placeholder"
          k="placeholder_ref_websites"
          textarea
        />
      </Block>

      {/* Submit & Messages */}
      <Block title="Submit Button & Messages">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Submit Button Text" k="submit_button_text" />
          <Field
            label="Response Time Text"
            k="response_time_text"
            placeholder="within 24 hours"
          />
        </div>
        <Field label="Success Message" k="success_message" />
        <Field label="Privacy Note" k="privacy_note" />
      </Block>

      {/* Dropdown Options */}
      <Block title="Service Dropdown Options">
        <OptionsEditor
          label="Services List"
          value={d.service_options}
          onChange={(v) => set("service_options", v)}
        />
      </Block>

      <Block title="Budget Dropdown Options">
        <OptionsEditor
          label="Budget Ranges"
          value={d.budget_options}
          onChange={(v) => set("budget_options", v)}
        />
      </Block>

      <Block title="Timeline Dropdown Options">
        <OptionsEditor
          label="Timeline Options"
          value={d.timeline_options}
          onChange={(v) => set("timeline_options", v)}
        />
      </Block>

      <Block title='"How Did You Hear About Us" Options'>
        <OptionsEditor
          label="Options List"
          value={d.heard_from_options}
          onChange={(v) => set("heard_from_options", v)}
        />
      </Block>
    </div>
  );
}
