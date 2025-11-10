import type { Product } from "../types/product";
import "../styles/components.css";

interface Props {
  product: Product;
  onView: (id: number) => void;
}

export default function ProductCard({ product, onView }: Props) {
  return (
    <div className="product-card" onClick={() => onView(product.id)}>
      <img src={product.images[0]} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₦{product.price}</p>
    </div>
  );
}
