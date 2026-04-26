"use client";

import { addCartItem, cartUpdatedEvent, readCart } from "@/lib/cart/store";
import { mockProducts } from "@/lib/mock/products";
import type { ProductRecord } from "@/lib/types/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

type PDPContent = {
  sourceId: ProductRecord["id"];
  subcategory: string;
  rating: number;
  reviewCount: string;
  soldCount: string;
  urgencyText: string;
  recentBuyText: string;
  sizes: string[];
  bestFor: string[];
  tags: Array<{ label: string; href: string }>;
  description: string;
  tabDescription: string;
  howToUse: string;
  ingredients: string;
  faq: Array<{ question: string; answer: string }>;
};

const PRODUCT_LOOKUP = new Map(mockProducts.map((product) => [product.id, product]));

const PDP_CONTENT_BY_ID: Record<string, PDPContent> = {
  prd_acne_balance_facewash: {
    sourceId: "prd_acne_balance_facewash",
    subcategory: "Cleanser",
    rating: 4.8,
    reviewCount: "128 reviews",
    soldCount: "1.2k sold",
    urgencyText: "Only 7 left",
    recentBuyText: "327 people bought this in last 7 days",
    sizes: ["100ml", "150ml"],
    bestFor: [
      "Oily & Acne-Prone Skin",
      "Blackheads & Clogged Pores",
      "Daily Gentle Cleansing",
    ],
    tags: [
      { label: "Acne Care", href: "/concern?concern=acne" },
      { label: "Oil Control", href: "/concern?concern=oily-skin" },
      {
        label: "Daily Cleanser",
        href: "/category?category=skincare&subcategory=cleanser",
      },
    ],
    description:
      "A gentle acne-focused facewash designed to cleanse excess oil, dirt and buildup without leaving the skin feeling stripped. It helps maintain a balanced, fresh look while supporting a simple and effective daily skincare routine.",
    tabDescription:
      "This cleanser is designed for users who want a balanced daily wash experience for oily or acne-prone skin. It focuses on cleansing excess oil, dirt, and buildup while helping the routine stay simple and easy to follow. It fits well into a beginner-friendly skincare routine for daily use.",
    howToUse:
      "1. Wet your face with water. 2. Take a small amount and lather gently. 3. Massage for 20-30 seconds. 4. Rinse well and follow with serum or moisturizer.",
    ingredients:
      "Salicylic Acid, Niacinamide, Zinc PCA, Glycerin, and mild surfactant base with skin-supporting ingredients.",
    faq: [
      {
        question: "Is this suitable for daily use?",
        answer: "Yes, it is gentle enough to be used twice daily.",
      },
      {
        question: "Can it help with acne?",
        answer: "It helps control excess oil and supports acne-prone skin care routine.",
      },
      {
        question: "Will it dry out my skin?",
        answer: "No, it is designed to cleanse without stripping natural moisture.",
      },
    ],
  },
  prd_barrier_calm_serum: {
    sourceId: "prd_barrier_calm_serum",
    subcategory: "Serum",
    rating: 4.9,
    reviewCount: "94 reviews",
    soldCount: "860 sold",
    urgencyText: "Popular choice",
    recentBuyText: "214 people bought this in last 7 days",
    sizes: ["30ml"],
    bestFor: ["Sensitive Skin", "Barrier Support", "Daily Calming Care"],
    tags: [
      { label: "Sensitive Skin", href: "/concern?concern=sensitive-skin" },
      { label: "Barrier Care", href: "/concern?concern=sensitive-skin" },
      { label: "Daily Serum", href: "/category?category=skincare&subcategory=serum" },
    ],
    description:
      "A barrier-support serum made for calming stressed skin and fitting easily into a daily routine. It is a simple serum choice for users who want hydration and comfort without making the routine feel heavy.",
    tabDescription:
      "This serum is built for people who want a calming, barrier-supporting step in their routine. It works well for sensitive or stressed skin and fits neatly into both beginner and daily skincare routines.",
    howToUse:
      "1. Apply after cleansing. 2. Use a small amount on slightly damp skin. 3. Pat gently until absorbed. 4. Follow with moisturizer.",
    ingredients:
      "Barrier-supporting humectants, calming skin conditioners, lightweight hydration agents, and soothing daily-use ingredients.",
    faq: [
      {
        question: "Can I use this every day?",
        answer: "Yes, it is designed for regular daily use.",
      },
      {
        question: "Is this good for sensitive skin?",
        answer: "Yes, the formula direction is intended for calming and barrier support.",
      },
      {
        question: "When should I apply it?",
        answer: "Use it after cleansing and before moisturizer.",
      },
    ],
  },
  prd_daily_sun_gel: {
    sourceId: "prd_daily_sun_gel",
    subcategory: "Sunscreen",
    rating: 4.8,
    reviewCount: "111 reviews",
    soldCount: "880 sold",
    urgencyText: "Only 11 left",
    recentBuyText: "289 people bought this in last 7 days",
    sizes: ["50ml"],
    bestFor: ["Daily Sun Protection", "Comfortable Wear", "Routine Finishing Step"],
    tags: [
      { label: "Sun Care", href: "/concern?concern=dark-spots" },
      { label: "Daily SPF", href: "/category?category=skincare&subcategory=sunscreen" },
      { label: "Routine Essential", href: "/products?best-seller=true" },
    ],
    description:
      "A lightweight everyday sunscreen gel created for comfortable daily wear and broad routine compatibility. It is designed for users who want protection that feels easy to reapply and layer.",
    tabDescription:
      "This sunscreen gel suits users who want a light final step in their morning skincare routine. It is designed to feel comfortable during daily wear and easy to pair with other skincare steps.",
    howToUse:
      "1. Apply as the final step of your morning routine. 2. Spread evenly over face and exposed skin. 3. Reapply when needed during the day.",
    ingredients:
      "UV filter blend, lightweight gel base, hydration-support ingredients, and skin-comfort agents for daily wear.",
    faq: [
      {
        question: "Can I wear it every day?",
        answer: "Yes, it is positioned as an everyday sunscreen step.",
      },
      {
        question: "Does it work with makeup?",
        answer: "It is intended to feel light enough for routine layering.",
      },
      {
        question: "When should I apply it?",
        answer: "Use it as the last step of your morning skincare routine.",
      },
    ],
  },
  prd_hydra_gel_moisturizer: {
    sourceId: "prd_hydra_gel_moisturizer",
    subcategory: "Moisturizer",
    rating: 4.8,
    reviewCount: "76 reviews",
    soldCount: "710 sold",
    urgencyText: "Fast-moving item",
    recentBuyText: "173 people bought this in last 7 days",
    sizes: ["50g"],
    bestFor: ["Oily Skin", "Lightweight Hydration", "Daily Moisture Balance"],
    tags: [
      { label: "Oily Skin", href: "/concern?concern=oily-skin" },
      { label: "Gel Moisturizer", href: "/category?category=skincare&subcategory=moisturizer" },
      { label: "Hydration", href: "/products?best-seller=true" },
    ],
    description:
      "A lightweight gel moisturizer that helps hydrate skin without leaving a heavy finish. It is designed for routines that need comfortable daily moisture support with a fresh skin feel.",
    tabDescription:
      "This moisturizer works well for people who want hydration without a rich or heavy texture. It fits naturally into simple morning and evening skincare routines.",
    howToUse:
      "1. Apply after serum. 2. Spread gently over face and neck. 3. Use morning and evening as needed.",
    ingredients:
      "Hydration-supporting humectants, lightweight emollients, and skin-balancing ingredients for comfortable daily moisture.",
    faq: [
      {
        question: "Is this good for oily skin?",
        answer: "Yes, it is positioned as a lightweight gel-style moisturizer.",
      },
      {
        question: "Can I use it under sunscreen?",
        answer: "Yes, it fits well into a daytime routine before sunscreen.",
      },
      {
        question: "Does it feel heavy?",
        answer: "No, the product direction is centered on a lightweight finish.",
      },
    ],
  },
  prd_pore_clay_mask: {
    sourceId: "prd_pore_clay_mask",
    subcategory: "Masks",
    rating: 4.6,
    reviewCount: "63 reviews",
    soldCount: "420 sold",
    urgencyText: "Only 9 left",
    recentBuyText: "98 people bought this in last 7 days",
    sizes: ["100g"],
    bestFor: ["Pore Care", "Weekly Deep Clean", "Oily & Congested Skin"],
    tags: [
      { label: "Pores", href: "/concern?concern=acne" },
      { label: "Weekly Care", href: "/category?category=skincare&subcategory=masks" },
      { label: "Oil Control", href: "/concern?concern=oily-skin" },
    ],
    description:
      "A pore-care clay mask built for weekly deep-clean support in oily and congested skin routines. It is best suited to users who want an occasional reset step alongside their daily routine.",
    tabDescription:
      "This mask is designed as a weekly or occasional treatment step for users focused on pores and congestion. It complements a daily cleanser and moisturizer routine without replacing them.",
    howToUse:
      "1. Apply to clean dry skin. 2. Leave on briefly as directed in your routine. 3. Rinse thoroughly and follow with hydration steps.",
    ingredients:
      "Clay-based cleansing agents, oil-absorbing support ingredients, and routine-friendly skin conditioners.",
    faq: [
      {
        question: "Should I use this every day?",
        answer: "No, this type of mask is better suited for occasional routine use.",
      },
      {
        question: "Who is it best for?",
        answer: "It is most aligned with pore-focused and oily-skin routines.",
      },
      {
        question: "What should I use after it?",
        answer: "Follow with hydrating and balancing skincare steps.",
      },
    ],
  },
};

