"use client";

const CATEGORIES = [
  { name: "Skincare" },
  { name: "Hair Care" },
  { name: "Body Care" },
  { name: "Makeup" },
  { name: "Tools" },
  { name: "Fragrance" },
  { name: "Men's Care" },
  { name: "Mom & Baby" },
];

type HomeCategoriesProps = {
  onGoToCategoryPage: (categoryName: string) => void;
};

export default function HomeCategories({ onGoToCategoryPage }: HomeCategoriesProps) {
  return (
    <section id="categories" className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">SHOP BY CATEGORY</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => onGoToCategoryPage(item.name)}
              className="cursor-pointer overflow-hidden rounded-3xl border border-[#5E7F85] bg-gradient-to-br from-[#5E7F85] to-[#6f9aa0] text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex aspect-square w-full items-center justify-center bg-white text-sm text-slate-400">Category Image</div>
              <div className="p-4">
                <div className="text-center text-lg font-semibold text-white">{item.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
