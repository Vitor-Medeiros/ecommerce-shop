
import { useFavorites } from "@/cases/favorites/contexts/favorite-context";
import { ProductCard } from "@/cases/products/components/product-card";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
        <p className="text-lg">Nenhum produto favoritado ainda.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Meus Favoritos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
