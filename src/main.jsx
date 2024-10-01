import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.scss";
import { ApiContext } from "../src/Context/ApiContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiContext.Provider value="https://restapi.fr/api/recipes">
      <App />
    </ApiContext.Provider>
  </StrictMode>
);
