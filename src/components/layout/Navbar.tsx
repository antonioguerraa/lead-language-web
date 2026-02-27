import { useScrollPosition } from "../../hooks/useScrollPosition";
import { LOGO_URL } from "../../utils/constants";

export default function Navbar() {
  const scrolled = useScrollPosition(50);

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
            className="h-20 w-auto sm:h-24"
          />
        </a>

      </div>
    </nav>
  );
}
