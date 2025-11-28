import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/use-cart";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ItemGroup } from "@/components/ui/item";
import { QuantityInput } from "@/components/ui/quantity-input";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { MapPin, Trash2 } from "lucide-react";
import { FormattedNumber, IntlProvider } from "react-intl";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";
import type { OrderDTO, OrderItemDTO } from "@/cases/order/dtos/order.dto";
import { useCreateOrder } from "@/cases/order/hooks/use-order";

export function CartContent() {
  const { cart, removeProductCart, updateProductQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const bucketBaseURL = import.meta.env.VITE_BUCKET_BASE_URL;
  const createOrder = useCreateOrder();
  const { user } = useAuth();

  const [cep, setCep] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [cepError, setCepError] = useState("");
  const [dataCep, setDataCep] = useState<any>(null);

  const fretePorEstado: Record<string, number> = {
    AC: 30, AL: 25, AP: 30, AM: 35, BA: 25, CE: 25, DF: 20, ES: 20, GO: 20,
    MA: 25, MT: 25, MS: 25, MG: 20, PA: 30, PB: 25, PR: 15, PE: 25, PI: 25,
    RJ: 20, RN: 25, RS: 15, RO: 30, RR: 30, SC: 15, SP: 20, SE: 25, TO: 30
  };

  const productsTotal = cart.items.reduce(
    (sum, item) => sum + item.product.price! * item.quantity,
    0
  );
  const totalCard = productsTotal + shippingCost;
  const totalPix = totalCard * 0.9;

  async function calcularFrete() {
    const cepNumbers = cep.replace(/\D/g, "");

    if (!/^[0-9]{8}$/.test(cepNumbers)) {
      setCepError("Digite um CEP válido (8 números).");
      setShippingCost(0);
      setDataCep(null);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado.");
        setShippingCost(0);
        setDataCep(null);
        return;
      }

      const frete = fretePorEstado[data.uf] ?? 25;
      setShippingCost(frete);
      setCepError("");
      setDataCep(data);
    } catch {
      setCepError("Erro ao consultar o CEP.");
      setShippingCost(0);
      setDataCep(null);
    }
  }

  async function handleCreateOrder() {
    if (!user) {
      navigate("/signin?redirect=/cart");
      return;
    }

    if (!cep || shippingCost === 0) {
      setCepError("Calcule o frete antes de finalizar o pedido.");
      return;
    }

    const customer: CustomerDTO = { id: user.id, name: user.name };

    const items: OrderItemDTO[] = cart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      value: item.product.price!,
    }));

    const order: OrderDTO = {
      customer,
      status: "NEW",
      items,
      shippingCost,
    };

    createOrder.mutate(order, {
      onSuccess: () => {
        clearCart();
        navigate("/orders");
      },
    });
  }

  return (
    <IntlProvider locale="pt-BR">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-zinc-900">Produtos Adicionados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ItemGroup className="flex flex-col gap-4">
              {cart.items.map((item) => {
                const subtotal = item.product.price! * item.quantity;
                return (
                  <div key={item.product.id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl shadow-sm">
                    <div className="flex items-start gap-4 flex-1">
                      {item.product?.photos?.[0] && (
                        <img src={`${bucketBaseURL}${item.product.photos[0].path}`} className="w-20 h-20 object-cover rounded-lg shadow" alt={item.product.name} />
                      )}
                      <div className="flex flex-col">
                        <span className="text-base font-semibold line-clamp-1">{item.product.name}</span>
                        {item.product.brand && <span className="text-xs text-muted-foreground">{item.product.brand.name}</span>}
                        <span className="mt-2 text-sm font-semibold text-blue-600">
                          <FormattedNumber value={item.product.price!} style="currency" currency="BRL" /> <span className="text-xs text-gray-500">unidade</span>
                        </span>
                        <span className="mt-1 text-sm font-bold text-gray-700">
                          <FormattedNumber value={subtotal} style="currency" currency="BRL" /> <span className="text-xs text-muted-foreground">(subtotal)</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <QuantityInput initialQuantity={item.quantity} onChange={(value) => updateProductQuantity(item.product.id!, value)} />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button onClick={() => removeProductCart(item.product.id!)} className="p-2 rounded-md hover:bg-red-100 transition">
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

              {cepError && <p className="text-xs text-red-500 mt-1">{cepError}</p>}

              {shippingCost > 0 && (
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Frete calculado para o CEP <span className="font-semibold">{cep}</span></p>
                  {dataCep && (
                    <div className="text-gray-400">
                      <p>{dataCep.logradouro}</p>
                      <p>{dataCep.bairro}</p>
                      <p>{dataCep.localidade} - {dataCep.uf}</p>
                    </div>
                  )}
                </div>
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
                <strong><FormattedNumber value={shippingCost} style="currency" currency="BRL" /></strong>
              </div>
              <div className="flex justify-between text-sm">
                <span>Produtos:</span>
                <strong><FormattedNumber value={productsTotal} style="currency" currency="BRL" /></strong>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total no PIX:</span>
                  <span className="text-green-600"><FormattedNumber value={totalPix} style="currency" currency="BRL" /></span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Total no Cartão:</span>
                  <span><FormattedNumber value={totalCard} style="currency" currency="BRL" /></span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-sm font-semibold" onClick={handleCreateOrder}>
                Finalizar Pedido
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </IntlProvider>
  );
}
