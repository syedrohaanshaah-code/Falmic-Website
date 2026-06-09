"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save } from "lucide-react";

type Data = Record<string, string>;

const defaults: Data = {
  hero_heading: "Contact Us",
  form_label: "Get In Touch",
  form_heading: "Let's Build Something Great Together",
  form_subtext: "Fill out the form below and our team will get back to you within 24 hours.",
};

export default function ContactCMSSection() {
  const [d, setD] = useState<Data>(defaults);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("contact_page_content").select("*").eq("id", 1).single()
      .then(({ data }) => { if (data) setD(data); });
  }, []);

  const set = (key: string, value: string) => setD((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await supabase.from("contact_page_content").upsert({ id: 1, ...d });
    setMsg(error ? "✗ Error saving." : "✓ Saved!");
    setSaving(false);
  };

  const inputClass = "w-full bg-[#F5F5F3] border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black">Contact Page</h2>
          <p className="text-sm text-gray-500 mt-1">Edit hero and form intro text</p>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition disabled:opacity-50">
          <Save size={15} /> {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {msg && <p className={`mb-4 text-sm font-medium ${msg.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}

      <div className="bg-white border border-black/10 rounded-2xl p-6 mb-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-black/40 mb-4">Hero Section</h3>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-black/50">Hero Heading</label>
          <input className={inputClass} value={d.hero_heading} onChange={(e) => set("hero_heading", e.target.value)} />
        </div>
      </div>

      <div className="bg-white border border-black/10 rounded-2xl p-6 mb-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-black/40 mb-4">Form Intro</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-black/50">Label Text</label>
            <input className={inputClass} value={d.form_label} onChange={(e) => set("form_label", e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-black/50">Main Heading</label>
            <input className={inputClass} value={d.form_heading} onChange={(e) => set("form_heading", e.target.value)} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-black/50">Subtext</label>
            <textarea className={inputClass + " resize-none"} rows={2} value={d.form_subtext} onChange={(e) => set("form_subtext", e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}