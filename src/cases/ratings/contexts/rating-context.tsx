import { createContext, useContext, useState, useEffect, type ReactNode,  } from "react";

interface ProductRating {
  productId: string;
  rating: number;
}

interface RatingContextType {
  ratings: ProductRating[];
  setRating: (productId: string, rating: number) => void;
  getRating: (productId: string) => number | undefined;
}

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export function RatingProvider({ children }: { children: ReactNode }) {
  const [ratings, setRatings] = useState<ProductRating[]>(() => {
    const saved = localStorage.getItem("ratings");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  function setRating(productId: string, rating: number) {
    setRatings(prev => {
      const exists = prev.find(r => r.productId === productId);
      if (exists) return prev.map(r => r.productId === productId ? { ...r, rating } : r);
      return [...prev, { productId, rating }];
    });
  }

  function getRating(productId: string) {
    return ratings.find(r => r.productId === productId)?.rating;
  }

  return (
    <RatingContext.Provider value={{ ratings, setRating, getRating }}>
      {children}
    </RatingContext.Provider>
  );
}

export function useRatings() {
  const ctx = useContext(RatingContext);
  if (!ctx) throw new Error("useRatings must be inside RatingProvider");
  return ctx;
}
