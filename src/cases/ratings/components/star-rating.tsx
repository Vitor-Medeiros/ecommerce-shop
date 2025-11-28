import { useEffect, useState } from "react";
import { useRatings } from "../contexts/rating-context";

interface StarRatingProps {
  productId: string;
  canRate: boolean;
}

export function StarRating({ productId, canRate }: StarRatingProps) {
  const { setRating, getRating } = useRatings();
  const [hover, setHover] = useState<number>(0);
  const [rating, setLocalRating] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(`rating-${productId}`);
    if (saved) {
      setLocalRating(Number(saved));
      setRating(productId, Number(saved));
    } else {
      const current = getRating(productId);
      if (current) setLocalRating(current);
    }
  }, [productId]);

  const handleClick = (value: number) => {
    if (!canRate) return;
    setLocalRating(value);
    setRating(productId, value);
    localStorage.setItem(`rating-${productId}`, String(value));
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleClick(star)}
          className={`text-2xl ${
            star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
