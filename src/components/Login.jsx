import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(false);
    // Send login credentials to backend for authentication
    fetch("https://pg-backend-nine.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        // Store JWT token in localStorage
        localStorage.setItem("token", data.token);
        // Redirect user to Finished Challenges page
        setIsSubmitting(false);
        navigate("/");
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error:", error);
        setError("আপনি ভুল তথ্য দিয়েছেন। দয়া করে- সঠিক পার্সওয়ার্ডটি দিবেন।");
      });
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md text-white mr-3 ml-3">
        <div className="flex justify-center">
          <img
            className="w-20 h-20 rounded-full mb-4"
            src="/rose.jpg"
            alt="Profile Avatar"
          />
        </div>
        <h2
          className="flex justify-center mt-5 text-2xl font-semibold mb-4"
          style={{ color: "#00A179" }}
        >
          জনাব/জনাবা,
        </h2>
        <div className="flex justify-center mt-5">
          <span className="text-sm mb-5" style={{ color: "#000000" }}>
            বার্তাটি দেখতে সঠিক ইউজার নেম ও পার্সওয়ার্ড দিয়ে লগইন করুন
          </span>
        </div>
        <p className="text-red-500 mb-4 text-left lg:text-center">
          ইউজারনেম: abcd এবং পার্সওয়ার্ড: 1234567890
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              style={{ color: "#000000" }}
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setError(false);
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <input
              style={{ color: "#00A179" }}
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setError(false);
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
          >
            Login
          </button>
          {error && (
            <p className="text-red-500 mt-4">
              <span className="text-green-500">জনাব/জনাবা</span>, {error}
            </p>
          )}
          {isSubmitting && (
            <p className="text-green-500 transition-opacity duration-300 opacity-100 mt-4 mb-3">
              <span className="text-red-500">জনাব/জনাবা</span>, দয়া করে একটু
              অপেক্ষা করুন ...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
