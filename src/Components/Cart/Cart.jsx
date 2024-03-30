import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Context/CartContextProvider.jsx";
import "./Cart.css";

export default function Cart() {
  // Accessing cart and cartItems from the CartContext
  const { cart, cartItems, removeFromCart, updateQuantity } =
    useContext(CartContext);
  // State variable to store total cost of items in cart
  const [totalCost, setTotalCost] = useState(0);

  // Effect hook to update total cost when cart items or cart change
  useEffect(() => {
    setTotalCost(
      cart.reduce(
        (acc, currentVal) =>
          acc + Number(currentVal.price) * cartItems[currentVal.id],
        0
      )
    );
  }, [cartItems, cart]);

  // Function to handle removing an item from the cart
  const handleRemove = (product) => {
    removeFromCart(product);
  };

  // Function to handle changing the quantity of an item in the cart
  const handleQuantityChange = (product, newQuantity) => {
    updateQuantity(product, newQuantity);
  };

  return (
    <div className="cart-container">
      {cart.length ? (
        <div>
          <h1 className="cart-heading">Items In Your Cart</h1>
          <div>
            {cart.map((product, i) => (
              <div className="cart-item" key={i}>
                <div>
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{product.title}</h3>
                  <p className="cart-item-price">Price: ${product.price}</p>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() =>
                        handleQuantityChange(product, cartItems[product.id] - 1)
                      }
                    >
                      -
                    </button>
                    <span>{cartItems[product.id]}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(product, cartItems[product.id] + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Total: $
                    {(
                      Number(cartItems[product.id]) * Number(product.price)
                    ).toFixed(2)}
                  </p>
                  <button onClick={() => handleRemove(product)}>
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              Grand Total: ${totalCost.toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-no-items">
          <h1>No Items in the Cart</h1>
        </div>
      )}
    </div>
  );
}
