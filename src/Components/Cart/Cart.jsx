import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Context/CartContextProvider.jsx";

export default function Cart() {
  const { cart, cartItems, removeFromCart, updateQuantity } =
    useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(
      cart.reduce(
        (acc, currentVal) =>
          acc + Number(currentVal.price) * cartItems[currentVal.id],
        0
      )
    );
  }, [cartItems, cart]);

  const handleRemove = (product) => {
    removeFromCart(product);
  };

  const handleQuantityChange = (product, newQuantity) => {
    updateQuantity(product, newQuantity);
  };

  return (
    <div className="container mx-auto mt-8">
      {cart.length ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Items In Your Cart</h1>
          <div>
            {cart.map((product, i) => (
              <div
                className="flex items-center border-b border-gray-200 py-4"
                key={i}
              >
                <div className="w-1/4">
                  <img
                    src={product.imageurl}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-3/4 ml-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                  <div className="flex items-center mb-2">
                    <button
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                      onClick={() =>
                        handleQuantityChange(product, cartItems[product.id] - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-4">{cartItems[product.id]}</span>
                    <button
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                      onClick={() =>
                        handleQuantityChange(product, cartItems[product.id] + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold">
                    Total: $
                    {(
                      Number(cartItems[product.id]) * Number(product.price)
                    ).toFixed(2)}
                  </p>
                  <button
                    className="mt-2 text-red-500"
                    onClick={() => handleRemove(product)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
            <div className="text-lg font-semibold mt-4">
              Grand Total: ${totalCost.toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Items in the Cart</h1>
          <a href="/" className="text-blue-500 hover:underline">
            Go Back
          </a>
        </div>
      )}
    </div>
  );
}
