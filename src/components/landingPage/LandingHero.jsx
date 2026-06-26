import React from "react";
import { Link } from "react-router-dom";
import { useTypewriter } from "./useTypewriter.js";
import { ROLES } from "./landing.js";

export default function LandingHero() {
  const role = useTypewriter(ROLES);

  return (
    <>
      <div>AI Mock Interview Platform</div>

      <h1>
        Practice interviews.
        <br />
        Get hired faster.
      </h1>

      <p>
        AI-powered mock interviews for frontend, backend, system design and full-stack roles.
      </p>

      <div>
        Preparing for <span>{role}_</span>
      </div>

      <div>
        <Link to="/login-with-google">
          <button type="button">Start Free</button>
        </Link>
        <span>3 free interview credits</span>
      </div>
    </>
  );
}
