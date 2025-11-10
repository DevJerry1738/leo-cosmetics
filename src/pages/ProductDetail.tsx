import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "../styles/products.css";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found.</p>;

  return (
    <section className="product-detail">
      <img src={product.images[0]} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">₦{product.price}</p>
        {product.variants && (
          <select>
            {product.variants.map((v, i) => (
              <option key={i}>{v}</option>
            ))}
          </select>
        )}
        <button>Add to Cart</button>
      </div>
    </section>
  );
}
