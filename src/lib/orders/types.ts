export type CheckoutCartItem = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  size?: string;
  brand: string;
  category: string;
  concern: string;
  status: string;
  price: number;
  qty: number;
  image: string;
};

export type CreateOrderInput = {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_note: string;
  subtotal: number;
  delivery_charge: number;
  discount: number;
  total: number;
  items: CheckoutCartItem[];
};

export type SavedOrderDetails = {
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    note: string;
  };
  amounts: {
    subtotal: number;
    deliveryCharge: number;
    discount: number;
    total: number;
  };
  items: CheckoutCartItem[];
};
