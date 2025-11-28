"use client";

import { createContext, useContext, useState, useEffect, type ReactNode,  } from "react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { FavoriteService } from "../services/favorite.service";
import { useAuth } from "@/cases/auth/hooks/use-auth";

interface FavoriteContextType {
  favorites: ProductDTO[];
  addFavorite: (product: ProductDTO) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  reloadFavorites: () => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<ProductDTO[]>([]);

  const reloadFavorites = async () => {
    if (!user?.id) return;

    try {
      const favoriteOrders = await FavoriteService.list(user.id);
      if (favoriteOrders.length > 0) {
        const items = favoriteOrders[0].items.map((item) => item.product);
        setFavorites(items);
      } else {
        setFavorites([]);
      }
    } catch (err) {
      console.error("Erro ao carregar favoritos:", err);
      setFavorites([]);
    }
  };

  useEffect(() => {
    reloadFavorites();
  }, [user]);

  const addFavorite = async (product: ProductDTO) => {
    if (!user?.id || !product.id) return;

    if (!favorites.find((p) => p.id === product.id)) {
      setFavorites((prev) => [...prev, product]);

      
      await FavoriteService.create({
        customer: { id: user.id, name: user.name },
        status: "NEW",
        items: [{ product, quantity: 1, value: product.price ?? 0 }],

      });
    }
  };

  const removeFavorite = async (productId: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  
  };

  const isFavorite = (productId: string) => favorites.some((p) => p.id === productId);

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, reloadFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) throw new Error("useFavorites must be used within a FavoriteProvider");
  return context;
}
