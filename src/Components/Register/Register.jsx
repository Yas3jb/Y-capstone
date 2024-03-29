import { useState } from "react";
// Import createUser function
import { createUser } from "../../API/api.js";

// Component for user registration
export default function Register() {
  // State variables to store user input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle register submission
  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <button disabled={!firstName || !lastName || !email || !password}>
          Register
        </button>
      </form>
    </div>
  );
}
