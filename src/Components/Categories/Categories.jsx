import { useState, useEffect } from "react";
import { fetchCategories } from "../../API/index.js";
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
      <h1 className="text-indigo-300 text-3xl font-bold mt-36 text-center underline-offset-8">
        Explore All Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className="py-8 pl-9 my-5 bg-gradient-to-br from-pink-600 via-purple-500 to-transparent text-white p-36  rounded-3xl relative h-[220px] flex flex-col justify-left items-left tracking-widest"
          >
            <div>
              <div className="my-5">
                <p className="text-5xl xl:text-6xl font-bold mb-10 text-left ">
                  {category.name}
                </p>
                <Link
                  to={`/categories/${category.name}`}
                  className=" text-indigo-300 cursor-pointer hover:text-white scale-105 duration-300 py-2 px-1 "
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
