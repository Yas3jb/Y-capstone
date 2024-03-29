// Import Components
import { Routes, Route } from "react-router-dom";
import Products from "./Components/Products/Products";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Jewelery from "./Components/Jewelery/Jewelery";
import Electronics from "./Components/Electronics/Electronics";
import Men from "./Components/Men/Men";

function App() {
  // Render Components
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/category/jewelery" element={<Jewelery />} />
        <Route
          path="/products/category/electronics"
          element={<Electronics />}
        />
        <Route path="/products/category/mens%20clothing" element={<Men />} />
      </Routes>
    </>
  );
}

export default App;
