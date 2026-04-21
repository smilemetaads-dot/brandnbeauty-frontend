"use client";

import React, { useEffect, useMemo, useState } from "react";

type PLPMode = "products" | "category" | "concern" | "brand";

const PREVIEW_PAGE: PLPMode = "brand";
const PRESET_CATEGORY = "Skincare" as const;
const PRESET_CONCERN = "Acne" as const;

type Product = {
  name: string;
  brand: string;
  category: string;
  concerns: string[];
  subcategory: string;
  freeDelivery: boolean;
  bestSeller: boolean;
  price: string;
  oldPrice: string;
  badge: string;
  rating: number;
};

const AVAILABLE_CATEGORIES = [
  "Skincare",
  "Hair Care",
  "Body Care",
  "Makeup",
  "Tools & Brushes",
  "Fragrance",
  "Men's Grooming",
  "Mom & Baby",
  "Offers",
  "Combo Deals",
] as const;

const AVAILABLE_CONCERNS = [
  "Acne",
  "Dark Spots",
  "Brightening",
  "Oily Skin",
  "Dry Skin",
  "Sensitive Skin",
  "Hairfall",
  "Dull Skin",
] as const;

const AVAILABLE_SUBCATEGORIES = [
  "All",
  "Cleanser",
  "Serum",
  "Moisturizer",
  "Sunscreen",
  "Masks",
] as const;

const AVAILABLE_BRANDS = [
  "BrandnBeauty",
  "Some By Mi",
  "Beauty of Joseon",
  "Simple",
  "COSRX",
  "The Ordinary",
  "CeraVe",
  "L'Oréal",
  "Laneige",
] as const;

const CATEGORY_BANNER_MAP: Record<string, string> = {
  Skincare: "/banners/category-skincare.jpg",
  "Hair Care": "/banners/category-hair-care.jpg",
  "Body Care": "/banners/category-body-care.jpg",
  Makeup: "/banners/category-makeup.jpg",
  "Tools & Brushes": "/banners/category-tools-brushes.jpg",
  Fragrance: "/banners/category-fragrance.jpg",
  "Men's Grooming": "/banners/category-mens-grooming.jpg",
  "Mom & Baby": "/banners/category-mom-baby.jpg",
  Offers: "/banners/category-offers.jpg",
  "Combo Deals": "/banners/category-combo-deals.jpg",
};

const BRAND_LOGOS: Partial<Record<string, string>> = {};

const BRAND_INFO: Record<
  string,
  {
    title: string;
    description: string;
    availableText: string;
    tags: string[];
    stats: { label: string; value: string }[];
    highlights: { label: string; value: string }[];
  }
> = {
  BrandnBeauty: {
    title: "Why people love BrandnBeauty",
    description:
      "BrandnBeauty focuses on trusted beauty picks, practical routines, and products that feel easy to choose. This page helps customers discover best sellers, daily essentials, and concern-based options from the brand.",
    availableText: "30+ products available",
    tags: ["Everyday Care", "Trusted Picks", "Hydration", "Best Sellers"],
    stats: [
      { label: "Average Rating", value: "⭐ 4.8 / 5" },
      { label: "Products", value: "30+ listed" },
      { label: "Authenticity", value: "Verified source" },
    ],
    highlights: [
      { label: "Top Concern", value: "Daily skincare routine" },
      { label: "Best Known For", value: "Easy beauty essentials" },
      { label: "Popular Category", value: "Cleanser & Serum" },
      { label: "Customer Favorite", value: "Glow support range" },
    ],
  },
  COSRX: {
    title: "Why people love COSRX",
    description:
      "COSRX focuses on effective skincare with straightforward ingredient stories. It is especially popular for acne-prone, oily, and sensitive skin routines. This page helps customers discover best sellers, daily essentials, and concern-based picks from the brand.",
    availableText: "120+ products available",
    tags: ["Acne Care", "Barrier Care", "Gentle Cleansing", "Hydration", "Best Sellers"],
    stats: [
      { label: "Average Rating", value: "⭐ 4.8 / 5" },
      { label: "Products", value: "120+ listed" },
      { label: "Authenticity", value: "Verified source" },
    ],
    highlights: [
      { label: "Top Concern", value: "Acne & Oily Skin" },
      { label: "Best Known For", value: "Simple effective formulas" },
      { label: "Popular Category", value: "Cleanser & Essence" },
      { label: "Customer Favorite", value: "Snail range" },
    ],
  },
};

