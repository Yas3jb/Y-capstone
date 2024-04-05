/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useContext } from "react";
import { CartContext } from "../Context/CartContextProvider";

export default function Navbar({ token, setToken }) {
  // Hook for navigation
  const navigate = useNavigate();
  const { cartCount, resetCart } = useContext(CartContext);

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
    <header className="bg-whtie text-slate-950 py-4 px-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold">E-Shop</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-violet-600">
              ALL
            </Link>{" "}
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        {/* Conditional rendering based on token */}
        {token ? (
          <button
            onClick={handleLogout}
            className="text-slate-950 hover:text-violet-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-slate-950 text-lg hover:text-violet-600"
          >
            <MdOutlineAccountCircle />
          </Link>
        )}
        <Link
          to="/cart"
          className="text-slate-950 text-lg hover:text-violet-600"
        >
          <IoCartOutline />
        </Link>
        {/* Display cart count */}
        <span className="text-slate-950 ">{cartCount}</span>
      </div>
    </header>
  );
}
