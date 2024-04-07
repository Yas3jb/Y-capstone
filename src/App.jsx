// Import useState
import { useState } from "react";
// Import Routes and Route
import { Routes, Route } from "react-router-dom";
// Import Components
import Products from "./Components/Products/Products";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Components/Cart/Cart";
import { CartContextProvider } from "./Components/Context/CartContextProvider";
import Footer from "./Components/Footer/Footer";
import SingleCategory from "./Components/SingleCategory/SingleCategory";
import Success from "./Components/Success/Success";
import Cancel from "./Components/Cancel/Cancel";

function App() {
  // State variable to store authentication token
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Render Components
  return (
    <div>
      <CartContextProvider>
        <Navbar token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/register" element={<Register token={setToken} />} />
          <Route
            path="/login"
            element={<Login setToken={setToken} token={token} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories/:name" element={<SingleCategory />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
        <Footer />
      </CartContextProvider>
    </div>
  );
}

export default App;
