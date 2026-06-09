"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black bg-white";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider";

type HeroData = Record<string, string>;

async function uploadImage(file: File, field: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `hero/${field}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from("cms-images")
    .upload(path, file, { upsert: true });
  if (error) { console.error("Upload error:", error); return null; }
  const { data } = supabase.storage.from("cms-images").getPublicUrl(path);
  return data.publicUrl;
}

async function saveToDb(payload: Record<string, string>) {
  const { error: updateError } = await supabase
    .from("hero_content")
    .update(payload)
    .eq("id", 1);
  if (updateError) {
    console.error("Update error:", updateError);
    const { error: upsertError } = await supabase
      .from("hero_content")
      .upsert({ id: 1, ...payload });
    if (upsertError) console.error("Upsert error:", upsertError);
  }
}

export default function HeroSection() {
  const [data, setData] = useState<HeroData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: row, error } = await supabase
      .from("hero_content")
      .select("*")
      .eq("id", 1)
      .single();
    if (error) console.error("Fetch error:", error);
    if (row) {
      setData(row);
      const imgs: string[] = [];
      let i = 1;
      while (row[`carousel_image_${i}`]) {
        imgs.push(row[`carousel_image_${i}`]);
        i++;
      }
      setCarouselImages(imgs);
    }
    setLoading(false);
  };

  const buildPayload = (
    currentData: HeroData,
    currentCarousel: string[]
  ): Record<string, string> => {
    const carouselFields: Record<string, string> = {};
    currentCarousel.forEach((url, i) => {
      carouselFields[`carousel_image_${i + 1}`] = url;
    });
    for (let i = currentCarousel.length + 1; i <= 10; i++) {
      carouselFields[`carousel_image_${i}`] = "";
    }
    const { id, created_at, ...rest } = currentData as any;
    return { ...rest, ...carouselFields };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (field: string, file: File) => {
    setUploading(field);
    const url = await uploadImage(file, field);
    if (url) {
      setData((prev) => {
        const updated = { ...prev, [field]: url };
        saveToDb(buildPayload(updated, carouselImages));
        return updated;
      });
    }
    setUploading(null);
  };

  const handleCarouselBulkUpload = async (files: FileList) => {
    setUploading("carousel");
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadImage(file, `carousel-${Date.now()}-${Math.random()}`);
      if (url) newUrls.push(url);
    }
    setCarouselImages((prev) => {
      const updated = [...prev, ...newUrls];
      saveToDb(buildPayload(data, updated));
      return updated;
    });
    setUploading(null);
  };

  const removeCarouselImage = (index: number) => {
    setCarouselImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      saveToDb(buildPayload(data, updated));
      return updated;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await saveToDb(buildPayload(data, carouselImages));
    setSaving(false);
    setSaved(true);
    await fetchData();
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;

  const ImageUploader = ({ field }: { field: string }) => (
    <div className="flex items-center gap-3">
      <label className="cursor-pointer bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition flex-shrink-0">
        {uploading === field ? "Uploading..." : data[field] ? "Replace Image" : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={!!uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(field, file);
          }}
        />
      </label>
      {data[field] && (
        <>
          <img src={data[field]} className="w-12 h-12 object-cover rounded-xl border" />
          <button
            onClick={() => {
              setData((prev) => {
                const updated = { ...prev, [field]: "" };
                saveToDb(buildPayload(updated, carouselImages));
                return updated;
              });
            }}
            className="text-xs text-red-400 hover:text-red-600"
          >
            Remove
          </button>
        </>
      )}
      {!data[field] && <p className="text-xs text-gray-400">No image uploaded yet</p>}
    </div>
  );

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-black mb-8">Hero Section</h2>
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-6">

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Label Text</label>
          <input name="label" value={data.label || ""} onChange={handleChange} className={inputClass} placeholder="BUSINESS AGENCY" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Heading Part 1</label>
            <input name="heading_part1" value={data.heading_part1 || ""} onChange={handleChange} className={inputClass} placeholder="Fal" />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Heading Part 2</label>
            <input name="heading_part2" value={data.heading_part2 || ""} onChange={handleChange} className={inputClass} placeholder="mic" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Embedded Image (between heading)</label>
          <ImageUploader field="heading_image_url" />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Subtext</label>
          <input name="subtext" value={data.subtext || ""} onChange={handleChange} className={inputClass} placeholder="We shape bold identities..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>CTA Button Text</label>
            <input name="cta_text" value={data.cta_text || ""} onChange={handleChange} className={inputClass} placeholder="Get Started" />
          </div>
          <div className="flex flex-col gap-2">
            <label className={labelClass}>CTA Button URL</label>
            <input name="cta_url" value={data.cta_url || ""} onChange={handleChange} className={inputClass} placeholder="/contact" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className={labelClass}>Social Links</label>
          <input name="facebook_url" value={data.facebook_url || ""} onChange={handleChange} className={inputClass} placeholder="Facebook URL" />
          <input name="twitter_url" value={data.twitter_url || ""} onChange={handleChange} className={inputClass} placeholder="X / Twitter URL" />
          <input name="youtube_url" value={data.youtube_url || ""} onChange={handleChange} className={inputClass} placeholder="YouTube URL" />
        </div>

        <div className="flex flex-col gap-4">
          <label className={labelClass}>Carousel Images</label>
          <label className={`cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center gap-2 hover:border-black transition ${uploading === "carousel" ? "opacity-50 pointer-events-none" : ""}`}>
            <span className="text-2xl">🖼️</span>
            <p className="text-sm font-bold text-black">
              {uploading === "carousel" ? "Uploading..." : "Click to upload images"}
            </p>
            <p className="text-xs text-gray-400">You can select multiple images at once</p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              disabled={!!uploading}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleCarouselBulkUpload(e.target.files);
                }
              }}
            />
          </label>

          {carouselImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {carouselImages.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} className="w-full h-24 object-cover rounded-xl border" />
                  <button
                    onClick={() => removeCarouselImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-1">#{i + 1}</p>
                </div>
              ))}
            </div>
          )}

          {carouselImages.length === 0 && (
            <p className="text-xs text-gray-400">No carousel images yet</p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !!uploading}
          className="bg-black text-white rounded-xl py-3 font-bold hover:bg-gray-800 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}