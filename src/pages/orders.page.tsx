import { useEffect } from "react";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { OrderContent } from "@/cases/order/components/order-content";
import { useOrders } from "@/cases/order/hooks/use-order";


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { OrdersEmpty } from "@/cases/order/components/order-empty";

export function OrdersPage() {
  const { user } = useAuth();
  const { data: orders, isLoading } = useOrders(user?.id);

  useEffect(() => {
    if (!isLoading && orders) {
      const purchasedProductIds = orders.flatMap(order =>
        order.items.map(item => item.product.id)
      );
      const uniqueIds = [...new Set(purchasedProductIds)];
      localStorage.setItem("purchasedProducts", JSON.stringify(uniqueIds));
    }
  }, [isLoading, orders]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-sm text-zinc-500 hover:text-zinc-900 transition"
              >
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

        <h1 className="text-4xl font-extrabold text-blue-500 mb-8">
          Meus Pedidos
        </h1>

        {isLoading ? (
          <p className="text-center text-lg text-gray-500">Carregando pedidos...</p>
        ) : orders && orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="mb-6">
              <OrderContent order={order} />
            </div>
          ))
        ) : (
          <OrdersEmpty />
        )}

      </div>
    </div>
  );
}
