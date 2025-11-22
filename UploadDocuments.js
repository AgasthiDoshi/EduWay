// src/pages/UploadDocuments.js
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function UploadDocuments() {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("");

  const getCurrentUserId = () => {
    try {
      const studentRaw = localStorage.getItem("studentProfile");
      const userRaw = localStorage.getItem("user");

      if (studentRaw) {
        const s = JSON.parse(studentRaw);
        if (s && s.id) return s.id;
      }
      if (userRaw) {
        const u = JSON.parse(userRaw);
        if (u && u.id) return u.id;
      }
    } catch (e) {
      console.error("Error reading user/student from localStorage", e);
    }
    // fallback if nothing found
    return 1;
  };

  const upload = async () => {
    if (!file || !documentType) {
      alert("Please select a document type and file.");
      return;
    }

    const userId = getCurrentUserId();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);
    formData.append("document_type", documentType);

    try {
      await api.post("/api/uploads/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Document uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed!");
    }
  };

  return (
    <DashboardLayout title="Upload Documents">
      <div className="p-6 max-w-2xl mx-auto">
        <GlassCard>
          <div className="p-4">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Upload Required Documents
            </h2>

            <p className="text-gray-600 mb-6">
              Upload your Aadhar, marksheet, income certificate, and photo for
              verification.
            </p>

            {/* Document Type */}
            <label className="font-semibold mb-2 block text-gray-800">
              Select Document Type:
            </label>

            <select
              className="border p-2 rounded w-full mb-4 bg-white/70"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">-- Select Document --</option>
              <option value="Aadhar">Aadhar</option>
              <option value="10th Marksheet">10th Marksheet</option>
              <option value="12th Marksheet">12th Marksheet</option>
              <option value="Caste Certificate">Caste Certificate</option>
              <option value="Income Certificate">Income Certificate</option>
              <option value="Passport Photo">Passport Photo</option>
            </select>

            {/* File Input */}
            <label className="font-semibold mb-2 block text-gray-800">
              Choose File:
            </label>

            <input
              type="file"
              className="border p-2 rounded w-full mb-4 bg-white/70"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              onClick={upload}
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 w-full font-semibold"
            >
              Upload Document
            </button>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
