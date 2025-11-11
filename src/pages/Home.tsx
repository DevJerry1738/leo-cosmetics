import { Link } from "react-router-dom";
import "../styles/Home.css";
import heroImage from "../assets/images/hero-skincare.webp";
import { products } from "../data/products"; // adjust path if different

export default function Home() {
  const handleScrollDown = () => {
    const nextSection = document.getElementById("featured-products");
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  // Randomly select 3 products from the catalog
  const featuredProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);


  return (
    <>
      {/* HERO SECTION */}
      <section className="home-hero">
        <img src={heroImage} alt="Luxury skincare" className="hero-image" />
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">Glow with Confidence</h1>
          <p className="hero-text">
            Premium skincare & fragrances you can trust.
          </p>
          <Link to="/products" className="btn-shop">
            Explore Collection
          </Link>
        </div>

        <div className="scroll-indicator" onClick={handleScrollDown}>
          <span></span>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section id="featured-products" className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured This Season</h2>
            <p className="section-subtitle">
              Handpicked luxury for your daily routine.
            </p>
          </div>

          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="product-link">
                  <div className="product-image-wrapper">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                    />
                    <div className="product-badge">Featured</div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">
                      ₦{product.price.toLocaleString()}
                    </p>
                    <span className="product-cta">View Details →</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
