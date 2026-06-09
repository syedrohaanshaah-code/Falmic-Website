"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save } from "lucide-react";

type Data = Record<string, string>;

const defaults: Data = {
  // Hero
  hero_heading: "Client Stories",
  // Stats
  stat_1_value: "564+", stat_1_label: "Happy Clients",
  stat_2_value: "98%", stat_2_label: "Satisfaction Rate",
  stat_3_value: "722K+", stat_3_label: "Projects Delivered",
  stat_4_value: "25+", stat_4_label: "Years Experience",
  // Grid heading
  grid_label: "What They Say",
  grid_heading: "Words From Our Happy Clients",
  // Testimonials
  t1_name: "Jonathan Reed", t1_role: "CEO, Brandify", t1_quote: "Working with Falmic was a game changer for our brand.", t1_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  t2_name: "Sarah Mitchell", t2_role: "Founder, Bloom Studio", t2_quote: "Absolutely incredible team.", t2_image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  t3_name: "Ethan Cole", t3_role: "Marketing Director", t3_quote: "They don't just design — they think, strategize, and bring ideas to life.", t3_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  t4_name: "Michael Larson", t4_role: "Product Lead, Nexus", t4_quote: "Professional, fast, and incredibly creative.", t4_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  t5_name: "Priya Nair", t5_role: "Brand Manager", t5_quote: "Falmic transformed our outdated brand into something modern.", t5_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  t6_name: "James Whitfield", t6_role: "Co-Founder, Launchpad", t6_quote: "The team's strategic thinking combined with stunning design execution is truly unmatched.", t6_image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  // Video CTA
  video_label: "Video Stories",
  video_heading: "See What Our Clients Have To Say",
  video_subtext: "Don't just take our word for it — hear directly from the brands we've helped transform.",
  video_button_text: "View All Stories",
  video_image_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  video_duration: "2:45 min",
  // Bottom CTA
  cta_heading: "Ready To Be Our Next Success Story?",
  cta_subtext: "Join hundreds of brands that have transformed their identity and grown with Falmic.",
  cta_button_text: "Start Your Project",
};

export default function TestimonialsCMSSection() {
  const [d, setD] = useState<Data>(defaults);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("testimonials_page_content").select("*").eq("id", 1).single()
      .then(({ data }) => { if (data) setD(data); });
  }, []);

  const set = (key: string, value: string) => setD((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await supabase.from("testimonials_page_content").upsert({ id: 1, ...d });
    setMsg(error ? "✗ Error saving." : "✓ Saved!");
    setSaving(false);
  };

  const inputClass = "w-full bg-[#F5F5F3] border border-black/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black";

  const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white border border-black/10 rounded-2xl p-6 mb-4">
      <h3 className="text-sm font-black uppercase tracking-widest text-black/40 mb-4">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );

  const Field = ({ label, k, textarea }: { label: string; k: string; textarea?: boolean }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold uppercase tracking-wider text-black/50">{label}</label>
      {textarea
        ? <textarea className={inputClass + " resize-none"} rows={2} value={d[k] || ""} onChange={(e) => set(k, e.target.value)} />
        : <input className={inputClass} value={d[k] || ""} onChange={(e) => set(k, e.target.value)} />}
    </div>
  );

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black">Testimonials Page</h2>
          <p className="text-sm text-gray-500 mt-1">Edit all sections of the testimonials page</p>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition disabled:opacity-50">
          <Save size={15} /> {saving ? "Saving..." : "Save All"}
        </button>
      </div>

      {msg && <p className={`mb-4 text-sm font-medium ${msg.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}

      <Block title="Hero Section">
        <Field label="Hero Heading" k="hero_heading" />
      </Block>

      <Block title="Stats Bar">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex flex-col gap-2 border border-black/5 rounded-xl p-3">
              <Field label={`Stat ${n} Value`} k={`stat_${n}_value`} />
              <Field label={`Stat ${n} Label`} k={`stat_${n}_label`} />
            </div>
          ))}
        </div>
      </Block>

      <Block title="Grid Section Heading">
        <Field label="Label" k="grid_label" />
        <Field label="Heading" k="grid_heading" />
      </Block>

      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Block key={n} title={`Testimonial ${n}`}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name" k={`t${n}_name`} />
            <Field label="Role" k={`t${n}_role`} />
          </div>
          <Field label="Quote" k={`t${n}_quote`} textarea />
          <Field label="Photo URL" k={`t${n}_image`} />
          {d[`t${n}_image`] && (
            <img src={d[`t${n}_image`]} alt="preview" className="w-16 h-16 rounded-full object-cover border border-black/10" />
          )}
        </Block>
      ))}

      <Block title="Video CTA Section">
        <Field label="Label" k="video_label" />
        <Field label="Heading" k="video_heading" />
        <Field label="Subtext" k="video_subtext" textarea />
        <Field label="Button Text" k="video_button_text" />
        <Field label="Thumbnail Image URL" k="video_image_url" />
        <Field label="Video Duration Label" k="video_duration" />
      </Block>

      <Block title="Bottom CTA Section">
        <Field label="Heading" k="cta_heading" />
        <Field label="Subtext" k="cta_subtext" textarea />
        <Field label="Button Text" k="cta_button_text" />
      </Block>
    </div>
  );
}