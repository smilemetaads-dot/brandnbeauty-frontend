"use client";

import type { KeyboardEvent } from "react";

type ResultSlide = {
  src: string;
  mediaType: "image" | "video";
};

type ResultCard = {
  title: string;
  type: string;
  items: ResultSlide[];
};

const REAL_RESULTS: ResultCard[] = [
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

function getRealResultLink(title: string) {
  if (title === "7 DAYS GLOW") return "/products?collection=glow-routine";
  if (title === "ACNE RESULT") return "/products?collection=acne-care-set";
  if (title === "REAL REVIEW") return "/products?best-seller=true";
  if (title === "MY ROUTINE") return "/products?collection=routine-set";
  return "/products";
}

function handleResultCardKeyDown(event: KeyboardEvent<HTMLDivElement>, title: string) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    window.location.href = getRealResultLink(title);
  }
}

export function getRealResultsCount() {
  return REAL_RESULTS.length;
}

export function getRealResultsSlideCount(cardIndex: number) {
  return REAL_RESULTS[cardIndex]?.items.length || 1;
}

type HomeRealResultsProps = {
  pausedResults: boolean[];
  resultIndexes: number[];
  onSelectSlide: (cardIndex: number, slideIndex: number) => void;
  onTogglePause: (cardIndex: number) => void;
};

export default function HomeRealResults({
  pausedResults,
  resultIndexes,
  onSelectSlide,
  onTogglePause,
}: HomeRealResultsProps) {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">REAL RESULTS</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {REAL_RESULTS.map((item, cardIndex) => {
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
                onKeyDown={(event) => handleResultCardKeyDown(event, item.title)}
                className="cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5E7F85]/40 sm:rounded-[1.75rem]"
              >
                <div className="relative aspect-[9/16] min-h-[250px] overflow-hidden bg-[#f6f8f8] sm:min-h-[420px]">
                  <div className="flex h-full w-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                    {item.items.map((slide, idx) => (
                      <div key={idx} className="flex min-w-full items-center justify-center text-slate-400">
                        {slide.mediaType === "video" ? `Video ${idx + 1}` : `Image ${idx + 1}`}
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-800 sm:left-3 sm:top-3 sm:px-3 sm:text-[10px]">{item.type}</div>
                  <div className="absolute right-2 top-2 flex items-center gap-1 sm:right-3 sm:top-3 sm:gap-2">
                    <div className="rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">{activeIndex % 2 === 0 ? "ðŸ”‡" : "ðŸ”Š"}</div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onTogglePause(cardIndex);
                      }}
                      className="rounded-full bg-black/35 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm sm:px-3 sm:text-[10px]"
                    >
                      {isPaused ? "Play" : "Pause"}
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white sm:bottom-4 sm:left-4 sm:right-4">
                    <div className="text-sm font-semibold uppercase tracking-tight sm:text-xl">{item.title}</div>
                    <div className="mt-2 flex items-center gap-1.5 sm:mt-3 sm:gap-2">
                      {item.items.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onSelectSlide(cardIndex, dotIndex);
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
  );
}
