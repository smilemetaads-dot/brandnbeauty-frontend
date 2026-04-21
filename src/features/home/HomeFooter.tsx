"use client";

function SocialIcons() {
  const common = "group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-white/45 hover:bg-white hover:shadow-[0_18px_38px_rgba(0,0,0,0.22)]";

  return (
    <div className="mt-6 flex items-center gap-4">
      <a href="https://www.facebook.com/brandnbeauty" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={common}>
        <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-[18px] w-[18px] fill-current transition duration-300 group-hover:text-[#1877F2]">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.009 10.125 11.927V15.56H7.078v-3.487h3.047V9.414c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.931-1.956 1.887v2.253h3.328l-.532 3.487h-2.796V24C19.612 23.082 24 18.092 24 12.073z" />
        </svg>
      </a>
      <a href="https://www.instagram.com/brandnbeauty" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={common}>
        <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-[18px] w-[18px] fill-current transition duration-300 group-hover:text-[#E4405F]">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8z" />
        </svg>
      </a>
      <a href="https://www.tiktok.com/@brandnbeauty" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={common}>
        <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-[18px] w-[18px] fill-current transition duration-300 group-hover:text-black">
          <path d="M14.5 3c.36 1.97 1.54 3.54 3.5 4.14v2.46a7.1 7.1 0 0 1-3.5-1.1v6.04A5.54 5.54 0 1 1 8.96 9v2.53a3.08 3.08 0 1 0 2.99 3.07V3h2.55z" />
        </svg>
      </a>
      <a href="https://www.youtube.com/@brandnbeauty" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={common}>
        <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" aria-hidden="true" className="relative z-10 h-[18px] w-[18px] fill-current transition duration-300 group-hover:text-[#FF0033]">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.4.58A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.88.58 9.4.58 9.4.58s7.52 0 9.4-.58a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.75 15.47V8.53L15.75 12l-6 3.47z" />
        </svg>
      </a>
    </div>
  );
}

export default function HomeFooter() {
  return (
    <footer className="border-t border-[#5E7F85] bg-[#5E7F85] pb-16 text-white md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <div className="text-4xl font-bold tracking-tight">BrandnBeauty</div>
            </div>
            <SocialIcons />
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Explore</div>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <a href="#categories" className="block transition hover:text-white">Categories</a>
              <a href="#concerns" className="block transition hover:text-white">Concerns</a>
              <a href="#brands" className="block transition hover:text-white">Brands</a>
              <a href="#" className="block transition hover:text-white">Best Sellers</a>
              <a href="#" className="block transition hover:text-white">Offers</a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Support</div>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <a href="https://m.me/yourpage" className="block transition hover:text-white">Messenger Support</a>
              <a href="#" className="block transition hover:text-white">Track Order</a>
              <a href="#" className="block transition hover:text-white">FAQ</a>
              <a href="tel:+8800000000000" className="block transition hover:text-white">Call Support</a>
              <a href="mailto:hello@brandnbeauty.com" className="block transition hover:text-white">hello@brandnbeauty.com</a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Policies</div>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <a href="#" className="block transition hover:text-white">Privacy Policy</a>
              <a href="#" className="block transition hover:text-white">Terms & Conditions</a>
              <a href="#" className="block transition hover:text-white">Refund Policy</a>
              <a href="#" className="block transition hover:text-white">Shipping Policy</a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5 text-sm text-white/70 md:flex md:items-center md:justify-between">
          <div className="w-full text-center">Copyright Â© 2026 BrandnBeauty. All Right Reserved</div>
        </div>
      </div>
    </footer>
  );
}
