import { Suspense } from "react";

import RealProductDetailsPage from "@/features/product/RealProductDetailsPage";
import { getProductBySlugFromSupabase } from "@/lib/products/supabaseProducts";

export const dynamic = "force-dynamic";

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlugFromSupabase(resolvedParams.slug);

  return (
    <Suspense fallback={null}>
      <RealProductDetailsPage currentProduct={product} />
    </Suspense>
  );
}
