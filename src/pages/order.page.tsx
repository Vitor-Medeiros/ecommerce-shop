import { useOrders } from "@/cases/order/hooks/use-order";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { FormattedNumber, IntlProvider } from "react-intl";

export function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-sm text-zinc-500 hover:text-zinc-900 transition">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-semibold text-zinc-900">
                Meus Pedidos
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-4xl font-extrabold text-zinc-900 mb-8">Pedidos Finalizados</h1>

        {orders.length === 0 ? (
          <p className="text-center text-zinc-500 text-lg py-20">
            Você ainda não realizou nenhum pedido.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="bg-white shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Pedido #{order.id} - {new Date(order.date).toLocaleDateString("pt-BR")}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center border-b border-zinc-200 py-2">
                      <span className="text-sm font-medium">{item.product.name} x {item.quantity}</span>
                      <span className="text-sm font-semibold text-blue-600">
                        <IntlProvider locale="pt-BR">
                          <FormattedNumber value={item.product.price * item.quantity} style="currency" currency="BRL" />
                        </IntlProvider>
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between mt-2 text-sm font-semibold">
                    <span>Frete:</span>
                    <span>
                      <IntlProvider locale="pt-BR">
                        <FormattedNumber value={order.shipping} style="currency" currency="BRL" />
                      </IntlProvider>
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold mt-1">
                    <span>Total:</span>
                    <span>
                      <IntlProvider locale="pt-BR">
                        <FormattedNumber value={order.total} style="currency" currency="BRL" />
                      </IntlProvider>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
