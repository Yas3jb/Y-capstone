import { useState, useEffect } from "react";
// Import fetchProducts function
import { fetchSingleProduct } from "../../API/api.js";
// Import useParams
import { useParams } from "react-router-dom";

export default function SingleProduct() {
  // State variable to store the product details
  const [product, setProduct] = useState([]);
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
  return (
    <>
      <div>
        <img src={product.image} alt="Product Image" />
        <h2>{product.title}</h2>
        <p>Description: {product.description}</p>
        <h4>Price:: ${product.price}</h4>
        <h4>Rating: {product.rating && product.rating.rate}</h4>
      </div>
    </>
  );
}
