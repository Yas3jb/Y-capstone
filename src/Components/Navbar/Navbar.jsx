import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../Image/logo.png";
import { IoCartOutline } from "react-icons/io5";
import { useContext } from "react";
import { CartContext } from "../Context/CartContextProvider";

export default function Navbar({ token, setToken }) {
  // Hook for navigation
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);

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
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/">All</Link>{" "}
        </li>
        <li>
          <Link to="/products/category/jewelery">Jewelery</Link>
        </li>
        <li>
          <Link to="/products/category/electronics">Electronics</Link>
        </li>
        <li>
          <Link to="/products/category/mens%20clothing">Men</Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button>
            <Link to="/login"> Login </Link>
          </button>
        )}
        <Link to="/cart">
          <IoCartOutline />
        </Link>
        <div className="nav-cart-count">{cartCount}</div>
      </div>
    </div>
  );
}
