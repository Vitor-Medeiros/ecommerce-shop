import { CategoryMenu } from "@/cases/categories/components/category-menu"
import { ProductCard } from "@/cases/products/components/product-card"
import { useProducts } from "@/cases/products/hooks/use-product"
import { useSearch } from "@/cases/search/contexts/search-context"
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar"
import { useParams } from "react-router-dom"

export function ProductListPage() {
  const { data: products, isLoading } = useProducts()
  const { query } = useSearch()
  const { id: categoryId } = useParams<{ id: string }>()

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 text-center">
        Carregando produtos...
      </div>
    );
  }
  const filteredProducts = products
    ?.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.description?.toLowerCase() ?? "").includes(query.toLowerCase())
    )
    .filter((p) => (categoryId ? String(p.category?.id) === String(categoryId) : true));

  return (
      <>
      <div className="pt-16">
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar className="hidden md:block w-64 fixed top-16 left-0 bottom-0 bg-white shadow-md z-10">
              <SidebarContent className="flex flex-col p-4 gap-2 h-full overflow-y-auto">
                  <CategoryMenu />
              </SidebarContent>
            </Sidebar>

          </div>
            
          <section className="container mx-auto py-10">

            <h1 className="text-4xl font-extrabold text-blue-500 mb-8">
              Catálogo de Produtos
            </h1>

            <div
              className="grid gap-10"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600">
                  Nenhum produto encontrado.
                </p>
              )}
            </div>
          </section>
        </SidebarProvider>
      </div>
    </>
  )
}
