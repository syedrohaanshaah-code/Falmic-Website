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
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("portfolio").select("*").order("order_index")
      .then(({ data }) => { if (data && data.length > 0) setItems(data); });
  }, []);

  const update = (id: string, field: keyof PortfolioItem, value: string) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems((prev) => [...prev, { ...empty(), order_index: prev.length }]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      await supabase.from("portfolio").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      const { error } = await supabase.from("portfolio").insert(
        items.map((item, i) => ({ ...item, order_index: i }))
      );
      if (error) throw error;
      setMsg("✓ Saved successfully!");
    } catch {
      setMsg("✗ Error saving. Try again.");
    }
    setSaving(false);
  };

  const inputClass = "w-full bg-[#F5F5F3] border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black">Portfolio Items</h2>
          <p className="text-sm text-gray-500 mt-1">Add, edit or remove portfolio projects</p>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition disabled:opacity-50">
          <Save size={15} /> {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {msg && <p className={`mb-4 text-sm font-medium ${msg.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}

      <div className="flex flex-col gap-6">
        {items.map((item, i) => (
          <div key={item.id} className="bg-white border border-black/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black tracking-widest uppercase text-black/40">Project {i + 1}</span>
              <button onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-600 transition">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Title</label>
                <input className={inputClass} value={item.title}
                  onChange={(e) => update(item.id, "title", e.target.value)} placeholder="Project title" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Category</label>
                <input className={inputClass} value={item.category}
                  onChange={(e) => update(item.id, "category", e.target.value)} placeholder="e.g. Design, Strategy" />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Description</label>
                <input className={inputClass} value={item.description}
                  onChange={(e) => update(item.id, "description", e.target.value)} placeholder="Short description" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Image URL</label>
                <input className={inputClass} value={item.image_url}
                  onChange={(e) => update(item.id, "image_url", e.target.value)} placeholder="https://..." />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-black/50">Project URL</label>
                <input className={inputClass} value={item.project_url}
                  onChange={(e) => update(item.id, "project_url", e.target.value)} placeholder="https://..." />
              </div>
              {item.image_url && (
                <div className="md:col-span-2">
                  <img src={item.image_url} alt="preview"
                    className="w-full h-40 object-cover rounded-xl border border-black/10" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem}
        className="mt-6 flex items-center gap-2 border-2 border-dashed border-black/20 hover:border-black/40 text-black/40 hover:text-black px-6 py-3 rounded-2xl text-sm font-bold transition w-full justify-center">
        <Plus size={16} /> Add New Project
      </button>
    </div>
  );
}