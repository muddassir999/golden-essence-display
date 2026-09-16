import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";
import logoImg from "../assets/logo.png";
import { useCart } from "@/context/cartContext";

/* =========================================================
   PERFUME LINKS
========================================================= */

const perfumeLinks = [
  { slug: "royal-oud", label: "Royal OUD Series" },
  { slug: "signature-edp", label: "Signature EDP" },
  { slug: "woody-collection", label: "Woody Collection" },
];

/* =========================================================
   ATTAR LINKS
========================================================= */

const attarLinks = [
  {
    slug: "floral",
    label: "🌸 Floral Attars — Rose, Jasmine & Mogra",
  },
  {
    slug: "fresh",
    label: "🌿 Fresh Attars — Aqua, Citrus & Green",
  },
  {
    slug: "woody",
    label: "🪵 Woody Attars — Oud, Sandalwood & Cedar",
  },
  {
    slug: "sweet",
    label: "🍯 Sweet Attars — Vanilla, Musk & Amber",
  },
  {
    slug: "spicy",
    label: "🌶️ Spiced Attars — Saffron, Cinnamon & Spices",
  },
  {
    slug: "traditional",
    label: "🕌 Traditional Attars — Ruh Gulab, Mitti & Khus",
  },
  {
    slug: "oud-oudh",
    label: "🖤 Oud / Oudh — Rich & Royal",
  },
  {
    slug: "musk",
    label: "🤍 Musk Attars — Soft, Clean & Long-Lasting",
  },
];

/* =========================================================
   GIFT LINKS
========================================================= */

const giftCollectionLinks = [
  { slug: "gucci-series", label: "Gucci Series" },
  { slug: "oud-series", label: "Oud Series" },
  { slug: "gold-series", label: "Gold Series" },
];

type NavLink = {
  slug: string;
  label: string;
};

type DropdownName = "attar" | "perfume" | "gifts";

