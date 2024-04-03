import { useState } from "react";
import { createUser } from "../../API/api.js";
import { Link } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setSuccessMessage("Registration successful. You can now login.");
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
        <p className="mt-2 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
