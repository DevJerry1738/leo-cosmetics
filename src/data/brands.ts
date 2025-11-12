import type { Brand } from "../types/brand";
import nivea from "../assets/images/brands/nivea.webp";
import vaseline from "../assets/images/brands/vaseline.webp";
import facefact from "../assets/images/brands/face-facts.webp";

export const brands: Brand[] = [
  {
    id: 1,
    name: "Nivea",
    logo: nivea,
  },
  {
    id: 2,
    name: "Vaseline",
    logo: vaseline,
  },
  {
    id: 3,
    name: "Face Facts",
    logo: facefact,
  },
];
