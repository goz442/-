import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RankingProvider } from "./context/RankingContext"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RankingProvider>
      <App />
    </RankingProvider>
  </React.StrictMode>
);
