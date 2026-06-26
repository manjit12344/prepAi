import React from "react";

export default function StepField({ current, value, onChange, onKeyDown, error, disabled }) {
  return (
    <>
      <h3>{current.label}</h3>

      <input
        type="text"
        value={value}
        placeholder={current.placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />

      {error && <p>{error}</p>}
    </>
  );
}
