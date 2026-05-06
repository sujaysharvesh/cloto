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
      "Collection 02 · The Traditions that shape us. A considered classic — our OR Monogram Cap is built for the long game. Cut from a durable cotton twill with a structured six-panel silhouette, it sits low and clean on the head without feeling stiff. The front panel carries our signature OR monogram in tonal embroidery, understated enough for everyday wear, distinct enough to be noticed. Locally made, intentionally designed.",
    details: [
      "100% Cotton twill construction",
      "Structured 6-panel design with fitted crown",
      "Tonal OR monogram embroidery on front panel",
      "Woven OR label on rear",
      "Pre-curved brim with contrast underside",
      "Adjustable strap closure with antique brass buckle",
      "Sweatband in natural cotton",
      "One size fits most",
      "Locally made in limited quantities",
    ],
    washCare: [
      "Hand wash in cold water only",
      "Use mild, colour-safe detergent",
      "Do not bleach or use harsh chemicals",
      "Do not wring — gently press out excess water",
      "Reshape crown while damp and air dry flat",
      "Do not tumble dry or machine wash",
      "Do not iron directly over embroidery",
      "Store with crown upright to maintain shape",
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
      "Collection 02 · The Traditions that shape us. The OR Red Cap is a statement built for those who set the pace. Constructed from a premium cotton twill in a deep maroon colourway, its unstructured five-panel profile sits relaxed and low — effortless without trying. The front panel is finished with tonal embroidery and a soft, slightly worn feel from the garment-wash process. Bold by design. Versatile by nature.",
    details: [
      "100% Premium cotton twill — deep maroon colourway",
      "Unstructured 5-panel design with relaxed crown",
      "Tonal OR monogram embroidery on front panel",
      "Garment-washed for a broken-in, lived-in feel",
      "Flat brim with contrast underside stitching",
      "Adjustable snapback closure",
      "Woven OR branded label at rear",
      "Cotton sweatband with OR tape",
      "One size fits most",
      "Locally made in limited quantities",
    ],
    washCare: [
      "Hand wash in cold water only",
      "Use a gentle, colour-safe detergent",
      "Wash dark colours separately to prevent bleeding",
      "Do not bleach",
      "Do not wring — gently squeeze out water",
      "Reshape while damp and air dry flat or on a cap form",
      "Do not tumble dry or machine wash",
      "Do not iron — especially over embroidery",
      "Avoid prolonged exposure to direct sunlight to prevent fading",
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
      "Collection 02 · The Traditions that shape us. Some things endure. The OR White Cap is stripped of excess — a low-profile, clean silhouette in crisp white cotton that pairs with everything and competes with nothing. Finished with a tonal OR monogram at the front and a velcro closure at the rear, it's the kind of piece that anchors an outfit quietly. The everyday essential, done properly.",
    details: [
      "100% Cotton — optical white",
      "Low-profile structured 6-panel fit",
      "Tonal OR monogram embroidery on front panel",
      "Pre-curved brim for a clean, fitted look",
      "Velcro closure at rear for adjustable fit",
      "Woven OR label sewn inside crown",
      "Cotton sweatband — moisture-wicking finish",
      "One size fits most",
      "Locally made in limited quantities",
    ],
    washCare: [
      "Hand wash in cold water only",
      "Use a gentle detergent formulated for whites",
      "Do not bleach — may cause yellowing over time",
      "Spot clean stains immediately with a damp cloth",
      "Do not wring — gently press out excess water",
      "Reshape while damp and air dry flat or on a cap form",
      "Do not tumble dry or machine wash",
      "Do not iron directly over embroidery",
      "Avoid contact with coloured fabrics when wet",
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
      "Collection 02 · The Traditions that shape us. The OR Monogram Tee in Black is the foundation of the collection. Cut with a relaxed, boxy silhouette that sits wide at the shoulder and drops long at the hem — designed to be worn untucked, oversized, and entirely at ease. The fabric is 100% organic cotton, garment-washed for a naturally soft hand-feel from day one. A small OR monogram sits embroidered at the centre chest. Quiet confidence, worn in.",
    details: [
      "100% GOTS-certified Organic Cotton — 220 GSM",
      "Relaxed boxy fit — oversized silhouette",
      "Dropped shoulder seam construction",
      "Ribbed crewneck collar",
      "OR monogram embroidery at centre chest — tonal thread",
      "Woven OR label at left hem interior",
      "Garment-washed for immediate softness",
      "Double-needle stitching at hem and cuffs",
      "Available in XS – XL",
      "Locally cut and sewn in limited quantities",
    ],
    washCare: [
      "Machine wash cold (30°C max) — gentle cycle",
      "Wash inside out to preserve embroidery and colour",
      "Use mild, colour-safe detergent",
      "Do not bleach",
      "Tumble dry on low heat or air dry flat",
      "Do not wring — may distort shape",
      "Warm iron on reverse if needed — do not iron over embroidery",
      "Do not dry clean",
      "Slight shrinkage may occur after first wash — size up if in doubt",
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
      "Collection 02 · The Traditions that shape us. The white edition of our OR Monogram Tee arrives with the same relaxed, boxy cut — now in a clean optical white with a contrast navy embroidery at the centre chest. The organic cotton fabric has been garment-washed to remove any stiffness, so it wears soft and lived-in from the first time you reach for it. A new addition to the collection. The one you'll keep coming back to.",
    details: [
      "100% GOTS-certified Organic Cotton — 220 GSM",
      "Relaxed boxy fit — oversized silhouette",
      "Dropped shoulder seam construction",
      "Ribbed crewneck collar",
      "Navy OR monogram embroidery at centre chest",
      "Woven OR label at left hem interior",
      "Garment-washed for immediate softness",
      "Double-needle stitching at hem and cuffs",
      "Available in XS – XL",
      "Locally cut and sewn in limited quantities",
    ],
    washCare: [
      "Machine wash cold (30°C max) — gentle cycle",
      "Wash inside out to preserve embroidery and colour",
      "Use a detergent suitable for whites — no optical brighteners",
      "Do not bleach — may cause yellowing",
      "Tumble dry on low heat or air dry flat",
      "Avoid washing with dark colours",
      "Spot clean stains immediately before washing",
      "Warm iron on reverse if needed — do not iron over embroidery",
      "Do not dry clean",
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
      "Collection 02 · The Traditions that shape us. Heather grey — the colour that works with everything and asks for nothing. The OR Monogram Tee in Grey carries the same boxy, dropped-shoulder silhouette as the rest of the collection, finished with a tonal chest embroidery that disappears into the fabric on first glance and reveals itself on the second. Garment-washed organic cotton. The wardrobe staple, properly made.",
    details: [
      "100% GOTS-certified Organic Cotton — 220 GSM — heather grey",
      "Relaxed boxy fit — oversized silhouette",
      "Dropped shoulder seam construction",
      "Ribbed crewneck collar",
      "Tonal OR monogram embroidery at centre chest",
      "Woven OR label at left hem interior",
      "Garment-washed for a natural, heathered texture",
      "Double-needle stitching at hem and cuffs",
      "Available in XS – XL",
      "Locally cut and sewn in limited quantities",
    ],
    washCare: [
      "Machine wash cold (30°C max) — gentle cycle",
      "Wash inside out to preserve embroidery and melange finish",
      "Use mild, colour-safe detergent",
      "Do not bleach",
      "Tumble dry on low heat or air dry flat",
      "Do not wring — may distort shape",
      "Warm iron on reverse if needed — do not iron over embroidery",
      "Do not dry clean",
      "Natural heathering may develop further with wear and washing — this is intentional",
    ],
  },
];

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  parentCategoryTree: {
    id: string;
    name: string;
  }[];
  updatedAt: string;
  path: string;
};

export type SEO = {
  title: string;
  description: string;
};