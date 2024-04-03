import { useState } from "react";
// Import createUser function
import { createUser } from "../../API/api.js";
import { Link } from "react-router-dom";
import "../Register/Register.css";

// Component for user registration
export default function Register() {
  // State variables to store user input, success message, and error message
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle register submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Creating user with input data
      await createUser({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      // Clearing input fields after submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      // Display success message
      setSuccessMessage("Registration successful. You can now login.");
      // Clear any previous messages
      setErrorMessage("");
      setErrorMessage("");
    } catch (err) {
      // Display error message
      setErrorMessage(err.message);
      console.error("Error:", err);
    }
  };

  return (
    <div className="container">
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button
          className="register-btn"
          disabled={!firstName || !lastName || !email || !password}
        >
          Register
        </button>
      </form>
      <p className="text">
        Already have an account?{" "}
        <a className="register-link" href="/login">
          Login
        </a>
      </p>
    </div>
  );
}
