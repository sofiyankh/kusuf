import { supabase } from "@/integrations/supabase/client";

const products = [
  {
    name: "Desert Nomad Pants",
    name_ar: "سروال بدوي الصحراء",
    category: "drops",
    price: 195.0,
    image: "/images/d81af856f671f045137f4843339c77d3.jpg",
    description: "Relaxed fit trousers with adjustable drawstrings and side ventilation.",
    description_ar: "سروال بقصة مريحة مع أربطة قابلة للتعديل وتهوية جانبية.",
    ingredients: ["Lightweight Nylon", "Water Resistant", "Articulated Knees"],
    rating: 4.8,
    reviews: 12,
    stock: 25,
    in_stock: true,
    is_new: true,
    variants: [
      { id: "v-s", size: "S", stock: 5 },
      { id: "v-m", size: "M", stock: 10 },
      { id: "v-l", size: "L", stock: 10 },
    ],
  },
  {
    name: "Eclipse Windbreaker",
    name_ar: "سترة الكسوف الواقية",
    category: "drops",
    price: 210.0,
    original_price: 250.0,
    image: "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg",
    description: "Reflective windbreaker with Kusuf hidden branding.",
    description_ar: "سترة واقية عاكسة مع علامة Kusuf المخفية.",
    ingredients: ["Reflective Poly", "Mesh Lining", "Packable Hood"],
    rating: 4.9,
    reviews: 8,
    stock: 15,
    in_stock: true,
    is_new: true,
    discount: 16,
    variants: [
      { id: "v-s", size: "S", stock: 3 },
      { id: "v-m", size: "M", stock: 5 },
      { id: "v-l", size: "L", stock: 7 },
    ],
  },
  {
    name: "Kusuf Signature Socks",
    name_ar: "جوارب كشوف المميزة",
    category: "essentials",
    price: 25.0,
    image: "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
    description: "Cushioned crew socks with knit-in Kusuf logo.",
    description_ar: "جوارب قطنية مبطنة مع شعار Kusuf محبوك.",
    ingredients: ["80% Cotton", "15% Nylon", "5% Spandex"],
    rating: 4.9,
    reviews: 56,
    stock: 150,
    in_stock: true,
    is_new: false,
    variants: [{ id: "v-os", size: "OS", stock: 150 }],
  },
  {
    name: "Urban Stealth Hoodie",
    name_ar: "سترة ستيلث الحضرية",
    category: "drops",
    price: 145.0,
    image: "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg",
    description: "Heavyweight cotton hoodie with minimalist tonal branding.",
    description_ar: "سترة قطنية ثقيلة مع شعار بسيط متناسق الألوان.",
    ingredients: ["100% Organic Cotton", "450GSM", "Ribbed Cuffs"],
    rating: 4.7,
    reviews: 24,
    stock: 40,
    in_stock: true,
    is_new: true,
    variants: [
      { id: "h-s", size: "S", stock: 10 },
      { id: "h-m", size: "M", stock: 15 },
      { id: "h-l", size: "L", stock: 15 },
    ],
  },
  {
    name: "Sandstorm Oversized Tee",
    name_ar: "قميص عاصفة رملية فضفاض",
    category: "essentials",
    price: 65.0,
    image: "/images/a583c395a9133f31190311989d79caa9.jpg",
    description: "Dropped shoulder tee in signature sand palette.",
    description_ar: "قميص بأكتاف منسدلة بلون الرمل المميز.",
    ingredients: ["Premium Cotton Blend", "Breathable Fabric", "Preshrunk"],
    rating: 4.9,
    reviews: 82,
    stock: 100,
    in_stock: true,
    is_new: false,
    variants: [
      { id: "t-s", size: "S", stock: 20 },
      { id: "t-m", size: "M", stock: 40 },
      { id: "t-l", size: "L", stock: 40 },
    ],
  },
];

async function seed() {
  console.log("Seeding products...");
  for (const product of products) {
    // Try to insert with variants
    let { error } = await supabase.from("products").insert(product as never);

    if (error && error.message.includes("Could not find the 'variants' column")) {
      console.warn(`Column 'variants' missing, retrying without it for ${product.name}...`);
      const { variants, ...rest } = product;
      const { error: retryError } = await supabase.from("products").insert(rest as never);
      error = retryError;
    }

    if (error) {
      console.error(`Error inserting ${product.name}:`, error.message);
    } else {
      console.log(`Successfully inserted ${product.name}`);
    }
  }
  console.log("Seeding complete.");
}

seed();
