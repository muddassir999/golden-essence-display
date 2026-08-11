# Al Misbah Perfumes

Build a fully responsive luxury e-commerce and showcase web application named "Al Misbah Perfume" using React.js (JSX), Tailwind CSS, and React Router DOM.

### Core Theme & Branding Guidelines

- Aesthetic: Extremely premium, elegant, and luxurious suitable for a high-end oriental fragrance brand.

- Color Palette (Strict): Dominate with deep charcoal/black backgrounds (bg-black, bg-neutral-950). Use rich, metallic gold for all accents, buttons, text highlights, and borders (text-amber-400, border-amber-500, bg-amber-500). Primary text should be off-white or light gray for readability.

- Styling: Fully styled with Tailwind CSS, smooth transitions, professional hover effects on product cards, custom gold scrollbars, and subtle glassmorphism effects on dropdowns.

### Logo & Branding Integration

- In the Navbar (far left), create a custom luxury logo box featuring an Arabic calligraphy icon or stylized text block for "المصباح" over "AL MISBAH PERFUMES" in metallic gold font with a dark, premium border and glow effect.

### Core Architecture & Routing (React Router DOM)

- Wrap the application with `BrowserRouter` in `App.jsx`.

- Set up clean routing for the following pages:

  1. Home ('/')

  2. About Us ('/about')

  3. Contact Us ('/contact')

  4. Dynamic Series Page ('/series/:seriesName')

### Navigation Bar (Navbar) Requirements

- Sticky Navbar: Dark background with gold trim and backdrop blur.

- Logo on the left.

- Navigation Links (Desktop & Mobile responsive):

  - Home

  - Perfume Dropdown: On hover/click, opens a luxury dropdown menu with options like *Royal OUD Series*, *Signature EDP*, and *Woody Collection*. Clicking navigates to the respective Series Page.

  - Attar Dropdown: On hover/click, opens a luxury dropdown menu with options like *Traditional Al-Musk*, *Concentrated Oil Series*, and *Floral Attars*. Clicking navigates to the Series Page.

  - About Us

  - Contact Us

- Mobile Menu: Fully responsive hamburger menu drawer that expands smoothly on smaller screens, adhering strictly to the black-and-gold luxury aesthetic.

### Page Specifications

1. Home ('Home.jsx'):

   - Hero Section: Dark background banner with luxury imagery, gold heading ("The Essence of Royalty"), subtitle, and a prominent gold-filled CTA button ("Explore Collection").

   - Features Bar: Highlights like 100% Alcohol-Free, Royal Craftsmanship, and Express Shipping.

   - Featured Categories: Two distinct visual cards (Perfume Series & Attar Series) with rich background images and gold borders.

   - Best-sellers Showcase: Grid of product cards with black background, gold borders, fragrance notes, prices in gold, and "Inquire / Buy" buttons.

2. About ('About.jsx'):

   - Brand story of Al Misbah, heritage of oriental perfumery, dedication to pure botanical/oud extracts, and commitment to quality. Include gold accent dividers.

3. Contact ('Contact.jsx'):

   - Professional contact form with gold input borders, Name, Email, Message fields, and a gold submit button with success state handling.

   - Store details (Mumbai location, phone, and support email).

4. Series Page ('SeriesPage.jsx'):

   - Dynamic page reading URL parameters (`:seriesName`), displaying a filtered grid of luxury products matching that specific collection with smooth routing back home.

### Footer

- Luxurious dark footer with quick links, category navigation links, brand summary, store location details, and copyright notice.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5b5e528d-cc6f-4b6a-a39d-45dce9afc3f5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
