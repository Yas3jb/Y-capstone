// Import createContext, useState, and useEffect
import { createContext, useState, useEffect } from "react";
// Import fetchProducts function
import { fetchProducts } from "../../API/index.js";

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
      // Initialize cartItems with product ids as keys
      PRODUCTS.forEach((product) => {
        cart[product.id] = 0;
      });
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
    if (cartItems[item.id] === 1) {
      // If the item's count is 1, remove it from cartItems
      const updatedCartItems = { ...cartItems };
      delete updatedCartItems[item.id];
      setCartItems(updatedCartItems);
    } else {
      // Otherwise, decrease the count
      setCartItems((prev) => ({ ...prev, [item.id]: prev[item.id] - 1 }));
    }
    // Update cart by filtering out the item
    setCart(cart.filter((i) => i !== item));
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
