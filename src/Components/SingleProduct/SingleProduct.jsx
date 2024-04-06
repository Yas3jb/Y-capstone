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
      <section className="pt-32 pb-12 lg:py32 h-screen flex items-center">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img
                src={product.imageurl}
                alt="Product Image"
                className="max-w-[200px] lg:max-w-sm"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {product.name}
              </h1>

              <p className="mb-8"> {product.description}</p>
              <div className="text-xl text-red-500 font-medium mb-6">
                $ {product.price}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-indigo-300 py-4 px-8 text-white hover:bg-indigo-700 scale-105 duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center"></div>
        </div>
      </section>
    </>
  );
}
