"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image_url: string;
  highlight: boolean;
};

export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: "", role: "", quote: "", image_url: "", highlight: false });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  const addItem = async () => {
    if (!newItem.name) return;
    setSaving(true);
    await supabase.from("testimonials").insert([newItem]);
    setNewItem({ name: "", role: "", quote: "", image_url: "", highlight: false });
    await fetchItems();
    setSaving(false);
  };

  const deleteItem = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    setItems((prev) => prev.filter((s) => s.id !== id));
  };

  const inputClass = "w-full bg-[#F5F5F3] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#BEF264] border border-transparent";

  return (
    <div>
      <h2 className="text-2xl font-black text-black mb-6">Testimonials</h2>

      <div className="flex flex-col gap-4 mb-8">
        {loading ? <p className="text-sm text-gray-400">Loading...</p> :
          items.map((item) => (
            <div key={item.id} className={`rounded-2xl border p-5 ${item.highlight ? "bg-[#BEF264]/20 border-[#BEF264]" : "bg-white border-black/10"}`}>
              <div className="flex items-center gap-3 mb-2">
                {item.image_url && <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded-full object-cover" />}
                <div>
                  <p className="font-black text-sm text-black">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.role}</p>
                </div>
                {item.highlight && <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full bg-[#BEF264] text-black">Featured</span>}
              </div>
              <p className="text-sm text-gray-600 mb-3">"{item.quote}"</p>
              <button onClick={() => deleteItem(item.id)} className="px-4 py-2 rounded-full bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors">Delete</button>
            </div>
          ))}
      </div>

      <div className="bg-white rounded-2xl border border-dashed border-black/20 p-5">
        <h3 className="text-sm font-black text-black mb-4">Add New Testimonial</h3>
        <div className="flex flex-col gap-3 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className={inputClass} placeholder="Client Name" />
            <input value={newItem.role} onChange={(e) => setNewItem({ ...newItem, role: e.target.value })} className={inputClass} placeholder="Role / Company" />
          </div>
          <input value={newItem.image_url} onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })} className={inputClass} placeholder="Photo URL" />
          <textarea value={newItem.quote} onChange={(e) => setNewItem({ ...newItem, quote: e.target.value })}
            rows={3} className={inputClass + " resize-none"} placeholder="Their testimonial..." />
          <label className="flex items-center gap-2 text-sm font-medium text-black cursor-pointer">
            <input type="checkbox" checked={newItem.highlight} onChange={(e) => setNewItem({ ...newItem, highlight: e.target.checked })} className="accent-[#BEF264] w-4 h-4" />
            Feature this testimonial (lime green highlight)
          </label>
        </div>
        <button onClick={addItem} disabled={saving}
          className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors">
          {saving ? "Adding..." : "+ Add Testimonial"}
        </button>
      </div>
    </div>
  );
}