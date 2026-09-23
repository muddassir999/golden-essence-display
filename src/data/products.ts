import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import Series3 from "@/assets/Gemini_Generated_Image_4umgld4umgld4umg.png";
import image1 from "@/assets/image11.jpeg";
import image2 from "@/assets/image12.jpeg";
import image3 from "@/assets/image13.jpeg";
import image4 from "@/assets/image14.jpeg";
import image5 from "@/assets/image15.jpeg";
import image6 from "@/assets/ex.png";

import flora from "@/assets/flora.png";
import bamboo from "@/assets/guccibamboo.png";
import mogra from "@/assets/mogra.png";
import dove from "@/assets/dove.png";
import david from "@/assets/davidoffcool.png";
import choclate from "@/assets/choclate.png";
import charlie from "@/assets/charlie.png";
import coolwater from "@/assets/coolwater.png";
import purpleoud from "@/assets/purpleoud.jpeg";
import whiteoud from "@/assets/whiteoud.png";
import cr7 from "@/assets/cr7.png";
import omaniapink from "@/assets/omaniapink.png";
import guccioud from "@/assets/guccioud.png";
import shanaya from "@/assets/shanaya.png";
import paris from "@/assets/paris.png";
import guilty from "@/assets/gucciguilty.png";
import signature from "@/assets/signature.png";
import kesarchandan from "@/assets/kesarchandan.png";
import swiss from "@/assets/swissmarine.png";
import iceberg from "@/assets/iceberg.png";
import jannatulfirdous from "@/assets/jannatulfirdaus.png";
import rush from "@/assets/rush.png";
import poud from "@/assets/poud.png";
import marine from "@/assets/marine.png";
import kesarchands from "@/assets/kesarchandans.png";
import ice from "@/assets/icebergs.png";
import charlioe from "@/assets/charlies.png";
import jannat from "@/assets/jannatul.png";
import shan from "@/assets/shanayas.png";

interface Product {
  id?: string | number;
  name: string;
  arabic: string;
  price: string;
  notes: string;
  image: string;

  rating?: number;
  reviews?: number;
  discount?: number;
  mrp?: string;

  // =========================================================
  // STOCK
  // 0 = OUT OF STOCK
  // 1+ = AVAILABLE
  // =========================================================
  stock?: number;

  series: string;
}

export const seriesMap: Record<
  string,
  {
    title: string;
    arabic: string;
    blurb: string;
    comingSoon?: boolean;
  }
