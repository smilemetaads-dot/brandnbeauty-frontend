import { Suspense } from "react";

import RealProductDetailsPage from "@/features/product/RealProductDetailsPage";

export default function ProductPage() {
  return (
    <Suspense fallback={null}>
      <RealProductDetailsPage />
    </Suspense>
  );
}
