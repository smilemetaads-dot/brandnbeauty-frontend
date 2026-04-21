"use client";

import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";

type CartItem = {
  name: string;
  price: number;
  qty: number;
  image?: string;
  oldPrice?: number;
  badge?: string;
};

type ProductCard = {
  name: string;
  price: string;
  rating: string;
  image?: string;
  bestSeller?: boolean;
  slug?: string;
};

type ResultSlide = {
  src: string;
  mediaType: "image" | "video";
};

type ResultCard = {
  title: string;
  type: string;
  items: ResultSlide[];
};

type TrustItem = {
  title: string;
  key: "authentic" | "brands" | "science" | "support";
};

const TRUST_ITEMS: TrustItem[] = [
  { title: "100% Authentic Products", key: "authentic" },
  { title: "Verified Brands", key: "brands" },
  { title: "Science-Based Formulas", key: "science" },
  { title: "24/7 Support", key: "support" },
];

function TrustIcon({ iconKey }: { iconKey: TrustItem["key"] }) {
  const common = "h-6 w-6";

  if (iconKey === "authentic") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    );
  }

  if (iconKey === "brands") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h7l5 5-7 7-5-5V7z" />
        <circle cx="9.5" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (iconKey === "science") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v5l-4.8 8.1A3 3 0 007.8 21h8.4a3 3 0 002.6-4.9L14 8V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={common}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 5h12a2 2 0 012 2v8a2 2 0 0 1-2 2H9l-5 3V7a2 2 0 012-2z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.84 1.56 5.37 4 7.1V22l3.23-1.77c.88.24 1.81.37 2.77.37 5.52 0 10-4.03 10-9S17.52 2 12 2zm1.12 11.95-2.54-2.71-4.95 2.71 5.42-5.76 2.57 2.71 4.92-2.71-5.42 5.76z" />
    </svg>
  );
}

