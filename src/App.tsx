import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/search-context";
import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page"; 
import { CartPage } from "./pages/cart.page";
import { Header } from "./components/layout/header";
import { CartProvider } from "./contexts/cart-context";


function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <>
          <Header />

          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} /> {}
          </Routes>
        </>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;