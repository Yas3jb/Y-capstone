// Import useState, useEffect, and useContext
import { useState, useEffect, useContext } from "react";
// Import CartContext from CartContextProvider
import { CartContext } from "../Context/CartContextProvider.jsx";

export default function Cart() {
  // Destructuring cart, cartItems, and removeFromCart from CartContext
  const { cart, cartItems, removeFromCart } = useContext(CartContext);
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

  return (
    <div>
      {cart.length ? (
        <div>
          <h1>Items In Your Cart</h1>
          <div>
            {cart.map((product, i) => (
              <div key={i}>
                <div>
                  <h3>{product.title}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {cartItems[product.id]}</p>
                  <p>
                    Total: $
                    {(
                      Number(cartItems[product.id]) * Number(product.price)
                    ).toFixed(2)}
                  </p>
                  <button onClick={() => removeFromCart(product)}>
                    Remove Item
                  </button>
                </div>
                <div>
                  <img src={product.image} alt={product.title} />
                </div>
              </div>
            ))}
            <div>Grand Total: ${totalCost.toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div>
          <h1>No Items in the cart</h1>
        </div>
      )}
    </div>
  );
}
