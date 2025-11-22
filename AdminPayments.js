// src/pages/AdminPayments.js
import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function AdminPayments() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/payments");
      setRows(res.data.payments || []);
    } catch (err) {
      console.error(err);
      setRows([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const confirm = async (paymentId) => {
    if (!window.confirm("Mark this payment as received?")) return;
    try {
      await api.post("/api/admin/payments/confirm", { payment_id: paymentId, admin_id: 0 });
      // reflect immediately
      setRows((cur) => cur.map((r) => (r.id === paymentId ? { ...r, status: "received" } : r)));
      alert("Payment confirmed. Student admission status updated.");
    } catch (err) {
      console.error(err);
      alert("Failed to confirm.");
    }
  };

  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  return (
    <AdminLayout admin={admin}>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Fee Status</h1>

        {loading ? (
          <GlassCard><p>Loading...</p></GlassCard>
        ) : rows.length === 0 ? (
          <GlassCard><p>No payments yet.</p></GlassCard>
        ) : (
          <div className="space-y-4">
            <GlassCard>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-2">Student</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => (
                    <tr key={p.id} className="border-b">
                      <td className="p-2">{p.student_name}</td>
                      <td className="p-2">{p.student_email}</td>
                      <td className="p-2">₹{p.amount}</td>
                      <td className="p-2">
                        {p.status === "received" || p.status === "success" ? (
                          <span className="bg-green-600 text-white px-3 py-1 rounded">Paid / Received</span>
                        ) : (
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded">Pending</span>
                        )}
                      </td>
                      <td className="p-2">
                        {p.status !== "received" && (
                          <button onClick={() => confirm(p.id)} className="px-3 py-1 bg-purple-600 text-white rounded">
                            Mark Fees Received
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
