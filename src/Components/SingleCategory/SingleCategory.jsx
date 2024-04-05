import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleCategory } from "../../API/api";

export default function SingleCategory() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    fetchSingleCategory(name)
      .then((products) => {
        setCategoryProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching Products:", error);
      });
  }, [name]);

  return (
    <div>
      <h2>Category: {name}</h2>
      <h3>Products:</h3>
      <ul>
        {categoryProducts.map((product) => (
          <li key={product.id}>
            <div>
              <h4>{product.name}</h4>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
              <img src={product.imageurl} alt={product.name} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
