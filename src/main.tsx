import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SearchBar } from "./components/SearchBar.tsx";
import { CompanyListItem } from "./components/CompanyListItem.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CompanyListItem
      title={"Ośrodek Pomocy Społecznej w Bystrzycy Kłodzkiej"}
      location={"Bystrzyca Kłodzka"}
      date={"2017"}
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et diam vel est ultricies tristique quis sed enim. Nullam consequat tortor diam, quis egestas elit rhoncus a. Cras dolor nibh, egestas vel rutrum nec, faucibus in leo. Vivamus vehicula nunc vitae quam commodo, quis posuere felis volutpat. In id leo vitae mauris sodales commodo. Curabitur congue ex sed efficitur hendrerit. Aliquam luctus nulla lacus, nec feugiat orci blandit sodales."
      }
    />
  </StrictMode>,
);
