import { useParams } from "react-router-dom";
import { useProduct } from "@/cases/products/hooks/use-product";

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
  
  if (!id) {
    return <div className="p-6">Produto inválido.</div>;
  }
  const { data: product, isLoading, error } = useProduct(id);
  if (isLoading) {
    return <div className="p-6">Carregando produto...</div>;
  }

  if (error || !product) {
    return <div className="p-6">Produto não encontrado.</div>;
  }

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
      
      <div >
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
