// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [verifiedStatus, setVerifiedStatus] = useState(false);

  const getCurrentUserId = () => {
    try {
      const s = JSON.parse(localStorage.getItem("studentProfile"));
      if (s?.id) return s.id;
      const u = JSON.parse(localStorage.getItem("user"));
      if (u?.id) return u.id;
    } catch {}
    return 1;
  };

  useEffect(() => {
    // Load student
    const stored = localStorage.getItem("studentProfile");
    const legacy = localStorage.getItem("user");

    if (stored) setStudent(JSON.parse(stored));
    else if (legacy) setStudent(JSON.parse(legacy));

    // Load documents to compute DigiLocker Verified status
    const userId = getCurrentUserId();
    api.get(`/api/uploads/list/${userId}`).then((res) => {
      const docs = res.data || [];
      const allVerified = docs.length > 0 && docs.every((d) => d.verified === true);
      setVerifiedStatus(allVerified);
    });
  }, []);

  const fullName =
    student?.full_name || student?.name || student?.username || "Student";

  const cetPercentile =
    student?.cet_percentile ??
    student?.percentile ??
    student?.marks ??
    "98.76";

  const allottedCollege =
    student?.allotted_college ||
    student?.college_allotted ||
    "VJTI Mumbai";

  return (
    <DashboardLayout title="Dashboard">
      <div className="p-6 space-y-6">

        {/* TOP BANNER */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-3xl font-bold">Welcome, {fullName} 👋</h2>

          <p className="mt-2 text-lg">
            CET Percentile: <span className="font-semibold">{cetPercentile}</span>
          </p>

          <p className="flex items-center gap-2 mt-1">
            🎓 <span className="font-semibold">Allotted College: {allottedCollege}</span>
          </p>
        </div>

        {/* ROW 1 */}
        <div className="grid gap-4 md:grid-cols-3">

          <GlassCard>
            <div className="p-4 space-y-2">
              <p className="font-semibold">1. Student Details</p>
              <p className="text-green-700 font-medium">Verified ✔</p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-4 space-y-3">
              <p className="font-semibold">2. Document Upload</p>
              <p className="text-yellow-600">Pending / Completed</p>

              <button
                onClick={() => navigate("/upload-documents")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Upload Now
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-4 space-y-3">
              <p className="font-semibold">3. DigiLocker Verification</p>

              <p className={student?.digilocker_verified ? "text-green-600" : "text-gray-500"}>
                {student?.digilocker_verified ? "Verified ✓" : "Not Verified"}
              </p>

              <button
                onClick={() => navigate("/digilocker")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Connect DigiLocker
              </button>
            </div>
          </GlassCard>


        </div>

        {/* ROW 2 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          <GlassCard>
            <div
              className="p-4 cursor-pointer"
              onClick={() => navigate("/documents")}
            >
              <p className="font-semibold flex items-center gap-2">
                📄 Your Documents
              </p>
              <p className="text-black-500 text-sm">
                Check uploaded documents and status.
              </p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-4 cursor-pointer" onClick={() => navigate("/payments")}>
              <p className="font-semibold flex items-center gap-2">💳 Fee Payment</p>
              <p className="text-black-500 text-sm">Pay admission fee securely.</p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-4">
              <p className="font-semibold flex items-center gap-2">🏫 Allotted Institute</p>
              <p className="text-black-500 text-sm">{allottedCollege}</p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-4 cursor-pointer" onClick={() => navigate("/status")}>
              <p className="font-semibold flex items-center gap-2">📊 CAP Round Status</p>
              <p className="text-black-500 text-sm">Track your CAP round progress.</p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-4 cursor-pointer" onClick={() => navigate("/chatbot")}>
              <p className="font-semibold flex items-center gap-2">🤖 EduWay Chatbot</p>
              <p className="text-black-500 text-sm">Ask doubts 24×7 about admission.</p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-4">
              <p className="font-semibold flex items-center gap-2">📜 Admission Letter</p>
              <p className="text-black-500 text-sm">Download after final approval.</p>
            </div>
          </GlassCard>

        </div>
      </div>
    </DashboardLayout>
  );
}
