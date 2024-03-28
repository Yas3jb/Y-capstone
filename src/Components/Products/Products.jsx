import { useState, useEffect } from "react";
// Import fetchProducts function
import { fetchProducts } from "../../API/api.js";
// Import useNavigate
import { useNavigate } from "react-router-dom";

export default function Products() {
  // State variable to store the products
  const [products, setProducts] = useState([]);
  // Hook for navigation
  const navigate = useNavigate();

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

  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt="Product Image" />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h4>{product.price}</h4>
          <button>Add</button>
          <button onClick={() => navigate(`/products/${product.id}`)}>
            View
          </button>
        </div>
      ))}
    </>
  );
}
