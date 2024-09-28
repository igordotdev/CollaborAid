import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NavButton from "./components/buttons/NavButton/NavButton.tsx";

const onClick = () => {
  console.log("Button pressed");
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavButton text={"test"} onClick={onClick} />
  </StrictMode>,
);
