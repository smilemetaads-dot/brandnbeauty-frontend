import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { CreateOrderInput, SavedOrderDetails } from "@/lib/orders/types";

type OrderRow = {
  id?: string | number | null;
  order_number?: string | null;
  customer_name?: string | null;
  customer_phone?: string | null;
  customer_address?: string | null;
  customer_city?: string | null;
  customer_note?: string | null;
  subtotal?: number | string | null;
  delivery_charge?: number | string | null;
  discount?: number | string | null;
  total?: number | string | null;
};

type OrderItemRow = {
  product_id?: string | number | null;
  product_slug?: string | null;
  sku?: string | null;
  product_name?: string | null;
  product_brand?: string | null;
  product_category?: string | null;
  product_concern?: string | null;
  product_status?: string | null;
  unit_price?: number | string | null;
  quantity?: number | string | null;
  total_price?: number | string | null;
  image_url?: string | null;
};

type SupabaseAdminClient = NonNullable<
  ReturnType<typeof createSupabaseAdminClient>
>;

export class OrderSaveError extends Error {
  constructor(
    message: string,
    readonly status = 500,
  ) {
    super(message);
    this.name = "OrderSaveError";
  }
}

export async function createOrderWithItems(
  input: CreateOrderInput,
): Promise<{ orderNumber: string }> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    throw new OrderSaveError("Supabase service role config is missing.");
  }

  const orderNumber = await createUniqueOrderNumber(supabase);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_name: input.customer_name,
      customer_phone: input.customer_phone,
      customer_address: input.customer_address,
      customer_city: input.customer_city,
      customer_note: input.customer_note,
      subtotal: input.subtotal,
      delivery_charge: input.delivery_charge,
      discount: input.discount,
      total: input.total,
    })
    .select("id, order_number")
    .single();

  if (orderError || !order?.id) {
    throw new OrderSaveError(orderError?.message ?? "Order could not be created.");
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    input.items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_slug: item.slug,
      sku: item.sku,
      product_name: item.name,
      product_brand: item.brand,
      product_category: item.category,
      product_concern: item.concern,
      product_status: item.status,
      unit_price: item.price,
      quantity: item.qty,
      total_price: item.price * item.qty,
      image_url: item.image,
    })),
  );

  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id);
    throw new OrderSaveError(itemsError.message ?? "Order items could not be created.");
  }

  return { orderNumber };
}

export async function getOrderDetailsByNumber(
  orderNumber: string,
): Promise<SavedOrderDetails | null> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(
      "id, order_number, customer_name, customer_phone, customer_address, customer_city, customer_note, subtotal, delivery_charge, discount, total",
    )
    .eq("order_number", orderNumber)
    .maybeSingle();

  if (orderError || !order?.id) {
    return null;
  }

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select(
      "product_id, product_slug, sku, product_name, product_brand, product_category, product_concern, product_status, unit_price, quantity, total_price, image_url",
    )
    .eq("order_id", order.id);

  if (itemsError) {
    return null;
  }

  return mapOrderDetails(order, items ?? []);
}

async function createUniqueOrderNumber(supabase: SupabaseAdminClient) {
  const prefix = `BNB-${formatDateStamp(new Date())}`;
  const { data, error } = await supabase
    .from("orders")
    .select("order_number")
    .ilike("order_number", `${prefix}-%`);

  if (error) {
    throw new OrderSaveError("Could not generate an order number.");
  }

  const existingOrderNumbers = new Set(
    (data ?? [])
      .map((row) => toText((row as { order_number?: string | null }).order_number, ""))
      .filter(Boolean),
  );

  let suffix = 1;
  let candidate = `${prefix}-${suffix.toString().padStart(4, "0")}`;

  while (existingOrderNumbers.has(candidate)) {
    suffix += 1;
    candidate = `${prefix}-${suffix.toString().padStart(4, "0")}`;
  }

  return candidate;
}

function mapOrderDetails(order: OrderRow, items: OrderItemRow[]): SavedOrderDetails {
  return {
    orderNumber: toText(order.order_number, "BNB-UNKNOWN"),
    customer: {
      name: toText(order.customer_name, ""),
      phone: toText(order.customer_phone, ""),
      address: toText(order.customer_address, ""),
      city: toText(order.customer_city, ""),
      note: toText(order.customer_note, ""),
    },
    amounts: {
      subtotal: toNumber(order.subtotal),
      deliveryCharge: toNumber(order.delivery_charge),
      discount: toNumber(order.discount),
      total: toNumber(order.total),
    },
    items: items.map((item) => ({
      id: toText(item.product_id, ""),
      slug: toText(item.product_slug, ""),
      sku: toText(item.sku, ""),
      name: toText(item.product_name, "Product"),
      brand: toText(item.product_brand, ""),
      category: toText(item.product_category, ""),
      concern: toText(item.product_concern, ""),
      status: toText(item.product_status, ""),
      price: toNumber(item.unit_price),
      qty: toNumber(item.quantity),
      image: toText(item.image_url, "/products/pdp-1.jpg"),
    })),
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

function toNumber(value: unknown) {
  const numericValue = Number(
    typeof value === "string" ? value.replace(/[^0-9.]/g, "") : value,
  );
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function formatDateStamp(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}
