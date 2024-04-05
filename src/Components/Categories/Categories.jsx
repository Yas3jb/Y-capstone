import { useState, useEffect } from "react";
import { fetchCategories } from "../../API/api";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Effect hook to fetch categories
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
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <button onClick={() => navigate(`/categories/${category.id}`)}>
            View
          </button>
        </div>
      ))}
    </div>
  );
}
