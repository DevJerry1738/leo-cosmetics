import { useState } from "react";
import { products } from "../data/products";
import { brands } from "../data/brands";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";

export default function Products() {
  const [selectedBrand, setSelectedBrand] = useState<number | "all">("all");

  const filtered =
    selectedBrand === "all"
      ? products
      : products.filter((p) => p.brandId === selectedBrand);

  return (
    <section className="products-page">
      <h2>Our Products</h2>

      <div className="filter-bar">
        <label>Filter by Brand:</label>
        <select
          value={selectedBrand}
          onChange={(e) =>
            setSelectedBrand(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
        >
          <option value="all">All Brands</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onView={(id) => alert(`View product ${id}`)}
          />
        ))}
      </div>
    </section>
  );
}
