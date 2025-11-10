import { brands } from "../data/brands";
import BrandCard from "../components/BrandCard";
import "../styles/brands.css";

export default function Brands() {
  return (
    <section className="brands-page">
      <h2>Shop by Brand</h2>
      <div className="brand-grid">
        {brands.map((brand) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            onSelect={(id) => alert(`Selected brand ${id}`)}
          />
        ))}
      </div>
    </section>
  );
}
