// src/pages/DocumentList.js
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function DocumentList() {
  const [docs, setDocs] = useState([]);

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
    const userId = getCurrentUserId();

    api
      .get(`/api/uploads/list/${userId}`)
      .then((res) => setDocs(res.data || []))
      .catch((err) => console.error("Error fetching documents:", err));
  }, []);

  return (
    <DashboardLayout title="Your Uploaded Documents">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Your Documents
        </h1>

        <GlassCard>
          <div className="p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b text-gray-700">
                  <th className="py-2">Document Type</th>
                  <th className="py-2">Uploaded On</th>
                  <th className="py-2">Verified</th>
                  <th className="py-2">Admin Approval</th>
                  <th className="py-2">View</th>
                </tr>
              </thead>

              <tbody>
                {docs.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 text-center text-gray-500"
                    >
                      No documents uploaded yet.
                    </td>
                  </tr>
                )}

                {docs.map((doc) => (
                  <tr key={doc.id} className="border-b text-gray-800">
                    <td className="py-2">{doc.document_type}</td>
                    <td className="py-2">{doc.uploaded_on}</td>

                    <td className="py-2">
                      {doc.verified ? "Verified ✓" : "Pending ⏳"}
                    </td>

                    <td className="py-2">
                      {doc.admin_approved ? "Approved ✓" : "Pending ⏳"}
                    </td>

                    <td className="py-2">
                      <a
                        href={`http://localhost:5000${doc.file_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-purple-700 underline"
                      >
                        View File
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
