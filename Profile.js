// src/pages/Profile.js
import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <DashboardLayout title="Profile">
        <div className="max-w-xl mx-auto p-6">
          <GlassCard>
            <p className="text-gray-700">
              No user data found. Please login again.
            </p>
          </GlassCard>
        </div>
      </DashboardLayout>
    );
  }

  const initial = (user.name || "U").charAt(0).toUpperCase();

  return (
    <DashboardLayout title="Your Profile">
      <div className="max-w-xl mx-auto p-6">

        <GlassCard>
          <div className="p-6 flex flex-col items-center">

            {/* Avatar */}
            <div className="h-20 w-20 rounded-full bg-purple-700 text-white flex items-center justify-center text-3xl font-bold">
              {initial}
            </div>

            <h2 className="text-2xl font-bold mt-4 text-purple-700">
              {user.name}
            </h2>

            <p className="text-gray-500 mb-4">{user.exam} Candidate</p>

            {/* Details */}
            <div className="w-full space-y-3 text-gray-800">

              <p><b>Email:</b> {user.email}</p>
              <p><b>Phone:</b> {user.phone}</p>
              <p><b>Exam:</b> {user.exam}</p>
              <p><b>Application No:</b> {user.application_no}</p>
              <p><b>Seat No:</b> {user.seat_no}</p>

              {user.percentile && (
                <p><b>Percentile:</b> {user.percentile}</p>
              )}

            </div>

          </div>
        </GlassCard>

      </div>
    </DashboardLayout>
  );
}
