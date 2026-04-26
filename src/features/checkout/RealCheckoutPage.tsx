"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

import { cartUpdatedEvent, clearCart, readCart, type StoredCartItem } from "@/lib/cart/store";
import type { CreateOrderInput } from "@/lib/orders/types";
import type { StorefrontStoreSettings } from "@/lib/settings/storeSettings";

type SiteHeaderProps = {
  title?: string;
};

type CartItem = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  concern: string;
  status: string;
  price: number;
  qty: number;
  image: string;
};

type RealCheckoutPageProps = {
  storeSettings: StorefrontStoreSettings;
};

function SiteHeader({ title = "" }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="BrandnBeauty" className="h-10 w-auto" />
        </Link>
        <div className="text-sm text-slate-500">{title}</div>
        <Link href="/cart" className="rounded-full bg-[#5E7F85] px-5 py-2 text-sm font-semibold text-white shadow-sm">
          Bag
        </Link>
      </div>
    </header>
  );
}

export default function RealCheckoutPage({
  storeSettings,
}: RealCheckoutPageProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("Dhaka");
  const [selectedThana, setSelectedThana] = useState("Mirpur");
  const [shippingMethod, setShippingMethod] = useState<"inside" | "outside">("inside");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [items, setItems] = useState<CartItem[]>([]);

  const districtOptions: Record<string, string[]> = {
    Bagerhat: [
      "Bagerhat Sadar",
      "Chitalmari",
      "Fakirhat",
      "Kachua",
      "Mollahat",
      "Mongla",
      "Morrelganj",
      "Rampal",
      "Sarankhola",
    ],
    Bandarban: [
      "Bandarban Sadar",
      "Alikadam",
      "Lama",
      "Naikhongchhari",
      "Rowangchhari",
      "Ruma",
      "Thanchi",
    ],
    Barguna: ["Barguna Sadar", "Amtali", "Bamna", "Betagi", "Patharghata", "Taltali"],
    Barishal: [
      "Barishal Sadar",
      "Agailjhara",
      "Babuganj",
      "Bakerganj",
      "Banaripara",
      "Gaurnadi",
      "Hizla",
      "Mehendiganj",
      "Muladi",
      "Wazirpur",
    ],
    Bhola: [
      "Bhola Sadar",
      "Borhanuddin",
      "Char Fasson",
      "Daulatkhan",
      "Lalmohan",
      "Manpura",
      "Tazumuddin",
    ],
    Bogura: [
      "Bogura Sadar",
      "Adamdighi",
      "Dhunat",
      "Dhupchanchia",
      "Gabtali",
      "Kahaloo",
      "Nandigram",
      "Sariakandi",
      "Shajahanpur",
      "Sherpur",
      "Shibganj",
      "Sonatala",
    ],
    Brahmanbaria: [
      "Brahmanbaria Sadar",
      "Akhaura",
      "Ashuganj",
      "Bancharampur",
      "Bijoynagar",
      "Kasba",
      "Nabinagar",
      "Nasirnagar",
      "Sarail",
    ],
    Chandpur: [
      "Chandpur Sadar",
      "Faridganj",
      "Haimchar",
      "Hajiganj",
      "Kachua",
      "Matlab Dakshin",
      "Matlab Uttar",
      "Shahrasti",
    ],
    Chapainawabganj: [
      "Chapainawabganj Sadar",
      "Bholahat",
      "Gomastapur",
      "Nachole",
      "Shibganj",
    ],
    Chattogram: [
      "Chattogram Sadar",
      "Anwara",
      "Banshkhali",
      "Boalkhali",
      "Chandanaish",
      "Fatikchhari",
      "Hathazari",
      "Lohagara",
      "Mirsharai",
      "Patiya",
      "Rangunia",
      "Raozan",
      "Sandwip",
      "Satkania",
      "Sitakunda",
      "Panchlaish",
      "Kotwali",
      "Halishahar",
      "Pahartali",
      "Patenga",
      "Chandgaon",
      "Bakalia",
    ],
    Chuadanga: ["Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar"],
    Comilla: [
      "Comilla Sadar",
      "Barura",
      "Brahmanpara",
      "Burichang",
      "Chandina",
      "Chauddagram",
      "Daudkandi",
      "Debidwar",
      "Homna",
      "Laksam",
      "Lalmai",
      "Meghna",
      "Monohorganj",
      "Muradnagar",
      "Nangalkot",
      "Titas",
    ],
    CoxsBazar: [
      "Cox's Bazar Sadar",
      "Chakaria",
      "Kutubdia",
      "Maheshkhali",
      "Pekua",
      "Ramu",
      "Teknaf",
      "Ukhiya",
    ],
    Dhaka: [
      "Dhanmondi",
      "Gulshan",
      "Mirpur",
      "Mohammadpur",
      "Badda",
      "Tejgaon",
      "Rampura",
      "Khilgaon",
      "Uttara",
      "Savar",
      "Keraniganj",
      "Nawabganj",
      "Dhamrai",
      "Dohar",
      "Demra",
      "Ashulia",
    ],
    Dinajpur: [
      "Dinajpur Sadar",
      "Biral",
      "Birampur",
      "Birganj",
      "Bochaganj",
      "Chirirbandar",
      "Phulbari",
      "Ghoraghat",
      "Hakimpur",
      "Kaharole",
      "Khansama",
      "Nawabganj",
      "Parbatipur",
    ],
    Faridpur: [
      "Faridpur Sadar",
      "Alfadanga",
      "Bhanga",
      "Boalmari",
      "Charbhadrasan",
      "Madhukhali",
      "Nagarkanda",
      "Sadarpur",
      "Saltha",
    ],
    Feni: ["Feni Sadar", "Chhagalnaiya", "Daganbhuiyan", "Fulgazi", "Parshuram", "Sonagazi"],
    Gaibandha: [
      "Gaibandha Sadar",
      "Fulchhari",
      "Gobindaganj",
      "Palashbari",
      "Sadullapur",
      "Saghata",
      "Sundarganj",
    ],
    Gazipur: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur", "Tongi"],
    Gopalganj: ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
    Habiganj: [
      "Habiganj Sadar",
      "Ajmiriganj",
      "Bahubal",
      "Baniachong",
      "Chunarughat",
      "Lakhai",
      "Madhabpur",
      "Nabiganj",
      "Shayestaganj",
    ],
    Jamalpur: [
      "Jamalpur Sadar",
      "Baksiganj",
      "Dewanganj",
      "Islampur",
      "Madarganj",
      "Melandaha",
      "Sarishabari",
    ],
    Jashore: [
      "Jashore Sadar",
      "Abhaynagar",
      "Bagherpara",
      "Chaugachha",
      "Jhikargachha",
      "Keshabpur",
      "Manirampur",
      "Sharsha",
    ],
    Jhalokathi: ["Jhalokathi Sadar", "Kathalia", "Nalchity", "Rajapur"],
    Jhenaidah: [
      "Jhenaidah Sadar",
      "Harinakunda",
      "Kaliganj",
      "Kotchandpur",
      "Maheshpur",
      "Shailkupa",
    ],
    Joypurhat: ["Joypurhat Sadar", "Akkelpur", "Kalai", "Khetlal", "Panchbibi"],
    Khagrachhari: [
      "Khagrachhari Sadar",
      "Dighinala",
      "Lakshmichhari",
      "Mahalchhari",
      "Manikchhari",
      "Matiranga",
      "Panchhari",
      "Ramgarh",
    ],
    Khulna: [
      "Khulna Sadar",
      "Batiaghata",
      "Dacope",
      "Dighalia",
      "Dumuria",
      "Koyra",
      "Paikgachha",
      "Phultala",
      "Rupsa",
      "Terokhada",
      "Sonadanga",
      "Daulatpur",
    ],
    Kishoreganj: [
      "Kishoreganj Sadar",
      "Austagram",
      "Bajitpur",
      "Bhairab",
      "Hossainpur",
      "Itna",
      "Karimganj",
      "Katiadi",
      "Kuliarchar",
      "Mithamain",
      "Nikli",
      "Pakundia",
      "Tarail",
    ],
    Kurigram: [
      "Kurigram Sadar",
      "Bhurungamari",
      "Char Rajibpur",
      "Chilmari",
      "Phulbari",
      "Nageshwari",
      "Rajarhat",
      "Raomari",
      "Ulipur",
    ],
    Kushtia: ["Kushtia Sadar", "Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Mirpur"],
    Lakshmipur: ["Lakshmipur Sadar", "Kamalnagar", "Raipur", "Ramganj", "Ramgati"],
    Lalmonirhat: ["Lalmonirhat Sadar", "Aditmari", "Hatibandha", "Kaliganj", "Patgram"],
    Madaripur: ["Madaripur Sadar", "Kalkini", "Rajoir", "Shibchar"],
    Magura: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
    Manikganj: [
      "Manikganj Sadar",
      "Daulatpur",
      "Ghior",
      "Harirampur",
      "Saturia",
      "Shibalaya",
      "Singair",
    ],
    Meherpur: ["Meherpur Sadar", "Gangni", "Mujibnagar"],
    Moulvibazar: [
      "Moulvibazar Sadar",
      "Barlekha",
      "Juri",
      "Kamalganj",
      "Kulaura",
      "Rajnagar",
      "Sreemangal",
    ],
    Munshiganj: [
      "Munshiganj Sadar",
      "Gazaria",
      "Lohajang",
      "Sirajdikhan",
      "Sreenagar",
      "Tongibari",
    ],
    Mymensingh: [
      "Mymensingh Sadar",
      "Bhaluka",
      "Dhobaura",
      "Fulbaria",
      "Gaffargaon",
      "Gauripur",
      "Haluaghat",
      "Ishwarganj",
      "Muktagachha",
      "Nandail",
      "Phulpur",
      "Trishal",
    ],
    Naogaon: [
      "Naogaon Sadar",
      "Atrai",
      "Badalgachhi",
      "Dhamoirhat",
      "Manda",
      "Mohadevpur",
      "Niamatpur",
      "Patnitala",
      "Porsha",
      "Raninagar",
      "Sapahar",
    ],
    Narail: ["Narail Sadar", "Kalia", "Lohagara"],
    Narayanganj: [
      "Narayanganj Sadar",
      "Araihazar",
      "Bandar",
      "Rupganj",
      "Sonargaon",
      "Fatullah",
      "Siddhirganj",
    ],
    Narsingdi: ["Narsingdi Sadar", "Belabo", "Monohardi", "Palash", "Raipura", "Shibpur"],
    Natore: ["Natore Sadar", "Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Singra"],
    Netrokona: [
      "Netrokona Sadar",
      "Atpara",
      "Barhatta",
      "Durgapur",
      "Kendua",
      "Kalmakanda",
      "Madan",
      "Mohanganj",
      "Purbadhala",
      "Khaliajuri",
    ],
    Nilphamari: ["Nilphamari Sadar", "Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Saidpur"],
    Noakhali: [
      "Noakhali Sadar",
      "Begumganj",
      "Chatkhil",
      "Companiganj",
      "Hatiya",
      "Kabirhat",
      "Senbag",
      "Sonaimuri",
      "Subarnachar",
    ],
    Pabna: [
      "Pabna Sadar",
      "Atgharia",
      "Bera",
      "Bhangura",
      "Chatmohar",
      "Faridpur",
      "Ishwardi",
      "Santhia",
      "Sujanagar",
    ],
    Panchagarh: ["Panchagarh Sadar", "Atwari", "Boda", "Debiganj", "Tetulia"],
    Patuakhali: [
      "Patuakhali Sadar",
      "Bauphal",
      "Dashmina",
      "Dumki",
      "Galachipa",
      "Kalapara",
      "Mirzaganj",
      "Rangabali",
    ],
    Pirojpur: [
      "Pirojpur Sadar",
      "Bhandaria",
      "Kawkhali",
      "Mathbaria",
      "Nazirpur",
      "Nesarabad",
      "Zianagar",
    ],
    Rajbari: ["Rajbari Sadar", "Baliakandi", "Goalandaghat", "Kalukhali", "Pangsha"],
    Rajshahi: [
      "Rajshahi Sadar",
      "Bagha",
      "Bagmara",
      "Charghat",
      "Durgapur",
      "Godagari",
      "Mohanpur",
      "Paba",
      "Puthia",
      "Tanore",
    ],
    Rangamati: [
      "Rangamati Sadar",
      "Baghaichhari",
      "Barkal",
      "Belaichhari",
      "Juraichhari",
      "Kaptai",
      "Kawkhali",
      "Langadu",
      "Naniarchar",
      "Rajasthali",
    ],
    Rangpur: ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"],
    Satkhira: ["Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala"],
    Shariatpur: ["Shariatpur Sadar", "Bhedarganj", "Damudya", "Gosairhat", "Naria", "Zajira"],
    Sherpur: ["Sherpur Sadar", "Jhenaigati", "Nakla", "Nalitabari", "Sreebardi"],
    Sirajganj: ["Sirajganj Sadar", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Tarash", "Ullahpara"],
    Sunamganj: [
      "Sunamganj Sadar",
      "Bishwamvarpur",
      "Chhatak",
      "Derai",
      "Dharamapasha",
      "Dowarabazar",
      "Jagannathpur",
      "Jamalganj",
      "Madhyanagar",
      "Shalla",
      "South Sunamganj",
      "Tahirpur",
    ],
    Sylhet: [
      "Sylhet Sadar",
      "Balaganj",
      "Beanibazar",
      "Bishwanath",
      "Companiganj",
      "Fenchuganj",
      "Golapganj",
      "Gowainghat",
      "Jaintiapur",
      "Kanaighat",
      "Osmaninagar",
      "Zakiganj",
    ],
    Tangail: [
      "Tangail Sadar",
      "Basail",
      "Bhuapur",
      "Delduar",
      "Dhanbari",
      "Ghatail",
      "Gopalpur",
      "Kalihati",
      "Madhupur",
      "Mirzapur",
      "Nagarpur",
      "Sakhipur",
    ],
    Thakurgaon: ["Thakurgaon Sadar", "Baliadangi", "Haripur", "Pirganj", "Ranisankail"],
  };

  useEffect(() => {
    const syncCart = () => {
      setItems(
        readCart().map((item: StoredCartItem) => ({
          id: item.id,
          slug: item.slug,
          sku: item.sku,
          name: item.name,
          brand: item.brand,
          category: item.category,
          concern: item.concern,
          status: item.status,
          price: item.price,
          qty: item.quantity,
          image: item.image,
        })),
      );
    };

    syncCart();
    window.addEventListener("storage", syncCart);
    window.addEventListener(cartUpdatedEvent, syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener(cartUpdatedEvent, syncCart);
    };
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );
  const isDhaka = selectedDistrict === "Dhaka";
  const configuredDelivery = isDhaka
    ? storeSettings.insideDhakaDelivery
    : storeSettings.outsideDhakaDelivery;
  const delivery =
    storeSettings.freeDeliveryMinAmount > 0 &&
    subtotal >= storeSettings.freeDeliveryMinAmount
      ? 0
      : configuredDelivery;
  const total = subtotal + delivery;

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    const nextThana = districtOptions[district][0];
    setSelectedDistrict(district);
    setSelectedThana(nextThana);
    setShippingMethod(district === "Dhaka" ? "inside" : "outside");
  };

  const formatBDT = (n: number) => `৳${n.toLocaleString()}`;

  const handlePlaceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const formData = new FormData(event.currentTarget);
    const payload: CreateOrderInput = {
      customer_name: String(formData.get("customer_name") ?? "").trim(),
      customer_phone: String(formData.get("customer_phone") ?? "").trim(),
      customer_address: String(formData.get("customer_address") ?? "").trim(),
      customer_city: selectedDistrict,
      customer_note: String(formData.get("customer_note") ?? "").trim(),
      subtotal,
      delivery_charge: delivery,
      discount: 0,
      total,
      items,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        orderNumber?: string;
        error?: string;
      };

      if (!response.ok || !result.orderNumber) {
        throw new Error(result.error ?? "Order could not be placed right now.");
      }

      clearCart();
      router.push(`/thankyou?order=${encodeURIComponent(result.orderNumber)}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Order could not be placed right now.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <SiteHeader title="Checkout" />

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#5E7F85]">
          Order &amp; Shipping Details
        </h1>

        <form
          onSubmit={handlePlaceOrder}
          className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1fr_380px]"
        >
          <div className="h-full">
            <div className="h-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="customer_name"
                    className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#5E7F85]"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    name="customer_phone"
                    className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#5E7F85]"
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <textarea
                    name="customer_address"
                    className="min-h-[56px] rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#5E7F85] md:min-h-[56px]"
                    placeholder="Address"
                    required
                  />

                  <input
                    className="rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#5E7F85]"
                    placeholder="Email Address (optional)"
                  />
                </div>

                <textarea
                  name="customer_note"
                  className="min-h-[120px] rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#5E7F85]"
                  placeholder="Order Note (Optional)"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#5E7F85]"
                  >
                    {Object.keys(districtOptions).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedThana}
                    onChange={(e) => {
                      const nextThana = e.target.value;
                      setSelectedThana(nextThana);
                      setShippingMethod(
                        selectedDistrict === "Dhaka" ? "inside" : "outside",
                      );
                    }}
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#5E7F85]"
                  >
                    {districtOptions[selectedDistrict].map((thana) => (
                      <option key={thana} value={thana}>
                        {thana}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <aside className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">ORDER SUMMARY</div>

            <div className="mt-6 border-t pt-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatBDT(subtotal)}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>
                  Delivery Charge{" "}
                  {shippingMethod === "inside"
                    ? "(Dhaka City)"
                    : isDhaka
                      ? "(Dhaka Sub Area)"
                      : "(Outside Dhaka)"}
                </span>
                <span>{formatBDT(delivery)}</span>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between text-base font-semibold">
                <span>ORDER TOTAL</span>
                <span className="text-[#5E7F85]">{formatBDT(total)}</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-900">
                Choose Payment Method
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span>Cash on delivery</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === "bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                  />
                  <span>Bkash</span>
                </label>
              </div>
            </div>

            <div className="mt-auto">
              {submitError ? (
                <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  {submitError}
                </div>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-2xl bg-[#5E7F85] py-4 text-sm font-semibold text-white shadow-sm disabled:opacity-70"
              >
                {isSubmitting ? "Processing..." : "PLACE ORDER"}
              </button>
            </div>
          </aside>
        </form>
      </section>
    </div>
  );
}
