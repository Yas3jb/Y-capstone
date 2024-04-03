import { useState, useEffect } from "react";
import { fetchUser, Authenticate } from "../../API/api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Authenticate();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchUser({ email, password });
      if (response && response.status === 200) {
        const { token } = response.data;
        window.localStorage.setItem("token", token);
        Authenticate();
        setSuccessMessage("Login successful. Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
        <p className="mt-2 text-center text-sm">
          If you don't have an account,{" "}
          <a className="text-blue-500 hover:underline" href="/register">
            create one
          </a>
          .
        </p>
      </div>
    </div>
  );
}
