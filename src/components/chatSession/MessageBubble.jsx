import React from "react";

export default function MessageBubble({ message }) {
  return (
    <div>
      <strong>{message.role === "user" ? "User" : "AI"}:</strong>
      <p>{message.text}</p>

      {message.score !== undefined && message.score !== null && (
        <div>
          <span>Score: {message.score}/100</span>
        </div>
      )}
    </div>
  );
}
