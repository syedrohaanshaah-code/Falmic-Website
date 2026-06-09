"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save } from "lucide-react";

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
};

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
};

export default function ServicesCMSSection() {
  const [d, setD] = useState<Data>(defaults);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("services_content").select("*").eq("id", 1).single()
      .then(({ data }) => { if (data) setD(data); });
  }, []);

  const updateService = (key: keyof Data, field: keyof ServiceItem, value: string) => {
    setD((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as ServiceItem), [field]: value },
    }));
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await supabase.from("services_content").upsert({ id: 1, ...d });
    setMsg(error ? "✗ Error saving." : "✓ Saved!");
    setSaving(false);
  };

  const inputClass = "w-full bg-[#F5F5F3] border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black">Services Page</h2>
          <p className="text-sm text-gray-500 mt-1">Edit hero and all 4 service cards</p>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition disabled:opacity-50">
          <Save size={15} /> {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {msg && <p className={`mb-4 text-sm font-medium ${msg.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}

      {/* Hero */}
      <div className="bg-white border border-black/10 rounded-2xl p-6 mb-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-black/40 mb-4">Hero Section</h3>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-black/50">Hero Heading</label>
          <input className={inputClass} value={d.hero_heading}
            onChange={(e) => setD({ ...d, hero_heading: e.target.value })} />
        </div>
      </div>

      {/* Section heading */}
      <div className="bg-white border border-black/10 rounded-2xl p-6 mb-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-black/40 mb-4">Services List Heading</h3>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-black/50">Heading</label>
          <input className={inputClass} value={d.section_heading}
            onChange={(e) => setD({ ...d, section_heading: e.target.value })} />
        </div>
      </div>

      {/* 4 Service Cards */}
      {(["service_1", "service_2", "service_3", "service_4"] as (keyof Data)[]).map((key, i) => {
        const svc = d[key] as ServiceItem;
        return (
          <div key={key} className="bg-white border border-black/10 rounded-2xl p-6 mb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-black/40 mb-4">Service {i + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Title</label>
                <input className={inputClass} value={svc.title}
                  onChange={(e) => updateService(key, "title", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Projects Badge</label>
                <input className={inputClass} value={svc.projects}
                  onChange={(e) => updateService(key, "projects", e.target.value)} placeholder="40+ PROJECTS" />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Description</label>
                <textarea className={inputClass + " resize-none"} rows={2} value={svc.description}
                  onChange={(e) => updateService(key, "description", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Tags (comma separated)</label>
                <input className={inputClass} value={svc.tags}
                  onChange={(e) => updateService(key, "tags", e.target.value)} placeholder="branding, design, strategy" />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Image URL</label>
                <input className={inputClass} value={svc.image_url}
                  onChange={(e) => updateService(key, "image_url", e.target.value)} placeholder="https://..." />
              </div>
              {svc.image_url && (
                <div className="md:col-span-2">
                  <img src={svc.image_url} alt="preview" className="w-full h-36 object-cover rounded-xl border border-black/10" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}