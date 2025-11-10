import type { Brand } from "../types/brand";
import "../styles/components.css";

interface Props {
  brand: Brand;
  onSelect: (id: number) => void;
}

export default function BrandCard({ brand, onSelect }: Props) {
  return (
    <div className="brand-card" onClick={() => onSelect(brand.id)}>
      <img src={brand.logo} alt={brand.name} />
      <h4>{brand.name}</h4>
    </div>
  );
}
