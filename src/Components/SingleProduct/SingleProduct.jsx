import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../API/api.js";
import { FaPlus } from "react-icons/fa";
import { CartContext } from "../Context/CartContextProvider.jsx";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchSingleProduct(id)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    const message = `${product.title} has been added to the cart!`;
    setNotification(message);
    setTimeout(() => {
      setNotification();
    }, 3000);
  };

  return (
    <>
      {notification && (
        <p className="bg-green-500 text-white px-4 py-2">{notification}</p>
      )}
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={product.image}
            alt="Product Image"
            className="w-full h-auto"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
            <p className="mb-4">Description: {product.description}</p>
            <h4 className="mb-4">
              Price: <span className="font-semibold">${product.price}</span>
            </h4>
            <h4 className="mb-4">
              Rating: {product.rating && product.rating.rate}
            </h4>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <FaPlus className="mr-1" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
