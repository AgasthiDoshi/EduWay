// src/pages/Payments.js
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function Payments() {
  const [history, setHistory] = useState([]);
  const feeAmount = 165650;

  const student =
    JSON.parse(localStorage.getItem("studentProfile")) ||
    JSON.parse(localStorage.getItem("user"));

  const userId = student?.id;

  const loadPayments = () => {
    if (!userId) return;
    api.get(`/api/payments/history/${userId}`).then((res) => {
      setHistory(res.data);
    });
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const payNow = () => {
    api
      .post("/api/payments/pay", {
        user_id: userId,
      })
      .then(() => {
        alert("Payment successful!");
        loadPayments();
      })
      .catch((err) => {
        console.error(err);
        alert("Payment failed");
      });
  };

  return (
    <DashboardLayout title="Fee Payment">
      <div className="p-6 max-w-3xl mx-auto">
        <GlassCard>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Admission Fee Payment
            </h2>

            <p className="text-gray-700 mb-4">
              Please complete your final admission payment to confirm your seat.
            </p>

            <div className="text-xl mb-4 font-semibold">
              Total Fee: <span className="text-green-600">₹{feeAmount}</span>
            </div>

            {history.length === 0 ? (
              <button
                onClick={payNow}
                className="bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-800"
              >
                Pay Now
              </button>
            ) : (
              <>
                <h3 className="mt-6 text-lg font-bold">Payment History</h3>
                <table className="w-full mt-3">
                  <thead>
                    <tr className="border-b">
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((p) => (
                      <tr key={p.id} className="text-center border-b py-2">
                        <td>₹{p.amount}</td>
                        <td>{p.date}</td>
                        <td>
                          <a
                            href={`http://localhost:5000/api/payments/receipt/${p.id}`}
                            target="_blank"
                            className="text-purple-600 underline"
                          >
                            Download Receipt
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}
