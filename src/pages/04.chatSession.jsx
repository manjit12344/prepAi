import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send, Bot, User, CheckCircle2, ArrowLeft } from "lucide-react";
import { userAuth } from "../store/01.auth.store";
import { userChat } from "../store/02.chat.store";
import { useHistory } from "../store/03.history";

const ChatSession = () => {
  const { know, knowMe } = userAuth();
  const { aiResponse, running, loading } = userChat();
  const { chat, myChatHistory } = useHistory();

  const { id } = useParams();
  const nId = Number(id);
  const navigate = useNavigate();

  const [answer, setAnswer] = useState("");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-resize constants
  const LINE_HEIGHT = 18;
  const MAX_ROWS = 4;

  // 1. Initial Authentication and Data Fetch
  useEffect(() => {
    knowMe();
  }, []);

  useEffect(() => {
    if (nId) {
      myChatHistory(nId);
    }
  }, [nId]);

  // 2. Smooth Scrolling to the latest message
  useEffect(() => {
    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => clearTimeout(timer);
  }, [chat, aiResponse, loading]);

  // 3. Auto-resize textarea whenever answer changes
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    // Reset to auto so shrinking works
    el.style.height = "auto";
    const maxHeight = LINE_HEIGHT * MAX_ROWS + 16; // 16px = vertical padding
    const newHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = newHeight + "px";
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [answer]);

  // 4. Send Handler with optimistic clearing
  const send = async () => {
    if (!answer.trim() || loading) return;

    const currentQId = chat?.[chat.length - 1]?.id || null;
    const text = answer;
    setAnswer("");

    try {
      await running(nId, currentQId, text);
      await myChatHistory(nId);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!know?.user) {
    return (
      <div className="flex min-h-screen bg-canvas items-center justify-center font-mono text-xs text-muted">
        <div className="border border-line p-6 rounded bg-card/40">
          CRITICAL_ERROR: Unauthorized context. Handshake token missing.
        </div>
      </div>
    );
  }

  // 5. Constructing the unified messaging feed
  const isComplete = aiResponse?.aiChat?.isInterviewComplete;

  let pendingQuestion = "";
  if (aiResponse && Object.keys(aiResponse).length > 0) {
    pendingQuestion = aiResponse.aiChat?.nextQuestion || aiResponse.Question || "";
  }

  const hasStarted = Array.isArray(chat) && chat.length > 0;
  const messages = [];

  if (Array.isArray(chat)) {
    chat.forEach((item) => {
      if (item.question) {
        messages.push({ id: `q-${item.id}`, role: "ai", text: item.question });
      }
      if (item.answer) {
        messages.push({
          id: `a-${item.id}`,
          role: "user",
          text: item.answer,
          score: item.score,
        });
      }
    });
  }

  const lastMsg = messages[messages.length - 1];
  const pendingAlreadyShown =
    lastMsg && lastMsg.role === "ai" && lastMsg.text === pendingQuestion;

  if (isComplete) {
    messages.push({
      id: "complete",
      role: "ai",
      text: "That's a wrap! Thanks for completing the interview — your responses have been fully recorded.",
      complete: true,
    });
  } else if (pendingQuestion && !pendingAlreadyShown) {
    messages.push({ id: "pending", role: "ai", text: pendingQuestion });
  } else if (!hasStarted && !pendingQuestion) {
    messages.push({
      id: "greeting",
      role: "ai",
      text: "Hi, I'm your AI interviewer 👋 Whenever you're ready, send a message below and we'll get started.",
    });
  }

  return (
    <div className="flex h-screen flex-col bg-canvas text-main font-sans antialiased border-t border-line transition-colors duration-150">

      {/* Component Header / In-View Sub-Navbar */}
      <header className="border-b border-line bg-canvas px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/features")}
            className="font-mono text-xs text-muted hover:text-main transition-colors flex items-center gap-2 group"
          >
            <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform" />
            <span>back_to_features/</span>
          </button>
          <span className="w-px h-4 bg-line hidden sm:inline" />
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted">
            <span>session_id:</span>
            <span className="text-main opacity-80">[{nId}]</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isComplete
                ? "bg-muted"
                : loading
                ? "bg-amber-500 animate-pulse"
                : "bg-emerald-500"
            }`}
          />
          <span className="text-muted">
            {isComplete ? "session_closed" : loading ? "thinking..." : "active"}
          </span>
        </div>
      </header>

      {/* Messages Live Stream Chat Feed */}
      <div className="flex-1 overflow-y-auto bg-canvas/30">
        <div className="mx-auto max-w-3xl space-y-6 px-6 py-8">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-4 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Left Identity Icon for AI */}
              {m.role === "ai" && (
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border ${
                    m.complete
                      ? "bg-emerald-950/40 border-emerald-800 text-emerald-400"
                      : "bg-card border-line text-muted"
                  }`}
                >
                  <Bot size={15} />
                </div>
              )}

              {/* Unified Engineering-Theme Chat Bubble */}
              <div
                className={`max-w-xl rounded-lg px-4 py-3 font-mono text-xs leading-relaxed border ${
                  m.role === "user"
                    ? "bg-card text-main border-line shadow-sm"
                    : m.complete
                    ? "border-emerald-900/50 bg-emerald-950/20 text-emerald-400"
                    : "border-line bg-card/40 text-muted"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>

                {/* Embedded Grading Parameter metrics */}
                {m.score !== undefined && m.score !== null && (
                  <div className="mt-3 pt-2 border-t border-line flex items-center gap-2 text-[11px] text-muted">
                    <span>metric_score:</span>
                    <span className="text-emerald-500 font-semibold">{m.score}/100</span>
                  </div>
                )}
              </div>

              {/* Right Identity Icon for User */}
              {m.role === "user" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-card border border-line text-muted">
                  <User size={15} />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex items-start gap-4 justify-start">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-card border border-line text-muted">
                <Bot size={15} />
              </div>
              <div className="flex items-center gap-1.5 border border-line bg-card/20 px-4 py-3.5 rounded-lg">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Fixed-Bottom Action Command Input Bar Area */}
      <div className="border-t border-line bg-canvas px-6 py-5">
        <div className="mx-auto max-w-3xl">
          {isComplete ? (
            <div className="flex items-center justify-center gap-2 border border-emerald-900/40 bg-emerald-950/10 h-11 rounded-lg font-mono text-xs text-emerald-500">
              <CheckCircle2 size={15} />
              <span>Interview completed successfully — Sandbox state locked</span>
            </div>
          ) : (
            /*
             * Container no longer has a fixed h-11 — it grows with the textarea.
             * items-end keeps the send button pinned to the bottom as the box expands.
             */
            <div className="flex items-end gap-3 bg-card border border-line rounded-lg px-3 py-2 focus-within:border-muted/60 transition-all">
              <textarea
                ref={textareaRef}
                name="chat"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={loading}
                placeholder={
                  hasStarted
                    ? "Type your response..."
                    : "Type a message to begin the interview..."
                }
                rows={1}
                className="flex-1 bg-transparent font-mono text-xs text-main placeholder-muted/50 outline-none disabled:opacity-50 resize-none"
                style={{ lineHeight: "18px", overflowY: "hidden" }}
              />
              <button
                onClick={send}
                disabled={loading || !answer.trim()}
                className="mb-0.5 h-7 w-7 flex-shrink-0 flex items-center justify-center rounded-md bg-main text-canvas transition-all hover:opacity-90 disabled:bg-card disabled:text-muted disabled:cursor-not-allowed"
              >
                <Send size={13} />
              </button>
            </div>
          )}
          <p className="mt-2 text-center font-mono text-[10px] text-muted">
            Press Enter to send, Shift + Enter for a new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatSession;
