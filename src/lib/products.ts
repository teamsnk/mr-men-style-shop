import tshirt from "@/assets/p-tshirt.jpg";
import shirt from "@/assets/p-shirt.jpg";
import polo from "@/assets/p-polo.jpg";
import trouser from "@/assets/p-trouser.jpg";
import panjabi from "@/assets/p-panjabi.jpg";
import jacket from "@/assets/p-jacket.jpg";
import hero from "@/assets/hero.jpg";
import editorial from "@/assets/editorial.jpg";

export type Category = "t-shirts" | "shirts" | "polos" | "trousers" | "panjabi" | "jackets";

export const CATEGORIES: { slug: Category; name: string; image: string }[] = [
  { slug: "t-shirts", name: "T-Shirts", image: tshirt },
  { slug: "shirts", name: "Shirts", image: shirt },
  { slug: "polos", name: "Polos", image: polo },
  { slug: "trousers", name: "Trousers", image: trouser },
  { slug: "panjabi", name: "Panjabi", image: panjabi },
  { slug: "jackets", name: "Jackets", image: jacket },
];

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  badge?: "New" | "Bestseller" | "Sale" | "Limited";
  sizes: string[];
  colour: string;
  images: string[];
  description: string;
  details: string[];
  isNew?: boolean;
  bestseller?: boolean;
};

const TOPS = ["S", "M", "L", "XL", "XXL"];
const WAIST = ["30", "32", "34", "36", "38"];

export const PRODUCTS: Product[] = [
  { slug: "heavyweight-crew-tee-black", name: "Heavyweight Crew Tee", category: "t-shirts", price: 1290, colour: "Jet Black", badge: "Bestseller", sizes: TOPS, images: [tshirt, hero], bestseller: true, isNew: true,
    description: "A 240 GSM combed cotton tee with a structured drape and a neckline that holds its shape wash after wash.", details: ["100% combed cotton, 240 GSM", "Relaxed, boxy fit", "Ribbed crew neck", "Made in Bangladesh"] },
  { slug: "essential-tee-ivory", name: "Essential Tee", category: "t-shirts", price: 990, colour: "Ivory", sizes: TOPS, images: [tshirt, editorial],
    description: "The everyday foundation. Soft-handed jersey cut to sit cleanly under a shirt or stand alone.", details: ["100% cotton jersey, 180 GSM", "Regular fit", "Pre-shrunk"] },
  { slug: "oxford-button-down-white", name: "Oxford Button-Down", category: "shirts", price: 2490, colour: "Optic White", badge: "New", sizes: TOPS, images: [shirt, hero], isNew: true, bestseller: true,
    description: "Classic oxford weave with a soft-roll collar. Sharp enough for the office, easy enough for the weekend.", details: ["100% cotton oxford", "Tailored fit", "Chest pocket", "Mother-of-pearl effect buttons"] },
  { slug: "linen-camp-shirt-sand", name: "Linen Camp Shirt", category: "shirts", price: 2890, compareAt: 3490, colour: "Sand", badge: "Sale", sizes: TOPS, images: [shirt, hero],
    description: "Breathable linen built for Dhaka summers, with an open camp collar and straight hem.", details: ["100% linen", "Relaxed fit", "Camp collar"] },
  { slug: "pique-polo-navy", name: "Piqué Polo", category: "polos", price: 1690, colour: "Midnight Navy", badge: "Bestseller", sizes: TOPS, images: [polo, hero], bestseller: true,
    description: "A refined piqué polo with a clean two-button placket and ribbed cuffs.", details: ["100% cotton piqué", "Regular fit", "Two-button placket"] },
  { slug: "knit-polo-black", name: "Knit Polo", category: "polos", price: 2190, colour: "Black", badge: "New", sizes: TOPS, images: [polo, editorial], isNew: true,
    description: "Fine-gauge knit polo with a matte finish — the smart alternative to a shirt.", details: ["Cotton blend knit", "Slim fit", "Open collar"] },
  { slug: "pleated-trouser-stone", name: "Pleated Trouser", category: "trousers", price: 2990, colour: "Stone", badge: "New", sizes: WAIST, images: [trouser, hero], isNew: true, bestseller: true,
    description: "Single-pleat trouser with a tapered leg and pressed crease. Effortless tailoring.", details: ["Poly-viscose twill", "Tapered fit", "Side adjusters"] },
  { slug: "tailored-chino-black", name: "Tailored Chino", category: "trousers", price: 2490, colour: "Black", sizes: WAIST, images: [trouser, editorial],
    description: "A slim-straight chino in brushed stretch cotton for all-day comfort.", details: ["98% cotton, 2% elastane", "Slim-straight fit"] },
  { slug: "cotton-panjabi-ivory", name: "Cotton Panjabi", category: "panjabi", price: 3490, colour: "Ivory", badge: "Bestseller", sizes: TOPS, images: [panjabi, editorial], bestseller: true, isNew: true,
    description: "A mandarin-collar panjabi in fine cotton with tonal buttons — understated festive dressing.", details: ["Fine cotton", "Regular fit", "Side slits", "Tonal buttons"] },
  { slug: "noir-panjabi-black", name: "Noir Panjabi", category: "panjabi", price: 3990, colour: "Black", badge: "Limited", sizes: TOPS, images: [editorial, panjabi], isNew: true,
    description: "Our signature black panjabi in a textured cotton-linen. Made for Eid evenings and beyond.", details: ["Cotton-linen blend", "Regular fit", "Limited run"] },
  { slug: "minimal-bomber-black", name: "Minimal Bomber", category: "jackets", price: 5490, colour: "Black", badge: "New", sizes: TOPS, images: [jacket, hero], isNew: true, bestseller: true,
    description: "A clean-lined bomber with matte hardware and ribbed trims. Winter's sharpest layer.", details: ["Water-repellent shell", "Light padding", "Two welt pockets"] },
  { slug: "overshirt-jacket-charcoal", name: "Overshirt Jacket", category: "jackets", price: 4290, compareAt: 4990, colour: "Charcoal", badge: "Sale", sizes: TOPS, images: [jacket, editorial],
    description: "A heavy twill overshirt that works as a shirt or a light jacket.", details: ["Cotton twill", "Relaxed fit", "Snap buttons"] },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const categoryName = (c: Category) => CATEGORIES.find((x) => x.slug === c)?.name ?? c;
