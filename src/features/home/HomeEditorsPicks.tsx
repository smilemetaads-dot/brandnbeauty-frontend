"use client";

const COLLECTIONS = [
  { title: "Acne Care Set", image: "/collections/acne-care.jpg", overlay: "Acne Solution", badge: "Best for Acne", link: "/products?collection=acne-care-set" },
  { title: "Glow Routine", image: "/collections/glow-routine.jpg", overlay: "Daily Glow", badge: "Trending Now", link: "/products?collection=glow-routine" },
  { title: "Everyday Essentials", image: "/collections/budget-picks.jpg", overlay: "Daily Must-Haves", badge: "Daily Value", link: "/products?collection=budget-picks" },
  { title: "Luxury Picks", image: "/collections/premium-picks.jpg", overlay: "Luxury Edit", badge: "Top Tier", link: "/products?collection=premium-picks" },
];

type HomeEditorsPicksProps = {
  onGoToCollectionPage: (collectionLink: string) => void;
};

export default function HomeEditorsPicks({ onGoToCollectionPage }: HomeEditorsPicksProps) {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">EDITOR&apos;S PICKS</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {COLLECTIONS.map((item) => (
            <button key={item.title} type="button" onClick={() => onGoToCollectionPage(item.link)} className="group overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl">
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
  );
}

