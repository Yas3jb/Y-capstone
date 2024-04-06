import { useState, useEffect } from "react";
import { fetchCategories } from "../../API/api";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold my-5 text-center">
        Explore All Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="py-10 pl-5 my-5 bg-indigo-600 text-white rounded-3xl relative h-[220px] flex flex-col justify-center items-center"
          >
            <div>
              <div className="my-2 text-center">
                <p className="text-4xl xl:text-5xl font-bold mb-5">
                  {category.name}
                </p>
                <Link
                  to={`/categories/${category.name}`}
                  className="bg-black text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10"
                >
                  Browse
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
