import { CartContent } from "@/cases/cart/components/cart-content";
import { CartEmpty } from "@/cases/cart/components/cart-empty";
import { useCart } from "@/cases/cart/hooks/use-cart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function CartPage() {
  const { cart } = useCart();

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
                Carrinho de Compras
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-4xl font-extrabold text-blue-500 mb-8">
          Meu Carrinho
        </h1>

       
          {cart.items.length > 0 ? (
            <CartContent />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <CartEmpty />
              <p className="mt-6 text-zinc-500">
                Seu carrinho está vazio. Que tal adicionar alguns produtos?
              </p>
            </div>
          )}
        
      </div>
    </div>
  );
}
