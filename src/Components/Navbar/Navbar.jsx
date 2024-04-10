/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useContext } from "react";
import { CartContext } from "../Context/CartContextProvider.jsx";
import logo from "../Images/logo2.png";

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
    <header className="bg-white text-slate-950 py-4 px-8 flex justify-between items-center fixed top-0 left-0 w-full z-10 shadow-md">
      <Link to="/" className="flex items-center">
        <img className="h-16 mr-4" src={logo} alt="" />
      </Link>

      <div className="flex items-center space-x-4 text-lg">
        {/* Conditional rendering based on token */}
        {token ? (
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-yellow-300 transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-slate-500 text-2xl hover:text-yellow-300 transition-all duration-300"
          >
            <MdOutlineAccountCircle />
          </Link>
        )}
        <Link
          to="/cart"
          className="text-slate-500 text-2xl hover:text-yellow-300 relative transition-all duration-300"
        >
          <IoCartOutline />
          {/* Display cart count */}
          <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center absolute -top-3 -right-3">
            {cartCount}
          </span>
        </Link>
      </div>
    </header>
  );
}
