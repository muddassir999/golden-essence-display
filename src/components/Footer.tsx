import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone } from "lucide-react";
import instagramQr from "../assets/qr.png";

/* =========================================================
   FOOTER
========================================================= */

export function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-gold/50
        bg-[#222222]
        text-white
        shadow-2xl
      "
    >
      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-28
          w-[70%]
          -translate-x-1/2
          bg-gold/10
          blur-[100px]
          sm:h-32
        "
      />

      {/* =====================================================
          FOOTER CONTENT
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          gap-9
          px-5
          py-12

          sm:gap-10
          sm:px-6
          sm:py-14

          md:grid-cols-2
          md:gap-x-10
          md:gap-y-12
          md:px-8

          lg:grid-cols-4
          lg:gap-9
          lg:px-8
          lg:py-16

          xl:gap-12
          xl:px-10
          xl:py-18

          2xl:gap-14
        "
      >
        {/* ===================================================
            BRAND
        =================================================== */}

        <div className="min-w-0">
          <p
            className="
              font-display
              text-4xl
              leading-none
              text-gold
              sm:text-5xl
              lg:text-[52px]
              xl:text-6xl
            "
          >
            المصباح
          </p>

          <p
            className="
              mt-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-gold/90
              sm:text-xs
              sm:tracking-[0.28em]
              lg:text-[11px]
              lg:tracking-[0.25em]
            "
          >
            Al Misbah Perfumes
          </p>

          <p
            className="
              mt-4
              max-w-md
              text-sm
              font-light
              leading-6
              text-gray-300
              sm:text-base
              sm:leading-7
              lg:text-[15px]
              lg:leading-7
              xl:text-base
            "
          >
            Alcohol-free oriental fragrances, distilled from pure oud,
            Taif rose and botanical musk in the tradition of Arabian
            perfumery.
          </p>
        </div>

        {/* ===================================================
            QUICK LINKS
        =================================================== */}

        <FooterColumn title="Quick Links">
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterColumn>

        {/* ===================================================
            COLLECTIONS
        =================================================== */}

        <FooterColumn title="Collections">

            <FooterSeriesLink
            slug="traditional"
            label="Traditional Al-Musk"
          />

          <FooterSeriesLink
            slug="floral"
            label="Floral Attars"
          />
          <FooterSeriesLink
            slug="royal-oud"
            label="Royal OUD Series"
          />

          <FooterSeriesLink
            slug="signature-edp"
            label="Signature EDP"
          />

          <FooterSeriesLink
            slug="woody-collection"
            label="Woody Collection"
          />

        
        </FooterColumn>

        {/* ===================================================
            CONNECT WITH US
        =================================================== */}

        <div className="min-w-0">
          <h3
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-gold
              sm:text-sm
              sm:tracking-[0.28em]
            "
          >
            Connect With Us
          </h3>

          <address
            className="
              mt-5
              space-y-4
              text-sm
              font-light
              leading-6
              text-gray-300
              not-italic

              sm:mt-6
              sm:text-base
              sm:leading-7

              lg:text-[15px]
              xl:text-base
            "
          >
            {/* =================================================
                PHONE
            ================================================= */}

            <a
              href="tel:+919372379191"
              className="
                flex
                min-w-0
                items-start
                gap-3
                transition-colors
                duration-300
                hover:text-gold
              "
            >
              <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" />

              <span className="break-words">
                +91 93723 79191 / +91 96199 77601
              </span>
            </a>

            {/* =================================================
                EMAIL
            ================================================= */}

            <a
              href="mailto:almisbahfragrances@gmail.com"
              className="
                flex
                min-w-0
                items-start
                gap-3
                transition-colors
                duration-300
                hover:text-gold
              "
            >
              <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" />

              <span className="min-w-0 break-all sm:break-words">
                almisbahfragrances@gmail.com
              </span>
            </a>

            {/* =================================================
                INSTAGRAM
            ================================================= */}

            <a
              href="https://www.instagram.com/almisbah_fragrances"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                min-w-0
                items-center
                gap-3
                transition-colors
                duration-300
                hover:text-gold
              "
            >
              <Instagram className="h-4 w-4 shrink-0 text-gold" />

              <span className="break-words">
                @almisbah_fragrances
              </span>
            </a>
          </address>

          {/* =================================================
              INSTAGRAM QR CODE
          ================================================= */}

          <div
            className="
              mt-7
              w-fit
              rounded-2xl
              border
              border-gold/40
              bg-[#141414]
              p-3
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-gold
              hover:shadow-[0_10px_35px_rgba(212,175,55,0.18)]
            "
          >
            <a
              href="https://www.instagram.com/almisbah_fragrances"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Al Misbah Fragrances Instagram"
              className="block"
            >
              <img
                src={instagramQr}
                alt="Scan to follow Al Misbah Fragrances on Instagram"
                className="
                  block
                  h-[140px]
                  w-[140px]
                  rounded-xl
                  bg-white
                  object-contain
                  p-2

                  sm:h-[150px]
                  sm:w-[150px]
                "
              />
            </a>

            <p
              className="
                mt-3
                text-center
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-gold
              "
            >
              Scan & Follow
            </p>

            <p
              className="
                mt-1
                text-center
                text-[9px]
                text-gray-500
              "
            >
              @almisbah_fragrances
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          DIVIDER
      ===================================================== */}

      <div
        className="
          h-px
          bg-gradient-to-r
          from-transparent
          via-gold/40
          to-transparent
        "
      />

      {/* =====================================================
          COPYRIGHT
      ===================================================== */}

      <div
        className="
          bg-[#141414]
          px-4
          py-5
          sm:px-6
          sm:py-6
        "
      >
        <p
          className="
            mx-auto
            max-w-4xl
            text-center
            text-[8px]
            font-medium
            leading-5
            tracking-[0.13em]
            text-gray-400

            sm:text-xs
            sm:tracking-[0.2em]

            md:text-[13px]
            md:tracking-[0.22em]
          "
        >
          © {new Date().getFullYear()} AL MISBAH PERFUMES — ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}

/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <h3
        className="
          text-xs
          font-semibold
          uppercase
          tracking-[0.25em]
          text-gold
          sm:text-sm
          sm:tracking-[0.28em]
        "
      >
        {title}
      </h3>

      <div
        className="
          mt-5
          flex
          flex-col
          gap-3
          sm:mt-6
          sm:gap-3.5
        "
      >
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   NORMAL FOOTER LINK
========================================================= */

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="
        group
        flex
        w-fit
        items-center
        gap-2
        text-sm
        text-gray-300
        transition-all
        duration-300
        hover:translate-x-1
        hover:text-gold
        sm:text-base
        lg:text-[15px]
        xl:text-base
      "
    >
      <span
        className="
          text-gold/60
          transition-colors
          duration-300
          group-hover:text-gold
        "
      >
        ›
      </span>

      <span>{children}</span>
    </Link>
  );
}

/* =========================================================
   SERIES FOOTER LINK
========================================================= */

function FooterSeriesLink({
  slug,
  label,
}: {
  slug: string;
  label: string;
}) {
  return (
    <Link
      to="/series/$seriesName"
      params={{
        seriesName: slug,
      }}
      className="
        group
        flex
        w-fit
        max-w-full
        items-start
        gap-2
        text-sm
        leading-6
        text-gray-300
        transition-all
        duration-300
        hover:translate-x-1
        hover:text-gold
        sm:text-base
        sm:leading-7
        lg:text-[15px]
        xl:text-base
      "
    >
      <span
        className="
          shrink-0
          text-gold/60
          transition-colors
          duration-300
          group-hover:text-gold
        "
      >
        ›
      </span>

      <span className="break-words">
        {label}
      </span>
    </Link>
  );
}