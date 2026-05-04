export type Product = {
  images: string[];
  title: string;
  code: string;
  price: string;
  category: "caps" | "tees" | "jackets" | "bottoms" | "accessories";
  tag?: "new" | "sold out" | null;
  description: string;
  details: string[];
  washCare: string[];
};

export const allProducts: Product[] = [
  {
    images: [
      "/bag/image1.png",
      "/bag/image2.png",
      "/bag/image3.png",
      "/bag/image3.png",
    ],
    title: "OR MONOGRAM CAP",
    code: "OR_CAP_1",
    price: "₹1,000.00",
    category: "caps",
    tag: null,
    description:
      "A classic cap with a modern twist, featuring the iconic OR monogram on the front. Crafted from premium cotton for a soft and comfortable fit, perfect for everyday wear.",
    details: [
      "100% Cotton twill",
      "Structured 6-panel design",
      "Embroidered monogram logo",
      "Adjustable strap closure",
    ],
    washCare: [
      "Hand wash cold",
      "Do not bleach",
      "Air dry flat",
      "Do not iron embroidery",
    ],
  },

  {
    images: [
      "/chain/image1.png",
      "/chain/image2.png",
      "/chain/image4.png",
      "/chain/image3.png",
    ],
    title: "OR RED CAP",
    code: "OR_CAP_2",
    price: "₹1,200.00",
    category: "caps",
    tag: "new",
    description:
      "Bold red cap with signature detailing. A statement piece built for those who lead — pair with any outfit for instant personality.",
    details: [
      "100% Cotton twill",
      "Unstructured 5-panel design",
      "Tonal embroidery",
      "Adjustable snapback",
    ],
    washCare: [
      "Hand wash cold",
      "Do not bleach",
      "Air dry flat",
      "Do not iron",
    ],
  },

  {
    images: [
      "/pant/image1.jpg",
      "/pant/image2.jpg",
      "/pant/image3.jpg",
      "/pant/image4.jpg",
    ],
    title: "OR WHITE CAP",
    code: "OR_CAP_3",
    price: "₹1,300.00",
    category: "caps",
    tag: null,
    description:
      "Clean, minimal white cap. Pairs effortlessly with any look in the collection. The everyday essential you didn't know you needed.",
    details: [
      "100% Cotton",
      "Low-profile structured fit",
      "Tonal logo embroidery",
      "Velcro closure",
    ],
    washCare: [
      "Hand wash cold",
      "Do not bleach",
      "Reshape and air dry",
      "Do not iron",
    ],
  },

  {
    images: [
      "/shirt/image1.jpg",
      "/shirt/image2.png",
      "/shirt/image4.png",
      "/shirt/image3.png",
    ],
    title: "OR MONOGRAM T-SHIRT [BLACK]",
    code: "OR_ORMT_B",
    price: "₹1,000.00",
    category: "tees",
    tag: null,
    description:
      "Collection 02 · The Traditions that shape us. Signature relaxed, boxy fit in classic black. Finished with a small embroidery at the centre chest.",
    details: [
      "100% Organic Cotton",
      "Relaxed boxy fit",
      "Embroidered chest logo",
      "Garment washed for softness",
    ],
    washCare: [
      "Machine wash cold",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
    ],
  },

  {
    images: [
      "/shoe/image1.jpg",
      "/shoe/image2.png",
      "/shoe/image3.png",
      "/shoe/image4.png",
    ],
    title: "OR MONOGRAM T-SHIRT [WHITE]",
    code: "OR_ORMT_W",
    price: "₹1,000.00",
    category: "tees",
    tag: "new",
    description:
      "Collection 02 · The Traditions that shape us. Our newest White T-Shirt with a relaxed boxy fit and minimal navy embroidery at the chest.",
    details: [
      "100% Organic Cotton",
      "Relaxed boxy fit",
      "Navy embroidered chest logo",
      "Garment washed for softness",
    ],
    washCare: [
      "Machine wash cold",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
    ],
  },

  {
    images: [
      "/cap/cap.jpg",
      "/cap/image2.png",
      "/cap/image3.png",
      "/cap/image4.png",
    ],
    title: "OR MONOGRAM T-SHIRT [GREY]",
    code: "OR_ORMT_G",
    price: "₹1,000.00",
    category: "tees",
    tag: null,
    description:
      "Collection 02 · Heather grey edition with the signature boxy silhouette and tonal chest embroidery. A wardrobe staple.",
    details: [
      "100% Organic Cotton",
      "Relaxed boxy fit",
      "Tonal embroidered chest logo",
      "Garment washed for softness",
    ],
    washCare: [
      "Machine wash cold",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
    ],
  },
];