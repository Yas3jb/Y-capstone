import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../API/index.js";
import { CartContext } from "../Context/CartContextProvider.jsx";

export default function SingleProduct() {
  // State to store the product details
  const [product, setProduct] = useState([]);
  // Accessing addToCart function from CartContext
  const { addToCart, notification } = useContext(CartContext);
  const { id } = useParams();

  // Fetch product details
  useEffect(() => {
    fetchSingleProduct(id)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const productId = product.id;
    const quantity = 1;
    addToCart(productId, quantity);
  };

  return (
    <>
      {notification && (
        <p className="bg-yellow-300 text-black px-4 py-2 fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300">
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
              <p className="mb-2"> {product.description}</p>
              <p className="mb-8"> {product.rating}</p>
              <div className="text-xl text-red-500 font-medium mb-6">
                $ {product.price}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-[#0a4abf] py-4 px-8 text-white hover:bg-[#f6eb16] scale-105 duration-300"
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
