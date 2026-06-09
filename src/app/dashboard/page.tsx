"use client";

import { useState } from "react";
import LeadsSection from "@/components/Dashboard/LeadsSection";
import HeroSection from "@/components/Dashboard/HeroSection";
import ServicesSection from "@/components/Dashboard/ServicesSection";
import PortfolioSection from "@/components/Dashboard/PortfolioSection";
import BlogSection from "@/components/Dashboard/BlogSection";
import TestimonialsSection from "@/components/Dashboard/TestimonialsSection";
import FAQSection from "@/components/Dashboard/FAQSection";
import StorySection from "@/components/Dashboard/StorySection";
import WorkflowSection from "@/components/Dashboard/WorkflowSection";
import NewsSection from "@/components/Dashboard/NewsSection";
import SiteSettingsSection from "@/components/Dashboard/SiteSettingsSection";

const USERS = [
  { username: "admin", password: "falmic2024", role: "admin" },
  { username: "arman", password: "falmic2024", role: "admin" },
];

type User = { username: string; password: string; role: string };

const TABS = [
  { id: "leads", label: "Leads" },
  { id: "hero", label: "Hero" },
  { id: "story", label: "Story" },
  { id: "workflow", label: "Workflow" },
  { id: "news", label: "News" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "blog", label: "Blog" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "settings", label: "Site Settings" },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("leads");

  const handleLogin = () => {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser(found);
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm">
          <h1 className="text-2xl font-black mb-6 text-center">Falmic CMS</h1>
          <div className="flex flex-col gap-4">
            <input
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              onClick={handleLogin}
              className="bg-black text-white rounded-xl py-3 font-bold hover:bg-gray-800 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-black text-white flex flex-col py-8 px-4 gap-2 min-h-screen">
        <h2 className="text-lg font-black mb-6 px-2">Falmic CMS</h2>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${activeTab === tab.id
              ? "bg-[#BEF264] text-black"
              : "hover:bg-white/10 text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
        <div className="mt-auto pt-6 border-t border-white/10">
          <p className="text-xs text-white/50 px-2 mb-2">Logged in as</p>
          <p className="text-sm font-bold px-2">{user.username}</p>
          <button
            onClick={() => setUser(null)}
            className="mt-3 text-xs text-white/50 hover:text-white px-2 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      {/* Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === "leads" && <LeadsSection />}
        {activeTab === "hero" && <HeroSection />}
        {activeTab === "services" && <ServicesSection />}
        {activeTab === "portfolio" && <PortfolioSection />}
        {activeTab === "blog" && <BlogSection />}
        {activeTab === "testimonials" && <TestimonialsSection />}
        {activeTab === "faq" && <FAQSection />}
        {activeTab === "story" && <StorySection />}
        {activeTab === "workflow" && <WorkflowSection />}
        {activeTab === "news" && <NewsSection />}
        {activeTab === "settings" && <SiteSettingsSection />}
      </main>
    </div>
  );
}