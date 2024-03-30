// Import createContext, useState, and useEffect
import { createContext, useState, useEffect } from "react";
// Import fetchProducts function
import { fetchProducts } from "../../API/api.js";

// Creating CartContext
export const CartContext = createContext(null);

// CartContextProvider component
export const CartContextProvider = (props) => {
  // State variables to store cart items and cart
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);

  // Effect hook to fetch initial cart data
  useEffect(() => {
    const getCart = async () => {
      const PRODUCTS = await fetchProducts();
      let cart = {};
      // Starting cart items with count as 0
      for (let i = 1; i < PRODUCTS.length + 1; i++) {
        cart[i] = 0;
      }
      setCartItems(cart);
    };
    getCart();
  }, []);

  // Effect hook to store cart data in local storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // Update cart count whenever cartItems change
    setCartCount(Object.values(cartItems).reduce((acc, curr) => acc + curr, 0));
  }, [cartItems]);

  // Function to add item to cart
  const addToCart = (item) => {
    if (!cart.find((cartItem) => cartItem.id === item.id)) {
      setCart([...cart, item]);
    }
    setCartItems((prev) => ({ ...prev, [item.id]: prev[item.id] + 1 }));
  };

  // Function to remove item from cart
  const removeFromCart = (item) => {
    console.log(cartItems);
    if (cartItems[item.id] === 1) {
      setCart(cart.filter((i) => i !== item));
    }
    setCartItems((prev) => ({ ...prev, [item.id]: prev[item.id] - 1 }));
  };

  // Function to calculate total cost of items in cart
  const getTotalCost = () => {
    return cart.reduce(
      (acc, currentVal) =>
        acc + Number(currentVal.price) * cartItems[currentVal.id],
      0
    );
  };

  // Function to reset cart
  const resetCart = () => {
    setCartItems({});
    setCart([]);
  };

  // Function to Update Quantity from inside the cart
  const updateQuantity = (product, newQuantity) => {
    setCartItems((prev) => ({
      ...prev,
      [product.id]: newQuantity >= 0 ? newQuantity : 0,
    }));
  };

  // Context value containing cart state and related functions
  const contextValue = {
    cart,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCost,
    resetCart,
    cartCount,
    updateQuantity,
  };

  // Providing context value to children components
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
