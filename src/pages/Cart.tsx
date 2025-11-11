import "../styles/Cart.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Your Shopping Cart</h1>
          <p className="page-subtitle">
            Review your authentic beauty essentials before checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/products" className="btn-shop">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <article key={item.id} className="cart-item">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="cart-item-image"
                    loading="lazy"
                  />

                  <div className="cart-item-info">
                    <h3 className="item-name">{item.name}</h3>
                    {item.brand && (
                      <p className="item-brand">{item.brand}</p>
                    )}
                    <p className="cart-item-price">
                      ₦{item.price.toLocaleString()}
                    </p>

                    <div className="cart-item-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart-item-total">
                    <p>
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Summary & Actions */}
            <div className="cart-summary">
              <div className="summary-line">
                <span>Subtotal</span>
                <strong>₦{totalPrice.toLocaleString()}</strong>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong className="total-price">
                  ₦{totalPrice.toLocaleString()}
                </strong>
              </div>

              <div className="cart-actions">
                <button className="btn-clear" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="btn-checkout">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}