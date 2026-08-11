import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logoImg from "../assets/logo.png";

const perfumeLinks = [
  { slug: "royal-oud", label: "Royal OUD Series" },
  { slug: "signature-edp", label: "Signature EDP" },
  { slug: "woody-collection", label: "Woody Collection" },
];

const attarLinks = [
  { slug: "traditional-al-musk", label: "Traditional Al-Musk" },
  { slug: "concentrated-oil-series", label: "Concentrated Oil Series" },
  { slug: "floral-attars", label: "Floral Attars" },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-sm border border-gold/50 bg-black sm:h-12 sm:w-12 md:h-14 md:w-14">
        <img
          src={logoImg}
          alt="Al Misbah Logo"
          className="block h-full w-full scale-[1.17] object-cover"
        />
      </div>

      <span className="min-w-0 leading-none">
        <span className="block truncate font-display text-base text-gilded sm:text-xl md:text-2xl">
          المصباح
        </span>

        <span className="mt-1 block truncate text-[8px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px] sm:tracking-[0.18em] md:mt-1.5 md:text-xs md:tracking-[0.25em]">
          Al Misbah Perfumes
        </span>
      </span>
    </Link>
  );
}

function Dropdown({
  label,
  links,
}: {
  label: string;
  links: typeof perfumeLinks;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 whitespace-nowrap py-6 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/95 transition-colors hover:text-gold"
      >
        {label}

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 rounded-sm border border-border bg-popover/95 p-2.5 shadow-xl backdrop-blur-xl transition-all duration-300 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        {links.map((l) => (
          <Link
            key={l.slug}
            to="/series/$seriesName"
            params={{ seriesName: l.slug }}
            onClick={() => setOpen(false)}
            className="block rounded-sm px-4 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-foreground/90 transition-colors hover:bg-secondary hover:text-gold"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileDropdown({
  label,
  links,
  closeMenu,
}: {
  label: string;
  links: typeof perfumeLinks;
  closeMenu: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left text-base font-semibold uppercase tracking-[0.18em] text-foreground/95 transition-colors hover:text-gold sm:text-lg"
      >
        <span>{label}</span>

        <ChevronDown
          className={`h-5 w-5 text-gold transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 border-l border-border pl-4">
            {links.map((l) => (
              <Link
                key={l.slug}
                to="/series/$seriesName"
                params={{ seriesName: l.slug }}
                onClick={closeMenu}
                className="block text-sm font-medium text-foreground/80 transition-colors hover:text-gold sm:text-base"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[64px] w-full max-w-[1600px] items-center justify-between gap-3 px-3 sm:min-h-[68px] sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* LOGO */}
        <Logo onClick={closeMobileMenu} />

        {/* DESKTOP NAVBAR */}
        <div className="hidden items-center gap-5 xl:flex 2xl:gap-10">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-gold" }}
            className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.16em] text-foreground/95 transition-colors hover:text-gold"
          >
            Home
          </Link>

          <Dropdown label="Perfume" links={perfumeLinks} />

          <Dropdown label="Attar" links={attarLinks} />

          <Link
            to="/about"
            activeProps={{ className: "text-gold" }}
            className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.16em] text-foreground/95 transition-colors hover:text-gold"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            activeProps={{ className: "text-gold" }}
            className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.16em] text-foreground/95 transition-colors hover:text-gold"
          >
            Contact Us
          </Link>
        </div>

        {/* MOBILE + TABLET MENU BUTTON */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex shrink-0 items-center justify-center rounded-sm border border-border p-2 text-gold transition-colors hover:bg-secondary sm:p-2.5 xl:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
      </nav>

      {/* MOBILE / TABLET MENU */}
      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-all duration-500 xl:hidden ${
          mobileOpen
            ? "max-h-[calc(100vh-64px)] opacity-100 sm:max-h-[calc(100vh-68px)]"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto px-5 py-4 sm:px-8 sm:py-6">
          {/* HOME */}
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-gold" }}
            onClick={closeMobileMenu}
            className="block border-b border-border py-5 text-base font-semibold uppercase tracking-[0.18em] text-foreground/95 transition-colors hover:text-gold sm:text-lg"
          >
            Home
          </Link>

          {/* PERFUME */}
          <MobileDropdown
            label="Perfume"
            links={perfumeLinks}
            closeMenu={closeMobileMenu}
          />

          {/* ATTAR */}
          <MobileDropdown
            label="Attar"
            links={attarLinks}
            closeMenu={closeMobileMenu}
          />

          {/* ABOUT */}
          <Link
            to="/about"
            onClick={closeMobileMenu}
            className="block border-b border-border py-5 text-base font-semibold uppercase tracking-[0.18em] text-foreground/95 transition-colors hover:text-gold sm:text-lg"
          >
            About Us
          </Link>

          {/* CONTACT */}
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="block py-5 text-base font-semibold uppercase tracking-[0.18em] text-foreground/95 transition-colors hover:text-gold sm:text-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
