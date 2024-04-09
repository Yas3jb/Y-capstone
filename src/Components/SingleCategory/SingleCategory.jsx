import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleCategory } from "../../API/index.js";
import { FaEye, FaPlus } from "react-icons/fa";
import { CartContext } from "../Context/CartContextProvider.jsx";
import { useNavigate } from "react-router-dom";

export default function SingleCategory() {
  // State to store products related to the category
  const [categoryProducts, setCategoryProducts] = useState([]);
  // Accessing addToCart function from CartContext
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState("");
  const { name } = useParams();
  const navigate = useNavigate();

  // Fetch products related to the category
  useEffect(() => {
    fetchSingleCategory(name)
      .then((products) => {
        setCategoryProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching Products:", error);
      });
  }, [name]);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    const message = `${product.name} has been added to the cart!`;
    setNotification(message);
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <>
      {notification && (
        <p className="bg-green-500 text-white px-4 py-2 fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300">
          {notification}
        </p>
      )}
      <div className="container mx-auto mb-8">
        <h1 className="text-black text-3xl font-bold mt-32 mb-8 text-center underline-offset-8">
          Explore products related to {name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={product.aosDelyay}
              className="border p-7 rounded-lg hover:shadow-xl transition duration-300 relative"
            >
              <img
                className="w-full h-auto mb-2 object-contain rounded-lg max-h-48"
                src={product.imageurl}
                alt={product.name}
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="mb-1 text-slate-400">{product.category_name}</p>
                <p className="mb-1 text-black">{product.rating}</p>
                <div className="mb-1 text-red-500">$ {product.price}</div>
                <div className="mb-1 mt-3 flex justify-center">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex justify-center items-center text-black w-12 h-12 rounded-full hover:bg-indigo-300 transition-all duration-300"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="w-12 h-12 bg-white flex justify-center items-center text-black rounded-full hover:bg-indigo-300 transition-all duration-300"
                  >
                    <FaEye />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
