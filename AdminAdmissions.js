// src/pages/AdminAdmissions.js
import React from "react";
import AdminLayout from "../components/AdminLayout";
import GlassCard from "../components/GlassCard";

export default function AdminAdmissions() {
  const admin = JSON.parse(localStorage.getItem("admin") || "null");
  return (
    <AdminLayout admin={admin}>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Admissions</h1>
        <GlassCard>
          <p>Use Fee Status and Manage Documents to review and confirm student admissions.</p>
        </GlassCard>
      </div>
    </AdminLayout>
  );
}
