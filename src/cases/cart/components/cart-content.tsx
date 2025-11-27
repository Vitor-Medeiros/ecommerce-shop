import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "../hooks/use-cart";
import { ItemGroup } from "@/components/ui/item";
import { FormattedNumber, IntlProvider } from "react-intl";

import { Button } from "@/components/ui/button";
import { MapPin, Trash2 } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { QuantityInput } from "@/components/ui/quantity-input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useState } from "react";

export function CartContent() {
  const { cart, removeProductCart, updateProductQuantity } = useCart();
  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;

  const [cep, setCep] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  const productsTotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCard = productsTotal + shippingCost;
  const totalPix = totalCard * 0.9;

  function calcularFrete() {
    if (cep.length !== 8) {
      alert("Digite um CEP válido.");
      return;
    }
    setShippingCost(cep.startsWith("85") ? 15 : 25);
  }

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-white shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-zinc-900">Produtos Adicionad</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <ItemGroup className="flex flex-col gap-4">
            {cart.items.map((item) => {
              const subtotal = item.product.price * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl shadow-sm"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {item.product?.photos?.[0] && (
                      <img
                        src={`${bucketBaseURL}${item.product.photos[0].path}`}
                        className="w-20 h-20 object-cover rounded-lg shadow"
                        alt={item.product.name}
                      />
                    )}

                    <div className="flex flex-col">
                      <span className="text-base font-semibold line-clamp-1">
                        {item.product.name}
                      </span>
                      {item.product.brand && (
                        <span className="text-xs text-muted-foreground">{item.product.brand.name}</span>
                      )}
                      <span className="mt-2 text-sm font-semibold text-blue-600">
                        <IntlProvider locale="pt-BR">
                          <FormattedNumber value={item.product.price} style="currency" currency="BRL" />
                        </IntlProvider>{" "}
                        <span className="text-xs text-gray-500">unidade</span>
                      </span>
                      <span className="mt-1 text-sm font-bold text-gray-700">
                        <IntlProvider locale="pt-BR">
                          <FormattedNumber value={subtotal} style="currency" currency="BRL" />
                        </IntlProvider>{" "}
                        <span className="text-xs text-muted-foreground">(subtotal)</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <QuantityInput
                      initialQuantity={item.quantity}
                      onChange={(value) => updateProductQuantity(item.product.id!, value)}
                    />

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => removeProductCart(item.product.id!)}
                          className="p-2 rounded-md hover:bg-red-100 transition"
                        >
                          <Trash2 className="text-red-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Remover item</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </ItemGroup>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Calcular Frete</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <InputGroup>
              <InputGroupInput
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
              />
              <InputGroupAddon>
                <MapPin className="text-blue-500" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Button variant="ghost" size="sm" className="hover:text-blue-600" onClick={calcularFrete}>
                  Calcular
                </Button>
              </InputGroupAddon>
            </InputGroup>

            {shippingCost > 0 && (
              <p className="text-xs text-muted-foreground">
                Frete calculado para o CEP <span className="font-semibold">{cep}</span>
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Resumo do Pedido</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Frete:</span>
              <strong>
                <IntlProvider locale="pt-BR">
                  <FormattedNumber value={shippingCost} style="currency" currency="BRL" />
                </IntlProvider>
              </strong>
            </div>

            <div className="flex justify-between text-sm">
              <span>Produtos:</span>
              <strong>
                <IntlProvider locale="pt-BR">
                  <FormattedNumber value={productsTotal} style="currency" currency="BRL" />
                </IntlProvider>
              </strong>
            </div>

            <div className="pt-2 border-t">
              <div className="flex justify-between text-sm font-semibold">
                <span>Total no PIX:</span>
                <span className="text-green-600">
                  <IntlProvider locale="pt-BR">
                    <FormattedNumber value={totalPix} style="currency" currency="BRL" />
                  </IntlProvider>
                </span>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Total no Cartão:</span>
                <span>
                  <IntlProvider locale="pt-BR">
                    <FormattedNumber value={totalCard} style="currency" currency="BRL" />
                  </IntlProvider>
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-sm font-semibold">
              Finalizar Pedido
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
