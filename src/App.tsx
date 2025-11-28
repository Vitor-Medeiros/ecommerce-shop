import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./cases/search/contexts/search-context";
import { CartContextProvider } from "./cases/cart/contexts/cart-context";
import { OrderProvider } from "@/cases/order/contexts/order-context";

import { Layout } from "./components/layout/layout";

import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page";
import { SignUpPage } from "./pages/signup-page";
import { SignInPage } from "./pages/signin-page";
import { CartPage } from "./pages/cart.page";

import { PrivateRoute } from "./components/routes/private-router";
import { AuthContextProvide } from "./cases/auth/contexts/auth.context";
import { OrdersPage } from "./pages/orders.page";
import { FavoriteProvider } from "./cases/favorites/contexts/favorite-context";
import FavoritesPage from "./pages/favorites.page";
import { RatingProvider } from "./cases/ratings/contexts/rating-context";






function App() {
  return (
    <AuthContextProvide>
      <RatingProvider>
      <FavoriteProvider>
        <SearchProvider>
          <CartContextProvider>
            <OrderProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<ProductListPage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/category/:id" element={<ProductListPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/orders" element={<PrivateRoute> <OrdersPage /> </PrivateRoute>} />
                  <Route path="/favorites" element={<PrivateRoute> <FavoritesPage /> </PrivateRoute>} />
                  
                </Routes>
              </Layout>
            </OrderProvider>
          </CartContextProvider>
        </SearchProvider>
      </FavoriteProvider>
      </RatingProvider>
    </AuthContextProvide>
  );
}

export default App;
