import type { Metadata } from "next";
import RealCategoryPage from "@/features/category/RealCategoryPage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/category",
  },
};

export default function CategoryPage() {
  return <RealCategoryPage />;
}
