"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";

type Data = Record<string, string>;

async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `about/hero-bg-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("cms-images").upload(path, file, { upsert: true });
  if (error) { console.error(error); return null; }
  const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
  return data.publicUrl;
}

async function saveToDb(payload: Data) {
  const { error } = await supabase.from("about_hero_content").update(payload).eq("id", 1);
  if (error) console.error("Save error:", error);
}

export default function AboutHeroSection() {
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: row } = await supabase.from("about_hero_content").select("*").eq("id", 1).single();
    if (row) setData(row);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const url = await uploadImage(file);
    if (url) {
      setData((prev) => {
        const updated = { ...prev, background_image_url: url };
        const { id, created_at, ...rest } = updated as any;
        saveToDb(rest);
        return updated;
      });
    }
    setUploading(false);
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
      <h2 className="text-2xl font-black mb-8">About Us — Hero</h2>
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-6">

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Heading</label>
          <input name="heading" value={data.heading || ""} onChange={handleChange} className={inputClass} placeholder="About Us" />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Background Image</label>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition flex-shrink-0">
              {uploading ? "Uploading..." : data.background_image_url ? "Replace Image" : "Upload Image"}
              <input type="file" accept="image/*" className="hidden" disabled={uploading}
                onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file); }} />
            </label>
            {data.background_image_url && (
              <img src={data.background_image_url} className="w-16 h-10 object-cover rounded-lg border" />
            )}
            {!data.background_image_url && <p className="text-xs text-gray-400">No image uploaded yet</p>}
          </div>
        </div>

        <button onClick={handleSave} disabled={saving || uploading}
          className="bg-black text-white rounded-xl py-3 font-bold hover:bg-gray-800 transition disabled:opacity-50">
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}