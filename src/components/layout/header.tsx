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
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 gap-4">
        <Link to="/" >
          <ShoppingBasket className="text-blue-500"/>
          <h1 className="text-2xl font-bold">MaterShop Sports</h1>
        </Link>

        <div className="flex-1 px-10">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full h-11 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button 
            variant="outline" 
            size="icon"
            className="hover:text-blue-500 relative"  >
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-blue-500 text-white">
                    {cart.items.length}
                </Badge>
              )}

            </Button>
          </Link>

          <Link to="/signIn">
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}