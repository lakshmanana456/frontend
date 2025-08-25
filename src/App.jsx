import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Footer from "./components/Footer";
import OrderSummary from "./components/OrderSummary";
import OrderHistory from "./components/OrderHistory";
import ContactUs from "./components/Contactus";
// import ContactUs from "./components/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
