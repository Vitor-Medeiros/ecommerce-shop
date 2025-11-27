import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./cases/search/contexts/search-context";
import { CartContextProvider } from "./cases/cart/contexts/cart-context";
import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page";
import { SignUpPage } from "./pages/signup-page";
import { SignInPage } from "./pages/signin-page";
import { CartPage } from "./pages/cart.page";
import { Layout } from "./components/layout/layout";

import { OrderProvider } from "@/cases/order/contexts/order-context";
import { OrdersPage } from "./pages/ordder.page";

function App() {
  return (
    <SearchProvider>
      <CartContextProvider>
        <OrderProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/category/:id" element={<ProductListPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </Layout>
        </OrderProvider>
      </CartContextProvider>
    </SearchProvider>
  );
}

export default App;

