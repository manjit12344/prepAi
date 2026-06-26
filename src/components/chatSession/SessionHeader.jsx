import React from "react";
import { useNavigate } from "react-router-dom";

export default function SessionHeader({ sessionId, isComplete, loading }) {
  const navigate = useNavigate();

  return (
    <header>
      <button onClick={() => navigate("/features")}>
        Back to Features
      </button>
      <div>
        <span>session_id: [{sessionId}]</span>
        <span>
          Status: {isComplete ? "session_closed" : loading ? "thinking..." : "active"}
        </span>
      </div>
    </header>
  );
}
