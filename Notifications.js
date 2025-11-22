// src/pages/Notifications.js
import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";

export default function Notifications() {
  const notifications = [
    "No new notifications.",
    "Your application is under review.",
  ];

  return (
    <DashboardLayout title="Notifications">
      <div className="p-6 max-w-2xl mx-auto space-y-5">

        <h2 className="text-2xl font-bold text-purple-700">Latest Updates</h2>

        {notifications.map((note, index) => (
          <GlassCard key={index}>
            <div className="p-4 flex items-start gap-3">

              {/* Icon */}
              <span className="text-purple-700 text-xl">🔔</span>

              {/* Message */}
              <p className="text-gray-700">{note}</p>

            </div>
          </GlassCard>
        ))}

      </div>
    </DashboardLayout>
  );
}

