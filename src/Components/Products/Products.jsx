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
  return (
    <div className="products-container">
      {products.filter(filterProducts).map((product) => (
        <section key={product.id} className="product-card">
          <img
            className="product-image"
            src={product.image}
            alt={product.title}
          />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-desc">
            {truncateDescription(product.description)}
          </p>{" "}
          <h4 className="product-price"> ${product.price}</h4>
          <button onClick={() => addToCart(product)} className="add-button">
            <FaPlus />
          </button>
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="view-button"
          >
            <FaEye />
          </button>
        </section>
      ))}
    </div>
  );
}
