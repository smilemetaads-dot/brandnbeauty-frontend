"use client";

import { useMemo } from "react";

type BrandEntry = {
  name: string;
  count: number;
};

const ALL_BRAND_ENTRIES: BrandEntry[] = [
  { name: "[SOME BY MI]", count: 39 },
  { name: "3W Clinic", count: 98 },
  { name: "5LANC", count: 0 },
  { name: "Beauty of Joseon", count: 82 },
  { name: "BrandnBeauty", count: 44 },
  { name: "CeraVe", count: 55 },
  { name: "COSRX", count: 64 },
  { name: "Flormar", count: 339 },
  { name: "Groome", count: 430 },
  { name: "Himalaya", count: 355 },
  { name: "L'Oreal", count: 365 },
  { name: "Maybelline", count: 240 },
  { name: "NICKA K", count: 439 },
  { name: "Nirvana Color", count: 707 },
  { name: "NYX", count: 220 },
  { name: "Revlon", count: 310 },
  { name: "Simple", count: 58 },
  { name: "skin cafe", count: 560 },
  { name: "The Body Shop", count: 329 },
  { name: "The Ordinary", count: 74 },
  { name: "Topface", count: 330 },
  { name: "Wardah", count: 188 },
  { name: "wet n wild", count: 190 },
];

const TOP_BRANDS: BrandEntry[] = [
  { name: "Nirvana Color", count: 707 },
  { name: "skin cafe", count: 560 },
  { name: "NICKA K", count: 439 },
  { name: "Groome", count: 430 },
  { name: "L'Oreal", count: 365 },
  { name: "Himalaya", count: 355 },
  { name: "Flormar", count: 339 },
  { name: "Topface", count: 330 },
  { name: "The Body Shop", count: 329 },
  { name: "Revlon", count: 310 },
];

const FEATURED_BRANDS = [
  { name: "MAC", logo: "/brands/mac.png" },
  { name: "The Body Shop", logo: "/brands/the-body-shop.png" },
  { name: "NYX", logo: "/brands/nyx.png" },
  { name: "Wardah", logo: "/brands/wardah.png" },
  { name: "Maybelline", logo: "/brands/maybelline.png" },
  { name: "Revlon", logo: "/brands/revlon.png" },
  { name: "wet n wild", logo: "/brands/wet-n-wild.png" },
  { name: "Flormar", logo: "/brands/flormar.png" },
  { name: "ColourPop", logo: "/brands/colourpop.png" },
  { name: "skin cafe", logo: "/brands/skin-cafe.png" },
  { name: "L.A. Girl", logo: "/brands/la-girl.png" },
  { name: "e.l.f.", logo: "/brands/elf.png" },
];

const BRAND_LETTERS = ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] as const;

const CATEGORY_MENU = {
  Skincare: {
    Face: ["Cleanser", "Day Cream", "Night Cream", "Facewash", "Masks & Peels", "Sheet Mask", "Moisturizer"],
    "K-Beauty": ["Sunscreen", "Moisturizers", "Serums & Oils", "Essence", "Ampoule"],
    "Hand & Feet": ["Hand Creams", "Foot Creams"],
    "Sun Care": ["Sunscreen", "After Sun Care", "Sun Stick", "Sun Gel"],
    Body: ["Body Butter", "Body Mist/Spray", "Lotions & Creams", "Body Scrubs"],
    "Eye Care": ["Eye Cream", "Eye Gel", "Eye Roller", "Under Eye Cream"],
  },
  "Hair Care": {
    Hair: ["Shampoo", "Conditioner", "Hair Oil", "Hair Mask", "Hair Serum"],
    "Hair Concern": ["Hair Fall", "Dandruff", "Dry Hair", "Frizz Control"],
    Tools: ["Hair Brush", "Comb", "Hair Curler", "Straightener"],
    Treatments: ["Keratin", "Protein", "Spa", "Scalp Treatment"],
  },
  "Body Care": {
    Bath: ["Body Wash", "Soap", "Shower Gel", "Bath Salt"],
    Moisture: ["Body Lotion", "Body Butter", "Body Cream", "Hand Cream"],
    Exfoliation: ["Body Scrub", "Coffee Scrub", "Sugar Scrub"],
    Care: ["Foot Care", "Underarm Care", "Stretch Mark Care"],
  },
  Makeup: {
    Face: ["Primer", "Foundation", "BB Cream", "Compact Powder", "Concealer", "Blush"],
    Lips: ["Lipstick", "Lip Gloss", "Lip Tint", "Lip Liner"],
    Eyes: ["Mascara", "Eyeliner", "Kajal", "Eyeshadow"],
    Tools: ["Brushes", "Sponges", "Puffs", "Sharpeners"],
  },
  Tools: {
    Beauty: ["Brushes", "Sponges", "Puffs", "Mirrors", "Razors"],
    Hair: ["Combs", "Brushes", "Curlers", "Straighteners"],
  },
  Fragrance: {
    Women: ["Perfume", "Body Mist", "Deodorant", "Attar"],
    Men: ["Perfume", "Body Spray", "Roll On", "Attar"],
    Home: ["Room Spray", "Diffuser", "Candles"],
  },
  "Men's Care": {
    Face: ["Face Wash", "Moisturizer", "Serum", "Sunscreen"],
    Beard: ["Beard Oil", "Beard Wash", "Beard Balm"],
    Shaving: ["Razor", "Shaving Foam", "After Shave"],
    Hair: ["Shampoo", "Wax", "Gel", "Spray"],
  },
  "Mom & Baby": {
    Baby: ["Baby Wash", "Baby Lotion", "Baby Powder", "Baby Oil", "Diaper Care"],
    Mom: ["Stretch Mark", "Body Care", "Nursing Care"],
  },
} as const;

