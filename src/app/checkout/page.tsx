import RealCheckoutPage from "@/features/checkout/RealCheckoutPage";
import { getStorefrontStoreSettings } from "@/lib/settings/storeSettings";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const storeSettings = await getStorefrontStoreSettings();

  return <RealCheckoutPage storeSettings={storeSettings} />;
}
