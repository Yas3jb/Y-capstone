import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">SHOP</Link>{" "}
          </li>
          <li>
            <Link to="/register">REGISTER</Link>{" "}
          </li>
          <li>
            <Link to="/login">LOGIN</Link>{" "}
          </li>
          <li>
            <Link to="/products/category/jewelery">jewelery</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
