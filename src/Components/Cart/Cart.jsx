import { useContext } from "react";
import { CartContext } from "../Context/CartContextProvider";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import Checkout from "../Checkout/Checkout";

const Cart = () => {
  // Accessing the cart state, removeFromCart, and updateQuantity functions from the CartContext
  const { cart, delItemsInCart, updateQuantity } = useContext(CartContext);

  // Calculate total amount
  const totalAmount = cart
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto mt-20">
      {cart && cart.length ? (
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
                <th className="border-b border-gray-200 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.cart_id} className="border-b border-gray-200">
                  <td className="py-4 ">{item.product}</td>
                  <td className="py-4 text-center">${item.price}</td>
                  <td className="py-4 text-center">
                    <button
                      className=" m-2 text-md"
                      onClick={() =>
                        updateQuantity(item.cart_id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    {item.quantity}
                    <button
                      className=" m-2 text-md"
                      onClick={() =>
                        updateQuantity(item.cart_id, item.quantity + 1)
                      }
                    >
                      <FaPlus />
                    </button>
                  </td>
                  <td className="py-4 text-center">
                    <button
                      className="text-red-500 m-2 text-lg"
                      onClick={() => delItemsInCart(item.cart_id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-4">
            <p className="text-lg font-semibold">Total: ${totalAmount}</p>
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
};

export default Cart;
