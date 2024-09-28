import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FilledButton from "./components/buttons/FilledButton/FilledButton.tsx";
import NavButton from "./components/buttons/NavButton/NavButton.tsx";
import StrokedButton from "./components/buttons/StrokedButton/StrokedButton.tsx";
import ProfileButton from "./components/buttons/ProfileButton/ProfileButton.tsx";

const onClick = () => {
  console.log("Button pressed");
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavButton title={"Nav Button"} onClick={onClick} />
    <FilledButton title={"Filled Button"} onClick={onClick} />
    <StrokedButton title={"Stroked Button"} onClick={onClick} />
    <ProfileButton
      img={
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
      }
      onClick={onClick}
    />
  </StrictMode>,
);
