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
    const message = `${product.name} has been added to the cart!`;
    setNotification(message);
    setTimeout(() => {
      setNotification();
    }, 3000);
  };

  return (
    <>
      {notification && (
        <p className="bg-green-500 text-white px-4 py-2 fixed top-0 left-1/2 transform -translate-x-1/2 m-4 z-50">
          {notification}
        </p>
      )}
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <img
            src={product.imageurl}
            alt="Product Image"
            className="w-full h-auto max-w-xs"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl text-center font-semibold mb-4">
              {product.name}
            </h2>
            <p className="mb-4 text-center">
              Description: {product.description}
            </p>
            <h4
              className="mb-4 text-center
            "
            >
              Price:{" "}
              <span className="font-semibold text-red-700">
                ${product.price}
              </span>
            </h4>
            <button
              onClick={() => handleAddToCart(product)}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
