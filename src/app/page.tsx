import type { Metadata } from "next";
import BrandnBeautyWebsite from "@/features/home/RealHomepage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <BrandnBeautyWebsite />;
}
