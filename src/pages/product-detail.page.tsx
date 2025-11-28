import { useParams } from "react-router-dom";
import { useProduct } from "@/cases/products/hooks/use-product";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { useOrders } from "@/cases/order/hooks/use-order";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ProductDetail } from "@/cases/products/components/product-detail";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const { data: product, isLoading, error } = useProduct(id ?? "");
  useOrders(user?.id);

  if (!id) return <div className="p-6">Produto inválido.</div>;
  if (isLoading) return <div className="p-6">Carregando produto...</div>;
  if (error || !product) return <div className="p-6">Produto não encontrado.</div>;

  return (
    <div className="p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?categoryId=${product.category?.id}`}>
              {product.category?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductDetail product={product} />
    </div>
  );
}