function formatBDT(value: number): string {
  return `৳${value.toLocaleString("en-US")}`;
}

function parsePrice(price: string): number {
  return Number(String(price).replace(/[^0-9]/g, ""));
}

function getProductStatusLabel(product: ProductRecord): string {
  if (product.status === "out_of_stock") {
    return "Out of Stock";
  }

  return "In Stock";
}

function buildDefaultPDPContent(product: ProductRecord): PDPContent {
  return {
    sourceId: product.id,
    subcategory: product.category,
    rating: 4.8,
    reviewCount: "128 reviews",
    soldCount: "1.2k sold",
    urgencyText: product.stock <= 12 ? `Only ${product.stock} left` : "Popular choice",
    recentBuyText: "Customers are actively buying this product",
    sizes: ["100ml"],
    bestFor: [product.concern, `Daily ${product.category}`, "Simple routine support"],
    tags: [
      {
        label: product.concern,
        href: `/products?concern=${encodeURIComponent(product.concern.toLowerCase())}`,
      },
      {
        label: product.category,
        href: `/products?category=${encodeURIComponent(product.category.toLowerCase())}`,
      },
    ],
    description: product.shortDescription,
    tabDescription: product.shortDescription,
    howToUse:
      "Use as part of your regular routine and follow the product step that best matches your skin needs.",
    ingredients:
      "Ingredient information will be added with the next structured content pass.",
    faq: [
      {
        question: "Is this suitable for regular use?",
        answer: "Yes, it is intended to fit into a normal skincare routine.",
      },
    ],
  };
}

