import { useState, useEffect } from "react";
import { fetchUser, Authenticate } from "../../API/index.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // State variables to store email, password, error message, and success message
  useEffect(() => {
    Authenticate();
  }, []);

  // Function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchUser({ email, password });
      if (response && response.status === 200) {
        // If authentication successful, store token in local storage
        const { token } = response.data;
        window.localStorage.setItem("token", token);
        // Authenticate user
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full p-40 space-y-8 bg-white shadow-md rounded-md">
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        <div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Login
          </h2>
        </div>
        <form
          className=" flex justify-center items-center gap-8 "
          onSubmit={handleLogin}
        >
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="text-center rounded-md border-[#0a4abf] border-2"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="text-center rounded-md border-[#0a4abf] border-2"
          />
          <button
            className="px-3 flex justify-start items-center text-center rounded-md text-white bg-[#0a4abf] hover:bg-[#f6eb16] transition-all duration-300 cursor-pointer  "
            disabled={!email || !password}
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm">
          Do not have an account?{" "}
          <a className="text-red-500 hover:underline" href="/register">
            Sign up now!
          </a>
        </p>
      </div>
    </div>
  );
}
