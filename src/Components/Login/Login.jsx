import { useState, useEffect } from "react";
import { fetchUser, Authenticate } from "../../API/api.js";
import { useNavigate } from "react-router-dom";

// Component for user login
export default function Login() {
  // State variables to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hook for navigation
  const navigate = useNavigate();

  // Effect hook to authenticate user
  useEffect(() => {
    Authenticate();
  }, []);

  // Function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    await fetchUser({ email, password });
    // Clearing input fields after successful login
    setEmail("");
    setPassword("");
    // Navigating back to the root path after successful login
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!email || !password}>Login</button>
      </form>
      <p>
        If you don't have an account, <a href="/register">create one</a>.
      </p>
    </div>
  );
}
