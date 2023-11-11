import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Contact, Login, Register, Reset } from "./pages";
import { Header, Footer } from "./components";
import { ToastContainer, Zoom } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          theme="light"
          transition={Zoom}
          style={{ fontSize: "20px" }}
        />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
