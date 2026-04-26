import { NextResponse } from "next/server";

import { createOrderWithItems, OrderSaveError } from "@/lib/orders/supabaseOrders";
import type { CreateOrderInput } from "@/lib/orders/types";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateOrderInput;

    if (
      !payload.customer_name ||
      !payload.customer_phone ||
      !payload.customer_address ||
      !payload.customer_city ||
      !Array.isArray(payload.items) ||
      payload.items.length === 0
    ) {
      return NextResponse.json(
        { error: "Please complete the checkout form before placing the order." },
        { status: 400 },
      );
    }

    const result = await createOrderWithItems(payload);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof OrderSaveError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Order could not be placed right now." },
      { status: 500 },
    );
  }
}
