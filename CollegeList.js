// src/pages/CollegeList.js
import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";

export default function CollegeList() {
  const colleges = [
    { name: "FCRIT Vashi", courses: "IT • CS • Mechanical" },
    { name: "VJTI Mumbai", courses: "CS • Electrical • Civil" },
    { name: "COEP Pune", courses: "CS • Mechanical • Civil" },
    { name: "TSEC Mumbai", courses: "Electronics • Electrical • Civil" },
    { name: "UMIT Mumbai", courses: "AIDS • Electrical • EXTC" },
    { name: "VIT Vellore", courses: "CS • IT • Civil" },
    { name: "SRM University Chennai", courses: "CS • Electrical • Civil" },
    { name: "PCCOE Pune", courses: "IT • AIML • EXTC" },
  ];

  return (
    <DashboardLayout title="College List">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {colleges.map((col, i) => (
          <GlassCard key={i}>
            <div className="p-4">
              <h3 className="font-bold text-xl text-purple-700">{col.name}</h3>
              <p className="text-gray-700 mt-1">{col.courses}</p>
            </div>
          </GlassCard>
        ))}

      </div>
    </DashboardLayout>
  );
}
