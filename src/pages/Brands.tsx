import { brands } from "../data/brands";
import BrandCard from "../components/BrandCard";
import "../styles/brands.css";

export default function Brands() {
  return (
    <section className="brands-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Shop by Brand</h1>
          <p className="page-subtitle">
            Discover authentic luxury from the world’s finest beauty houses
          </p>
        </div>

        {/* Brand Grid */}
        <div className="brand-grid">
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onSelect={(id) => alert(`Selected brand ${id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}