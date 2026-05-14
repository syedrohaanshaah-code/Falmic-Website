"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Service = {
  id: string;
  title: string;
  description: string;
  tags: string;
  order_index: number;
};

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [newService, setNewService] = useState({ title: "", description: "", tags: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("order_index");
    setServices(data || []);
    setLoading(false);
  };

  const addService = async () => {
    if (!newService.title) return;
    setSaving(true);
    await supabase.from("services").insert([{ ...newService, order_index: services.length }]);
    setNewService({ title: "", description: "", tags: "" });
    await fetchServices();
    setSaving(false);
  };

  const updateService = async (id: string, field: string, value: string) => {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const saveService = async (service: Service) => {
    await supabase.from("services").update(service).eq("id", service.id);
  };

  const deleteService = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const inputClass = "w-full bg-[#F5F5F3] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#BEF264] border border-transparent";

  return (
    <div>
      <h2 className="text-2xl font-black text-black mb-6">Services</h2>

      {/* Existing services */}
      <div className="flex flex-col gap-4 mb-8">
        {loading ? <p className="text-sm text-gray-400">Loading...</p> :
          services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl border border-black/10 p-5">
              <div className="grid grid-cols-1 gap-3 mb-3">
                <input value={service.title} onChange={(e) => updateService(service.id, "title", e.target.value)}
                  className={inputClass} placeholder="Service Title" />
                <textarea value={service.description} onChange={(e) => updateService(service.id, "description", e.target.value)}
                  rows={2} className={inputClass + " resize-none"} placeholder="Description" />
                <input value={service.tags} onChange={(e) => updateService(service.id, "tags", e.target.value)}
                  className={inputClass} placeholder="Tags (comma separated)" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => saveService(service)}
                  className="px-4 py-2 rounded-full bg-[#BEF264] text-black text-xs font-bold hover:bg-[#a8e050] transition-colors">
                  Save
                </button>
                <button onClick={() => deleteService(service.id)}
                  className="px-4 py-2 rounded-full bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Add new */}
      <div className="bg-white rounded-2xl border border-dashed border-black/20 p-5">
        <h3 className="text-sm font-black text-black mb-4">Add New Service</h3>
        <div className="flex flex-col gap-3 mb-4">
          <input value={newService.title} onChange={(e) => setNewService({ ...newService, title: e.target.value })}
            className={inputClass} placeholder="Service Title" />
          <textarea value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            rows={2} className={inputClass + " resize-none"} placeholder="Description" />
          <input value={newService.tags} onChange={(e) => setNewService({ ...newService, tags: e.target.value })}
            className={inputClass} placeholder="Tags (comma separated)" />
        </div>
        <button onClick={addService} disabled={saving}
          className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors disabled:opacity-50">
          {saving ? "Adding..." : "+ Add Service"}
        </button>
      </div>
    </div>
  );
}