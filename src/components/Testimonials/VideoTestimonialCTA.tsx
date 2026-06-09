"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Data = Record<string, string>;

const fallback: Data = {
  video_label: "Video Stories",
  video_heading: "See What Our Clients Have To Say",
  video_subtext:
    "Don't just take our word for it — hear directly from the brands we've helped transform through bold design and strategic thinking.",
  video_button_text: "View All Stories",
  video_image_url:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  video_duration: "2:45 min",
  video_type: "url",
  video_url: "",
  video_file_url: "",
};

function getYoutubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return null;
}

export default function VideoTestimonialCTA() {
  const [d, setD] = useState<Data>(fallback);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    supabase
      .from("testimonials_page_content")
      .select(
        "video_label,video_heading,video_subtext,video_button_text,video_image_url,video_duration,video_type,video_url,video_file_url",
      )
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setD({ ...fallback, ...data });
      });
  }, []);

  const embedUrl =
    d.video_type === "url" && d.video_url
      ? getYoutubeEmbedUrl(d.video_url)
      : null;
  const fileUrl =
    d.video_type === "file" && d.video_file_url ? d.video_file_url : null;
  const thumbnail = d.video_image_url || fallback.video_image_url;

  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BEF264]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">
                {d.video_label}
              </span>
            </div>
            <h2
              className="font-black tracking-tighter text-black"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 1.05,
              }}
            >
              {d.video_heading}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              {d.video_subtext}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 w-fit px-6 py-3 rounded-full bg-[#BEF264] text-black text-sm font-bold hover:bg-[#a8e050] transition-colors duration-200"
            >
              {d.video_button_text} <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right — video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
            style={{ height: "400px" }}
            onClick={() => setPlaying(true)}
          >
            {/* Playing state */}
            {playing && embedUrl && (
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
            {playing && fileUrl && (
              <video
                src={fileUrl}
                className="w-full h-full object-cover"
                autoPlay
                controls
              />
            )}

            {/* Thumbnail state */}
            {!playing && (
              <>
                <img
                  src={thumbnail}
                  alt="Video testimonial"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#BEF264] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Play size={28} fill="black" className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-black text-lg">
                    Watch Client Story
                  </p>
                  <p className="text-white/60 text-sm">{d.video_duration}</p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
