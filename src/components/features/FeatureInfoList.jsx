import React from "react";

const INFO_ITEMS = [
  {
    title: "Adaptive Questions",
    detail: "AI adjusts questions based on how you answer."
  },
  {
    title: "Score Feedback",
    detail: "Get instant scoring performance updates."
  },
  {
    title: "Safe Testing",
    detail: "Practice comfortably in an isolated sandbox."
  }
];

export default function FeatureInfoList() {
  return (
    <ul>
      {INFO_ITEMS.map((item) => (
        <li key={item.title}>
          <strong>{item.title}:</strong> {item.detail}
        </li>
      ))}
    </ul>
  );
}
