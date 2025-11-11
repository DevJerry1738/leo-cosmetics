import type { Product } from "../types/product";
import "../styles/components.css";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.badge && (
          <span
            className={`product-badge ${product.badge
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        {product.brand && <p className="product-brand">{product.brand}</p>}
        <p className="product-price">₦{product.price.toLocaleString()}</p>

        <div className="card-actions">
          <Link to={`/product/${product.id}`} className="product-link">
            <button className="btn-view">View Details</button>
          </Link>
          <button className="btn-add" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        {added && (
          <div className="added-toast">
            <span>Added to cart 🛒</span>
          </div>
        )}
      </div>
    </article>
  );
}
