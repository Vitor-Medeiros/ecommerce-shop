"use client";

import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, ShoppingCart, User } from "lucide-react";
import { useSearch } from "@/cases/search/contexts/search-context";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { Badge } from "../ui/badge";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { cart } = useCart();
  const { query, setQuery } = useSearch();
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full border-b bg-white shadow-sm z-50 h-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 gap-4 h-full">
        
        <Link to="/" className="flex items-center gap-2">
          <ShoppingBasket className="text-blue-600 w-7 h-7" />
          <h1 className="text-2xl font-bold text-zinc-900 hover:text-blue-600 transition">
            SportsShop
          </h1>
        </Link>

        <div className="flex-1 px-0 md:px-10 w-full max-w-xl">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full h-11 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-200 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-blue-50 hover:text-blue-600 relative transition"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-blue-600 text-white">
                  {cart.items.length}
                </Badge>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-4 py-2 text-zinc-700 font-medium border-b">
                  Olá, {user?.name}
                </div>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  Meus Pedidos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/")}>
                  Favoritos
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                    navigate("/");
                  }}
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/signIn">
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button onClick={() => navigate("/signup")}>Cadastrar</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
