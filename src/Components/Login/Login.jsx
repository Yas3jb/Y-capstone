import { useState, useEffect } from "react";
import { fetchUser, Authenticate } from "../../API/api.js";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

// Component for user login
export default function Login() {
  // State variables to store user input and error message/success message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // Hook for navigation
  const navigate = useNavigate();

  // Effect hook to authenticate user
  useEffect(() => {
    Authenticate();
  }, []);

  // Function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Attempt to fetch user with provided credentials
      const response = await fetchUser({ email, password });
      if (response && response.status === 200) {
        const { token } = response.data;
        window.localStorage.setItem("token", token);
        Authenticate();
        // Show success message
        setSuccessMessage("Login successful. Redirecting...");
        // Redirect to the home page after a brief delay
        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirect after 2 seconds
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleLogin}>
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
        <button className="login-btn" disabled={!email || !password}>
          Login
        </button>
      </form>
      <p className="text">
        If you don't have an account,{" "}
        <a className="login-link" href="/register">
          create one
        </a>
        .
      </p>
    </div>
  );
}
