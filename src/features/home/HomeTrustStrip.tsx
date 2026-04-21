"use client";

type TrustItem = {
  title: string;
  key: "authentic" | "brands" | "science" | "support";
};

const TRUST_ITEMS: TrustItem[] = [
  { title: "100% Authentic Products", key: "authentic" },
  { title: "Verified Brands", key: "brands" },
  { title: "Science-Based Formulas", key: "science" },
  { title: "24/7 Support", key: "support" },
];

function TrustIcon({ iconKey }: { iconKey: TrustItem["key"] }) {
  const common = "h-6 w-6";

  if (iconKey === "authentic") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    );
  }

  if (iconKey === "brands") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h7l5 5-7 7-5-5V7z" />
        <circle cx="9.5" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (iconKey === "science") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v5l-4.8 8.1A3 3 0 007.8 21h8.4a3 3 0 002.6-4.9L14 8V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={common}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 5h12a2 2 0 012 2v8a2 2 0 0 1-2 2H9l-5 3V7a2 2 0 012-2z" />
    </svg>
  );
}

export default function HomeTrustStrip() {
  return (
    <section className="bg-[#f4f7f7] py-6 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {TRUST_ITEMS.map((item, index) => (
            <div key={item.title} className="flex items-center justify-center gap-3 rounded-full bg-transparent px-2 py-1 sm:justify-start lg:justify-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9d5d8] bg-white text-[#5E7F85]">
                <TrustIcon iconKey={item.key} />
              </span>
              <span className="text-sm font-semibold tracking-wide text-slate-900">{item.title}</span>
              {index !== TRUST_ITEMS.length - 1 ? <div className="ml-2 hidden h-8 w-px bg-slate-300 lg:block"></div> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