/* =========================================================
   LOGO
========================================================= */

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="
        group
        flex
        min-w-0
        shrink-0
        items-center
        gap-2
        sm:gap-2.5
        md:gap-3
      "
    >
      <div
        className="
          grid
          h-10
          w-10
          shrink-0
          place-items-center
          overflow-hidden
          rounded-sm
          border
          border-gold/50
          bg-black
          shadow-lg
          shadow-black/40
          transition-all
          duration-300
          group-hover:border-gold

          sm:h-11
          sm:w-11

          md:h-12
          md:w-12

          lg:h-13
          lg:w-13

          xl:h-14
          xl:w-14
        "
      >
        <img
          src={logoImg}
          alt="Al Misbah Perfumes"
          className="
            block
            h-full
            w-full
            scale-[1.17]
            object-cover
            brightness-125
            contrast-105
            transition-all
            duration-500
            group-hover:scale-125
            group-hover:brightness-135
          "
        />
      </div>

      <span className="min-w-0 leading-none">
        <span
          className="
            block
            truncate
            font-display
            text-[16px]
            text-[#f5d76e]
            transition-colors
            duration-300
            group-hover:text-[#ffe9a3]

            sm:text-[18px]
            md:text-xl
            lg:text-[21px]
            xl:text-2xl
          "
        >
          المصباح
        </span>

        <span
          className="
            mt-1
            block
            truncate
            text-[7px]
            font-medium
            uppercase
            tracking-[0.1em]
            text-[#e8e2d8]

            sm:text-[8px]
            sm:tracking-[0.14em]

            md:text-[9px]
            md:tracking-[0.18em]

            lg:text-[10px]
            lg:tracking-[0.2em]

            xl:text-xs
            xl:tracking-[0.23em]
          "
        >
          Al Misbah Perfumes
        </span>
      </span>
    </Link>
  );
}

/* =========================================================
   DESKTOP DROPDOWN
========================================================= */

function Dropdown({
  name,
  label,
  links,
  openDropdown,
  setOpenDropdown,
}: {
  name: DropdownName;
  label: string;
  links: readonly NavLink[];
  openDropdown: DropdownName | null;
  setOpenDropdown: React.Dispatch<
    React.SetStateAction<DropdownName | null>
  >;
}) {
  const open = openDropdown === name;

  const handleToggle = () => {
    setOpenDropdown((current) => {
      if (current === name) {
        return null;
      }

      return name;
    });
  };

  return (
    <div className="relative py-2">
      {/* DROPDOWN BUTTON */}

      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        className="
          flex
          cursor-pointer
          items-center
          gap-1
          whitespace-nowrap
          py-2
          text-xs
          font-semibold
          uppercase
          tracking-[0.12em]
          text-foreground/90
          transition-all
          duration-300
          hover:text-gold

          lg:text-[12px]
          xl:text-[13px]
          2xl:text-sm
        "
      >
        {label}

        <ChevronDown
          className={`
            h-3.5
            w-3.5
            shrink-0
            text-gold
            transition-transform
            duration-300

            xl:h-4
            xl:w-4

            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* DROPDOWN MENU */}

      <div
        className={`
          absolute
          left-1/2
          top-full
          z-[100]
          w-[360px]
          max-w-[calc(100vw-32px)]
          -translate-x-1/2
          origin-top
          rounded-sm
          border
          border-border
          bg-[#0e0e0e]
          p-2
          shadow-2xl
          backdrop-blur-xl
          transition-all
          duration-300

          ${
            open
              ? "visible translate-y-0 scale-100 opacity-100"
              : "pointer-events-none invisible -translate-y-2 scale-95 opacity-0"
          }
        `}
      >
        {links.map((item) => (
          <Link
            key={item.slug}
            to="/series/$seriesName"
            params={{
              seriesName: item.slug,
            }}
            onClick={() => setOpenDropdown(null)}
            className="
              block
              rounded-sm
              px-4
              py-3
              text-xs
              font-medium
              leading-5
              tracking-wide
              text-foreground/85
              transition-all
              duration-200
              hover:translate-x-1
              hover:bg-white/[0.04]
              hover:text-gold

              xl:text-sm
            "
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE DROPDOWN
========================================================= */

function MobileDropdown({
  name,
  label,
  links,
  openDropdown,
  setOpenDropdown,
  closeMenu,
}: {
  name: DropdownName;
  label: string;
  links: readonly NavLink[];
  openDropdown: DropdownName | null;
  setOpenDropdown: React.Dispatch<
    React.SetStateAction<DropdownName | null>
  >;
  closeMenu: () => void;
}) {
  const open = openDropdown === name;

  const handleToggle = () => {
    setOpenDropdown((current) => {
      if (current === name) {
        return null;
      }

      return name;
    });
  };

  return (
    <div className="border-b border-border/40">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        className="
          flex
          min-h-[54px]
          w-full
          items-center
          justify-between
          gap-4
          py-4
          text-left
          text-sm
          font-semibold
          uppercase
          tracking-[0.15em]
          text-foreground/95
          transition-colors
          hover:text-gold

          sm:text-base
        "
      >
        <span>{label}</span>

        <ChevronDown
          className={`
            h-5
            w-5
            shrink-0
            text-gold
            transition-transform
            duration-300

            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
          grid
          transition-all
          duration-300

          ${
            open
              ? "grid-rows-[1fr] pb-4 opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div
            className="
              ml-1
              space-y-1
              border-l
              border-gold/40
              pl-4
            "
          >
            {links.map((item) => (
              <Link
                key={item.slug}
                to="/series/$seriesName"
                params={{
                  seriesName: item.slug,
                }}
                onClick={closeMenu}
                className="
                  block
                  rounded-sm
                  px-2
                  py-3
                  text-sm
                  leading-5
                  text-foreground/70
                  transition-all
                  duration-200
                  hover:translate-x-1
                  hover:bg-white/[0.03]
                  hover:text-gold
                  active:text-gold
                "
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  /*
    ONLY ONE DROPDOWN STATE

    null      = closed
    attar     = Attar open
    perfume   = Perfume open
    gifts     = Gifts open
  */

  const [openDropdown, setOpenDropdown] =
    useState<DropdownName | null>(null);

  const navbarRef = useRef<HTMLElement>(null);

  const { cartCount } = useCart();

  /* =======================================================
     CLOSE OUTSIDE
  ======================================================= */

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  /* =======================================================
     ESCAPE
  ======================================================= */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =======================================================
     CLOSE EVERYTHING
  ======================================================= */

  const closeEverything = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const toggleMobileMenu = () => {
    setMobileOpen((current) => !current);
    setOpenDropdown(null);
  };

  return (
    <header
      ref={navbarRef}
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-border/50
        bg-[#080808]/95
        shadow-lg
        shadow-black/20
        backdrop-blur-xl
      "
    >
      <nav
        className="
          mx-auto
          flex
          min-h-[62px]
          w-full
          max-w-[1600px]
          items-center
          justify-between
          gap-3
          px-3

          sm:min-h-[66px]
          sm:px-5

          md:min-h-[68px]
          md:px-7

          lg:min-h-[70px]
          lg:px-8

          xl:min-h-[72px]
          xl:px-10

          2xl:px-12
        "
      >
        <Logo onClick={closeEverything} />

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <div
          className="
            hidden
            items-center
            gap-4
            lg:flex
            xl:gap-5
            2xl:gap-7
          "
        >
          {/* HOME */}

          <Link
            to="/"
            activeOptions={{
              exact: true,
            }}
            onClick={closeEverything}
            activeProps={{
              className: "text-gold border-b border-gold",
            }}
            className="
              whitespace-nowrap
              border-b
              border-transparent
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-foreground/90
              transition-all
              duration-300
              hover:text-gold

              lg:text-[12px]
              xl:text-[13px]
              2xl:text-sm
            "
          >
            Home
          </Link>

          {/* ATTAR */}

          <Dropdown
            name="attar"
            label="Attar"
            links={attarLinks}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          {/* PERFUME */}

          <Dropdown
            name="perfume"
            label="Perfume"
            links={perfumeLinks}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          {/* GIFTS */}

          <Dropdown
            name="gifts"
            label="Gifts"
            links={giftCollectionLinks}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          {/* ABOUT */}

          <Link
            to="/about"
            onClick={closeEverything}
            activeProps={{
              className: "text-gold border-b border-gold",
            }}
            className="
              whitespace-nowrap
              border-b
              border-transparent
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-foreground/90
              transition-all
              duration-300
              hover:text-gold

              lg:text-[12px]
              xl:text-[13px]
              2xl:text-sm
            "
          >
            About Us
          </Link>

          {/* CONTACT */}

          <Link
            to="/contact"
            onClick={closeEverything}
            activeProps={{
              className: "text-gold border-b border-gold",
            }}
            className="
              whitespace-nowrap
              border-b
              border-transparent
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-foreground/90
              transition-all
              duration-300
              hover:text-gold

              lg:text-[12px]
              xl:text-[13px]
              2xl:text-sm
            "
          >
            Contact Us
          </Link>
        </div>

        {/* =================================================
            RIGHT ACTIONS
        ================================================= */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* CART */}

          <Link
            to="/cart"
            onClick={closeEverything}
            className="
              relative
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-sm
              border
              border-gold/40
              bg-black/50
              text-gold
              transition-all
              duration-300
              hover:border-gold
              hover:bg-white/[0.04]
              hover:text-[#ffe9a3]

              sm:h-11
              sm:w-11
            "
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[#f5d76e]
                  px-1
                  text-[10px]
                  font-bold
                  text-black
                "
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE MENU */}

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={toggleMobileMenu}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-sm
              border
              border-gold/40
              bg-black/50
              text-gold
              shadow-lg
              transition-all
              duration-300
              hover:border-gold
              hover:bg-white/[0.04]
              active:scale-95

              lg:hidden

              sm:h-11
              sm:w-11
            "
          >
            {mobileOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      <div
        className={`
          overflow-hidden
          border-t
          border-border/40
          bg-[#080808]/98
          backdrop-blur-2xl
          transition-all
          duration-500
          ease-in-out
          lg:hidden

          ${
            mobileOpen
              ? "max-h-[calc(100dvh-62px)] opacity-100 shadow-2xl sm:max-h-[calc(100dvh-66px)]"
              : "pointer-events-none max-h-0 opacity-0"
          }
        `}
      >
        <div
          className="
            max-h-[calc(100dvh-62px)]
            overflow-y-auto
            overscroll-contain
            px-4
            py-2

            sm:max-h-[calc(100dvh-66px)]
            sm:px-6
            sm:py-4
          "
        >
          {/* HOME */}

          <Link
            to="/"
            activeOptions={{
              exact: true,
            }}
            activeProps={{
              className: "text-gold",
            }}
            onClick={closeEverything}
            className="
              flex
              min-h-[54px]
              items-center
              border-b
              border-border/40
              py-4
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-foreground/95
              transition-colors
              hover:text-gold

              sm:text-base
            "
          >
            Home
          </Link>

          {/* ATTAR */}

          <MobileDropdown
            name="attar"
            label="Attar"
            links={attarLinks}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            closeMenu={closeEverything}
          />

          {/* PERFUME */}

          <MobileDropdown
            name="perfume"
            label="Perfume"
            links={perfumeLinks}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            closeMenu={closeEverything}
          />

          {/* GIFTS */}

          <MobileDropdown
            name="gifts"
            label="Gifts"
            links={giftCollectionLinks}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            closeMenu={closeEverything}
          />

          {/* ABOUT */}

          <Link
            to="/about"
            onClick={closeEverything}
            className="
              flex
              min-h-[54px]
              items-center
              border-b
              border-border/40
              py-4
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-foreground/95
              transition-colors
              hover:text-gold

              sm:text-base
            "
          >
            About Us
          </Link>

          {/* CONTACT */}

          <Link
            to="/contact"
            onClick={closeEverything}
            className="
              flex
              min-h-[54px]
              items-center
              border-b
              border-border/40
              py-4
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-foreground/95
              transition-colors
              hover:text-gold

              sm:text-base
            "
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}