export default function RealProductDetailsPage({
  currentProduct,
}: {
  currentProduct: ProductRecord | null;
}) {
  if (!currentProduct) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Product not found
          </h1>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            This product could not be loaded right now.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-2xl bg-[#5E7F85] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const currentContent =
    PDP_CONTENT_BY_ID[currentProduct.id] ?? buildDefaultPDPContent(currentProduct);

  return (
    <RealProductDetailsContent
      key={currentProduct.id}
      currentProduct={currentProduct}
      currentContent={currentContent}
    />
  );
}

function RealProductDetailsContent({
  currentProduct,
  currentContent,
}: {
  currentProduct: ProductRecord;
  currentContent: PDPContent;
}) {
  const router = useRouter();
  const availableSizes = currentContent.sizes;

  const [selectedSize, setSelectedSize] = React.useState(availableSizes[0]);
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

  const thumbs = React.useMemo(
    () => [
      currentProduct?.image ?? "/products/pdp-1.jpg",
      "/products/pdp-2.jpg",
      "/products/pdp-3.jpg",
      "/products/pdp-4.jpg",
    ],
    [currentProduct?.image]
  );

  const [activeImage, setActiveImage] = React.useState(thumbs[0]);
  const [isImageOpen, setIsImageOpen] = React.useState(false);

  const related: RelatedProduct[] = React.useMemo(
    () =>
      [
        {
          sourceId: "prd_barrier_calm_serum",
          tag: "15% OFF",
          badge: "SALE",
          rating: 4.8,
          oldPriceFallback: 1190,
        },
        {
          sourceId: "prd_hydra_gel_moisturizer",
          tag: "12% OFF",
          badge: "FREE SHIPPING",
          rating: 4.7,
          oldPriceFallback: 990,
        },
        {
          sourceId: "prd_daily_sun_gel",
          tag: "14% OFF",
          badge: "SALE",
          rating: 4.9,
          oldPriceFallback: 1450,
        },
        {
          sourceId: "prd_pore_clay_mask",
          tag: "16% OFF",
          badge: "SALE",
          rating: 4.6,
          oldPriceFallback: 1250,
        },
      ].flatMap((config) => {
        const product = PRODUCT_LOOKUP.get(config.sourceId);

        if (!product || product.id === currentProduct?.id) {
          return [];
        }

        return [
          {
            name: product.name,
            price: formatBDT(product.price),
            oldPrice: formatBDT(product.oldPrice ?? config.oldPriceFallback),
            tag: config.tag,
            badge: config.badge,
            rating: config.rating,
          },
        ];
      }),
    [currentProduct.id]
  );

  const routineUpsellInitial = React.useMemo<RoutineItem[]>(
    () => [
      {
        step: "Step 1",
        label: currentContent?.subcategory ?? currentProduct?.category ?? "Routine",
        name: currentProduct?.name ?? "Acne Balance Facewash",
        price: formatBDT(currentProduct?.price ?? 890),
        selected: true,
      },
      {
        step: "Step 2",
        label: "Treat",
        name: PRODUCT_LOOKUP.get("prd_barrier_calm_serum")?.name ?? "Barrier Calm Serum",
        price: formatBDT(PRODUCT_LOOKUP.get("prd_barrier_calm_serum")?.price ?? 990),
        selected: false,
      },
      {
        step: "Step 3",
        label: "Moisturize",
        name:
          PRODUCT_LOOKUP.get("prd_hydra_gel_moisturizer")?.name ??
          "Hydra Gel Moisturizer",
        price: formatBDT(PRODUCT_LOOKUP.get("prd_hydra_gel_moisturizer")?.price ?? 850),
        selected: false,
      },
      {
        step: "Step 4",
        label: "Protect",
        name: PRODUCT_LOOKUP.get("prd_daily_sun_gel")?.name ?? "Daily Sun Gel",
        price: formatBDT(PRODUCT_LOOKUP.get("prd_daily_sun_gel")?.price ?? 1250),
        selected: false,
      },
    ],
    [
      currentContent.subcategory,
      currentProduct.category,
      currentProduct.name,
      currentProduct.price,
    ]
  );

  const [routineUpsell, setRoutineUpsell] = React.useState<RoutineItem[]>(
    routineUpsellInitial
  );

  const frequentlyBought: BoughtTogetherItem[] = React.useMemo(
    () =>
      ["prd_barrier_calm_serum", "prd_daily_sun_gel"].flatMap((id) => {
        const product = PRODUCT_LOOKUP.get(id);

        if (!product) {
          return [];
        }

        return [
          {
            name: product.name,
            price: formatBDT(product.price),
            oldPrice: formatBDT(product.oldPrice ?? product.price + 200),
          },
        ];
      }),
    []
  );

  const recommendationTitles = [
    "Similar Products",
    "Recommended For You",
    "Recently Viewed",
  ];
  const recommendationProducts = [...related, ...related].slice(0, 8);

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

  React.useEffect(() => {
    const syncBagCount = () => {
      setBagCount(readCart().reduce((sum, item) => sum + item.quantity, 0));
    };

    syncBagCount();
    window.addEventListener("storage", syncBagCount);
    window.addEventListener(cartUpdatedEvent, syncBagCount);

    return () => {
      window.removeEventListener("storage", syncBagCount);
      window.removeEventListener(cartUpdatedEvent, syncBagCount);
    };
  }, []);

  const handleDecreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncreaseQty = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    if (mainAddedToCart) {
      router.push("/cart");
      return;
    }

    addCartItem({
      id: currentProduct.id,
      slug: currentProduct.slug,
      sku: currentProduct.sku,
      name: currentProduct.name,
      image: currentProduct.image || "/products/pdp-1.jpg",
      price: currentProduct.price,
      quantity,
      brand: currentProduct.brand,
      category: currentProduct.category,
      concern: currentProduct.concern,
      status: currentProduct.status,
      size: selectedSize,
    });
    setMainAddedToCart(true);
    router.push("/cart");
  };

  const PAGE_USERNAME = "yourpageusername";

  const handleMessengerOrder = () => {
    const message = encodeURIComponent(
      `I want to order ${currentProduct?.name ?? "this product"} (${selectedSize})`
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
      router.push("/cart");
      return;
    }

    setBagCount((c) => c + frequentlyBought.length);
    setFbBundleAdded(true);
    router.push("/cart");
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
      router.push("/cart");
      return;
    }

    if (selectedItems.length === 0) {
      showMessage("Select at least one routine item");
      return;
    }

    setBagCount((c) => c + selectedItems.length);
    setRoutineBundleAdded(true);
    router.push("/cart");
  };

  const handleRecommendationAddToCart = (key: string) => {
    if (addedRecommendationKeys[key]) {
      router.push("/cart");
      return;
    }
    setBagCount((c) => c + 1);
    setAddedRecommendationKeys((prev) => ({ ...prev, [key]: true }));
    router.push("/cart");
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

  const oldPriceValue = currentProduct.oldPrice ?? currentProduct.price + 160;
  const currentPrice = formatBDT(currentProduct.price);
  const currentOldPrice = formatBDT(oldPriceValue);
  const currentSavings = oldPriceValue - currentProduct.price;
  const currentDiscount = Math.round((currentSavings / oldPriceValue) * 100);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900">
            BrandnBeauty
          </Link>
          <div className="hidden w-full max-w-xl items-center gap-3 rounded-full border border-[#c9d5d8] bg-stone-50 px-5 py-2 shadow-sm md:flex">
            <span className="text-slate-400">⌕</span>
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Search products..."
            />
          </div>
          <button
            onClick={() => router.push("/cart")}
            className="rounded-full bg-[#5E7F85] px-5 py-2 text-sm font-semibold text-white shadow-sm"
          >
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
                  alt={currentProduct.name}
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
                      alt={`${currentProduct.name} thumbnail`}
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
                    Authentic
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-700">
                    100% Authentic Product
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center text-[#5E7F85]">
                    24/7
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-700">
                    24/7 Customer Support
                  </div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center text-[#5E7F85]">
                    Fast
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
              {currentProduct.name}
            </h1>

            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="font-semibold">⭐ {currentContent.rating}</span>
                <span className="text-slate-500">{currentContent.reviewCount}</span>
                <span className="text-slate-500">{currentContent.soldCount}</span>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                    {getProductStatusLabel(currentProduct)}
                  </span>
                  <span className="text-sm font-semibold text-rose-600">
                    {currentContent.urgencyText}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <span className="flex items-center gap-1 text-sm font-semibold text-rose-600">
                  🔥 {currentContent.recentBuyText}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <div className="text-3xl font-bold">{currentPrice}</div>
              <div className="text-lg text-slate-400 line-through">{currentOldPrice}</div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-[#5E7F85]">
                Save {formatBDT(currentSavings)}
              </div>
              <div className="rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-600">
                {currentDiscount}% OFF
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-900">Size</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableSizes.map((size) => (
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
                    -
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
                  ♥
                </button>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-600 md:text-base">
              <strong className="text-[#5E7F85]">Why It Works:</strong>{" "}
              {currentContent.description}
            </p>

            <div className="mt-6">
              <div className="text-sm font-semibold text-[#5E7F85]">Best For:</div>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600 md:text-base">
                {currentContent.bestFor.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 text-[#5E7F85]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">SKU:</span>
                <span className="font-semibold text-slate-600">{currentProduct.sku}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500">Category:</span>
                <button
                  onClick={() =>
                    router.push(
                      `/category?category=${encodeURIComponent(
                        currentProduct.category.toLowerCase()
                      )}`
                    )
                  }
                  className="font-semibold text-[#5E7F85]"
                >
                  {currentProduct.category}
                </button>
                <span className="text-slate-400">,</span>
                <button
                  onClick={() =>
                    router.push(
                      `/category?category=${encodeURIComponent(
                        currentProduct.category.toLowerCase()
                      )}&subcategory=${encodeURIComponent(
                        currentContent.subcategory.toLowerCase()
                      )}`
                    )
                  }
                  className="font-semibold text-[#5E7F85]"
                >
                  {currentContent.subcategory}
                </button>
              </div>

              <div className="flex items-start gap-2">
                <span className="pt-1 text-slate-500">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {currentContent.tags.map((tag) => (
                    <button
                      key={tag.label}
                      onClick={() => router.push(tag.href)}
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
                  onClick={() => router.push("/products")}
                  className="font-semibold text-[#5E7F85]"
                >
                  {currentProduct.brand}
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

      {isImageOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="relative w-full max-w-3xl">
            <img
              src={activeImage}
              alt={`${currentProduct.name} full view`}
              className="w-full rounded-2xl bg-white object-contain"
            />
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
      ) : null}

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
                  <div className="relative flex min-w-0 flex-1 basis-full items-center gap-3 rounded-2xl bg-stone-50 p-3 sm:basis-[280px] sm:gap-4 sm:p-4 md:max-w-[380px]">
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

            <div className="ml-auto flex w-full flex-col items-center justify-center gap-3 sm:w-auto">
              <div className="text-lg text-slate-600">
                Total Price:{" "}
                <span className="font-bold text-[#5E7F85]">{formatBDT(fbTotal)}</span>
              </div>
              <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-[#5E7F85]">
                Save {formatBDT(fbSavings)} on this bundle
              </div>
              <button
                onClick={handleAddBundleToCart}
                className={`mt-1 w-full rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition sm:w-auto ${
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
              { days: "14 Days", concern: currentProduct.concern },
              { days: "21 Days", concern: currentContent.bestFor[0] ?? currentProduct.concern },
              { days: "7 Days", concern: currentContent.subcategory },
            ].map((item, i) => (
              <div
                key={`${item.days}-${item.concern}-${i}`}
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
                  <p className="mt-1 text-xs text-slate-500">Consistent routine usage</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
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
              className={`rounded-[1rem] px-2 py-3 text-center text-[10px] font-bold uppercase tracking-wide transition sm:px-3 sm:py-4 sm:text-[12px] ${
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
                <p>{currentContent.tabDescription}</p>
              </div>
            </div>
          ) : null}

          {activeInfoTab === "how_to_use" ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">How to Use</h2>
              <div className="mt-4 grid gap-2 text-justify text-sm leading-7 text-slate-600 md:text-base">
                <p>{currentContent.howToUse}</p>
              </div>
            </div>
          ) : null}

          {activeInfoTab === "ingredients" ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Ingredients</h2>
              <div className="mt-4 grid gap-2 text-justify text-sm leading-7 text-slate-600 md:text-base">
                <p>{currentContent.ingredients}</p>
              </div>
            </div>
          ) : null}

          {activeInfoTab === "faq" ? (
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600 md:text-base">
                {currentContent.faq.map((item) => (
                  <div key={item.question}>
                    <p className="font-semibold text-slate-800">{item.question}</p>
                    <p className="mt-1">{item.answer}</p>
                  </div>
                ))}
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
                      Good everyday product that feels easy to use in a simple routine.
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
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
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
                        onClick={() => handleRecommendationAddToCart(recKey)}
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
