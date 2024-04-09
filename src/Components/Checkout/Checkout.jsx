import { useContext } from "react";
import { CartContext } from "../Context/CartContextProvider.jsx";
import { fetchCheckout } from "../../API/index.js";

export default function Checkout() {
  // Accessing cart items from the CartContext
  const { cartItems } = useContext(CartContext);

  // Function to handle checkout process
  const handleCheckout = async () => {
    try {
      // Call API to initiate checkout with cart items
      await fetchCheckout(Object.keys(cartItems));
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
