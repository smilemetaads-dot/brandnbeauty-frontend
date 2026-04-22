"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const PREVIEW_PAGE = "cart";

type PreviewPage = "home" | "category" | "pdp" | "cart";

type CartItem = {
  name: string;
  brand: string;
  price: number;
  qty: number;
};

function calculateCartSummary(
  items: CartItem[],
  freeDeliveryThreshold = 1500,
  deliveryCharge = 80
) {
  const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
  const remainingForFreeDelivery = Math.max(freeDeliveryThreshold - subtotal, 0);
  const delivery = subtotal >= freeDeliveryThreshold ? 0 : deliveryCharge;
  const total = subtotal + delivery;

  return {
    subtotal,
    freeDeliveryThreshold,
    remainingForFreeDelivery,
    delivery,
    total,
  };
}

function runCartSummaryTests() {
  const case1 = calculateCartSummary([
    { name: "A", brand: "B", price: 890, qty: 1 },
    { name: "C", brand: "D", price: 990, qty: 1 },
  ]);

  if (case1.subtotal !== 1880) throw new Error("Test failed: subtotal should be 1880");
  if (case1.delivery !== 0) {
    throw new Error("Test failed: delivery should be free at threshold or above");
  }
  if (case1.total !== 1880) {
    throw new Error("Test failed: total should be 1880 when delivery is free");
  }

  const case2 = calculateCartSummary([{ name: "A", brand: "B", price: 500, qty: 2 }]);
  if (case2.subtotal !== 1000) throw new Error("Test failed: subtotal should be 1000");
  if (case2.delivery !== 80) {
    throw new Error("Test failed: delivery should be 80 below threshold");
  }
  if (case2.remainingForFreeDelivery !== 500) {
    throw new Error("Test failed: remaining amount should be 500");
  }
  if (case2.total !== 1080) throw new Error("Test failed: total should be 1080");

  const case3 = calculateCartSummary([]);
  if (case3.subtotal !== 0) throw new Error("Test failed: empty cart subtotal should be 0");
  if (case3.delivery !== 80) {
    throw new Error("Test failed: empty cart delivery should be default delivery charge");
  }

  const case4 = calculateCartSummary([{ name: "A", brand: "B", price: 1500, qty: 1 }]);
  if (case4.subtotal !== 1500) {
    throw new Error("Test failed: threshold subtotal should be 1500");
  }
  if (case4.delivery !== 0) {
    throw new Error("Test failed: exact threshold should unlock free delivery");
  }
  if (case4.remainingForFreeDelivery !== 0) {
    throw new Error("Test failed: remaining should be 0 at threshold");
  }

  const case5 = calculateCartSummary([{ name: "A", brand: "B", price: 300, qty: 3 }]);
  if (case5.subtotal !== 900) {
    throw new Error("Test failed: subtotal should respect quantity multiplication");
  }

  const case6 = calculateCartSummary([{ name: "A", brand: "B", price: 890, qty: 2 }]);
  if (case6.subtotal !== 1780) {
    throw new Error("Test failed: subtotal should update for increased quantity");
  }
  if (case6.delivery !== 0) {
    throw new Error("Test failed: free delivery should apply after quantity increase");
  }
}

runCartSummaryTests();

export default function RealCartPage() {
  const [currentPage, setCurrentPage] = useState<PreviewPage>(PREVIEW_PAGE as PreviewPage);

  if (currentPage === "category") {
    return <CategoryPagePreview setCurrentPage={setCurrentPage} />;
  }
  if (currentPage === "pdp") {
    return <ProductDetailsPagePreview setCurrentPage={setCurrentPage} />;
  }
  if (currentPage === "cart") {
    return <CartPagePreview setCurrentPage={setCurrentPage} />;
  }
  return <HomePagePreview setCurrentPage={setCurrentPage} />;
}

