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
import Jewelery from "./Components/Jewelery/Jewelery";
import Electronics from "./Components/Electronics/Electronics";
import Men from "./Components/Men/Men";
import Cart from "./Components/Cart/Cart";
import { CartContextProvider } from "./Components/Context/CartContextProvider";

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
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/register" element={<Register token={setToken} />} />
          <Route
            path="/login"
            element={<Login settoken={setToken} token={token} />}
          />
          <Route path="/products/category/jewelery" element={<Jewelery />} />
          <Route
            path="/products/category/electronics"
            element={<Electronics />}
          />
          <Route path="/products/category/mens%20clothing" element={<Men />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartContextProvider>
    </div>
  );
}

export default App;
