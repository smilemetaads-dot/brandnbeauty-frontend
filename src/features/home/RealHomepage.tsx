"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import HomeBestSellers from "@/features/home/HomeBestSellers";
import HomeEditorsPicks from "@/features/home/HomeEditorsPicks";
import HomeFloatingCart, { type CartItem } from "@/features/home/HomeFloatingCart";
import HomeHero, { getHeroSlideCount } from "@/features/home/HomeHero";
import HomeBrands from "@/features/home/HomeBrands";
import HomeCategories from "@/features/home/HomeCategories";
import HomeConcerns from "@/features/home/HomeConcerns";
import HomeFooter from "@/features/home/HomeFooter";
import HomeOfferCards from "@/features/home/HomeOfferCards";
import HomeRealResults, { getRealResultsCount, getRealResultsSlideCount } from "@/features/home/HomeRealResults";
import HomeTrustStrip from "@/features/home/HomeTrustStrip";

type ProductCard = {
  name: string;
  price: string;
  rating: string;
  image?: string;
  bestSeller?: boolean;
  slug?: string;
};

export default function BrandnBeautyWebsite() {
  const router = useRouter();
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

  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [resultIndexes, setResultIndexes] = useState<number[]>(() => Array.from({ length: getRealResultsCount() }, () => 0));
  const [pausedResults, setPausedResults] = useState<boolean[]>(() => Array.from({ length: getRealResultsCount() }, () => false));
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
    router.push("/checkout");
  };

  const goToBrandPage = (brandName: string) => {
    router.push(`/brands?brand=${encodeURIComponent(brandName)}`);
  };

  const goToBrandLetter = (letter: string) => {
    router.push(`/brands?letter=${encodeURIComponent(letter)}`);
  };

  const goToCategoryPage = (categoryName: string, subcategoryName?: string) => {
    const params = new URLSearchParams();
    params.set("category", categoryName);
    if (subcategoryName) params.set("subcategory", subcategoryName);
    router.push(`/category?${params.toString()}`);
  };

  const goToCollectionPage = (collectionLink: string) => {
    router.push(collectionLink);
  };

  const slugifyProduct = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const goToProductDetails = (product: ProductCard) => {
    const productSlug = product.slug || slugifyProduct(product.name);
    router.push(`/product?product=${encodeURIComponent(productSlug)}`);
  };

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((prev) => (prev + 1) % getHeroSlideCount()), 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) setActiveSlide((prev) => (prev + 1) % getHeroSlideCount());
    else if (distance < -50) setActiveSlide((prev) => (prev - 1 + getHeroSlideCount()) % getHeroSlideCount());
    setTouchStartX(null);
    setTouchEndX(null);
  }, [touchStartX, touchEndX]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResultIndexes((prev) =>
        prev.map((currentIndex, cardIndex) => {
          if (pausedResults[cardIndex]) return currentIndex;
          const totalSlides = getRealResultsSlideCount(cardIndex);
          return (currentIndex + 1) % totalSlides;
        }),
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [pausedResults]);
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
        <HomeHero
          activeSlide={activeSlide}
          onSlideChange={setActiveSlide}
          onTouchEnd={() => {
            if (touchStartX !== null && touchEndX === null) setTouchStartX(null);
          }}
          onTouchMove={setTouchEndX}
          onTouchStart={(clientX) => {
            setTouchEndX(null);
            setTouchStartX(clientX);
          }}
        />

        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <HomeOfferCards />
        </div>
      </section>

      <HomeCategories onGoToCategoryPage={goToCategoryPage} />

      <HomeConcerns
        onGoToConcernPage={(concern) => {
          router.push(`/concern?concern=${encodeURIComponent(concern)}`);
        }}
      />

      <HomeBrands onGoToBrandPage={goToBrandPage} />
      <HomeBestSellers bestSellers={bestSellers} onAddToCart={addToCart} onGoToProductDetails={goToProductDetails} />
      <HomeEditorsPicks onGoToCollectionPage={goToCollectionPage} />

      <HomeRealResults
        pausedResults={pausedResults}
        resultIndexes={resultIndexes}
        onSelectSlide={(cardIndex, slideIndex) => {
          setResultIndexes((prev) => prev.map((value, idx) => (idx === cardIndex ? slideIndex : value)));
        }}
        onTogglePause={(cardIndex) => {
          setPausedResults((prev) => prev.map((value, idx) => (idx === cardIndex ? !value : value)));
        }}
      />
      <HomeTrustStrip />
      <HomeFloatingCart
        bagCount={bagCount}
        bagTotal={bagTotal}
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onCheckout={handleCheckout}
        onCloseCart={() => setIsCartOpen(false)}
        onOpenCart={() => setIsCartOpen(true)}
        onRemoveCartItem={removeCartItem}
        onUpdateCartQty={updateCartQty}
      />
      <HomeFooter />
    </div>
  );
}
