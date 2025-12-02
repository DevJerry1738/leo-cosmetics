import type { Product } from "../types/product";
import "../styles/components.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success('', {
      duration: 2500,
      position: "top-center",
      style: {
        background: "linear-gradient(135deg, #37d498, #ffd700)",
        color: "#000",
        fontWeight: "400",
        fontSize: "1rem",
        borderRadius: "50px",
        padding: "12px 28px",
        boxShadow: "0 10px 30px rgba(212, 175, 55, 0.4)",
        width: "fit-content",
        maxWidth: "90%",
        margin: "0 auto",
      },
      icon: "Added to cart!",
    });
  };

  return (
    <article className="luxury-product-card">
      <div className="product-image-wrapper">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.badge && (
          <span className={`product-badge badge-${product.badge.toLowerCase().replace(" ", "-")}`}>
            {product.badge}
          </span>
        )}
        <div className="image-overlay"></div>
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        {product.brand && <p className="product-brand">{product.brand}</p>}
        <p className="product-price">₦{product.price.toLocaleString()}</p>

        <div className="card-actions">
          <Link to={`/product/${product.id}`} className="btn-view">
            View Details
          </Link>
          <button className="btn-add" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}