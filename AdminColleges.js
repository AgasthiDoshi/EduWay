import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function AdminColleges() {
  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    city: "",
    state: "",
    website: "",
  });

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      const res = await api.get("/api/admin/colleges");
      setColleges(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addCollege = async () => {
    try {
      const res = await api.post("/api/admin/colleges", form);
      alert("College Added!");
      loadColleges();
    } catch (err) {
      alert("Failed to add college");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Manage Colleges
        </h1>

        <div className="max-w-xl mb-8">
          <GlassCard>
            <h2 className="text-lg font-semibold mb-4">Add College</h2>

            {["name", "code", "city", "state", "website"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.toUpperCase()}
                className="w-full border p-2 rounded mb-3"
                onChange={update}
              />
            ))}

            <button
              onClick={addCollege}
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </GlassCard>
        </div>

        <div className="max-w-3xl space-y-4">
          {colleges.map((c) => (
            <GlassCard key={c.id}>
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-gray-600">
                {c.city}, {c.state}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
