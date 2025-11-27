"use client"

import { useCategories } from "@/cases/categories/hooks/use-category";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CategoryMenu() {
  const { data: categories, isLoading } = useCategories();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 z-10">
      <div className="h-full overflow-auto p-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Categorias</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigate("/")}
            >
              Todos
            </Button>

            {!isLoading &&
              categories?.map((cat) => (
                <Button
                  key={cat.id}
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => navigate(`/category/${cat.id}`)}
                >
                  {cat.name}
                </Button>
              ))}
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