const CATEGORIES = [
  { name: "Skincare" },
  { name: "Hair Care" },
  { name: "Body Care" },
  { name: "Makeup" },
  { name: "Tools" },
  { name: "Fragrance" },
  { name: "Men's Care" },
  { name: "Mom & Baby" },
] as const;

function getCategoryGridClass(count: number) {
  if (count >= 6) return "grid-cols-6";
  if (count === 5) return "grid-cols-5";
  if (count === 4) return "grid-cols-4";
  if (count === 3) return "grid-cols-3";
  return "grid-cols-2";
}

type SiteHeaderProps = {
  bagCount: number;
  brandSearch: string;
  onBrandSearchChange: (value: string) => void;
  onGoToBrandLetter: (letter: string) => void;
  onGoToBrandPage: (brandName: string) => void;
  onGoToCategoryPage: (categoryName: string, subcategoryName?: string) => void;
  onOpenCart: () => void;
};

export default function SiteHeader({
  bagCount,
  brandSearch,
  onBrandSearchChange,
  onGoToBrandLetter,
  onGoToBrandPage,
  onGoToCategoryPage,
  onOpenCart,
}: SiteHeaderProps) {
  const filteredBrandEntries = useMemo(
    () => ALL_BRAND_ENTRIES.filter((brand) => brand.name.toLowerCase().includes(brandSearch.toLowerCase())),
    [brandSearch],
  );

  const groupedBrandEntries = useMemo(() => {
    return filteredBrandEntries.reduce<Record<string, BrandEntry[]>>((acc, brand) => {
      const firstChar = brand.name.charAt(0).toUpperCase();
      const key = /[A-Z]/.test(firstChar) ? firstChar : "#";
      if (!acc[key]) acc[key] = [];
      acc[key].push(brand);
      return acc;
    }, {});
  }, [filteredBrandEntries]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
        <a href="/" className="flex items-center">
          <div className="flex h-10 items-center text-2xl font-bold tracking-tight text-[#5E7F85]">BrandnBeauty</div>
        </a>

        <div className="relative flex flex-1 items-center justify-center gap-6 px-8">
          <div className="group static hidden md:block">
            <button className="relative text-sm font-medium text-slate-700 hover:text-[#5E7F85] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#5E7F85] after:transition-all group-hover:after:w-full">
              Brands
            </button>

            <div className="invisible absolute left-1/2 top-full z-50 mt-4 w-[min(1120px,calc(100vw-32px))] -translate-x-1/2 rounded-[1.75rem] border border-slate-200 bg-white opacity-0 shadow-[0_28px_80px_rgba(15,23,42,0.14)] transition-all duration-200 ease-out group-hover:visible group-hover:opacity-100">
              <div className="pointer-events-none absolute inset-x-0 -top-3 h-3" />
              <div className="grid grid-cols-[280px_44px_1fr]">
                <div className="max-h-[min(70vh,460px)] overflow-y-auto border-r border-slate-200 px-5 py-5">
                  <div className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-slate-900">Top Brands</div>
                  <div className="mt-3 border-t border-slate-200 pt-3">
                    {TOP_BRANDS.map((brand) => (
                      <button key={brand.name} onClick={() => onGoToBrandPage(brand.name)} className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[0.98rem] text-slate-700 transition hover:bg-stone-50 hover:text-[#5E7F85]">
                        <span>{brand.name}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[0.8rem] font-medium text-slate-500">{brand.count}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-slate-900">All Brands</div>
                  <div className="mt-2 border-t border-slate-200 pt-3">
                    <div className="relative mb-3">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">âŒ•</span>
                      <input value={brandSearch} onChange={(e) => onBrandSearchChange(e.target.value)} placeholder="Search brands" className="h-9 w-full rounded-full border border-slate-200 bg-white pl-8 pr-3 text-[0.86rem] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#5E7F85] focus:bg-white" />
                    </div>

                    <div className="space-y-3">
                      {BRAND_LETTERS.map((letter) => {
                        const items = groupedBrandEntries[letter] || [];
                        if (items.length === 0) return null;
                        return (
                          <div key={letter}>
                            <div className={`px-2 pb-1 text-[0.95rem] font-semibold ${letter === "#" ? "text-[#ff4f7a]" : "text-slate-900"}`}>{letter}</div>
                            <div className="space-y-0.5">
                              {items.map((brand) => (
                                <button key={brand.name} onClick={() => onGoToBrandPage(brand.name)} className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[0.98rem] text-slate-700 transition hover:bg-stone-50 hover:text-[#5E7F85]">
                                  <span>{brand.name}</span>
                                  <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[0.8rem] font-medium text-slate-500">{brand.count}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="max-h-[min(70vh,460px)] overflow-y-auto border-r border-slate-200 px-2 py-5">
                  <div className="flex flex-col items-center gap-[2px] text-[0.88rem] leading-5 text-slate-700">
                    {BRAND_LETTERS.map((letter) => (
                      <button key={letter} onClick={() => onGoToBrandLetter(letter)} className={`w-full rounded-md py-[2px] text-center transition hover:bg-stone-50 hover:text-[#5E7F85] ${letter === "#" ? "font-semibold text-slate-900" : ""}`}>
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-7 py-5">
                  <div className="mb-2 text-center text-[0.8rem] font-medium uppercase tracking-[0.2em] text-slate-400">Featured</div>
                  <div className="text-center text-[1.05rem] font-semibold uppercase tracking-[0.12em] text-slate-900">Top Brands</div>
                  <div className="mt-3 border-t border-slate-200 pt-6">
                    <div className="grid grid-cols-4 gap-x-8 gap-y-8">
                      {FEATURED_BRANDS.map((brand) => (
                        <button key={brand.name} onClick={() => onGoToBrandPage(brand.name)} className="group flex h-[110px] items-center justify-center rounded-2xl border border-slate-100 bg-white px-4 transition hover:border-slate-200 hover:bg-stone-50">
                          <span className="flex h-full w-full items-center justify-center text-center text-[1.05rem] font-medium tracking-wide text-slate-800">{brand.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden w-full max-w-lg items-center gap-3 rounded-full border border-[#c9d5d8] bg-white/90 px-5 py-2 shadow-sm transition focus-within:border-[#b7c7ca] focus-within:bg-white md:flex">
            <span className="text-slate-400">âŒ•</span>
            <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" placeholder="Search products, brands, concerns..." />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden min-w-[112px] items-center justify-center gap-2 rounded-full border border-[#c9d5d8] bg-white px-6 py-[0.8rem] text-[0.98rem] font-semibold tracking-[0.01em] text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition hover:border-[#b7c7ca] hover:bg-[#f8faf9] hover:text-slate-900 md:flex">
            Wishlist
          </button>
          <button className="hidden min-w-[104px] items-center justify-center gap-2 rounded-full bg-[#eef1f4] px-6 py-[0.8rem] text-[0.98rem] font-semibold tracking-[0.01em] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition hover:bg-[#e5eaee] hover:text-slate-900 md:flex">
            Login
          </button>
          <button onClick={onOpenCart} className="min-w-[146px] rounded-full bg-[#6f8f95] px-6 py-[0.85rem] text-[1rem] font-bold tracking-[0.04em] text-white shadow-[0_10px_22px_rgba(94,127,133,0.2)] transition hover:-translate-y-[1px] hover:bg-[#5E7F85] hover:shadow-[0_12px_26px_rgba(94,127,133,0.28)] active:translate-y-0">
            <span className="inline-flex items-center gap-2.5">
              <span>Bag</span>
              <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-white px-1.5 text-[12px] font-bold leading-none text-[#5E7F85] shadow">{bagCount}</span>
            </span>
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-4 md:px-6">
          <nav className="relative flex flex-wrap items-center gap-8 text-sm font-medium text-slate-700">
            {CATEGORIES.map((item) => {
              const categoryColumns = CATEGORY_MENU[item.name as keyof typeof CATEGORY_MENU] || {};
              const sections = Object.entries(categoryColumns) as [string, string[]][];
              return (
                <div key={item.name} className="group static">
                  <button onClick={() => onGoToCategoryPage(item.name)} className="text-sm font-medium text-slate-700 transition hover:text-[#5E7F85]">
                    {item.name}
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-40 mt-4 w-[min(1120px,calc(100vw-32px))] -translate-x-1/2 border-t border-slate-200 bg-white opacity-0 shadow-[0_20px_55px_rgba(15,23,42,0.10)] transition-all duration-200 ease-out group-hover:visible group-hover:opacity-100">
                    <div className="mx-auto max-w-7xl px-4 md:px-6">
                      <div className={`grid gap-0 ${getCategoryGridClass(sections.length)}`}>
                        {sections.map(([sectionTitle, links]) => (
                          <div key={sectionTitle} className="min-h-[380px] border-r border-slate-200 px-5 py-5 last:border-r-0">
                            <div className="mb-3 text-[0.82rem] font-bold uppercase tracking-[0.06em] text-slate-900">{sectionTitle}</div>
                            <div className="space-y-2.5">
                              {links.map((link) => (
                                <button key={link} onClick={() => onGoToCategoryPage(item.name, link)} className="block w-full text-left text-[0.98rem] leading-6 text-slate-700 transition hover:text-[#5E7F85]">
                                  {link}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
