// src/pages/Chatbot.js
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ChatBubble from "../components/ChatBubble";
import GlassCard from "../components/GlassCard";
import api from "../api/axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", message: "👋 Hi! I am EduWay Buddy. How can I help you today?" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", message: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await api.post("/api/chat/eduway", { message: input });
      const botMsg = { sender: "bot", message: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
    }

    setInput("");
  };

  return (
    <DashboardLayout title="EduWay Chat Buddy">
      <div className="flex flex-col h-[85vh] p-6">

        {/* Chat Window */}
        <GlassCard className="flex-1 overflow-y-auto p-4 mb-4">
          {messages.map((msg, i) => (
            <ChatBubble key={i} sender={msg.sender} message={msg.message} />
          ))}
        </GlassCard>

        {/* Input */}
        <div className="flex gap-2">
          <input
            className="flex-1 border p-2 rounded focus:outline-purple-600"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={sendMessage}
            className="bg-purple-700 text-white px-6 rounded-lg hover:bg-purple-800 transition"
          >
            Send
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
