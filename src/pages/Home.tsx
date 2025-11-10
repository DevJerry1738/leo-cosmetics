import { Link } from "react-router-dom";
import "../styles/Home.css";
import heroImage from "../assets/images/hero-skincare.jpg"; // update if needed

export default function Home() {
  // 👇 Scroll to the next section smoothly
  const handleScrollDown = () => {
    const nextSection = document.getElementById("featured-products");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="home-hero">
        <img src={heroImage} alt="Skincare products" className="hero-image" />

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">Discover Authentic Beauty</h1>
          <p className="hero-text">
            Premium skincare, perfumes, and body essentials crafted for your glow.
          </p>
          <Link to="/products" className="btn-shop">
            Shop Now
          </Link>
        </div>

        {/* ✨ Scroll indicator */}
        <div className="scroll-indicator" onClick={handleScrollDown}>
          <span></span>
        </div>
      </section>

      {/* 👇 Example placeholder for next section */}
      <section id="featured-products" className="featured-placeholder">
        <h2>Featured Products (coming soon)</h2>
      </section>
    </>
  );
}
