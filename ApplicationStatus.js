// frontend/src/pages/ApplicationStatus.js
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function ApplicationStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserId = () => {
    try {
      const st = JSON.parse(localStorage.getItem("studentProfile"));
      if (st?.id) return st.id;
      const u = JSON.parse(localStorage.getItem("user"));
      if (u?.id) return u.id;
    } catch {}
    return 1; // fallback dev
  };

  const loadStatus = async () => {
    setLoading(true);
    const userId = getUserId();
    try {
      const res = await api.get(`/api/uploads/status/${userId}`);
      setStatus(res.data);
    } catch (err) {
      console.error(err);
      setStatus(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStatus();
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Application Status">
        <div className="p-6"><GlassCard><p>Loading status...</p></GlassCard></div>
      </DashboardLayout>
    );
  }

  const uploaded = status?.uploaded_count > 0;
  const approved = status?.all_approved === true;
  const paid = status?.payment_paid === true;

  return (
    <DashboardLayout title="Application Status">
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <GlassCard>
          <h2 className="text-2xl font-bold mb-2">Application Progress</h2>

          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Step 1 — Documents Uploaded</div>
                <div className="text-sm text-gray-600">{uploaded ? `${status.uploaded_count} file(s) uploaded` : "No documents uploaded yet"}</div>
              </div>
              <div>{uploaded ? <span className="px-3 py-1 bg-green-600 rounded text-white">Done</span> : <span className="px-3 py-1 bg-yellow-500 rounded text-white">Pending</span>}</div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Step 2 — Admin Approval</div>
                <div className="text-sm text-gray-600">{approved ? "All documents approved by admin." : "Waiting for admin approval."}</div>
              </div>
              <div>{approved ? <span className="px-3 py-1 bg-green-600 rounded text-white">Approved</span> : <span className="px-3 py-1 bg-yellow-500 rounded text-white">Pending</span>}</div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Step 3 — Fee Payment</div>
                <div className="text-sm text-gray-600">{paid ? `Paid on ${status.last_payment?.date}` : "Pay your admission fee after approval."}</div>
              </div>
              <div>{paid ? <span className="px-3 py-1 bg-green-600 rounded text-white">Paid</span> : <span className="px-3 py-1 bg-gray-400 rounded text-white">Not Paid</span>}</div>
            </div>

          </div>
        </GlassCard>

        {/* Final message if fully complete */}
        {uploaded && approved && paid && (
          <GlassCard>
            <h3 className="text-xl font-semibold">🎉 Congratulations!</h3>
            <p className="mt-2">Your admission process is complete. Keep an eye on your email for official communication.</p>
          </GlassCard>
        )}
      </div>
    </DashboardLayout>
  );
}
