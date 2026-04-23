import type { ProductRecord } from "@/lib/types/product";

export const productSyncStorageKey = "brandnbeauty-product-sync-v1";

export type ProductSyncSnapshot = {
  schemaVersion: 1;
  source: "admin";
  updatedAt: string;
  products: ProductRecord[];
};

export function parseProductSyncSnapshot(
  value: string | null,
): ProductRecord[] | null {
  if (!value) {
    return null;
  }

  try {
    const snapshot = JSON.parse(value) as Partial<ProductSyncSnapshot>;

    if (
      snapshot.schemaVersion !== 1 ||
      !Array.isArray(snapshot.products)
    ) {
      return null;
    }

    return snapshot.products;
  } catch {
    return null;
  }
}

export function readProductSyncSnapshot(): ProductRecord[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  return parseProductSyncSnapshot(
    window.localStorage.getItem(productSyncStorageKey),
  );
}
