import { Heart, HeartMinus } from "lucide-react";

import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { useFavorites } from "../contexts/favorite-context";

interface FavoriteButtonProps {
  product: ProductDTO;
  className?: string; 
}

export function FavoriteButton({ product, className }: FavoriteButtonProps) {
  const { user } = useAuth(); 
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!user || !product.id) return null;

  const toggleFavorite = () => {
    if (isFavorite(product.id!)) {
      removeFavorite(product.id!);
    } else {
      addFavorite(product);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`bg-white rounded-full p-2 shadow hover:scale-110 transition ${className ?? ""}`}
    >
      {isFavorite(product.id) ? (
        <HeartMinus color="red" size={20} />
      ) : (
        <Heart color="gray" size={20} />
      )}
    </button>
  );
}
