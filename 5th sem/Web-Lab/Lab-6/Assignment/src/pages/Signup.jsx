import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSignup = (e) => {
  const handleSignup = () => {
    // e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/todo");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-80">
        <h1 className="text-2xl text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <button
          onClick={() => navigate("/todo")}
          className="w-full border p-2 rounded mt-4 cursor-pointer"
        >
          Go to Todos
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
