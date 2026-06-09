"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";
const textareaClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white resize-none";

type Data = Record<string, string>;

async function saveToDb(payload: Data) {
  const { error } = await supabase.from("story_content").update(payload).eq("id", 1);
  if (error) console.error("Save error:", error);
}

export default function StorySection() {
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: row, error } = await supabase.from("story_content").select("*").eq("id", 1).single();
    if (error) console.error(error);
    if (row) setData(row);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const { id, created_at, ...rest } = data as any;
    await saveToDb(rest);
    setSaving(false);
    setSaved(true);
    await fetchData();
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-black mb-8">Story Section</h2>
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-6">

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Main Heading</label>
          <input name="heading" value={data.heading || ""} onChange={handleChange} className={inputClass} placeholder="The Story Behind Our Creativity" />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Card Title</label>
          <input name="card_title" value={data.card_title || ""} onChange={handleChange} className={inputClass} placeholder="Get to Know Us Better" />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Card Description</label>
          <textarea name="card_description" value={data.card_description || ""} onChange={handleChange} className={textareaClass} rows={4} placeholder="We are a passionate team..." />
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className={labelClass + " mb-4"}>Stats</p>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`flex flex-col gap-3 bg-gray-50 rounded-xl p-4 ${n === 2 ? "col-span-2" : ""}`}>
                <p className="text-xs font-bold text-gray-400">Stat {n}</p>
                <input name={`stat_${n}_value`} value={data[`stat_${n}_value`] || ""} onChange={handleChange} className={inputClass} placeholder="564+" />
                <input name={`stat_${n}_label`} value={data[`stat_${n}_label`] || ""} onChange={handleChange} className={inputClass} placeholder="Happy Clients" />
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="bg-black text-white rounded-xl py-3 font-bold hover:bg-gray-800 transition disabled:opacity-50">
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}