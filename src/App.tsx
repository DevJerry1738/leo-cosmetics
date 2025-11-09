import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Expert from "./pages/Expert";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/expert" element={<Expert />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
