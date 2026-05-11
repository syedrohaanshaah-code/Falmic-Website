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

export default function DashboardPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [filter, setFilter] = useState("all");

  const DASHBOARD_PASSWORD = "falmic2024";

  const handleLogin = () => {
    if (password === DASHBOARD_PASSWORD) {
      setAuthed(true);
      fetchContacts();
    } else {
      setWrongPass(true);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    setContacts(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("contacts").update({ status }).eq("id", id);
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
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

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-sm border border-black/10">
          <h1 className="text-3xl font-black text-black mb-2">Falmic</h1>
          <p className="text-sm text-gray-500 mb-8">Dashboard — Enter password to continue</p>

          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setWrongPass(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-[#F0F0EE] rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#BEF264] border border-transparent"
            />
            {wrongPass && <p className="text-xs text-red-500">Incorrect password. Try again.</p>}
            <button
              onClick={handleLogin}
              className="w-full py-4 rounded-2xl bg-[#BEF264] text-black font-bold text-sm hover:bg-[#a8e050] transition-colors"
            >
              Enter Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3]">

      {/* Header */}
      <div className="bg-white border-b border-black/10 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-black">Falmic Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">Contact & Lead Management</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{contacts.length} total leads</span>
          <button
            onClick={fetchContacts}
            className="px-4 py-2 rounded-full bg-[#BEF264] text-black text-xs font-bold hover:bg-[#a8e050] transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="px-8 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: stats.total, color: "bg-black text-white" },
            { label: "New", value: stats.new, color: "bg-blue-50 text-blue-700" },
            { label: "In Progress", value: stats.in_progress, color: "bg-yellow-50 text-yellow-700" },
            { label: "Closed", value: stats.closed, color: "bg-green-50 text-green-700" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} rounded-2xl px-6 py-5`}>
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-xs font-medium opacity-70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {["all", "new", "in_progress", "closed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black/10 hover:border-black/30"
              }`}
            >
              {f === "all" ? "All" : f === "in_progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Leads list */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            {loading ? (
              <div className="text-center py-20 text-gray-400 text-sm">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-sm">No leads found</div>
            ) : (
              filtered.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelected(contact)}
                  className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all duration-200 hover:border-black/30 ${
                    selected?.id === contact.id ? "border-black" : "border-black/10"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-black text-black text-sm">{contact.full_name}</p>
                      <p className="text-xs text-gray-400">{contact.company}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColors[contact.status] || "bg-gray-100 text-gray-500"}`}>
                      {contact.status === "in_progress" ? "In Progress" : contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{contact.email}</p>
                  <p className="text-xs text-gray-400 mt-1">{contact.service} · {contact.budget}</p>
                  <p className="text-[10px] text-gray-300 mt-2">
                    {new Date(contact.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            {!selected ? (
              <div className="bg-white rounded-2xl border border-black/10 h-full flex items-center justify-center py-32">
                <p className="text-gray-400 text-sm">Select a lead to view details</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-black/10 p-8">

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-black">{selected.full_name}</h2>
                    <p className="text-sm text-gray-500">{selected.company}</p>
                  </div>
                  <button
                    onClick={() => deleteContact(selected.id)}
                    className="px-4 py-2 rounded-full bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>

                {/* Status update */}
                <div className="flex gap-2 mb-8">
                  {["new", "in_progress", "closed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors border ${
                        selected.status === s
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black/10 hover:border-black/30"
                      }`}
                    >
                      {s === "in_progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Email", value: selected.email },
                    { label: "Phone", value: selected.phone },
                    { label: "Service", value: selected.service },
                    { label: "Budget", value: selected.budget },
                    { label: "Timeline", value: selected.timeline },
                    { label: "Heard From", value: selected.heard_from },
                    { label: "Website", value: selected.website },
                    { label: "Submitted", value: new Date(selected.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#F5F5F3] rounded-xl p-4">
                      <p className="text-xs text-gray-400 font-medium mb-1">{item.label}</p>
                      <p className="text-sm font-semibold text-black">{item.value || "—"}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                {selected.description && (
                  <div className="bg-[#F5F5F3] rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-400 font-medium mb-2">Project Description</p>
                    <p className="text-sm text-black leading-relaxed">{selected.description}</p>
                  </div>
                )}

                {/* References */}
                {selected.ref_websites && (
                  <div className="bg-[#F5F5F3] rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-medium mb-2">Reference Websites</p>
                    <p className="text-sm text-black leading-relaxed">{selected.ref_websites}</p>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}