import React from "react";
import { FEATURES } from "./landing.js";

export default function LandingFeatures() {
  return (
    <div>
      {FEATURES.map((feature) => (
        <div key={feature.label}>
          <h3>{feature.label}</h3>
          <p>{feature.detail}</p>
        </div>
      ))}
    </div>
  );
}
