import { useState, useEffect } from "react";
// Import fetchProducts function
import { fetchProducts } from "../../API/api.js";

export default function Products() {
  const [products, setProducts] = useState([]); // state variable

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        setProducts(products); // Update the 'products' state variable
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
          <button>View</button>
        </div>
      ))}
    </>
  );
}
