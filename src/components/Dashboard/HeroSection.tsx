"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HeroSection() {
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from("hero_content").select("*").single();
    if (data) setData(data);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    await supabase.from("hero_content").update(data).eq("id", data.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full bg-[#F5F5F3] rounded-xl px-4 py-3 text-sm text-black outline-none focus:ring-2 focus:ring-[#BEF264] border border-transparent";
  const labelClass = "text-xs font-bold tracking-widest uppercase text-black/50";

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-black">Hero Content</h2>
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-2.5 rounded-full bg-[#BEF264] text-black text-sm font-bold hover:bg-[#a8e050] transition-colors disabled:opacity-50">
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-black/10 p-6 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Heading Part 1</label>
            <input name="heading_1" value={data.heading_1 || ""} onChange={handleChange} className={inputClass} placeholder="Fal" />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Heading Part 2</label>
            <input name="heading_2" value={data.heading_2 || ""} onChange={handleChange} className={inputClass} placeholder="mic" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Subtext</label>
          <textarea name="subtext" value={data.subtext || ""} onChange={handleChange} rows={3} className={inputClass + " resize-none"} />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>CTA Button Text</label>
          <input name="cta_text" value={data.cta_text || ""} onChange={handleChange} className={inputClass} />
        </div>
      </div>
    </div>
  );
}