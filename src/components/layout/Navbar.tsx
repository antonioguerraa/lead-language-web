import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { LOGO_URL, NAV_LINKS } from "../../utils/constants";

export default function Navbar() {
  const scrolled = useScrollPosition(50);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/90 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-2">
          <img
            src={LOGO_URL}
            alt="Lead Language"
            className="h-10 w-auto sm:h-12"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#final-cta"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Empezar
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4 px-4 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-text-secondary transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#final-cta"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-lg bg-accent px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Empezar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
