import React from "react";

export default function StepNavigation({ step, isLastStep, loading, onBack, onNext }) {
  return (
    <>
      <button onClick={onBack} disabled={step === 0 || loading}>
        Back
      </button>

      <button onClick={onNext} disabled={loading}>
        {loading ? "Creating..." : isLastStep ? "Start Interview" : "Next"}
      </button>
    </>
  );
}
