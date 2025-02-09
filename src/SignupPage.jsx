import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const showNotification = (message, type = "info") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://music-api-uvdl.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
      }
      showNotification("Signup successful! Redirecting...", "success");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      showNotification(err.message, "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-4"
    >
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <img
            src="https://github.com/khawarahemad/Musify/blob/main/public/Musify.png?raw=true"
            alt="Musify Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-green-400">Musify</h1>
          <h2 className="text-xl sm:text-2xl font-bold mt-2">Sign up</h2>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-gray-900 bg-green-400 hover:bg-green-500 rounded-md transition duration-300"
          >
            Sign up
          </button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-500 font-bold cursor-pointer"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default SignupPage;
