// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1f1235] via-[#24104f] to-[#150f2d] text-white">
      <Navbar />

      {/* HERO SECTION */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row items-center gap-10">
          {/* Left: Text */}
          <div className="flex-1 space-y-5 md:space-y-7">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-200">
              EDUWAY ADMISSION AGENT
            </p>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Your Smart{" "}
              <span className="text-[#38bdf8]">Admission Companion</span>
            </h1>

            <p className="text-sm md:text-base text-purple-100 max-w-xl">
              Navigate your college admission journey with{" "}
              <span className="font-semibold">EduWay</span>, an AI-powered
              Virtual College Admission Assistant (VCAA) that predicts colleges,
              manages documents, and keeps you updated in real time.
            </p>

            {/* Primary CTA buttons */}
            <div className="flex flex-wrap gap-3">
              

              <Link
                to="/login"
                className="px-5 py-2.5 rounded-full border border-purple-200/60 bg-white/5 hover:bg-white/10 font-semibold transition"
              >
                Student Login
              </Link>

              <Link
                to="/admin/login"
                className="px-5 py-2.5 rounded-full border border-pink-400/60 bg-pink-500/20 hover:bg-pink-500/30 font-semibold transition"
              >
                Admin Login
              </Link>
            </div>

            <p className="text-xs md:text-sm text-purple-200">
              
              .
            </p>
          </div>

          {/* Right: Glassmorphism Card / Illustration placeholder */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 space-y-5">
              <h2 className="text-xl font-bold mb-1">Why EduWay?</h2>
              <p className="text-sm text-purple-100">
                Get instant college predictions, centralized document uploads,
                DigiLocker integration, and real-time notifications – all inside
                one smart dashboard.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                <div className="bg-white/5 rounded-2xl px-3 py-3 border border-white/10">
                  <p className="font-semibold mb-1">Cutoff Predictor</p>
                  <p className="text-purple-100">
                    Enter your MHT-CET percentile and discover best-fit
                    colleges.
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl px-3 py-3 border border-white/10">
                  <p className="font-semibold mb-1">Smart Uploads</p>
                  <p className="text-purple-100">
                    Upload Aadhar, marksheets & certificates in a few clicks.
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl px-3 py-3 border border-white/10">
                  <p className="font-semibold mb-1">Application Tracker</p>
                  <p className="text-purple-100">
                    Track your admission status step by step.
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl px-3 py-3 border border-white/10">
                  <p className="font-semibold mb-1">EduWay Chatbot</p>
                  <p className="text-purple-100">
                    Ask doubts 24/7 with the built-in admission assistant.
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-purple-200">
                Built for students applying to engineering colleges through
                CET/Cap rounds – optimized for clarity, speed and guidance.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="bg-white/5 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              Intelligent Features for{" "}
              <span className="text-[#38bdf8]">Smart Admissions</span>
            </h2>
            <p className="text-center text-sm md:text-base text-purple-100 mb-8 max-w-2xl mx-auto">
              Experience how EduWay automates and simplifies your admission
              workflow with AI-powered tools inside VCAA.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              <FeatureCard
                title="AI Chatbot"
                desc="Instant answers to admission, documents, and cutoff-related doubts."
              />
              <FeatureCard
                title="College Predictor"
                desc="Percentile-based predictions using real cutoff data for popular colleges."
              />
              <FeatureCard
                title="Document Hub"
                desc="Upload, verify and manage all admission documents in one secure place."
              />
              <FeatureCard
                title="Live Tracking"
                desc="Track application, payments, and notifications from a clean dashboard."
              />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            What Students Say
          </h2>
          <p className="text-center text-sm md:text-base text-purple-100 mb-8 max-w-2xl mx-auto">
            Hear from students who used VCAA powered by EduWay to navigate
            their admission journey with confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <TestimonialCard
              name="Priya Sharma"
              role="B.Tech Student"
              quote="EduWay inside VCAA made my admission process so smooth. The college predictions were very close to actual allotments."
            />
            <TestimonialCard
              name="Rahul Patel"
              role="Engineering Aspirant"
              quote="I didn’t have to track multiple portals. Predictor, documents and status – everything was in one dashboard."
            />
            <TestimonialCard
              name="Anita Singh"
              role="Diploma to Degree"
              quote="The chatbot helped me with doubts about categories, cutoffs and CAP rounds at 2 AM. Lifesaver!"
            />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm text-purple-200">
          <div>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">VCAA · EduWay Admission Agent</span>
            . All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Small helper components inside same file to keep things simple */

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white/5 rounded-2xl p-4 md:p-5 border border-white/10 shadow-md shadow-purple-900/30">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-purple-100">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, role, quote }) {
  return (
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10 shadow-md shadow-purple-900/30">
      <div className="flex text-yellow-300 text-lg mb-2">
        <span>★★★★★</span>
      </div>
      <p className="text-sm text-purple-100 mb-4">"{quote}"</p>
      <p className="font-semibold">{name}</p>
      <p className="text-xs text-purple-200">{role}</p>
    </div>
  );
}
