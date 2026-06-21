import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { userAuth } from "../store/01.auth.store";
import { useHistory } from "../store/03.history";
import { Clock, ChevronRight } from "lucide-react";

const History = () => {
  const navigate = useNavigate();
  const { know, knowMe } = userAuth();
  const { myInterviews, interview } = useHistory();

 useEffect(() => {
  const checkAuth = async () => {
    await knowMe();
  };

  checkAuth();
}, []);



  if (!know?.user) {
    return (
      <div className="flex min-h-screen bg-canvas items-center justify-center font-mono text-xs text-muted">
        <div className="border border-line p-6 rounded bg-card/40">
          Please log in to view this page.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-main font-sans antialiased border-t border-line flex flex-col justify-between transition-colors duration-150">
      
      <main className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-main">Interview History</h1>
            <p className="text-xs text-muted mt-1">
              Review and continue your previous mock interview sessions.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-muted font-mono text-xs border border-line px-2.5 py-1 rounded bg-card/20">
            <Clock size={12} />
            <span>sessions: {interview?.length || 0}</span>
          </div>
        </div>

        {/* Sessions Stack Feed */}
        <div className="space-y-3">
          {interview && interview.length > 0 ? (
            interview.map((e) => (
              <div 
                key={e.id} 
                onClick={() => navigate(`/chatSession/${e.id}`)}
                className="group border border-line bg-card/30 hover:bg-card/60 p-4 rounded-lg flex items-center justify-between transition-all cursor-pointer select-none"
              >
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs text-main font-semibold truncate">
                      {e.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-line hidden sm:inline" />
                    <span className="text-xs text-muted font-mono">
                      {e.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-muted opacity-80 font-mono">
                    <span>company: <span className="text-main opacity-90">{e.company}</span></span>
                    <span>•</span>
                    <span>id: <span className="text-main opacity-90">#{e.id}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                  {/* Status Indicator Badge */}
                  <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded border tracking-wider ${
                    e.status === "complete" || e.status === "COMPLETED"
                      ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-500"
                      : "bg-card border-line text-muted"
                  }`}>
                    {e.status?.toLowerCase() || "active"}
                  </span>
                  
                  <ChevronRight size={14} className="text-muted group-hover:text-main transform group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="border border-dashed border-line p-8 rounded-lg text-center font-mono text-xs text-muted opacity-60">
              No interview sessions recorded yet.
            </div>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto w-full px-6 py-6 border-t border-line/50 flex items-center justify-between font-mono text-[10px] text-muted">
        <span>Handshake status: Secured</span>
        <span>prepAI © 2026</span>
      </footer>

    </div>
  );
};

export default History;