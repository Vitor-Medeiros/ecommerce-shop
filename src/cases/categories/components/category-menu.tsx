import { Button } from "@/components/ui/button";
import { useCategories } from "../hooks/use-category";
import { useEffect, useState } from "react";
import type { CategoryDTO } from "../dtos/category.dto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CategoryMenu() {
  const { data: categories, isLoading } = useCategories();
  const navigate = useNavigate();

  const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
  const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    if (categories) {
      setVisibleItems(categories.slice(0, 6));
      setHiddenItems(categories.slice(6));
    }
  }, [categories]);

  if (isLoading) {
    return (
      <nav className="w-full py-4 flex items-center justify-between">
        <p className="pl-16 text-sm text-gray-500">Carregando categorias...</p>
      </nav>
    );
  }

  return (
    <nav className="w-full py-4 flex items-center justify-between bg-white shadow-sm px-10">
      
      {/* SLOGAN NA BARRA */}
      <div className="flex flex-col">
        <h5 className="font-semibold text-xl text-gray-900">
          Seu esporte começa aqui
        </h5>
        <p className="text-sm text-gray-500">
          Equipando sua paixão pelo esporte
        </p>
      </div>

      {/* CATEGORIAS */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/")}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Todos
        </button>

        {visibleItems.map((category) => (
          <button
            key={category.id}
            onClick={() => navigate(`/category/${category.id}`)}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            {category.name}
          </button>
        ))}

        {hiddenItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                Mais
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {hiddenItems.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => navigate(`/category/${category.id}`)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

    </nav>
  );
}
