import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo-light.png"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Leo Cosmetics" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Shop</Link></li>
        <li><Link to="/brands">Brands</Link></li>
        <li><Link to="/expert">Expert Advice</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
};
export default Navbar;
