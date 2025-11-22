// src/pages/Support.js
import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";

export default function Support() {
  return (
    <DashboardLayout title="Help & Support">
      <div className="p-6 max-w-xl mx-auto">
        <GlassCard>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-3 text-purple-700">
              Need Help?
            </h2>
            <p className="text-gray-700 mb-2">
              Our EduWay support team is here to assist you with:
            </p>

            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Login & Registration Issues</li>
              <li>Document Upload Errors</li>
              <li>Predictor & Dashboard Help</li>
              <li>General Admission Queries</li>
            </ul>

            <p className="mt-4 text-gray-800 font-semibold">
              📧 Email: <span className="text-purple-700">eduway@gmail.com</span>
            </p>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
