/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";

// DATA URL
const URL = "https://e-commerce-api-5fec.onrender.com/api";

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  // State to store the cart items
  const [cart, setCart] = useState([]);
  // State to store the total count of items in the cart
  const [cartCount, setCartCount] = useState(0);

  // fetch cart data from the server
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
  // delete an item from the cart
  const deleteCart = async (id) => {
    const token = window.localStorage.getItem("token");
    try {
      await axios.delete(`${URL}/cart/${id}`, {
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

  const removeFromCart = async (cart_id) => {
    try {
      // calling deleteCart function to remove item
      await deleteCart(cart_id);
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
      const updatedCart = await fetchCart(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error adding item to cart:", error);
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
    removeFromCart,
    addToCart,
    resetCart,
    cartCount,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
