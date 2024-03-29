import { useState, useEffect } from "react";
// Import fetchMen function
import { fetchMen } from "../../API/api.js";
// Import useNavigate
import { useNavigate } from "react-router-dom";

export default function Men() {
  // State variable to store the Men Clothing
  const [mens, setMens] = useState([]);
  // Hook for navigation
  const navigate = useNavigate();

  // Effect hook to fetch Men Clothing
  useEffect(() => {
    fetchMen()
      .then((mens) => {
        // Update the 'men clothing' state variable
        setMens(mens);
      })
      .catch((err) => {
        console.error("Error fetching men clothing:", err);
      });
  }, []);

  return (
    <div>
      {mens.map((men) => (
        <div key={men.id}>
          <img src={men.image} alt="Men clothing Image" />
          <h2>{men.title}</h2>
          <p>{men.description}</p>
          <h4>{men.price}</h4>
          <button>Add</button>
          <button onClick={() => navigate(`/products/${men.id}`)}>View</button>
        </div>
      ))}
    </div>
  );
}
