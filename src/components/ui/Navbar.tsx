"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-black"
            onClick={() => setMenuOpen(false)}
          >
            Falmic
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-[#BEF264] text-black text-sm font-semibold hover:bg-[#a8e050] transition-colors duration-200 border border-black"
          >
            Get Started
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-black bg-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-black text-black hover:text-[#BEF264] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center px-8 py-3 rounded-full bg-[#BEF264] text-black text-lg font-semibold border border-black hover:bg-[#a8e050] transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
