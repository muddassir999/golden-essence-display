import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import Series3 from "@/assets/Gemini_Generated_Image_4umgld4umgld4umg.png";
import image1 from "@/assets/image11.jpeg";
import image2 from "@/assets/image12.jpeg";
import image3 from "@/assets/image13.jpeg";
import image4 from "@/assets/image14.jpeg";
import image5 from "@/assets/image15.jpeg";
import image6 from "@/assets/ex.png";
export type Product = {
  id: string;
  name: string;
  arabic: string;
  notes: string;
  price: string;
  image: string;
  series: string;
};
export const seriesMap: Record<
  string,
  { title: string; arabic: string; blurb: string; comingSoon?: boolean }
> = {
  /* ========================================================= PERFUME SERIES — COMING SOON ========================================================= */ "royal-oud":
    {
      title: "Royal OUD Series",
      arabic: "العود الملكي",
      blurb:
        "Aged Cambodian and Hindi oud, distilled slowly and matured in oak for a smoke-rich, regal trail.",
      comingSoon: true,
    },
  "signature-edp": {
    title: "Signature EDP",
    arabic: "التوقيع",
    blurb: "Our house eau de parfum compositions — modern, radiant and built for long wear.",
    comingSoon: true,
  },
  "woody-collection": {
    title: "Woody Collection",
    arabic: "العطور الخشبية",
    blurb:
      "Sandalwood, cedar and vetiver layered over warm resins for a grounded, refined signature.",
    comingSoon: true,
  },
  /* ========================================================= ATTAR SERIES — AVAILABLE ========================================================= */ floral:
    {
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
    comingSoon: false,
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
    comingSoon: false,
  },
  /* ========================================================= EXISTING ATTAR COLLECTIONS ========================================================= */ "traditional-al-musk":
    {
      title: "Traditional Al-Musk",
      arabic: "المسك التقليدي",
      blurb:
        "White musk attars crafted in the classical Arabian method — soft, clean and enduring.",
      comingSoon: false,
    },
  "concentrated-oil-series": {
    title: "Concentrated Oil Series",
    arabic: "الزيوت المركزة",
    blurb: "Undiluted, alcohol-free perfume oils. A single drop carries through the day.",
    comingSoon: false,
  },
  "floral-attars": {
    title: "Floral Attars",
    arabic: "العطور الزهرية",
    blurb: "Taif rose, jasmine sambac and saffron blossom — steam-distilled botanical purity.",
    comingSoon: false,
  },
  /* ========================================================= GIFT SERIES — COMING SOON ========================================================= */ "gucci-series":
    {
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
/* ========================================================= PRODUCTS ========================================================= */ export const products: Product[] =
  [
    /* ========================================================= PERFUME PRODUCTS These products are kept in data but the series pages show Coming Soon because seriesMap has comingSoon: true. ========================================================= */ {
      id: "1",
      name: "Oud Malaki",
      arabic: "عود ملكي",
      notes: "Cambodian Oud · Saffron · Amber",
      price: "₹ 8,900",
      image: product1,
      series: "royal-oud",
    },
    {
      id: "2",
      name: "Sultan Al Layl",
      arabic: "سلطان الليل",
      notes: "Hindi Oud · Leather · Incense",
      price: "₹ 12,400",
      image: product2,
      series: "royal-oud",
    },
    {
      id: "3",
      name: "Misbah Noir",
      arabic: "مصباح نوار",
      notes: "Bergamot · Tobacco · Vanilla",
      price: "₹ 6,200",
      image: product1,
      series: "signature-edp",
    },
    {
      id: "4",
      name: "Nur Al Sharq",
      arabic: "نور الشرق",
      notes: "Rose · Patchouli · Musk",
      price: "₹ 5,700",
      image: product2,
      series: "signature-edp",
    },
    {
      id: "5",
      name: "Sandal Royale",
      arabic: "صندل",
      notes: "Mysore Sandalwood · Cedar",
      price: "₹ 7,300",
      image: product2,
      series: "woody-collection",
    },
    {
      id: "6",
      name: "Vetiver Majlis",
      arabic: "مجلس",
      notes: "Vetiver · Dry Woods · Tonka",
      price: "₹ 4,950",
      image: product1,
      series: "woody-collection",
    },
    /* ========================================================= ATTAR — FLORAL 2 PRODUCTS ========================================================= */ {
      id: "a-floral-1",
      name: "Gulab Royale",
      arabic: "جولاب رويال",
      notes: "Rose · Jasmine · Soft Musk",
      price: "₹ 2,900",
      image: image4,
      series: "floral",
    },
    {
      id: "a-floral-2",
      name: "Mogra Essence",
      arabic: "خلاصة الموجرا",
      notes: "Mogra · White Flowers · Amber",
      price: "₹ 3,200",
      image: image5,
      series: "floral",
    },
    /* ========================================================= ATTAR — FRESH 2 PRODUCTS ========================================================= */ {
      id: "a-fresh-1",
      name: "Aqua Mist",
      arabic: "أكوا ميست",
      notes: "Aqua · Citrus · Green Notes",
      price: "₹ 2,500",
      image: image4,
      series: "fresh",
    },
    {
      id: "a-fresh-2",
      name: "Citrus Breeze",
      arabic: "نسيم الحمضيات",
      notes: "Bergamot · Lemon · Green Accord",
      price: "₹ 2,700",
      image: image5,
      series: "fresh",
    },
    /* ========================================================= ATTAR — WOODY 2 PRODUCTS ========================================================= */ {
      id: "a-woody-1",
      name: "Sandal Royale",
      arabic: "صندل رويال",
      notes: "Mysore Sandalwood · Cedar · Amber",
      price: "₹ 3,800",
      image: image4,
      series: "woody",
    },
    {
      id: "a-woody-2",
      name: "Oud Cedar",
      arabic: "عود الأرز",
      notes: "Oud · Cedarwood · Resin",
      price: "₹ 4,200",
      image: image5,
      series: "woody",
    },
    /* ========================================================= ATTAR — SWEET 2 PRODUCTS ========================================================= */ {
      id: "a-sweet-1",
      name: "Vanilla Royale",
      arabic: "فانيلا رويال",
      notes: "Vanilla · Amber · Soft Musk",
      price: "₹ 2,800",
      image: image4,
      series: "sweet",
    },
    {
      id: "a-sweet-2",
      name: "Golden Amber",
      arabic: "العنبر الذهبي",
      notes: "Amber · Vanilla · Benzoin",
      price: "₹ 3,400",
      image: image5,
      series: "sweet",
    },
    /* ========================================================= ATTAR — SPICED 2 PRODUCTS ========================================================= */ {
      id: "a-spicy-1",
      name: "Royal Saffron",
      arabic: "الزعفران الملكي",
      notes: "Kashmiri Saffron · Oud · Amber",
      price: "₹ 4,500",
      image: image4,
      series: "spicy",
    },
    {
      id: "a-spicy-2",
      name: "Cinnamon Oud",
      arabic: "قرفة وعود",
      notes: "Cinnamon · Oud · Spices",
      price: "₹ 3,900",
      image: image5,
      series: "spicy",
    },
    /* ========================================================= ATTAR — TRADITIONAL 2 PRODUCTS ========================================================= */ {
      id: "a-traditional-1",
      name: "Ruh Gulab",
      arabic: "روح الورد",
      notes: "Pure Rose · Floral Water · Soft Musk",
      price: "₹ 3,500",
      image: image4,
      series: "traditional",
    },
    {
      id: "a-traditional-2",
      name: "Mitti Attar",
      arabic: "عطر مِتّي",
      notes: "Earth · Rain · Sandalwood",
      price: "₹ 3,200",
      image: image5,
      series: "traditional",
    },
    /* ========================================================= ATTAR — OUD / OUDH 2 PRODUCTS ========================================================= */ {
      id: "a-oud-1",
      name: "Oud Al Maliki",
      arabic: "عود الملكي",
      notes: "Pure Oud · Amber · Smoke",
      price: "₹ 6,500",
      image: image4,
      series: "oud-oudh",
    },
    {
      id: "a-oud-2",
      name: "Royal Oudh",
      arabic: "العود الملكي",
      notes: "Hindi Oud · Leather · Resin",
      price: "₹ 7,200",
      image: image5,
      series: "oud-oudh",
    },
    /* ========================================================= ATTAR — MUSK 2 PRODUCTS ========================================================= */ {
      id: "a-musk-1",
      name: "Musk Al Abyad",
      arabic: "مسك أبيض",
      notes: "White Musk · Powder · Amber",
      price: "₹ 2,900",
      image: image4,
      series: "musk",
    },
    {
      id: "a-musk-2",
      name: "Musk Tahara",
      arabic: "مسك طهارة",
      notes: "Clean Musk · Cotton · Iris",
      price: "₹ 2,750",
      image: image5,
      series: "musk",
    },
    /* ========================================================= EXISTING ATTAR COLLECTIONS ========================================================= */ {
      id: "7",
      name: "Musk Al Abyad",
      arabic: "مسك أبيض",
      notes: "White Musk · Powder · Amber",
      price: "₹ 3,400",
      image: image4,
      series: "traditional-al-musk",
    },
    {
      id: "8",
      name: "Musk Tahara",
      arabic: "مسك طهارة",
      notes: "Soft Musk · Cotton · Iris",
      price: "₹ 2,850",
      image: image5,
      series: "traditional-al-musk",
    },
    {
      id: "13",
      name: "Musk Tahara Premium",
      arabic: "مسك طهارة",
      notes: "Soft Musk · Cotton · Iris",
      price: "₹ 2,850",
      image: image4,
      series: "traditional-al-musk",
    },
    {
      id: "9",
      name: "Dehn Al Oud",
      arabic: "دهن العود",
      notes: "Pure Oud Oil · Smoke · Resin",
      price: "₹ 15,600",
      image: image5,
      series: "concentrated-oil-series",
    },
    {
      id: "10",
      name: "Amber Concentré",
      arabic: "عنبر",
      notes: "Amber · Labdanum · Benzoin",
      price: "₹ 6,800",
      image: image4,
      series: "concentrated-oil-series",
    },
    {
      id: "11",
      name: "Ward Taifi",
      arabic: "ورد طائفي",
      notes: "Taif Rose · Honey · Geranium",
      price: "₹ 9,200",
      image: image5,
      series: "floral-attars",
    },
    {
      id: "12",
      name: "Yasmeen Sambac",
      arabic: "ياسمين",
      notes: "Jasmine Sambac · Neroli",
      price: "₹ 5,100",
      image: image4,
      series: "floral-attars",
    },
    /* ========================================================= GIFTS Products exist in data, but their series pages show Coming Soon. ========================================================= */ {
      id: "g1-1",
      name: "Gucci Flora Attar",
      arabic: "عطر جوشي فلورا",
      notes: "Peony · Mandarin · Rose",
      price: "₹ 6,500",
      image: Series3,
      series: "gucci-series",
    },
    {
      id: "g2-1",
      name: "Cambodian Oud Elixir",
      arabic: "إكسير العود الكمبودي",
      notes: "Aged Cambodian Wood · Smoke",
      price: "₹ 14,000",
      image: Series3,
      series: "oud-series",
    },
    {
      id: "g3-1",
      name: "Golden Saffron Oil",
      arabic: "زيت الزعفران الذهبي",
      notes: "Pure Kashmiri Saffron · Spices",
      price: "₹ 9,500",
      image: Series3,
      series: "gold-series",
    },
  ];
/* ========================================================= BEST SELLERS ========================================================= */ 
export const bestSellers =
  ["3", "7", "5", "10"].map((id) => products.find((p) => p.id === id)!);