> = {
  "royal-oud": {
    title: "Royal OUD Series",
    arabic: "العود الملكي",
    blurb:
      "Aged Cambodian and Hindi oud, distilled slowly and matured in oak for a smoke-rich, regal trail.",
    comingSoon: true,
  },

  "signature-edp": {
    title: "Signature EDP",
    arabic: "التوقيع",
    blurb:
      "Our house eau de parfum compositions — modern, radiant and built for long wear.",
    comingSoon: true,
  },

  "woody-collection": {
    title: "Woody Collection",
    arabic: "العطور الخشبية",
    blurb:
      "Sandalwood, cedar and vetiver layered over warm resins for a grounded, refined signature.",
    comingSoon: true,
  },

  floral: {
    title: "Floral Attars",
    arabic: "العطور الزهرية",
    blurb:
      "Elegant floral attars inspired by rose, jasmine and mogra, crafted for a refined and naturally expressive fragrance trail.",
    comingSoon: false,
  },

  fresh: {
    title: "Fresh Attars",
    arabic: "العطور المنعشة",
    blurb:
      "Refreshing attars with aqua, citrus and green accords, created for a clean, vibrant and uplifting fragrance experience.",
    comingSoon: false,
  },

  woody: {
    title: "Woody Attars",
    arabic: "العطور الخشبية",
    blurb:
      "Rich woody attars blending oud, sandalwood and cedar into a warm, sophisticated and timeless oriental signature.",
    comingSoon: false,
  },

  sweet: {
    title: "Sweet Attars",
    arabic: "العطور الحلوة",
    blurb:
      "Luscious attars featuring vanilla, musk and amber, balanced into a warm, smooth and luxurious fragrance profile.",
    comingSoon: false,
  },

  spicy: {
    title: "Spiced Attars",
    arabic: "العطور المتبلة",
    blurb:
      "Distinctive spicy attars enriched with saffron, cinnamon and oriental spices for a bold and captivating fragrance trail.",
    comingSoon: true,
  },

  traditional: {
    title: "Traditional Attars",
    arabic: "العطور التقليدية",
    blurb:
      "Timeless traditional attars inspired by Ruh Gulab, Mitti and Khus, preserving the heritage of classic Indian and Arabian perfumery.",
    comingSoon: false,
  },

  "oud-oudh": {
    title: "Oud / Oudh Collection",
    arabic: "مجموعة العود",
    blurb:
      "Powerful and regal oud compositions crafted around rich woody, smoky and resinous accords for an unmistakably royal signature.",
    comingSoon: false,
  },

  musk: {
    title: "Musk Attars",
    arabic: "عطور المسك",
    blurb:
      "Soft and elegant musk attars with clean, smooth and long-lasting character, designed for effortless everyday luxury.",
    comingSoon: true,
  },

  "traditional-al-musk": {
    title: "Traditional Al-Musk",
    arabic: "المسك التقليدي",
    blurb:
      "White musk attars crafted in the classical Arabian method — soft, clean and enduring.",
    comingSoon: false,
  },

  "concentrated-oil-series": {
    title: "Concentrated Oil Series",
    arabic: "الزيوت المركزة",
    blurb:
      "Undiluted, alcohol-free perfume oils. A single drop carries through the day.",
    comingSoon: false,
  },

  "floral-attars": {
    title: "Floral Attars",
    arabic: "العطور الزهرية",
    blurb:
      "Taif rose, jasmine sambac and saffron blossom — steam-distilled botanical purity.",
    comingSoon: false,
  },

  "gucci-series": {
    title: "Gucci Gift Series",
    arabic: "سلسلة جوشي الفاخرة",
    blurb:
      "A curated ensemble of 5 signature artisanal oils blending modern luxury with oriental warmth.",
    comingSoon: true,
  },

  "oud-series": {
    title: "Oud Gift Series",
    arabic: "سلسلة العود الملكي",
    blurb:
      "A majestic collection featuring 5 pure oud extracts in a hand-crafted presentation box.",
    comingSoon: true,
  },

  "gold-series": {
    title: "Gold Gift Series",
    arabic: "سلسلة الذهب الخالص",
    blurb:
      "The pinnacle of gifting: 5 rare, highly-concentrated oil vials infused with golden notes.",
    comingSoon: true,
  },
};

/* =========================================================
   PRODUCTS
========================================================= */

