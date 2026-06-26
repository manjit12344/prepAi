import React from "react";

export default function ChatInputArea({
  isComplete,
  answer,
  setAnswer,
  onKeyDown,
  onSend,
  loading,
  hasStarted,
}) {
  return (
    <div>
      {isComplete ? (
        <div>
          <p>Interview completed successfully — Sandbox state locked</p>
        </div>
      ) : (
        <div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={loading}
            placeholder={hasStarted ? "Type your response..." : "Type a message to begin..."}
          />
          <button onClick={onSend} disabled={loading || !answer.trim()}>
            Send
          </button>
        </div>
      )}
      <p>Press Enter to send, Shift + Enter for a new line</p>
    </div>
  );
}
