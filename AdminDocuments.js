// src/pages/AdminDocuments.js
import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function AdminDocuments() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDocs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/documents");
      const arr = res.data.documents || [];
      setDocs(arr);
    } catch (err) {
      console.error(err);
      setDocs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const approve = async (docId) => {
    if (!window.confirm("Approve this document?")) return;
    try {
      await api.post("/api/admin/documents/approve", { document_id: docId, admin_id: 0 });
      const updated = docs.map((d) => (d.id === docId ? { ...d, admin_approved: true, verified: true } : d));
      setDocs(updated);
      alert("Approved.");
    } catch (err) {
      console.error(err);
      alert("Failed to approve.");
    }
  };

  // group by user_id
  const grouped = docs.reduce((acc, d) => {
    const key = d.user_id || "unknown";
    if (!acc[key]) acc[key] = { user_info: { id: d.user_id, name: d.user_name, email: d.user_email }, documents: [] };
    acc[key].documents.push(d);
    return acc;
  }, {});

  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  return (
    <AdminLayout admin={admin}>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Uploaded Documents</h1>

        {loading ? (
          <GlassCard><p>Loading...</p></GlassCard>
        ) : Object.keys(grouped).length === 0 ? (
          <GlassCard><p>No uploaded documents yet.</p></GlassCard>
        ) : (
          <div className="space-y-6">
            {Object.values(grouped).map((g) => (
              <div key={g.user_info.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{g.user_info.name || "Unknown Student"}</h3>
                    <p className="text-sm text-gray-700">{g.user_info.email}</p>
                  </div>
                  <div className="text-sm text-gray-700">
                    {g.documents.length} document(s)
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="text-left">
                        <th className="p-2">Document</th>
                        <th className="p-2">Uploaded</th>
                        <th className="p-2">Approved</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.documents.map((doc) => (
                        <tr key={doc.id} className="border-t">
                          <td className="p-2">{doc.document_type}</td>
                          <td className="p-2 text-sm text-gray-600">{new Date(doc.uploaded_on).toLocaleString()}</td>
                          <td className="p-2">
                            {doc.admin_approved ? (
                              <span className="px-3 py-1 bg-green-600 text-white rounded">Approved</span>
                            ) : (
                              <span className="px-3 py-1 bg-yellow-500 text-white rounded">Pending</span>
                            )}
                          </td>
                          <td className="p-2 space-x-2">
                            <a
                              href={`http://127.0.0.1:5000/uploads/${doc.file_path}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1 bg-blue-600 text-white rounded"
                            >
                              View
                            </a>

                            {!doc.admin_approved && (
                              <button
                                onClick={() => approve(doc.id)}
                                className="px-3 py-1 bg-purple-700 text-white rounded"
                              >
                                Approve
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
