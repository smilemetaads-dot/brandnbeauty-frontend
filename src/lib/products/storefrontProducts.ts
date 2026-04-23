import { mockProducts } from "@/lib/mock/products";
import { readProductSyncSnapshot } from "@/lib/products/productSync";
import type { ProductRecord } from "@/lib/types/product";

export function getStorefrontProducts(): ProductRecord[] {
  return readProductSyncSnapshot() ?? mockProducts;
}

export function getVisibleStorefrontProducts(): ProductRecord[] {
  return getStorefrontProducts().filter(
    (product) =>
      product.status === "active" || product.status === "low_stock",
  );
}
