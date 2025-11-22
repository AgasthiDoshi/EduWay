// src/pages/Predictor.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function Predictor() {
  const [percentile, setPercentile] = useState("");
  const [region, setRegion] = useState("All");
  const [branch, setBranch] = useState("All");
  const [regions, setRegions] = useState(["All"]);
  const [branches, setBranches] = useState(["All"]);

  const [result, setResult] = useState([]);       // list of colleges
  const [rank, setRank] = useState(null);         // estimated rank
  const [message, setMessage] = useState("");     // info / no results

  // Load regions + branches from backend once
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const res = await api.get("/api/predictor/options");
        setRegions(res.data.regions || ["All"]);
        setBranches(res.data.branches || ["All"]);
      } catch (err) {
        console.error("Failed to load predictor options", err);
      }
    };

    loadOptions();
  }, []);

  const handlePredict = async () => {
    if (!percentile) {
      alert("Please enter your MHTCET percentile!");
      return;
    }

    try {
      const res = await api.post("/api/predictor/run", {
        marks: percentile,
        region,
        branch,
      });

      setRank(res.data.estimated_rank ?? null);
      setResult(res.data.predictions || []);
      setMessage(res.data.message || "");

    } catch (error) {
      console.error("Prediction error:", error);
      alert("Prediction failed. Please check that backend is running.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            EduWay Cutoff Predictor (MHTCET)
          </h1>

          <GlassCard>
            <div className="p-4 space-y-4">

              {/* Percentile */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  1. Enter your MHTCET Percentile
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border p-2 rounded"
                  placeholder="Example: 96.50"
                  value={percentile}
                  onChange={(e) => setPercentile(e.target.value)}
                />
              </div>

              {/* Region filter */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  2. Select Preferred Region (City)
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Choose <b>All</b> to see colleges from every region.
                </p>
              </div>

              {/* Branch filter */}
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  3. Select Preferred Branch
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Choose <b>All</b> to include every branch.
                </p>
              </div>

              {/* Predict button */}
              <button
                onClick={handlePredict}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Predict Colleges
              </button>

              {/* Result summary */}
              {rank !== null && (
                <div className="mt-6 p-4 bg-green-100 rounded border border-green-300">
                  <h3 className="text-lg font-bold text-green-700">
                    Estimated MHTCET Rank: {rank}
                  </h3>
                </div>
              )}

              {message && (
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
                  <p className="text-sm text-yellow-800">{message}</p>
                </div>
              )}

              {/* College list */}
              {result && result.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-3">
                    Colleges you can target:
                  </h3>

                  {result.map((c, idx) => (
                    <div
                      key={idx}
                      className="mb-3 p-3 bg-white rounded shadow border"
                    >
                      <p className="font-semibold">
                        {c.college_name} ({c.city})
                      </p>
                      <p className="text-gray-700">{c.branch}</p>
                      <p className="text-gray-600 text-sm">
                        Last Year Closing: <b>{c.closing_percentile.toFixed(2)}%</b>{" "}
                        (Rank {c.closing_rank})
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
