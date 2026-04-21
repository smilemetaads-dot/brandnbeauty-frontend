"use client";

const BRANDS = ["COSRX", "Some By Mi", "The Ordinary", "Beauty of Joseon", "Simple", "CeraVe", "L'Oreal", "BrandnBeauty"];

type HomeBrandsProps = {
  onGoToBrandPage: (brand: string) => void;
};

export default function HomeBrands({ onGoToBrandPage }: HomeBrandsProps) {
  return (
    <section id="brands" className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">FEATURED BRANDS</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => onGoToBrandPage(brand)}
              className="cursor-pointer overflow-hidden rounded-3xl border border-[#5E7F85] bg-gradient-to-br from-[#5E7F85] to-[#6f9aa0] text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex aspect-square items-center justify-center bg-white text-sm text-slate-400">Brand Logo</div>
              <div className="px-5 py-4 text-center text-sm font-medium text-white">{brand}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
