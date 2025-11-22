import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [exam, setExam] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [applicationNo, setApplicationNo] = useState("");
  const [seatNo, setSeatNo] = useState("");
  const [password, setPassword] = useState("");

  const handleStudentLogin = async () => {
    if (!exam || !phone || !email || !applicationNo || !seatNo || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await api.post("/api/auth/student-login", {
        exam,
        phone,
        email,
        application_no: applicationNo,
        seat_no: seatNo,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.student));

      alert("Login Successful!");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f1235] via-[#24104f] to-[#150f2d] text-white">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-12 md:py-20">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-8 space-y-6">

          <h2 className="text-center text-2xl font-bold mb-4">
            Login to <span className="text-[#8b5cf6]">EduWay</span>
          </h2>

          {/* EXAM DROPDOWN */}
          <select
  className="w-full p-3 rounded-lg bg-white text-black border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
  value={exam}
  onChange={(e) => setExam(e.target.value)}
>
  <option value="" className="text-gray-500">Select Exam</option>

  <option value="MHT-CET" className="text-black">MHT-CET</option>
  <option value="JEE MAIN" className="text-black">JEE Main</option>
  <option value="VITEEE" className="text-black">VITEEE</option>
  <option value="BITSAT" className="text-black">BITSAT</option>
  <option value="COMEDK" className="text-black">COMEDK</option>
  <option value="WBJEE" className="text-black">WBJEE</option>
  <option value="GUJCET" className="text-black">GUJCET</option>
  <option value="SRMJEEE" className="text-black">SRMJEEE</option>
  <option value="MET" className="text-black">MET (Manipal)</option>
  <option value="KEAM" className="text-black">KEAM</option>
</select>


          {/* PHONE */}
          <input
  type="text"
  placeholder="Registered Phone Number"
  className="w-full p-3 rounded-lg bg-white text-black placeholder-black border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>


          {/* EMAIL */}
          <input
            type="email"
            placeholder="Registered Email ID"
            className="w-full p-3 rounded-lg bg-white text-black placeholder-black border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* APPLICATION NUMBER */}
          <input
            type="text"
            placeholder="Application Number"
            className="w-full p-3 rounded-lg bg-white text-black placeholder-black border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={applicationNo}
            onChange={(e) => setApplicationNo(e.target.value)}
          />

          {/* SEAT NUMBER */}
          <input
            type="text"
            placeholder="Seat Number"
            className="w-full p-3 rounded-lg bg-white text-black placeholder-black border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={seatNo}
            onChange={(e) => setSeatNo(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white text-black placeholder-black border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* LOGIN BUTTON */}
          <button
            onClick={handleStudentLogin}
            className="w-full py-3 bg-[#7c3aed] hover:bg-[#6d28d9] rounded-lg text-white font-semibold shadow-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
