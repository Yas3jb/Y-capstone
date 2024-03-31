/* eslint-disable react/prop-types */
// Import useState, useEffect, and useContext
import { useState, useEffect, useContext } from "react";
// Import fetchProducts function
import { fetchProducts } from "../../API/api.js";
// Import CartContext from CartContextProvider
import { CartContext } from "../Context/CartContextProvider.jsx";
// Import useNavigate
import { useNavigate } from "react-router-dom";
import "./Products.css";
// Import React Icon
import { FaEye } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function Products({ category }) {
  // State variable to store the products
  const [products, setProducts] = useState([]);
  // Hook for navigation
  const navigate = useNavigate();
  // Destructuring addToCart function from CartContext
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState("");

  // Effect hook to fetch products
  useEffect(() => {
    // Fetching products from API
    fetchProducts()
      .then((products) => {
        // Update the 'products' state variable
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

  const handleAddToCart = (product) => {
    addToCart(product);
    const message = `${product.title} has been added to the cart!`;
    setNotification(message); // Set notification message
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification();
    }, 3000);
  };

  return (
    <>
      {notification && <p className="notification">{notification}</p>}
      <section className="banner">
        <div className="banner-text">
          <h1>
            Discover Exciting <br /> <span>New Products</span>
          </h1>
          <p>Explore our latest arrivals and find something special for you!</p>
        </div>
      </section>
      <div className="header-text">
        <h2>View All Products</h2>
      </div>
      <div className="product-container">
        <div className="product-list">
          {products.filter(filterProducts).map((product) => (
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
