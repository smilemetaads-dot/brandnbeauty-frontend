"use client";

import Link from "next/link";

const OFFER_CARDS = [
  { title: "Buy 1 Get 1", img: "/offer-bogo.jpg", link: "/products?offer=bogo" },
  { title: "Combo Offer", img: "/offer-combo.jpg", link: "/products?offer=combo" },
  { title: "Clearance Sale", img: "/offer-clearance.jpg", link: "/products?offer=clearance" },
];

export default function HomeOfferCards() {
  return (
    <>
      <div className="mb-4 mt-10 text-center">
        <h3 className="text-xl font-semibold tracking-tight text-[#5E7F85] md:text-2xl">SPECIAL OFFERS</h3>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {OFFER_CARDS.map((item) => (
          <Link key={item.title} href={item.link} className="group block cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-[#f3f7f7] text-slate-400">
              {item.title}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
