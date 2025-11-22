// src/pages/Register.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      // Backend requires username, email, password
      await api.post("/api/auth/register", {
        username: form.username,
        full_name: form.full_name,
        email: form.email,
        password: form.password,
      });

      alert("Registration Successful! Please login.");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Registration Failed! Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f1235] via-[#24104f] to-[#150f2d] text-white">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-12 md:py-20">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-8 space-y-6">
          <h2 className="text-center text-2xl font-bold mb-2">
            Create Your <span className="text-[#38bdf8]">EduWay</span> Account
          </h2>

          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/20 placeholder-purple-200 focus:outline-none"
            onChange={update}
          />

          <input
            name="full_name"
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/20 placeholder-purple-200 focus:outline-none"
            onChange={update}
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/20 placeholder-purple-200 focus:outline-none"
            onChange={update}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/20 placeholder-purple-200 focus:outline-none"
            onChange={update}
          />

          <button
            onClick={handleRegister}
            className="w-full py-3 bg-[#6d28d9] hover:bg-[#5b21b6] rounded-lg text-white font-semibold shadow-lg"
          >
            Register
          </button>

          <p className="text-center text-sm text-purple-200">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-sky-300 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
