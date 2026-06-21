import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuth } from "../store/01.auth.store";
import { Plus } from "lucide-react";

const Features = () => {
  const { know, knowMe } = userAuth();
  const navigate = useNavigate();

useEffect(() => {
  const checkAuth = async () => {
    await knowMe();
  };

  checkAuth();
}, []);

useEffect(() => {
  console.log("know:", know);

  if (know?.user) {
    navigate("/features");
  }
}, [know]);

  // Get user name or use "Guest" as a fallback
  const userName = know?.user?.displayName || know?.user?.email?.split('@')[0] || "Guest";

  if (!know?.user) {
    navigate("/login-signup")
  }

  return (
    <div className="min-h-screen bg-canvas text-main font-sans antialiased border-t border-line flex flex-col justify-between transition-colors duration-150">
      
      <main className="max-w-3xl mx-auto w-full px-6 py-20 flex-1 flex flex-col justify-center">
        
        {/* Welcome Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-medium tracking-tight text-main">
            Welcome, <span className="text-muted font-mono font-normal">{userName}</span>
          </h1>
          <p className="text-sm text-muted mt-2">
            Your personal interview dashboard is ready. Create a session below to get started.
          </p>
        </div>

        {/* Action Card */}
        <div className="border border-line bg-card/40 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-medium text-main">Start a Mock Interview</h3>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Set up a custom AI session tailored to your specific role, target company, and experience level.
            </p>
          </div>
          
          <button
            onClick={() => navigate("/createNew")}
            className="w-full sm:w-auto bg-main text-canvas px-4 h-9 rounded font-mono text-xs font-semibold tracking-tight transition-all hover:opacity-90 flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Plus size={14} />
            <span>Create New</span>
          </button>
        </div>

        {/* Simple Minimal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 font-mono text-xs text-muted">
          <div className="border border-line p-4 rounded bg-card/20">
            <span className="text-main block mb-1">• Adaptive Questions</span>
            AI adjusts questions based on how you answer.
          </div>
          <div className="border border-line p-4 rounded bg-card/20">
            <span className="text-main block mb-1">• Score Feedback</span>
            Get instant scoring performance updates.
          </div>
          <div className="border border-line p-4 rounded bg-card/20">
            <span className="text-main block mb-1">• Safe Testing</span>
            Practice comfortably in an isolated sandbox.
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto w-full px-6 py-6 border-t border-line flex items-center justify-between font-mono text-[10px] text-muted">
        <span>Status: Connected</span>
        <span> © {new Date().getFullYear()} prepAI. All rights reserved.</span>
      </footer>

    </div>
  );
};

export default Features;