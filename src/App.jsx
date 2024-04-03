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

function App() {
  // State variable to store authentication token
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  // State variable to store the selected category
  const [category, setCategory] = useState("");

  // Render Components
  return (
    <div>
      <CartContextProvider>
        <Navbar token={token} setToken={setToken} setCategory={setCategory} />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products category={category} />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/register" element={<Register token={setToken} />} />
          <Route
            path="/login"
            element={<Login setToken={setToken} token={token} />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </CartContextProvider>
    </div>
  );
}

export default App;