const PRODUCTS: Product[] = [
  {
    name: "Acne Balance Facewash",
    brand: "Some By Mi",
    category: "Skincare",
    concerns: ["Acne", "Oily Skin"],
    subcategory: "Cleanser",
    freeDelivery: true,
    bestSeller: true,
    price: "৳ 890.00",
    oldPrice: "৳ 1,150.00",
    badge: "SALE",
    rating: 4.5,
  },
  {
    name: "Barrier Calm Serum",
    brand: "BrandnBeauty",
    category: "Skincare",
    concerns: ["Sensitive Skin", "Acne"],
    subcategory: "Serum",
    freeDelivery: true,
    bestSeller: true,
    price: "৳ 990.00",
    oldPrice: "৳ 1,250.00",
    badge: "FREE SHIPPING",
    rating: 4.0,
  },
  {
    name: "Hydra Gel Moisturizer",
    brand: "Simple",
    category: "Skincare",
    concerns: ["Dry Skin", "Sensitive Skin"],
    subcategory: "Moisturizer",
    freeDelivery: false,
    bestSeller: true,
    price: "৳ 850.00",
    oldPrice: "৳ 1,050.00",
    badge: "SALE",
    rating: 4.0,
  },
  {
    name: "Daily Sun Gel",
    brand: "Beauty of Joseon",
    category: "Skincare",
    concerns: ["Acne", "Dark Spots"],
    subcategory: "Sunscreen",
    freeDelivery: true,
    bestSeller: true,
    price: "৳ 1,250.00",
    oldPrice: "৳ 1,550.00",
    badge: "SALE",
    rating: 4.5,
  },
  {
    name: "Glow Support Cleanser",
    brand: "Beauty of Joseon",
    category: "Skincare",
    concerns: ["Brightening", "Dull Skin"],
    subcategory: "Cleanser",
    freeDelivery: true,
    bestSeller: false,
    price: "৳ 1,150.00",
    oldPrice: "৳ 1,450.00",
    badge: "FREE SHIPPING",
    rating: 4.0,
  },
  {
    name: "Night Repair Cream",
    brand: "BrandnBeauty",
    category: "Skincare",
    concerns: ["Dry Skin", "Dull Skin"],
    subcategory: "Moisturizer",
    freeDelivery: false,
    bestSeller: false,
    price: "৳ 1,180.00",
    oldPrice: "৳ 1,500.00",
    badge: "SALE",
    rating: 4.5,
  },
  {
    name: "Brightening Serum",
    brand: "The Ordinary",
    category: "Skincare",
    concerns: ["Brightening", "Dark Spots"],
    subcategory: "Serum",
    freeDelivery: false,
    bestSeller: false,
    price: "৳ 1,350.00",
    oldPrice: "৳ 1,700.00",
    badge: "SALE",
    rating: 3.5,
  },
  {
    name: "Pore Clay Mask",
    brand: "COSRX",
    category: "Skincare",
    concerns: ["Acne", "Oily Skin"],
    subcategory: "Masks",
    freeDelivery: false,
    bestSeller: true,
    price: "৳ 1,050.00",
    oldPrice: "৳ 1,300.00",
    badge: "",
    rating: 4.0,
  },
  {
    name: "Vitamin C Booster",
    brand: "Simple",
    category: "Skincare",
    concerns: ["Brightening", "Dark Spots"],
    subcategory: "Serum",
    freeDelivery: true,
    bestSeller: false,
    price: "৳ 950.00",
    oldPrice: "৳ 1,200.00",
    badge: "FREE SHIPPING",
    rating: 3.5,
  },
  {
    name: "Gentle Foam Cleanser",
    brand: "COSRX",
    category: "Skincare",
    concerns: ["Sensitive Skin", "Acne"],
    subcategory: "Cleanser",
    freeDelivery: false,
    bestSeller: true,
    price: "৳ 1,020.00",
    oldPrice: "৳ 1,280.00",
    badge: "SALE",
    rating: 4.0,
  },
  {
    name: "Repair Sleeping Mask",
    brand: "Laneige",
    category: "Skincare",
    concerns: ["Dry Skin", "Dull Skin"],
    subcategory: "Masks",
    freeDelivery: true,
    bestSeller: false,
    price: "৳ 1,450.00",
    oldPrice: "৳ 1,850.00",
    badge: "SALE",
    rating: 4.5,
  },
  {
    name: "Daily Moisture Lotion",
    brand: "CeraVe",
    category: "Skincare",
    concerns: ["Dry Skin", "Sensitive Skin"],
    subcategory: "Moisturizer",
    freeDelivery: true,
    bestSeller: false,
    price: "৳ 1,200.00",
    oldPrice: "৳ 1,480.00",
    badge: "",
    rating: 4.0,
  },
  {
    name: "Scalp Balance Shampoo",
    brand: "L'Oréal",
    category: "Hair Care",
    concerns: ["Hairfall"],
    subcategory: "Cleanser",
    freeDelivery: false,
    bestSeller: true,
    price: "৳ 780.00",
    oldPrice: "৳ 990.00",
    badge: "SALE",
    rating: 4.2,
  },
  {
    name: "Body Glow Lotion",
    brand: "CeraVe",
    category: "Body Care",
    concerns: ["Dry Skin"],
    subcategory: "Moisturizer",
    freeDelivery: true,
    bestSeller: false,
    price: "৳ 1,290.00",
    oldPrice: "৳ 1,550.00",
    badge: "",
    rating: 4.4,
  },
  {
    name: "Lip Tint Duo",
    brand: "BrandnBeauty",
    category: "Makeup",
    concerns: ["Dull Skin"],
    subcategory: "Serum",
    freeDelivery: false,
    bestSeller: true,
    price: "৳ 690.00",
    oldPrice: "৳ 890.00",
    badge: "SALE",
    rating: 4.1,
  },
];

