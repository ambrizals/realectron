import React from "react";
import Routes from "./routes";

export default function App() {
  const { MainRoute } = Routes;
  return (
    <div>
      <MainRoute />
    </div>
  );
}
