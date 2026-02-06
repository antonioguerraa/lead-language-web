import { Instagram, Mail } from "lucide-react";
import { LOGO_URL, CONTACT_EMAIL, INSTAGRAM_URL, NAV_LINKS } from "../../utils/constants";
import { footerContent } from "../../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-light">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <img src={LOGO_URL} alt="Lead Language" className="mb-4 h-20 w-auto sm:h-24" />
            <p className="text-sm text-text-secondary">{footerContent.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Navegación
            </h4>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Contacto
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
              >
                <Mail size={16} />
                <span className="break-all">{CONTACT_EMAIL}</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
              >
                <Instagram size={16} />
                @lead_language
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-sm text-text-muted">{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
