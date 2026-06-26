import React from "react";
import { useNavigate } from "react-router-dom";

export default function StartInterviewCard() {
  const navigate = useNavigate();

  return (
    <section>
      <h2>Start a Mock Interview</h2>
      <p>Set up a custom AI session tailored to your specific role, target company, and experience level.</p>
      <button onClick={() => navigate("/createNew")}>
        Create New
      </button>
    </section>
  );
}
