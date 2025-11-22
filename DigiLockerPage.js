import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function DigiLockerPage() {
  const [verified, setVerified] = useState(false);

  const getUserId = () => {
    const s = JSON.parse(localStorage.getItem("studentProfile"));
    if (s?.id) return s.id;

    const u = JSON.parse(localStorage.getItem("user"));
    if (u?.id) return u.id;

    return 1;
  };

  const verifyNow = async () => {
    try {
      const userId = getUserId();
      await api.post(`/api/digilocker/verify-documents/${userId}`);

      setVerified(true);

      // Update local storage
      let data = JSON.parse(localStorage.getItem("studentProfile"));
      if (data) {
        data.digilocker_verified = true;
        localStorage.setItem("studentProfile", JSON.stringify(data));
      }

      alert("Documents Verified Successfully!");
    } catch (error) {
      console.error(error);
      alert("Verification Failed");
    }
  };

  useEffect(() => {
    const st = JSON.parse(localStorage.getItem("studentProfile"));
    if (st?.digilocker_verified) {
      setVerified(true);
    }
  }, []);

  return (
    <DashboardLayout title="DigiLocker Verification">
      <div className="p-6 max-w-2xl mx-auto">
        <GlassCard>
          <div className="p-6 text-center space-y-4">
            <h1 className="text-2xl font-bold text-purple-700">
              DigiLocker Verification
            </h1>

            <p className="text-gray-600">
              Click the button below to verify all your uploaded documents.
            </p>

            <button
              onClick={verifyNow}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold w-full"
            >
              Verify My Documents
            </button>

            <div className="text-lg mt-4">
              {verified ? (
                <span className="text-green-600 font-bold">Verified ✓</span>
              ) : (
                <span className="text-yellow-600 font-bold">Not Verified</span>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

