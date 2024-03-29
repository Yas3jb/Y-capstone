import { useState, useEffect } from "react";
// Import fetchElectronics function
import { fetchElectronics } from "../../API/api.js";
// Import useNavigate
import { useNavigate } from "react-router-dom";

export default function Electronics() {
  // State variable to store the Electronics
  const [electronics, setElectronics] = useState([]);
  // Hook for navigation
  const navigate = useNavigate();

  // Effect hook to fetch Electronics
  useEffect(() => {
    fetchElectronics()
      .then((electronics) => {
        // Update the 'Electronics' state variable
        setElectronics(electronics);
      })
      .catch((err) => {
        console.error("Error fetching jewelery:", err);
      });
  }, []);

  return (
    <div>
      {electronics.map((electronic) => (
        <div key={electronic.id}>
          <img src={electronic.image} alt="Electronics Image" />
          <h2>{electronic.title}</h2>
          <p>{electronic.description}</p>
          <h4>{electronic.price}</h4>
          <button>Add</button>
          <button onClick={() => navigate(`/products/${electronic.id}`)}>
            View
          </button>
        </div>
      ))}
    </div>
  );
}
