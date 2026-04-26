"use client";

const CONCERNS = ["Acne", "Dark Spots", "Brightening", "Oily Skin", "Dry Skin", "Sensitive Skin", "Hairfall", "Dull Skin"];

type HomeConcernsProps = {
  onGoToConcernPage: (concern: string) => void;
};

export default function HomeConcerns({ onGoToConcernPage }: HomeConcernsProps) {
  return (
    <section id="concerns" className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">SHOP BY CONCERN</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {CONCERNS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onGoToConcernPage(item)}
              className="cursor-pointer overflow-hidden rounded-2xl border border-[#5E7F85] bg-gradient-to-br from-[#5E7F85] to-[#6f9aa0] text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl"
            >
              <div className="flex aspect-square items-center justify-center bg-white text-sm text-slate-400">Concern</div>
              <div className="px-3 py-3 text-center text-xs font-medium text-white sm:px-5 sm:py-4 sm:text-sm">{item}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
