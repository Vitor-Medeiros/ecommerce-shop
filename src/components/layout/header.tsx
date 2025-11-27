import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, ShoppingCart, User } from "lucide-react";
import { useSearch } from "@/cases/search/contexts/search-context";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { Badge } from "../ui/badge";

export function Header() {
  const { cart } = useCart();
  const { query, setQuery } = useSearch();

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

          <Link to="/signIn">
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
