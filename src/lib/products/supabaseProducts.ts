import "server-only";

import { createSupabaseClient } from "@/lib/supabase/client";
import type { ProductRecord, ProductStatus } from "@/lib/types/product";

type ProductRow = {
  id?: string | number | null;
  name?: string | null;
  slug?: string | null;
  brand?: string | null;
  category?: string | null;
  concern?: string | null;
  price?: number | string | null;
  old_price?: number | string | null;
  oldPrice?: number | string | null;
  stock?: number | string | null;
  sku?: string | null;
  image?: string | null;
  short_description?: string | null;
  shortDescription?: string | null;
  status?: string | null;
};

const validStatuses: ProductStatus[] = [
  "active",
  "draft",
  "low_stock",
  "out_of_stock",
];

const PRODUCTS_SCHEMA = "public";
const PRODUCTS_TABLE = "products";

export async function getProductsFromSupabase(): Promise<ProductRecord[] | null> {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .schema(PRODUCTS_SCHEMA)
    .from(PRODUCTS_TABLE)
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("[products] Supabase query failed:", {
      table: `${PRODUCTS_SCHEMA}.${PRODUCTS_TABLE}`,
      code: error.code,
      message: error.message,
    });
    return null;
  }

  if (!data?.length) {
    return null;
  }

  return data.map(mapProductRow);
}

function mapProductRow(row: ProductRow): ProductRecord {
  const name = toText(row.name, "Untitled Product");
  const slug = toText(row.slug, slugify(name));

  return {
    id: toText(row.id, slug),
    name,
    slug,
    brand: toText(row.brand, "BrandnBeauty"),
    category: toText(row.category, "Skincare"),
    concern: toText(row.concern, "General"),
    price: toNumber(row.price, 0),
    oldPrice: toNullableNumber(row.oldPrice ?? row.old_price),
    stock: toNumber(row.stock, 0),
    sku: toText(row.sku, ""),
    image: toText(row.image, ""),
    shortDescription: toText(
      row.shortDescription ?? row.short_description,
      "",
    ),
    status: toStatus(row.status),
  };
}

function toText(value: unknown, fallback: string) {
  if (typeof value === "string") {
    return value.trim() || fallback;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return fallback;
}

function toNumber(value: unknown, fallback: number) {
  const numericValue = Number(
    typeof value === "string" ? value.replace(/[^0-9.]/g, "") : value,
  );
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

function toNullableNumber(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numericValue = Number(
    typeof value === "string" ? value.replace(/[^0-9.]/g, "") : value,
  );
  return Number.isFinite(numericValue) ? numericValue : null;
}

function toStatus(value: unknown): ProductStatus {
  const normalizedStatus =
    typeof value === "string"
      ? value.toLowerCase().replace(/[\s-]+/g, "_")
      : value;

  return validStatuses.includes(normalizedStatus as ProductStatus)
    ? (normalizedStatus as ProductStatus)
    : "active";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
