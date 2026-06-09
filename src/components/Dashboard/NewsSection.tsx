"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";

type Data = Record<string, string>;

async function uploadImage(file: File, field: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `news/${field}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("cms-images").upload(path, file, { upsert: true });
  if (error) { console.error(error); return null; }
  const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
  return data.publicUrl;
}

async function saveToDb(payload: Data) {
  const { error } = await supabase.from("news_content").update(payload).eq("id", 1);
  if (error) console.error("Save error:", error);
}

export default function NewsSection() {
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: row, error } = await supabase.from("news_content").select("*").eq("id", 1).single();
    if (error) console.error(error);
    if (row) setData(row);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        {uploading === field ? "Uploading..." : data[field] ? "Replace Image" : "Upload Image"}
        <input type="file" accept="image/*" className="hidden" disabled={!!uploading}
          onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(field, file); }} />
      </label>
      {data[field] && <img src={data[field]} className="w-12 h-12 object-cover rounded-xl border" />}
      {!data[field] && <p className="text-xs text-gray-400">No image uploaded yet</p>}
    </div>
  );

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-black mb-8">News Section</h2>
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-6">

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Main Heading</label>
          <input name="heading" value={data.heading || ""} onChange={handleChange} className={inputClass} placeholder="Latest News & Updates" />
        </div>

        {[1, 2].map((n) => (
          <div key={n} className="border border-gray-100 rounded-xl p-5 flex flex-col gap-3">
            <p className={labelClass}>Article {n}</p>
            <input name={`article_${n}_date`} value={data[`article_${n}_date`] || ""} onChange={handleChange} className={inputClass} placeholder="October 16, 2025" />
            <input name={`article_${n}_category`} value={data[`article_${n}_category`] || ""} onChange={handleChange} className={inputClass} placeholder="Business News" />
            <input name={`article_${n}_title`} value={data[`article_${n}_title`] || ""} onChange={handleChange} className={inputClass} placeholder="Article title..." />
            <input name={`article_${n}_url`} value={data[`article_${n}_url`] || ""} onChange={handleChange} className={inputClass} placeholder="Article link (e.g. /blog/article-1)" />
            <label className={labelClass}>Article Image</label>
            <ImageUploader field={`article_${n}_image_url`} />
          </div>
        ))}

        <button onClick={handleSave} disabled={saving || !!uploading} className="bg-black text-white rounded-xl py-3 font-bold hover:bg-gray-800 transition disabled:opacity-50">
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}