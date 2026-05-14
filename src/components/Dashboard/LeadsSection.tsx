"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Contact = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  heard_from: string;
  website: string;
  ref_websites: string;
  status: string;
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  closed: "bg-green-100 text-green-700",
};

export default function LeadsSection() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    setContacts(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("contacts").update({ status }).eq("id", id);
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const deleteContact = async (id: string) => {
    await supabase.from("contacts").delete().eq("id", id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setSelected(null);
  };

  const filtered = filter === "all" ? contacts : contacts.filter((c) => c.status === filter);
  const stats = {
    total: contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    in_progress: contacts.filter((c) => c.status === "in_progress").length,
    closed: contacts.filter((c) => c.status === "closed").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-black">Contact Leads</h2>
        <button onClick={fetchContacts} className="px-4 py-2 rounded-full bg-[#BEF264] text-black text-xs font-bold hover:bg-[#a8e050] transition-colors">Refresh</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: stats.total, color: "bg-black text-white" },
          { label: "New", value: stats.new, color: "bg-blue-50 text-blue-700" },
          { label: "In Progress", value: stats.in_progress, color: "bg-yellow-50 text-yellow-700" },
          { label: "Closed", value: stats.closed, color: "bg-green-50 text-green-700" },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-2xl px-5 py-4`}>
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-xs opacity-70 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["all", "new", "in_progress", "closed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${filter === f ? "bg-black text-white" : "bg-white text-black border border-black/10"}`}>
            {f === "all" ? "All" : f === "in_progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* List */}
        <div className="col-span-1 flex flex-col gap-3">
          {loading ? <p className="text-sm text-gray-400">Loading...</p> :
            filtered.map((contact) => (
              <div key={contact.id} onClick={() => setSelected(contact)}
                className={`bg-white rounded-2xl p-4 border cursor-pointer transition-all ${selected?.id === contact.id ? "border-black" : "border-black/10 hover:border-black/30"}`}>
                <div className="flex items-start justify-between mb-1">
                  <p className="font-black text-sm text-black">{contact.full_name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[contact.status] || "bg-gray-100 text-gray-500"}`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{contact.email}</p>
                <p className="text-xs text-gray-300 mt-1">{contact.service} · {contact.budget}</p>
              </div>
            ))}
        </div>

        {/* Detail */}
        <div className="col-span-2">
          {!selected ? (
            <div className="bg-white rounded-2xl border border-black/10 h-64 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Select a lead to view details</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-black/10 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-black">{selected.full_name}</h3>
                  <p className="text-sm text-gray-500">{selected.company}</p>
                </div>
                <button onClick={() => deleteContact(selected.id)} className="px-3 py-1.5 rounded-full bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors">Delete</button>
              </div>
              <div className="flex gap-2 mb-6">
                {["new", "in_progress", "closed"].map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${selected.status === s ? "bg-black text-white border-black" : "bg-white text-black border-black/10"}`}>
                    {s === "in_progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Email", value: selected.email },
                  { label: "Phone", value: selected.phone },
                  { label: "Service", value: selected.service },
                  { label: "Budget", value: selected.budget },
                  { label: "Timeline", value: selected.timeline },
                  { label: "Website", value: selected.website },
                ].map((item) => (
                  <div key={item.label} className="bg-[#F5F5F3] rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-black">{item.value || "—"}</p>
                  </div>
                ))}
              </div>
              {selected.description && (
                <div className="bg-[#F5F5F3] rounded-xl p-3 mb-3">
                  <p className="text-xs text-gray-400 mb-1">Description</p>
                  <p className="text-sm text-black">{selected.description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}