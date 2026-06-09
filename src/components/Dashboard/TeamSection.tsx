"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";

type Data = Record<string, string>;

async function uploadImage(file: File, field: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `team/${field}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("cms-images").upload(path, file, { upsert: true });
  if (error) { console.error(error); return null; }
  const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
  return data.publicUrl;
}

async function saveToDb(payload: Data) {
  const { error } = await supabase.from("team_content").update(payload).eq("id", 1);
  if (error) console.error("Save error:", error);
}

export default function TeamSection() {
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: row } = await supabase.from("team_content").select("*").eq("id", 1).single();
    if (row) setData(row);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (field: string, file: File) => {
    setUploading(field);
    const url = await uploadImage(file, field);
    if (url) {
      setData((prev) => {
        const updated = { ...prev, [field]: url };
        const { id, created_at, ...rest } = updated as any;
        saveToDb(rest);
        return updated;
      });
    }
    setUploading(null);
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

  const ImageUploader = ({ field }: { field: string }) => (
    <div className="flex items-center gap-3">
      <label className="cursor-pointer bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition flex-shrink-0">
        {uploading === field ? "Uploading..." : data[field] ? "Replace" : "Upload Photo"}
        <input type="file" accept="image/*" className="hidden" disabled={!!uploading}
          onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(field, file); }} />
      </label>
      {data[field] && <img src={data[field]} className="w-12 h-12 object-cover rounded-xl border" />}
      {!data[field] && <p className="text-xs text-gray-400">No photo yet</p>}
    </div>
  );

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-black mb-8">About Us — Team</h2>
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-6">

        {/* Left side content */}
        <div className="flex flex-col gap-3 border border-gray-100 rounded-xl p-5">
          <p className={labelClass}>Section Content</p>
          <input name="label" value={data.label || ""} onChange={handleChange} className={inputClass} placeholder="Our Team" />
          <input name="heading" value={data.heading || ""} onChange={handleChange} className={inputClass} placeholder="Meet Our Team Now" />
          <textarea name="description" value={data.description || ""} onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white resize-none"
            rows={3} placeholder="We are a passionate group..." />
          <input name="button_text" value={data.button_text || ""} onChange={handleChange} className={inputClass} placeholder="Learn More" />
          <input name="button_url" value={data.button_url || ""} onChange={handleChange} className={inputClass} placeholder="/about" />
        </div>

        {/* Team members */}
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="border border-gray-100 rounded-xl p-5 flex flex-col gap-3">
            <p className={labelClass}>Member {n}</p>
            <input name={`member_${n}_name`} value={data[`member_${n}_name`] || ""} onChange={handleChange} className={inputClass} placeholder="Full Name" />
            <input name={`member_${n}_role`} value={data[`member_${n}_role`] || ""} onChange={handleChange} className={inputClass} placeholder="Role / Title" />
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Photo</label>
            <ImageUploader field={`member_${n}_image_url`} />
          </div>
        ))}

        <button onClick={handleSave} disabled={saving || !!uploading}
          className="bg-black text-white rounded-xl py-3 font-bold hover:bg-gray-800 transition disabled:opacity-50">
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}