import type { Metadata } from "next";
import RealBrandPage from "@/features/brand/RealBrandPage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/brands",
  },
};

export default function BrandsPage() {
  return <RealBrandPage />;
}
