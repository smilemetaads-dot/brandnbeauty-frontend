"use client";

import React from "react";

declare global {
  interface Window {
    __pdpMessageTimer?: number;
  }
}

type RelatedProduct = {
  name: string;
  price: string;
  oldPrice: string;
  tag: string;
  badge: string;
  rating: number;
};

type RoutineItem = {
  step: string;
  label: string;
  name: string;
  price: string;
  selected: boolean;
};

type BoughtTogetherItem = {
  name: string;
  price: string;
  oldPrice: string;
};

export default function RealProductDetailsPage() {
  const [selectedSize, setSelectedSize] = React.useState("100ml");
  const [activeInfoTab, setActiveInfoTab] = React.useState("description");
  const [quantity, setQuantity] = React.useState(1);
  const [bagCount, setBagCount] = React.useState(0);
  const [wishlistAdded, setWishlistAdded] = React.useState(false);
  const [flashMessage, setFlashMessage] = React.useState("");
  const [mainAddedToCart, setMainAddedToCart] = React.useState(false);
  const [routineBundleAdded, setRoutineBundleAdded] = React.useState(false);
  const [fbBundleAdded, setFbBundleAdded] = React.useState(false);
  const [addedRecommendationKeys, setAddedRecommendationKeys] = React.useState<
    Record<string, boolean>
  >({});
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);

  const thumbs = [
    "/products/pdp-1.jpg",
    "/products/pdp-2.jpg",
    "/products/pdp-3.jpg",
    "/products/pdp-4.jpg",
  ];

  const [activeImage, setActiveImage] = React.useState(thumbs[0]);
  const [isImageOpen, setIsImageOpen] = React.useState(false);

  const related: RelatedProduct[] = [
    {
      name: "Barrier Calm Serum",
      price: "৳990",
      oldPrice: "৳1,190",
      tag: "15% OFF",
      badge: "SALE",
      rating: 4.8,
    },
    {
      name: "Hydra Gel Moisturizer",
      price: "৳850",
      oldPrice: "৳990",
      tag: "12% OFF",
      badge: "FREE SHIPPING",
      rating: 4.7,
    },
    {
      name: "Daily Sun Gel",
      price: "৳1,250",
      oldPrice: "৳1,450",
      tag: "14% OFF",
      badge: "SALE",
      rating: 4.9,
    },
    {
      name: "Pore Clay Mask",
      price: "৳1,050",
      oldPrice: "৳1,250",
      tag: "16% OFF",
      badge: "SALE",
      rating: 4.6,
    },
  ];

  const routineUpsellInitial: RoutineItem[] = [
    {
      step: "Step 1",
      label: "Cleanser",
      name: "Acne Balance Facewash",
      price: "৳890",
      selected: true,
    },
    {
      step: "Step 2",
      label: "Treat",
      name: "Barrier Calm Serum",
      price: "৳990",
      selected: false,
    },
    {
      step: "Step 3",
      label: "Moisturize",
      name: "Hydra Gel Moisturizer",
      price: "৳850",
      selected: false,
    },
    {
      step: "Step 4",
      label: "Protect",
      name: "Daily Sun Gel",
      price: "৳1,250",
      selected: false,
    },
  ];

  const [routineUpsell, setRoutineUpsell] = React.useState<RoutineItem[]>(
    routineUpsellInitial
  );

  const frequentlyBought: BoughtTogetherItem[] = [
    { name: "Barrier Calm Serum", price: "৳990", oldPrice: "৳1,190" },
    { name: "Daily Sun Gel", price: "৳1,250", oldPrice: "৳1,450" },
  ];

  const recommendationTitles = [
    "Similar Products",
    "Recommended For You",
    "Recently Viewed",
  ];
  const recommendationProducts = [...related, ...related].slice(0, 8);

  const parsePrice = (p: string) => Number(String(p).replace(/[^0-9]/g, ""));
  const formatBDT = (n: number) => `৳${n.toLocaleString()}`;

  const fbTotal = frequentlyBought.reduce((sum, item) => sum + parsePrice(item.price), 0);
  const fbOldTotal = frequentlyBought.reduce(
    (sum, item) => sum + parsePrice(item.oldPrice),
    0
  );
  const fbSavings = fbOldTotal - fbTotal;

  const activeImageIndex = thumbs.indexOf(activeImage);

  const showMessage = (message: string) => {
    setFlashMessage(message);
    if (typeof window !== "undefined") {
      if (window.__pdpMessageTimer) {
        window.clearTimeout(window.__pdpMessageTimer);
      }
      window.__pdpMessageTimer = window.setTimeout(() => setFlashMessage(""), 1800);
    }
  };

  const handleDecreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncreaseQty = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    if (mainAddedToCart) {
      showMessage("Opening cart");
      return;
    }
    setBagCount((c) => c + quantity);
    setMainAddedToCart(true);
    showMessage(`${quantity} item added to cart`);
  };

  const PAGE_USERNAME = "yourpageusername";

  const handleMessengerOrder = () => {
    const message = encodeURIComponent(
      `I want to order Acne Balance Facewash (${selectedSize})`
    );
    const url = `https://m.me/${PAGE_USERNAME}?ref=${message}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const handleWishlist = () => {
    setWishlistAdded((prev) => {
      const next = !prev;
      showMessage(next ? "Added to wishlist" : "Removed from wishlist");
      return next;
    });
  };

  const handleAddBundleToCart = () => {
    if (fbBundleAdded) {
      showMessage("Opening cart");
      return;
    }

    setBagCount((c) => c + frequentlyBought.length);
    setFbBundleAdded(true);
    showMessage(`${frequentlyBought.length} bundle items added to cart`);
  };

  const handleToggleRoutine = (index: number) => {
    setRoutineBundleAdded(false);
    setRoutineUpsell((prev) =>
      prev.map((item, i) => (i === index ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleAddRoutineBundle = () => {
    const selectedItems = routineUpsell.filter((item) => item.selected);

    if (routineBundleAdded) {
      showMessage("Opening cart");
      return;
    }

    if (selectedItems.length === 0) {
      showMessage("Select at least one routine item");
      return;
    }

    setBagCount((c) => c + selectedItems.length);
    setRoutineBundleAdded(true);
    showMessage(`${selectedItems.length} routine items added to cart`);
  };

  const handleRecommendationAddToCart = (key: string, productName: string) => {
    if (addedRecommendationKeys[key]) {
      showMessage("Opening cart");
      return;
    }
    setBagCount((c) => c + 1);
    setAddedRecommendationKeys((prev) => ({ ...prev, [key]: true }));
    showMessage(`${productName} added to cart`);
  };

  const goToPrevImage = () => {
    const prevIndex = activeImageIndex <= 0 ? thumbs.length - 1 : activeImageIndex - 1;
    setActiveImage(thumbs[prevIndex]);
  };

  const goToNextImage = () => {
    const nextIndex = activeImageIndex >= thumbs.length - 1 ? 0 : activeImageIndex + 1;
    setActiveImage(thumbs[nextIndex]);
  };

  const handleImageTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleImageTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextImage();
      } else {
        goToPrevImage();
      }
    }
    setTouchStartX(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <div className="text-2xl font-bold tracking-tight text-slate-900">BrandnBeauty</div>
          <div className="hidden w-full max-w-xl items-center gap-3 rounded-full border border-[#c9d5d8] bg-stone-50 px-5 py-2 shadow-sm md:flex">
            <span className="text-slate-400">⌕</span>
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Search products..."
            />
          </div>
          <button className="rounded-full bg-[#5E7F85] px-5 py-2 text-sm font-semibold text-white shadow-sm">
            Bag {bagCount}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {flashMessage ? (
          <div className="mb-4 rounded-2xl border border-[#5E7F85]/20 bg-[#eef4f4] px-4 py-3 text-sm font-medium text-[#355055]">
            {flashMessage}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
              <div
                className="relative flex aspect-square items-center justify-center rounded-[1.5rem] bg-stone-100 text-sm text-slate-400"
                onTouchStart={handleImageTouchStart}
                onTouchEnd={handleImageTouchEnd}
              >
                <img
                  src={activeImage}
                  alt="product"
                  className="h-full w-full cursor-zoom-in object-contain"
                  onClick={() => setIsImageOpen(true)}
                />

                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 md:hidden">
                  {thumbs.map((img, index) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(img)}
                      className={`h-2.5 w-2.5 rounded-full ${
                        index === activeImageIndex ? "bg-[#5E7F85]" : "bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {thumbs.map((img) => (
                <div
                  key={img}
                  className={`overflow-hidden rounded-2xl border bg-white p-2 shadow-sm ${
                    activeImage === img ? "border-[#5E7F85]" : "border-slate-200"
                  }`}
                >
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-stone-100 text-[11px] text-slate-400">
                    <img
                      src={img}
                      alt="thumb"
                      onClick={() => setActiveImage(img)}
                      className="h-full w-full cursor-pointer object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid gap-5 sm:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center text-[#5E7F85]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-10 w-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3l6 2.5v5.5c0 4.2-2.6 8-6 10-3.4-2-6-5.8-6-10V5.5L12 3z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4"
                      />
                      <circle cx="12" cy="12" r="9" strokeDasharray="2 2" />
                    </svg>
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-700">
                    100% Authentic Product
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center text-[#5E7F85]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-10 w-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3a9 9 0 1 1-6.36 2.64"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 3H3v3" />
                      <text
                        x="12"
                        y="11"
                        textAnchor="middle"
                        fontSize="5.2"
                        fill="currentColor"
                        stroke="none"
                        fontWeight="700"
                      >
                        24/7
                      </text>
                      <text
                        x="12"
                        y="16"
                        textAnchor="middle"
                        fontSize="3.2"
                        fill="currentColor"
                        stroke="none"
                        fontWeight="600"
                      >
                        Support
                      </text>
                    </svg>
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-700">
                    24/7 Customer Support
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center text-[#5E7F85]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-10 w-10"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-700">
                    On Time Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Acne Balance Facewash
            </h1>

            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="font-semibold">⭐ 4.8</span>
                <span className="text-slate-500">128 reviews</span>
                <span className="text-slate-500">1.2k sold</span>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                    In Stock
                  </span>
                  <span className="text-sm font-semibold text-rose-600">Only 7 left</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="flex items-center gap-1 text-sm font-semibold text-rose-600">
                  🔥 327 people bought this in last 7 days
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <div className="text-3xl font-bold">৳890</div>
              <div className="text-lg text-slate-400 line-through">৳1,050</div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-[#5E7F85]">
                Save ৳160
              </div>
              <div className="rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-600">
                15% OFF
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-900">Size</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["100ml", "150ml"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      selectedSize === size
                        ? "border-[#5E7F85] bg-[#5E7F85] text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-[#5E7F85]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-900">Quantity</div>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex w-fit items-center gap-4 rounded-full border border-slate-300 px-4 py-2">
                  <button onClick={handleDecreaseQty} className="text-lg text-slate-500">
                    −
                  </button>
                  <span className="text-sm font-semibold">{quantity}</span>
                  <button onClick={handleIncreaseQty} className="text-lg text-slate-700">
                    +
                  </button>
                </div>

                <button
                  onClick={handleWishlist}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                    wishlistAdded
                      ? "bg-[#5E7F85] text-white"
                      : "bg-[#5E7F85] text-white opacity-80 hover:opacity-100"
                  }`}
                  aria-label="wishlist"
                  title="wishlist"
                >
                  {wishlistAdded ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-red-500">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-600 md:text-base">
              <strong className="text-[#5E7F85]">Why It Works:</strong> A gentle
              acne-focused facewash designed to cleanse excess oil, dirt and buildup
              without leaving the skin feeling stripped. It helps maintain a balanced,
              fresh look while supporting a simple and effective daily skincare routine.
            </p>

            <div className="mt-6">
              <div className="text-sm font-semibold text-[#5E7F85]">Best For:</div>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600 md:text-base">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#5E7F85]">•</span>
                  <span>Oily & Acne-Prone Skin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#5E7F85]">•</span>
                  <span>Blackheads & Clogged Pores</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-[#5E7F85]">•</span>
                  <span>Daily Gentle Cleansing</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">SKU:</span>
                <span className="font-semibold text-slate-600">20199</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500">Category:</span>
                <button
                  onClick={() => showMessage("Opening Skincare category products")}
                  className="font-semibold text-[#5E7F85]"
                >
                  Skincare
                </button>
                <span className="text-slate-400">,</span>
                <button
                  onClick={() => showMessage("Opening Cleanser category products")}
                  className="font-semibold text-[#5E7F85]"
                >
                  Cleanser
                </button>
              </div>

              <div className="flex items-start gap-2">
                <span className="pt-1 text-slate-500">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Acne Care", message: "Opening Acne Care products" },
                    { label: "Oil Control", message: "Opening Oil Control products" },
                    {
                      label: "Daily Cleanser",
                      message: "Opening Daily Cleanser products",
                    },
                  ].map((tag) => (
                    <button
                      key={tag.label}
                      onClick={() => showMessage(tag.message)}
                      className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500">Brand:</span>
                <button
                  onClick={() => showMessage("Opening LUX brand products")}
                  className="font-semibold text-[#5E7F85]"
                >
                  LUX
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleMessengerOrder}
                className="rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm hover:bg-stone-50"
              >
                Order via Messenger
              </button>

              <button
                onClick={handleAddToCart}
                className={`rounded-2xl px-5 py-4 text-sm font-semibold shadow-sm transition ${
                  mainAddedToCart
                    ? "border border-[#5E7F85] bg-[#eef4f4] text-[#355055] hover:bg-[#e4efef]"
                    : "bg-[#5E7F85] text-white hover:bg-[#4f6b70]"
                }`}
              >
                {mainAddedToCart ? "View Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="relative w-full max-w-3xl">
            <img src={activeImage} alt="full" className="w-full rounded-2xl bg-white object-contain" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsImageOpen(false);
              }}
              className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-sm font-semibold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Complete Your Routine
            </h2>
            <button
              onClick={handleAddRoutineBundle}
              className={`w-fit rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition ${
                routineBundleAdded
                  ? "border border-[#5E7F85] bg-[#eef4f4] text-[#355055] hover:bg-[#e4efef]"
                  : "bg-[#5E7F85] text-white hover:bg-[#4f6b70]"
              }`}
            >
              {routineBundleAdded ? "View Cart" : "Add Routine Bundle"}
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {routineUpsell.map((item, index) => (
              <div
                key={item.step}
                className={`rounded-3xl border p-5 ${
                  item.selected
                    ? "border-[#5E7F85] bg-[#f2f7f7]"
                    : "border-slate-200 bg-stone-50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    {item.step}
                  </div>
                  {item.selected ? (
                    <span className="rounded-full bg-[#5E7F85] px-2.5 py-1 text-[10px] font-semibold text-white">
                      Current
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 flex aspect-[4/3] items-center justify-center rounded-2xl bg-white text-sm text-slate-400 ring-1 ring-slate-200">
                  Product Image
                </div>
                <div className="mt-4 text-xs text-slate-500">{item.label}</div>
                <div className="mt-1 text-sm font-semibold leading-6 text-slate-900">
                  {item.name}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-semibold">{item.price}</div>
                  <button
                    onClick={() => handleToggleRoutine(index)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      item.selected
                        ? "bg-[#eef4f4] text-[#355055]"
                        : "bg-[#5E7F85] text-white"
                    }`}
                  >
                    {item.selected ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Frequently Bought Together
          </h2>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div className="flex flex-1 flex-wrap items-center gap-5">
              {frequentlyBought.map((item, idx) => (
                <React.Fragment key={item.name}>
                  <div className="relative flex min-w-[280px] flex-1 items-center gap-4 rounded-2xl bg-stone-50 p-4 md:max-w-[380px]">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white text-xs text-slate-400 ring-1 ring-slate-200">
                      Image
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-slate-900">
                        {item.name}
                      </div>
                      <div className="mt-1 text-sm font-semibold">{item.price}</div>
                    </div>
                  </div>
                  {idx < frequentlyBought.length - 1 ? (
                    <div className="text-2xl font-semibold text-[#5E7F85]">+</div>
                  ) : null}
                </React.Fragment>
              ))}
            </div>

            <div className="ml-auto flex flex-col items-center justify-center gap-3">
              <div className="text-lg text-slate-600">
                Total Price:{" "}
                <span className="font-bold text-[#5E7F85]">{formatBDT(fbTotal)}</span>
              </div>
              <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-[#5E7F85]">
                Save {formatBDT(fbSavings)} on this bundle
              </div>
              <button
                onClick={handleAddBundleToCart}
                className={`mt-1 rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition ${
                  fbBundleAdded
                    ? "border border-[#5E7F85] bg-[#eef4f4] text-[#355055] hover:bg-[#e4efef]"
                    : "bg-[#5E7F85] text-white hover:bg-[#4f6b70]"
                }`}
              >
                {fbBundleAdded ? "View Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Visible Results
            </h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-[#5E7F85]">
              Verified Customer Results
            </span>
          </div>

          <div className="mt-1 text-sm font-medium text-[#5E7F85]">
            What you may notice with regular use
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { days: "14 Days", concern: "Acne" },
              { days: "21 Days", concern: "Oily Skin" },
              { days: "7 Days", concern: "Blackheads" },
            ].map((item, i) => (
              <div
                key={i}
                className="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-stone-50 transition hover:shadow-md"
                onClick={() => setIsImageOpen(true)}
              >
                <div className="relative grid grid-cols-2">
                  <div className="flex aspect-square items-center justify-center bg-white text-xs text-slate-400 ring-1 ring-slate-200">
                    Before
                  </div>
                  <div className="flex aspect-square items-center justify-center bg-white text-xs text-slate-400 ring-1 ring-slate-200">
                    After
                  </div>

                  <div className="absolute left-2 top-2 rounded-full bg-[#5E7F85] px-2 py-0.5 text-[10px] font-semibold text-white">
                    {item.days}
                  </div>

                  <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#5E7F85]">
                    {item.concern}
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    Visible improvement in {item.concern.toLowerCase()}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Consistent routine usage
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="grid grid-cols-5 gap-3">
          {[
            { key: "description", label: "DESCRIPTION" },
            { key: "how_to_use", label: "HOW TO USE" },
            { key: "ingredients", label: "INGREDIENTS" },
            { key: "faq", label: "FAQ" },
            { key: "reviews", label: "CUSTOMER REVIEWS" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveInfoTab(tab.key)}
              className={`rounded-[1rem] px-3 py-4 text-center text-[12px] font-bold uppercase tracking-wide transition ${
                activeInfoTab === tab.key
                  ? "bg-[#5E7F85] text-white shadow-sm"
                  : "bg-[#dfe3e8] text-[#5f6f86] hover:bg-[#d6dbe2]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-5 px-1 md:px-2">
          {activeInfoTab === "description" ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Product Details</h2>
              <div className="mt-4 grid gap-2 text-justify text-sm leading-7 text-slate-600 md:text-base">
                <p>
                  This cleanser is designed for users who want a balanced daily wash
                  experience for oily or acne-prone skin. It focuses on cleansing excess
                  oil, dirt, and buildup while helping the routine stay simple and easy to
                  follow. It fits well into a beginner-friendly skincare routine for daily
                  use.
                </p>
              </div>
            </div>
          ) : null}

          {activeInfoTab === "how_to_use" ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">How to Use</h2>
              <div className="mt-4 grid gap-2 text-justify text-sm leading-7 text-slate-600 md:text-base">
                <p>
                  1. Wet your face with water. 2. Take a small amount and lather gently. 3.
                  Massage for 20–30 seconds. 4. Rinse well and follow with serum or
                  moisturizer.
                </p>
              </div>
            </div>
          ) : null}

          {activeInfoTab === "ingredients" ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Ingredients</h2>
              <div className="mt-4 grid gap-2 text-justify text-sm leading-7 text-slate-600 md:text-base">
                <p>
                  Salicylic Acid, Niacinamide, Zinc PCA, Glycerin, and mild surfactant base
                  with skin-supporting ingredients.
                </p>
              </div>
            </div>
          ) : null}

          {activeInfoTab === "faq" ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600 md:text-base">
                <div>
                  <p className="font-semibold text-slate-800">
                    Is this suitable for daily use?
                  </p>
                  <p className="mt-1">Yes, it is gentle enough to be used twice daily.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Can it help with acne?</p>
                  <p className="mt-1">
                    It helps control excess oil and supports acne-prone skin care routine.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Will it dry out my skin?</p>
                  <p className="mt-1">
                    No, it is designed to cleanse without stripping natural moisture.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {activeInfoTab === "reviews" ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>
              <div className="mt-4 space-y-4">
                {[1, 2, 3].map((r) => (
                  <div key={r} className="rounded-2xl bg-stone-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Customer {r}</div>
                      <div className="text-sm text-slate-500">⭐ 4.{9 - r}</div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Good everyday cleanser for oily skin. Feels balanced and easy to use
                      in a simple routine.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 pb-16 md:px-6">
        {recommendationTitles.map((title) => (
          <div key={title}>
            <h3 className="text-xl font-semibold">{title}</h3>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recommendationProducts.map((p, i) => {
                const recKey = `${title}-${i}-${p.name}`;
                const isAdded = !!addedRecommendationKeys[recKey];

                return (
                  <div
                    key={p.name + title + i}
                    className="flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1"
                  >
                    <div className="relative aspect-[1/0.75] overflow-hidden bg-[#f3f3f3]">
                      <div className="absolute left-0 top-0 rounded-br-xl bg-[#5E7F85] px-3 py-1.5 text-[0.95rem] font-bold text-white shadow-sm">
                        {p.tag}
                      </div>
                      <div className="absolute inset-3 flex items-center justify-center rounded-[1rem] bg-[#ececec] text-[1.1rem] text-[#8ca0bd]">
                        Image
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col px-4 pb-4 pt-3 text-left">
                      <div className="mt-2 min-h-[2.5rem] max-w-full line-clamp-2 text-[0.98rem] leading-6 text-[#354b72]">
                        {p.name}
                      </div>

                      {p.badge ? (
                        <div className="mt-3 inline-flex w-fit rounded-full bg-[#5E7F85] px-4 py-1.5 text-[0.85rem] font-semibold uppercase tracking-wide text-white">
                          {p.badge}
                        </div>
                      ) : null}

                      <div className="mt-3 flex items-center justify-between gap-3 text-[1rem]">
                        <span className="text-slate-400 line-through">{p.oldPrice}</span>
                        <span className="font-semibold text-[#5E7F85]">{p.price}</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                        <div className="flex items-center gap-2 text-[1rem] text-[#5d7aa3]">
                          <span className="text-[1.2rem] text-[#f4b400]">★</span>
                          <span>{p.rating}</span>
                        </div>
                        <div className="text-[1rem] text-[#5d7aa3]">In stock</div>
                      </div>

                      <button
                        onClick={() => handleRecommendationAddToCart(recKey, p.name)}
                        className={`mt-3 w-full px-4 py-3 text-sm font-semibold shadow-sm transition ${
                          isAdded
                            ? "rounded-xl border border-[#5E7F85] bg-[#eef4f4] text-[#355055] hover:bg-[#e4efef]"
                            : "rounded-xl bg-[#5E7F85] text-white hover:bg-[#4f6b70]"
                        }`}
                      >
                        {isAdded ? "View Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
