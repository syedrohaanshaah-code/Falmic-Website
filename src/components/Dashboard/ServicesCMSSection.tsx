"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Info } from "lucide-react";

type ServiceItem = {
  number: string;
  title: string;
  description: string;
  tags: string;
  image_url: string;
  projects: string;
};

type Data = {
  hero_heading: string;
  section_heading: string;
  service_1: ServiceItem;
  service_2: ServiceItem;
  service_3: ServiceItem;
  service_4: ServiceItem;
  // Contact section
  contact_heading: string;
  contact_subtext: string;
  contact_submit_button: string;
  contact_label_name: string;
  contact_label_telephone: string;
  contact_label_email: string;
  contact_label_subject: string;
  contact_label_message: string;
  contact_placeholder_name: string;
  contact_placeholder_telephone: string;
  contact_placeholder_email: string;
  contact_placeholder_subject: string;
  contact_placeholder_message: string;
  contact_success_message: string;
  contact_formspree_id: string;
};

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";

const defaultService = (num: string, title: string): ServiceItem => ({
  number: num,
  title,
  description: "",
  tags: "digital branding, Content Strategy, market ad, visual identity",
  image_url: "",
  projects: "40+ PROJECTS",
});

const defaults: Data = {
  hero_heading: "Service",
  section_heading: "Services That Elevate Your Brand",
  service_1: defaultService("01", "Brand Strategy"),
  service_2: defaultService("02", "UI/UX Design"),
  service_3: defaultService("03", "Web Development"),
  service_4: defaultService("04", "Creative Strategy & Copywriting"),
  contact_heading: "Contact",
  contact_subtext:
    "We'd love to hear from you. Fill out the form below and our team will get back to you as soon as possible.",
  contact_submit_button: "Submit Button",
  contact_label_name: "Name",
  contact_label_telephone: "Telephone",
  contact_label_email: "Email",
  contact_label_subject: "Subject",
  contact_label_message: "Message",
  contact_placeholder_name: "Name",
  contact_placeholder_telephone: "Telephone",
  contact_placeholder_email: "Email",
  contact_placeholder_subject: "Subject",
  contact_placeholder_message: "Hello There!",
  contact_success_message: "Message sent successfully!",
  contact_formspree_id: "YOUR_FORM_ID",
};

