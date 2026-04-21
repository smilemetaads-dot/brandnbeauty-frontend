"use client";

const HERO_SLIDES = ["/hero-slide-1.jpg", "/hero-slide-2.jpg", "/hero-slide-3.jpg", "/hero-slide-4.jpg", "/hero-slide-5.jpg"];

const SPECIAL_OFFER_BANNER = {
  image: "/special-offer-banner.jpg",
  alt: "Special offer banner",
  link: "/products?offer=special-offer",
};

type HomeHeroProps = {
  activeSlide: number;
  onSlideChange: (slide: number) => void;
  onTouchEnd: () => void;
  onTouchMove: (clientX: number) => void;
  onTouchStart: (clientX: number) => void;
};

export function getHeroSlideCount() {
  return HERO_SLIDES.length;
}

export default function HomeHero({
  activeSlide,
  onSlideChange,
  onTouchEnd,
  onTouchMove,
  onTouchStart,
}: HomeHeroProps) {
  return (
    <section className="w-full">
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={(e) => onTouchStart(e.targetTouches[0].clientX)}
        onTouchMove={(e) => onTouchMove(e.targetTouches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {HERO_SLIDES.map((src, idx) => (
            <div key={src} className="relative w-full shrink-0">
              <div className="flex h-[320px] w-full items-center justify-center bg-gradient-to-r from-[#e8efef] to-[#f8fafb] text-slate-400 md:h-[420px]">Hero Slide {idx + 1}</div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 md:hidden">
          {HERO_SLIDES.map((_, dot) => (
            <button key={dot} onClick={() => onSlideChange(dot)} className={`h-3 w-3 rounded-full ${activeSlide === dot ? "bg-white" : "bg-white/40"}`} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mt-4 flex justify-center gap-3">
          {HERO_SLIDES.map((_, dot) => (
            <button key={dot} onClick={() => onSlideChange(dot)} className={`h-3 w-3 rounded-full transition ${activeSlide === dot ? "scale-110 bg-[#5E7F85]" : "bg-slate-300"}`} />
          ))}
        </div>

        <a href={SPECIAL_OFFER_BANNER.link} className="mt-6 block overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-sm transition hover:-translate-y-[1px] hover:shadow-lg">
          <div className="flex h-[140px] w-full items-center justify-center bg-[#edf3f3] text-slate-400 md:h-[170px]">Special Offer Banner</div>
        </a>
      </div>
    </section>
  );
}
