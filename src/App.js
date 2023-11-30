import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
import { Header, Footer } from "./components";
import { ToastContainer, Zoom } from "react-toastify";
import AdminOnlyRoute from "./components/adminroute/adminOnlyRoute";
import ProductDetails from "./components/products/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistroy from "./pages/orderhistory/orderHistroy";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProduct from "./components/ReviewProduct/ReviewProduct";
import NotFound from "./pages/notFound/NotFound";


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          theme="light"
          transition={Zoom}
          autoClose="2000"
          style={{ fontSize: "20px" }}
        />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistroy />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review/:id" element={<ReviewProduct />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
