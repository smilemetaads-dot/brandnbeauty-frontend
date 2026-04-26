"use client";

export type StoredCartItem = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  brand: string;
  category: string;
  concern: string;
  status: string;
  size?: string;
};

export const cartStorageKey = "brandnbeauty-cart";
export const cartUpdatedEvent = "brandnbeauty:cart-updated";

export function readCart(): StoredCartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(cartStorageKey);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue) as StoredCartItem[];

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .map(normalizeCartItem)
      .filter(isStoredCartItem);
  } catch {
    return [];
  }
}

export function writeCart(items: StoredCartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(cartStorageKey, JSON.stringify(items));
  window.dispatchEvent(new Event(cartUpdatedEvent));
}

export function addCartItem(item: StoredCartItem) {
  const currentItems = readCart();
  const existingIndex = currentItems.findIndex(
    (currentItem) =>
      currentItem.id === item.id && (currentItem.size ?? "") === (item.size ?? ""),
  );

  if (existingIndex >= 0) {
    const existingItem = currentItems[existingIndex];
    currentItems[existingIndex] = {
      ...existingItem,
      quantity: existingItem.quantity + item.quantity,
      image: item.image || existingItem.image,
      slug: item.slug || existingItem.slug,
      sku: item.sku || existingItem.sku,
      brand: item.brand || existingItem.brand,
      category: item.category || existingItem.category,
      concern: item.concern || existingItem.concern,
      status: item.status || existingItem.status,
    };
    writeCart(currentItems);
    return;
  }

  const normalizedItem = normalizeCartItem(item);

  if (!normalizedItem) {
    return;
  }

  writeCart([...currentItems, normalizedItem]);
}

export function updateCartItemQuantity(id: string, quantity: number, size?: string) {
  const nextItems = readCart()
    .map((item) => {
      if (item.id !== id || (item.size ?? "") !== (size ?? "")) {
        return item;
      }

      return {
        ...item,
        quantity: Math.max(1, quantity),
      };
    });

  writeCart(nextItems);
}

export function removeCartItem(id: string, size?: string) {
  writeCart(
    readCart().filter(
      (item) => item.id !== id || (item.size ?? "") !== (size ?? ""),
    ),
  );
}

export function clearCart() {
  writeCart([]);
}

function normalizeCartItem(
  item: StoredCartItem | null | undefined,
): StoredCartItem | null {
  if (!item || !item.id || !item.name || !item.slug) {
    return null;
  }

  return {
    id: item.id,
    slug: item.slug,
    sku: item.sku || "",
    name: item.name,
    image: item.image || "/products/pdp-1.jpg",
    price: Number.isFinite(item.price) ? item.price : 0,
    quantity: Math.max(1, Number(item.quantity) || 1),
    brand: item.brand || "BrandnBeauty",
    category: item.category || "Skincare",
    concern: item.concern || "General",
    status: item.status || "active",
    size: item.size || "",
  };
}

function isStoredCartItem(item: StoredCartItem | null): item is StoredCartItem {
  return item !== null;
}
