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
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Discover Our Collection</h1>
          <p className="page-subtitle">
            Authentic luxury skincare, fragrances, and wellness essentials
          </p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <label htmlFor="brand-filter" className="filter-label">
            Filter by Brand
          </label>
          <div className="select-wrapper">
            <select
              id="brand-filter"
              value={selectedBrand}
              onChange={(e) =>
                setSelectedBrand(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="brand-select"
            >
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
               
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No products found for this brand.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}