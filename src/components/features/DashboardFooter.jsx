import React from "react";

export default function DashboardFooter() {
  return (
    <footer>
      <span>Status: Connected</span>
      <span>© {new Date().getFullYear()} prepAI. All rights reserved.</span>
    </footer>
  );
}
