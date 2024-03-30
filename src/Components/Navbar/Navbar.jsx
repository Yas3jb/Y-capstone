import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  // Hook for navigation
  const navigate = useNavigate();

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
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Shop</Link>{" "}
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
          {token ? "" : <Link to="/register"> Register </Link>}
          {token ? (
            <Link onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/login"> Login </Link>
          )}
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
