import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Context/CartContextProvider.jsx";
import { FaRegTrashAlt } from "react-icons/fa";
import Checkout from "../Checkout/Checkout.jsx";

export default function Cart() {
  // Accessing the cart state functions from the CartContext
  const { cart, cartItems, removeFromCart, updateQuantity } =
    useContext(CartContext);
  // State variables
  const [totalCost, setTotalCost] = useState(0);

  // Calculate total cost whenever cart items or quantities change
  useEffect(() => {
    setTotalCost(
      cart.reduce(
        (acc, currentVal) =>
          acc + Number(currentVal.price) * cartItems[currentVal.id],
        0
      )
    );
  }, [cartItems, cart]);

  // Function to handle removing a product from the cart
  const handleRemove = (product) => {
    removeFromCart(product);
  };

  // Function to handle changing quantity of a product in the cart
  const handleQuantityChange = (product, newQuantity) => {
    updateQuantity(product, newQuantity);
  };

  return (
    <div className="container mx-auto mt-20">
      {cart.length ? (
        <div>
          <h1 className="text-2xl text-center font-bold mb-4 py-14">
            Items In Your Cart
          </h1>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-200 py-2">Product</th>
                <th className="border-b border-gray-200 py-2">Price</th>
                <th className="border-b border-gray-200 py-2">Quantity</th>
                <th className="border-b border-gray-200 py-2">Total</th>
                <th className="border-b border-gray-200 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-1/2 md:w-1/2 mx-2">
                        <img
                          src={product.imageurl}
                          alt={product.name}
                          className="w-full h-auto max-w-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm mx-2 font-semibold mb-2">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">${product.price}</td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <button
                        className="bg-[#0a4abf] hover:bg-[#f6eb16] transition-all duration-300 text-white px-2 ml-4 mr-2 rounded"
                        onClick={() =>
                          handleQuantityChange(
                            product,
                            cartItems[product.id] - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span>{cartItems[product.id]}</span>
                      <button
                        className="bg-[#0a4abf] hover:bg-[#f6eb16] transition-all duration-300 text-white px-2 ml-2 mr-4 rounded"
                        onClick={() =>
                          handleQuantityChange(
                            product,
                            cartItems[product.id] + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    $
                    {(
                      Number(cartItems[product.id]) * Number(product.price)
                    ).toFixed(2)}
                  </td>
                  <td className="py-4">
                    <button
                      className="text-red-500 m-4 text-lg"
                      onClick={() => handleRemove(product)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-lg font-semibold mt-4 mb-4">
            Grand Total: ${totalCost.toFixed(2)}
          </div>
          <Checkout />
        </div>
      ) : (
        <div className="text-center py-8 mb-20">
          <h1 className="text-2xl font-bold mb-4 pt-8">No Items in the Cart</h1>
          <a href="/" className="text-blue-500 hover:underline">
            Navigate back to the homepage
          </a>
        </div>
      )}
    </div>
  );
}
