"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Save } from "lucide-react";

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  project_url: string;
  order_index: number;
};

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";

async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `portfolio/${Date.now()}-${Math.random()}.${ext}`;
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

const empty = (): PortfolioItem => ({
  id: crypto.randomUUID(),
  title: "",
  description: "",
  category: "",
  image_url: "",
  project_url: "",
  order_index: 0,
});

export default function PortfolioCMSSection() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase
      .from("portfolio")
      .select("*")
      .order("order_index")
      .then(({ data }) => {
        if (data && data.length > 0) setItems(data);
      });
  }, []);

  const update = (id: string, field: keyof PortfolioItem, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleImageUpload = async (id: string, file: File) => {
    setUploading(id);
    const url = await uploadImage(file);
    if (url) update(id, "image_url", url);
    setUploading(null);
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      await supabase
        .from("portfolio")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");
      const { error } = await supabase
        .from("portfolio")
        .insert(items.map((item, i) => ({ ...item, order_index: i })));
      if (error) throw error;
      setMsg("✓ Saved successfully!");
    } catch {
      setMsg("✗ Error saving. Try again.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black">Portfolio Items</h2>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit or remove portfolio projects
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

      <div className="flex flex-col gap-6">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black tracking-widest uppercase text-gray-400">
                Project {i + 1}
              </span>
              <button
                onClick={() =>
                  setItems((prev) => prev.filter((x) => x.id !== item.id))
                }
                className="text-red-400 hover:text-red-600 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Title</label>
                <input
                  className={inputClass}
                  value={item.title}
                  onChange={(e) => update(item.id, "title", e.target.value)}
                  placeholder="Project title"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Category</label>
                <input
                  className={inputClass}
                  value={item.category}
                  onChange={(e) => update(item.id, "category", e.target.value)}
                  placeholder="e.g. Design, Strategy"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className={labelClass}>Description</label>
                <input
                  className={inputClass}
                  value={item.description}
                  onChange={(e) =>
                    update(item.id, "description", e.target.value)
                  }
                  placeholder="Short description"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Project URL</label>
                <input
                  className={inputClass}
                  value={item.project_url}
                  onChange={(e) =>
                    update(item.id, "project_url", e.target.value)
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Project Image</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition flex-shrink-0">
                    {uploading === item.id
                      ? "Uploading..."
                      : item.image_url
                        ? "Replace Image"
                        : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading === item.id}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImageUpload(item.id, f);
                      }}
                    />
                  </label>
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      className="w-14 h-10 object-cover rounded-lg border"
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
        ))}
      </div>

      <button
        onClick={() =>
          setItems((prev) => [
            ...prev,
            { ...empty(), order_index: prev.length },
          ])
        }
        className="mt-6 flex items-center gap-2 border-2 border-dashed border-gray-200 hover:border-black text-gray-400 hover:text-black px-6 py-3 rounded-2xl text-sm font-bold transition w-full justify-center"
      >
        <Plus size={16} /> Add New Project
      </button>
    </div>
  );
}
