import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import type { ProductDTO } from "../dtos/product.dto";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: ProductDTO;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;
  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    if (product.photos && product.photos.length > 0) {
      const fullURL = bucketBaseURL+product.photos[0].path;
      setImagePath(fullURL);
    }
  }, [product]);
  
  function handleAddToCart() {
    const id = product.id ?? `${product.name}-${Date.now()}`;
    const price = Number(product.price ?? 0);
    const imageURL = imagePath || (product.photos?.[0]?.path ? bucketBaseURL + product.photos[0].path : "");
    addToCart({
      id,
      name: product.name,
      price,
      image: imageURL,
      quantity: 1,
    });
  }
  
  return (
  <Card className="w-3xs flex flex-col justify-between rounded-xl shadow hover:shadow-lg transition-shadow bg-white">
    
    <CardHeader className="p-0 h-[220px] flex items-center justify-center overflow-hidden rounded-t-xl">
      <Link to={`/product/${product.id}`}>
        {imagePath ? (
          <img
            className="w-full h-full object-contain p-2 bg-white"
            src={imagePath}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
            Sem imagem
          </div>
        )}
      </Link>
    </CardHeader>

    <CardContent className="p-4 flex flex-col gap-3">
      
      <Link to={`/product/${product.id}`}>
        <h4 className="text-[15px] font-semibold leading-tight h-10 line-clamp-2">
          {product.name}
        </h4>
      </Link>

      <div className="flex flex-col gap-1">

        <p className="text-sm text-gray-500 line-through">
          <IntlProvider locale="pt-BR">
            <FormattedNumber
              value={product.price * 1.15}
              style="currency"
              currency="BRL"
            />
          </IntlProvider>
        </p>

        <p className="text-sm text-gray-700">
          <IntlProvider locale="pt-BR">
            <FormattedNumber
              value={product.price}
              style="currency"
              currency="BRL"
            />
            {" "}em 10x de{" "}
            <FormattedNumber
              value={product.price / 10}
              style="currency"
              currency="BRL"
            />
          </IntlProvider>
        </p>

        <p className="text-green-600 font-semibold text-[15px]">
          <IntlProvider locale="pt-BR">
            <FormattedNumber
              value={product.price * 0.9}
              style="currency"
              currency="BRL"
            />
          </IntlProvider>
          {" "}no PIX
        </p>
      </div>

      <Button 
        onClick={handleAddToCart} 
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
      >
        Adicionar ao carrinho
      </Button>
    </CardContent>
  </Card>
);

}
