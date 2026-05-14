"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Portfolio = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  project_url: string;
  order_index: number;
};

export default function PortfolioSection() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ title: "", description: "", category: "", image_url: "", project_url: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("portfolio").select("*").order("order_index");
    setItems(data || []);
    setLoading(false);
  };

  const addItem = async () => {
    if (!newItem.title) return;
    setSaving(true);
    await supabase.from("portfolio").insert([{ ...newItem, order_index: items.length }]);
    setNewItem({ title: "", description: "", category: "", image_url: "", project_url: "" });
    await fetchItems();
    setSaving(false);
  };

  const updateItem = async (id: string, field: string, value: string) => {
    setItems((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const saveItem = async (item: Portfolio) => {
    await supabase.from("portfolio").update(item).eq("id", item.id);
  };

  const deleteItem = async (id: string) => {
    await supabase.from("portfolio").delete().eq("id", id);
    setItems((prev) => prev.filter((s) => s.id !== id));
  };

  const inputClass = "w-full bg-[#F5F5F3] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#BEF264] border border-transparent";

  return (
    <div>
      <h2 className="text-2xl font-black text-black mb-6">Portfolio</h2>

      <div className="flex flex-col gap-4 mb-8">
        {loading ? <p className="text-sm text-gray-400">Loading...</p> :
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-black/10 p-5">
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="w-full h-32 object-cover rounded-xl mb-3" />
              )}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input value={item.title} onChange={(e) => updateItem(item.id, "title", e.target.value)} className={inputClass} placeholder="Title" />
                <input value={item.category} onChange={(e) => updateItem(item.id, "category", e.target.value)} className={inputClass} placeholder="Category" />
                <input value={item.image_url} onChange={(e) => updateItem(item.id, "image_url", e.target.value)} className={inputClass} placeholder="Image URL" />
                <input value={item.project_url} onChange={(e) => updateItem(item.id, "project_url", e.target.value)} className={inputClass} placeholder="Project URL" />
              </div>
              <textarea value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)}
                rows={2} className={inputClass + " resize-none mb-3"} placeholder="Description" />
              <div className="flex gap-2">
                <button onClick={() => saveItem(item)} className="px-4 py-2 rounded-full bg-[#BEF264] text-black text-xs font-bold hover:bg-[#a8e050] transition-colors">Save</button>
                <button onClick={() => deleteItem(item.id)} className="px-4 py-2 rounded-full bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors">Delete</button>
              </div>
            </div>
          ))}
      </div>

      <div className="bg-white rounded-2xl border border-dashed border-black/20 p-5">
        <h3 className="text-sm font-black text-black mb-4">Add New Portfolio Item</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} className={inputClass} placeholder="Title" />
          <input value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} className={inputClass} placeholder="Category" />
          <input value={newItem.image_url} onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })} className={inputClass} placeholder="Image URL" />
          <input value={newItem.project_url} onChange={(e) => setNewItem({ ...newItem, project_url: e.target.value })} className={inputClass} placeholder="Project URL" />
        </div>
        <textarea value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          rows={2} className={inputClass + " resize-none mb-3"} placeholder="Description" />
        <button onClick={addItem} disabled={saving}
          className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors">
          {saving ? "Adding..." : "+ Add Item"}
        </button>
      </div>
    </div>
  );
}