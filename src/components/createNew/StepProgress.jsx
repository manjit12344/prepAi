import React from "react";

export default function StepProgress({ step, total }) {
  return (
    <p>
      Step {step + 1} of {total}
    </p>
  );
}
