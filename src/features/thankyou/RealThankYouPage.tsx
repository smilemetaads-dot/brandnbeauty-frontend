"use client";

import React from "react";

type SiteHeaderProps = {
  title?: string;
};

type OrderedItem = {
  name: string;
  size: string;
  brand: string;
  price: number;
  qty: number;
  image: string;
};

type CustomerDetails = {
  name: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  city: string;
  deliveryType: string;
  payment: string;
  note: string;
};

function SiteHeader({ title = "" }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="BrandnBeauty" className="h-10 w-auto" />
        </a>
        <div className="text-sm text-slate-500">{title}</div>
        <button className="rounded-full bg-[#5E7F85] px-5 py-2 text-sm font-semibold text-white shadow-sm">
          Bag 0
        </button>
      </div>
    </header>
  );
}

export default function RealThankYouPage() {
  const invoiceRef = React.useRef<HTMLDivElement | null>(null);
  const orderId = "BNB-240316-1024";

  const customer: CustomerDetails = {
    name: "Ismail Hossain Chowdhury",
    phone: "8801680125043",
    email: "smilemetaads@gmail.com",
    address: "Dhaka, Bangladesh",
    area: "Dhaka Sadar",
    city: "Dhaka",
    deliveryType: "Inside Dhaka",
    payment: "Cash on Delivery",
    note: "N/A",
  };

  const orderedItems: OrderedItem[] = [
    {
      name: "Acne Balance Facewash",
      size: "100ml",
      brand: "Some By Mi",
      price: 890,
      qty: 1,
      image: "/products/pdp-1.jpg",
    },
    {
      name: "Barrier Calm Serum",
      size: "30ml",
      brand: "BrandnBeauty",
      price: 990,
      qty: 1,
      image: "/products/pdp-2.jpg",
    },
  ];

  const deliveryCharge = 60;
  const discount = 100;
  const subtotal = orderedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + deliveryCharge - discount;

  const formatBDT = (n: number) => `৳${n.toLocaleString()}`;

  const handleTrackOrder = () => {
    if (typeof window === "undefined") return;
    const trackingUrl = `/track-order?orderId=${encodeURIComponent(orderId)}`;
    window.location.href = trackingUrl;
  };

  const handleDownloadInvoice = () => {
    if (typeof window === "undefined" || !invoiceRef.current) return;

    const invoiceHtml = invoiceRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=1100,height=800");
    if (!printWindow) return;

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${orderId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 24px;
              color: #0f172a;
              background: #ffffff;
            }
            .invoice-shell {
              border: 1px solid #e2e8f0;
              border-radius: 24px;
              padding: 24px;
            }
            img {
              max-width: 100%;
            }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-shell">${invoiceHtml}</div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <SiteHeader title="Order Success" />

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div
          ref={invoiceRef}
          className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:p-10"
        >
          <div className="mb-10 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#5E7F85]/10 text-4xl font-bold text-[#5E7F85] shadow-md">
              ✓
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#5E7F85] sm:text-3xl md:text-5xl">
              Order Confirmed
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base md:text-[1.15rem]">
              Your order has been successfully received. Our team will contact you
              shortly to confirm the details.
            </p>

            <div className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-stone-50 p-4 text-center sm:p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Order ID
                </div>
                <div className="mt-2 text-lg font-semibold text-[#5E7F85] sm:text-xl md:text-2xl">
                  {orderId}
                </div>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4 text-center sm:p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Payment
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl md:text-2xl">
                  {customer.payment}
                </div>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4 text-center sm:p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Delivery
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl md:text-2xl">
                  2–4 Days
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold">Invoice</h2>
            <div className="text-sm text-slate-500">
              Order <span className="font-semibold text-[#5E7F85]">#{orderId}</span>
            </div>
          </div>

          <div className="mt-6 space-y-4 md:hidden">
            {orderedItems.map((item) => (
              <div key={item.name} className="rounded-xl border border-slate-200 p-3">
                <div className="flex gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white sm:h-14 sm:w-14">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium leading-5 text-slate-900">
                      {item.name} ({item.size})
                    </div>
                    <div className="text-xs text-slate-500">{item.brand}</div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                      <span>Qty: x{item.qty}</span>
                      <span>Price: {formatBDT(item.price)}</span>
                    </div>
                    <div className="mt-2 text-right text-sm font-semibold text-slate-900">
                      Total: {formatBDT(item.price * item.qty)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 hidden overflow-hidden rounded-xl border border-slate-200 md:block">
            <div className="grid grid-cols-12 bg-stone-50 px-4 py-2 text-xs font-semibold text-slate-500">
              <div className="col-span-1">Image</div>
              <div className="col-span-5">Items</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {orderedItems.map((item) => (
              <div key={item.name} className="grid grid-cols-12 items-center border-t px-4 py-3 text-sm">
                <div className="col-span-1">
                  <div className="h-14 w-14 overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="col-span-5 pl-2">
                  <div className="font-medium leading-5">
                    {item.name} ({item.size})
                  </div>
                  <div className="text-xs text-slate-500">{item.brand}</div>
                </div>
                <div className="col-span-2 text-center">x{item.qty}</div>
                <div className="col-span-2 text-right">{formatBDT(item.price)}</div>
                <div className="col-span-2 text-right font-semibold">
                  {formatBDT(item.price * item.qty)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 p-4 sm:p-5">
            <div className="mb-4 bg-stone-50 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-800">
              Customer &amp; Order Details
            </div>
            <div className="divide-y divide-slate-200 text-sm">
              <div className="grid gap-1 px-3 py-3 text-sm sm:grid-cols-2 sm:gap-4 sm:px-4">
                <span className="font-medium text-slate-700">Customer Name</span>
                <span>{customer.name}</span>
              </div>
              <div className="grid gap-1 px-3 py-3 text-sm sm:grid-cols-2 sm:gap-4 sm:px-4">
                <span className="font-medium text-slate-700">Phone Number</span>
                <span>{customer.phone}</span>
              </div>
              <div className="grid gap-1 px-3 py-3 text-sm sm:grid-cols-2 sm:gap-4 sm:px-4">
                <span className="font-medium text-slate-700">Email Address</span>
                <span>{customer.email}</span>
              </div>
              <div className="grid gap-1 px-3 py-3 text-sm sm:grid-cols-2 sm:gap-4 sm:px-4">
                <span className="font-medium text-slate-700">Delivery Type</span>
                <span>{customer.deliveryType}</span>
              </div>
              <div className="grid gap-1 px-3 py-3 text-sm sm:grid-cols-2 sm:gap-4 sm:px-4">
                <span className="font-medium text-slate-700">Payment Method</span>
                <span>{customer.payment}</span>
              </div>
              <div className="grid gap-1 px-3 py-3 text-sm sm:grid-cols-2 sm:gap-4 sm:px-4">
                <span className="font-medium text-slate-700">Note</span>
                <span>{customer.note}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4 sm:p-5">
              <div className="mb-4 bg-stone-50 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-800">
                Delivery Address
              </div>
              <div className="space-y-3 px-3 text-sm sm:px-4">
                <div className="grid gap-1 sm:grid-cols-[90px_1fr] sm:gap-3">
                  <span className="font-medium text-slate-700">Address</span>
                  <span>{customer.address}</span>
                </div>
                <div className="grid gap-1 sm:grid-cols-[90px_1fr] sm:gap-3">
                  <span className="font-medium text-slate-700">Area</span>
                  <span>{customer.area}</span>
                </div>
                <div className="grid gap-1 sm:grid-cols-[90px_1fr] sm:gap-3">
                  <span className="font-medium text-slate-700">City</span>
                  <span>{customer.city}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 sm:p-5">
              <div className="mb-4 bg-stone-50 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-800">
                Order Summary
              </div>
              <div className="space-y-3 px-3 text-sm sm:px-4">
                <div className="flex justify-between gap-4">
                  <span className="font-medium text-slate-700">Order Date</span>
                  <span>December 1, 2025</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="font-medium text-slate-700">Order Time</span>
                  <span>06:25 pm</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="font-medium text-slate-700">Sub Total</span>
                  <span>{formatBDT(subtotal)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="font-medium text-slate-700">Delivery Fee</span>
                  <span>{formatBDT(deliveryCharge)}</span>
                </div>
                <div className="flex justify-between gap-4 text-emerald-600">
                  <span className="font-medium">Discount</span>
                  <span>- {formatBDT(discount)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white px-5 py-4">
            <div className="flex items-center justify-between gap-6 text-sm font-semibold uppercase tracking-wide sm:justify-end sm:gap-10">
              <span>Total</span>
              <span className="text-[#5E7F85]">{formatBDT(total)}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              onClick={handleTrackOrder}
              className="rounded-xl bg-[#5E7F85] px-4 py-3 text-sm font-semibold text-white"
            >
              Track Order
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="rounded-xl border border-[#5E7F85] px-4 py-3 text-sm font-semibold text-[#5E7F85]"
            >
              Download Invoice (PDF)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
