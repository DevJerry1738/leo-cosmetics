import type { Product } from "../types/product";
import product1 from "../assets/images/products/nivea-radiant-and-beauty.webp";
import product2 from "../assets/images/products/Nivea-Radiant-and-Beauty-Advanced.webp";  
import product3 from "../assets/images/products/Nivea-Perfect-and-Radiant.webp";  
import product4 from "../assets/images/products/Vaseline-Healthy-Even-Tone.webp";  
import product5 from "../assets/images/products/Vaseline-Gluta-Hya-Flawless Bright-Serum-burst-Lotion.webp";  
import product6 from "../assets/images/products/face-facts-bright+clear.webp";  
import product7 from "../assets/images/products/face-facts-niacinamide-serum.webp";  

export const products: Product[] = [
  {
    id: 1,
    name: "NIVEA Radiant & Beauty Even Glow Body Lotion",
    brandId: 1,
    brand: "NIVEA",
    badge: "Best Seller",
    category: "Body Creams",
    price: 5000,
    description: "Formulated with 95% Pure Vitamin C and Pearl Extract plus SPF15, this lotion provides 48-hour moisture and visibly evens skin tone in just 2 weeks. Ideal for melanin-rich skin, it reduces appearance of dark spots and improves texture. :contentReference[oaicite:0]{index=0}",
    images: [product1],
    variants: ["400ml"],
  },
  {
    id: 2,
    name: "NIVEA Radiant & Beauty Advance Care Body Lotion",
    brandId: 1,
    brand: "NIVEA",
    badge: "New",
    category: "Body Creams",
    price: 5000,
    description: "Advance Care formulation supports even skin tone and helps treat stretch marks with superior hydration. Designed for everyday use on melanin-rich skin for a smoother, more radiant look.",
    images: [product2],
    variants: ["400ml"],
  },
  {
    id: 3,
    name: "NIVEA Perfect & Radiant Body Lotion",
    brandId: 1,
    brand: "NIVEA",
    category: "Body Creams",
    price: 4000,
    description: "A daily moisturiser developed to enhance natural radiance, this body lotion supports skin’s natural glow with a lightweight finish and lasting hydration.",
    images: [product3],
    variants: ["400ml"],
  },
  {
    id: 4,
    name: "Vaseline Healthy Even Tone Body Lotion",
    brandId: 2,
    brand: "Vaseline",
    category: "Body Creams",
    price: 5000,
    description: "Infused with micro-droplets of Vaseline® Jelly to restore skin from within, this lotion gives visibly more even-toned skin in two weeks by deeply restoring moisture and protecting the skin’s barrier.",
    images: [product4],
    variants: ["400ml"],
  },
  {
    id: 5,
    name: "Vaseline Gluta Hya Flawless Bright Serum Burst Lotion",
    brandId: 2,
    brand: "Vaseline",
    badge: "Sale",
    category: "Body Creams",
    price: 10000,
    description: "With GlutaGlow technology (10× more powerful than Vitamin C), Hyaluron and Pro-Retinol, this serum-burst body lotion locks in moisture, boosts radiance and supports even skin tone from first use. :contentReference[oaicite:1]{index=1}",
    images: [product5],
    variants: ["400ml"],
  },
  {
    id: 6,
    name: "Face Facts Bright + Clear Face Cream",
    brandId: 3,
    brand: "Face Facts",
    badge: "Sale",
    category: "Body Creams",
    price: 15000,
    description: "Facefacts Bright + Clear Face Cream is a lightweight daily moisturiser formulated to brighten and even out the complexion while targeting dark spots and blemishes. Enriched with niacinamide, kojic acid, tranexamic acid, and azelaic acid, it helps fade discoloration, smooth skin texture, and promote a clearer, more radiant tone. Added hyaluronic acid and vitamin E provide deep hydration and soothe the skin, leaving it soft and refreshed. Suitable for most skin types, this cream supports a balanced, glowing complexion with regular use.",
    images: [product6],
    variants: ["75ml"],
  },
  {
    id: 7,
    name: "Face Facts Niacinamide Serum",
    brandId: 3,
    brand: "Face Facts",
    category: "Serums",
    price: 12000,
    description: "Facefacts Niacinamide Serum is a powerful treatment designed to target uneven skin tone, dark spots, and signs of aging. Formulated with 10% niacinamide, this serum helps to brighten the complexion, improve skin texture, and reduce the appearance of pores. Lightweight and fast-absorbing, it provides deep hydration while promoting a more radiant and youthful-looking skin.",
    images: [product7],
    variants: ["30ml"],
  },
];
