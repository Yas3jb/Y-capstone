import { useState, useEffect, useContext } from "react";
// Import fetchProducts function
import { fetchSingleProduct } from "../../API/api.js";
// Import useParams
import { useParams } from "react-router-dom";
import "../SingleProduct/SingleProduct.css";
import { FaPlus } from "react-icons/fa";
import { CartContext } from "../Context/CartContextProvider.jsx";

export default function SingleProduct() {
  // State variable to store the product details
  const [product, setProduct] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState("");
  // Accessing route parameters
  const { id } = useParams();

  // Effect hook to fetch product details
  useEffect(() => {
    fetchSingleProduct(id)
      .then((product) => {
        setProduct(product); // Update the 'products' state variable
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);

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
      <div className="single-product-container">
        <img
          src={product.image}
          alt="Product Image"
          className="single-product-image"
        />
        <div className="single-product-details">
          <h2 className="single-product-title">{product.title}</h2>
          <p className="single-product-description">
            Description: {product.description}
          </p>
          <h4 className="single-product-price">
            Price: <span className="price-span">${product.price}</span>{" "}
          </h4>
          <h4>Rating: {product.rating && product.rating.rate}</h4>
          <button
            onClick={() => handleAddToCart(product)}
            className="add-button"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </>
  );
}
