import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import type { ProductDTO } from "../dtos/product.dto";

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
      console.log("Image URL:", fullURL);
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
    <Card className="w-3xs flex flex-col justify-between">
      <CardHeader className="py-0 h-[210px] flex items-center justify-center">
        {imagePath ? (
          <img
            className="cover w-full h-full object-cover rounded-md" src={imagePath}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
            Sem imagem
          </div>
        )}
      </CardHeader>

      <CardContent>
        <h4 className="text-sm font-semibold mb-4 min-h-10">
          {product.name}
        </h4>
        <div className="w-full flex flex-col">
          <p className="text-sm font-light line-through mb-1">
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price * 1.15}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>
          </p>

          <p>
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

          <p>
            ou{" "}
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

        <div className="mt-3">
          <Button onClick={handleAddToCart} className="w-full">
            Adicionar ao carrinho
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
