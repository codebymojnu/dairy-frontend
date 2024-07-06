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
        setError("তুমি ভুল পার্সওয়ার্ড দিয়েছো। সঠিক পার্সওয়ার্ডটি দিয়ে চেষ্টা কর।");  
      });
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md text-white mr-3 ml-3">
        <div className="flex justify-center">
          <img
            className="w-40 h-40 rounded-full mb-4"
            src="/asha.jpeg"
            alt="Asha Photo"
          />
        </div>
        <h2
          className="flex justify-center mt-2 text-2xl font-semibold mb-4"
          style={{ color: "#00A179" }}
        >
          আশা, 
        </h2>
        <div className="flex justify-center mt-2">
          <span className="text-sm mb-5" style={{ color: "#000000" }}>
           চিঠিটি পড়তে সঠিক ইউজার নাম ও পার্সওয়ার্ড দিয়ে লগইন করো।  
          </span>
        </div>
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
              <span className="text-green-500">আশা</span>, {error} 
            </p>
          )}
          {isSubmitting && (
            <p className="text-green-500 transition-opacity duration-300 opacity-100 mt-4 mb-3">
              <span className="text-red-500">আশা</span>, দয়া করে একটু কিছুক্ষণ 
              অপেক্ষা করো....
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
