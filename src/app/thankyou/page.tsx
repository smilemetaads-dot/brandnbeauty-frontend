import RealThankYouPage from "@/features/thankyou/RealThankYouPage";
import { getOrderDetailsByNumber } from "@/lib/orders/supabaseOrders";

export const dynamic = "force-dynamic";

type ThankYouPageProps = {
  searchParams?: Promise<{
    order?: string;
  }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = (await searchParams) ?? {};
  const orderDetails = params.order
    ? await getOrderDetailsByNumber(params.order)
    : null;

  return <RealThankYouPage orderDetails={orderDetails} />;
}
