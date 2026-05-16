"use client";

import { useState } from "react";
import LeadsSection from "@/components/Dashboard/LeadsSection";
import HeroSection from "@/components/Dashboard/HeroSection";
import ServicesSection from "@/components/Dashboard/ServicesSection";
import PortfolioSection from "@/components/Dashboard/PortfolioSection";
import BlogSection from "@/components/Dashboard/BlogSection";
import TestimonialsSection from "@/components/Dashboard/TestimonialsSection";
import FAQSection from "@/components/Dashboard/FAQSection";
import SiteSettingsSection from "@/components/Dashboard/SiteSettingsSection";

const DASHBOARD_PASSWORD = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "falmic2024";

  const USERS = [
  { username: "admin", password: "falmic2024", role: "admin" },
  { username: "arman", password: "armanfalmic", role: "editor" },
];

type User = {
  username: string;
  password: string;
  role: string;
};

const navItems = [
  { id: "leads", label: "📧 Contact Leads" },
  { id: "hero", label: "🏠 Hero Content" },
  { id: "services", label: "⚙️ Services" },
  { id: "portfolio", label: "🖼️ Portfolio" },
  { id: "blog", label: "✍️ Blog" },
  { id: "testimonials", label: "⭐ Testimonials" },
  { id: "faq", label: "❓ FAQ" },
  { id: "settings", label: "🔧 Site Settings" },
];

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [activeSection, setActiveSection] = useState("leads");

  const handleLogin = () => {
    if (password === DASHBOARD_PASSWORD) {
      setAuthed(true);
    } else {
      setWrongPass(true);
    }
  };



  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-sm border border-black/10">
          <h1 className="text-3xl font-black text-black mb-2">Falmic</h1>
          <p className="text-sm text-gray-500 mb-8">CMS Dashboard — Enter password to continue</p>
          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setWrongPass(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-[#F0F0EE] rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-[#BEF264] border border-transparent"
            />
            {wrongPass && <p className="text-xs text-red-500">Incorrect password.</p>}
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

  const renderSection = () => {
    switch (activeSection) {
      case "leads": return <LeadsSection />;
      case "hero": return <HeroSection />;
      case "services": return <ServicesSection />;
      case "portfolio": return <PortfolioSection />;
      case "blog": return <BlogSection />;
      case "testimonials": return <TestimonialsSection />;
      case "faq": return <FAQSection />;
      case "settings": return <SiteSettingsSection />;
      default: return <LeadsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-black/10 flex flex-col fixed h-full z-20">
        <div className="px-6 py-6 border-b border-black/10">
          <h1 className="text-xl font-black text-black">Falmic CMS</h1>
          <p className="text-xs text-gray-400 mt-1">Content Management</p>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-[#BEF264] text-black font-bold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-black/10">
          <a
            href="/"
            target="_blank"
            className="w-full block text-center px-4 py-3 rounded-xl text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
          >
            View Live Site
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 p-8">
        {renderSection()}
      </div>

    </div>
  );
}