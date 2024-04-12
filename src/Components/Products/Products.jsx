import { useState, useEffect, useContext } from "react";
import { fetchProducts } from "../../API/index.js";
import { CartContext } from "../Context/CartContextProvider.jsx";
import { useNavigate } from "react-router-dom";
import { FaEye, FaPlus } from "react-icons/fa";
import Banner from "../Banner/Banner.jsx";
import Categories from "../Categories/Categories.jsx";

export default function Products() {
  // State variables.
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Effect hook to fetch products
  useEffect(() => {
    fetchProducts()
      .then((products) => {
        setProducts(products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Function to sort products
  const sortProductsByName = (a, b) => {
    const opt1 = String(a[sort]).toLowerCase();
    const opt2 = String(b[sort]).toLowerCase();
    if (opt1 < opt2) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (opt1 > opt2) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // Handle order change
  const handleOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    const productId = product.id;
    const quantity = 1;
    addToCart(productId, quantity);
    const message = `${product.name} has been added to the cart!`;
    setNotification(message);
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <>
      {loading && (
        <p className="flex justify-center text-center">
          Loading Please Wait...
        </p>
      )}
      {notification && (
        <p className="bg-green-500 text-white px-4 py-2 fixed top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300">
          {notification}
        </p>
      )}
      <Banner />
      <Categories />
      <div className="container mx-auto">
        <h2 className="text-black text-3xl font-bold mt-8 mb-8 text-center underline-offset-8">
          View All Products
        </h2>
        <div className="flex items-center justify-center mb-5">
          <label htmlFor="sort" className="text-black font-semibold mr-2">
            Sort by:
          </label>
          <select
            value={sort}
            onChange={handleSortChange}
            className="p-2  bg-white text-black focus:outline-none"
          >
            <option value="name">Name</option>
          </select>
          <button
            onClick={handleOrderChange}
            className="ml-4 px-2 py-1 bg-[#0a4abf] text-white rounded-md hover:bg-[#f6eb16] scale-105 duration-300 focus:outline-none"
          >
            Sort {sortOrder === "asc" ? "A to Z" : "Z to A"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8 gap-7">
          {products
            .slice(0, 10)
            .sort(sortProductsByName)
            .map((product) => (
              <div
                key={product.id}
                data-aos="fade-up"
                data-aos-delay={product.aosDelyay}
                className="border p-7 rounded-lg hover:shadow-xl transition duration-300 relative"
              >
                <img
                  className="w-full h-auto mb-2 object-contain rounded-lg max-h-48"
                  src={product.imageurl}
                  alt={product.name}
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="mb-1 text-slate-400">{product.category_name}</p>
                  <div className="mb-1 text-black">{product.rating}</div>
                  <div className="mb-1 text-red-500">$ {product.price}</div>
                  <div className="mb-1 mt-3 flex justify-center">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex justify-center items-center text-black w-12 h-12 rounded-full hover:bg-[#f6eb16] transition-all duration-300"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="w-12 h-12 bg-white flex justify-center items-center text-black rounded-full hover:bg-[#f6eb16] transition-all duration-300"
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
