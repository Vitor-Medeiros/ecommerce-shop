import { useCategories } from "@/cases/categories/hooks/use-category";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryMenu() {
  const { data: categories, isLoading } = useCategories();
  const navigate = useNavigate();
  const location = useLocation();
  const activeCategoryId = location.pathname.split("/category/")[1];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 z-10 hidden md:block">
      <div className="h-full overflow-y-auto p-2 scroll-smooth">
        <Card className="shadow-md flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Categorias</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2 flex-1">
            <Button
              variant="ghost"
              size="sm"
              className={`justify-start ${
                !activeCategoryId ? "bg-blue-100 text-blue-500 hover:bg-blue-200" : ""
              }`}
              onClick={() => navigate("/")}
            >
              Todos
            </Button>

            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full rounded-md" />
              ))}

            {!isLoading &&
              categories?.map((cat) => {
                const isActive = activeCategoryId === cat.id;

                return (
                  <Button
                    key={cat.id}
                    variant="ghost"
                    size="sm"
                    className={`justify-start ${
                      isActive ? "bg-blue-100 text-blue-500 hover:bg-blue-200" : ""
                    }`}
                    onClick={() => navigate(`/category/${cat.id}`)}
                  >
                    {cat.name}
                  </Button>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
