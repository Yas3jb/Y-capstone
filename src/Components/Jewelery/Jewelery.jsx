import { useState, useEffect } from "react";
// Import fetchJewelery function
import { fetchJewelery } from "../../API/api.js";
// Import useNavigate
import { useNavigate } from "react-router-dom";

export default function Jewelery() {
  // State variable to store the jeweleries
  const [jewelries, setJewelires] = useState([]);
  // Hook for navigation
  const navigate = useNavigate();

  // Effect hook to fetch jewelerires
  useEffect(() => {
    fetchJewelery()
      .then((jewelries) => {
        // Update the 'jeweleries' state variable
        setJewelires(jewelries);
      })
      .catch((err) => {
        console.error("Error fetching jewelery:", err);
      });
  }, []);

  return (
    <div>
      {jewelries.map((jewelery) => (
        <div key={jewelery.id}>
          <img src={jewelery.image} alt="Jewelery Image" />
          <h2>{jewelery.title}</h2>
          <p>{jewelery.description}</p>
          <h4>{jewelery.price}</h4>
          <button>Add</button>
          <button onClick={() => navigate(`/products/${jewelery.id}`)}>
            View
          </button>
        </div>
      ))}
    </div>
  );
}
