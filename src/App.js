import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
import { Header, Footer } from "./components";
import { ToastContainer, Zoom } from "react-toastify";
import AdminOnlyRoute from "./components/adminroute/adminOnlyRoute";

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
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
