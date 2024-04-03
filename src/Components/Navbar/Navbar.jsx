/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContextProvider";
import { fetchCategories } from "../../API/api.js";

export default function Navbar({ token, setToken, setCategory }) {
  // Hook for navigation
  const navigate = useNavigate();
  const { cartCount, resetCart } = useContext(CartContext);
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    fetchCategories()
      .then((categories) => {
        // Update the 'categories' state variable
        setCategories(categories);
      })
      .catch((err) => {
        console.error("Error fetching Categories:", err);
      });
  }, []);

  // Function to handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    // Clear authentication state or tokens
    localStorage.removeItem("token");
    setToken(null);
    resetCart();
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">E-Shop</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-500">
              ALL
            </Link>{" "}
          </li>
          {/* Display categories */}
          {categories.map((category, i) => (
            <li key={i}>
              {/* Use Link for navigation to category */}
              <Link
                onClick={() => setCategory(category)}
                to={`/products?category=${category}`}
                className="hover:text-blue-500"
              >
                {category.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        {/* Conditional rendering based on token */}
        {token ? (
          <button
            onClick={handleLogout}
            className="text-white hover:text-blue-500"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-white hover:text-blue-500">
            <MdOutlineAccountCircle />
          </Link>
        )}
        <Link to="/cart" className="text-white hover:text-blue-500">
          <IoCartOutline />
        </Link>
        {/* Display cart count */}
        <span className="text-white">{cartCount}</span>
      </div>
    </header>
  );
}
