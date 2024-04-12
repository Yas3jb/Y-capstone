// Import axios
import axios from "axios";

// DATA URL
const URL = "https://e-commerce-api-5fec.onrender.com/api";

// Fetch Products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${URL}/products`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Fetch Single Product
export const fetchSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${URL}/products/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Create User
export const createUser = async (credentials) => {
  try {
    const response = await axios.post(`${URL}/auth/register`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { token } = response.data;
    window.localStorage.setItem("token", token);
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      throw new Error("User already exists. Please login.");
    } else {
      throw new Error("Error occurred. Please try again.");
    }
  }
};

// Fetch user
export const fetchUser = async (credentials) => {
  try {
    const response = await axios.post(`${URL}/auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const { token } = response.data;
      window.localStorage.setItem("token", token);
      Authenticate();
    }
    return response;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

// Authenticate
export const Authenticate = async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    try {
      await axios.get(`${URL}/auth/me`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      window.localStorage.removeItem("token");
    }
  }
};

// fetch Categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${URL}/categories`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Fetch Single Category
export const fetchSingleCategory = async (name) => {
  try {
    const response = await axios.get(`${URL}/categories/${name}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Function to initiate checkout process
export const fetchCheckout = async (cartItems) => {
  try {
    // Send a POST request to the checkout endpoint with cart items
    const response = await axios.post(
      `${URL}/checkout`,
      {
        cartItems: cartItems,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // If the request is successful (status code 200)
    // redirect the user to the checkout URL
    if (response.status === 200) {
      const { url } = response.data;
      window.location.href = url;
    } else {
      console.error("Error occurred during checkout. Status:", response.status);
    }
  } catch (err) {
    console.error("Error occurred during checkout:", err.message);
  }
};
