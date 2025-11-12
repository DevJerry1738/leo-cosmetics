import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import "./Navbar.css";
import logo from "../assets/logo-light.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Leo Cosmetics" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Shop</Link></li>
          <li><Link to="/brands">Brands</Link></li>
          <li><Link to="/expert">Expert Advice</Link></li>
          <li>
            <Link to="/cart" className="cart-link" aria-label="Cart">
              <FiShoppingCart className="cart-icon" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </li>
        </ul>

        {/* Mobile Cart + Hamburger */}
        <div className="mobile-right">
          <Link to="/cart" className="mobile-cart" aria-label="Cart">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          <button
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="sidebar-links">
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/products" onClick={closeMenu}>Shop</Link></li>
          <li><Link to="/brands" onClick={closeMenu}>Brands</Link></li>
          <li><Link to="/expert" onClick={closeMenu}>Expert Advice</Link></li>
          <li><Link to="/cart" onClick={closeMenu}>Cart</Link></li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;
