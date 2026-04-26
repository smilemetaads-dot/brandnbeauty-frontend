"use client";

import Link from "next/link";

export type CartItem = {
  name: string;
  price: number;
  qty: number;
  image?: string;
  oldPrice?: number;
  badge?: string;
};

type HomeFloatingCartProps = {
  bagCount: number;
  bagTotal: number;
  cartItems: CartItem[];
  isCartOpen: boolean;
  onCheckout: () => void;
  onCloseCart: () => void;
  onOpenCart: () => void;
  onRemoveCartItem: (productName: string) => void;
  onUpdateCartQty: (productName: string, change: number) => void;
};

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.84 1.56 5.37 4 7.1V22l3.23-1.77c.88.24 1.81.37 2.77.37 5.52 0 10-4.03 10-9S17.52 2 12 2zm1.12 11.95-2.54-2.71-4.95 2.71 5.42-5.76 2.57 2.71 4.92-2.71-5.42 5.76z" />
    </svg>
  );
}

export default function HomeFloatingCart({
  bagCount,
  bagTotal,
  cartItems,
  isCartOpen,
  onCheckout,
  onCloseCart,
  onOpenCart,
  onRemoveCartItem,
  onUpdateCartQty,
}: HomeFloatingCartProps) {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white md:hidden">
        <div className="grid grid-cols-4 text-center text-[11px] font-medium text-slate-700">
          <Link href="/" className="px-2 py-3 hover:bg-stone-50">
            <div className="text-base">•</div>
            <div>Home</div>
          </Link>
          <Link href="/products" className="px-2 py-3 hover:bg-stone-50">
            <div className="text-base">•</div>
            <div>Shop</div>
          </Link>
          <Link href="/brands" className="px-2 py-3 hover:bg-stone-50">
            <div className="text-base">•</div>
            <div>Brands</div>
          </Link>
          <button type="button" onClick={onOpenCart} className="px-2 py-3 hover:bg-stone-50">
            <div className="text-base">•</div>
            <div>Bag</div>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenCart}
        className="group fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 overflow-hidden rounded-l-2xl border border-slate-200 shadow-xl transition-all duration-300 hover:shadow-2xl md:block"
      >
        <div className="flex flex-col items-center justify-center bg-[#5E7F85] px-3 py-3 text-white">
          <div className="mt-1 text-[11px] font-semibold">{bagCount} ITEMS</div>
        </div>
        <div className="border-t border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#5E7F85]">Tk {bagTotal}</div>
      </button>

      <a
        href="https://m.me/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#5E7F85] text-white shadow-[0_18px_40px_rgba(94,127,133,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#4e6e73] hover:shadow-[0_24px_50px_rgba(94,127,133,0.45)] md:bottom-5 md:right-5 md:h-14 md:w-14"
        aria-label="Open Messenger"
      >
        <span className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-[#5E7F85] opacity-60 blur-md md:h-14 md:w-14"></span>
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/16 ring-1 ring-white/20 transition group-hover:bg-white/20">
          <MessengerIcon />
        </span>
      </a>

      {isCartOpen ? <button type="button" aria-label="Close cart overlay" onClick={onCloseCart} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]" /> : null}

      <div className={`fixed right-0 top-0 z-50 h-full w-full max-w-[440px] bg-white shadow-2xl transition-transform duration-300 ease-out md:w-[460px] ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="relative border-b border-slate-200 px-5 py-5">
          <div className="text-center text-[1.05rem] font-semibold tracking-[0.2em] text-slate-800">BAG</div>
          <button onClick={onCloseCart} className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-500 transition hover:text-slate-800">×</button>
        </div>

        <div className="space-y-4 p-4 pb-28">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-6 text-6xl text-slate-400">👜</div>
              <div className="text-lg font-medium text-slate-600">Your Shopping Bag is Empty</div>
              <Link href="/products" onClick={onCloseCart} className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white">
                START SHOPPING
              </Link>
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
                      <button onClick={() => onRemoveCartItem(item.name)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-[#5E7F85] hover:text-[#5E7F85]" aria-label="Remove item" title="Remove">×</button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-[13px]">
                        {item.oldPrice ? <span className="text-slate-400 line-through">Tk {item.oldPrice}</span> : null}
                        <span className="font-semibold text-slate-800">Tk {item.price}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] text-slate-400">Total</div>
                        <div className="text-[15px] font-bold text-[#5E7F85]">Tk {(item.price * item.qty).toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <div className="flex items-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                        <button onClick={() => onUpdateCartQty(item.name, -1)} className="flex h-9 w-9 items-center justify-center text-base font-semibold text-slate-600 transition hover:bg-slate-100">−</button>
                        <div className="flex h-9 min-w-[40px] items-center justify-center border-x border-slate-200 text-sm font-semibold text-slate-800">{item.qty}</div>
                        <button onClick={() => onUpdateCartQty(item.name, 1)} className="flex h-9 w-9 items-center justify-center text-base font-semibold text-slate-600 transition hover:bg-slate-100">+</button>
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
            <span className="text-[1.05rem] font-semibold text-slate-900">Tk {bagTotal}</span>
          </div>
          <button onClick={onCheckout} disabled={bagCount === 0} className={`w-full rounded-xl py-3 font-semibold text-white transition ${bagCount === 0 ? "cursor-not-allowed bg-slate-300" : "bg-[#5E7F85] hover:bg-[#4e6e73]"}`}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
