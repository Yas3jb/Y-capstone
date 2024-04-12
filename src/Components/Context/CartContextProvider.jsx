/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";

// DATA URL
const URL = "https://e-commerce-api-5fec.onrender.com/api";

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  // State variables
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState("");

  // fetch cart data
  const fetchCart = async (id) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axios.get(`${URL}/cart/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  // Remove an item from the cart
  const delItemsInCart = async (cart_id) => {
    const token = window.localStorage.getItem("token");
    try {
      await axios.delete(`${URL}/cart/${cart_id}`, {
        headers: {
          Authorization: token,
        },
      });
      const updatedCart = await fetchCart();
      setCart(updatedCart);
      updateCartCount(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // add an item to the cart
  const addToCart = async (productId, quantity) => {
    const token = window.localStorage.getItem("token");
    try {
      await axios.post(
        `${URL}/cart`,
        {
          product_id: productId,
          quantity,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // Fetch updated cart and update state
      const updatedCart = await fetchCart();
      setCart(updatedCart);
      updateCartCount(updatedCart);
      // If successful, set notification
      setNotification("Item successfully added to the cart");
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      // handle duplicate key error separately
      if (
        error.response &&
        error.response.status === 500 &&
        error.response.data ===
          'duplicate key value violates unique constraint "unique_cart_entry"'
      ) {
        setNotification("Item is already in the cart");
      } else {
        setNotification(
          "duplicate key value violates unique constraint. Item is already in the cart"
        );
      }
    }
  };

  // add an item to the cart
  const updateQuantity = async (cartId, newQuantity) => {
    const token = window.localStorage.getItem("token");
    try {
      await axios.put(
        `${URL}/cart/${cartId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const updatedCart = await fetchCart();
      setCart(updatedCart);
      updateCartCount(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  // update the total count of items in the cart
  const updateCartCount = (updatedCart) => {
    const count = updatedCart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  // reset the cart
  const resetCart = () => {
    setCart([]);
  };

  const contextValue = {
    cart,
    delItemsInCart,
    addToCart,
    resetCart,
    cartCount,
    updateQuantity,
    notification,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
