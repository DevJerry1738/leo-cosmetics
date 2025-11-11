import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import "../styles/ProductDetails.css";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="product-details">
        <h2>Product not found.</h2>
        <Link to="/products" className="btn-shop">
          Back to Products
        </Link>
      </section>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) setQuantity(value);
  };

  return (
    <>
      {/* ✅ Toast fixed at top of screen */}
      {added && (
        <div className="global-toast">
          <span>{quantity} item{quantity > 1 ? "s" : ""} added to cart</span>
        </div>
      )}

      <section className="product-details">
        <div className="details-container">
          <img
            src={product.images[0]}
            alt={product.name}
            className="details-image"
          />
          <div className="details-info">
            <h1 className="details-title">{product.name}</h1>
            <p className="details-price">₦{product.price.toLocaleString()}</p>
            <p className="details-desc">{product.description}</p>

            {/* ✅ Quantity Selector */}
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
              <input
                type="number"
                value={quantity}
                min={1}
                max={10}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
            </div>

            <button className="btn-shop" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
