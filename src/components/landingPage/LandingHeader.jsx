import React from "react";
import { Link } from "react-router-dom";

export default function LandingHeader() {
  return (
    <header>
      <div>
        <span>prepAI</span>
        <span>v1.0</span>
      </div>
      <nav>
        <Link to="/login-with-google">
          <button type="button">Sign In</button>
        </Link>
      </nav>
    </header>
  );
}
