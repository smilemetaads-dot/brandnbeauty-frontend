import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type StorefrontStoreSettings = {
  insideDhakaDelivery: number;
  outsideDhakaDelivery: number;
  freeDeliveryMinAmount: number;
  codEnabled: boolean;
  onlinePaymentEnabled: boolean;
};

type StoreSettingsRow = {
  inside_dhaka_delivery?: number | string | null;
  outside_dhaka_delivery?: number | string | null;
  free_delivery_min_amount?: number | string | null;
  cod_enabled?: boolean | null;
  online_payment_enabled?: boolean | null;
};

export const fallbackStorefrontStoreSettings: StorefrontStoreSettings = {
  insideDhakaDelivery: 60,
  outsideDhakaDelivery: 120,
  freeDeliveryMinAmount: 0,
  codEnabled: true,
  onlinePaymentEnabled: false,
};

export async function getStorefrontStoreSettings(): Promise<StorefrontStoreSettings> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    console.warn("[storefront-settings] Supabase service role config missing.");
    return fallbackStorefrontStoreSettings;
  }

  const { data, error } = await supabase
    .from("store_settings")
    .select(
      "inside_dhaka_delivery, outside_dhaka_delivery, free_delivery_min_amount, cod_enabled, online_payment_enabled",
    )
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[storefront-settings] Store settings query failed:", {
      table: "public.store_settings",
      code: error.code,
      message: error.message,
    });
    return fallbackStorefrontStoreSettings;
  }

  return data ? mapStoreSettingsRow(data) : fallbackStorefrontStoreSettings;
}

function mapStoreSettingsRow(
  row: StoreSettingsRow,
): StorefrontStoreSettings {
  return {
    insideDhakaDelivery: toNumber(
      row.inside_dhaka_delivery,
      fallbackStorefrontStoreSettings.insideDhakaDelivery,
    ),
    outsideDhakaDelivery: toNumber(
      row.outside_dhaka_delivery,
      fallbackStorefrontStoreSettings.outsideDhakaDelivery,
    ),
    freeDeliveryMinAmount: toNumber(
      row.free_delivery_min_amount,
      fallbackStorefrontStoreSettings.freeDeliveryMinAmount,
    ),
    codEnabled: row.cod_enabled ?? fallbackStorefrontStoreSettings.codEnabled,
    onlinePaymentEnabled:
      row.online_payment_enabled ??
      fallbackStorefrontStoreSettings.onlinePaymentEnabled,
  };
}

function toNumber(value: unknown, fallback: number) {
  const numericValue = Number(
    typeof value === "string" ? value.replace(/[^0-9.-]/g, "") : value,
  );

  return Number.isFinite(numericValue) ? numericValue : fallback;
}
