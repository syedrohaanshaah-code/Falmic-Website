"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";
const textareaClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white resize-none";

type Data = Record<string, string>;

async function saveToDb(payload: Data) {
  const { error } = await supabase.from("workflow_content").update(payload).eq("id", 1);
  if (error) console.error("Save error:", error);
}

export default function WorkflowSection() {
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: row, error } = await supabase.from("workflow_content").select("*").eq("id", 1).single();
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
      <h2 className="text-2xl font-black mb-8">Workflow Section</h2>
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-6">

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Main Heading</label>
          <input name="heading" value={data.heading || ""} onChange={handleChange} className={inputClass} placeholder="Our Creative Workflow" />
        </div>

        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="border border-gray-100 rounded-xl p-5 flex flex-col gap-3">
            <p className={labelClass}>Step {n}</p>
            <input name={`step_${n}_number`} value={data[`step_${n}_number`] || ""} onChange={handleChange} className={inputClass} placeholder={`0${n}`} />
            <input name={`step_${n}_title`} value={data[`step_${n}_title`] || ""} onChange={handleChange} className={inputClass} placeholder="Step title" />
            <textarea name={`step_${n}_description`} value={data[`step_${n}_description`] || ""} onChange={handleChange} className={textareaClass} rows={3} placeholder="Step description..." />
          </div>
        ))}

        <button onClick={handleSave} disabled={saving} className="bg-black text-white rounded-xl py-3 font-bold hover:bg-gray-800 transition disabled:opacity-50">
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}