"use client";

import { useState } from "react";
import LeadsSection from "@/components/Dashboard/LeadsSection";
import HeroSection from "@/components/Dashboard/HeroSection";
import ServicesSection from "@/components/Dashboard/ServicesSection";
import PortfolioSection from "@/components/Dashboard/PortfolioSection";
import BlogSection from "@/components/Dashboard/BlogSection";
import TestimonialsSection from "@/components/Dashboard/TestimonialsSection";
import FAQSection from "@/components/Dashboard/FAQSection";
import PortfolioCMSSection from "@/components/Dashboard/PortfolioCMSSection";
import ServicesCMSSection from "@/components/Dashboard/ServicesCMSSection";
import TestimonialsCMSSection from "@/components/Dashboard/TestimonialsCMSSection";
import ContactCMSSection from "@/components/Dashboard/ContactCMSSection";
import StorySection from "@/components/Dashboard/StorySection";
import WorkflowSection from "@/components/Dashboard/WorkflowSection";
import NewsSection from "@/components/Dashboard/NewsSection";
import AboutHeroSection from "@/components/Dashboard/AboutHeroSection";
import TeamSection from "@/components/Dashboard/TeamSection";
import WhyTrustUsSection from "@/components/Dashboard/WhyTrustUsSection";
import SiteSettingsSection from "@/components/Dashboard/SiteSettingsSection";

const USERS = [
  { username: "admin", password: "falmic2024", role: "admin" },
  { username: "arman", password: "falmic2024", role: "admin" },
];

type User = { username: string; password: string; role: string };

const PAGE_GROUPS = [
  {
    id: "leads",
    label: "Leads",
    icon: "📋",
    sections: null,
  },
  {
    id: "home",
    label: "Home",
    icon: "🏠",
    sections: [
      { id: "hero", label: "Hero" },
      { id: "story", label: "Story" },
      { id: "workflow", label: "Workflow" },
      { id: "news", label: "News" },
      { id: "services", label: "Services" },
      { id: "portfolio", label: "Portfolio" },
      { id: "testimonials", label: "Testimonials" },
      { id: "faq", label: "FAQ" },
    ],
  },
  {
    id: "about",
    label: "About",
    icon: "👤",
    sections: [
      { id: "about_hero", label: "Hero" },
      { id: "about_story", label: "Story" },
      { id: "about_team", label: "Team" },
      { id: "about_whytrust", label: "Why Trust Us" },
    ],
  },
  {
    id: "global",
    label: "Global",
    icon: "⚙️",
    sections: [
      { id: "settings", label: "Site Settings" },
    ],
  },
  {
    id: "services_page",
    label: "Services",
    icon: "🛠️",
    sections: [
      { id: "services_page_cms", label: "Services Page" },
    ],
  },
  {
    id: "testimonials_page",
    label: "Testimonials",
    icon: "💬",
    sections: [
      { id: "testimonials_page_cms", label: "Testimonials Page" },
    ],
  },
  {
    id: "portfolio_page",
    label: "Portfolio",
    icon: "🖼️",
    sections: [
      { id: "portfolio_page_cms", label: "Portfolio Items" },
    ],
  },
  {
    id: "contact_page",
    label: "Contact",
    icon: "📩",
    sections: [
      { id: "contact_page_cms", label: "Contact Page" },
    ],
  },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState("home");
  const [activeTab, setActiveTab] = useState("hero");

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
      <aside className="w-56 bg-black text-white flex flex-col min-h-screen">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <span className="text-xl font-black">Falmic</span>
          <span className="text-xs text-white/40 block mt-0.5">CMS Dashboard</span>
        </div>

        {/* Page Groups */}
        <div className="flex flex-col gap-1 px-3 pt-4 flex-1">
          {PAGE_GROUPS.map((page) => (
            <div key={page.id}>
              <button
                onClick={() => {
                  setActivePage(page.id);
                  if (page.sections) setActiveTab(page.sections[0].id);
                  else setActiveTab(page.id);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${activePage === page.id
                    ? "bg-[#BEF264] text-black"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
              >
                <span>{page.icon}</span>
                <span>{page.label}</span>
              </button>

              {/* Sub-sections */}
              {activePage === page.id && page.sections && (
                <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3 mb-2">
                  {page.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-all ${activeTab === section.id
                          ? "text-[#BEF264] font-semibold"
                          : "text-white/50 hover:text-white"
                        }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom user info */}
        <div className="px-4 py-4 border-t border-white/10">
          <p className="text-xs text-white/50 mb-1">Logged in as</p>
          <p className="text-sm font-bold">{user.username}</p>
          <button
            onClick={() => setUser(null)}
            className="mt-2 text-xs text-white/50 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === "leads" && <LeadsSection />}
        {activeTab === "hero" && <HeroSection />}
        {activeTab === "services" && <ServicesSection />}
        {activeTab === "portfolio" && <PortfolioSection />}
        {activeTab === "blog" && <BlogSection />}
        {activeTab === "testimonials" && <TestimonialsSection />}
        {activeTab === "faq" && <FAQSection />}
        {activeTab === "about_hero" && <AboutHeroSection />}
        {activeTab === "about_story" && <StorySection />}
        {activeTab === "about_team" && <TeamSection />}
        {activeTab === "about_whytrust" && <WhyTrustUsSection />}
        {activeTab === "story" && <StorySection />}
        {activeTab === "portfolio_page_cms" && <PortfolioCMSSection />}
        {activeTab === "services_page_cms" && <ServicesCMSSection />}
        {activeTab === "testimonials_page_cms" && <TestimonialsCMSSection />}
        {activeTab === "contact_page_cms" && <ContactCMSSection />}
        {activeTab === "workflow" && <WorkflowSection />}
        {activeTab === "news" && <NewsSection />}
        {activeTab === "settings" && <SiteSettingsSection />}
      </main>
    </div>
  );
}