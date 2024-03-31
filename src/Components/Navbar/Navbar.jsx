/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../Image/logo.png";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useContext } from "react";
import { CartContext } from "../Context/CartContextProvider";
import { useState, useEffect } from "react";
import { fetchCategories } from "../../API/api.js";

export default function Navbar({ token, setToken, setCategory }) {
  // Hook for navigation
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);
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
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <header>
      <img className="logo" src={logo} alt="Image not found" />
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">All</Link>{" "}
          </li>
          {/* Display categories */}
          {categories.map((category, i) => (
            <li key={i}>
              {/* Use Link for navigation to category */}
              <Link
                onClick={() => setCategory(category)}
                to={`/products?category=${category}`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {/* Conditional rendering based on token */}
        {token ? (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <MdOutlineAccountCircle />
          </Link>
        )}
        <Link to="/cart">
          <IoCartOutline />
        </Link>
        {/* Display cart count */}
        <div className="nav-cart-count">{cartCount}</div>
      </div>
    </header>
  );
}
