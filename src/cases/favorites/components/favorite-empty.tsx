import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FavoriteEmpty() {
  const navigate = useNavigate();

  return (
    <>
    <h1 className="text-4xl font-extrabold text-blue-500 mb-8">
          Meus Favoritos
        </h1>

    <div className="flex justify-center items-center min-h-[70vh] bg-zinc-50">
      <Card className="max-w-2xl w-full shadow-xl rounded-3xl overflow-hidden">
        <CardContent className="flex flex-col justify-center items-center py-12 px-6 space-y-6 bg-white">
          
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex justify-center items-center shadow-md animate-bounce">
            <Heart className="w-14 h-14 text-blue-600" />
          </div>

          <h3 className="text-center text-2xl font-bold text-gray-900">
            Nenhum produto favoritado!
          </h3>

          <p className="text-center text-lg text-gray-500 max-w-md">
            Você ainda não adicionou nada aos favoritos. Clique no botão abaixo
            para voltar à loja e salvar os itens que você gosta.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center py-6 bg-white">
          <Button
            variant="outline"
            className="border-blue-500 text-blue-600 hover:border-blue-700 hover:text-blue-700 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Página Inicial
          </Button>
        </CardFooter>
      </Card>
    </div>
    </>
  );
}
