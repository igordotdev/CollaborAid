import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FilledButton from "./components/buttons/FilledButton/FilledButton.tsx";
import NavButton from "./components/buttons/NavButton/NavButton.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilledButton title={"Test"} href={"google.com"} />
    <NavButton title={"Test1"} href={"google.com"} />
  </StrictMode>,
);
