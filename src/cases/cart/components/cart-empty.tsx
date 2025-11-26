import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartEmpty() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="max-w-2xl">
        <CardContent className="flex flex-col justify-center items-center py-8 space-y-4">
          <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex justify-center items-center">
            <ShoppingCart className="w-12 h-12 text-blue-500" />
          </div>

          <h3 className="text-center text-xl font-semibold">
            Seu carrinho está vazio!
          </h3>

          <p className="text-center text-lg text-gray-500">
            Clique no botão abaixo para voltar à página inicial.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center py-8">
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700"
            onClick={() => navigate("/")}
          >
            Página Inicial
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