export const products: Product[] = [
  /* =========================================================
     PERFUME PRODUCTS
  ========================================================= */

  {
    id: "1",
    name: "Oud Malaki",
    arabic: "عود ملكي",
    notes: "Cambodian Oud · Saffron · Amber",
    price: "₹ 8,900",
    image: product1,
    series: "royal-oud",
    stock: 10,
  },

  {
    id: "2",
    name: "Sultan Al Layl",
    arabic: "سلطان الليل",
    notes: "Hindi Oud · Leather · Incense",
    price: "₹ 12,400",
    image: product2,
    series: "royal-oud",
    stock: 10,
  },

  {
    id: "3",
    name: "Misbah Noir",
    arabic: "مصباح نوار",
    notes: "Bergamot · Tobacco · Vanilla",
    price: "₹ 6,200",
    image: product1,
    series: "signature-edp",
    stock: 10,
  },

  {
    id: "4",
    name: "Nur Al Sharq",
    arabic: "نور الشرق",
    notes: "Rose · Patchouli · Musk",
    price: "₹ 5,700",
    image: product2,
    series: "signature-edp",
    stock: 10,
  },

  {
    id: "5",
    name: "Sandal Royale",
    arabic: "صندل",
    notes: "Mysore Sandalwood · Cedar",
    price: "₹ 7,300",
    image: product2,
    series: "woody-collection",
    stock: 10,
  },

  {
    id: "6",
    name: "Vetiver Majlis",
    arabic: "مجلس",
    notes: "Vetiver · Dry Woods · Tonka",
    price: "₹ 4,950",
    image: product1,
    series: "woody-collection",
    stock: 10,
  },

  /* =========================================================
     FLORAL
  ========================================================= */

  {
    id: "a-floral-1",
    name: "Gucci Flora",
    arabic: "غوتشي فلورا",
    notes: "Floral Notes",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 2288,
    image: flora,
    series: "floral",
    stock: 10,
  },

  {
    id: "a-floral-2",
    name: "Gucci Bamboo",
    arabic: "غوتشي بامبو",
    notes: "Floral · Fresh Green Notes",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 1112,
    image: bamboo,
    series: "floral",
    stock: 10,
  },

  {
    id: "a-floral-3",
    name: "Dove",
    arabic: "دوف",
    notes: "Fresh · Floral Accord",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 2261,
    image: dove,
    series: "floral",
    stock: 10,
  },

  {
    id: "a-floral-4",
    name: "Mogra",
    arabic: "موجرا",
    notes: "Pure Mogra · White Flowers",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 2901,
    image: mogra,
    series: "floral",
    stock: 10,
  },

  /* =========================================================
     SWEET
  ========================================================= */

  {
    id: "a-sweet-1",
    name: "Chocolate",
    arabic: "شوكولاتة",
    notes: "Rich Chocolate · Sweet Gourmand",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 1821,
    image: choclate,
    series: "sweet",
    stock: 10,
  },

  {
    id: "a-sweet-2",
    name: "Shanaya",
    arabic: "شانايا",
    notes: "Floral · Sweet Notes",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 1031,
    image: shan,
    series: "sweet",
    stock: 10,
  },

  {
    id: "a-sweet-3",
    name: "Gucci Paris",
    arabic: "غوتشي باريس",
    notes: "Floral · Sweet Rose",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 982,
    image: paris,
    series: "sweet",
    stock: 10,
  },

  /* =========================================================
     OUD
  ========================================================= */

  {
    id: "a-oud-1",
    name: "Gucci Oud",
    arabic: "عود غوتشي",
    notes: "Oud · Woody Notes",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 661,
    image: guccioud,
    series: "oud-oudh",
    stock: 10,
  },

  {
    id: "a-oud-2",
    name: "Purple Oud",
    arabic: "العود البنفسجي",
    notes: "Rich Oud · Woody Accord",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 241,
    image: poud,
    series: "oud-oudh",
    stock: 10,
  },

  {
    id: "a-oud-3",
    name: "White Oud",
    arabic: "العود الأبيض",
    notes: "Soft Oud · Woody Musk",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 772,
    image: whiteoud,
    series: "oud-oudh",
    stock: 10,
  },

  /* =========================================================
     WOODY
  ========================================================= */

  {
    id: "a-woody-1",
    name: "Gucci Guilty",
    arabic: "غوتشي غيلتي",
    notes: "Woody · Floral Notes",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 732,
    image: guilty,
    series: "woody",
    stock: 10,
  },

  {
    id: "a-woody-2",
    name: "Kesar Chandan",
    arabic: "كيسार تشاندان",
    notes: "Woody · Sandalwood · Saffron",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 3000,
    image: kesarchands,
    series: "woody",
    stock: 10,
  },

  {
    id: "a-woody-3",
    name: "Signature",
    arabic: "سيغتشر",
    notes: "Woody · Musky Notes",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 3343,
    image: signature,
    series: "woody",
    stock: 10,
  },

  /* =========================================================
     FRESH
  ========================================================= */

  {
    id: "a-fresh-1",
    name: "CR7",
    arabic: "سي آر 7",
    notes: "Fresh · Woody Notes",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 993,
    image: cr7,
    series: "fresh",
    stock: 10,
  },

  {
    id: "a-fresh-2",
    name: "Ice Berg",
    arabic: "آيس بيرغ",
    notes: "Fresh · Aquatic Marine",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 1832,
    image: ice,
    series: "fresh",
    stock: 10,
  },

  {
    id: "a-fresh-3",
    name: "Cool Water",
    arabic: "كول ووتر",
    notes: "Fresh · Aquatic Breeze",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 2961,
    image: coolwater,
    series: "fresh",
    stock: 10,
  },

  {
    id: "a-fresh-4",
    name: "David of Cool",
    arabic: "ديفيد أوف كول",
    notes: "Fresh · Cool Aquatic",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 20000,
    image: david,
    series: "fresh",
    stock: 10,
  },

  {
    id: "a-fresh-5",
    name: "Swiss Marine",
    arabic: "سويس مارين",
    notes: "Fresh · Oceanic Aquatic",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 22661,
    image: marine,
    series: "fresh",
    stock: 10,
  },

  /* =========================================================
     FLORAL / FRUITY / HERBAL
  ========================================================= */

  {
    id: "a-fruity-1",
    name: "Charlie",
    arabic: "شارلي",
    notes: "Floral · Fruity Notes",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 13661,
    image: charlioe,
    series: "floral",
    stock: 10,
  },

  {
    id: "a-fruity-2",
    name: "Jannatul Firdous",
    arabic: "جنة الفردوس",
    notes: "Floral · Herbal Notes",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 34661,
    image: jannat,
    series: "traditional",
    stock: 10,
  },

  {
    id: "a-fruity-3",
    name: "Omnia Pink",
    arabic: "أومنيا بينك",
    notes: "Floral · Fruity Strawberry",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 9681,
    image: omaniapink,
    series: "floral",
    stock: 10,
  },

  {
    id: "a-fruity-4",
    name: "Gucci Rush",
    arabic: "غوتشي راش",
    notes: "Floral · Fruity Accord",
    price: "₹ 300",
    mrp: "₹ 350",
    discount: 14,
    rating: 4.5,
    reviews: 8975,
    image: rush,
    series: "floral",
    stock: 10,
  },

  /* =========================================================
     EXISTING ATTAR COLLECTIONS
  ========================================================= */

  {
    id: "7",
    name: "Musk Al Abyad",
    arabic: "مسك أبيض",
    notes: "White Musk · Powder · Amber",
    price: "₹ 3,400",
    image: image4,
    series: "traditional-al-musk",
    stock: 10,
  },

  {
    id: "8",
    name: "Musk Tahara",
    arabic: "مسك طهارة",
    notes: "Soft Musk · Cotton · Iris",
    price: "₹ 2,850",
    image: image5,
    series: "traditional-al-musk",
    stock: 10,
  },

  {
    id: "13",
    name: "Musk Tahara Premium",
    arabic: "مسك طهارة",
    notes: "Soft Musk · Cotton · Iris",
    price: "₹ 2,850",
    image: image4,
    series: "traditional-al-musk",
    stock: 10,
  },

  {
    id: "9",
    name: "Dehn Al Oud",
    arabic: "دهن العود",
    notes: "Pure Oud Oil · Smoke · Resin",
    price: "₹ 15,600",
    image: image5,
    series: "concentrated-oil-series",
    stock: 10,
  },

  {
    id: "10",
    name: "Amber Concentré",
    arabic: "عنبر",
    notes: "Amber · Labdanum · Benzoin",
    price: "₹ 6,800",
    image: image4,
    series: "concentrated-oil-series",
    stock: 10,
  },

  {
    id: "11",
    name: "Ward Taifi",
    arabic: "ورد طائفي",
    notes: "Taif Rose · Honey · Geranium",
    price: "₹ 9,200",
    image: image5,
    series: "floral-attars",
    stock: 10,
  },

  {
    id: "12",
    name: "Yasmeen Sambac",
    arabic: "ياسمين",
    notes: "Jasmine Sambac · Neroli",
    price: "₹ 5,100",
    image: image4,
    series: "floral-attars",
    stock: 10,
  },

  /* =========================================================
     GIFT SERIES
  ========================================================= */

  {
    id: "g1-1",
    name: "Gucci Flora Attar",
    arabic: "عطر جوشي فلورا",
    notes: "Peony · Mandarin · Rose",
    price: "₹ 6,500",
    image: Series3,
    series: "gucci-series",
    stock: 10,
  },

  {
    id: "g2-1",
    name: "Cambodian Oud Elixir",
    arabic: "إكسير العود الكمبودي",
    notes: "Aged Cambodian Wood · Smoke",
    price: "₹ 14,000",
    image: Series3,
    series: "oud-series",
    stock: 10,
  },

  {
    id: "g3-1",
    name: "Golden Saffron Oil",
    arabic: "زيت الزعفران الذهبي",
    notes: "Pure Kashmiri Saffron · Spices",
    price: "₹ 9,500",
    image: Series3,
    series: "gold-series",
    stock: 10,
  },
];

/* =========================================================
   BEST SELLERS
========================================================= */

export const bestSellers = [
  "a-woody-2",
  "a-oud-3",
  "a-fresh-1",
  "a-fresh-4",
].map((id) => products.find((p) => p.id === id)!);