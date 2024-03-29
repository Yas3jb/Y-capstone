import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Shop</Link>{" "}
          </li>
          <li>
            <Link to="/register">Register</Link>{" "}
          </li>
          <li>
            <Link to="/login">Login</Link>{" "}
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
      </nav>
    </>
  );
}
