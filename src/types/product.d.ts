export interface Product {
  id: number;
  name: string;
  brandId: number;
  category: string;
  price: number;
  description: string;
  images: string[];
  variants?: string[];
}
