import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export type Product = {
  id: string;
  name: string;
  arabic: string;
  notes: string;
  price: string;
  image: string;
  series: string;
};

export const seriesMap: Record<string, { title: string; arabic: string; blurb: string }> = {
  "royal-oud": {
    title: "Royal OUD Series",
    arabic: "العود الملكي",
    blurb: "Aged Cambodian and Hindi oud, distilled slowly and matured in oak for a smoke-rich, regal trail.",
  },
  "signature-edp": {
    title: "Signature EDP",
    arabic: "التوقيع",
    blurb: "Our house eau de parfum compositions — modern, radiant and built for long wear.",
  },
  "woody-collection": {
    title: "Woody Collection",
    arabic: "الخشبية",
    blurb: "Sandalwood, cedar and vetiver layered over warm resins for a grounded, refined signature.",
  },
  "traditional-al-musk": {
    title: "Traditional Al-Musk",
    arabic: "المسك التقليدي",
    blurb: "White musk attars crafted in the classical Arabian method — soft, clean and enduring.",
  },
  "concentrated-oil-series": {
    title: "Concentrated Oil Series",
    arabic: "الزيوت المركزة",
    blurb: "Undiluted, alcohol-free perfume oils. A single drop carries through the day.",
  },
  "floral-attars": {
    title: "Floral Attars",
    arabic: "العطور الزهرية",
    blurb: "Taif rose, jasmine sambac and saffron blossom — steam-distilled botanical purity.",
  },
};

export const products: Product[] = [
  { id: "1", name: "Oud Malaki", arabic: "عود ملكي", notes: "Cambodian Oud · Saffron · Amber", price: "₹ 8,900", image: product1, series: "royal-oud" },
  { id: "2", name: "Sultan Al Layl", arabic: "سلطان الليل", notes: "Hindi Oud · Leather · Incense", price: "₹ 12,400", image: product2, series: "royal-oud" },
  { id: "3", name: "Misbah Noir", arabic: "مصباح نوار", notes: "Bergamot · Tobacco · Vanilla", price: "₹ 6,200", image: product1, series: "signature-edp" },
  { id: "4", name: "Nur Al Sharq", arabic: "نور الشرق", notes: "Rose · Patchouli · Musk", price: "₹ 5,700", image: product2, series: "signature-edp" },
  { id: "5", name: "Sandal Royale", arabic: "صندل", notes: "Mysore Sandalwood · Cedar", price: "₹ 7,300", image: product2, series: "woody-collection" },
  { id: "6", name: "Vetiver Majlis", arabic: "مجلس", notes: "Vetiver · Dry Woods · Tonka", price: "₹ 4,950", image: product1, series: "woody-collection" },
  { id: "7", name: "Musk Al Abyad", arabic: "مسك أبيض", notes: "White Musk · Powder · Amber", price: "₹ 3,400", image: product3, series: "traditional-al-musk" },
  { id: "8", name: "Musk Tahara", arabic: "مسك طهارة", notes: "Soft Musk · Cotton · Iris", price: "₹ 2,850", image: product3, series: "traditional-al-musk" },
  { id: "9", name: "Dehn Al Oud", arabic: "دهن العود", notes: "Pure Oud Oil · Smoke · Resin", price: "₹ 15,600", image: product3, series: "concentrated-oil-series" },
  { id: "10", name: "Amber Concentré", arabic: "عنبر", notes: "Amber · Labdanum · Benzoin", price: "₹ 6,800", image: product3, series: "concentrated-oil-series" },
  { id: "11", name: "Ward Taifi", arabic: "ورد طائفي", notes: "Taif Rose · Honey · Geranium", price: "₹ 9,200", image: product3, series: "floral-attars" },
  { id: "12", name: "Yasmeen Sambac", arabic: "ياسمين", notes: "Jasmine Sambac · Neroli", price: "₹ 5,100", image: product1, series: "floral-attars" },
];

export const bestSellers = ["1", "2", "9", "11", "3", "7", "5", "10"].map(
  (id) => products.find((p) => p.id === id)!,
);