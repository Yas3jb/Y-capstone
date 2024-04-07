import { useState } from "react";
import { createUser } from "../../API/index.js";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-3xl w-full p-8 space-y-8 bg-white shadow-md rounded-md">
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Register
          </h2>
        </div>
        <form
          className=" flex flex-col items-center gap-3 "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="text-center rounded-md border-indigo-100 border-2"
          />
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="text-center rounded-md border-indigo-100 border-2"
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="text-center rounded-md border-indigo-100 border-2"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="text-center rounded-md border-indigo-100 border-2"
          />
          <button
            className="px-6 flex justify-start items-center text-center rounded-md text-white bg-indigo-600 cursor-pointer  "
            disabled={!firstName || !lastName || !email || !password}
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
