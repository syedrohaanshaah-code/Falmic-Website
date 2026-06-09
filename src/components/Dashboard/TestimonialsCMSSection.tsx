"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save } from "lucide-react";

type Data = Record<string, string>;

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";

const defaults: Data = {
  hero_heading: "Client Stories",
  stat_1_value: "564+",
  stat_1_label: "Happy Clients",
  stat_2_value: "98%",
  stat_2_label: "Satisfaction Rate",
  stat_3_value: "722K+",
  stat_3_label: "Projects Delivered",
  stat_4_value: "25+",
  stat_4_label: "Years Experience",
  grid_label: "What They Say",
  grid_heading: "Words From Our Happy Clients",
  t1_name: "Jonathan Reed",
  t1_role: "CEO, Brandify",
  t1_quote: "Working with Falmic was a game changer for our brand.",
  t1_image: "",
  t2_name: "Sarah Mitchell",
  t2_role: "Founder, Bloom Studio",
  t2_quote: "Absolutely incredible team.",
  t2_image: "",
  t3_name: "Ethan Cole",
  t3_role: "Marketing Director",
  t3_quote:
    "They don't just design — they think, strategize, and bring ideas to life.",
  t3_image: "",
  t4_name: "Michael Larson",
  t4_role: "Product Lead, Nexus",
  t4_quote: "Professional, fast, and incredibly creative.",
  t4_image: "",
  t5_name: "Priya Nair",
  t5_role: "Brand Manager",
  t5_quote: "Falmic transformed our outdated brand into something modern.",
  t5_image: "",
  t6_name: "James Whitfield",
  t6_role: "Co-Founder, Launchpad",
  t6_quote:
    "The team's strategic thinking combined with stunning design execution is truly unmatched.",
  t6_image: "",
  video_label: "Video Stories",
  video_heading: "See What Our Clients Have To Say",
  video_subtext:
    "Don't just take our word for it — hear directly from the brands we've helped transform.",
  video_button_text: "View All Stories",
  video_image_url: "",
  video_duration: "2:45 min",
  video_type: "url", // ADD THIS
  video_url: "", // ADD THIS
  video_file_url: "", // ADD THIS
  cta_heading: "Ready To Be Our Next Success Story?",
  cta_subtext:
    "Join hundreds of brands that have transformed their identity and grown with Falmic.",
  cta_button_text: "Start Your Project",
};

