import React from "react";

export default function WelcomeSection({ userName }) {
  return (
    <section>
      <h1>Welcome, {userName}</h1>
      <p>Your personal interview dashboard is ready. Create a session below to get started.</p>
    </section>
  );
}
