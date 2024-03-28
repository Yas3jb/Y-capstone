// Import axios
import axios from "axios";

// DATA URL
const URL = "https://fakestoreapi.com";

// Fetch Products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${URL}/products`);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
