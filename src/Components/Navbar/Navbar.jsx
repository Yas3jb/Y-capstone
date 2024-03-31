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
      <div>
        <ul className="nav-links">
          <li className="test">
            <Link to="/">ALL</Link>{" "}
          </li>
          {/* Display categories */}
          {categories.map((category, i) => (
            <li key={i}>
              {/* Use Link for navigation to category */}
              <Link
                onClick={() => setCategory(category)}
                to={`/products?category=${category}`}
              >
                {category.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="icons-container">
        {/* Conditional rendering based on token */}
        {token ? (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <li>
            <Link to="/login">
              <MdOutlineAccountCircle />
            </Link>
          </li>
        )}
        <li>
          <Link to="/cart">
            <IoCartOutline />
          </Link>
        </li>

        {/* Display cart count */}
        <li className="nav-cart-count">{cartCount}</li>
      </div>
    </header>
  );
}
