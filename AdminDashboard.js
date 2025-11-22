// src/pages/AdminDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import GlassCard from "../components/GlassCard";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // If you have admin info in localStorage you can parse and pass to AdminLayout if required
  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  return (
    <AdminLayout admin={admin}>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="cursor-pointer" onClick={() => navigate("/admin/payments")}>
          <GlassCard>
            <h2 className="font-bold text-lg">Fee Status</h2>
            <p className="text-gray-600 text-sm">Check which students paid their fees and confirm receipts.</p>
          </GlassCard>
        </div>

        <div className="cursor-pointer" onClick={() => navigate("/admin/documents")}>
          <GlassCard>
            <h2 className="font-bold text-lg">Manage Documents</h2>
            <p className="text-gray-600 text-sm">Approve uploaded student documents.</p>
          </GlassCard>
        </div>

        <div className="cursor-pointer" onClick={() => navigate("/admin/admissions")}>
          <GlassCard>
            <h2 className="font-bold text-lg">Review Admissions</h2>
            <p className="text-gray-600 text-sm">Track admission confirmations.</p>
          </GlassCard>
        </div>

      </div>
    </AdminLayout>
  );
}
