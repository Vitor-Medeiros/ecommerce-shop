import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { useCheckout } from "@/cases/checkout/hooks/use-checkout";



export function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const { mutate, isPending } = useCheckout();

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  function handleCheckout() {
    const payload = {
      items: cart.items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity
      }))
    };

    mutate(payload, {
      onSuccess: () => {
        clearCart();
        navigate("/success");
      }
    });
  }

  return (
    <div className="flex justify-center items-start min-h-[70vh] p-4">
      <Card className="w-full max-w-2xl shadow-lg border border-zinc-200">
        <CardHeader>
          <h1 className="text-xl font-semibold text-zinc-800">Checkout</h1>
          <p className="text-sm text-zinc-500">Revise seus dados antes de finalizar</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-zinc-700">Seus dados</h2>
            <p className="text-sm text-zinc-600">{user?.name}</p>
            <p className="text-sm text-zinc-600">{user?.email}</p>
          </section>

          <Separator />

          <section>
            <h2 className="text-lg font-semibold text-zinc-700">Produtos</h2>

            <ul className="space-y-3 mt-3">
              {cart.items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex justify-between items-center border p-3 rounded-lg bg-zinc-50"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-xs text-zinc-500">
                      {item.quantity} x R$ {item.product.price.toFixed(2)}
                    </span>
                  </div>

                  <span className="font-semibold">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          <section className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </section>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleCheckout}
            disabled={isPending}
          >
            {isPending ? "Finalizando pedido..." : "Finalizar Compra"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