function getNumericPrice(price: string): number {
  const input = String(price).trim();
  const numericMatch = input.match(/\d[\d,]*(?:\.\d+)?/);
  if (!numericMatch) return 0;
  const normalized = numericMatch[0].replace(/,/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fromSlug<T extends string>(slug: string | null, options: readonly T[], fallback: T): T {
  if (!slug) return fallback;
  const match = options.find((item) => toSlug(item) === slug);
  return match || fallback;
}

function parseBrandList(value: string | null, options: readonly string[]): string[] {
  if (!value) return [];
  const slugs = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return options.filter((brand) => slugs.includes(toSlug(brand)));
}

function buildFilterURL(params: {
  mode: PLPMode;
  category: string | null;
  concern: string | null;
  subcategory: string;
  brands: string[];
  price: number | null;
  freeDelivery: boolean;
  bestSeller: boolean;
  maxAvailablePrice: number;
}): string {
  const searchParams = new URLSearchParams();

  if (params.mode === "products") {
    if (params.category) searchParams.set("category", toSlug(params.category));
    if (params.concern) searchParams.set("concern", toSlug(params.concern));
  }
  if (params.mode === "category" && params.category) {
    searchParams.set("category", toSlug(params.category));
  }
  if (params.mode === "concern" && params.concern) {
    searchParams.set("concern", toSlug(params.concern));
  }
  if (params.mode === "brand" && params.brands.length > 0) {
    searchParams.set("brand", toSlug(params.brands[0]));
  }
  if (params.subcategory !== "All") {
    searchParams.set("subcategory", toSlug(params.subcategory));
  }
  if (params.mode !== "brand" && params.brands.length > 0) {
    searchParams.set("brands", params.brands.map((brand) => toSlug(brand)).join(","));
  }
  if (params.price !== null && params.price !== params.maxAvailablePrice) {
    searchParams.set("price", String(params.price));
  }
  if (params.freeDelivery) searchParams.set("free_delivery", "1");
  if (params.bestSeller) searchParams.set("best_seller", "1");

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

function runTests() {
  if (getNumericPrice("৳ 1,250.00") !== 1250) throw new Error("Price parsing failed");
  if (getNumericPrice("৳690.00") !== 690) throw new Error("Compact price parsing failed");
  if (getNumericPrice("Price: 2,345 BDT") !== 2345) throw new Error("Mixed price parsing failed");
  if (getNumericPrice("USD 89.99") !== 89.99) throw new Error("Decimal price parsing failed");
  if (getNumericPrice("No price") !== 0) throw new Error("Missing price parsing failed");
  if (getNumericPrice("approx. 1,999.50 taka") !== 1999.5) {
    throw new Error("Approx price parsing failed");
  }

  if (toSlug("Hair Care") !== "hair-care") throw new Error("Slug failed");
  if (toSlug("Tools & Brushes") !== "tools-and-brushes") {
    throw new Error("Ampersand slug failed");
  }
  if (toSlug("  Glow  Serum ") !== "glow-serum") throw new Error("Trim slug failed");

  if (fromSlug("serum", AVAILABLE_SUBCATEGORIES, "All") !== "Serum") {
    throw new Error("fromSlug failed");
  }
  if (fromSlug("missing", AVAILABLE_SUBCATEGORIES, "All") !== "All") {
    throw new Error("fromSlug fallback failed");
  }

  const parsedBrands = parseBrandList("brandnbeauty,simple", AVAILABLE_BRANDS);
  if (parsedBrands.length !== 2) throw new Error("Brand parsing failed");

  const emptyBrands = parseBrandList(null, AVAILABLE_BRANDS);
  if (emptyBrands.length !== 0) throw new Error("Empty brand parsing failed");

  const trimmedBrands = parseBrandList(" brandnbeauty , simple ", AVAILABLE_BRANDS);
  if (trimmedBrands.length !== 2) throw new Error("Trimmed brand parsing failed");

  const url = buildFilterURL({
    mode: "products",
    category: "Skincare",
    concern: "Acne",
    subcategory: "Serum",
    brands: ["BrandnBeauty", "Simple"],
    price: 1200,
    freeDelivery: true,
    bestSeller: true,
    maxAvailablePrice: 1500,
  });

  if (!url.includes("category=skincare")) throw new Error("URL category failed");
  if (!url.includes("concern=acne")) throw new Error("URL concern failed");
  if (!url.includes("subcategory=serum")) throw new Error("URL subcategory failed");
  if (!url.includes("brands=brandnbeauty%2Csimple")) throw new Error("URL brands failed");
  if (!url.includes("price=1200")) throw new Error("URL price failed");
  if (!url.includes("free_delivery=1")) throw new Error("URL free delivery failed");
  if (!url.includes("best_seller=1")) throw new Error("URL best seller failed");

  const brandUrl = buildFilterURL({
    mode: "brand",
    category: null,
    concern: null,
    subcategory: "All",
    brands: ["BrandnBeauty"],
    price: null,
    freeDelivery: false,
    bestSeller: false,
    maxAvailablePrice: 1500,
  });

  if (!brandUrl.includes("brand=brandnbeauty")) throw new Error("URL brand failed");
  if (brandUrl.includes("brands=")) throw new Error("Brand URL should not include brands list");
}

runTests();

export default function RealBrandPage() {
  if (PREVIEW_PAGE === "category") {
    return <MasterPLPPreview mode="category" presetCategory={PRESET_CATEGORY} />;
  }
  if (PREVIEW_PAGE === "concern") {
    return <MasterPLPPreview mode="concern" presetConcern={PRESET_CONCERN} />;
  }
  if (PREVIEW_PAGE === "brand") {
    return <MasterPLPPreview mode="brand" presetBrand="COSRX" />;
  }
  return <MasterPLPPreview mode="products" />;
}

function ProductCard({ product }: { product: Product }) {
  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  const numericPrice = getNumericPrice(product.price);
  const numericOldPrice = getNumericPrice(product.oldPrice);
  const discount =
    numericOldPrice > numericPrice
      ? Math.round(((numericOldPrice - numericPrice) / numericOldPrice) * 100)
      : 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative flex flex-1 flex-col">
        <div className="group relative aspect-[1/0.88] overflow-hidden bg-[#f1f1f1]">
          {discount > 0 ? (
            <div className="absolute left-0 top-0 z-10 rounded-br-2xl rounded-tl-[1.8rem] bg-[#6f8f95] px-3 py-2 text-[0.95rem] font-bold leading-none text-white shadow-sm">
              {discount}% OFF
            </div>
          ) : null}

          <div className="absolute inset-0 flex items-center justify-center text-[1.1rem] text-slate-400 transition duration-300 group-hover:scale-105">
            Image
          </div>
        </div>

        <div className="flex flex-1 flex-col border-t border-slate-100 px-5 pb-5 pt-4">
          <div className="min-h-[4.4rem] text-[1.02rem] leading-8 text-[#4d6587]">
            {product.name}
          </div>

          <div className="mt-3 min-h-[2.9rem]">
            {product.freeDelivery ? (
              <div className="inline-flex rounded-full bg-[#6f8f95] px-4 py-2 text-[0.88rem] font-semibold uppercase leading-none tracking-wide text-white">
                FREE SHIPPING
              </div>
            ) : product.badge ? (
              <div className="inline-flex rounded-full bg-[#6f8f95] px-4 py-2 text-[0.88rem] font-semibold uppercase leading-none tracking-wide text-white">
                SALE
              </div>
            ) : null}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-[1.05rem]">
            <span className="text-slate-400 line-through">৳ {numericOldPrice.toFixed(2)}</span>
            <span className="font-semibold text-[#6f8f95]">৳ {numericPrice.toFixed(2)}</span>
          </div>

          <div className="mt-5 flex items-center justify-center gap-1 text-[1.05rem]">
            {Array.from({ length: fullStars }).map((_, i) => (
              <span key={`full-${i}`} className="text-[#f2b01e]">
                ★
              </span>
            ))}
            {hasHalf ? <span className="text-[#f2b01e] opacity-60">★</span> : null}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <span key={`empty-${i}`} className="text-slate-300">
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full bg-[#6f8f95] px-5 py-4 text-[1.12rem] font-semibold text-white transition duration-200 hover:bg-[#5E7F85] active:scale-[0.99]">
        Add to Cart
      </button>
    </div>
  );
}

function MasterPLPPreview({
  mode,
  presetCategory,
  presetConcern,
  presetBrand,
}: {
  mode: PLPMode;
  presetCategory?: string;
  presetConcern?: string;
  presetBrand?: string;
}) {
  const minAvailablePrice = Math.min(...PRODUCTS.map((p) => getNumericPrice(p.price)));
  const maxAvailablePrice = Math.max(...PRODUCTS.map((p) => getNumericPrice(p.price)));

  const [currentCategory, setCurrentCategory] = useState<string>(presetCategory || "All");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(presetCategory || null);
  const [currentConcern, setCurrentConcern] = useState<string>(presetConcern || "All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(presetBrand ? [presetBrand] : []);
  const [selectedFreeDelivery, setSelectedFreeDelivery] = useState(false);
  const [selectedBestSeller, setSelectedBestSeller] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(maxAvailablePrice);
  const [brandSearch, setBrandSearch] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [bannerLoaded, setBannerLoaded] = useState(false);

  useEffect(() => {
    setBannerLoaded(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyURLFilters = () => {
      const params = new URLSearchParams(window.location.search);
      const defaultCategory = mode === "category" ? presetCategory || "Skincare" : "All";
      const defaultConcern = mode === "concern" ? presetConcern || "Acne" : "All";
      const resolvedCategory = fromSlug(
        params.get("category"),
        ["All", ...AVAILABLE_CATEGORIES],
        defaultCategory as (typeof AVAILABLE_CATEGORIES)[number] | "All"
      );
      const resolvedConcern = fromSlug(
        params.get("concern"),
        ["All", ...AVAILABLE_CONCERNS],
        defaultConcern as (typeof AVAILABLE_CONCERNS)[number] | "All"
      );
      const resolvedSubcategory = fromSlug(
        params.get("subcategory"),
        AVAILABLE_SUBCATEGORIES,
        "All"
      );
      const resolvedBrands =
        mode === "brand" && presetBrand
          ? [presetBrand]
          : parseBrandList(params.get("brands"), AVAILABLE_BRANDS);
      const resolvedPrice = params.get("price") ? Number(params.get("price")) : maxAvailablePrice;

      setCurrentCategory(resolvedCategory);
      setExpandedCategory(resolvedCategory !== "All" ? resolvedCategory : null);
      setCurrentConcern(resolvedConcern);
      setSelectedSubcategory(resolvedSubcategory);
      setSelectedBrands(resolvedBrands);
      setSelectedFreeDelivery(params.get("free_delivery") === "1");
      setSelectedBestSeller(params.get("best_seller") === "1");
      setMaxPrice(
        Number.isFinite(resolvedPrice)
          ? Math.min(Math.max(resolvedPrice, minAvailablePrice), maxAvailablePrice)
          : maxAvailablePrice
      );
    };

    applyURLFilters();
    window.addEventListener("popstate", applyURLFilters);
    return () => window.removeEventListener("popstate", applyURLFilters);
  }, [mode, presetCategory, presetConcern, presetBrand, minAvailablePrice, maxAvailablePrice]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const nextURL = buildFilterURL({
      mode,
      category: currentCategory !== "All" ? currentCategory : null,
      concern: currentConcern !== "All" ? currentConcern : null,
      subcategory: selectedSubcategory,
      brands: selectedBrands,
      price: maxPrice,
      freeDelivery: selectedFreeDelivery,
      bestSeller: selectedBestSeller,
      maxAvailablePrice,
    });

    const nextPath = `${window.location.pathname}${nextURL}`;
    const currentPath = `${window.location.pathname}${window.location.search}`;
    if (currentPath !== nextPath) {
      window.history.replaceState({}, "", nextPath);
    }
  }, [
    mode,
    currentCategory,
    currentConcern,
    selectedSubcategory,
    selectedBrands,
    maxPrice,
    selectedFreeDelivery,
    selectedBestSeller,
    maxAvailablePrice,
  ]);

  const visibleBrands = useMemo(() => {
    const filtered = AVAILABLE_BRANDS.filter((brand) =>
      brand.toLowerCase().includes(brandSearch.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const aSelected = selectedBrands.includes(a) ? 1 : 0;
      const bSelected = selectedBrands.includes(b) ? 1 : 0;
      return bSelected - aSelected;
    });
  }, [brandSearch, selectedBrands]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const numericPrice = getNumericPrice(product.price);
      const matchesCategory = currentCategory === "All" || product.category === currentCategory;
      const matchesConcern = currentConcern === "All" || product.concerns.includes(currentConcern);
      const matchesSubcategory =
        selectedSubcategory === "All" || product.subcategory === selectedSubcategory;
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = numericPrice >= minAvailablePrice && numericPrice <= maxPrice;
      const matchesFreeDelivery = !selectedFreeDelivery || product.freeDelivery;
      const matchesBestSeller = !selectedBestSeller || product.bestSeller;

      return (
        matchesCategory &&
        matchesConcern &&
        matchesSubcategory &&
        matchesBrand &&
        matchesPrice &&
        matchesFreeDelivery &&
        matchesBestSeller
      );
    });
  }, [
    currentCategory,
    currentConcern,
    selectedSubcategory,
    selectedBrands,
    maxPrice,
    selectedFreeDelivery,
    selectedBestSeller,
    minAvailablePrice,
  ]);

  const currentBrand = selectedBrands[0] || presetBrand || "BrandnBeauty";
  const brandInfo = BRAND_INFO[currentBrand] || BRAND_INFO.BrandnBeauty;
  const brandLogoSrc = BRAND_LOGOS[currentBrand];

  const showClear =
    selectedSubcategory !== "All" ||
    selectedBrands.length > 0 ||
    selectedFreeDelivery ||
    selectedBestSeller ||
    maxPrice !== maxAvailablePrice ||
    (mode === "products" && (currentCategory !== "All" || currentConcern !== "All"));

  const activeFilters: string[] = [];
  if (currentCategory !== "All") activeFilters.push(currentCategory);
  if (currentConcern !== "All") activeFilters.push(currentConcern);
  if (selectedSubcategory !== "All") activeFilters.push(selectedSubcategory);
  if (selectedBrands.length > 0) activeFilters.push(...selectedBrands);
  if (selectedFreeDelivery) activeFilters.push("Free Delivery");
  if (selectedBestSeller) activeFilters.push("Best Selling");
  if (maxPrice !== maxAvailablePrice) activeFilters.push(`Up to ৳ ${maxPrice}`);

  const removeActiveFilter = (filter: string) => {
    if (filter === currentCategory) {
      setCurrentCategory("All");
      if (expandedCategory === currentCategory) setExpandedCategory(null);
      return;
    }
    if (filter === currentConcern) {
      setCurrentConcern("All");
      return;
    }
    if (filter === selectedSubcategory) {
      setSelectedSubcategory("All");
      return;
    }
    if (selectedBrands.includes(filter)) {
      setSelectedBrands((prev) => prev.filter((brand) => brand !== filter));
      return;
    }
    if (filter === "Free Delivery") {
      setSelectedFreeDelivery(false);
      return;
    }
    if (filter === "Best Selling") {
      setSelectedBestSeller(false);
      return;
    }
    if (filter === `Up to ৳ ${maxPrice}`) {
      setMaxPrice(maxAvailablePrice);
    }
  };

  const clearAllFilters = () => {
    setSelectedSubcategory("All");
    setSelectedBrands(mode === "brand" && presetBrand ? [presetBrand] : []);
    setSelectedFreeDelivery(false);
    setSelectedBestSeller(false);
    setMaxPrice(maxAvailablePrice);
    setBrandSearch("");

    if (mode === "products") {
      setCurrentCategory("All");
      setExpandedCategory(null);
      setCurrentConcern("All");
    }
  };

  const categoryCount = (category: string) =>
    PRODUCTS.filter((p) => p.category === category).length;

  const subcategoriesForCategory = (category: string) => {
    const set = new Set(
      PRODUCTS.filter((p) => p.category === category).map((p) => p.subcategory)
    );
    return [...AVAILABLE_SUBCATEGORIES].filter((item) => item !== "All" && set.has(item));
  };

  const subcategoryCount = (category: string, subcategory: string) =>
    PRODUCTS.filter((p) => p.category === category && p.subcategory === subcategory).length;

  const currentBanner =
    mode === "category" && currentCategory !== "All"
      ? CATEGORY_BANNER_MAP[currentCategory] || "/banners/category-default.jpg"
      : "/banners/category-default.jpg";

  const brandBannerClassName = [
    "relative",
    "mb-8",
    "w-full",
    "overflow-hidden",
    "bg-[linear-gradient(135deg,#2f4448_0%,#547176_40%,#8fb3b8_100%)]",
    "text-white",
    "transition-all",
    "duration-700",
    "ease-out",
    bannerLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
  ].join(" ");

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 py-5">
          <div className="text-2xl font-bold tracking-tight">BrandnBeauty</div>
          <div className="hidden w-full max-w-2xl items-center gap-3 rounded-full border border-slate-200 bg-[#f8f8f8] px-5 py-3 md:flex">
            <span className="text-slate-400">⌕</span>
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Search products..."
            />
          </div>
          <button className="rounded-full bg-[#5E7F85] px-5 py-2.5 text-sm font-semibold text-white shadow-sm">
            Bag 0
          </button>
        </div>
      </header>

      {mode === "brand" ? (
        <div className={brandBannerClassName}>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%)]" />
          <div className="absolute inset-y-0 left-0 w-[55%] bg-[linear-gradient(90deg,rgba(17,24,39,0.22),rgba(17,24,39,0))]" />

          <div className="relative mx-auto grid max-w-[1480px] items-center gap-6 px-6 py-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:py-6">
            <div className="max-w-2xl">
              <h1 className="mt-4 text-[2rem] font-bold leading-[1.05] tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] md:text-[2.7rem]">
                <span className="bg-[linear-gradient(90deg,#ffffff,#dfe9ec)] bg-clip-text text-transparent">
                  {currentBrand}
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-[0.98rem] leading-7 text-white/85 md:text-[1.02rem]">
                {brandInfo.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2.5">
                {brandInfo.tags.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[0.8rem] font-medium text-white/95 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#47656b] shadow-[0_8px_25px_rgba(255,255,255,0.18)] transition hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(255,255,255,0.25)] active:scale-[0.98]">
                  Shop {currentBrand}
                </button>
                <div className="flex items-center gap-3 text-[0.93rem] text-white/80">
                  <span className="h-2 w-2 rounded-full bg-white/75" />
                  <span>{brandInfo.availableText}</span>
                </div>
              </div>
            </div>

            <div className="relative hidden pl-6 lg:flex lg:justify-start">
              <div className="group relative -mt-6 flex h-[180px] w-[270px] scale-[1.08] items-center justify-center overflow-hidden rounded-[1.4rem] border border-white/25 bg-white/25 shadow-[0_25px_70px_rgba(15,23,42,0.28)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_30px_80px_rgba(15,23,42,0.4)]">
                <div className="absolute inset-0 rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.15))]" />

                <div className="absolute inset-0 rounded-[1.4rem] p-[1px] opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="h-full w-full rounded-[calc(1.4rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.2),rgba(255,255,255,0.7))]" />
                </div>

                <div className="absolute inset-[1px] rounded-[calc(1.4rem-1px)] bg-white/10 backdrop-blur-xl" />

                <div className="relative z-10 px-6 text-center">
                  <div className="absolute -inset-2 rounded-[2rem] bg-[radial-gradient(circle,rgba(255,255,255,0.45),transparent_70%)] opacity-80 blur-xl" />
                  <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/30 shadow-[0_8px_30px_rgba(255,255,255,0.25)] backdrop-blur-md transition duration-500 group-hover:scale-110">
                    {brandLogoSrc ? (
                      <img
                        src={brandLogoSrc}
                        alt={currentBrand}
                        className="h-full w-full object-contain p-2 drop-shadow-[0_4px_18px_rgba(255,255,255,0.2)]"
                      />
                    ) : (
                      <span className="text-xl font-bold text-white">
                        {currentBrand.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 text-[1.1rem] font-semibold tracking-wide text-white">
                    {currentBrand}
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0">
              <svg viewBox="0 0 1440 60" className="h-[20px] w-full" preserveAspectRatio="none">
                <path
                  d="M0,34 C220,70 420,8 720,34 C1010,60 1210,8 1440,36 L1440,76 L0,76 Z"
                  fill="#f7f7f7"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : null}

      <section className="mx-auto max-w-[1480px] px-6 py-8">
        {mode === "category" ? (
          <div className="mb-6 overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm">
            <div className="flex h-40 items-end bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-5 text-slate-700">
              <div>
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  Category
                </div>
                <div className="mt-2 text-3xl font-bold">{currentCategory}</div>
                <div className="mt-2 text-sm text-slate-500">Banner: {currentBanner}</div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="sticky top-6 hidden h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm xl:block">
            <div className="flex items-center justify-between">
              <h2 className="text-[2rem] font-bold leading-none">Filters</h2>
              {showClear ? (
                <button
                  onClick={clearAllFilters}
                  className="text-lg text-slate-500 hover:text-[#5E7F85]"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="mt-8 border-t border-slate-200 pt-8">
              <h3 className="text-[1.35rem] font-semibold">Price</h3>
              <div className="mt-5">
                <input
                  type="range"
                  min={minAvailablePrice}
                  max={maxAvailablePrice}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#5E7F85]"
                />
                <div className="mt-3 flex items-center justify-between text-[1rem] text-[#23395b]">
                  <span>৳ {minAvailablePrice}</span>
                  <span>৳ {maxPrice}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-8">
              <h3 className="text-[1.35rem] font-semibold">Product Categories</h3>

              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={() => setSelectedFreeDelivery((prev) => !prev)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition ${
                    selectedFreeDelivery
                      ? "bg-[#eef4f4]"
                      : "hover:bg-[#eef4f4] hover:text-[#5E7F85]"
                  }`}
                >
                  <span
                    className={`text-[1.08rem] leading-6 ${
                      selectedFreeDelivery
                        ? "font-semibold text-[#23395b]"
                        : "text-[#556b8e]"
                    }`}
                  >
                    Free Delivery
                  </span>
                  <span className="shrink-0 rounded-full bg-[#f2f2f2] px-3 py-1 text-[0.92rem] text-[#6e81a3]">
                    {PRODUCTS.filter((p) => p.freeDelivery).length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBestSeller((prev) => !prev)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition ${
                    selectedBestSeller
                      ? "bg-[#eef4f4]"
                      : "hover:bg-[#eef4f4] hover:text-[#5E7F85]"
                  }`}
                >
                  <span
                    className={`text-[1.08rem] leading-6 ${
                      selectedBestSeller ? "font-semibold text-[#23395b]" : "text-[#556b8e]"
                    }`}
                  >
                    Best Selling
                  </span>
                  <span className="shrink-0 rounded-full bg-[#f2f2f2] px-3 py-1 text-[0.92rem] text-[#6e81a3]">
                    {PRODUCTS.filter((p) => p.bestSeller).length}
                  </span>
                </button>
              </div>

              <div className="mt-5 space-y-2 text-[1.08rem] text-[#23395b]">
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      if (expandedCategory === "Shop By Concern") {
                        setExpandedCategory(null);
                        setCurrentConcern("All");
                      } else {
                        setExpandedCategory("Shop By Concern");
                        setCurrentCategory("All");
                      }
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition ${
                      expandedCategory === "Shop By Concern"
                        ? "bg-[#eef4f4]"
                        : "hover:bg-[#eef4f4] hover:text-[#5E7F85]"
                    }`}
                  >
                    <span
                      className={`leading-6 ${
                        expandedCategory === "Shop By Concern"
                          ? "font-semibold text-[#5E7F85]"
                          : "text-[#556b8e]"
                      }`}
                    >
                      Shop By Concern
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-[0.92rem] ${
                        expandedCategory === "Shop By Concern"
                          ? "bg-[#5E7F85] text-white"
                          : "bg-[#f2f2f2] text-[#6e81a3]"
                      }`}
                    >
                      {AVAILABLE_CONCERNS.length}
                    </span>
                  </button>

                  {expandedCategory === "Shop By Concern" ? (
                    <div className="ml-4 mt-1 space-y-1">
                      {AVAILABLE_CONCERNS.map((concern) => {
                        const isActive = currentConcern === concern;
                        return (
                          <button
                            key={concern}
                            type="button"
                            onClick={() => setCurrentConcern(isActive ? "All" : concern)}
                            className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition ${
                              isActive
                                ? "bg-[#eef4f4]"
                                : "hover:bg-[#eef4f4] hover:text-[#5E7F85]"
                            }`}
                          >
                            <span
                              className={`leading-6 ${
                                isActive ? "font-semibold text-[#5E7F85]" : "text-[#556b8e]"
                              }`}
                            >
                              {concern}
                            </span>
                            <span
                              className={`shrink-0 rounded-full px-3 py-1 text-[0.92rem] ${
                                isActive
                                  ? "bg-[#5E7F85] text-white"
                                  : "bg-[#f2f2f2] text-[#6e81a3]"
                              }`}
                            >
                              {PRODUCTS.filter((p) => p.concerns.includes(concern)).length}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>

                {AVAILABLE_CATEGORIES.map((item) => {
                  const isActive = currentCategory === item;
                  const isExpanded = expandedCategory === item;
                  const categorySubcategories = subcategoriesForCategory(item);

                  return (
                    <div key={item}>
                      <button
                        type="button"
                        onClick={() => {
                          if (isExpanded) {
                            setExpandedCategory(null);
                            setCurrentCategory("All");
                            setSelectedSubcategory("All");
                            setCurrentConcern("All");
                          } else {
                            setExpandedCategory(item);
                            setCurrentCategory(item);
                            setSelectedSubcategory("All");
                            setCurrentConcern("All");
                          }
                        }}
                        className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition ${
                          isActive
                            ? "bg-[#eef4f4]"
                            : "hover:bg-[#eef4f4] hover:text-[#5E7F85]"
                        }`}
                      >
                        <span
                          className={`leading-6 ${
                            isActive ? "font-semibold text-[#5E7F85]" : "text-[#556b8e]"
                          }`}
                        >
                          {item}
                        </span>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-[0.92rem] ${
                            isActive
                              ? "bg-[#5E7F85] text-white"
                              : "bg-[#f2f2f2] text-[#6e81a3]"
                          }`}
                        >
                          {categoryCount(item)}
                        </span>
                      </button>

                      {isExpanded ? (
                        <div className="ml-4 mt-1 space-y-1">
                          {categorySubcategories.map((subcategory) => {
                            const isSubActive = selectedSubcategory === subcategory;
                            return (
                              <button
                                key={`${item}-${subcategory}`}
                                type="button"
                                onClick={() => {
                                  setCurrentCategory(item);
                                  setSelectedSubcategory(isSubActive ? "All" : subcategory);
                                }}
                                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition ${
                                  isSubActive
                                    ? "bg-[#eef4f4]"
                                    : "hover:bg-[#eef4f4] hover:text-[#5E7F85]"
                                }`}
                              >
                                <span
                                  className={`leading-6 ${
                                    isSubActive
                                      ? "font-semibold text-[#5E7F85]"
                                      : "text-[#556b8e]"
                                  }`}
                                >
                                  {subcategory}
                                </span>
                                <span
                                  className={`shrink-0 rounded-full px-3 py-1 text-[0.92rem] ${
                                    isSubActive
                                      ? "bg-[#5E7F85] text-white"
                                      : "bg-[#f2f2f2] text-[#6e81a3]"
                                  }`}
                                >
                                  {subcategoryCount(item, subcategory)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-8">
              <h3 className="text-[1.35rem] font-semibold">Brands</h3>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8f8f8] px-4 py-3">
                <span className="text-slate-400">⌕</span>
                <input
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full bg-transparent text-[1rem] outline-none placeholder:text-slate-400"
                  placeholder="Search brand..."
                />
              </div>
              <div className="mt-5 space-y-2 text-[1.08rem] text-[#23395b]">
                {visibleBrands.map((item) => {
                  const isActive = selectedBrands.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedBrands((prev) => (prev.includes(item) ? [] : [item]))}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition ${
                        isActive
                          ? "bg-[#eef4f4]"
                          : "hover:bg-[#eef4f4] hover:text-[#5E7F85]"
                      }`}
                    >
                      <span
                        className={`leading-6 ${
                          isActive ? "font-semibold text-[#5E7F85]" : "text-[#556b8e]"
                        }`}
                      >
                        {item}
                      </span>
                    </button>
                  );
                })}
                {visibleBrands.length === 0 ? (
                  <div className="text-sm text-slate-400">No brand found</div>
                ) : null}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-4 xl:hidden">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="w-full rounded-xl bg-[#5E7F85] px-4 py-3 font-semibold text-white"
              >
                Filters
              </button>
            </div>

            <div className="mb-6 flex items-center gap-3 rounded-[1.4rem] border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <span className="text-[1.35rem] text-[#6f88ac]">⌕</span>
              <input
                className="w-full bg-transparent text-[1.08rem] outline-none placeholder:text-[#9aa8c0]"
                placeholder="Search here..."
              />
            </div>

            <div className="mb-6 flex items-center justify-end gap-3">
              <select className="rounded-xl border border-[#c9d5d8] bg-white px-6 py-3 text-[1.05rem] font-semibold text-[#23395b] outline-none shadow-sm">
                <option>Featured</option>
                <option>Best Selling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>

            {activeFilters.length > 0 ? (
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {activeFilters.map((filter, index) => (
                  <button
                    key={`${filter}-${index}`}
                    type="button"
                    onClick={() => removeActiveFilter(filter)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#d7e2e4] bg-white px-4 py-2 text-sm font-medium text-[#23395b] shadow-sm transition hover:border-[#5E7F85] hover:text-[#5E7F85]"
                  >
                    <span>{filter}</span>
                    <span className="text-slate-400">✕</span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d7e2e4] bg-white px-4 py-2 text-sm font-medium text-[#23395b] shadow-sm transition hover:border-[#5E7F85] hover:text-[#5E7F85]"
                >
                  Clear All
                </button>
              </div>
            ) : null}

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                No products found. Try adjusting filters.
              </div>
            ) : (
              <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.slice(0, 30).map((product, index) => (
                  <ProductCard key={`${product.name}-${index}`} product={product} />
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-3">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`h-11 min-w-11 rounded-2xl border px-4 text-sm font-semibold transition ${
                    page === 1
                      ? "border-[#5E7F85] bg-[#5E7F85] text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-[#5E7F85] hover:text-[#5E7F85]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

        {mobileFilterOpen ? (
          <div className="fixed inset-0 z-50 bg-black/40 xl:hidden">
            <div className="absolute left-0 top-0 h-full w-[85%] max-w-[360px] overflow-y-auto bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setMobileFilterOpen(false)}>✕</button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Price</h3>
                  <input
                    type="range"
                    min={minAvailablePrice}
                    max={maxAvailablePrice}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Brands</h3>
                  {AVAILABLE_BRANDS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrands((prev) => (prev.includes(b) ? [] : [b]))}
                      className={`block w-full py-2 text-left ${
                        selectedBrands.includes(b)
                          ? "font-semibold text-[#5E7F85]"
                          : "text-slate-600"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
