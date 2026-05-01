import Link from "next/link";
import { X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#BEF264] px-6 md:px-16 lg:px-24 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-black text-black tracking-tight">Falmic</h2>
            <p className="text-sm text-black/60 leading-relaxed max-w-[200px]">
              We shape bold identities and digital experiences that make brands impossible to ignore.
            </p>
          </div>

          {/* Home Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-black text-black">Home</h3>
            <div className="flex flex-col gap-3">
              {["Home", "What We Do", "Single News"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm text-black/70 hover:text-black transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-black text-black">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {["Contact Us", "FAQ", "Blog"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm text-black/70 hover:text-black transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-black text-black">Contact</h3>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-black/70">+0 (105) 115-2920</span>
              <span className="text-sm text-black/70">115 Modern Street, 4th Floor</span>
              <span className="text-sm text-black/70">support@falmic.com</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/20 mb-6" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Social Icons */}
          <div className="flex items-center gap-4">

            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg border-2 border-black/30 flex items-center justify-center hover:border-black transition-colors duration-200"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" aria-label="Instagram"
              className="w-9 h-9 rounded-lg border-2 border-black/30 flex items-center justify-center hover:border-black transition-colors duration-200"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a href="#" aria-label="X"
              className="w-9 h-9 rounded-lg border-2 border-black/30 flex items-center justify-center hover:border-black transition-colors duration-200"
            >
              <X size={16} />
            </a>

          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-8">
            <Link href="#" className="text-sm text-black/70 hover:text-black transition-colors duration-200">
              Term Of Condition
            </Link>
            <Link href="#" className="text-sm text-black/70 hover:text-black transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}