function SocialIcons() {
  const common = "group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-white/45 hover:bg-white hover:shadow-[0_18px_38px_rgba(0,0,0,0.22)]";

  return (
    <div className="mt-6 flex items-center gap-4">
      <a href="https://www.facebook.com/brandnbeauty" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={common}>
        <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-[18px] w-[18px] fill-current transition duration-300 group-hover:text-[#1877F2]">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.009 10.125 11.927V15.56H7.078v-3.487h3.047V9.414c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.931-1.956 1.887v2.253h3.328l-.532 3.487h-2.796V24C19.612 23.082 24 18.092 24 12.073z" />
        </svg>
      </a>
      <a href="https://www.instagram.com/brandnbeauty" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={common}>
        <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-[18px] w-[18px] fill-current transition duration-300 group-hover:text-[#E4405F]">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8z" />
        </svg>
      </a>
      <a href="https://www.tiktok.com/@brandnbeauty" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={common}>
        <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-[18px] w-[18px] fill-current transition duration-300 group-hover:text-black">
          <path d="M14.5 3c.36 1.97 1.54 3.54 3.5 4.14v2.46a7.1 7.1 0 0 1-3.5-1.1v6.04A5.54 5.54 0 1 1 8.96 9v2.53a3.08 3.08 0 1 0 2.99 3.07V3h2.55z" />
        </svg>
      </a>
      <a href="https://www.youtube.com/@brandnbeauty" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={common}>
        <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-[18px] w-[18px] fill-current transition duration-300 group-hover:text-[#FF0033]">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.4.58A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.88.58 9.4.58 9.4.58s7.52 0 9.4-.58a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.75 15.47V8.53L15.75 12l-6 3.47z" />
        </svg>
      </a>
    </div>
  );
}

export default function BrandnBeautyWebsite() {
  const categories = [
    { name: "Skincare" },
    { name: "Hair Care" },
    { name: "Body Care" },
    { name: "Makeup" },
    { name: "Tools" },
    { name: "Fragrance" },
    { name: "Men's Care" },
    { name: "Mom & Baby" },
  ];

  const concerns = ["Acne", "Dark Spots", "Brightening", "Oily Skin", "Dry Skin", "Sensitive Skin", "Hairfall", "Dull Skin"];
  const brands = ["COSRX", "Some By Mi", "The Ordinary", "Beauty of Joseon", "Simple", "CeraVe", "L'Oreal", "BrandnBeauty"];

  const products: ProductCard[] = [
    { name: "Acne Balance Facewash", price: "৳890", rating: "4.8", image: "/products/acne-balance-facewash.jpg", bestSeller: true },
    { name: "Barrier Calm Serum", price: "৳990", rating: "4.9", image: "/products/barrier-calm-serum.jpg", bestSeller: true },
    { name: "Glow Support Cleanser", price: "৳1,150", rating: "4.7", image: "/products/glow-support-cleanser.jpg", bestSeller: true },
    { name: "Scalp Balance Shampoo", price: "৳780", rating: "4.6", image: "/products/scalp-balance-shampoo.jpg", bestSeller: true },
    { name: "Hydra Gel Moisturizer", price: "৳850", rating: "4.8", image: "/products/hydra-gel-moisturizer.jpg", bestSeller: true },
    { name: "Body Glow Lotion", price: "৳1,290", rating: "4.7", image: "/products/body-glow-lotion.jpg", bestSeller: true },
    { name: "Daily Sun Gel", price: "৳1,250", rating: "4.8", image: "/products/daily-sun-gel.jpg", bestSeller: true },
    { name: "Lip Tint Duo", price: "৳690", rating: "4.6", image: "/products/lip-tint-duo.jpg", bestSeller: true },
  ];

  const collections = [
    { title: "Acne Care Set", image: "/collections/acne-care.jpg", overlay: "Acne Solution", badge: "Best for Acne", link: "/products?collection=acne-care-set" },
    { title: "Glow Routine", image: "/collections/glow-routine.jpg", overlay: "Daily Glow", badge: "Trending Now", link: "/products?collection=glow-routine" },
    { title: "Everyday Essentials", image: "/collections/budget-picks.jpg", overlay: "Daily Must-Haves", badge: "Daily Value", link: "/products?collection=budget-picks" },
    { title: "Luxury Picks", image: "/collections/premium-picks.jpg", overlay: "Luxury Edit", badge: "Top Tier", link: "/products?collection=premium-picks" },
  ];

  const community: ResultCard[] = [
    {
      title: "7 DAYS GLOW",
      type: "Before & After",
      items: [
        { src: "/results/glow-1.jpg", mediaType: "image" },
        { src: "/results/glow-2.mp4", mediaType: "video" },
        { src: "/results/glow-3.jpg", mediaType: "image" },
        { src: "/results/glow-4.jpg", mediaType: "image" },
        { src: "/results/glow-5.mp4", mediaType: "video" },
      ],
    },
    {
      title: "ACNE RESULT",
      type: "Skin Journey",
      items: [
        { src: "/results/acne-1.jpg", mediaType: "image" },
        { src: "/results/acne-2.jpg", mediaType: "image" },
        { src: "/results/acne-3.mp4", mediaType: "video" },
        { src: "/results/acne-4.jpg", mediaType: "image" },
        { src: "/results/acne-5.jpg", mediaType: "image" },
      ],
    },
    {
      title: "REAL REVIEW",
      type: "Customer Review",
      items: [
        { src: "/results/review-1.jpg", mediaType: "image" },
        { src: "/results/review-2.jpg", mediaType: "image" },
        { src: "/results/review-3.mp4", mediaType: "video" },
        { src: "/results/review-4.jpg", mediaType: "image" },
        { src: "/results/review-5.jpg", mediaType: "image" },
      ],
    },
    {
      title: "MY ROUTINE",
      type: "Routine Story",
      items: [
        { src: "/results/routine-1.mp4", mediaType: "video" },
        { src: "/results/routine-2.jpg", mediaType: "image" },
        { src: "/results/routine-3.mp4", mediaType: "video" },
        { src: "/results/routine-4.jpg", mediaType: "image" },
        { src: "/results/routine-5.jpg", mediaType: "image" },
      ],
    },
  ];

  const offerCards = [
    { title: "Buy 1 Get 1", img: "/offer-bogo.jpg", link: "/offers/bogo" },
    { title: "Combo Offer", img: "/offer-combo.jpg", link: "/offers/combo" },
    { title: "Clearance Sale", img: "/offer-clearance.jpg", link: "/offers/clearance" },
  ];

  const heroSlides = ["/hero-slide-1.jpg", "/hero-slide-2.jpg", "/hero-slide-3.jpg", "/hero-slide-4.jpg", "/hero-slide-5.jpg"];
  const specialOfferBanner = { image: "/special-offer-banner.jpg", alt: "Special offer banner", link: "/products?offer=special-offer" };

  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [resultIndexes, setResultIndexes] = useState<number[]>(community.map(() => 0));
  const [pausedResults, setPausedResults] = useState<boolean[]>(community.map(() => false));
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const bagCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const bagTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActiveCollection(params.get("collection"));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!activeCollection) return products;
    return products.filter((p) => {
      const name = p.name.toLowerCase();
      if (activeCollection === "acne-care-set") return name.includes("acne");
      if (activeCollection === "glow-routine") return name.includes("glow");
      if (activeCollection === "budget-picks") return Number(p.price.replace(/[^0-9]/g, "")) < 1000;
      if (activeCollection === "premium-picks") return Number(p.price.replace(/[^0-9]/g, "")) >= 1000;
      return true;
    });
  }, [activeCollection, products]);

  const bestSellers = useMemo(() => filteredProducts.filter((product) => product.bestSeller), [filteredProducts]);

  const addToCart = (productName: string, price: number, image?: string, oldPrice?: number, badge?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === productName);
      if (existing) {
        return prev.map((item) => (item.name === productName ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { name: productName, price, qty: 1, image, oldPrice, badge }];
    });
  };

  const updateCartQty = (productName: string, change: number) => {
    setCartItems((prev) => prev.map((item) => (item.name === productName ? { ...item, qty: Math.max(1, item.qty + change) } : item)));
  };

  const removeCartItem = (productName: string) => {
    setCartItems((prev) => prev.filter((item) => item.name !== productName));
  };

  const handleCheckout = () => {
    if (bagCount === 0) return;
    window.location.href = "/checkout";
  };

  const goToBrandPage = (brandName: string) => {
    window.location.href = `/brands?brand=${encodeURIComponent(brandName)}`;
  };

  const goToBrandLetter = (letter: string) => {
    window.location.href = `/brands?letter=${encodeURIComponent(letter)}`;
  };

  const goToCategoryPage = (categoryName: string, subcategoryName?: string) => {
    const params = new URLSearchParams();
    params.set("category", categoryName);
    if (subcategoryName) params.set("subcategory", subcategoryName);
    window.location.href = `/products?${params.toString()}`;
  };

  const goToCollectionPage = (collectionLink: string) => {
    window.location.href = collectionLink;
  };

  const getRealResultLink = (title: string) => {
    if (title === "7 DAYS GLOW") return "/products?collection=glow-routine";
    if (title === "ACNE RESULT") return "/products?collection=acne-care-set";
    if (title === "REAL REVIEW") return "/products?best-seller=true";
    if (title === "MY ROUTINE") return "/products?collection=routine-set";
    return "/products";
  };

  const slugifyProduct = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const goToProductDetails = (product: ProductCard) => {
    const productSlug = product.slug || slugifyProduct(product.name);
    window.location.href = `/product/${productSlug}`;
  };

  const handleResultCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, title: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.location.href = getRealResultLink(title);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((prev) => (prev + 1) % heroSlides.length), 3500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    else if (distance < -50) setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTouchStartX(null);
    setTouchEndX(null);
  }, [touchStartX, touchEndX, heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResultIndexes((prev) =>
        prev.map((currentIndex, cardIndex) => {
          if (pausedResults[cardIndex]) return currentIndex;
          const totalSlides = community[cardIndex]?.items.length || 1;
          return (currentIndex + 1) % totalSlides;
        }),
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [pausedResults, community]);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader
        bagCount={bagCount}
        brandSearch={brandSearch}
        onBrandSearchChange={setBrandSearch}
        onGoToBrandLetter={goToBrandLetter}
        onGoToBrandPage={goToBrandPage}
        onGoToCategoryPage={goToCategoryPage}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <section className="w-full">
        <div
          className="relative w-full overflow-hidden"
          onTouchStart={(e) => {
            setTouchEndX(null);
            setTouchStartX(e.targetTouches[0].clientX);
          }}
          onTouchMove={(e) => setTouchEndX(e.targetTouches[0].clientX)}
          onTouchEnd={() => {
            if (touchStartX !== null && touchEndX === null) setTouchStartX(null);
          }}
        >
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {heroSlides.map((src, idx) => (
              <div key={src} className="relative w-full shrink-0">
                <div className="flex h-[320px] w-full items-center justify-center bg-gradient-to-r from-[#e8efef] to-[#f8fafb] text-slate-400 md:h-[420px]">Hero Slide {idx + 1}</div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 md:hidden">
            {heroSlides.map((_, dot) => (
              <button key={dot} onClick={() => setActiveSlide(dot)} className={`h-3 w-3 rounded-full ${activeSlide === dot ? "bg-white" : "bg-white/40"}`} />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mt-4 flex justify-center gap-3">
            {heroSlides.map((_, dot) => (
              <button key={dot} onClick={() => setActiveSlide(dot)} className={`h-3 w-3 rounded-full transition ${activeSlide === dot ? "scale-110 bg-[#5E7F85]" : "bg-slate-300"}`} />
            ))}
          </div>

          <a href={specialOfferBanner.link} className="mt-6 block overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-sm transition hover:-translate-y-[1px] hover:shadow-lg">
            <div className="flex h-[140px] w-full items-center justify-center bg-[#edf3f3] text-slate-400 md:h-[170px]">Special Offer Banner</div>
          </a>

          <div className="mb-4 mt-10 text-center">
            <h3 className="text-xl font-semibold tracking-tight text-[#5E7F85] md:text-2xl">SPECIAL OFFERS</h3>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {offerCards.map((item) => (
              <a key={item.title} href={item.link} className="group block cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-[#f3f7f7] text-slate-400">
                  {item.title}
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">SHOP BY CATEGORY</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => (
              <button key={item.name} type="button" onClick={() => goToCategoryPage(item.name)} className="cursor-pointer overflow-hidden rounded-3xl border border-[#5E7F85] bg-gradient-to-br from-[#5E7F85] to-[#6f9aa0] text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex aspect-square w-full items-center justify-center bg-white text-sm text-slate-400">Category Image</div>
                <div className="p-4">
                  <div className="text-center text-lg font-semibold text-white">{item.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="concerns" className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">SHOP BY CONCERN</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {concerns.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  window.location.href = `/products?concern=${encodeURIComponent(item)}`;
                }}
                className="cursor-pointer overflow-hidden rounded-3xl border border-[#5E7F85] bg-gradient-to-br from-[#5E7F85] to-[#6f9aa0] text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex aspect-square items-center justify-center bg-white text-sm text-slate-400">Concern</div>
                <div className="px-5 py-4 text-center text-sm font-medium text-white">{item}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="brands" className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">FEATURED BRANDS</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand) => (
              <button key={brand} type="button" onClick={() => goToBrandPage(brand)} className="cursor-pointer overflow-hidden rounded-3xl border border-[#5E7F85] bg-gradient-to-br from-[#5E7F85] to-[#6f9aa0] text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex aspect-square items-center justify-center bg-white text-sm text-slate-400">Brand Logo</div>
                <div className="px-5 py-4 text-center text-sm font-medium text-white">{brand}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">BEST SELLING NOW</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((p, index) => {
              const currentPrice = Number(p.price.replace(/[^0-9]/g, ""));
              const oldPrice = Math.round(currentPrice * 1.35);
              const isFreeShipping = index % 2 === 0;
              return (
                <div key={p.name} className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
                  <button type="button" onClick={() => goToProductDetails(p)} className="flex flex-1 cursor-pointer flex-col text-left">
                    <div className="relative">
                      <div className="group relative aspect-square overflow-hidden bg-[#f3f3f3]">
                        <div className="absolute left-2 top-2 z-10 rounded-lg bg-[#6f8f95] px-2 py-1 text-[11px] font-semibold text-white">{p.bestSeller ? "BEST SELLER" : "HOT PICK"}</div>
                        <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Product Image</div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col px-4 py-4">
                      <div className="line-clamp-2 text-sm font-medium text-slate-800 hover:text-[#5E7F85]">{p.name}</div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="inline-block rounded-full bg-[#6f8f95]/10 px-3 py-1 text-[10px] font-semibold text-[#5E7F85]">{isFreeShipping ? "FREE SHIPPING" : "LIMITED STOCK"}</span>
                      </div>
                      <div className="mt-2 text-[11px] font-medium text-[#5E7F85]">🔥 2.3k sold this week</div>
                      <div className="mt-2 flex items-center gap-1 text-[12px] text-amber-500">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span className="text-amber-400">★</span>
                        <span className="ml-1 text-slate-500">({p.rating})</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-slate-400 line-through">৳ {oldPrice}</span>
                        <span className="font-semibold text-[#5E7F85]">৳ {currentPrice}</span>
                      </div>
                    </div>
                  </button>
                  <div className="mt-auto">
                    <button onClick={() => addToCart(p.name, currentPrice, p.image, oldPrice, isFreeShipping ? "FREE SHIPPING" : "SALE")} className="w-full cursor-pointer bg-[#5E7F85] py-4 text-sm font-semibold text-white transition hover:bg-[#4e6e73] active:scale-[0.98]">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">EDITOR’S PICKS</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {collections.map((item) => (
              <button key={item.title} type="button" onClick={() => goToCollectionPage(item.link)} className="group overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl">
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#f4f7f7] text-slate-400">
                  {item.title}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
                  <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">{item.badge}</div>
                  <div className="absolute bottom-3 left-3 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold tracking-[0.06em] text-[#5E7F85] shadow-sm">{item.overlay}</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E7F85] to-[#6f9aa0] px-4 py-4 text-center text-sm font-bold uppercase tracking-[0.08em] text-white transition group-hover:from-[#54747a] group-hover:to-[#678f95]">
                  {item.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">REAL RESULTS</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {community.map((item, cardIndex) => {
              const activeIndex = resultIndexes[cardIndex] || 0;
              const isPaused = pausedResults[cardIndex];
              return (
                <div
                  key={item.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    window.location.href = getRealResultLink(item.title);
                  }}
                  onKeyDown={(e) => handleResultCardKeyDown(e, item.title)}
                  className="cursor-pointer overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5E7F85]/40"
                >
                  <div className="relative min-h-[420px] aspect-[9/16] overflow-hidden bg-[#f6f8f8]">
                    <div className="flex h-full w-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                      {item.items.map((slide, idx) => (
                        <div key={idx} className="flex min-w-full items-center justify-center text-slate-400">
                          {slide.mediaType === "video" ? `Video ${idx + 1}` : `Image ${idx + 1}`}
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-800">{item.type}</div>
                    <div className="absolute right-3 top-3 flex items-center gap-2">
                      <div className="rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">{activeIndex % 2 === 0 ? "🔇" : "🔊"}</div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPausedResults((prev) => prev.map((value, idx) => (idx === cardIndex ? !value : value)));
                        }}
                        className="rounded-full bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
                      >
                        {isPaused ? "Play" : "Pause"}
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xl font-semibold uppercase tracking-tight">{item.title}</div>
                      <div className="mt-3 flex items-center gap-2">
                        {item.items.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setResultIndexes((prev) => prev.map((value, idx) => (idx === cardIndex ? dotIndex : value)));
                            }}
                            className={`h-2.5 rounded-full transition ${activeIndex === dotIndex ? "w-6 bg-white" : "w-2.5 bg-white/45"}`}
                            aria-label={`Go to slide ${dotIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f7] py-6 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {TRUST_ITEMS.map((item, index) => (
              <div key={item.title} className="flex items-center justify-center gap-3 rounded-full bg-transparent px-2 py-1 sm:justify-start lg:justify-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9d5d8] bg-white text-[#5E7F85]">
                  <TrustIcon iconKey={item.key} />
                </span>
                <span className="text-sm font-semibold tracking-wide text-slate-900">{item.title}</span>
                {index !== TRUST_ITEMS.length - 1 ? <div className="ml-2 hidden h-8 w-px bg-slate-300 lg:block"></div> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white md:hidden">
        <div className="grid grid-cols-4 text-center text-[11px] font-medium text-slate-700">
          {["Home", "Shop", "Brands", "Bag"].map((label) => (
            <a key={label} href="#" className="px-2 py-3 hover:bg-stone-50">
              <div className="text-base">•</div>
              <div>{label}</div>
            </a>
          ))}
        </div>
      </div>

      <a onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }} href="#" className="group fixed right-0 top-1/2 z-40 -translate-y-1/2 overflow-hidden rounded-l-2xl border border-slate-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center justify-center bg-[#5E7F85] px-3 py-3 text-white">
          <div className="mt-1 text-[11px] font-semibold">{bagCount} ITEMS</div>
        </div>
        <div className="border-t border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#5E7F85]">৳ {bagTotal}</div>
      </a>

      <a
        href="https://m.me/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#5E7F85] text-white shadow-[0_18px_40px_rgba(94,127,133,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#4e6e73] hover:shadow-[0_24px_50px_rgba(94,127,133,0.45)]"
        aria-label="Open Messenger"
      >
        <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-[#5E7F85] opacity-60 blur-md"></span>
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/16 ring-1 ring-white/20 transition group-hover:bg-white/20">
          <MessengerIcon />
        </span>
      </a>

      <footer className="border-t border-[#5E7F85] bg-[#5E7F85] pb-16 text-white md:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center">
                <div className="text-4xl font-bold tracking-tight">BrandnBeauty</div>
              </div>
              <SocialIcons />
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Explore</div>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <a href="#categories" className="block transition hover:text-white">Categories</a>
                <a href="#concerns" className="block transition hover:text-white">Concerns</a>
                <a href="#brands" className="block transition hover:text-white">Brands</a>
                <a href="#" className="block transition hover:text-white">Best Sellers</a>
                <a href="#" className="block transition hover:text-white">Offers</a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Support</div>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <a href="https://m.me/yourpage" className="block transition hover:text-white">Messenger Support</a>
                <a href="#" className="block transition hover:text-white">Track Order</a>
                <a href="#" className="block transition hover:text-white">FAQ</a>
                <a href="tel:+8800000000000" className="block transition hover:text-white">Call Support</a>
                <a href="mailto:hello@brandnbeauty.com" className="block transition hover:text-white">hello@brandnbeauty.com</a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Policies</div>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <a href="#" className="block transition hover:text-white">Privacy Policy</a>
                <a href="#" className="block transition hover:text-white">Terms & Conditions</a>
                <a href="#" className="block transition hover:text-white">Refund Policy</a>
                <a href="#" className="block transition hover:text-white">Shipping Policy</a>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5 text-sm text-white/70 md:flex md:items-center md:justify-between">
            <div className="w-full text-center">Copyright © 2026 BrandnBeauty. All Right Reserved</div>
          </div>
        </div>
      </footer>

      {isCartOpen ? <button type="button" aria-label="Close cart overlay" onClick={() => setIsCartOpen(false)} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]" /> : null}

      <div className={`fixed right-0 top-0 z-50 h-full w-[440px] bg-white shadow-2xl transition-transform duration-300 ease-out md:w-[460px] ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="relative border-b border-slate-200 px-5 py-5">
          <div className="text-center text-[1.05rem] font-semibold tracking-[0.2em] text-slate-800">BAG</div>
          <button onClick={() => setIsCartOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-500 transition hover:text-slate-800">✕</button>
        </div>

        <div className="space-y-4 p-4 pb-28">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-6 text-6xl text-slate-400">👜</div>
              <div className="text-lg font-medium text-slate-600">Your Shopping Bag is Empty</div>
              <button onClick={() => setIsCartOpen(false)} className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white">START SHOPPING</button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200/80 bg-[#fcfcfb] p-4 shadow-sm">
                <div className="flex gap-4">
                  <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                    {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : <div className="text-[11px] font-medium text-slate-400">Product</div>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="line-clamp-2 text-[15px] font-semibold leading-5 text-slate-800">{item.name}</div>
                        {item.badge ? <div className="mt-2 inline-flex rounded-full bg-[#eef4f4] px-2.5 py-1 text-[10px] font-semibold text-[#5E7F85]">{item.badge}</div> : null}
                      </div>
                      <button onClick={() => removeCartItem(item.name)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-[#5E7F85] hover:text-[#5E7F85]" aria-label="Remove item" title="Remove">×</button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-[13px]">
                        {item.oldPrice ? <span className="text-slate-400 line-through">৳ {item.oldPrice}</span> : null}
                        <span className="font-semibold text-slate-800">৳ {item.price}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] text-slate-400">Total</div>
                        <div className="text-[15px] font-bold text-[#5E7F85]">৳ {(item.price * item.qty).toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <div className="flex items-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                        <button onClick={() => updateCartQty(item.name, -1)} className="flex h-9 w-9 items-center justify-center text-base font-semibold text-slate-600 transition hover:bg-slate-100">−</button>
                        <div className="flex h-9 min-w-[40px] items-center justify-center border-x border-slate-200 text-sm font-semibold text-slate-800">{item.qty}</div>
                        <button onClick={() => updateCartQty(item.name, 1)} className="flex h-9 w-9 items-center justify-center text-base font-semibold text-slate-600 transition hover:bg-slate-100">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t border-slate-200 bg-white/95 p-5 backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
            <span>Subtotal</span>
            <span className="text-[1.05rem] font-semibold text-slate-900">৳ {bagTotal}</span>
          </div>
          <button onClick={handleCheckout} disabled={bagCount === 0} className={`w-full rounded-xl py-3 font-semibold text-white transition ${bagCount === 0 ? "cursor-not-allowed bg-slate-300" : "bg-[#5E7F85] hover:bg-[#4e6e73]"}`}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
