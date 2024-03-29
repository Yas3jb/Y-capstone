// Import axios
import axios from "axios";

// DATA URL
const URL = "https://fakestoreapi.com";
const Base_URL = "http://localhost:3000/api";

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
    const response = await axios.post(
      `${Base_URL}/auth/register`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const { token } = response.data;
      window.localStorage.setItem("token", token);
      console.log(response.data);
    } else {
      console.error(response.data);
    }
  } catch (err) {
    console.error("Error:", err);
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
  } catch (err) {
    console.error("Error:", err);
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

// fetch Jewelery
export const fetchJewelery = async () => {
  try {
    const response = await axios.get(`${URL}/products/category/jewelery`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// fetch Electronics
export const fetchElectronics = async () => {
  try {
    const response = await axios.get(`${URL}/products/category/electronics`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
