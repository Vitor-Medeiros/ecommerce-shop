import { useState } from "react";
import type { ProductDTO } from "../dtos/product.dto";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormattedNumber, IntlProvider } from "react-intl";
import { useCart } from "@/contexts/cart-context";

type ProductDetailProps = {
  product: ProductDTO;
};
export function ProductDetail({ 
    product 
}: ProductDetailProps) {
    const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;
      const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

      const photos = product.photos || [];
      const mainPhoto = photos[selectedPhoto];
      const mainImagePhoto = mainPhoto 
        ? `${bucketBaseURL}${mainPhoto.path}`
        : `https://placehold.co/300x300?text=Sem+Imagem&font-roboto`

    const cart = useCart();

function handleAddToCart() {
    if (!product || !product.id) return;
    cart.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: (product as any).image ?? "",
      quantity: 1,
    });
  }

   
        return (
  <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 py-6">

    
    <h1 className="text-3xl md:text-4xl font-semibold">{product.name}</h1>

    
    <div className="flex flex-col md:flex-row gap-12">

      
      <div className="flex flex-col items-center gap-4 w-full md:w-1/2">

        <div className="w-full h-[420px] bg-white rounded-xl shadow-md flex items-center justify-center p-4">
          <img
            src={mainImagePhoto}
            className="max-h-full max-w-full object-contain"
          />
        </div>

       
        {photos.length > 1 && (
          <ul className="flex gap-3 overflow-x-auto pb-2">
            {photos.map((photo, index) => (
              <li key={photo.id}>
                <button
                  className={cn(
                    "w-20 h-20 rounded-lg border shadow-sm overflow-hidden hover:ring-2 hover:ring-blue-400",
                    index === selectedPhoto
                      ? "border-blue-500 ring-2 ring-blue-400"
                      : "border-gray-300"
                  )}
                  onClick={() => setSelectedPhoto(index)}
                >
                  <img
                    src={`${bucketBaseURL}${photo.path}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

   
      <div className="flex flex-col gap-6 w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6">

        <p className="text-gray-500 line-through text-lg">
          <IntlProvider locale="pt-BR">
            <FormattedNumber
              value={product.price * 1.15}
              style="currency"
              currency="BRL"
            />
          </IntlProvider>
        </p>

        <p className="text-2xl font-bold text-green-600">
          <span className="bg-green-100 px-3 py-1 rounded-lg">
            {`${Math.floor((1 - (product.price * 0.9) / (product.price * 1.15)) * 100)}% OFF no Pix`}
          </span>
        </p>

        <p className="text-lg">
          <span className="text-4xl font-bold text-blue-600">
            <IntlProvider locale="pt-BR">
              <FormattedNumber
                value={product.price * 0.9}
                style="currency"
                currency="BRL"
              />
            </IntlProvider>
          </span>{" "}
          <span className="text-gray-700">no Pix</span>
        </p>

        <div className="font-light mb-4 text-gray-700">
    <IntlProvider locale="pt-BR">
    <p>
      ou{" "}
      <FormattedNumber
        value={product.price}
        style="currency"
        currency="BRL"
      />{" "}
      em 10x
    </p>

    <p>
      de{" "}
      <FormattedNumber
        value={product.price / 10}
        style="currency"
        currency="BRL"
      />{" "}
      sem juros
    </p>
  </IntlProvider>
</div>

        <Button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 rounded-xl shadow-md"
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
    
    <div className="bg-white shadow-md rounded-xl p-6 mt-4">
      <h2 className="text-xl font-semibold mb-2">Descrição</h2>
      <p className="text-gray-700 leading-relaxed">{product.description}</p>
    </div>

  </div>
);

}