"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type TeamData = Record<string, string>;

export default function TeamSection() {
  const [d, setD] = useState<TeamData>({
    label: "Our Team", heading: "Meet Our Team Now",
    description: "We are a passionate group of creatives, strategists, and problem solvers dedicated to building brands that leave lasting impressions.",
    button_text: "Learn More", button_url: "#",
    member_1_name: "Davin Smith", member_1_role: "Our Team", member_1_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    member_2_name: "Denada Cain", member_2_role: "Our Team", member_2_image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    member_3_name: "Celyn Dion", member_3_role: "Our Team", member_3_image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    member_4_name: "John Doe", member_4_role: "Our Team", member_4_image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  });

  useEffect(() => {
    supabase.from("team_content").select("*").eq("id", 1).single()
      .then(({ data }) => { if (data) setD(data); });
  }, []);

  const members = [1, 2, 3, 4].map((n) => ({
    name: d[`member_${n}_name`],
    role: d[`member_${n}_role`],
    src: d[`member_${n}_image_url`],
  }));

  return null;
  //  ( <section className="bg-white px-6 md:px-16 lg:px-24 py-20">
  //     <div className="max-w-7xl mx-auto">
  //       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
  //         <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "620px" }}>
  //           <div>
  //             <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
  //               <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#BEF264", display: "inline-block" }} />
  //               <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>{d.label}</span>
  //             </div>
  //             <h2 style={{ fontSize: "5rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em", color: "#000" }}>
  //               {d.heading?.split(" ").slice(0, 2).join(" ")}<br />{d.heading?.split(" ").slice(2).join(" ")}
  //             </h2>
  //           </div>
  //           <div>
  //             <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, marginBottom: "20px", maxWidth: "320px" }}>
  //               {d.description}
  //             </p>
  //             <a href={d.button_url || "#"} style={{
  //               display: "inline-flex", alignItems: "center", gap: "8px",
  //               padding: "12px 24px", borderRadius: "9999px",
  //               background: "#BEF264", color: "#000",
  //               fontSize: "14px", fontWeight: 700, textDecoration: "none"
  //             }}>
  //               {d.button_text} <ArrowRight size={16} />
  //             </a>
  //           </div>
  //         </div>

  //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
  //           {members.map((member, i) => (
  //             <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
  //               viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
  //               style={{ position: "relative", borderRadius: "16px", overflow: "hidden", height: "300px" }}>
  //               {member.src && (
  //                 <img src={member.src} alt={member.name}
  //                   style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
  //               )}
  //               <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
  //               <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", flexDirection: "column", gap: "8px", zIndex: 10 }}>
  //                 {[
  //                   <svg key="fb" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  //                   <svg key="tw" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25z" /></svg>,
  //                   <svg key="yt" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" /></svg>,
  //                 ].map((icon, j) => (
  //                   <a key={j} href="#" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", textDecoration: "none", color: "#000" }}>
  //                     {icon}
  //                   </a>
  //                 ))}
  //               </div>
  //               <div style={{ position: "absolute", bottom: "16px", left: "16px", zIndex: 10 }}>
  //                 <p style={{ color: "white", fontWeight: 900, fontSize: "16px", margin: 0 }}>{member.name}</p>
  //                 <p style={{ color: "#BEF264", fontSize: "12px", fontWeight: 600, margin: "2px 0 0 0" }}>{member.role}</p>
  //               </div>
  //             </motion.div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
}