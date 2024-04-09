// Import axios
import axios from "axios";

// DATA URL
const Base_URL = "http://localhost:3000/api";
const URL = "https://e-commerce-api-5fec.onrender.com/api";

// Fetch Products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${Base_URL}/products`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Fetch Single Product
export const fetchSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${Base_URL}/products/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Create User
export const createUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${Base_URL}/auth/register`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { token } = response.data;
    window.localStorage.setItem("token", token);
    console.log("User created successfully:", response.data);
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      console.error("Server error:", error.response.data);
      throw new Error("User already exists. Please login.");
    } else {
      // Something else happened (e.g., request setup error)
      console.error("Error:", error.message);
      throw new Error("Error occurred. Please try again.");
    }
  }
};

// Fetch user
export const fetchUser = async (credentials) => {
  try {
    const response = await axios.post(`${Base_URL}/auth/login`, credentials, {
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
      await axios.get(`${Base_URL}/auth/me`, {
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
    const response = await axios.get(`${Base_URL}/categories`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Fetch Single Category
export const fetchSingleCategory = async (name) => {
  try {
    const response = await axios.get(`${Base_URL}/categories/${name}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// fetch cart
export const fetchCart = async () => {
  try {
    const response = await axios.get(`${Base_URL}/cart`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// fetch checkout (stripe)
export const fetchCheckout = async (cartItems) => {
  try {
    const response = await axios.post(
      `${Base_URL}/checkout`,
      {
        items: cartItems,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

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
