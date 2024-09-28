import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FilledButton from "./components/buttons/FilledButton/FilledButton.tsx";
import NavButton from "./components/buttons/NavButton/NavButton.tsx";

const onClick = () => {
  console.log("Button pressed");
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavButton title={"Nav Button"} onClick={onClick} />
    <FilledButton title={"Filled Button"} onClick={onClick} />
  </StrictMode>,
);