function HomePagePreview({
  setCurrentPage,
}: {
  setCurrentPage: (page: PreviewPage) => void;
}) {
  const heroSlides = ["/hero-slide-1.jpg", "/hero-slide-2.jpg", "/hero-slide-3.jpg"];

  const categories = [
    { name: "Skincare", desc: "Facewash, serum, moisturizer" },
    { name: "Hair Care", desc: "Shampoo, scalp care, serum" },
    { name: "Body Care", desc: "Body wash, lotion, scrub" },
    { name: "Makeup", desc: "Daily makeup essentials" },
    { name: "Tools", desc: "Brushes & useful beauty tools" },
    { name: "Fragrance", desc: "Everyday fragrance picks" },
    { name: "Men's Care", desc: "Simple grooming essentials" },
    { name: "Mom & Baby", desc: "Gentle care for family" },
  ];

  const concerns = [
    "Acne",
    "Dark Spots",
    "Brightening",
    "Oily Skin",
    "Dry Skin",
    "Sensitive Skin",
    "Hairfall",
    "Dull Skin",
  ];
  const brands = [
    "COSRX",
    "Some By Mi",
    "The Ordinary",
    "Beauty of Joseon",
    "Simple",
    "CeraVe",
    "L'Oréal",
    "BrandnBeauty",
  ];
  const bestSellers = [
    {
      name: "Acne Balance Facewash",
      brand: "Some By Mi",
      price: "৳890",
      sold: "1.2k sold",
      rating: "4.8",
      tag: "Acne",
    },
    {
      name: "Barrier Calm Serum",
      brand: "BrandnBeauty",
      price: "৳990",
      sold: "860 sold",
      rating: "4.9",
      tag: "Sensitive Skin",
    },
    {
      name: "Glow Support Cleanser",
      brand: "Beauty of Joseon",
      price: "৳1,150",
      sold: "940 sold",
      rating: "4.7",
      tag: "Brightening",
    },
    {
      name: "Scalp Balance Shampoo",
      brand: "L'Oréal",
      price: "৳780",
      sold: "1.5k sold",
      rating: "4.6",
      tag: "Hairfall",
    },
    {
      name: "Hydra Gel Moisturizer",
      brand: "Simple",
      price: "৳850",
      sold: "710 sold",
      rating: "4.8",
      tag: "Oily Skin",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="BrandnBeauty" className="h-10 w-auto" />
          </a>

          <div className="flex flex-1 items-center justify-center gap-6 pr-8">
            <a href="#brands" className="hidden text-sm font-medium text-slate-700 md:block">
              Brands
            </a>
            <div className="hidden w-full max-w-lg items-center gap-3 rounded-full border border-[#c9d5d8] bg-stone-50 px-5 py-2 shadow-sm md:flex">
              <span className="text-slate-400">⌕</span>
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="Search skincare, hair care, makeup..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-[#c9d5d8] bg-white px-5 py-2 text-sm font-semibold text-slate-700 md:block">
              Wishlist
            </button>
            <button className="hidden rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700 md:block">
              Login
            </button>
            <button className="rounded-full bg-[#5E7F85] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90">
              Bag 0
            </button>
          </div>
        </div>
      </header>

      <section className="w-full">
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {heroSlides.map((src, idx) => (
              <div key={src} className="relative w-full shrink-0">
                <img
                  src={src}
                  alt={`BrandnBeauty Hero ${idx + 1}`}
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5" />
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setActiveSlide((activeSlide + heroSlides.length - 1) % heroSlides.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur"
          >
            ←
          </button>
          <button
            onClick={() => setActiveSlide((activeSlide + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur"
          >
            →
          </button>
        </div>
      </section>

      <section id="categories" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8">
            <div className="text-sm font-medium text-slate-500">Main Categories</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Shop by Category
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => (
              <div
                key={item.name}
                className="rounded-3xl border border-slate-200 bg-stone-50 p-6 shadow-sm"
              >
                <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-2xl bg-white text-sm text-slate-400 ring-1 ring-slate-200">
                  Category Image
                </div>
                <div className="text-lg font-semibold">{item.name}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="concerns" className="border-y border-slate-200 bg-stone-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-medium text-slate-500">Skincare Help</div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                Shop by Concern
              </h2>
            </div>
            <div className="text-sm text-slate-500">
              Find products faster based on your skin concern.
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {concerns.map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-stone-100 text-sm text-slate-400">
                  Concern
                </div>
                <div className="px-5 py-4 text-sm font-medium text-slate-900">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="brands" className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-slate-500">Brands</div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                Featured Brands
              </h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brands.map((brand) => (
              <div
                key={brand}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-stone-50 text-center shadow-sm"
              >
                <div className="flex aspect-[5/3] items-center justify-center bg-white text-sm text-slate-400 ring-1 ring-slate-200">
                  Brand Logo
                </div>
                <div className="p-5 font-semibold">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8">
            <div className="text-sm font-medium text-slate-500">Popular</div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Best Sellers
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {bestSellers.map((p) => (
              <div
                key={p.name}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-stone-100 text-sm text-slate-400">
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
                    {p.tag}
                  </div>
                  Product Image
                </div>
                <div className="mt-4 text-xs text-slate-500">{p.brand}</div>
                <div className="text-base font-semibold">{p.name}</div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="font-semibold">{p.price}</span>
                  <span className="text-slate-500">⭐ {p.rating}</span>
                </div>
                <div className="mt-2 text-xs text-slate-500">{p.sold}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ProductDetailsPagePreview({
  setCurrentPage,
}: {
  setCurrentPage: (page: PreviewPage) => void;
}) {
  const thumbs = [
    "/products/pdp-1.jpg",
    "/products/pdp-2.jpg",
    "/products/pdp-3.jpg",
    "/products/pdp-4.jpg",
  ];
  const related = [
    { name: "Barrier Calm Serum", brand: "BrandnBeauty", price: "৳990" },
    { name: "Hydra Gel Moisturizer", brand: "Simple", price: "৳850" },
    { name: "Daily Sun Gel", brand: "Beauty of Joseon", price: "৳1,250" },
    { name: "Pore Clay Mask", brand: "COSRX", price: "৳1,050" },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="BrandnBeauty" className="h-10 w-auto" />
          </a>
          <button className="rounded-full bg-[#5E7F85] px-5 py-2 text-sm font-semibold text-white shadow-sm">
            Bag 0
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-4 text-sm text-slate-500">
          Home / Skincare / Acne Balance Facewash
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex aspect-square items-center justify-center rounded-[1.5rem] bg-stone-100 text-sm text-slate-400">
                Main Product Image
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {thumbs.map((img, i) => (
                <div
                  key={img}
                  className={`overflow-hidden rounded-2xl border bg-white p-2 shadow-sm ${
                    i === 0 ? "border-[#5E7F85]" : "border-slate-200"
                  }`}
                >
                  <div className="flex aspect-square items-center justify-center rounded-xl bg-stone-100 text-[11px] text-slate-400">
                    Image {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Acne Care
            </div>
            <div className="mt-4 text-sm text-slate-500">Some By Mi</div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Acne Balance Facewash
            </h1>
            <div className="mt-6 flex items-end gap-3">
              <div className="text-3xl font-bold">৳890</div>
              <div className="text-lg text-slate-400 line-through">৳1,050</div>
              <div className="rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-600">
                15% OFF
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600 md:text-base">
              A gentle acne-focused facewash designed to cleanse excess oil, dirt and
              buildup without leaving the skin feeling stripped.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold">You may also like</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {related.map((p) => (
              <div key={p.name} className="flex gap-3 rounded-2xl bg-stone-50 p-3">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white text-[11px] text-slate-400 ring-1 ring-slate-200">
                  Image
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-500">{p.brand}</div>
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {p.name}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

export function CartPagePreview({
  setCurrentPage,
}: {
  setCurrentPage: (page: PreviewPage) => void;
}) {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([
    { name: "Acne Balance Facewash", brand: "Some By Mi", price: 890, qty: 1 },
    { name: "Barrier Calm Serum", brand: "BrandnBeauty", price: 990, qty: 1 },
  ]);

  const updateQty = (name: string, change: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.name !== name) return item;
        return { ...item, qty: Math.max(1, item.qty + change) };
      })
    );
  };

  const removeItem = (name: string) => {
    setItems((prev) => prev.filter((item) => item.name !== name));
  };

  const { subtotal, freeDeliveryThreshold, remainingForFreeDelivery, delivery, total } =
    useMemo(() => calculateCartSummary(items), [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="BrandnBeauty" className="h-10 w-auto" />
            </Link>
            <div className="text-sm text-slate-500">Shopping Bag ({items.length})</div>
          </div>
        </header>

        <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl shadow-sm ring-1 ring-slate-200">
            🛍️
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Your cart is empty</h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Looks like you have not added anything yet. Explore products and build your
            routine.
          </p>
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="mt-6 rounded-2xl bg-[#5E7F85] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            Start Shopping
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="BrandnBeauty" className="h-10 w-auto" />
          </Link>
          <div className="text-sm text-slate-500">Shopping Bag ({items.length})</div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.name}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-stone-100 text-xs text-slate-400">
                  Image
                </div>

                <div className="flex-1">
                  <div className="text-xs text-slate-500">{item.brand}</div>
                  <div className="font-semibold">{item.name}</div>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateQty(item.name, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-700 transition hover:scale-110 hover:bg-stone-50 active:scale-95"
                    >
                      −
                    </button>
                    <span className="min-w-[20px] text-center text-sm font-semibold text-slate-700">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.name, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-700 transition hover:scale-110 hover:bg-stone-50 active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-1 self-center">
                  <div className="font-semibold">
                    ৳{(item.price * item.qty).toLocaleString()}
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeItem(item.name)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition hover:scale-105 hover:bg-rose-100 hover:text-rose-700"
                  >
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="sticky top-24 h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="mt-4 rounded-2xl bg-stone-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Free Delivery Progress</span>
                <span className="text-slate-500">
                  ৳{subtotal} / ৳{freeDeliveryThreshold}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                <div
                  className="h-full rounded-full bg-[#5E7F85]"
                  style={{
                    width: `${Math.min((subtotal / freeDeliveryThreshold) * 100, 100)}%`,
                  }}
                />
              </div>
              <div className="mt-3 text-xs text-slate-600">
                {remainingForFreeDelivery > 0
                  ? `Add ৳${remainingForFreeDelivery} more to get FREE delivery`
                  : "You unlocked FREE delivery"}
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{delivery === 0 ? "Free" : `৳${delivery.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between border-t pt-3 text-base font-semibold">
                <span>Total</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/checkout")}
              disabled={items.length === 0}
              className="mt-6 w-full rounded-2xl bg-[#5E7F85] py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="mt-3 w-full rounded-2xl border border-slate-300 py-3 text-sm font-semibold hover:bg-stone-50"
            >
              Continue Shopping
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}

export function CategoryPagePreview({
  setCurrentPage,
}: {
  setCurrentPage: (page: PreviewPage) => void;
}) {
  const filters = ["All", "Cleanser", "Serum", "Moisturizer", "Sunscreen", "Masks"];
  const products = [
    { name: "Acne Balance Facewash", brand: "Some By Mi", price: "৳890", tag: "Cleanser" },
    { name: "Barrier Calm Serum", brand: "BrandnBeauty", price: "৳990", tag: "Serum" },
    { name: "Hydra Gel Moisturizer", brand: "Simple", price: "৳850", tag: "Moisturizer" },
    { name: "Daily Sun Gel", brand: "Beauty of Joseon", price: "৳1,250", tag: "Sunscreen" },
    { name: "Glow Support Cleanser", brand: "BOJ", price: "৳1,150", tag: "Cleanser" },
    { name: "Night Repair Cream", brand: "BrandnBeauty", price: "৳1,180", tag: "Moisturizer" },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="BrandnBeauty" className="h-10 w-auto" />
          </a>
          <div className="hidden w-full max-w-xl items-center gap-3 rounded-full border border-[#c9d5d8] bg-stone-50 px-5 py-2 shadow-sm md:flex">
            <span className="text-slate-400">⌕</span>
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Search in skincare..."
            />
          </div>
          <button className="rounded-full bg-[#5E7F85] px-5 py-2 text-sm font-semibold text-white shadow-sm">
            Bag 0
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-4 text-sm text-slate-500">Home / Skincare</div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 overflow-hidden rounded-2xl">
            <img
              src="/banners/skincare-banner.jpg"
              alt="Skincare Banner"
              className="h-[180px] w-full object-cover"
            />
          </div>
          <div className="text-sm font-medium text-slate-500">Category</div>
          <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Skincare</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                Explore cleansers, serums, moisturizers, sunscreen and more from trusted
                beauty brands.
              </p>
            </div>
            <div className="rounded-2xl bg-stone-100 px-4 py-3 text-sm text-slate-600">
              1,200+ products available
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button className="text-sm text-[#5E7F85]">Clear</button>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-900">Subcategory</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {filters.map((item) => (
                  <button
                    key={item}
                    className="rounded-full border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:border-[#5E7F85] hover:text-[#5E7F85]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-col gap-3 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-600">Showing 1-6 of 128 results</div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">Sort by</span>
                <select className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none">
                  <option>Featured</option>
                  <option>Best Selling</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {products.map((p) => (
                <div
                  key={p.name}
                  className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
                      {p.tag}
                    </div>
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      Product Image
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-slate-500">{p.brand}</div>
                  <div className="mt-1 text-sm font-semibold leading-6 text-slate-900">
                    {p.name}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-slate-500">⭐ 4.7</div>
                    <div className="font-semibold">{p.price}</div>
                    <div className="text-xs text-slate-500">In stock</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
