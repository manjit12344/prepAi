import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {userAuth} from "../store/01.auth.store"
import {useNavigate} from "react-router-dom"

const ROLES = [
  "Frontend Engineer @ Google",
  "Staff SWE @ Stripe",
  "Senior Backend @ Airbnb",
  "System Design @ Meta",
  "Full Stack @ a Series B",
];

function useTypewriter(words, speed = 50, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const current = words[wordIdx];

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 1.5);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const FEATURES = [
  {
    label: "Real Interview Flow",
    detail:
      "Practice questions that feel like actual interviews from top tech companies."
  },
  {
    label: "Instant Feedback",
    detail:
      "Get detailed feedback on communication, problem solving and technical depth."
  },
  {
    label: "AI Interviewer",
    detail:
      "Adaptive interview sessions that respond naturally to your answers."
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const {know,knowMe} = userAuth();
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
  const role = useTypewriter(ROLES);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const gap = 32;
      
      // Select appropriate background dot brightness depending on root theme configuration
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
    
    const observer = new MutationObserver(resize);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-main font-sans antialiased transition-colors duration-150">
      {/* Background Dot Layer Grid */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />

      <style>{`
        @keyframes pulse { 50% { opacity: 0; } }
        .cursor-pulse { animation: pulse 1.1s step-end infinite; }
      `}</style>

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-line bg-canvas/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm tracking-tight font-semibold text-main opacity-90">prepAI</span>
            <span className="text-[10px] bg-card border border-line text-muted font-mono px-1.5 py-0.5 rounded">v1.0</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login-with-google">
              <button className="bg-main text-canvas px-3 py-1 rounded text-xs font-medium font-mono hover:opacity-90 transition-opacity">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Content Section */}
    <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-20 text-center">

  <div className="inline-flex items-center gap-2 text-[10px] font-mono text-muted tracking-wider uppercase mb-8 bg-card border border-line px-3 py-1 rounded">
    AI Mock Interview Platform
  </div>

  <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none text-main mb-6">
    Practice interviews.
    <br />
    Get hired faster.
  </h1>

  <p className="max-w-2xl mx-auto text-sm md:text-base text-muted font-mono leading-relaxed mb-8">
    AI-powered mock interviews for frontend,
    backend, system design and full-stack roles.
  </p>

  <div className="text-sm font-mono text-main mb-10 min-h-[28px]">
    Preparing for{" "}
    <span className="border-b border-line pb-1">
      {role}
      <span className="cursor-pulse ml-1">_</span>
    </span>
  </div>

  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
    <Link to="/login-with-google">
      <button className="bg-main text-canvas px-7 py-3 rounded-md text-sm font-mono hover:opacity-90 transition">
        Start Free
      </button>
    </Link>

    <span className="font-mono text-xs text-muted">
      3 free interview credits
    </span>
  </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-5xl mx-auto pt-14 border-t border-line">

  {FEATURES.map((feature) => (
    <div
      key={feature.label}
      className="border border-line rounded-lg bg-card/50 p-6"
    >
      <h3 className="font-mono text-sm text-main mb-3">
        {feature.label}
      </h3>

      <p className="text-xs text-muted leading-relaxed">
        {feature.detail}
      </p>
    </div>
  ))}

</div>
</main>
       

      {/* Terminal Mockup Feature */}
      <section className="relative z-10 px-6 pb-24 max-w-3xl mx-auto">
        <div className="bg-card border border-line rounded-lg overflow-hidden shadow-xl">
          {/* Top Status Header */}
          <div className="bg-canvas opacity-80 px-4 py-2.5 flex items-center justify-between border-b border-line">
            <span className="text-[11px] text-muted font-mono tracking-tight">interactive_environment.sh</span>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-line" />
              <span className="w-2 h-2 rounded-full bg-line" />
            </div>
          </div>
          {/* Output Content */}
          <div className="p-6 font-mono text-xs text-muted space-y-2 whitespace-pre overflow-x-auto leading-relaxed">
            <p className="opacity-50">// Initialize specific evaluation parameter frameworks</p>
            <p className="text-main"><span className="opacity-40">$</span> prepai initialize --target="L5_Frontend"</p>
            <p className="text-emerald-500 font-semibold">✓ System synchronized successfully with core question-bank matrices.</p>
            <p>&nbsp;</p>
            <p className="text-main"><span className="opacity-70 font-semibold">[PROMPT]</span> Design a performant virtualized lazy-loading engine in raw TS.</p>
            <p className="opacity-60">Constraints: Zero-jank thresholds, structural DOM recycling optimization.</p>
            <p>&nbsp;</p>
            <p className="text-main"><span className="opacity-40">$</span> <span className="cursor-pulse font-bold text-muted">_</span></p>
          </div>
        </div>
      </section>

      {/* Global Bottom Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 py-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted">© 2026 prepAI framework. No trackers. No fluff.</span>
        <span className="text-xs text-muted font-mono">Built for engineers, by engineers.</span>
      </footer>
    </div>
  );
}