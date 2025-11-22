// src/pages/AdminLogin.js
import React, { useState } from "react";
import api from "../api/axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/api/admin/login", { email, password });

      alert("Admin Login Successful!");

      // FIX ✔ Save admin in localStorage for AdminSidebar
      localStorage.setItem(
        "admin",
        JSON.stringify({
          email: email,
          full_name: "Admin User",
          college_name: "Your College",
        })
      );

      window.location.href = "/admin/dashboard";
    } catch (err) {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Admin Login
        </h2>

        <input
          className="border p-2 rounded w-full mb-3"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 rounded w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
