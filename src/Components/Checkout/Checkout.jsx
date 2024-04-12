import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContextProvider.jsx";
import { fetchCheckout } from "../../API/index.js";

export default function Checkout() {
  // Accessing cart items from the CartContext
  const { cart } = useContext(CartContext);

  // State to track if checkout is in progress
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to handle checkout process
  const handleCheckout = async () => {
    try {
      // Set isProcessing to true when checkout process starts
      setIsProcessing(true);

      // Extracting product IDs and quantities from cart items
      const items = cart.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
      }));

      // Call API to initiate checkout with cart items
      const response = await fetchCheckout(items);

      // Redirecting user to the Stripe checkout page
      window.location.href = response.url;

      // After successful checkout, set isProcessing back to false
      setIsProcessing(false);
    } catch (error) {
      console.error("Error occurred during checkout:", error);
      // If an error occurs, set isProcessing back to false
      setIsProcessing(false);
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleCheckout}
        className={`bg-black hover:bg-yellow-300 transition-all duration-300 text-white font-bold py-2 px-4 rounded ${
          isProcessing ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}
