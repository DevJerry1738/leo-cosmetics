import type { Brand } from "../types/brand";
import "../styles/brands.css";

interface Props {
  brand: Brand;
  onSelect: (id: number) => void;
}

export default function BrandCard({ brand, onSelect }: Props) {
  return (
    <div className="brand-card" onClick={() => onSelect(brand.id)}>
      <div className="brand-image-wrapper">
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          className="brand-image"
          loading="lazy"
        />
      </div>
      <div className="brand-info">
        <h3 className="brand-name">{brand.name}</h3>
      </div>
    </div>
  );
}