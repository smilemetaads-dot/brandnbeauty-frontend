"use client";

type BestSellerProduct = {
  name: string;
  price: string;
  rating: string;
  image?: string;
  bestSeller?: boolean;
  slug?: string;
};

type HomeBestSellersProps = {
  bestSellers: BestSellerProduct[];
  onAddToCart: (productName: string, price: number, image?: string, oldPrice?: number, badge?: string) => void;
  onGoToProductDetails: (product: BestSellerProduct) => void;
};

export default function HomeBestSellers({ bestSellers, onAddToCart, onGoToProductDetails }: HomeBestSellersProps) {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">BEST SELLING NOW</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {bestSellers.map((p, index) => {
            const currentPrice = Number(p.price.replace(/[^0-9]/g, ""));
            const oldPrice = Math.round(currentPrice * 1.35);
            const isFreeShipping = index % 2 === 0;
            return (
              <div key={p.name} className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
                <button type="button" onClick={() => onGoToProductDetails(p)} className="flex flex-1 cursor-pointer flex-col text-left">
                  <div className="relative">
                    <div className="group relative aspect-square overflow-hidden bg-[#f3f3f3]">
                      <div className="absolute left-2 top-2 z-10 rounded-lg bg-[#6f8f95] px-2 py-1 text-[11px] font-semibold text-white">{p.bestSeller ? "BEST SELLER" : "HOT PICK"}</div>
                      <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Product Image</div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-3 py-3 sm:px-4 sm:py-4">
                    <div className="line-clamp-2 text-xs font-medium leading-5 text-slate-800 hover:text-[#5E7F85] sm:text-sm">{p.name}</div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="inline-block rounded-full bg-[#6f8f95]/10 px-2 py-1 text-[9px] font-semibold text-[#5E7F85] sm:px-3 sm:text-[10px]">{isFreeShipping ? "FREE SHIPPING" : "LIMITED STOCK"}</span>
                    </div>
                    <div className="mt-2 text-[11px] font-medium text-[#5E7F85]">ðŸ”¥ 2.3k sold this week</div>
                    <div className="mt-2 flex items-center gap-1 text-[12px] text-amber-500">
                      <span>â˜…</span>
                      <span>â˜…</span>
                      <span>â˜…</span>
                      <span>â˜…</span>
                      <span className="text-amber-400">â˜…</span>
                      <span className="ml-1 text-slate-500">({p.rating})</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm">
                      <span className="text-slate-400 line-through">à§³ {oldPrice}</span>
                      <span className="font-semibold text-[#5E7F85]">à§³ {currentPrice}</span>
                    </div>
                  </div>
                </button>
                <div className="mt-auto">
                  <button onClick={() => onAddToCart(p.name, currentPrice, p.image, oldPrice, isFreeShipping ? "FREE SHIPPING" : "SALE")} className="w-full cursor-pointer bg-[#5E7F85] py-3 text-xs font-semibold text-white transition hover:bg-[#4e6e73] active:scale-[0.98] sm:py-4 sm:text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
