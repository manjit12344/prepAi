import React, { useEffect, useState } from "react";
import { userAuth } from "../store/01.auth.store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { know, knowMe, logOut } = userAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById("auth-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      const gap = 32;
      // Pull computed text color dynamically to render background grid system flawlessly
      const isDarkTheme = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDarkTheme ? "rgba(255, 255, 255, 0.02)" : "rgba(9, 9, 11, 0.03)";
      
      for (let x = gap; x < canvas.offsetWidth; x += gap) {
        for (let y = gap; y < canvas.offsetHeight; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    
    resize();
    window.addEventListener("resize", resize);
    knowMe();

    // Re-check grid styling if theme class mutates over DOM layout lifecycles
    const observer = new MutationObserver(resize);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logOut();
      navigate("/login-signup");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-main font-sans antialiased flex flex-col justify-between relative overflow-hidden transition-colors duration-150">
      {/* Background Layer */}
      <canvas id="auth-canvas" className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Header Area */}
      <header className="relative z-10 max-w-6xl mx-auto w-full px-6 h-14 flex items-center">
        <span className="font-mono text-sm tracking-tight font-semibold text-main opacity-90">prepAI</span>
      </header>

      {/* Main Authentication Box Card */}
      <main className="relative z-10 flex flex-col items-center justify-center p-6 w-full max-w-sm mx-auto my-auto">
        <div className="w-full bg-card border border-line rounded-lg shadow-xl overflow-hidden">
          
          {/* Box Header Tab Line */}
          <div className="bg-canvas opacity-80 px-4 py-2.5 border-b border-line flex items-center justify-between">
            <span className="text-[11px] text-muted font-mono tracking-tight">
              {isLoggingOut ? "terminating_session.sh" : know?.user ? "active_session.env" : "secure_gateway.sh"}
            </span>
            <div className="flex gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isLoggingOut ? "bg-amber-500/60 animate-pulse" : "bg-line"}`} />
              <span className={`w-1.5 h-1.5 rounded-full ${isLoggingOut ? "bg-amber-500/60 animate-pulse" : "bg-line"}`} />
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col items-center text-center min-h-[240px] justify-center">
            
            {!know?.user ? (
              /* State A: Login UI */
              <>
                <div className="mb-6 w-full">
                  <span className="font-mono text-sm tracking-tight font-semibold text-main uppercase">Authentication</span>
                  <p className="text-[11px] text-muted font-mono mt-1">session_token_required</p>
                </div>

                <p className="text-xs text-muted font-mono leading-relaxed mb-6 max-w-[250px]">
                  Sign in with Google to provision sandbox environments and sync real-time telemetry.
                </p>

                <a 
                  href="http://localhost:3000/auth/google"
 
                  className="w-full flex items-center justify-center gap-3 bg-canvas border border-line px-4 py-2.5 rounded font-mono text-xs font-medium text-main hover:opacity-80 transition-all no-underline shadow-sm"
                >
                  <svg 
                    className="w-4 h-4 text-muted" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 12h5.5" />
                    <path d="M12 7c2.5 0 4.5 1.5 5.2 3.5" />
                  </svg>
                  <span>Sign in with Google</span>
                </a>
              </>
            ) : (
              /* State B: Dashboard/Log Out interface */
              <>
                <div className="mb-4 w-full">
                  <div className="w-8 h-8 rounded-full border border-line bg-canvas mx-auto mb-3 flex items-center justify-center text-muted font-mono text-xs font-semibold overflow-hidden uppercase">
                    {know.user.email?.charAt(0) || "U"}
                  </div>
                  <span className="font-mono text-sm tracking-tight font-medium text-main">Active Handshake</span>
                  <p className="text-[10px] text-emerald-500 font-mono mt-0.5 tracking-tight break-all max-w-[220px] mx-auto">
                    {know.user.email}
                  </p>
                </div>

                <p className="text-xs text-muted font-mono leading-relaxed mb-6">
                  You are currently authenticated into the prepAI orchestration layer.
                </p>

                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full bg-main text-canvas disabled:opacity-40 px-4 py-2 rounded font-mono text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-2"
                >
                  {isLoggingOut ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-canvas/60 animate-ping" />
                      <span>clearing_state...</span>
                    </>
                  ) : (
                    "terminate_session (logout)"
                  )}
                </button>
              </>
            )}

            {/* Metric Footer State */}
            <div className="mt-6 pt-5 border-t border-line w-full flex items-center justify-center gap-2">
              <span className={`w-1 h-1 rounded-full ${know?.user ? "bg-emerald-500" : "bg-amber-500"}`} />
              <span className="text-[10px] text-muted font-mono">
                {know?.user ? "Active state cache synced" : "System idling — pending token"}
              </span>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Element */}
      <footer className="relative z-10 max-w-6xl mx-auto w-full px-6 py-6 text-center sm:text-left">
        <span className="font-mono text-[11px] text-muted">
          © 2026 prepAI framework architecture. Secure handshake baseline.
        </span>
      </footer>
    </div>
  );
};

export default Login;