async function uploadImage(file: File, folder: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `testimonials/${folder}-${Date.now()}.${ext}`;
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

export default function TestimonialsCMSSection() {
  const [d, setD] = useState<Data>(defaults);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase
      .from("testimonials_page_content")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setD(data);
      });
  }, []);

  const set = (key: string, value: string) =>
    setD((prev) => ({ ...prev, [key]: value }));

  const handleImageUpload = async (key: string, file: File) => {
    setUploading(key);
    const url = await uploadImage(file, key);
    if (url) set(key, url);
    setUploading(null);
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await supabase
      .from("testimonials_page_content")
      .upsert({ id: 1, ...d });
    setMsg(error ? "✗ Error saving." : "✓ Saved!");
    setSaving(false);
  };

  const Block = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-4">
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
        {title}
      </h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );

  const Field = ({
    label,
    k,
    textarea,
  }: {
    label: string;
    k: string;
    textarea?: boolean;
  }) => (
    <div className="flex flex-col gap-2">
      <label className={labelClass}>{label}</label>
      {textarea ? (
        <textarea
          className={inputClass + " resize-none"}
          rows={2}
          value={d[k] || ""}
          onChange={(e) => set(k, e.target.value)}
        />
      ) : (
        <input
          className={inputClass}
          value={d[k] || ""}
          onChange={(e) => set(k, e.target.value)}
        />
      )}
    </div>
  );

  const ImageUploader = ({ k, folder }: { k: string; folder: string }) => (
    <div className="flex flex-col gap-2">
      <label className={labelClass}>Photo</label>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition flex-shrink-0">
          {uploading === k
            ? "Uploading..."
            : d[k]
              ? "Replace Photo"
              : "Upload Photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading === k}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImageUpload(k, f);
            }}
          />
        </label>
        {d[k] ? (
          <img
            src={d[k]}
            className="w-10 h-10 rounded-full object-cover border"
          />
        ) : (
          <p className="text-xs text-gray-400">No photo uploaded yet</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black">Testimonials Page</h2>
          <p className="text-sm text-gray-500 mt-1">
            Edit all sections of the testimonials page
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

      <Block title="Hero Section">
        <Field label="Hero Heading" k="hero_heading" />
      </Block>

      <Block title="Stats Bar">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="border border-gray-100 rounded-xl p-3 flex flex-col gap-3"
            >
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
          <ImageUploader k={`t${n}_image`} folder={`t${n}`} />
        </Block>
      ))}

      <Block title="Video CTA Section">
        <Field label="Label" k="video_label" />
        <Field label="Heading" k="video_heading" />
        <Field label="Subtext" k="video_subtext" textarea />
        <Field label="Button Text" k="video_button_text" />
        <Field label="Video Duration Label" k="video_duration" />

        {/* Video source toggle */}
        <div className="flex flex-col gap-3">
          <label className={labelClass}>Video Source</label>
          <div className="flex gap-3">
            <button
              onClick={() => set("video_type", "url")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition ${
                (d.video_type || "url") === "url"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-200 hover:border-black"
              }`}
            >
              🔗 YouTube / Vimeo URL
            </button>
            <button
              onClick={() => set("video_type", "file")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition ${
                d.video_type === "file"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-200 hover:border-black"
              }`}
            >
              📁 Upload Video File
            </button>
          </div>

          {/* URL input */}
          {(d.video_type || "url") === "url" && (
            <div className="flex flex-col gap-2">
              <label className={labelClass}>YouTube / Vimeo URL</label>
              <input
                className={inputClass}
                value={d.video_url || ""}
                placeholder="https://www.youtube.com/watch?v=..."
                onChange={(e) => set("video_url", e.target.value)}
              />
              <p className="text-xs text-gray-400 px-1">
                Supports YouTube and Vimeo links
              </p>
            </div>
          )}

          {/* File upload */}
          {d.video_type === "file" && (
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Video File (.mp4, .mov)</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition flex-shrink-0">
                  {uploading === "video_file"
                    ? "Uploading..."
                    : d.video_file_url
                      ? "Replace Video"
                      : "Upload Video"}
                  <input
                    type="file"
                    accept="video/mp4,video/quicktime,.mov,.mp4"
                    className="hidden"
                    disabled={uploading === "video_file"}
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      setUploading("video_file");
                      const ext = f.name.split(".").pop();
                      const path = `testimonials/video-${Date.now()}.${ext}`;
                      const { error } = await supabase.storage
                        .from("cms-images")
                        .upload(path, f, { upsert: true });
                      if (!error) {
                        const { data } = supabase.storage
                          .from("cms-images")
                          .getPublicUrl(path);
                        set("video_file_url", data.publicUrl);
                      }
                      setUploading(null);
                    }}
                  />
                </label>
                {d.video_file_url ? (
                  <p className="text-xs text-green-600 font-medium">
                    ✓ Video uploaded
                  </p>
                ) : (
                  <p className="text-xs text-gray-400">No video uploaded yet</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col gap-2">
          <label className={labelClass}>
            Thumbnail Image (shown before video plays)
          </label>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition flex-shrink-0">
              {uploading === "video_image_url"
                ? "Uploading..."
                : d.video_image_url
                  ? "Replace Thumbnail"
                  : "Upload Thumbnail"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading === "video_image_url"}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImageUpload("video_image_url", f);
                }}
              />
            </label>
            {d.video_image_url ? (
              <img
                src={d.video_image_url}
                className="w-20 h-12 object-cover rounded-lg border"
              />
            ) : (
              <p className="text-xs text-gray-400">No thumbnail uploaded yet</p>
            )}
          </div>
        </div>
      </Block>

      <Block title="Bottom CTA Section">
        <Field label="Heading" k="cta_heading" />
        <Field label="Subtext" k="cta_subtext" textarea />
        <Field label="Button Text" k="cta_button_text" />
      </Block>
    </div>
  );
}
