"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  order_index: number;
};

export default function FAQSection() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ question: "", answer: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("faq").select("*").order("order_index");
    setItems(data || []);
    setLoading(false);
  };

  const addItem = async () => {
    if (!newItem.question) return;
    setSaving(true);
    await supabase.from("faq").insert([{ ...newItem, order_index: items.length }]);
    setNewItem({ question: "", answer: "" });
    await fetchItems();
    setSaving(false);
  };

  const updateItem = (id: string, field: string, value: string) => {
    setItems((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const saveItem = async (item: FAQ) => {
    await supabase.from("faq").update(item).eq("id", item.id);
  };

  const deleteItem = async (id: string) => {
    await supabase.from("faq").delete().eq("id", id);
    setItems((prev) => prev.filter((s) => s.id !== id));
  };

  const inputClass = "w-full bg-[#F5F5F3] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#BEF264] border border-transparent";

  return (
    <div>
      <h2 className="text-2xl font-black text-black mb-6">FAQ</h2>

      <div className="flex flex-col gap-4 mb-8">
        {loading ? <p className="text-sm text-gray-400">Loading...</p> :
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-black/10 p-5">
              <div className="flex flex-col gap-3 mb-3">
                <input value={item.question} onChange={(e) => updateItem(item.id, "question", e.target.value)} className={inputClass} placeholder="Question" />
                <textarea value={item.answer} onChange={(e) => updateItem(item.id, "answer", e.target.value)}
                  rows={3} className={inputClass + " resize-none"} placeholder="Answer" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => saveItem(item)} className="px-4 py-2 rounded-full bg-[#BEF264] text-black text-xs font-bold hover:bg-[#a8e050] transition-colors">Save</button>
                <button onClick={() => deleteItem(item.id)} className="px-4 py-2 rounded-full bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors">Delete</button>
              </div>
            </div>
          ))}
      </div>

      <div className="bg-white rounded-2xl border border-dashed border-black/20 p-5">
        <h3 className="text-sm font-black text-black mb-4">Add New FAQ</h3>
        <div className="flex flex-col gap-3 mb-4">
          <input value={newItem.question} onChange={(e) => setNewItem({ ...newItem, question: e.target.value })} className={inputClass} placeholder="Question" />
          <textarea value={newItem.answer} onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })}
            rows={3} className={inputClass + " resize-none"} placeholder="Answer" />
        </div>
        <button onClick={addItem} disabled={saving}
          className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors">
          {saving ? "Adding..." : "+ Add FAQ"}
        </button>
      </div>
    </div>
  );
}