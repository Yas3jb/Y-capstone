import { useState, useEffect } from "react";
import { fetchCategories } from "../../API/index.js";
import { Link } from "react-router-dom";

export default function Categories() {
  // State variables
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from the API
  useEffect(() => {
    fetchCategories()
      .then((categories) => {
        setCategories(categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-black text-3xl font-bold mt-36 text-center underline-offset-8">
        Explore All Categories
      </h1>
      {loading ? (
        <p className="flex justify-center text-center">
          Loading Please Wait...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-10">
          {categories.map((category) => (
            <div
              key={category.id}
              className="py-8 bg-gradient-to-b from-[#0a4abf] text-white p-36  rounded-3xl relative h-[220px] flex flex-col justify-center items-center "
            >
              <div>
                <div className="my-5">
                  <p className="text-5xl font-bold mb-5 text-center ">
                    {category.name}
                  </p>
                  <Link
                    to={`/categories/${category.name}`}
                    className=" text-black cursor-pointer hover:text-[#f6eb16] scale-105 duration-300 py-2 px-1 "
                  >
                    Browse
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
