import React from "react";

// Dev-only helper for visualizing form state while building/testing.
// Delete this component (and its usage in CreateNew.jsx) before shipping
// to production, or gate it behind an env flag if you want to keep it
// around for debugging.
export default function FormDebugPreview({ form }) {
  return (
    <>
      <h4>Current Form</h4>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </>
  );
}
