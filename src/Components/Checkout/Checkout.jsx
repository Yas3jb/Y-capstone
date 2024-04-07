import { useContext } from "react";
import { CartContext } from "../Context/CartContextProvider.jsx";
import { fetchCheckout } from "../../API/index.js";

export default function Checkout() {
  const { cartItems } = useContext(CartContext);

  const handleCheckout = async () => {
    try {
      await fetchCheckout(Object.keys(cartItems)); // Pass only the keys (product IDs) of cartItems
    } catch (error) {
      console.error("Error occurred during checkout:", error);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleCheckout}
        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Checkout
      </button>
    </div>
  );
}