async function uploadImage(file: File, folder: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `services/${folder}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from("cms-images")
    .upload(path, file, { upsert: true });
  if (error) {
    console.error(error);
    return null;
  }
  const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
  return data.publicUrl;
}

export default function ServicesCMSSection() {
  const [d, setD] = useState<Data>(defaults);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase
      .from("services_content")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setD({ ...defaults, ...data });
      });
  }, []);

  const set = (key: keyof Data, value: string) =>
    setD((prev) => ({ ...prev, [key]: value }));

  const updateService = (
    key: keyof Data,
    field: keyof ServiceItem,
    value: string,
  ) => {
    setD((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as ServiceItem), [field]: value },
    }));
  };

  const handleImageUpload = async (key: keyof Data, file: File) => {
    setUploading(key);
    const url = await uploadImage(file, key);
    if (url) updateService(key, "image_url", url);
    setUploading(null);
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await supabase
      .from("services_content")
      .upsert({ id: 1, ...d });
    setMsg(error ? "✗ Error saving." : "✓ Saved!");
    setSaving(false);
  };

  const serviceKeys = [
    "service_1",
    "service_2",
    "service_3",
    "service_4",
  ] as (keyof Data)[];

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
    k: keyof Data;
    textarea?: boolean;
    placeholder?: string;
  }) => (
    <div className="flex flex-col gap-2">
      <label className={labelClass}>{label}</label>
      {textarea ? (
        <textarea
          className={inputClass + " resize-none"}
          rows={2}
          value={String(d[k] || "")}
          placeholder={placeholder}
          onChange={(e) => set(k, e.target.value)}
        />
      ) : (
        <input
          className={inputClass}
          value={String(d[k] || "")}
          placeholder={placeholder}
          onChange={(e) => set(k, e.target.value)}
        />
      )}
    </div>
  );

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black">Services Page</h2>
          <p className="text-sm text-gray-500 mt-1">
            Edit all sections of the services page
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

      {/* Services List */}
      <Block title="Services List Heading">
        <Field label="Heading" k="section_heading" />
      </Block>

      {/* 4 Service Cards */}
      {serviceKeys.map((key, i) => {
        const svc = d[key] as ServiceItem;
        return (
          <div
            key={key}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-4"
          >
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">
              Service {i + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Title</label>
                <input
                  className={inputClass}
                  value={svc.title}
                  onChange={(e) => updateService(key, "title", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Projects Badge</label>
                <input
                  className={inputClass}
                  value={svc.projects}
                  onChange={(e) =>
                    updateService(key, "projects", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  className={inputClass + " resize-none"}
                  rows={2}
                  value={svc.description}
                  onChange={(e) =>
                    updateService(key, "description", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className={labelClass}>Tags (comma separated)</label>
                <input
                  className={inputClass}
                  value={svc.tags}
                  onChange={(e) => updateService(key, "tags", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className={labelClass}>Service Image</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition flex-shrink-0">
                    {uploading === key
                      ? "Uploading..."
                      : svc.image_url
                        ? "Replace Image"
                        : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading === key}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImageUpload(key, f);
                      }}
                    />
                  </label>
                  {svc.image_url ? (
                    <img
                      src={svc.image_url}
                      className="w-20 h-12 object-cover rounded-lg border"
                    />
                  ) : (
                    <p className="text-xs text-gray-400">
                      No image uploaded yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Shared sections notice */}
      <div className="bg-[#BEF264]/20 border border-[#BEF264] rounded-2xl p-5 mb-4 flex items-start gap-3">
        <Info size={16} className="mt-0.5 flex-shrink-0 text-black/60" />
        <div>
          <p className="text-sm font-bold text-black">
            Testimonials & Workflow sections are shared
          </p>
          <p className="text-xs text-black/50 mt-0.5">
            These sections on the Services page pull content from{" "}
            <span className="font-bold">Home → Testimonials</span> and{" "}
            <span className="font-bold">Home → Workflow</span>. Edit them there.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <Block title="Contact Section — Heading & Subtext">
        <Field label="Big Heading" k="contact_heading" />
        <Field label="Subtext" k="contact_subtext" textarea />
      </Block>

      <Block title="Contact Section — Field Labels">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name Label" k="contact_label_name" />
          <Field label="Telephone Label" k="contact_label_telephone" />
          <Field label="Email Label" k="contact_label_email" />
          <Field label="Subject Label" k="contact_label_subject" />
          <Field label="Message Label" k="contact_label_message" />
        </div>
      </Block>

      <Block title="Contact Section — Placeholders">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name Placeholder" k="contact_placeholder_name" />
          <Field
            label="Telephone Placeholder"
            k="contact_placeholder_telephone"
          />
          <Field label="Email Placeholder" k="contact_placeholder_email" />
          <Field label="Subject Placeholder" k="contact_placeholder_subject" />
        </div>
        <Field
          label="Message Placeholder"
          k="contact_placeholder_message"
          textarea
        />
      </Block>

      <Block title="Contact Section — Submit & Messages">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Submit Button Text" k="contact_submit_button" />
          <Field label="Success Message" k="contact_success_message" />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Formspree Form ID</label>
          <input
            className={inputClass}
            value={String(d.contact_formspree_id || "")}
            onChange={(e) => set("contact_formspree_id", e.target.value)}
            placeholder="e.g. xpwzgkdo"
          />
          <p className="text-xs text-gray-400 px-1">
            Get your Form ID from{" "}
            <a
              href="https://formspree.io"
              target="_blank"
              rel="noreferrer"
              className="text-black underline"
            >
              formspree.io
            </a>{" "}
            — replace just the ID part after /f/
          </p>
        </div>
      </Block>
    </div>
  );
}
