"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SiteSettingsSection() {
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const { data } = await supabase.from("site_settings").select("*").single();
    if (data) setData(data);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    await supabase.from("site_settings").update(data).eq("id", data.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full bg-[#F5F5F3] rounded-xl px-4 py-3 text-sm text-black outline-none focus:ring-2 focus:ring-[#BEF264] border border-transparent";
  const labelClass = "text-xs font-bold tracking-widest uppercase text-black/50";

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-black">Site Settings</h2>
        <button onClick={handleSave} disabled={saving}
          className="px-6 py-2.5 rounded-full bg-[#BEF264] text-black text-sm font-bold hover:bg-[#a8e050] transition-colors disabled:opacity-50">
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col gap-6">

        {/* SEO */}
        <div className="bg-white rounded-2xl border border-black/10 p-6">
          <h3 className="text-sm font-black text-black mb-4">🔍 SEO Settings</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Meta Title</label>
              <input name="meta_title" value={data.meta_title || ""} onChange={handleChange} className={inputClass} placeholder="Falmic — Crafting Brand Design" />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Meta Description</label>
              <textarea name="meta_description" value={data.meta_description || ""} onChange={handleChange} rows={3} className={inputClass + " resize-none"} placeholder="We shape bold identities..." />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl border border-black/10 p-6">
          <h3 className="text-sm font-black text-black mb-4">📞 Contact Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Contact Email</label>
              <input name="contact_email" value={data.contact_email || ""} onChange={handleChange} className={inputClass} placeholder="support@falmic.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Contact Phone</label>
              <input name="contact_phone" value={data.contact_phone || ""} onChange={handleChange} className={inputClass} placeholder="+0 (105) 115-2920" />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Address</label>
              <input name="contact_address" value={data.contact_address || ""} onChange={handleChange} className={inputClass} placeholder="115 Modern Street, 4th Floor" />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-2xl border border-black/10 p-6">
          <h3 className="text-sm font-black text-black mb-4">📱 Social Media Links</h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              { name: "facebook_url", label: "Facebook URL" },
              { name: "instagram_url", label: "Instagram URL" },
              { name: "twitter_url", label: "X (Twitter) URL" },
              { name: "linkedin_url", label: "LinkedIn URL" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <label className={labelClass}>{field.label}</label>
                <input name={field.name} value={data[field.name] || ""} onChange={handleChange} className={inputClass} placeholder="https://" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}