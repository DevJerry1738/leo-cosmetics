import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext"; // ✅ import
import "./Navbar.css";
import logo from "../assets/logo-light.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart(); // ✅ access cart
  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Leo Cosmetics" />
          </Link>
        </div>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setIsOpen(false)}>Shop</Link></li>
          <li><Link to="/brands" onClick={() => setIsOpen(false)}>Brands</Link></li>
          <li><Link to="/expert" onClick={() => setIsOpen(false)}>Expert Advice</Link></li>
          <li>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="cart-link">
              Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
