/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { fetchProducts } from "../../API/api.js";
import { CartContext } from "../Context/CartContextProvider.jsx";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import { FaEye } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Banner from "../Banner/Banner.jsx";

export default function Products({ category }) {
  // State variable
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  // Effect hook to fetch products
  useEffect(() => {
    fetchProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Function to truncate the description to 100 characters
  const truncateDescription = (description) => {
    return description.length > 50
      ? description.substring(0, 50) + "..."
      : description;
  };

  // Function to filter products based on category
  const filterProducts = (product) => {
    if (category) {
      return product.category === category;
    }
    return true;
  };

  // Function to sort
  const sortProductsByName = (a, b) => {
    const opt1 = String(a[sort]).toLowerCase(); // Fixed typo: changed 'string' to 'String'
    const opt2 = String(b[sort]).toLowerCase(); // Fixed typo: changed 'string' to 'String'
    if (opt1 < opt2) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (opt1 > opt2) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    const message = `${product.title} has been added to the cart!`;
    setNotification(message);
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification();
    }, 3000);
  };

  return (
    <>
      {notification && <p className="notification">{notification}</p>}
      <Banner />
      <div className="header-text">
        <h2 className="view-products-text">
          View All {category ? category : "Products"}
        </h2>
      </div>
      <div className="sort-options">
        <label htmlFor="sort">Sort by:</label>
        <select value={sort} onChange={handleSortChange}>
          <option value="title">Title</option>
        </select>
        <button className="sort" onClick={handleOrderChange}>
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
      <div className="product-container">
        <div className="product-list">
          {products
            .filter(filterProducts)
            .sort(sortProductsByName)
            .map((product) => (
              <div key={product.id} className="product-card">
                <img
                  className="product-image"
                  src={product.image}
                  alt="Not found"
                />
                <div className="product-content">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-desc">
                    {truncateDescription(product.description)}
                  </p>
                  <div className="product-price">
                    <h4> $ {product.price}</h4>
                  </div>
                </div>
                <div className="btn-container">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="add-button"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="view-button"
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
